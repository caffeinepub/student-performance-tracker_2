export type Grade =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D"
  | "F";

export function calculatePercentage(
  marksObtained: number,
  totalMarks: number,
): number {
  if (totalMarks === 0) return 0;
  return (marksObtained / totalMarks) * 100;
}

export function getGrade(percentage: number): Grade {
  if (percentage >= 90) return "A+";
  if (percentage >= 85) return "A";
  if (percentage >= 80) return "A-";
  if (percentage >= 75) return "B+";
  if (percentage >= 70) return "B";
  if (percentage >= 65) return "B-";
  if (percentage >= 60) return "C+";
  if (percentage >= 55) return "C";
  if (percentage >= 50) return "C-";
  if (percentage >= 45) return "D";
  return "F";
}

export function getGradePoints(grade: Grade): number {
  const map: Record<Grade, number> = {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    D: 1.0,
    F: 0.0,
  };
  return map[grade];
}

export function calculateGPA(
  subjects: Array<{ credits: number; grade: Grade }>,
): number {
  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  if (totalCredits === 0) return 0;
  const weightedSum = subjects.reduce(
    (sum, s) => sum + getGradePoints(s.grade) * s.credits,
    0,
  );
  return weightedSum / totalCredits;
}

export function getGradeColor(grade: Grade): string {
  if (grade === "A+" || grade === "A") return "text-green-600 bg-green-50";
  if (grade === "A-" || grade === "B+") return "text-emerald-600 bg-emerald-50";
  if (grade === "B" || grade === "B-") return "text-blue-600 bg-blue-50";
  if (grade === "C+" || grade === "C") return "text-yellow-600 bg-yellow-50";
  if (grade === "C-" || grade === "D") return "text-orange-600 bg-orange-50";
  return "text-red-600 bg-red-50";
}

export function getGPAColor(gpa: number): string {
  if (gpa >= 3.5) return "#16a34a";
  if (gpa >= 3.0) return "#2563eb";
  if (gpa >= 2.5) return "#d97706";
  return "#dc2626";
}
