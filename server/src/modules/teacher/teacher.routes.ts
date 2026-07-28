import { Router } from "express";
import { getTeachers } from "./teacher.controller";

const router = Router();

router.get("/", getTeachers);

export default router;
