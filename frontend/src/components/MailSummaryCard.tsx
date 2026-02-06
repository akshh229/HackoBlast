import { useEffect, useState } from "react";
import { fetchMailSummary, type MailSummary } from "../services/mail.service";

/**
 * MailSummaryCard — Displays the AI-generated mail summary.
 * Fetches from backend on mount; falls back to mock data.
 */
export default function MailSummaryCard() {
  const [summary, setSummary] = useState<MailSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMailSummary()
      .then(setSummary)
      .finally(() => setLoading(false));
  }, []);

  // Urgency badge color helper
  const urgencyColor = (u: string) => {
    switch (u) {
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
        ✉️ AI Mail Summary
      </h2>

      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-700 rounded w-1/2" />
        </div>
      ) : summary ? (
        <div className="space-y-3">
          <p className="text-gray-200 text-sm leading-relaxed">
            {summary.summary}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-400 font-medium">
              {summary.category}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${urgencyColor(summary.urgency)}`}
            >
              {summary.urgency} Urgency
            </span>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No summary available.</p>
      )}
    </div>
  );
}
