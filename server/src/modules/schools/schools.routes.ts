import { Router } from "express";
import { getAllSchools, createSchool } from "./schools.controller";

const router = Router();

router.get("/", getAllSchools);
router.post("/", createSchool);

export default router;
