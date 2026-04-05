import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Calculator,
  Calendar,
  CheckCircle,
  GraduationCap,
  Star,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { AdPlaceholder } from "../components/AdPlaceholder";
import { Navbar } from "../components/Navbar";

const features = [
  {
    icon: Calculator,
    title: "GPA / CGPA Calculator",
    desc: "Automatically compute your semester GPA and cumulative CGPA using standard grading scales.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: BarChart3,
    title: "Performance Charts",
    desc: "Visualize your academic progress over time with interactive line and bar charts.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Calendar,
    title: "Timetable Generator",
    desc: "Create and manage a weekly class schedule with color-coded subject blocks.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Brain,
    title: "AI Study Recommendations",
    desc: "Get personalized study tips and improvement strategies based on your performance.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: BookOpen,
    title: "Subject Management",
    desc: "Add, edit, and delete subjects with marks, credits, and instructor details.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    desc: "Identify academic strengths and weaknesses with detailed semester breakdowns.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
];

const benefits = [
  "Track marks and grades for unlimited subjects",
  "Automatic GPA and CGPA calculation",
  "Interactive performance visualizations",
  "Smart study recommendations",
  "Weekly timetable planner",
  "Secure authentication via Internet Identity",
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1B4F95 0%, #1E5AA8 50%, #2563C4 100%)",
          }}
          data-ocid="home.section"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white" />
            <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-white" />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white" />
          </div>

          <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-white/20 text-white border-white/30 mb-6 text-sm px-4 py-1">
                <GraduationCap className="w-4 h-4 mr-2" />
                Student Performance Tracker
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                Track. Analyze. <span className="text-yellow-300">Excel.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                Your all-in-one academic companion. Monitor grades, calculate
                GPA/CGPA, visualize progress, and unlock your full academic
                potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  asChild
                  className="bg-white text-brand-700 hover:bg-white/90 font-bold shadow-lg text-base px-8"
                  data-ocid="home.primary_button"
                >
                  <Link to="/signup">
                    Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white/40 text-white hover:bg-white/10 font-semibold text-base px-8"
                  data-ocid="home.secondary_button"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AdSense placeholder */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <AdPlaceholder size="leaderboard" />
        </div>

        {/* Features */}
        <section
          className="max-w-7xl mx-auto px-6 py-16"
          data-ocid="home.section"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive tools built specifically for students to manage and
              improve their academic performance.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="bg-card rounded-2xl border border-border p-6 card-shadow card-hover"
                  data-ocid="home.card"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Benefits */}
        <section
          className="bg-brand-700/5 border-y border-border py-16"
          data-ocid="home.section"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Why Choose SPT?
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Built by a student, for students. The platform is designed to
                  make academic tracking effortless so you can focus on what
                  matters &mdash; learning.
                </p>
                <ul className="space-y-3">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="header-gradient rounded-2xl p-8 text-white shadow-xl">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-black mb-1">3.85</div>
                    <div className="text-white/70 text-sm">Current CGPA</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { val: "6", label: "Subjects" },
                      { val: "18", label: "Credits" },
                      { val: "85%", label: "Avg Score" },
                    ].map((s) => (
                      <div key={s.label} className="bg-white/10 rounded-xl p-3">
                        <div className="text-xl font-bold">{s.val}</div>
                        <div className="text-xs text-white/60 mt-0.5">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 bg-white/10 rounded-xl p-3">
                    <Star className="w-5 h-5 text-yellow-300" />
                    <span className="text-sm">
                      Excellent academic standing!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="max-w-7xl mx-auto px-6 py-16 text-center"
          data-ocid="home.section"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Start Tracking Today
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join hundreds of students already using SPT to take control of their
            academic journey.
          </p>
          <Button
            size="lg"
            asChild
            className="header-gradient text-white font-bold px-10 shadow-lg"
            data-ocid="home.primary_button"
          >
            <Link to="/signup">
              Create Free Account <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>
            &copy; {new Date().getFullYear()} Student Performance Tracker. Built
            with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </span>
          <div className="flex gap-4">
            <Link
              to="/about"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/dashboard"
              className="hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
