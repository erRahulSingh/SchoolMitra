// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Firebase Push Notification Config
// ═══════════════════════════════════════════════════════════

import logger from "../utils/logger";

export interface PushNotificationPayload {
  token: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}

export const sendPushNotification = async (payload: PushNotificationPayload): Promise<boolean> => {
  logger.info(`[FCM PUSH] Dispatching push notification to token ${payload.token.slice(0, 10)}...`, {
    title: payload.title,
    body: payload.body,
  });
  // Simulation: Success response
  return true;
};

export const sendTopicNotification = async (topic: string, title: string, body: string): Promise<boolean> => {
  logger.info(`[FCM TOPIC PUSH] Dispatching notification to topic: ${topic}`, { title, body });
  return true;
};
