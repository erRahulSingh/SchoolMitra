import { Request, Response } from "express";
import fs from "fs";
import csvParser from "csv-parser";
import mongoose from "mongoose";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { MarkModel, ReportCardModel, ExamModel } from "../../../models/AcademicSchemas";
import { StudentModel, SubjectModel } from "../../../models/SchoolSchemas";
import logger from "../../../utils/logger";

function calculateGrade(percentage: number): string {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 40) return "D";
  return "F";
}

function calculateDivision(percentage: number, isPassed: boolean): string {
  if (!isPassed) return "FAIL";
  if (percentage >= 60) return "FIRST DIVISION";
  if (percentage >= 45) return "SECOND DIVISION";
  return "THIRD DIVISION";
}

export const uploadBulkResults = asyncHandler(async (req: Request, res: Response) => {
  const { id: examId } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId;

  if (!req.file) {
    return ApiResponse.error(res, 400, "Please upload a CSV file.", "VALIDATION_ERROR");
  }

  const exam = await ExamModel.findById(examId);
  if (!exam || String(exam.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 404, "Exam not found.", "NOT_FOUND");
  }

  const results: any[] = [];
  const errors: any[] = [];
  let rowCount = 0;

  // 1. Fetch Subjects mapping for this school
  const subjects = await SubjectModel.find({ schoolId }).lean();
  const subjectMap = new Map();
  subjects.forEach(s => subjectMap.set(s.subjectName.toLowerCase(), s));

  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on("data", (data) => {
      rowCount++;
      results.push({ row: rowCount, data });
    })
    .on("end", async () => {
      let successCount = 0;
      let failureCount = 0;

      for (const item of results) {
        const row = item.data;
        const rollNo = row["Roll Number"] || row["RollNumber"] || row["rollNo"];
        
        if (!rollNo) {
          errors.push({ row: item.row, error: "Missing Roll Number" });
          failureCount++;
          continue;
        }

        const student = await StudentModel.findOne({ schoolId, rollNo });
        if (!student) {
          errors.push({ row: item.row, error: `Student not found with Roll No: ${rollNo}` });
          failureCount++;
          continue;
        }

        let totalMarksObtained = 0;
        let totalMaxMarks = 0;
        let hasFailedSubject = false;
        const reportSubjects: any[] = [];
        const coScholastic: any[] = [];
        const coScholasticHeaders = ["work education", "art education", "health & physical education", "discipline", "music"];

        for (const key of Object.keys(row)) {
          const lowerKey = key.toLowerCase().trim();
          if (["roll number", "rollnumber", "rollno", "name"].includes(lowerKey)) continue;

          if (coScholasticHeaders.some(h => lowerKey.includes(h))) {
            const gradeStr = String(row[key]).trim().toUpperCase();
            if (gradeStr) {
               coScholastic.push({
                 trait: key.trim(),
                 grade: gradeStr
               });
            }
            continue;
          }

          const subject = subjectMap.get(lowerKey);
          if (subject) {
            const marksStr = String(row[key]).trim().toUpperCase();
            
            // Handle ABS (Absent)
            const isAbsent = marksStr === "ABS";
            const marksObtained = isAbsent ? 0 : parseFloat(marksStr) || 0;
            const maxMarks = subject.maxMarks || 100;
            const passingMarks = 33; // Default passing criteria

            const isPassedSubject = marksObtained >= passingMarks && !isAbsent;
            if (!isPassedSubject) hasFailedSubject = true;

            totalMarksObtained += marksObtained;
            totalMaxMarks += maxMarks;
            
            const percentage = (marksObtained / maxMarks) * 100;

            reportSubjects.push({
              subjectId: subject._id,
              obtainedMarks: marksObtained,
              maxMarks,
              percentage,
              grade: calculateGrade(percentage),
              isPassed: isPassedSubject
            });

            // Upsert MarkModel
            await MarkModel.findOneAndUpdate(
              { schoolId, studentId: student._id, examId, subjectId: subject._id },
              {
                $set: {
                  marksObtained,
                  maxMarks,
                  grade: calculateGrade(percentage),
                  isPassed: isPassedSubject,
                  enteredBy: user._id
                }
              },
              { upsert: true, new: true }
            );
          }
        }

        if (reportSubjects.length > 0) {
          const overallPercentage = (totalMarksObtained / totalMaxMarks) * 100;
          const overallGrade = calculateGrade(overallPercentage);
          const division = calculateDivision(overallPercentage, !hasFailedSubject);

          // Upsert ReportCardModel
          await ReportCardModel.findOneAndUpdate(
            { schoolId, studentId: student._id, examId },
            {
              $set: {
                academicYearId: exam.academicYearId,
                classId: student.classId,
                subjects: reportSubjects,
                coScholastic,
                totalMarks: totalMaxMarks,
                obtainedMarks: totalMarksObtained,
                percentage: overallPercentage,
                grade: overallGrade,
                remarks: division, // Storing division in remarks for now
                status: "PUBLISHED"
              }
            },
            { upsert: true }
          );
          successCount++;
        }
      }

      // Calculate Class Rank for the updated exam report cards
      const reportCards = await ReportCardModel.find({ schoolId, examId }).lean();
      const classesMap = new Map();
      
      // Group by classId
      reportCards.forEach((rc: any) => {
         const classId = String(rc.classId);
         if (!classesMap.has(classId)) classesMap.set(classId, []);
         classesMap.get(classId).push(rc);
      });

      const bulkUpdates: any[] = [];
      for (const [classId, cards] of classesMap.entries()) {
         // Sort by percentage DESC
         cards.sort((a: any, b: any) => b.percentage - a.percentage);
         
         let currentRank = 1;
         let previousPercentage: number | null = null;
         let studentsAtSameRank = 0;

         for (let i = 0; i < cards.length; i++) {
             const rc = cards[i];
             if (previousPercentage === null || rc.percentage !== previousPercentage) {
                 if (previousPercentage !== null) {
                     currentRank += studentsAtSameRank;
                 }
                 studentsAtSameRank = 1;
             } else {
                 studentsAtSameRank++;
             }
             
             bulkUpdates.push({
                updateOne: {
                   filter: { _id: rc._id },
                   update: { $set: { classRank: currentRank } }
                }
             });
             previousPercentage = rc.percentage;
         }
      }

      if (bulkUpdates.length > 0) {
         await ReportCardModel.bulkWrite(bulkUpdates);
      }

      // Cleanup temp file
      fs.unlinkSync(req.file!.path);

      // Notify parent via socket (simulated here)
      try {
        const io = (global as any).io;
        if (io) {
          io.to(`school:${schoolId}`).emit("parent:result_update", {
            title: "Result Upload Complete",
            examId,
            message: "A new batch of exam results has been uploaded."
          });
        }
      } catch (err) {}

      return ApiResponse.success(res, 200, "Bulk result upload processed", {
        totalRows: rowCount,
        successCount,
        failureCount,
        errors
      });
    });
});
