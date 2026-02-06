import { useState } from "react";
import { demoLogin } from "../services/auth.service";

/**
 * Login page — single "Demo Login" button.
 * Calls the backend to create/login a demo user, then flips to Dashboard.
 */
interface Props {
  onLogin: () => void;
}

export default function Login({ onLogin }: Props) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await demoLogin();
      onLogin();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <div className="w-full max-w-sm rounded-2xl bg-gray-800/70 border border-gray-700 p-8 text-center backdrop-blur shadow-xl">
        {/* Logo / Title */}
        <h1 className="text-3xl font-bold text-white mb-1">🚀 HackoBlast</h1>
        <p className="text-gray-400 text-sm mb-8">
          Your AI-Powered Academic Cockpit
        </p>

        {/* Demo login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 transition-colors"
        >
          {loading ? "Signing in…" : "Demo Login"}
        </button>

        <p className="text-gray-500 text-xs mt-4">
          No credentials needed — this is a demo.
        </p>
      </div>
    </div>
  );
}
