// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — OpenAPI 3.0 Swagger Specification
// Complete Interactive API Documentation for Teacher Microservice (/api/v1/teacher/*)
// ═══════════════════════════════════════════════════════════

export const teacherOpenApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "SchoolMitra Teacher App & Parent Sync Backend Microservice API",
    version: "1.0.0",
    description: "Production-ready RESTful APIs, Real-time Socket.IO synchronization, and Expo Push Notification Services for SchoolMitra Teacher App."
  },
  servers: [
    { url: "http://localhost:5000/api/v1", description: "Local Development Server" },
    { url: "https://api.schoolmitra.com/api/v1", description: "Production Multi-Tenant Cluster" }
  ],
  security: [
    { bearerAuth: [] },
    { tenantHeader: [], academicYearHeader: [] }
  ],
  paths: {
    "/teacher/dashboard": {
      get: {
        summary: "Get Teacher Dashboard Overview & Today's Schedule",
        tags: ["Teacher Profile & Dashboard"],
        responses: {
          "200": { description: "Dashboard metrics & today's schedule retrieved" },
          "401": { description: "Unauthorized - Invalid JWT Bearer token" },
          "403": { description: "Forbidden - Teacher role required" }
        }
      }
    },
    "/teacher/attendance": {
      get: {
        summary: "Get Class Daily Attendance Roster",
        tags: ["Attendance Engine"],
        parameters: [
          { name: "classId", in: "query", required: true, schema: { type: "string" } },
          { name: "sectionId", in: "query", schema: { type: "string" } },
          { name: "date", in: "query", schema: { type: "string", format: "date" } }
        ],
        responses: {
          "200": { description: "Class attendance roster retrieved" }
        }
      },
      post: {
        summary: "Save Class Daily Attendance & Sync to Parent App",
        tags: ["Attendance Engine"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["classId", "attendance"],
                properties: {
                  classId: { type: "string", example: "class_8" },
                  sectionId: { type: "string", example: "sec_a" },
                  date: { type: "string", example: "2026-08-07" },
                  attendance: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        studentId: { type: "string", example: "st_101" },
                        status: { type: "string", enum: ["Present", "Absent", "Leave", "Late"], example: "Present" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          "201": { description: "Attendance saved & broadcasted to Parent App via Socket.IO + Expo Push" },
          "422": { description: "Validation Error - Invalid attendance payload" }
        }
      }
    },
    "/teacher/homework": {
      get: { summary: "Get Class Homework Roster", tags: ["Homework Engine"] },
      post: { summary: "Create Homework Draft", tags: ["Homework Engine"] }
    },
    "/teacher/homework/{id}/publish": {
      post: { summary: "Publish Homework & Send Live Parent Push Notifications", tags: ["Homework Engine"] }
    },
    "/teacher/weekly-tests": {
      get: { summary: "Get Weekly Tests Roster", tags: ["Weekly Test Engine"] },
      post: { summary: "Create Weekly Test & Attach Question Bank", tags: ["Weekly Test Engine"] }
    },
    "/teacher/exams/{id}/marks": {
      post: { summary: "Submit Student Marks Roster for Exam", tags: ["Exams & Marks Engine"] }
    },
    "/teacher/report-cards/{studentId}/submit": {
      post: { summary: "Submit Draft Report Card for School Admin Approval", tags: ["Report Card Workflow"] }
    },
    "/upload/single": {
      post: { summary: "Upload Single PDF / Image / Document to Cloud Storage", tags: ["File Upload Engine"] }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      tenantHeader: { type: "apiKey", in: "header", name: "x-school-id" },
      academicYearHeader: { type: "apiKey", in: "header", name: "x-academic-year" }
    }
  }
};
