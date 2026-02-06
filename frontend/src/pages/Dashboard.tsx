import { useState } from "react";
import MailSummaryCard from "../components/MailSummaryCard";
import Timetable from "../components/Timetable";
import StudyPlanCard from "../components/StudyPlanCard";
import NotificationBell from "../components/NotificationBell";
import DailyPulse from "./DailyPulse";
import AcademicCockpit from "./AcademicCockpit";
import { logout } from "../services/auth.service";

/**
 * Dashboard — Main authenticated view with tab navigation.
 * Shows AI Mail Summary, Timetable, Study Plan, Daily Pulse, and Academic Cockpit.
 */
interface Props {
  onLogout: () => void;
}

type Tab = "home" | "daily-pulse" | "academic-cockpit";

/** Return a time-appropriate greeting */
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning! 👋";
  if (hour < 17) return "Good afternoon! 👋";
  return "Good evening! 👋";
}

export default function Dashboard({ onLogout }: Props) {
  const [tab, setTab] = useState<Tab>("home");

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "home", label: "Home", icon: "🏠" },
    { key: "daily-pulse", label: "Daily Pulse", icon: "⚡" },
    { key: "academic-cockpit", label: "Academic Cockpit", icon: "🎓" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top navbar */}
      <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur border-b border-gray-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <h1 className="text-xl font-bold tracking-tight">
            🚀 <span className="text-indigo-400">HackoBlast</span>
          </h1>

          <div className="flex items-center gap-4">
            <NotificationBell />
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="mx-auto max-w-6xl px-6">
          <nav className="flex gap-1 -mb-px">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
                  tab === t.key
                    ? "bg-gray-800 text-indigo-400 border border-gray-700 border-b-transparent"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Dashboard content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {tab === "home" && (
          <>
            <h2 className="text-2xl font-bold mb-6">{getGreeting()}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <MailSummaryCard />
              <StudyPlanCard />
              <div className="md:col-span-2">
                <Timetable />
              </div>
            </div>
          </>
        )}

        {tab === "daily-pulse" && <DailyPulse />}
        {tab === "academic-cockpit" && <AcademicCockpit />}
      </main>
    </div>
  );
}
