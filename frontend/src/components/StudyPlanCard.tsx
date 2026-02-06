import type { StudyPlanBlock } from "../types";

interface Props {
  plan: StudyPlanBlock[];
}

export default function StudyPlanCard({ plan }: Props) {
  if (plan.length === 0) {
    return <p className="text-muted">No study plan generated yet.</p>;
  }

  return (
    <div className="card">
      <h3>Your Study Plan</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {plan.map((block, i) => (
            <tr key={i}>
              <td>{block.subject}</td>
              <td>{block.hours}h</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
