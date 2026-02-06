import { useState } from "react";
import type { TimetableEntry } from "../types";
import { addEntry, deleteEntry } from "../services/timetable.service";

interface Props {
  entries: TimetableEntry[];
  onRefresh: () => void;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Timetable({ entries, onRefresh }: Props) {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState(DAYS[0]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [loading, setLoading] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await addEntry({ title: title.trim(), day, startTime, endTime });
      setTitle("");
      onRefresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to add entry");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteEntry(id);
      onRefresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  return (
    <div className="card">
      <h3>Timetable</h3>

      {/* ── Add form ── */}
      <form className="form-row" onSubmit={handleAdd}>
        <input
          placeholder="Class / Event"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          {DAYS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <button type="submit" disabled={loading}>
          {loading ? "Adding…" : "Add"}
        </button>
      </form>

      {/* ── Entries table ── */}
      {entries.length === 0 ? (
        <p className="text-muted">No timetable entries yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Day</th>
              <th>Start</th>
              <th>End</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.title}</td>
                <td>{entry.day}</td>
                <td>{entry.startTime}</td>
                <td>{entry.endTime}</td>
                <td>
                  <button className="btn-sm btn-danger" onClick={() => handleDelete(entry._id)}>
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
