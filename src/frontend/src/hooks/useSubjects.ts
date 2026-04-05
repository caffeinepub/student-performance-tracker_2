import { useCallback, useState } from "react";
import { calculatePercentage, getGrade, getGradePoints } from "../utils/gpa";
import type { Grade } from "../utils/gpa";

export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  marksObtained: number;
  totalMarks: number;
  semester: string;
  instructor: string;
  percentage: number;
  grade: Grade;
  gradePoints: number;
}

const STORAGE_KEY = "spt_subjects";

function loadSubjects(userId: string): Subject[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
    return raw ? JSON.parse(raw) : getDefaultSubjects();
  } catch {
    return getDefaultSubjects();
  }
}

function saveSubjects(userId: string, subjects: Subject[]) {
  localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(subjects));
}

function getDefaultSubjects(): Subject[] {
  const defaults = [
    {
      name: "Data Structures & Algorithms",
      code: "CS-301",
      credits: 3,
      marksObtained: 88,
      totalMarks: 100,
      semester: "Fall 2024",
      instructor: "Dr. Ahmed Khan",
    },
    {
      name: "Database Systems",
      code: "CS-302",
      credits: 3,
      marksObtained: 76,
      totalMarks: 100,
      semester: "Fall 2024",
      instructor: "Prof. Sara Malik",
    },
    {
      name: "Software Engineering",
      code: "CS-303",
      credits: 3,
      marksObtained: 92,
      totalMarks: 100,
      semester: "Fall 2024",
      instructor: "Dr. Bilal Aziz",
    },
    {
      name: "Computer Networks",
      code: "CS-304",
      credits: 3,
      marksObtained: 69,
      totalMarks: 100,
      semester: "Fall 2024",
      instructor: "Dr. Farrukh Naz",
    },
    {
      name: "Operating Systems",
      code: "CS-201",
      credits: 3,
      marksObtained: 81,
      totalMarks: 100,
      semester: "Spring 2024",
      instructor: "Prof. Zainab Iqbal",
    },
    {
      name: "Discrete Mathematics",
      code: "MATH-201",
      credits: 3,
      marksObtained: 73,
      totalMarks: 100,
      semester: "Spring 2024",
      instructor: "Dr. Umar Farooq",
    },
  ];
  return defaults.map((d) => {
    const percentage = calculatePercentage(d.marksObtained, d.totalMarks);
    const grade = getGrade(percentage);
    return {
      id: crypto.randomUUID(),
      ...d,
      percentage,
      grade,
      gradePoints: getGradePoints(grade),
    };
  });
}

export function useSubjects(userId: string) {
  const [subjects, setSubjectsState] = useState<Subject[]>(() =>
    loadSubjects(userId),
  );

  const setSubjects = useCallback(
    (updater: Subject[] | ((prev: Subject[]) => Subject[])) => {
      setSubjectsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveSubjects(userId, next);
        return next;
      });
    },
    [userId],
  );

  const addSubject = useCallback(
    (data: Omit<Subject, "id" | "percentage" | "grade" | "gradePoints">) => {
      const percentage = calculatePercentage(
        data.marksObtained,
        data.totalMarks,
      );
      const grade = getGrade(percentage);
      const subject: Subject = {
        ...data,
        id: crypto.randomUUID(),
        percentage,
        grade,
        gradePoints: getGradePoints(grade),
      };
      setSubjects((prev) => [...prev, subject]);
    },
    [setSubjects],
  );

  const updateSubject = useCallback(
    (
      id: string,
      data: Omit<Subject, "id" | "percentage" | "grade" | "gradePoints">,
    ) => {
      const percentage = calculatePercentage(
        data.marksObtained,
        data.totalMarks,
      );
      const grade = getGrade(percentage);
      setSubjects((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                ...data,
                percentage,
                grade,
                gradePoints: getGradePoints(grade),
              }
            : s,
        ),
      );
    },
    [setSubjects],
  );

  const deleteSubject = useCallback(
    (id: string) => {
      setSubjects((prev) => prev.filter((s) => s.id !== id));
    },
    [setSubjects],
  );

  // Compute semesters
  const semesters = Array.from(new Set(subjects.map((s) => s.semester)));

  // GPA per semester
  const semesterGPAs = semesters.map((sem) => {
    const semSubjects = subjects.filter((s) => s.semester === sem);
    const totalCredits = semSubjects.reduce((sum, s) => sum + s.credits, 0);
    const weightedSum = semSubjects.reduce(
      (sum, s) => sum + s.gradePoints * s.credits,
      0,
    );
    return {
      semester: sem,
      gpa: totalCredits > 0 ? weightedSum / totalCredits : 0,
      subjects: semSubjects,
    };
  });

  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  const weightedSum = subjects.reduce(
    (sum, s) => sum + s.gradePoints * s.credits,
    0,
  );
  const cgpa = totalCredits > 0 ? weightedSum / totalCredits : 0;
  const totalMarksObtained = subjects.reduce(
    (sum, s) => sum + s.marksObtained,
    0,
  );
  const totalPossibleMarks = subjects.reduce((sum, s) => sum + s.totalMarks, 0);

  return {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    semesters,
    semesterGPAs,
    cgpa,
    totalCredits,
    totalMarksObtained,
    totalPossibleMarks,
  };
}
