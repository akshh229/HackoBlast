import { useEffect, useState } from "react";
import {
  fetchStudyPlan,
  type StudyPlanItem,
} from "../services/studyPlan.service";

/**
 * StudyPlanCard — Shows the AI-generated study plan.
 * Falls back to mock data when backend is unavailable.
 */
export default function StudyPlanCard() {
  const [plan, setPlan] = useState<StudyPlanItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudyPlan()
      .then(setPlan)
      .finally(() => setLoading(false));
  }, []);

  const priorityBadge = (p: string) => {
    switch (p) {
      case "High":
        return "bg-red-500/20 text-red-400";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-green-500/20 text-green-400";
    }
  };

  return (
    <div className="rounded-2xl bg-gray-800/60 border border-gray-700 p-6 backdrop-blur">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        📖 AI Study Plan
      </h2>

      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-4 bg-gray-700 rounded w-full" />
          ))}
        </div>
      ) : plan.length === 0 ? (
        <p className="text-gray-400 text-sm">No study plan available.</p>
      ) : (
        <ul className="space-y-3">
          {plan.map((item, i) => (
            <li
              key={i}
              className="flex items-start justify-between gap-3 rounded-lg bg-gray-900/40 px-4 py-3 border border-gray-700/50"
            >
              <div>
                <p className="text-sm font-medium text-white">{item.task}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {item.subject} · Due {item.deadline}
                </p>
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
