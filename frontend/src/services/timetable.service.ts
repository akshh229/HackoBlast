import api from "./api";

/** Shape of a single timetable slot */
export interface TimetableSlot {
  time: string;
  subject: string;
  room: string;
  type: "lecture" | "lab" | "break";
}

/** Mock timetable for offline / demo mode */
const MOCK_SLOTS: TimetableSlot[] = [
  { time: "09:00 – 10:00", subject: "Data Structures", room: "LH-301", type: "lecture" },
  { time: "10:00 – 11:00", subject: "Operating Systems", room: "LH-204", type: "lecture" },
  { time: "11:00 – 11:15", subject: "Break", room: "—", type: "break" },
  { time: "11:15 – 12:45", subject: "DBMS Lab", room: "Lab-2", type: "lab" },
  { time: "12:45 – 01:30", subject: "Lunch", room: "—", type: "break" },
  { time: "01:30 – 02:30", subject: "Computer Networks", room: "LH-102", type: "lecture" },
  { time: "02:30 – 03:30", subject: "Software Engineering", room: "LH-305", type: "lecture" },
];

/** Shape returned by the backend */
interface BackendEntry {
  title: string;
  day: string;
  startTime: string;
  endTime: string;
}

/**
 * Fetch today's timetable from the backend.
 * Falls back to mock data on failure.
 */
export async function fetchTimetable(): Promise<TimetableSlot[]> {
  try {
    const { data } = await api.get<BackendEntry[]>("/timetable");
    // Map backend shape → frontend display shape
    return data.map((e: BackendEntry) => ({
      time: `${e.startTime} – ${e.endTime}`,
      subject: e.title,
      room: "—",
      type: "lecture" as const,
    }));
  } catch (err) {
    console.warn("Backend unreachable — using mock timetable", err);
    return MOCK_SLOTS;
  }
}

/** Shape of an AI timetable insight */
export interface TimetableInsight {
  subject: string;
  tip: string;
  priority: "high" | "medium" | "low";
}

const MOCK_INSIGHTS: TimetableInsight[] = [
  { subject: "Data Structures", tip: "Revise tree traversal algorithms before class.", priority: "high" },
  { subject: "Operating Systems", tip: "Review process scheduling concepts.", priority: "medium" },
  { subject: "DBMS Lab", tip: "Prepare SQL queries for today's lab exercise.", priority: "high" },
];

/**
 * Fetch AI-generated timetable insights (Feature 5).
 * Falls back to mock data on failure.
 */
export async function fetchTimetableInsights(): Promise<TimetableInsight[]> {
  try {
    const { data } = await api.get<TimetableInsight[]>("/timetable/insights");
    return data;
  } catch (err) {
    console.warn("Backend unreachable — using mock timetable insights", err);
    return MOCK_INSIGHTS;
  }
}
