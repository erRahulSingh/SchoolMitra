import { Router } from "express";
import { askDoubt, getDoubtHistory, escalateToTeacher } from "./aiDoubt.controller";
import upload from "../../middleware/uploadMiddleware";

const router = Router();

// Route for asking an AI doubt (handles text, image, audio via multer)
router.post("/ask", upload.single("media"), askDoubt);

// Route for fetching the student's doubt history
router.get("/history", getDoubtHistory);

// Route for escalating a doubt to a human teacher
router.post("/escalate", escalateToTeacher);

export default router;
