import { useEffect, useState } from "react";
import type { Notification } from "../types";
import { getNotifications } from "../services/notification.service";

export default function NotificationBell() {
  const [items, setItems] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    load();
    // Poll every 30 s for new notifications
    const id = setInterval(load, 30_000);
    return () => clearInterval(id);
  }, []);

  async function load() {
    try {
      const data = await getNotifications();
      setItems(data);
    } catch {
      /* silent — bell stays at 0 */
    }
  }

  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="notif-bell">
      <button className="btn-icon" onClick={() => setOpen(!open)} aria-label="Notifications">
        🔔 {unread > 0 && <span className="notif-count">{unread}</span>}
      </button>

      {open && (
        <div className="notif-dropdown">
          {items.length === 0 ? (
            <p className="text-muted">No notifications</p>
          ) : (
            <ul>
              {items.map((n) => (
                <li key={n.id} className={n.read ? "read" : "unread"}>
                  <span>{n.message}</span>
                  <small>{new Date(n.createdAt).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
