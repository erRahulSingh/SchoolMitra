import { Router } from "express";
import { triggerParentNotification } from "./notifications.controller";

const router = Router();

router.post("/trigger", triggerParentNotification);

export default router;
