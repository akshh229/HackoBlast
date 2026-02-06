/* ── Thin HTTP wrapper around fetch for the HackoBlast API ── */

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/** Get stored JWT */
function getToken(): string | null {
  return localStorage.getItem("token");
}

/** Build common headers */
function headers(withAuth = true): HeadersInit {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (withAuth) {
    const t = getToken();
    if (t) h["Authorization"] = `Bearer ${t}`;
  }
  return h;
}

/** Generic request helper */
async function request<T>(
  path: string,
  opts: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, opts);
  const body = await res.json();
  if (!res.ok) throw new Error(body.error || "Request failed");
  return body as T;
}

export const api = {
  get<T>(path: string) {
    return request<T>(path, { headers: headers() });
  },
  post<T>(path: string, data: unknown, auth = true) {
    return request<T>(path, {
      method: "POST",
      headers: headers(auth),
      body: JSON.stringify(data),
    });
  },
  put<T>(path: string, data: unknown) {
    return request<T>(path, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(data),
    });
  },
  delete<T>(path: string) {
    return request<T>(path, { method: "DELETE", headers: headers() });
  },
};
