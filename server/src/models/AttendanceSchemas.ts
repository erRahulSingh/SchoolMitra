import { Schema, model } from "mongoose";

// 3. Attendance Collections
export const StudentAttendanceModel = model("studentAttendance", new Schema({ studentId: Schema.Types.ObjectId, date: String, status: String, class: String }, { timestamps: true }));
export const TeacherAttendanceModel = model("teacherAttendance", new Schema({ teacherId: Schema.Types.ObjectId, date: String, status: String }, { timestamps: true }));
export const StaffAttendanceModel = model("staffAttendance", new Schema({ staffId: Schema.Types.ObjectId, date: String, status: String }, { timestamps: true }));
