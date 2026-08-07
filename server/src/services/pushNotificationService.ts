// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Expo Push Notification Service
// Production-Ready Native Mobile Push Notifications (Teacher & Parent Apps)
// ═══════════════════════════════════════════════════════════

import https from "https";

export interface ExpoPushMessage {
  to: string | string[];
  sound?: "default" | null;
  title: string;
  body: string;
  data?: Record<string, any>;
  ttl?: number;
  priority?: "default" | "normal" | "high";
  badge?: number;
  channelId?: string;
}

/**
 * Send Push Notifications using Expo Push API (https://exp.host/--/api/v2/push/send)
 */
export const sendExpoPushNotification = async (messages: ExpoPushMessage | ExpoPushMessage[]): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      const payload = Array.isArray(messages) ? messages : [messages];
      const dataString = JSON.stringify(payload);

      const options = {
        hostname: "exp.host",
        path: "/--/api/v2/push/send",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Accept-Encoding": "gzip, deflate",
          "Content-Length": Buffer.byteLength(dataString)
        }
      };

      const req = https.request(options, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          console.log("[Expo Push Service Response]:", body);
          resolve(true);
        });
      });

      req.on("error", (err) => {
        console.error("[Expo Push Service Error]:", err.message);
        resolve(false);
      });

      req.write(dataString);
      req.end();
    } catch (error) {
      console.error("[Expo Push Service Exception]:", error);
      resolve(false);
    }
  });
};

/**
 * High-Level Notification Dispatcher for Teacher App
 */
export const notifyTeacher = async (
  teacherExpoToken: string,
  type: "NEW_ANNOUNCEMENT" | "HOMEWORK_REMINDER" | "EXAM_REMINDER" | "MARKS_REMINDER" | "ADMIN_MESSAGE" | "LEAVE_STATUS",
  title: string,
  body: string,
  extraData: Record<string, any> = {}
) => {
  const pushMessage: ExpoPushMessage = {
    to: teacherExpoToken || "ExponentPushToken[SampleTeacherTokenPlaceholder]",
    sound: "default",
    title: `👨‍🏫 ${title}`,
    body,
    priority: "high",
    badge: 1,
    data: {
      recipientType: "TEACHER",
      notificationType: type,
      ...extraData,
      timestamp: new Date().toISOString()
    }
  };

  // Dispatch live Socket.IO fallback
  const io = (global as any).io;
  if (io) {
    io.emit("teacher:notification_created", { type, title, body, ...extraData });
  }

  return sendExpoPushNotification(pushMessage);
};

/**
 * High-Level Notification Dispatcher for Parent App
 */
export const notifyParent = async (
  parentExpoToken: string,
  type: "ATTENDANCE_UPDATE" | "HOMEWORK_PUBLISHED" | "EXAM_RESULT_PUBLISHED" | "TEACHER_ANNOUNCEMENT",
  title: string,
  body: string,
  extraData: Record<string, any> = {}
) => {
  const pushMessage: ExpoPushMessage = {
    to: parentExpoToken || "ExponentPushToken[SampleParentTokenPlaceholder]",
    sound: "default",
    title: `🎓 ${title}`,
    body,
    priority: "high",
    badge: 1,
    data: {
      recipientType: "PARENT",
      notificationType: type,
      ...extraData,
      timestamp: new Date().toISOString()
    }
  };

  // Dispatch live Socket.IO fallback
  const io = (global as any).io;
  if (io) {
    io.emit("parent:live_notification", { type, title, body, ...extraData });
  }

  return sendExpoPushNotification(pushMessage);
};
