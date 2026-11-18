
export const getStudentAverage = (student) => {
  const marks = Object.values(student.marks);
  return marks.reduce((total, mark) => total + mark, 0) / marks.length;
};

export const isAtRisk = (student) => {
  return student.attendance < 75 || getStudentAverage(student) < 40;
};

export const getDashboardStats = (students) => {
  const totalStudents = students.length;

  const averageAttendance =
    students.reduce((total, student) => total + student.attendance, 0) /
    totalStudents;

  const averageMarks =
    students.reduce((total, student) => total + getStudentAverage(student), 0) /
    totalStudents;

  const atRiskCount = students.filter(isAtRisk).length;

  return {
    totalStudents,
    averageAttendance: averageAttendance.toFixed(1),
    averageMarks: averageMarks.toFixed(1),
    atRiskCount,
  };
};
