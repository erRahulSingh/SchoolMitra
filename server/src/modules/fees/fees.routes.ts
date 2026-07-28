import { Router } from "express";
import { getInvoices } from "./fees.controller";

const router = Router();

router.get("/invoices", getInvoices);

export default router;
