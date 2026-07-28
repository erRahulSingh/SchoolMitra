import { Router } from "express";
import { getResults } from "./result.controller";

const router = Router();
router.get("/", getResults);
export default router;
