import { Router } from "express";
import { createAlbum, getAlbums, addMediaToAlbum, getAlbumMedia } from "./gallery.controller";
import { authenticate, requireRole } from "../../middleware/authGuards";

const router = Router();

router.post("/albums", authenticate, requireRole("SchoolAdmin", "SuperAdmin"), createAlbum);
router.get("/albums", getAlbums);
router.post("/albums/:albumId/media", authenticate, requireRole("SchoolAdmin", "SuperAdmin"), addMediaToAlbum);
router.get("/albums/:albumId/media", getAlbumMedia);

export default router;
