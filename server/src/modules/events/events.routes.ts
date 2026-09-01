import { Router } from "express";
import { getEvents, createEvent } from "./events.controller";
import { adminGuards } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", getEvents);
router.post("/", adminGuards, createEvent);

export default router;
