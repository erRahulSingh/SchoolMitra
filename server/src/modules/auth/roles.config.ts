export type SystemRole = 
  | 'SuperAdmin'
  | 'SchoolAdmin'
  | 'Principal'
  | 'Teacher'
  | 'Driver'
  | 'Parent'
  | 'TransportManager'
  | 'Accountant'
  | 'Receptionist'
  | 'Security';

export interface RolePermissions {
  role: SystemRole;
  portal: string;
  allowedModules: string[];
}

export const SYSTEM_ROLES_CONFIG: Record<SystemRole, RolePermissions> = {
  SuperAdmin: {
    role: 'SuperAdmin',
    portal: 'apps/super-admin',
    allowedModules: ['schools', 'subscriptions', 'payments', 'invoices', 'support-tickets', 'feature-toggles', 'plans', 'coupons', 'analytics', 'audit-logs', 'settings', 'revenue', 'users', 'activity-logs', 'storage-usage', 'server-health', 'backups']
  },
  SchoolAdmin: {
    role: 'SchoolAdmin',
    portal: 'apps/school-admin',
    allowedModules: ['dashboard', 'admission', 'students', 'parents', 'teachers', 'academics', 'attendance', 'homework', 'assignments', 'exams', 'fees', 'transport', 'library', 'inventory', 'hr', 'communication', 'reports', 'settings']
  },
  Principal: {
    role: 'Principal',
    portal: 'apps/school-admin',
    allowedModules: ['dashboard', 'students', 'teachers', 'academics', 'attendance', 'exams', 'reports']
  },
  Teacher: {
    role: 'Teacher',
    portal: 'apps/school-admin',
    allowedModules: ['dashboard', 'students', 'academics', 'attendance', 'homework', 'assignments', 'exams', 'communication']
  },
  Driver: {
    role: 'Driver',
    portal: 'apps/driver-app',
    allowedModules: ['login', 'route', 'trip', 'pickup-drop', 'sos', 'reports']
  },
  Parent: {
    role: 'Parent',
    portal: 'apps/parent-app',
    allowedModules: ['login', 'home', 'child', 'transport', 'fees', 'calendar', 'communication', 'notifications', 'profile']
  },
  TransportManager: {
    role: 'TransportManager',
    portal: 'apps/school-admin',
    allowedModules: ['dashboard', 'transport', 'reports']
  },
  Accountant: {
    role: 'Accountant',
    portal: 'apps/school-admin',
    allowedModules: ['dashboard', 'fees', 'hr', 'reports']
  },
  Receptionist: {
    role: 'Receptionist',
    portal: 'apps/school-admin',
    allowedModules: ['dashboard', 'admission', 'students', 'parents', 'communication']
  },
  Security: {
    role: 'Security',
    portal: 'apps/school-admin',
    allowedModules: ['dashboard', 'attendance', 'transport']
  }
};
