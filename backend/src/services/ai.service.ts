/**
 * Lightweight AI service — placeholder logic for the hackathon.
 * Swap the body with a real LLM call (OpenAI, Gemini, etc.) later.
 */

interface MailSummaryResult {
  summary: string;
  category: string;
  urgency: "low" | "medium" | "high";
}

/**
 * Summarise an email body and return summary + category + urgency.
 */
export async function summarizeMail(text: string): Promise<MailSummaryResult> {
  // Guard against null/undefined input
  const safeText = typeof text === "string" ? text : "";
  const lower = safeText.toLowerCase();

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

  // Naive summary: first 120 chars
  const summary =
    safeText.length > 120 ? safeText.substring(0, 120) + "…" : safeText;

  return { summary, category, urgency };
}

/**
 * Generate a simple study plan from a list of subjects and available hours.
 */
export interface StudyPlanInput {
  subjects: string[];
  hoursPerDay: number;
}

export interface StudyPlanBlock {
  subject: string;
  hours: number;
}

export async function generateStudyPlan(
  input: StudyPlanInput
): Promise<StudyPlanBlock[]> {
  const { subjects, hoursPerDay } = input;
  if (subjects.length === 0) return [];

  // Distribute hours evenly across subjects
  const perSubject = +(hoursPerDay / subjects.length).toFixed(1);
  return subjects.map((subject) => ({ subject, hours: perSubject }));
}
