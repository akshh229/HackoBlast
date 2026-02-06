/**
 * AI service — powered by Google Gemini.
 * Provides mail summarisation and study-plan generation.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// ── Gemini client ──────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// ── Mail summarisation ─────────────────────────────

interface MailSummaryResult {
  summary: string;
  category: string;
  urgency: "low" | "medium" | "high";
}

/**
 * Summarise an email body using Gemini and return summary + category + urgency.
 */
export async function summarizeMail(text: string): Promise<MailSummaryResult> {
  const safeText = typeof text === "string" ? text : "";

  try {
    const prompt = `You are an AI assistant for a university student. Analyse the following email and respond ONLY with valid JSON (no markdown, no code fences) in this exact shape:
{
  "summary": "<concise 1-2 sentence summary>",
  "category": "<one of: academic, event, finance, general>",
  "urgency": "<one of: low, medium, high>"
}

Email:
"""
${safeText}
"""`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();
    // Strip possible markdown code fences
    const json = raw.replace(/^```json?\s*/i, "").replace(/```\s*$/i, "").trim();
    const parsed = JSON.parse(json);

    return {
      summary: parsed.summary || safeText.substring(0, 120),
      category: parsed.category || "general",
      urgency: ["low", "medium", "high"].includes(parsed.urgency) ? parsed.urgency : "low",
    };
  } catch (err) {
    console.error("Gemini mail summarisation failed, using fallback:", err);
    return fallbackSummarizeMail(safeText);
  }
}

/** Keyword-based fallback when Gemini is unavailable */
function fallbackSummarizeMail(text: string): MailSummaryResult {
  const lower = text.toLowerCase();

  let urgency: "low" | "medium" | "high" = "low";
  if (lower.includes("urgent") || lower.includes("asap") || lower.includes("deadline")) {
    urgency = "high";
  } else if (lower.includes("important") || lower.includes("action required")) {
    urgency = "medium";
  }

  let category = "general";
  if (lower.includes("exam") || lower.includes("assignment") || lower.includes("grade")) {
    category = "academic";
  } else if (lower.includes("meeting") || lower.includes("event")) {
    category = "event";
  } else if (lower.includes("invoice") || lower.includes("payment")) {
    category = "finance";
  }

  const summary = text.length > 120 ? text.substring(0, 120) + "…" : text;
  return { summary, category, urgency };
}

// ── Study plan generation ──────────────────────────

export interface StudyPlanInput {
  subjects: string[];
  hoursPerDay: number;
}

export interface StudyPlanBlock {
  subject: string;
  hours: number;
}

/**
 * Generate an AI-powered study plan using Gemini.
 */
export async function generateStudyPlan(
  input: StudyPlanInput
): Promise<StudyPlanBlock[]> {
  const { subjects, hoursPerDay } = input;
  if (subjects.length === 0) return [];

  try {
    const prompt = `You are a study-planning assistant for a university student. Given the following subjects and available study hours per day, create an optimised daily study plan.

Subjects: ${subjects.join(", ")}
Hours per day: ${hoursPerDay}

Respond ONLY with valid JSON (no markdown, no code fences) — an array of objects:
[
  { "subject": "<name>", "hours": <number> }
]

Distribute hours wisely — harder/more important subjects may get more time. The total hours must equal ${hoursPerDay}.`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();
    const json = raw.replace(/^```json?\s*/i, "").replace(/```\s*$/i, "").trim();
    const parsed: StudyPlanBlock[] = JSON.parse(json);

    return parsed.map((b) => ({
      subject: b.subject,
      hours: Number(b.hours) || +(hoursPerDay / subjects.length).toFixed(1),
    }));
  } catch (err) {
    console.error("Gemini study plan generation failed, using fallback:", err);
    // Fallback: equal distribution
    const perSubject = +(hoursPerDay / subjects.length).toFixed(1);
    return subjects.map((subject) => ({ subject, hours: perSubject }));
  }
}

// ── AI Smart Timetable Insights ────────────────────

export interface TimetableInsight {
  subject: string;
  tip: string;
  priority: "high" | "medium" | "low";
}

/**
 * Analyse a student's timetable and generate AI-powered focus tips.
 * Feature 5: Smart AI insights on what to prepare for today.
 */
export async function generateTimetableInsights(
  entries: { title: string; day: string; startTime: string; endTime: string }[]
): Promise<TimetableInsight[]> {
  if (entries.length === 0) return [];

  try {
    const schedule = entries
      .map((e) => `${e.title} (${e.day} ${e.startTime}–${e.endTime})`)
      .join("\n");

    const prompt = `You are an AI academic advisor for a university student. Based on their timetable for today, provide a short preparation tip for each class along with a priority level.

Today's schedule:
${schedule}

Respond ONLY with valid JSON (no markdown, no code fences) — an array of objects:
[
  { "subject": "<class name>", "tip": "<1 sentence preparation tip>", "priority": "<high|medium|low>" }
]`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();
    const json = raw.replace(/^```json?\s*/i, "").replace(/```\s*$/i, "").trim();
    const parsed: TimetableInsight[] = JSON.parse(json);

    return parsed.map((t) => ({
      subject: t.subject || "Unknown",
      tip: t.tip || "Review your notes before class.",
      priority: ["high", "medium", "low"].includes(t.priority) ? t.priority : "medium",
    }));
  } catch (err) {
    console.error("Gemini timetable insights failed, using fallback:", err);
    return entries.map((e) => ({
      subject: e.title,
      tip: "Review your notes before class.",
      priority: "medium" as const,
    }));
  }
}
