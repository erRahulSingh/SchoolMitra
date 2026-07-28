import { Router } from "express";
import { getStudents, createStudent } from "./student.controller";

const router = Router();

router.get("/", getStudents);
router.post("/", createStudent);

export default router;
