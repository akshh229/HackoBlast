/* ── Shared TypeScript types matching the backend models ── */

// ── Auth ────────────────────────────────────────────
export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

// ── Mail ────────────────────────────────────────────
export type Urgency = "low" | "medium" | "high";

export interface Mail {
  _id: string;
  userId: string;
  rawText: string;
  summary: string;
  category: string;
  urgency: Urgency;
  createdAt: string;
}

export interface MailSummarizeResponse {
  mail: Mail;
  ai: { summary: string; category: string; urgency: Urgency };
}

// ── Study Plan ──────────────────────────────────────
export interface StudyPlanBlock {
  subject: string;
  hours: number;
}

export interface StudyPlanResponse {
  userId: string;
  plan: StudyPlanBlock[];
}

// ── Timetable ───────────────────────────────────────
export interface TimetableEntry {
  _id: string;
  userId: string;
  title: string;
  day: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

// ── Notifications ───────────────────────────────────
export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
}
