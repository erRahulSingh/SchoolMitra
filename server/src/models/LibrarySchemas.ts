// ═══════════════════════════════════════════════════════════
// SchoolMitra — Module 8: Library Collections (3)
// ═══════════════════════════════════════════════════════════

import { Schema, model } from "mongoose";

// ──────────── BOOKS ────────────
const bookSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Author name is required"],
    trim: true,
  },
  barcode: { type: String, trim: true, index: true },
  isbn: { type: String, trim: true },
  publisher: { type: String, trim: true },
  category: { type: String, trim: true, default: "General" },
  shelfLocation: { type: String, trim: true },
  copiesAvailable: { type: Number, default: 1, min: 0 },
  totalCopies: { type: Number, default: 1, min: 1 },
  price: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Available", "Issued", "Reserved", "Lost", "Damaged"],
    default: "Available",
  },
}, { timestamps: true });

bookSchema.index({ schoolId: 1, barcode: 1 }, { unique: true, sparse: true });
bookSchema.index({ schoolId: 1, category: 1 });
export const BookModel = model("books", bookSchema);

// ──────────── BOOK ISSUES ────────────
const bookIssueSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "books",
    required: true,
    index: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
    index: true,
  },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: "staff",
    index: true,
  },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnedDate: { type: Date },
  status: {
    type: String,
    enum: ["Issued", "Returned", "Overdue", "Lost"],
    default: "Issued",
    index: true,
  },
  issuedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
}, { timestamps: true });

bookIssueSchema.index({ schoolId: 1, status: 1 });
export const BookIssueModel = model("bookIssues", bookIssueSchema);

// ──────────── BOOK RETURNS ────────────
const bookReturnSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  issueId: {
    type: Schema.Types.ObjectId,
    ref: "bookIssues",
    required: true,
  },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "books",
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
  },
  returnDate: { type: Date, default: Date.now },
  fineAmount: { type: Number, default: 0 },
  fineStatus: {
    type: String,
    enum: ["NA", "Pending", "Paid", "Waived"],
    default: "NA",
  },
  condition: {
    type: String,
    enum: ["Good", "Damaged", "Lost"],
    default: "Good",
  },
  receivedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
}, { timestamps: true });

bookReturnSchema.index({ schoolId: 1 });
export const BookReturnModel = model("bookReturns", bookReturnSchema);
