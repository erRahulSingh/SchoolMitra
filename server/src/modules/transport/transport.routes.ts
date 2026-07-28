import { Router } from "express";
import { getLiveBusLocations } from "./transport.controller";

const router = Router();

router.get("/live", getLiveBusLocations);

export default router;
