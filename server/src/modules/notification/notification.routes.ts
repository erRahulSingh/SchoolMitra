import { Router } from "express";
import { triggerParentNotification } from "./notification.controller";

const router = Router();

router.post("/trigger", triggerParentNotification);

export default router;
