import { Router } from "express";
import {
  getBooks,
  addBook,
  deleteBook,
  issueBook,
  getIssuedBooks,
  returnBook
} from "./library.controller";

import { authenticate, requireRole } from "../../middleware/authGuards";

const router = Router();

router.use(authenticate);

// Books catalog CRUD (Anyone can view, only Admin/Librarian can add/delete)
router.get("/books", getBooks);
router.post("/books", requireRole("SchoolAdmin", "Teacher"), addBook);
router.delete("/books/:id", requireRole("SchoolAdmin", "Teacher"), deleteBook);

// Book checkouts & issues
router.get("/issues", requireRole("SchoolAdmin", "Teacher"), getIssuedBooks);
router.post("/issue", requireRole("SchoolAdmin", "Teacher"), issueBook);

// Book returns
router.post("/return", requireRole("SchoolAdmin", "Teacher"), returnBook);

export default router;
