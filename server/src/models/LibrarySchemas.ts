import { Schema, model } from "mongoose";

// 8. Library Collections
export const BookModel = model("books", new Schema({ title: String, author: String, barcode: String, category: String }, { timestamps: true }));
export const BookIssueModel = model("bookIssues", new Schema({ bookId: Schema.Types.ObjectId, studentId: Schema.Types.ObjectId, issueDate: String, dueDate: String }, { timestamps: true }));
export const BookReturnModel = model("bookReturns", new Schema({ bookId: Schema.Types.ObjectId, studentId: Schema.Types.ObjectId, returnDate: String, fineAmount: Number }, { timestamps: true }));
