import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Code,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import { Navbar } from "../components/Navbar";

const highlights = [
  {
    icon: GraduationCap,
    title: "GPA Calculator",
    desc: "Automatic grade point calculations",
  },
  {
    icon: BookOpen,
    title: "Subject Tracking",
    desc: "Manage all your courses easily",
  },
  { icon: Heart, title: "Study Tips", desc: "Personalized academic guidance" },
  {
    icon: Code,
    title: "Open Platform",
    desc: "Built for students, by a student",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            About SPT
          </Badge>
          <h1 className="text-4xl font-black text-foreground mb-4">
            Student Performance Tracker
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Empowering students to take control of their academic journey with
            intelligent tools.
          </p>
        </motion.div>

        {/* About content */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card
            className="md:col-span-2 border-border shadow-card"
            data-ocid="about.card"
          >
            <CardContent className="p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl header-gradient flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  Our Mission
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">
                This Student Performance Tracker is developed to empower
                students with smart tools to monitor their academic journey. It
                provides insights into performance, helps identify strengths and
                weaknesses, and assists in building effective study strategies.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                The platform is created by{" "}
                <strong className="text-foreground">
                  Muhammad Basharat Bashir Khan
                </strong>
                , a Computer Science student at the University of Swat, with the
                vision of making academic tracking simple, intelligent, and
                accessible for every student.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our goal is to bridge the gap between raw academic data and
                actionable insights &mdash; helping students not just track
                where they are, but understand where they need to go and how to
                get there.
              </p>
            </CardContent>
          </Card>

          {/* Developer card */}
          <Card className="border-border shadow-card" data-ocid="about.card">
            <CardContent className="p-7">
              <div className="text-center mb-5">
                <div className="w-20 h-20 rounded-2xl header-gradient flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-foreground text-lg">
                  Muhammad Basharat Bashir Khan
                </h3>
                <p className="text-sm text-muted-foreground">
                  Developer &amp; Admin
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Code className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Computer Science Student
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">
                    University of Swat
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a
                    href="mailto:basharatbashir033@gmail.com"
                    className="text-primary hover:underline break-all"
                  >
                    basharatbashir033@gmail.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features highlights */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border border-border p-5 text-center card-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </main>

      <footer className="border-t border-border bg-card py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
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
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link
              to="/contact"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
