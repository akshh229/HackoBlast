import { useEffect, useState } from "react";
import {
  fetchTimetableInsights,
  type TimetableInsight,
} from "../services/timetable.service";

/**
 * SmartInsightsCard — AI Feature 5: Smart Timetable Insights.
 * Shows AI-generated preparation tips for today's classes.
 */
export default function SmartInsightsCard() {
  const [insights, setInsights] = useState<TimetableInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimetableInsights()
      .then(setInsights)
      .finally(() => setLoading(false));
  }, []);

  const priorityBadge = (p: string) => {
    switch (p.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-400";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-green-500/20 text-green-400";
    }
  };

  return (
    <div className="rounded-2xl bg-gray-800/60 border border-gray-700 p-6 backdrop-blur">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        🧠 AI Smart Insights
      </h2>

      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-4 bg-gray-700 rounded w-full" />
          ))}
        </div>
      ) : insights.length === 0 ? (
        <p className="text-gray-400 text-sm">No insights available yet.</p>
      ) : (
        <ul className="space-y-3">
          {insights.map((item, i) => (
            <li
              key={i}
              className="flex items-start justify-between gap-3 rounded-lg bg-gray-900/40 px-4 py-3 border border-gray-700/50"
            >
              <div>
                <p className="text-sm font-medium text-white">{item.subject}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.tip}</p>
              </div>
              <span
                className={`shrink-0 text-xs px-2 py-1 rounded-full font-medium ${priorityBadge(item.priority)}`}
              >
                {item.priority}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
