import { Schema, model } from "mongoose";

// 4. Academic Collections
export const HomeworkModel = model("homeworks", new Schema({ title: String, class: String, subject: String, dueDate: String, teacherId: Schema.Types.ObjectId }, { timestamps: true }));
export const AssignmentModel = model("assignments", new Schema({ title: String, class: String, maxMarks: Number }, { timestamps: true }));
export const ExamScheduleModel = model("examSchedules", new Schema({ examName: String, class: String, startDate: String }, { timestamps: true }));
export const MarkModel = model("marks", new Schema({ studentId: Schema.Types.ObjectId, examId: Schema.Types.ObjectId, subject: String, score: Number }, { timestamps: true }));
export const ReportCardModel = model("reportCards", new Schema({ studentId: Schema.Types.ObjectId, grade: String, percentage: Number }, { timestamps: true }));
export const RemarkModel = model("remarks", new Schema({ studentId: Schema.Types.ObjectId, teacherId: Schema.Types.ObjectId, text: String }, { timestamps: true }));
