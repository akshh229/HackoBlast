import { api } from "../api";
import type { Notification } from "../types";

/** GET /api/notifications */
export function getNotifications() {
  return api.get<Notification[]>("/notifications");
}
