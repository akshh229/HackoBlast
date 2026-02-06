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
 * Fetch AI-generated study plan.
 * Falls back to mock data on failure.
 */
export async function fetchStudyPlan(): Promise<StudyPlanItem[]> {
  try {
    const { data } = await api.get<StudyPlanItem[]>("/study-plan");
    return data;
  } catch (err) {
    console.warn("Backend unreachable — using mock study plan", err);
    return MOCK_PLAN;
  }
}
