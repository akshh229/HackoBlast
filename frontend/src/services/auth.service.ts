/**
 * auth.service.ts — Auth helpers.
 * Calls the real backend for register/login, stores JWT in localStorage.
 * Falls back to a demo token when backend is unreachable.
 */

import api from "./api";

const TOKEN_KEY = "hackoblast_token";

/** Register a new user, store the JWT */
export async function register(name: string, email: string, password: string): Promise<void> {
  const { data } = await api.post("/auth/register", { name, email, password });
  localStorage.setItem(TOKEN_KEY, data.token);
}

/** Login and store the JWT */
export async function login(email: string, password: string): Promise<void> {
  const { data } = await api.post("/auth/login", { email, password });
  localStorage.setItem(TOKEN_KEY, data.token);
}

/** Demo login — tries the backend first, falls back to a static token */
export async function demoLogin(): Promise<void> {
  try {
    // Try registering a demo user (ignored if already exists)
    try {
      await register("Demo User", "demo@hackoblast.dev", "demo123456");
      return;
    } catch {
      // Already registered — try login instead
    }
    await login("demo@hackoblast.dev", "demo123456");
  } catch {
    // Backend unreachable — use a static demo token so the UI still works
    localStorage.setItem(TOKEN_KEY, "demo-token-hackoblast-2026");
  }
}

/** Clear the token */
export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/** Check if user is "logged in" */
export function isLoggedIn(): boolean {
  return !!localStorage.getItem(TOKEN_KEY);
}
