import { useState } from "react";
import { login, register, saveSession } from "../services/auth.service";

interface Props {
  onAuth: () => void;
}

export default function Login({ onAuth }: Props) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = isRegister
        ? await register(email.trim(), password, name.trim())
        : await login(email.trim(), password);
      saveSession(res);
      onAuth();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="brand">⚡ HackoBlast</h1>
        <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Please wait…" : isRegister ? "Register" : "Log In"}
          </button>
        </form>

        <p className="toggle-auth">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button className="btn-link" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Log In" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
