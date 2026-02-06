import api from "./api";

/** Shape of a status check record */
export interface StatusCheck {
  id: string;
  client_name: string;
  timestamp: string; // ISO 8601
}

/** Mock data for offline / demo mode */
const MOCK_CHECKS: StatusCheck[] = [
  { id: "mock-1", client_name: "HackoBlast Web App", timestamp: new Date().toISOString() },
  { id: "mock-2", client_name: "HackoBlast AI Service", timestamp: new Date(Date.now() - 900_000).toISOString() },
  { id: "mock-3", client_name: "HackoBlast Mobile Client", timestamp: new Date(Date.now() - 1_800_000).toISOString() },
];

/**
 * Fetch all status checks from the backend.
 * Falls back to mock data when backend is unreachable.
 */
export async function fetchStatusChecks(): Promise<StatusCheck[]> {
  try {
    const { data } = await api.get<StatusCheck[]>("/status");
    return data;
  } catch (err) {
    console.warn("Backend unreachable — using mock status checks", err);
    return MOCK_CHECKS;
  }
}

/**
 * Create a new status check.
 * Returns the created record.
 */
export async function createStatusCheck(clientName: string): Promise<StatusCheck> {
  const { data } = await api.post<StatusCheck>("/status", {
    client_name: clientName,
  });
  return data;
}
