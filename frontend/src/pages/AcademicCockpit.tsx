import { useEffect, useState } from "react";
import type { TimetableEntry, StudyPlanBlock } from "../types";
import { getEntries } from "../services/timetable.service";
import { generateStudyPlan } from "../services/studyPlan.service";
import Timetable from "../components/Timetable";
import StudyPlanCard from "../components/StudyPlanCard";

interface Props {
  onBack: () => void;
}

export default function AcademicCockpit({ onBack }: Props) {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [plan, setPlan] = useState<StudyPlanBlock[]>([]);

  // Study plan form
  const [subjects, setSubjects] = useState("");
  const [hours, setHours] = useState(4);
  const [planLoading, setPlanLoading] = useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      const data = await getEntries();
      setEntries(data);
    } catch {
      /* silent */
    }
  }

  async function handleGeneratePlan(e: React.FormEvent) {
    e.preventDefault();
    const list = subjects
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (list.length === 0) return;
    setPlanLoading(true);
    try {
      const res = await generateStudyPlan(list, hours);
      setPlan(res.plan);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Plan generation failed");
    } finally {
      setPlanLoading(false);
    }
  }

  return (
    <div className="page">
      <button className="btn-link" onClick={onBack}>← Back to Dashboard</button>
      <h2>📚 Academic Cockpit</h2>

      {/* ── Timetable section ── */}
      <section>
        <Timetable entries={entries} onRefresh={loadEntries} />
      </section>

      {/* ── Study Plan Generator ── */}
      <section>
        <h3>Study Plan Generator</h3>
        <form className="form-row" onSubmit={handleGeneratePlan}>
          <input
            placeholder="Subjects (comma-separated)"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            required
          />
          <label>
            Hours/day:
            <input
              type="number"
              min={1}
              max={16}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              style={{ width: 60, marginLeft: 8 }}
            />
          </label>
          <button type="submit" disabled={planLoading}>
            {planLoading ? "Generating…" : "Generate Plan"}
          </button>
        </form>

        <StudyPlanCard plan={plan} />
      </section>
    </div>
  );
}
