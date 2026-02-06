/**
 * auth.service.ts — Demo auth helpers (no real auth).
 * Sets/clears a fake token in localStorage.
 */

const TOKEN_KEY = "hackoblast_token";

/** Simulate login — stores a demo JWT-like token */
export function demoLogin(): void {
  localStorage.setItem(TOKEN_KEY, "demo-token-hackoblast-2026");
}

/** Clear the demo token */
export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/** Check if user is "logged in" */
export function isLoggedIn(): boolean {
  return !!localStorage.getItem(TOKEN_KEY);
}
