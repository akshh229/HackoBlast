import { useState } from "react";
import { isLoggedIn, logout } from "./services/auth.service";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DailyPulse from "./pages/DailyPulse";
import AcademicCockpit from "./pages/AcademicCockpit";

export default function App() {
  const [authed, setAuthed] = useState(isLoggedIn());
  const [page, setPage] = useState("dashboard");

  if (!authed) {
    return <Login onAuth={() => setAuthed(true)} />;
  }

  function handleLogout() {
    logout();
    setAuthed(false);
  }

  return (
    <div className="app">
      {/* ── Top-level logout control ── */}
      <div className="logout-bar">
        <button className="btn-link" onClick={handleLogout}>Log out</button>
      </div>

      {/* ── Page Router ── */}
      {page === "dashboard" && <Dashboard onNavigate={setPage} />}
      {page === "daily-pulse" && <DailyPulse onBack={() => setPage("dashboard")} />}
      {page === "academic-cockpit" && <AcademicCockpit onBack={() => setPage("dashboard")} />}
    </div>
  );
}
