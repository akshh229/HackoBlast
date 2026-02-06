import { useEffect, useState } from "react";
import {
  fetchStatusChecks,
  createStatusCheck,
  type StatusCheck,
} from "../services/status.service";

/**
 * StatusCheckCard — Displays client status checks & lets user create new ones.
 * Based on the DATABASE_DESIGN.md spec (status_checks collection).
 */
export default function StatusCheckCard() {
  const [checks, setChecks] = useState<StatusCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [clientName, setClientName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    setLoading(true);
    fetchStatusChecks()
      .then(setChecks)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;
    setSubmitting(true);
    try {
      const created = await createStatusCheck(clientName.trim());
      setChecks((prev) => [created, ...prev]);
      setClientName("");
    } catch (err) {
      console.error("Failed to create status check", err);
    } finally {
      setSubmitting(false);
    }
  };

  /** Friendly relative time label */
  const timeAgo = (iso: string): string => {
    const diffMs = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diffMs / 60_000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  /** Color per client name */
  const clientColor = (name: string): string => {
    if (name.includes("Web")) return "bg-indigo-500/20 text-indigo-400";
    if (name.includes("Mobile")) return "bg-emerald-500/20 text-emerald-400";
    if (name.includes("AI")) return "bg-purple-500/20 text-purple-400";
    if (name.includes("Gateway")) return "bg-amber-500/20 text-amber-400";
    return "bg-gray-500/20 text-gray-400";
  };

  /** Unique client names for the summary bar */
  const uniqueClients = [...new Set(checks.map((c) => c.client_name))];

  return (
    <div className="rounded-2xl bg-gray-800/60 border border-gray-700 p-6 backdrop-blur">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        📡 System Status Checks
      </h2>

      {/* Quick stats */}
      {!loading && checks.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {uniqueClients.map((name) => {
            const count = checks.filter((c) => c.client_name === name).length;
            return (
              <span
                key={name}
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${clientColor(name)}`}
              >
                {name} ({count})
              </span>
            );
          })}
        </div>
      )}

      {/* Create form */}
      <form onSubmit={handleCreate} className="flex gap-2 mb-5">
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Client name (e.g. HackoBlast Web App)"
          className="flex-1 rounded-lg bg-gray-900/60 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
        />
        <button
          type="submit"
          disabled={submitting || !clientName.trim()}
          className="rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          {submitting ? "…" : "Ping"}
        </button>
      </form>

      {/* List */}
      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-4 bg-gray-700 rounded w-full" />
          ))}
        </div>
      ) : checks.length === 0 ? (
        <p className="text-gray-400 text-sm">
          No status checks yet. Send a ping above!
        </p>
      ) : (
        <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {checks.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between gap-3 rounded-lg bg-gray-900/40 px-4 py-2.5 border border-gray-700/50"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Pulse dot */}
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <span className="text-sm font-medium text-white truncate">
                  {c.client_name}
                </span>
              </div>
              <span className="text-xs text-gray-500 shrink-0 font-mono">
                {timeAgo(c.timestamp)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
