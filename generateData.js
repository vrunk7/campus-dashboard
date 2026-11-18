
const names = [
  "Aarav Mehta", "Diya Nair", "Kabir Shah", "Ananya Iyer",
  "Vivaan Rao", "Isha Kapoor", "Reyansh Patel", "Sara Thomas",
  "Aditya Joshi", "Myra Desai", "Arjun Kulkarni", "Zoya Khan",
  "Krish Malhotra", "Aanya Menon", "Rohan Gupta", "Meera Pillai",
  "Ishaan Verma", "Kiara Fernandes", "Dev Shah", "Tara Sinha",
  "Neil D'Souza", "Riya Chawla", "Atharv Bansal", "Misha Roy",
  "Omkar Sawant"
];

const subjects = [
  "Data Structures",
  "Computer Networks",
  "Operating Systems",
  "DBMS",
  "Software Engineering",
  "Discrete Mathematics"
];

const attendance = [
  92,86,68,95,73,81,62,89,77,71,
  58,93,74,84,69,97,72,64,88,76,
  91,67,79,54,83
];

const scores = [
  [88,84,91,86,89,82], [78,82,85,80,88,76],
  [72,65,70,74,69,66], [94,91,96,92,90,89],
  [58,62,55,64,60,57], [83,79,88,85,82,80],
  [45,48,52,46,50,43], [91,87,90,88,93,85],
  [69,73,71,75,68,72], [82,78,85,80,77,81],
  [66,61,64,68,62,60], [96,92,94,91,95,90],
  [35,38,42,36,39,34], [80,86,83,88,85,82],
  [55,58,61,57,60,54], [92,95,94,96,91,93],
  [76,70,74,78,73,71], [81,79,84,82,80,83],
  [87,85,89,86,90,84], [42,45,39,44,41,38],
  [89,87,92,90,88,91], [63,59,65,61,66,60],
  [74,77,72,76,75,73], [86,82,88,84,87,83],
  [28,35,32,38,34,30]
];

const assignments = [
  [9,10],[8,10],[6,10],[10,10],[7,10],
  [9,10],[5,10],[9,10],[7,10],[8,10],
  [6,10],[10,10],[4,10],[8,10],[6,10],
  [10,10],[7,10],[7,10],[9,10],[5,10],
  [9,10],[6,10],[8,10],[5,10],[6,10]
];

const students = names.map((name, index) => {
  const marks = Object.fromEntries(
    subjects.map((subject, i) => [subject, scores[index][i]])
  );

  const average = scores[index].reduce((a,b) => a+b,0) / 6;

  return {
    id: 101 + index,
    name,
    class: ["SYMCA A","SYMCA B","SYMCA C"][index % 3],
    attendance: attendance[index],
    marks,
    assignmentsCompleted: assignments[index][0],
    totalAssignments: assignments[index][1],
    status: attendance[index] < 75 || average < 40
      ? "At Risk"
      : "Good"
  };
});

const fs = require("node:fs");
fs.writeFileSync(
  "src/data/students.json",
  JSON.stringify(students, null, 2)
);

console.log("Successfully created 25 student records!");