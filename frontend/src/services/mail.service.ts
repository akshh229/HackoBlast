import { api } from "../api";
import type { Mail, MailSummarizeResponse } from "../types";

/** POST /api/mail/summarize */
export function summarizeMail(text: string) {
  return api.post<MailSummarizeResponse>("/mail/summarize", { text });
}

/** GET /api/mail */
export function listMails() {
  return api.get<Mail[]>("/mail");
}
