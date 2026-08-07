import { Router } from "express";
import {
  getBooks,
  addBook,
  deleteBook,
  issueBook,
  getIssuedBooks,
  returnBook
} from "./library.controller";

const router = Router();

// Books catalog CRUD
router.get("/books", getBooks);
router.post("/books", addBook);
router.delete("/books/:id", deleteBook);

// Book checkouts & issues
router.get("/issues", getIssuedBooks);
router.post("/issue", issueBook);

// Book returns
router.post("/return", returnBook);

export default router;
