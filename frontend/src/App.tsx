import { useState } from "react";
import { isLoggedIn } from "./services/auth.service";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

/**
 * App — Root component.
 * Switches between Login and Dashboard based on token presence.
 */
export default function App() {
  // Track auth state so we can re-render on login/logout
  const [authed, setAuthed] = useState(isLoggedIn());

  return authed ? (
    <Dashboard onLogout={() => setAuthed(false)} />
  ) : (
    <Login onLogin={() => setAuthed(true)} />
  );
}
