import { api } from "../api";
import type { StudyPlanResponse } from "../types";

/** POST /api/study-plan */
export function generateStudyPlan(subjects: string[], hoursPerDay: number) {
  return api.post<StudyPlanResponse>("/study-plan", { subjects, hoursPerDay });
}
