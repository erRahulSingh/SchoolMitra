import { Router } from "express";
import { getHomeworkList } from "./homework.controller";

const router = Router();

router.get("/", getHomeworkList);

export default router;
