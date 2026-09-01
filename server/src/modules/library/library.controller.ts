import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { BookModel, BookIssueModel, BookReturnModel } from "../../models/LibrarySchemas";
import { StudentModel } from "../../models/SchoolSchemas";

// ════════════ 1. GET ALL BOOKS ════════════
export const getBooks = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { search, category } = req.query;

  let query: any = { schoolId: user.schoolId };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
      { isbn: { $regex: search, $options: "i" } }
    ];
  }

  if (category) {
    query.category = category;
  }

  const books = await BookModel.find(query).sort({ createdAt: -1 }).lean();
  
  return ApiResponse.success(res, 200, "Library books catalog", { books });
});

// ════════════ 2. ADD A NEW BOOK ════════════
export const addBook = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { title, author, barcode, isbn, publisher, category, shelfLocation, totalCopies } = req.body;

  const newBook = await BookModel.create({
    schoolId: user.schoolId,
    title,
    author,
    barcode: barcode || `LIB-${Math.floor(100000 + Math.random() * 900000)}`,
    isbn,
    publisher,
    category: category || "General",
    shelfLocation: shelfLocation || "Shelf A-1",
    copiesAvailable: Number(totalCopies) || 1,
    totalCopies: Number(totalCopies) || 1,
    status: "Available"
  });

  return ApiResponse.success(res, 201, "Book cataloged in database", { book: newBook });
});

// ════════════ 3. DELETE A BOOK ════════════
export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;

  const book = await BookModel.findOneAndDelete({ _id: id, schoolId: user.schoolId });
  if (!book) {
    throw ApiError.notFound("Book not found");
  }

  return ApiResponse.success(res, 200, "Book removed from library catalog");
});

// ════════════ 4. ISSUE A BOOK ════════════
export const issueBook = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { bookId, studentId, dueDate } = req.body;

  // Validate book exists
  const book = await BookModel.findOne({ _id: bookId, schoolId: user.schoolId });
  if (!book) {
    throw ApiError.notFound("Book not found.");
  }

  if (book.copiesAvailable <= 0) {
    throw ApiError.badRequest("No copies available to issue.");
  }

  const student = await StudentModel.findOne({ _id: studentId, schoolId: user.schoolId });
  if (!student) {
    throw ApiError.notFound("Student not found.");
  }

  // Create issue record
  const issue = await BookIssueModel.create({
    schoolId: user.schoolId,
    bookId: book._id,
    studentId: student._id,
    dueDate: dueDate ? new Date(dueDate) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days standard
    status: "Issued"
  });

  // Decrement copies available
  book.copiesAvailable = Math.max(0, book.copiesAvailable - 1);
  if (book.copiesAvailable === 0) {
    book.status = "Issued";
  }
  await book.save();

  return ApiResponse.created(res, "Book issued successfully", { issue });
});

// ════════════ 5. GET ISSUED BOOKS ════════════
export const getIssuedBooks = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const issues = await BookIssueModel.find({ schoolId: user.schoolId, status: "Issued" })
    .populate("bookId", "title author barcode")
    .populate("studentId", "name rollNo admissionNo")
    .sort({ issueDate: -1 })
    .lean();

  const formatted = issues.map((i: any) => ({
    id: i._id.toString(),
    bookId: i.bookId?._id?.toString() || "",
    title: i.bookId?.title || "Unknown Book",
    author: i.bookId?.author || "Unknown Author",
    barcode: i.bookId?.barcode || "N/A",
    studentName: i.studentId?.name || "Unknown Student",
    rollNo: i.studentId?.rollNo || "",
    issueDate: i.issueDate ? new Date(i.issueDate).toISOString().split("T")[0] : null,
    dueDate: i.dueDate ? new Date(i.dueDate).toISOString().split("T")[0] : null
  }));

  return ApiResponse.success(res, 200, "Active library issues catalog", { issues: formatted });
});

// ════════════ 6. RETURN A BOOK ════════════
export const returnBook = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { issueId, condition } = req.body;

  let issue = await BookIssueModel.findOne({ _id: issueId, schoolId: user.schoolId, status: "Issued" });
  if (!issue) {
    throw ApiError.notFound("Active issue record not found.");
  }

  // Calculate late fine (e.g. Rs. 5 per day late)
  let fineAmount = 0;
  const now = new Date();
  if (issue.dueDate && now > issue.dueDate) {
    const diffTime = Math.abs(now.getTime() - new Date(issue.dueDate).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    fineAmount = diffDays * 5; // Rs 5 per day
  }

  issue.status = "Returned";
  issue.returnedDate = now;
  await issue.save();

  const bookToUpdate = await BookModel.findById(issue.bookId);
  if (bookToUpdate) {
    bookToUpdate.copiesAvailable = Math.min(bookToUpdate.totalCopies, bookToUpdate.copiesAvailable + 1);
    bookToUpdate.status = "Available";
    await bookToUpdate.save();
  }

  // Create return record
  const returnRecord = await BookReturnModel.create({
    schoolId: user.schoolId,
    issueId: issue._id,
    bookId: issue.bookId,
    studentId: issue.studentId,
    fineAmount: fineAmount,
    fineStatus: fineAmount > 0 ? "Pending" : "NA",
    condition: condition || "Good"
  });

  return ApiResponse.success(res, 200, "Book returned successfully.", { returnRecord });
});
