// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Student Service Layer
// ═══════════════════════════════════════════════════════════

import { studentRepository } from "../repositories/StudentRepository";
import { ApiError } from "../utils/ApiError";

export class StudentService {
  async getAllStudents(q?: string, className?: string, section?: string) {
    if (q) {
      return await studentRepository.searchStudents(q);
    }
    if (className) {
      return await studentRepository.findByClassAndSection(className, section);
    }
    return await studentRepository.find();
  }

  async createStudent(studentData: any) {
    if (!studentData.name || !studentData.class) {
      throw ApiError.badRequest("Student name and class are required.");
    }
    const admissionNo = `ADM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    return await studentRepository.create({
      ...studentData,
      admissionNo,
      status: "Active"
    });
  }

  async getStudentDossier(id: string) {
    const student = await studentRepository.findById(id);
    if (!student) {
      throw ApiError.notFound("Student dossier not found.");
    }
    return {
      student,
      attendanceRate: "95.8%",
      feeStatus: "Paid",
      transportRoute: "Route 1 - Dwarka"
    };
  }
}

export const studentService = new StudentService();
