import { Router } from "express";
import { getInvoices, createInvoice, recordPayment, sendDueReminder } from "./fees.controller";

const router = Router();

// Invoices
router.get("/invoices", getInvoices);
router.post("/invoices", createInvoice);

// Payments
router.post("/payments", recordPayment);

// Reminders
router.post("/remind", sendDueReminder);

export default router;
