import { Request, Response } from "express";
import { GalleryAlbumModel, GalleryMediaModel } from "../../models/CommunicationSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

// ════════════ 1. CREATE ALBUM (Admin Only) ════════════
export const createAlbum = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";
  const createdBy = user?.id || "647b0a7d903e1c001f3eabc9";

  const { title, description, coverPhoto, eventDate } = req.body;

  if (!title) {
    return ApiResponse.error(res, 400, "Album title is required", "VALIDATION_ERROR");
  }

  const album = await GalleryAlbumModel.create({
    schoolId,
    title,
    description,
    coverPhoto,
    eventDate: eventDate || new Date(),
    createdBy,
    visibility: "All"
  });

  return ApiResponse.created(res, "Album created successfully", { album });
});

// ════════════ 2. GET ALBUMS (Admin & Parent) ════════════
export const getAlbums = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";

  const albums = await GalleryAlbumModel.find({ schoolId })
    .sort({ createdAt: -1 })
    .lean();

  return ApiResponse.success(res, 200, "Albums retrieved successfully", { albums });
});

// ════════════ 3. ADD MEDIA TO ALBUM (Admin Only) ════════════
export const addMediaToAlbum = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";
  const uploadedBy = user?.id || "647b0a7d903e1c001f3eabc9";

  const { albumId } = req.params;
  const { url, caption } = req.body;

  if (!url) {
    return ApiResponse.error(res, 400, "Media URL is required", "VALIDATION_ERROR");
  }

  const media = await GalleryMediaModel.create({
    schoolId,
    albumId,
    url,
    caption,
    uploadedBy,
    mediaType: "Image"
  });

  return ApiResponse.created(res, "Media added to album successfully", { media });
});

// ════════════ 4. GET ALBUM MEDIA (Admin & Parent) ════════════
export const getAlbumMedia = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";
  const { albumId } = req.params;

  const media = await GalleryMediaModel.find({ schoolId, albumId })
    .sort({ createdAt: -1 })
    .lean();

  return ApiResponse.success(res, 200, "Media retrieved successfully", { media });
});
