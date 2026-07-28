import { Schema, model } from "mongoose";

// 7. Communication Collections
export const NotificationModel = model("notifications", new Schema({ recipientId: Schema.Types.ObjectId, title: String, body: String, read: Boolean }, { timestamps: true }));
export const AnnouncementModel = model("announcements", new Schema({ title: String, content: String, targetAudience: String }, { timestamps: true }));
export const ChatRoomModel = model("chatRooms", new Schema({ name: String, participants: [Schema.Types.ObjectId] }, { timestamps: true }));
export const MessageModel = model("messages", new Schema({ roomId: Schema.Types.ObjectId, senderId: Schema.Types.ObjectId, text: String }, { timestamps: true }));
export const EmailModel = model("emails", new Schema({ to: String, subject: String, body: String }, { timestamps: true }));
export const SMSLogModel = model("smsLogs", new Schema({ phone: String, message: String, status: String }, { timestamps: true }));
export const PushLogModel = model("pushLogs", new Schema({ fcmToken: String, payload: Object, status: String }, { timestamps: true }));
