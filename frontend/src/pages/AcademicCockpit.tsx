import MailSummaryCard from "../components/MailSummaryCard";
import StudyPlanCard from "../components/StudyPlanCard";
import Timetable from "../components/Timetable";

/**
 * AcademicCockpit — Combined academic overview page.
 * Shows timetable, study plan, and mail summary in one view.
 */
export default function AcademicCockpit() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-white">🎓 Academic Cockpit</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <MailSummaryCard />
        <StudyPlanCard />
        <div className="md:col-span-2">
          <Timetable />
        </div>
      </div>
    </section>
  );
}
