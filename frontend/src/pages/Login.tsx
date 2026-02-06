import { demoLogin } from "../services/auth.service";

/**
 * Login page — single "Demo Login" button.
 * Sets a fake token and calls onLogin to flip to Dashboard.
 */
interface Props {
  onLogin: () => void;
}

export default function Login({ onLogin }: Props) {
  const handleLogin = () => {
    demoLogin();
    onLogin();
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
          className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 transition-colors"
        >
          Demo Login
        </button>

        <p className="text-gray-500 text-xs mt-4">
          No credentials needed — this is a demo.
        </p>
      </div>
    </div>
  );
}
