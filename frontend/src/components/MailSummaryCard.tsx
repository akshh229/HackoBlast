import type { Mail } from "../types";

interface Props {
  mail: Mail;
}

const URGENCY_COLORS: Record<string, string> = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#22c55e",
};

export default function MailSummaryCard({ mail }: Props) {
  return (
    <div className="card">
      <div className="card-header">
        <span
          className="badge"
          style={{ background: URGENCY_COLORS[mail.urgency] }}
        >
          {mail.urgency.toUpperCase()}
        </span>
        <span className="badge badge-outline">{mail.category}</span>
      </div>

      <p className="card-body">{mail.summary}</p>

      <p className="card-meta">
        {new Date(mail.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
