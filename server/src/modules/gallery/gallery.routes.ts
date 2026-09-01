import { Router } from "express";
import { createAlbum, getAlbums, addMediaToAlbum, getAlbumMedia } from "./gallery.controller";
import { adminGuards } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/albums", adminGuards, createAlbum);
router.get("/albums", getAlbums);
router.post("/albums/:albumId/media", adminGuards, addMediaToAlbum);
router.get("/albums/:albumId/media", getAlbumMedia);

export default router;
