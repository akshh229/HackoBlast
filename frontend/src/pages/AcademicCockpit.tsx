import MailSummaryCard from "../components/MailSummaryCard";
import StudyPlanCard from "../components/StudyPlanCard";
import Timetable from "../components/Timetable";
import SmartInsightsCard from "../components/SmartInsightsCard";

/**
 * AcademicCockpit — Combined AI-powered academic overview page.
 * Shows timetable, study plan, mail summary, and AI smart insights.
 */
export default function AcademicCockpit() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-white">🎓 Academic Cockpit</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <MailSummaryCard />
        <StudyPlanCard />
        <SmartInsightsCard />
        <div className="md:col-span-2">
          <Timetable />
        </div>
      </div>
    </section>
  );
}
