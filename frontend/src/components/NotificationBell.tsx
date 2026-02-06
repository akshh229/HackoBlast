import { useState, useRef, useEffect } from "react";
import api from "../services/api";

interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

/**
 * NotificationBell — Fetches real-time AI-triggered notifications from the backend.
 * Shows a red badge with count; clicking toggles a dropdown.
 * Falls back to demo notifications when backend is unreachable.
 */
export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  // Fetch notifications from backend
  useEffect(() => {
    api
      .get<Notification[]>("/notifications")
      .then((res) => {
        if (res.data.length > 0) {
          setNotifications(res.data);
        } else {
          // Fallback demo data when no real notifications exist yet
          setNotifications([
            { id: "1", message: "📢 Exam rescheduled to Friday", read: false, createdAt: new Date().toISOString() },
            { id: "2", message: "📚 New study material uploaded", read: false, createdAt: new Date().toISOString() },
            { id: "3", message: "⏰ Assignment deadline tomorrow", read: false, createdAt: new Date().toISOString() },
          ]);
        }
      })
      .catch(() => {
        // Backend unreachable — show demo notifications
        setNotifications([
          { id: "1", message: "📢 Exam rescheduled to Friday", read: false, createdAt: new Date().toISOString() },
          { id: "2", message: "📚 New study material uploaded", read: false, createdAt: new Date().toISOString() },
          { id: "3", message: "⏰ Assignment deadline tomorrow", read: false, createdAt: new Date().toISOString() },
        ]);
      });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      {/* Bell button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-gray-700 transition"
        aria-label="Notifications"
      >
        {/* Bell SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Badge */}
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {notifications.length}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl bg-gray-800 border border-gray-700 shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-700 text-sm font-semibold text-gray-300">
            Notifications
          </div>
          <ul>
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`px-4 py-3 text-sm text-gray-200 hover:bg-gray-700 transition cursor-pointer border-b border-gray-700/50 last:border-0 ${!n.read ? "font-semibold" : ""}`}
              >
                {n.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
