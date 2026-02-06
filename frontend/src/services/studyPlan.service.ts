import api from "./api";

/** Shape of a single study-plan item */
export interface StudyPlanItem {
  subject: string;
  task: string;
  deadline: string;
  priority: "High" | "Medium" | "Low";
}

/** Mock study plan for offline / demo mode */
const MOCK_PLAN: StudyPlanItem[] = [
  { subject: "Data Structures", task: "Revise Binary Trees", deadline: "Feb 8", priority: "High" },
  { subject: "OS", task: "Practice scheduling algos", deadline: "Feb 9", priority: "Medium" },
  { subject: "DBMS", task: "Normalization worksheet", deadline: "Feb 10", priority: "Low" },
];

/**
 * Request AI-generated study plan.
 * Falls back to mock data on failure.
 */
export async function fetchStudyPlan(
  subjects?: string[],
  hoursPerDay?: number
): Promise<StudyPlanItem[]> {
  try {
    const { data } = await api.post<{ plan: { subject: string; hours: number }[] }>("/study-plan", {
      subjects: subjects ?? ["Data Structures", "OS", "DBMS"],
      hoursPerDay: hoursPerDay ?? 6,
    });
    // Map backend shape to frontend display shape
    return data.plan.map((block: { subject: string; hours: number }) => ({
      subject: block.subject,
      task: `Study ${block.subject}`,
      deadline: "This week",
      priority: block.hours >= 3 ? "High" : block.hours >= 2 ? "Medium" : "Low",
    }));
  } catch (err) {
    console.warn("Backend unreachable — using mock study plan", err);
    return MOCK_PLAN;
  }
}
