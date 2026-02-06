import { useEffect, useState } from "react";
import type { Mail } from "../types";
import { summarizeMail, listMails } from "../services/mail.service";
import MailSummaryCard from "../components/MailSummaryCard";

interface Props {
  onBack: () => void;
}

export default function DailyPulse({ onBack }: Props) {
  const [mails, setMails] = useState<Mail[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMails();
  }, []);

  async function loadMails() {
    try {
      const data = await listMails();
      setMails(data);
    } catch {
      /* silent */
    }
  }

  async function handleSummarize(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      await summarizeMail(text.trim());
      setText("");
      await loadMails();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Summarization failed");
    } finally {
      setLoading(false);
    }
  }

  // Group by urgency
  const high = mails.filter((m) => m.urgency === "high");
  const medium = mails.filter((m) => m.urgency === "medium");
  const low = mails.filter((m) => m.urgency === "low");

  return (
    <div className="page">
      <button className="btn-link" onClick={onBack}>← Back to Dashboard</button>
      <h2>📬 Daily Pulse — Mail Summarizer</h2>

      {/* ── Compose / Paste ── */}
      <form className="compose-form" onSubmit={handleSummarize}>
        <textarea
          rows={5}
          placeholder="Paste an email body here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Summarizing…" : "Summarize"}
        </button>
      </form>

      {/* ── Urgency sections ── */}
      {high.length > 0 && (
        <section>
          <h3>🔴 High Urgency</h3>
          <div className="grid grid-3">
            {high.map((m) => <MailSummaryCard key={m._id} mail={m} />)}
          </div>
        </section>
      )}
      {medium.length > 0 && (
        <section>
          <h3>🟡 Medium Urgency</h3>
          <div className="grid grid-3">
            {medium.map((m) => <MailSummaryCard key={m._id} mail={m} />)}
          </div>
        </section>
      )}
      {low.length > 0 && (
        <section>
          <h3>🟢 Low Urgency</h3>
          <div className="grid grid-3">
            {low.map((m) => <MailSummaryCard key={m._id} mail={m} />)}
          </div>
        </section>
      )}

      {mails.length === 0 && (
        <p className="text-muted">No mails yet. Paste an email above to get started.</p>
      )}
    </div>
  );
}
