// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Swagger & OpenAPI Documentation Config
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";

export const getSwaggerSpec = () => {
  return {
    openapi: "3.0.0",
    info: {
      title: "SchoolMitra ERP — Production API Documentation",
      version: "1.0.0",
      description: "Enterprise Multi-Tenant School ERP API Specification covering 11 Core Microservices: Dashboard, Students, Teachers, Academics, Attendance, Exams, Fees, Transport & Socket.IO GPS, Communication, Reports, and System Settings.",
      contact: {
        name: "SchoolMitra Engineering Team",
        email: "api-support@schoolmitra.in",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Local Development Server",
      },
      {
        url: "https://api.schoolmitra.in/api/v1",
        description: "Production Server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    paths: {
      "/auth/login": {
        post: {
          summary: "User Login",
          description: "Authenticate School Admin, Teacher, Driver, or Parent user.",
          responses: {
            "200": { description: "Success" },
          },
        },
      },
      "/admin/dashboard/overview": {
        get: {
          summary: "Dashboard Overview",
          description: "Fetch high-level metrics for dashboard cards and widgets.",
          responses: {
            "200": { description: "Success" },
          },
        },
      },
      "/students": {
        get: { summary: "List Students" },
        post: { summary: "Create Student" },
      },
      "/teachers": {
        get: { summary: "List Teachers" },
        post: { summary: "Create Teacher" },
      },
      "/academics/classes": {
        get: { summary: "List Academic Classes" },
      },
      "/attendance/student/mark": {
        post: { summary: "Mark Student Attendance" },
      },
      "/exams": {
        get: { summary: "List Exams" },
      },
      "/fees/structure": {
        get: { summary: "Get Fee Structures" },
      },
      "/transport/buses": {
        get: { summary: "List Fleet Buses" },
      },
      "/reports/attendance": {
        get: { summary: "Generate Attendance Master Report" },
      },
      "/settings/school": {
        get: { summary: "Get School Profile & Configuration" },
      },
    },
  };
};

export const serveSwaggerDocs = (req: Request, res: Response) => {
  return res.json(getSwaggerSpec());
};
