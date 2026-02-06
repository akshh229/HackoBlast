import { useEffect, useState } from "react";
import { fetchTimetable, type TimetableSlot } from "../services/timetable.service";

/**
 * Timetable — Shows today's class schedule.
 * Fetches from backend; falls back to mock data.
 */

type SlotType = TimetableSlot["type"];

const typeStyles: Record<SlotType, string> = {
  lecture: "bg-indigo-500/10 text-indigo-400",
  lab: "bg-emerald-500/10 text-emerald-400",
  break: "bg-gray-700/30 text-gray-500",
};

export default function Timetable() {
  const [slots, setSlots] = useState<TimetableSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimetable()
      .then(setSlots)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-2xl bg-gray-800/60 border border-gray-700 p-6 backdrop-blur">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        🗓️ Today's Timetable
      </h2>

      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-4 bg-gray-700 rounded w-full" />
          ))}
        </div>
      ) : slots.length === 0 ? (
        <p className="text-gray-400 text-sm">No timetable available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="pb-2 pr-4 font-medium">Time</th>
                <th className="pb-2 pr-4 font-medium">Subject</th>
                <th className="pb-2 pr-4 font-medium">Room</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((s, i) => (
                <tr
                  key={i}
                  className={`border-b border-gray-700/50 last:border-0 ${typeStyles[s.type]} transition`}
                >
                  <td className="py-2.5 pr-4 font-mono text-xs">{s.time}</td>
                  <td className="py-2.5 pr-4">{s.subject}</td>
                  <td className="py-2.5 pr-4 text-gray-400">{s.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
