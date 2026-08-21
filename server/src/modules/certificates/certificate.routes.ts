import { Router } from "express";
import { authenticate } from "../../middleware/authGuards";
import { requireActiveSchool } from "../../middleware/tenantMiddleware";
import {
  getCertificateTemplates,
  saveCertificateTemplate,
  getNextCertificateNo,
  issueCertificate,
  getIssuedCertificates,
  getParentCertificates,
  downloadCertificate,
  verifyCertificatePublic,
  revokeCertificate
} from "./certificate.controller";

const router = Router();

// ─── PUBLIC VERIFICATION ENDPOINTS (Remains Publicly Accessible) ───
router.get("/verify/:certificateNumber", verifyCertificatePublic);
router.get("/verify/:certificateNo", verifyCertificatePublic);

// ─── STEP 24: PROTECTED CERTIFICATE ENDPOINTS ───
router.use(authenticate);
router.use(requireActiveSchool);

// Certificate Templates Endpoints
router.get("/templates", getCertificateTemplates);
router.post("/templates", saveCertificateTemplate);

// Certificate Generation & Numbering Endpoints
router.get("/next-no", getNextCertificateNo);
router.post("/generate", issueCertificate);
router.get("/issued", getIssuedCertificates);

// Exact Admin API Routes Mapping
router.post("/", issueCertificate);
router.get("/", getIssuedCertificates);
router.get("/:id", getIssuedCertificates);
router.post("/:id/revoke", revokeCertificate);

// Parent App Filtered & Download Endpoints
router.get("/parent/:studentId", getParentCertificates);
router.get("/download/:certificateNo", downloadCertificate);

export default router;
