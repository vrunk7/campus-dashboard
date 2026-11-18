
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowRight, Users } from "lucide-react";

import students from "../data/students.json";
import { getStudentAverage, isAtRisk } from "../utils/dashboardStats";

import "./AtRiskPreview.css";

function AtRiskPreview() {
  const navigate = useNavigate();

  const atRiskStudents = students
    .filter((student) => isAtRisk(student))
    .sort((a, b) => a.attendance - b.attendance);

  const previewStudents = atRiskStudents.slice(0, 4);

  const openStudentRecords = (student = null) => {
    const params = new URLSearchParams({ status: "at-risk" });

    if (student) {
      params.set("search", student.name);
    }

    navigate(`/students?${params.toString()}`);
  };

  return (
    <section className="risk-preview-card">
      <div className="risk-preview-header">
        <div>
          <span className="risk-preview-eyebrow">STUDENT MONITORING</span>
          <h2>Students Requiring Attention</h2>
          <p>Students currently meeting the at-risk criteria.</p>
        </div>

        <div className="risk-total">
          <AlertTriangle size={18} />
          <strong>{atRiskStudents.length}</strong>
        </div>
      </div>

      <div className="risk-summary">
        <div className="risk-summary-icon">
          <Users size={18} />
        </div>

        <div>
          <strong>{atRiskStudents.length} students identified</strong>
          <p>
            Attendance below 75% or average marks below 40.
          </p>
        </div>
      </div>

      <div className="risk-student-list">
        {previewStudents.map((student) => {
          const average = getStudentAverage(student);

          return (
            <div className="risk-student-row" key={student.id}>
              <div className="risk-student-identity">
                <div className="risk-student-avatar">
                  {student.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

                <div className="risk-student-name">
                  <strong>{student.name}</strong>
                  <span>
                    ID: {student.id} · {student.class}
                  </span>
                </div>
              </div>

              <div className="risk-student-metrics">
                <div>
                  <span>Attendance</span>
                  <strong className="risk-text">
                    {student.attendance}%
                  </strong>
                  <div className="risk-mini-track">
                    <div
                      // className="risk-mini-fill"
                      // style={{ width: `${student.attendance}%` }}
                      className={`risk-mini-fill ${
  student.attendance < 75 ? "progress-risk" : "progress-good"
}`}
                    ></div>
                  </div>
                </div>

                <div>
                  <span>Avg. Marks</span>
                  <strong className={average < 40 ? "risk-text" : ""}>
                    {average.toFixed(1)}
                  </strong>
                </div>
              </div>

              <button
                className="risk-find-button"
                onClick={() => openStudentRecords(student)}
                title={`Find ${student.name} in Student Records`}
              >
                <ArrowRight size={17} />
              </button>
            </div>
          );
        })}
      </div>

      <button
        className="risk-view-all"
        onClick={() => openStudentRecords()}
      >
        View All At-Risk Students
        <ArrowRight size={16} />
      </button>
    </section>
  );
}

export default AtRiskPreview;
