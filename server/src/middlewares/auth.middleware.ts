import { authenticate, requireRole } from "../middleware/authGuards";

export const adminGuards = [authenticate, requireRole("SchoolAdmin", "SuperAdmin", "Principal")];
export default adminGuards;
