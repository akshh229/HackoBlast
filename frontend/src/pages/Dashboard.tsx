import MailSummaryCard from "../components/MailSummaryCard";
import Timetable from "../components/Timetable";
import StudyPlanCard from "../components/StudyPlanCard";
import NotificationBell from "../components/NotificationBell";
import { logout } from "../services/auth.service";

/**
 * Dashboard — Main authenticated view.
 * Shows AI Mail Summary, Timetable, Study Plan, and Notification Bell.
 */
interface Props {
  onLogout: () => void;
}

/** Return a time-appropriate greeting */
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning! 👋";
  if (hour < 17) return "Good afternoon! 👋";
  return "Good evening! 👋";
}

export default function Dashboard({ onLogout }: Props) {
  const handleLogout = () => {
    logout();
    onLogout();
  };

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
      </header>

      {/* Dashboard content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">
          {getGreeting()}
        </h2>

        {/* Grid layout for dashboard cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <MailSummaryCard />
          <StudyPlanCard />
          <div className="md:col-span-2">
            <Timetable />
          </div>
        </div>
      </main>
    </div>
  );
}
