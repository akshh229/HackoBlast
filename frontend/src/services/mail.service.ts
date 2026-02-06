import api from "./api";

/** Shape of a mail summary returned by the AI backend */
export interface MailSummary {
  summary: string;
  category: string;
  urgency: "High" | "Medium" | "Low";
}

/** Mock data used when backend is unreachable */
const MOCK_SUMMARY: MailSummary = {
  summary: "Exam postponed to Friday",
  category: "Academic",
  urgency: "High",
};

/**
 * Fetch the AI-generated mail summary.
 * Falls back to mock data if the API call fails.
 */
export async function fetchMailSummary(): Promise<MailSummary> {
  try {
    const { data } = await api.get<MailSummary>("/mail/summarize");
    return data;
  } catch (err) {
    console.warn("Backend unreachable — using mock mail summary", err);
    return MOCK_SUMMARY;
  }
}
