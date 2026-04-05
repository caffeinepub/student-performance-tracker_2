import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "@tanstack/react-router";
import {
  BookOpen,
  Calendar,
  Crown,
  GraduationCap,
  LayoutDashboard,
  Lock,
  Plus,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AddSubjectForm } from "../components/AddSubjectForm";
import { Navbar } from "../components/Navbar";
import { Recommendations } from "../components/Recommendations";
import { Sidebar } from "../components/Sidebar";
import { SubjectTable } from "../components/SubjectTable";
import { TimetableGrid } from "../components/TimetableGrid";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useSubjects } from "../hooks/useSubjects";
import { useTimetable } from "../hooks/useTimetable";
import { getGPAColor } from "../utils/gpa";

export default function Dashboard() {
  const { identity, isInitializing } = useInternetIdentity();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("overview");
  const [addSubjectOpen, setAddSubjectOpen] = useState(false);

  const userId = identity?.getPrincipal().toString() || "guest";
  const userName = localStorage.getItem("spt_user_name") || "Student";

  const {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    semesterGPAs,
    cgpa,
    totalCredits,
    totalMarksObtained,
    totalPossibleMarks,
  } = useSubjects(userId);

  const { slots, addSlot, deleteSlot } = useTimetable(userId);

  useEffect(() => {
    if (!isInitializing && !identity) {
      router.navigate({ to: "/login" });
    }
  }, [isInitializing, identity, router]);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div
          className="text-center space-y-3"
          data-ocid="dashboard.loading_state"
        >
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const overallPercentage =
    totalPossibleMarks > 0
      ? (totalMarksObtained / totalPossibleMarks) * 100
      : 0;
  const currentSemesterGPA =
    semesterGPAs.length > 0 ? semesterGPAs[semesterGPAs.length - 1].gpa : cgpa;
  const activeTimetableCount = slots.length;

  const statCards = [
    {
      label: "Total Courses",
      value: subjects.length.toString(),
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
      sub: `${totalCredits} credits`,
    },
    {
      label: "Current GPA",
      value: currentSemesterGPA.toFixed(2),
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      sub: "This semester",
    },
    {
      label: "CGPA",
      value: cgpa.toFixed(2),
      icon: GraduationCap,
      color: "text-violet-600",
      bg: "bg-violet-50",
      sub: "Cumulative",
    },
    {
      label: "Timetable Slots",
      value: activeTimetableCount.toString(),
      icon: Calendar,
      color: "text-amber-600",
      bg: "bg-amber-50",
      sub: "Active classes",
    },
  ];

  const lineChartData = semesterGPAs.map((s) => ({
    name: s.semester.replace(" 20", "'"),
    gpa: Number.parseFloat(s.gpa.toFixed(2)),
  }));

  const barChartData = subjects.map((s) => ({
    name: s.code,
    marks: Number.parseFloat(s.percentage.toFixed(1)),
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar userName={userName} />

      {/* Welcome strip */}
      <div
        className="header-gradient border-b border-white/10"
        data-ocid="dashboard.panel"
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <p className="text-sm text-white/90">
            Welcome Back, <strong className="text-white">{userName}</strong>!
            Your academic journey at a glance.
          </p>
        </div>
      </div>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar hidden on mobile */}
        <div className="hidden lg:flex">
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 p-4 md:p-6">
          {/* Mobile section tabs */}
          <div className="lg:hidden mb-4 overflow-x-auto">
            <Tabs value={activeSection} onValueChange={setActiveSection}>
              <TabsList className="inline-flex w-auto">
                <TabsTrigger value="overview" data-ocid="dashboard.tab">
                  <LayoutDashboard className="w-4 h-4 mr-1" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="courses" data-ocid="dashboard.tab">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Courses
                </TabsTrigger>
                <TabsTrigger value="performance" data-ocid="dashboard.tab">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Charts
                </TabsTrigger>
                <TabsTrigger value="timetable" data-ocid="dashboard.tab">
                  <Calendar className="w-4 h-4 mr-1" />
                  Timetable
                </TabsTrigger>
                <TabsTrigger value="recommendations" data-ocid="dashboard.tab">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  Tips
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-6">
            {/* Stat cards - Overview */}
            {activeSection === "overview" && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 xl:grid-cols-4 gap-4"
                  data-ocid="dashboard.section"
                >
                  {statCards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={card.label}
                        className="bg-card rounded-xl border border-border p-5 card-shadow card-hover"
                        data-ocid="dashboard.card"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-muted-foreground">
                            {card.label}
                          </span>
                          <div
                            className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center`}
                          >
                            <Icon className={`w-4 h-4 ${card.color}`} />
                          </div>
                        </div>
                        <div
                          className="text-3xl font-black mb-0.5"
                          style={{
                            color:
                              idx === 1 || idx === 2
                                ? getGPAColor(Number.parseFloat(card.value))
                                : undefined,
                          }}
                        >
                          {card.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {card.sub}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>

                {/* Charts row */}
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="bg-card rounded-xl border border-border p-5 card-shadow">
                    <h3 className="text-sm font-semibold text-foreground mb-4">
                      GPA per Semester
                    </h3>
                    {lineChartData.length < 2 ? (
                      <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                        Add subjects from multiple semesters to see trend
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={lineChartData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e3e8f0"
                          />
                          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                          <YAxis domain={[0, 4]} tick={{ fontSize: 11 }} />
                          <Tooltip formatter={(v) => [v, "GPA"]} />
                          <Line
                            type="monotone"
                            dataKey="gpa"
                            stroke="#1E5AA8"
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: "#1E5AA8" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>

                  <div className="bg-card rounded-xl border border-border p-5 card-shadow">
                    <h3 className="text-sm font-semibold text-foreground mb-4">
                      Marks by Subject (%)
                    </h3>
                    {barChartData.length === 0 ? (
                      <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                        No subjects yet
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={barChartData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e3e8f0"
                          />
                          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                          <Tooltip formatter={(v) => [`${v}%`, "Score"]} />
                          <Bar
                            dataKey="marks"
                            fill="#1E5AA8"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

                {/* Bottom row overview */}
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="bg-card rounded-xl border border-border p-5 card-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-foreground">
                        Study Recommendations
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveSection("recommendations")}
                        className="text-xs text-primary hover:underline"
                      >
                        View all
                      </button>
                    </div>
                    <Recommendations cgpa={cgpa} subjects={subjects} />
                  </div>

                  <div className="bg-card rounded-xl border border-border p-5 card-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-foreground">
                        Timetable Generator
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveSection("timetable")}
                        className="text-xs text-primary hover:underline"
                      >
                        View all
                      </button>
                    </div>
                    <TimetableGrid
                      slots={slots}
                      onAdd={addSlot}
                      onDelete={deleteSlot}
                    />
                  </div>
                </div>

                {/* Premium locked section */}
                <div className="bg-card rounded-xl border border-border overflow-hidden card-shadow">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-50 to-blue-50 opacity-60" />
                    <div className="relative p-6 flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Crown className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                          <h3 className="font-bold text-foreground">
                            Advanced Analytics
                          </h3>
                          <Badge className="bg-gradient-to-r from-violet-500 to-blue-500 text-white border-0 text-xs">
                            <Lock className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Unlock predictive grade forecasting, semester
                          planning, GPA simulation, and detailed progress
                          reports.
                        </p>
                      </div>
                      <Button
                        className="bg-gradient-to-r from-violet-500 to-blue-600 hover:from-violet-600 hover:to-blue-700 text-white flex-shrink-0"
                        data-ocid="dashboard.primary_button"
                      >
                        <Crown className="w-4 h-4 mr-2" /> Upgrade to Premium
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Courses section */}
            {activeSection === "courses" && (
              <div
                className="bg-card rounded-xl border border-border p-5 card-shadow"
                data-ocid="courses.section"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      My Courses
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {subjects.length} subjects &mdash; {totalCredits} total
                      credits
                    </p>
                  </div>
                  <Dialog
                    open={addSubjectOpen}
                    onOpenChange={setAddSubjectOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="header-gradient text-white"
                        data-ocid="courses.open_modal_button"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Subject
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="max-w-xl"
                      data-ocid="courses.dialog"
                    >
                      <DialogHeader>
                        <DialogTitle>Add New Subject</DialogTitle>
                      </DialogHeader>
                      <AddSubjectForm
                        onSubmit={(data) => {
                          addSubject(data);
                          setAddSubjectOpen(false);
                        }}
                        onCancel={() => setAddSubjectOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Total Subjects", value: subjects.length },
                    { label: "Total Credits", value: totalCredits },
                    { label: "Current CGPA", value: cgpa.toFixed(2) },
                    {
                      label: "Avg Score",
                      value: `${overallPercentage.toFixed(1)}%`,
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-muted/40 rounded-lg p-3 text-center"
                    >
                      <div className="text-xl font-black text-foreground">
                        {s.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                <SubjectTable
                  subjects={subjects}
                  onUpdate={updateSubject}
                  onDelete={deleteSubject}
                />
              </div>
            )}

            {/* Performance charts section */}
            {activeSection === "performance" && (
              <div className="space-y-4" data-ocid="performance.section">
                <div className="bg-card rounded-xl border border-border p-5 card-shadow">
                  <h2 className="text-lg font-bold text-foreground mb-1">
                    Performance Overview
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5">
                    Track your GPA trend and subject scores
                  </p>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                        GPA per Semester
                      </h3>
                      {lineChartData.length < 2 ? (
                        <div className="h-52 flex items-center justify-center bg-muted/30 rounded-xl text-muted-foreground text-sm">
                          Add subjects from multiple semesters to see trend
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height={220}>
                          <LineChart data={lineChartData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e3e8f0"
                            />
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                            <YAxis domain={[0, 4]} tick={{ fontSize: 11 }} />
                            <Tooltip formatter={(v) => [v, "GPA"]} />
                            <Line
                              type="monotone"
                              dataKey="gpa"
                              stroke="#1E5AA8"
                              strokeWidth={2.5}
                              dot={{ r: 5, fill: "#1E5AA8" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                        Subject Scores
                      </h3>
                      {barChartData.length === 0 ? (
                        <div className="h-52 flex items-center justify-center bg-muted/30 rounded-xl text-muted-foreground text-sm">
                          No subjects yet
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height={220}>
                          <BarChart data={barChartData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e3e8f0"
                            />
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                            <Tooltip formatter={(v) => [`${v}%`, "Score"]} />
                            <Bar
                              dataKey="marks"
                              fill="#1E5AA8"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>

                  {/* Semester breakdown */}
                  {semesterGPAs.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                        Semester Breakdown
                      </h3>
                      <div className="space-y-3">
                        {semesterGPAs.map((sem) => (
                          <div
                            key={sem.semester}
                            className="flex items-center gap-4"
                          >
                            <div className="w-28 text-sm font-medium text-foreground truncate">
                              {sem.semester}
                            </div>
                            <div className="flex-1 bg-muted/40 rounded-full h-2.5 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${(sem.gpa / 4) * 100}%`,
                                  background: getGPAColor(sem.gpa),
                                }}
                              />
                            </div>
                            <div
                              className="w-12 text-sm font-bold text-right"
                              style={{ color: getGPAColor(sem.gpa) }}
                            >
                              {sem.gpa.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Timetable section */}
            {activeSection === "timetable" && (
              <div
                className="bg-card rounded-xl border border-border p-5 card-shadow"
                data-ocid="timetable.section"
              >
                <h2 className="text-lg font-bold text-foreground mb-1">
                  Timetable Generator
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Plan and manage your weekly class schedule
                </p>
                <TimetableGrid
                  slots={slots}
                  onAdd={addSlot}
                  onDelete={deleteSlot}
                />
              </div>
            )}

            {/* Recommendations section */}
            {activeSection === "recommendations" && (
              <div
                className="bg-card rounded-xl border border-border p-5 card-shadow"
                data-ocid="recommendations.section"
              >
                <h2 className="text-lg font-bold text-foreground mb-1">
                  Study Recommendations
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Personalized tips based on your CGPA of{" "}
                  <strong>{cgpa.toFixed(2)}</strong>
                </p>
                <Recommendations cgpa={cgpa} subjects={subjects} />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Student Performance Tracker &mdash;
          Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
