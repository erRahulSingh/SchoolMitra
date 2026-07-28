import { Schema, model } from "mongoose";

// 2. School Collections
export const StudentModel = model("students", new Schema({ rollNo: String, name: String, class: String, section: String, parentId: Schema.Types.ObjectId, schoolId: Schema.Types.ObjectId }, { timestamps: true }));
export const ParentModel = model("parents", new Schema({ name: String, phone: String, email: String, children: [Schema.Types.ObjectId] }, { timestamps: true }));
export const TeacherModel = model("teachers", new Schema({ name: String, phone: String, subject: String, salary: Number }, { timestamps: true }));
export const StaffModel = model("staff", new Schema({ name: String, designation: String, phone: String, department: String }, { timestamps: true }));
export const ClassModel = model("classes", new Schema({ className: String, sections: [String] }, { timestamps: true }));
export const SectionModel = model("sections", new Schema({ sectionName: String, classId: Schema.Types.ObjectId }, { timestamps: true }));
export const SubjectModel = model("subjects", new Schema({ subjectName: String, code: String }, { timestamps: true }));
export const AcademicYearModel = model("academicYears", new Schema({ year: String, isCurrent: Boolean }, { timestamps: true }));
