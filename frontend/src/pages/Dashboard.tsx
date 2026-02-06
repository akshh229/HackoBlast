import { useEffect, useState } from "react";
import type { Mail, TimetableEntry, StudyPlanBlock } from "../types";
import { listMails } from "../services/mail.service";
import { getEntries } from "../services/timetable.service";
import { currentUser } from "../services/auth.service";
import MailSummaryCard from "../components/MailSummaryCard";
import NotificationBell from "../components/NotificationBell";

interface Props {
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onNavigate }: Props) {
  const user = currentUser();
  const [mails, setMails] = useState<Mail[]>([]);
  const [entries, setEntries] = useState<TimetableEntry[]>([]);

  useEffect(() => {
    listMails().then(setMails).catch(() => {});
    getEntries().then(setEntries).catch(() => {});
  }, []);

  // Show only the 3 most recent mails
  const recentMails = mails.slice(0, 3);
  // Today's timetable entries
  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayEntries = entries.filter((e) => e.day === todayName);

  return (
    <div className="page">
      {/* ── Top Bar ── */}
      <header className="topbar">
        <h1>⚡ HackoBlast</h1>
        <NotificationBell />
      </header>

      <h2>Welcome, {user?.name || "Student"} 👋</h2>

      {/* ── Quick nav cards ── */}
      <div className="grid grid-3">
        <button className="nav-card" onClick={() => onNavigate("daily-pulse")}>
          📬 Daily Pulse
        </button>
        <button className="nav-card" onClick={() => onNavigate("academic-cockpit")}>
          📚 Academic Cockpit
        </button>
      </div>

      {/* ── Today's Schedule ── */}
      <section>
        <h3>Today's Schedule — {todayName}</h3>
        {todayEntries.length === 0 ? (
          <p className="text-muted">Nothing scheduled for today.</p>
        ) : (
          <table className="table">
            <thead>
              <tr><th>Title</th><th>Start</th><th>End</th></tr>
            </thead>
            <tbody>
              {todayEntries.map((e) => (
                <tr key={e._id}>
                  <td>{e.title}</td>
                  <td>{e.startTime}</td>
                  <td>{e.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* ── Recent Mails ── */}
      <section>
        <h3>Recent Mail Summaries</h3>
        {recentMails.length === 0 ? (
          <p className="text-muted">No mails summarized yet.</p>
        ) : (
          <div className="grid grid-3">
            {recentMails.map((m) => (
              <MailSummaryCard key={m._id} mail={m} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
