import MailSummaryCard from "../components/MailSummaryCard";
import Timetable from "../components/Timetable";

/**
 * DailyPulse — Quick daily overview page.
 * Shows today's timetable and the latest mail summary at a glance.
 */
export default function DailyPulse() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-white">⚡ Daily Pulse</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Timetable />
        <MailSummaryCard />
      </div>
    </section>
  );
}
