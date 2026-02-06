import { api } from "../api";
import type { AuthResponse } from "../types";

/** POST /api/auth/register */
export function register(email: string, password: string, name: string) {
  return api.post<AuthResponse>("/auth/register", { email, password, name }, false);
}

/** POST /api/auth/login */
export function login(email: string, password: string) {
  return api.post<AuthResponse>("/auth/login", { email, password }, false);
}

/** Persist token + user after login / register */
export function saveSession(res: AuthResponse) {
  localStorage.setItem("token", res.token);
  localStorage.setItem("user", JSON.stringify(res.user));
}

/** Clear session */
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

/** Get the current user from localStorage (or null) */
export function currentUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

/** Check if user is logged in */
export function isLoggedIn(): boolean {
  return !!localStorage.getItem("token");
}
