import { io, Socket } from 'socket.io-client';
import { Alert } from 'react-native';

// Socket server URL (default to backend port 5000)
const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;
  private isConnected: boolean = false;

  constructor() {
    this.connect();
  }

  public connect() {
    try {
      if (!this.socket) {
        this.socket = io(SOCKET_URL, {
          transports: ['websocket', 'polling'],
          autoConnect: true,
          reconnection: true,
          reconnectionAttempts: 5
        });

        this.socket.on('connect', () => {
          this.isConnected = true;
          console.log('[Teacher App Socket] Connected to backend Socket.IO engine:', this.socket?.id);
        });

        this.socket.on('disconnect', () => {
          this.isConnected = false;
          console.log('[Teacher App Socket] Disconnected from server.');
        });
      }
    } catch (error) {
      console.log('[Teacher App Socket] Connection error:', error);
    }
  }

  // 1. Sync Attendance
  public syncAttendance(className: string, details: any) {
    this.socket?.emit('teacher:attendance_updated', {
      className,
      date: new Date().toLocaleDateString(),
      ...details
    });
    this.showSyncToast('Attendance', className);
  }

  // 2. Sync Homework
  public syncHomework(title: string, className: string, subject: string, dueDate: string) {
    this.socket?.emit('teacher:homework_published', {
      title,
      className,
      subject,
      dueDate
    });
    this.showSyncToast('Homework', title);
  }

  // 3. Sync Assignments
  public syncAssignment(title: string, className: string, marks: string | number) {
    this.socket?.emit('teacher:assignment_published', {
      title,
      className,
      marks
    });
    this.showSyncToast('Assignment', title);
  }

  // 4. Sync Weekly Test
  public syncWeeklyTest(title: string, className: string, totalMarks: string | number) {
    this.socket?.emit('teacher:test_published', {
      title,
      className,
      totalMarks
    });
    this.showSyncToast('Weekly Test', title);
  }

  // 5. Sync Exam Marks
  public syncMarks(examTitle: string, className: string) {
    this.socket?.emit('teacher:marks_submitted', {
      examTitle,
      className
    });
    this.showSyncToast('Exam Marks', examTitle);
  }

  // 6. Sync Report Cards
  public syncReportCard(className: string) {
    this.socket?.emit('teacher:report_card_published', {
      className
    });
    this.showSyncToast('Report Cards', className);
  }

  // 7. Sync Announcement / Notification
  public syncNotification(title: string, className: string, body: string) {
    this.socket?.emit('teacher:announcement_created', {
      title,
      className,
      body
    });
    this.showSyncToast('Class Notice', title);
  }

  private showSyncToast(moduleName: string, itemTitle: string) {
    console.log(`[Socket.IO Sync] Broadcasted ${moduleName}: ${itemTitle} ➔ Parent App`);
  }
}

export const socketService = new SocketService();
