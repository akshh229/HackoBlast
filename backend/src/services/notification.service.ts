/**
 * Notification service — placeholder for real‑time alerts.
 * In production swap with Socket.io / Firebase / Pusher.
 */

export interface Notification {
  userId: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

// In‑memory store (good enough for a hackathon demo)
const notifications: Notification[] = [];

/** Push a notification for a user */
export function pushNotification(userId: string, message: string): void {
  notifications.push({
    userId,
    message,
    read: false,
    createdAt: new Date(),
  });
  console.log(`🔔 Notification → ${userId}: ${message}`);
}

/** Get all notifications for a user */
export function getNotifications(userId: string): Notification[] {
  return notifications.filter((n) => n.userId === userId);
}
