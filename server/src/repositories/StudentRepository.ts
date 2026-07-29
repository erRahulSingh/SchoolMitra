// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Student Repository Layer
// ═══════════════════════════════════════════════════════════

import { BaseRepository } from "./BaseRepository";
import { StudentModel } from "../models/Student";

export class StudentRepository extends BaseRepository<any> {
  constructor() {
    super(StudentModel);
  }

  async findByClassAndSection(className: string, section?: string): Promise<any[]> {
    const query: any = { class: className, status: "Active" };
    if (section) query.section = section;
    return await this.model.find(query).sort({ name: 1 }).lean().exec();
  }

  async searchStudents(q: string, limit: number = 20): Promise<any[]> {
    return await this.model
      .find({
        $or: [
          { name: { $regex: q, $options: "i" } },
          { admissionNo: { $regex: q, $options: "i" } },
          { rollNo: { $regex: q, $options: "i" } }
        ]
      })
      .limit(limit)
      .lean()
      .exec();
  }
}

export const studentRepository = new StudentRepository();
