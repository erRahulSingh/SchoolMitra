import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../config/db";
import { SchoolModel, UserModel } from "../models/AuthSchemas";
import { ParentModel, StudentModel } from "../models/SchoolSchemas";

async function main() {
  await connectDB();
  const schools = await SchoolModel.find({}).select("name code status").limit(5).lean();
  console.log("SCHOOLS:", JSON.stringify(schools));
  const parents = await UserModel.find({ role: { $in: ["Parent", "PARENT"] } }).select("name email phone role schoolId").limit(5).lean();
  console.log("PARENTS:", JSON.stringify(parents));
  const students = await StudentModel.find({}).select("name rollNo admissionNo classId parentId").limit(5).lean();
  console.log("STUDENTS:", JSON.stringify(students));
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
