/**
 * Notification service — placeholder for real‑time alerts.
 * In production swap with Socket.io / Firebase / Pusher.
 */

import crypto from "crypto";

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

// In‑memory store — capped to prevent unbounded growth
const MAX_NOTIFICATIONS = 1000;
const notifications: Notification[] = [];

/** Push a notification for a user */
export function pushNotification(userId: string, message: string): void {
  const id = crypto.randomUUID();

  notifications.push({
    id,
    userId,
    message,
    read: false,
    createdAt: new Date(),
  });

  // Evict oldest entries when capacity is exceeded
  while (notifications.length > MAX_NOTIFICATIONS) {
    notifications.shift();
  }

  // Privacy-safe structured log — no PII
  console.log(JSON.stringify({ event: "notification_pushed", notificationId: id, status: "created", timestamp: new Date().toISOString() }));
}

/** Get all notifications for a user */
export function getNotifications(userId: string): Notification[] {
  return notifications.filter((n) => n.userId === userId);
}
