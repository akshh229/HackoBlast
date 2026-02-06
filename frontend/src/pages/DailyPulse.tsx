import MailSummaryCard from "../components/MailSummaryCard";
import Timetable from "../components/Timetable";
import SmartInsightsCard from "../components/SmartInsightsCard";

/**
 * DailyPulse — AI-powered daily overview page.
 * Shows today's timetable, the latest mail summary, and AI smart insights.
 */
export default function DailyPulse() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-white">⚡ Daily Pulse</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Timetable />
        <div className="space-y-6">
          <MailSummaryCard />
          <SmartInsightsCard />
        </div>
      </div>
    </section>
  );
}
