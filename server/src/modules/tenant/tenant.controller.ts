import { Request, Response } from "express";
import { SchoolModel } from "../../models/AuthSchemas";
import { PlanModel, SubscriptionModel } from "../../models/SystemSchemas";

// ════════════ 1. RESOLVE WORKSPACE BRANDING (PUBLIC) ════════════
export const resolveWorkspace = async (req: Request, res: Response) => {
  try {
    const { code, domain } = req.query;

    if (!code && !domain) {
      return res.status(400).json({ success: false, message: "Workspace code or domain is required" });
    }

    const query: Record<string, any> = {};
    if (code) query.code = code;
    if (domain) query.domain = domain;

    const school = await SchoolModel.findOne(query).select("name code domain status logo primaryColor").lean();
    if (!school) {
      return res.status(404).json({ success: false, message: "Workspace not found" });
    }

    return res.json({
      success: true,
      workspace: {
        name: school.name,
        code: school.code,
        domain: school.domain || "",
        status: school.status,
        logo: school.logo || "",
        primaryColor: school.primaryColor || "#4f46e5"
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════ 2. SEED DEFAULT SUBSCRIPTION PLANS (ADMIN) ════════════
export const seedPlans = async (req: Request, res: Response) => {
  try {
    const defaultPlans = [
      { planName: "Basic", price: 4999, maxStudents: 200, maxBuses: 2, features: ["ERP Essentials"] },
      { planName: "Standard", price: 9999, maxStudents: 500, maxBuses: 5, features: ["ERP Essentials", "GPS Bus Tracking", "Parent Mobile App"] },
      { planName: "Premium", price: 19999, maxStudents: 1500, maxBuses: 15, features: ["ERP Essentials", "GPS Bus Tracking", "Parent Mobile App", "Advanced Analytics", "AI Notifications"] }
    ];

    await PlanModel.deleteMany({});
    const createdPlans = await PlanModel.insertMany(defaultPlans);

    return res.json({
      success: true,
      message: "Subscription plans seeded successfully!",
      count: createdPlans.length,
      plans: createdPlans
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════ 3. MANAGE TENANT SUBSCRIPTION STATUS (ADMIN) ════════════
export const updateTenantSubscription = async (req: Request, res: Response) => {
  try {
    const { schoolId, status, planName, extendDays } = req.body;

    if (!schoolId) {
      return res.status(400).json({ success: false, message: "School identifier is required" });
    }

    const school = await SchoolModel.findById(schoolId);
    if (!school) {
      return res.status(404).json({ success: false, message: "School tenant not found" });
    }

    if (status) {
      school.status = status;
    }

    if (planName) {
      school.plan = planName;
    }

    if (extendDays) {
      const currentExpiry = school.expiresAt ? new Date(school.expiresAt) : new Date();
      school.expiresAt = new Date(currentExpiry.getTime() + extendDays * 24 * 60 * 60 * 1000);
    }

    await school.save();

    return res.json({
      success: true,
      message: "Workspace subscription updated successfully",
      school: {
        id: school._id,
        name: school.name,
        status: school.status,
        plan: school.plan,
        expiresAt: school.expiresAt
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
