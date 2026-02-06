import api from "./api";

/** Shape of a mail summary returned by the AI backend */
export interface MailSummary {
  summary: string;
  category: string;
  urgency: "high" | "medium" | "low";
}

/** Mock data used when backend is unreachable */
const MOCK_SUMMARY: MailSummary = {
  summary: "Exam postponed to Friday",
  category: "academic",
  urgency: "high",
};

/**
 * Submit mail text for AI summarisation.
 * Falls back to mock data if the API call fails.
 */
export async function fetchMailSummary(text?: string): Promise<MailSummary> {
  try {
    const { data } = await api.post<{ ai: MailSummary }>("/mail/summarize", {
      text: text ?? "Sample mail for demo — exam postponed to Friday",
    });
    return data.ai;
  } catch (err) {
    console.warn("Backend unreachable — using mock mail summary", err);
    return MOCK_SUMMARY;
  }
}
