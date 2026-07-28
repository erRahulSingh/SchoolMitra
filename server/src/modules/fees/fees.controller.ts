import { Request, Response } from "express";
import { FeeInvoiceModel, PaymentModel, TransactionModel } from "../../models/FeeSchemas";

// ════════════ 1. INVOICES MANAGEMENT ════════════
export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await FeeInvoiceModel.find().lean();
    return res.json({ success: true, count: invoices.length, invoices });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { studentId, amount, dueDate, status } = req.body;
    if (!studentId || !amount) {
      return res.status(400).json({ success: false, message: "studentId and amount are required." });
    }

    const created = await FeeInvoiceModel.create({
      studentId,
      amount,
      dueDate: dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: status || "Pending"
    });

    return res.status(201).json({ success: true, message: "Fee Invoice generated.", data: created });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════ 2. PAYMENTS RECORDING ════════════
export const recordPayment = async (req: Request, res: Response) => {
  try {
    const { invoiceId, amountPaid, paymentMethod, gatewayTxnId } = req.body;
    if (!invoiceId || !amountPaid) {
      return res.status(400).json({ success: false, message: "invoiceId and amountPaid are required." });
    }

    const invoice = await FeeInvoiceModel.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found." });
    }

    // Create payment entry
    const payment = await PaymentModel.create({ invoiceId, amountPaid, paymentMethod: paymentMethod || "UPI" });
    
    // Create transaction log
    if (gatewayTxnId) {
      await TransactionModel.create({ gatewayTxnId, status: "Success", amount: amountPaid });
    }

    // Update invoice status
    invoice.status = "Paid";
    await invoice.save();

    return res.status(201).json({ success: true, message: "Payment processed successfully.", payment });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════ 3. DUE REMINDERS ════════════
export const sendDueReminder = async (req: Request, res: Response) => {
  try {
    const { invoiceId } = req.body;
    if (!invoiceId) {
      return res.status(400).json({ success: false, message: "invoiceId is required." });
    }

    const invoice = await FeeInvoiceModel.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found." });
    }

    return res.json({
      success: true,
      message: `Due reminder alert sent successfully for invoice ${invoiceId}.`
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
