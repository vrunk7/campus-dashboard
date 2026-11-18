
import { Trophy } from "lucide-react";
import students from "../data/students.json";
import { getStudentAverage } from "../utils/dashboardStats";
import "./Leaderboard.css";

function Leaderboard() {
  const topStudents = [...students]
    .sort(
      (a, b) => getStudentAverage(b) - getStudentAverage(a)
    )
    .slice(0, 5);

  return (
    <section className="leaderboard-card">
      <div className="leaderboard-header">
        <div>
          <span className="leaderboard-eyebrow">ACADEMIC EXCELLENCE</span>
          <h2>Top Performing Students</h2>
          <p>Ranked by overall average marks</p>
        </div>
        <Trophy size={25} className="trophy-icon" />
      </div>

      <div className="leaderboard-list">
        {topStudents.map((student, index) => (
          <div className="leaderboard-row" key={student.id}>
            <div className={`rank-number rank-${index + 1}`}>
              {index + 1}
            </div>

            <div className="leaderboard-avatar">
              {student.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div className="leaderboard-student">
              <strong>{student.name}</strong>
              <span>{student.class} · ID: {student.id}</span>
            </div>

            <div className="leaderboard-score">
              <strong>{getStudentAverage(student).toFixed(1)}</strong>
              <span>/ 100</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;
