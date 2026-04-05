import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  BookOpen,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Subject } from "../hooks/useSubjects";

interface RecommendationsProps {
  cgpa: number;
  subjects: Subject[];
}

export function Recommendations({ cgpa, subjects }: RecommendationsProps) {
  const weakSubjects = subjects.filter(
    (s) => s.grade === "D" || s.grade === "F",
  );
  const averageSubjects = subjects.filter(
    (s) => s.grade === "C-" || s.grade === "C" || s.grade === "C+",
  );

  const generalRec = (() => {
    if (cgpa >= 3.5)
      return {
        icon: Star,
        color: "text-green-600",
        bg: "bg-green-50 border-green-200",
        badge: "Excellent",
        badgeColor: "bg-green-100 text-green-700",
        text: "Outstanding performance! You are excelling academically. Consider taking on leadership roles, mentoring peers, or exploring advanced research opportunities in your field.",
      };
    if (cgpa >= 3.0)
      return {
        icon: TrendingUp,
        color: "text-blue-600",
        bg: "bg-blue-50 border-blue-200",
        badge: "Good",
        badgeColor: "bg-blue-100 text-blue-700",
        text: "Good performance! You are on the right track. Focus on improving your weaker subjects while maintaining strengths. Consistent effort in challenging areas will push your GPA higher.",
      };
    if (cgpa >= 2.5)
      return {
        icon: Users,
        color: "text-amber-600",
        bg: "bg-amber-50 border-amber-200",
        badge: "Average",
        badgeColor: "bg-amber-100 text-amber-700",
        text: "Average performance. Consider forming study groups, revisiting lecture notes regularly, and seeking extra help from instructors. Improving 1-2 key subjects can significantly raise your CGPA.",
      };
    return {
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50 border-red-200",
      badge: "Needs Attention",
      badgeColor: "bg-red-100 text-red-700",
      text: "Performance needs improvement. Seek immediate academic help from professors or tutoring centers. Consider revising your study schedule and time management strategies.",
    };
  })();

  const RecIcon = generalRec.icon;

  const studyTips = [
    "Review notes within 24 hours of each lecture",
    "Use the Pomodoro technique: 25 min focus + 5 min break",
    "Create mind maps for complex topics",
    "Practice past papers under timed conditions",
  ];

  return (
    <div className="space-y-3" data-ocid="recommendations.panel">
      {/* Overall recommendation */}
      <div className={`rounded-xl border p-4 ${generalRec.bg}`}>
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 ${generalRec.color}`}>
            <RecIcon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-foreground">
                Overall Status
              </span>
              <Badge
                className={`text-xs ${generalRec.badgeColor}`}
                variant="outline"
              >
                {generalRec.badge}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {generalRec.text}
            </p>
          </div>
        </div>
      </div>

      {/* Weak subjects */}
      {weakSubjects.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Subjects Needing Attention
          </p>
          {weakSubjects.map((s, idx) => (
            <div
              key={s.id}
              className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-3"
              data-ocid={`recommendations.item.${idx + 1}`}
            >
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {s.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Grade: {s.grade} ({s.percentage.toFixed(1)}%) &mdash; Consider
                  seeking extra tutoring or office hours.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Average subjects */}
      {averageSubjects.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Areas to Improve
          </p>
          {averageSubjects.map((s, idx) => (
            <div
              key={s.id}
              className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3"
              data-ocid={`recommendations.item.${idx + 1}`}
            >
              <BookOpen className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {s.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Grade: {s.grade} ({s.percentage.toFixed(1)}%) &mdash; Review
                  key concepts and practice more problems.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Study tips */}
      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">
            Quick Study Tips
          </span>
        </div>
        <ul className="space-y-1.5">
          {studyTips.map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
