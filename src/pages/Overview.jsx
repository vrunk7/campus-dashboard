import students from "../data/students.json";
import { getDashboardStats } from "../utils/dashboardStats";
import { Users, CalendarCheck, BookOpen, AlertTriangle } from "lucide-react";
import StatCard from "../components/StatCard";
import AnalyticsCharts from "../components/AnalyticsCharts";
import AtRiskPreview from "../components/AtRiskPreview";
import Leaderboard from "../components/Leaderboard";
import "./Overview.css";

function Overview() {
  const stats = getDashboardStats(students);

  return (
    <div className="overview-page">
      <div className="page-heading">
        <div>
          <h1>Campus Overview</h1>
          <p>Here's what's happening with your students.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          subtitle="Registered students"
          icon={<Users size={23} />}
          color="var(--accent-lime)"
        />

        <StatCard
          title="Average Attendance"
          value={`${stats.averageAttendance}%`}
          subtitle="Across all students"
          icon={<CalendarCheck size={23} />}
          color="#8cb530"
        />

        <StatCard
          title="Average Marks"
          value={stats.averageMarks}
          subtitle="Overall academic average"
          icon={<BookOpen size={23} />}
          color="var(--status-warning-amber)"
        />

        <StatCard
          title="At-Risk Students"
          value={stats.atRiskCount}
          subtitle="Require attention"
          icon={<AlertTriangle size={23} />}
          color="var(--status-risk-red)"
        />
      </div>

      <AnalyticsCharts />
      <AtRiskPreview students={students} />
      <Leaderboard />
    </div>
  );
}

export default Overview;
