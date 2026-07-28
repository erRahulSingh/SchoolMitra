import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['SuperAdmin', 'SchoolAdmin', 'Principal', 'Teacher', 'Driver', 'Parent', 'TransportManager', 'Accountant', 'Receptionist', 'Security'],
      required: true 
    },
    schoolId: { type: Schema.Types.ObjectId, ref: 'School' },
    status: { type: String, default: 'Active' },
  },
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);
