import { Router } from "express";
import { createNotice, getNotices } from "./notice.controller";
import { adminGuards } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/notices", adminGuards, createNotice);
router.get("/notices", getNotices);

export default router;
