import { api } from "../api";
import type { TimetableEntry } from "../types";

/** GET /api/timetable */
export function getEntries() {
  return api.get<TimetableEntry[]>("/timetable");
}

/** POST /api/timetable */
export function addEntry(data: {
  title: string;
  day: string;
  startTime: string;
  endTime: string;
}) {
  return api.post<TimetableEntry>("/timetable", data);
}

/** PUT /api/timetable/:id */
export function updateEntry(
  id: string,
  data: Partial<{ title: string; day: string; startTime: string; endTime: string }>
) {
  return api.put<TimetableEntry>(`/timetable/${id}`, data);
}

/** DELETE /api/timetable/:id */
export function deleteEntry(id: string) {
  return api.delete<{ message: string }>(`/timetable/${id}`);
}
