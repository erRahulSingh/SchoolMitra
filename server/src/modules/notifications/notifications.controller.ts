import { Request, Response } from "express";
import { 
  NotificationModel, 
  SMSModel, 
  EmailModel, 
  WhatsAppModel 
} from "../../models/CommunicationSchemas";

export type NotificationEventType = 
  | 'child_picked_up'
  | 'bus_reached_stop'
  | 'bus_delayed'
  | 'school_arrived'
  | 'attendance_marked'
  | 'homework_assigned'
  | 'exam_published'
  | 'report_card_published'
  | 'fee_reminder'
  | 'holiday_notice'
  | 'emergency_alert'
  | 'bus_reached_home';

export const triggerParentNotification = async (req: Request, res: Response) => {
  try {
    const { eventType, parentId, studentName, details } = req.body as {
      eventType: NotificationEventType;
      parentId: string;
      studentName: string;
      details?: string;
    };

    const notificationTemplates: Record<NotificationEventType, { title: string; body: string }> = {
      child_picked_up: {
        title: "🚌 Child Picked Up",
        body: `${studentName} has boarded Bus #DL01AB4321 at Stop Sector 10.`
      },
      bus_reached_stop: {
        title: "🚏 Bus Reached Stop",
        body: `Bus #DL01AB4321 has arrived at Sector 10 Metro Stop.`
      },
      bus_delayed: {
        title: "⚠️ Bus Delayed Alert",
        body: `Bus #DL01AB4321 is delayed by 12 mins due to heavy traffic.`
      },
      school_arrived: {
        title: "🏫 School Arrival Confirmed",
        body: `${studentName} has safely arrived at School Main Gate #1.`
      },
      attendance_marked: {
        title: "📅 Morning Attendance Marked",
        body: `${studentName} is marked PRESENT for Class 10-A today.`
      },
      homework_assigned: {
        title: "📖 New Homework Assigned",
        body: `Physics Lab Experiment #4 assigned. Due tomorrow.`
      },
      exam_published: {
        title: "📝 Exam Schedule Published",
        body: `Mid-Term Science Exam schedule is now available in app.`
      },
      report_card_published: {
        title: "🏆 Digital Report Card Published",
        body: `Term 1 Report Card for ${studentName} is published (Grade A+).`
      },
      fee_reminder: {
        title: "💰 Quarter 2 Fee Reminder",
        body: `₹18,500 due on 10 August 2026. Pay via instant UPI on app.`
      },
      holiday_notice: {
        title: "🌴 School Holiday Notice",
        body: `School will remain closed on 15 August for Independence Day.`
      },
      emergency_alert: {
        title: "🚨 EMERGENCY SOS BROADCAST",
        body: `Emergency Alert from Bus #DL01AB4321. Control room notified.`
      },
      bus_reached_home: {
        title: "🏠 Bus Reached Home Stop",
        body: `Bus #DL01AB4321 has reached Home Stop. ${studentName} dropped off.`
      }
    };

    const selected = notificationTemplates[eventType] || {
      title: "Notification Alert",
      body: details || "New update from SchoolMitra."
    };

    const log = await NotificationModel.create({
      title: selected.title,
      content: selected.body,
      recipientGroup: "Parents"
    });

    await SMSModel.create({ to: "+91 98765 43210", body: selected.body, status: "Sent" });
    await EmailModel.create({ to: "parent@schoolmitra.com", subject: selected.title, body: selected.body, status: "Sent" });
    await WhatsAppModel.create({ to: "+91 98765 43210", body: selected.body, status: "Sent" });

    return res.json({
      success: true,
      message: "Push Notification, SMS, Email, and WhatsApp logs created.",
      notification: log
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
