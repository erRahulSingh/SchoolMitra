// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Core TypeScript Interfaces Registry
// ═══════════════════════════════════════════════════════════

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  schoolId?: string;
}

export interface ISchool {
  _id: string;
  code: string;
  name: string;
  city: string;
  plan: string;
  status: string;
}

export interface ITenantContext {
  schoolId: string;
  schoolName: string;
  schoolCode: string;
}
