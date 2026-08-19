// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Announcement Validation Helpers
// ═══════════════════════════════════════════════════════════

export const validateAnnouncementPayload = (payload: any) => {
  if (!payload.title || typeof payload.title !== "string" || !payload.title.trim()) {
    return "Announcement title is required.";
  }
  if (!payload.content && !payload.message) {
    return "Announcement content is required.";
  }
  return null;
};
