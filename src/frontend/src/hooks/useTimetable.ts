import { useCallback, useState } from "react";

export interface TimetableSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  room: string;
  color: string;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const COLORS = [
  "#1E5AA8",
  "#16a34a",
  "#d97706",
  "#9333ea",
  "#dc2626",
  "#0891b2",
  "#c2410c",
];

const STORAGE_KEY = "spt_timetable";

function loadTimetable(userId: string): TimetableSlot[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
    return raw ? JSON.parse(raw) : getDefaultTimetable();
  } catch {
    return getDefaultTimetable();
  }
}

function saveTimetable(userId: string, slots: TimetableSlot[]) {
  localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(slots));
}

function getDefaultTimetable(): TimetableSlot[] {
  return [
    {
      id: "1",
      day: "Monday",
      startTime: "08:00",
      endTime: "09:30",
      subject: "Data Structures & Algorithms",
      room: "LH-101",
      color: "#1E5AA8",
    },
    {
      id: "2",
      day: "Monday",
      startTime: "10:00",
      endTime: "11:30",
      subject: "Database Systems",
      room: "LH-203",
      color: "#16a34a",
    },
    {
      id: "3",
      day: "Tuesday",
      startTime: "09:00",
      endTime: "10:30",
      subject: "Software Engineering",
      room: "LH-105",
      color: "#d97706",
    },
    {
      id: "4",
      day: "Wednesday",
      startTime: "08:00",
      endTime: "09:30",
      subject: "Data Structures & Algorithms",
      room: "LH-101",
      color: "#1E5AA8",
    },
    {
      id: "5",
      day: "Wednesday",
      startTime: "11:00",
      endTime: "12:30",
      subject: "Computer Networks",
      room: "LH-301",
      color: "#9333ea",
    },
    {
      id: "6",
      day: "Thursday",
      startTime: "09:00",
      endTime: "10:30",
      subject: "Software Engineering",
      room: "LH-105",
      color: "#d97706",
    },
    {
      id: "7",
      day: "Friday",
      startTime: "10:00",
      endTime: "11:30",
      subject: "Database Systems",
      room: "LH-203",
      color: "#16a34a",
    },
  ];
}

export function useTimetable(userId: string) {
  const [slots, setSlotsState] = useState<TimetableSlot[]>(() =>
    loadTimetable(userId),
  );

  const setSlots = useCallback(
    (
      updater: TimetableSlot[] | ((prev: TimetableSlot[]) => TimetableSlot[]),
    ) => {
      setSlotsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveTimetable(userId, next);
        return next;
      });
    },
    [userId],
  );

  const addSlot = useCallback(
    (data: Omit<TimetableSlot, "id" | "color">) => {
      const colorIndex = slots.length % COLORS.length;
      const slot: TimetableSlot = {
        ...data,
        id: crypto.randomUUID(),
        color: COLORS[colorIndex],
      };
      setSlots((prev) => [...prev, slot]);
    },
    [slots.length, setSlots],
  );

  const deleteSlot = useCallback(
    (id: string) => {
      setSlots((prev) => prev.filter((s) => s.id !== id));
    },
    [setSlots],
  );

  return { slots, addSlot, deleteSlot, DAYS };
}
