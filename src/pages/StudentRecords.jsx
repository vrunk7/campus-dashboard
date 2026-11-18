import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Eye, X } from "lucide-react";

import students from "../data/students.json";
import { getStudentAverage, isAtRisk } from "../utils/dashboardStats";
import "./StudentRecords.css";

function StudentRecords() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [selectedId, setSelectedId] = useState(null);

  const statusFilter = searchParams.get("status") || "All";

  const classes = [...new Set(students.map((student) => student.class))];

  // Apply search and filters
  let filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      String(student.id).includes(search);

    const matchesClass = classFilter === "All" || student.class === classFilter;

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "at-risk" && isAtRisk(student)) ||
      (statusFilter === "good" && !isAtRisk(student));

    return matchesSearch && matchesClass && matchesStatus;
  });

  // Apply sorting
  filteredStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "attendance") {
      return a.attendance - b.attendance;
    }

    if (sortBy === "marks") {
      return getStudentAverage(a) - getStudentAverage(b);
    }

    return a.id - b.id;
  });

  const selectedStudent = filteredStudents.find(
    (student) => student.id === selectedId,
  );

  const changeStatus = (value) => {
    if (value === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ status: value });
    }
    setSelectedId(null);
  };

  return (
    <div className="records-page">
      <div className="page-heading">
        <div>
          <h1>Student Records</h1>
          <p>Search, filter and view student academic information.</p>
        </div>
      </div>

      <div className="records-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by student name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        >
          <option value="All">All Classes</option>
          {classes.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => changeStatus(e.target.value)}
        >
          <option value="All">All Students</option>
          <option value="good">Good</option>
          <option value="at-risk">At Risk</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="attendance">Lowest Attendance</option>
          <option value="marks">Lowest Average Marks</option>
          <option value="id">Student ID</option>
        </select>
      </div>

      <div className="records-count">
        Showing <strong>{filteredStudents.length}</strong> of{" "}
        <strong>{students.length}</strong> students
      </div>

      <div className="records-content">
        <div className="table-card">
          <div className="table-scroll">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Attendance</th>
                  <th>Average Marks</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => {
                  const average = getStudentAverage(student);
                  const atRisk = isAtRisk(student);

                  return (
                    <tr
                      key={student.id}
                      className={
                        selectedId === student.id ? "selected-row" : ""
                      }
                    >
                      <td>
                        <div className="student-identity">
                          <div className="student-avatar">
                            {student.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>{student.name}</strong>
                            <span className="student-id">ID: {student.id}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="class-badge">{student.class}</span>
                      </td>

                      <td>
                        <div className="attendance-cell">
                          <strong>{student.attendance}%</strong>

                          <div className="progress-track">
                            <div
                              className={`progress-fill ${
                                student.attendance < 75
                                  ? "progress-risk"
                                  : student.attendance < 80
                                    ? "progress-warning"
                                    : "progress-good"
                              }`}
                              style={{ width: `${student.attendance}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <strong
                          className={`marks-value ${
                            average < 40
                              ? "marks-risk"
                              : average >= 75
                                ? "marks-excellent"
                                : ""
                          }`}
                        >
                          {average.toFixed(1)}
                        </strong>
                        <span className="marks-out-of">/ 100</span>
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            atRisk ? "status-risk" : "status-good"
                          }`}
                        >
                          {atRisk ? "At Risk" : "Good"}
                        </span>
                      </td>

                      <td>
                        <button
                          className="view-button"
                          onClick={() => setSelectedId(student.id)}
                        >
                          <Eye size={15} />
                          View Profile
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-message">
                      No students match your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedStudent && (
          <div className="student-detail-card">
            {/* Profile heading */}
            <div className="detail-header">
              <div>
                <span className="detail-eyebrow">STUDENT PROFILE</span>
                <h2>Academic Dossier</h2>
              </div>

              <button
                className="close-detail"
                onClick={() => setSelectedId(null)}
                aria-label="Close student details"
              >
                <X size={19} />
              </button>
            </div>

            {/* Student identity */}
            <div className="profile-hero">
              <div className="profile-avatar">
                {selectedStudent.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div className="profile-identity">
                <h3>{selectedStudent.name}</h3>
                <p>
                  ID: {selectedStudent.id} · {selectedStudent.class}
                </p>

                <span
                  className={`status-badge ${
                    isAtRisk(selectedStudent) ? "status-risk" : "status-good"
                  }`}
                >
                  {isAtRisk(selectedStudent) ? "At Risk" : "Good Standing"}
                </span>
              </div>
            </div>

            {/* Three performance statistics */}
            <div className="profile-stats">
              <div className="profile-stat">
                <span>Attendance</span>
                <strong
                  className={
                    selectedStudent.attendance < 75 ? "risk-text" : "lime-text"
                  }
                >
                  {selectedStudent.attendance}%
                </strong>
              </div>

              <div className="profile-stat">
                <span>Average Marks</span>
                <strong
                  className={
                    getStudentAverage(selectedStudent) < 40
                      ? "risk-text"
                      : "lime-text"
                  }
                >
                  {getStudentAverage(selectedStudent).toFixed(1)}
                </strong>
              </div>

              <div className="profile-stat">
                <span>Assignments</span>
                <strong>
                  {selectedStudent.assignmentsCompleted}/
                  {selectedStudent.totalAssignments}
                </strong>
              </div>
            </div>

            {/* Attendance performance */}
            <div className="profile-section">
              <div className="section-title">
                <h4>Attendance Performance</h4>
                <span>75% required</span>
              </div>

              <div className="attendance-detail-value">
                <strong>{selectedStudent.attendance}%</strong>
                <span>
                  {selectedStudent.attendance >= 75
                    ? "Meets requirement"
                    : `${75 - selectedStudent.attendance}% below requirement`}
                </span>
              </div>

              <div className="threshold-track">
                <div
                  className={`threshold-fill ${
                    selectedStudent.attendance < 75
                      ? "progress-risk"
                      : "progress-good"
                  }`}
                  style={{ width: `${selectedStudent.attendance}%` }}
                ></div>

                <div className="threshold-marker"></div>
              </div>
            </div>

            {/* Subject-wise performance */}
            <div className="profile-section">
              <div className="section-title">
                <h4>Subject-wise Performance</h4>
                <span>Passing mark: 40</span>
              </div>

              <div className="subject-list">
                {Object.entries(selectedStudent.marks).map(
                  ([subject, mark]) => (
                    <div className="subject-performance" key={subject}>
                      <div className="subject-row">
                        <span>{subject}</span>
                        <strong className={mark < 40 ? "risk-text" : ""}>
                          {mark}/100
                        </strong>
                      </div>

                      <div className="subject-track">
                        <div
                          className={`subject-fill ${
                            mark < 40 ? "progress-risk" : "progress-good"
                          }`}
                          style={{ width: `${mark}%` }}
                        ></div>

                        <div className="subject-threshold"></div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Risk explanation */}
            {isAtRisk(selectedStudent) && (
              <div className="intervention-note">
                <div className="intervention-heading">
                  <strong>Attention Required</strong>
                  <span>At-Risk Indicator</span>
                </div>

                <p>This student meets the at-risk criteria because:</p>

                <ul>
                  {selectedStudent.attendance < 75 && (
                    <li>Attendance is below the required 75%.</li>
                  )}

                  {getStudentAverage(selectedStudent) < 40 && (
                    <li>Average marks are below 40.</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentRecords;
