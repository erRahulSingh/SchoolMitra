import { Router } from "express";
import { getChatMessages } from "./chat.controller";

const router = Router();

router.get("/messages", getChatMessages);

export default router;
