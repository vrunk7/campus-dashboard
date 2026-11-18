import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

import students from "../data/students.json";
import { getStudentAverage, isAtRisk } from "../utils/dashboardStats";
import "./AnalyticsCharts.css";

function AnalyticsCharts() {
  // 1. Calculate average marks for each subject
  const subjects = Object.keys(students[0].marks);

  const subjectData = subjects.map((subject) => {
    const total = students.reduce(
      (sum, student) => sum + student.marks[subject],
      0,
    );

    return {
      subject,
      average: Number((total / students.length).toFixed(1)),
    };
  });

  // 2. Count Good and At-Risk students
  const atRiskCount = students.filter(isAtRisk).length;

  const riskData = [
    { name: "Safe", value: students.length - atRiskCount },
    { name: "At Risk", value: atRiskCount },
  ];

  const pieColors = ["var(--status-good-green)", "var(--status-risk-red)"];
  // 3. Calculate average marks for each class
  const classes = [...new Set(students.map((student) => student.class))];

  const classData = classes.map((className) => {
    const classStudents = students.filter(
      (student) => student.class === className,
    );

    const average =
      classStudents.reduce(
        (sum, student) => sum + getStudentAverage(student),
        0,
      ) / classStudents.length;

    return {
      className: className.replace("FYMCA ", "Class "),
      average: Number(average.toFixed(1)),
    };
  });

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h2>Subject-wise Performance</h2>
        <p>Average marks across all subjects</p>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={subjectData}>
            <CartesianGrid stroke="#293246" strokeDasharray="3 3" />
            <XAxis
              dataKey="subject"
              tick={{ fill: "#aab4c6", fontSize: 10 }}
              angle={-15}
              textAnchor="end"
              height={65}
            />
            <YAxis domain={[0, 100]} tick={{ fill: "#aab4c6" }} />
            <Tooltip
              contentStyle={{
                background: "#1a2233",
                border: "1px solid #293246",
                color: "#fff",
              }}
            />
            <Bar dataKey="average" fill="#bbf246" radius={[6, 6, 0, 0]} />{" "}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h2>Student Distribution</h2>
        <p>Safe vs At-Risk students</p>

        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={riskData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              label
            >
              {riskData.map((entry, index) => (
                <Cell key={entry.name} fill={pieColors[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#1a2233",
                border: "1px solid #293246",
                color: "#fff",
              }}
            />
            <Legend wrapperStyle={{ color: "#aab4c6" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card line-chart-card">
        <h2>Class-wise Performance</h2>
        <p>Average marks comparison between classes</p>

        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={classData}>
            <CartesianGrid stroke="#242e29" strokeDasharray="3 3" />
            <XAxis dataKey="className" tick={{ fill: "#8ea096" }} />
            <YAxis domain={[0, 100]} tick={{ fill: "#8ea096" }} />
            <Tooltip
              contentStyle={{
                background: "#141d19",
                border: "1px solid #293246",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="average"
stroke="#8cb530"
              strokeWidth={3}
dot={{ r: 6, fill: "#bbf246" }}            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnalyticsCharts;
