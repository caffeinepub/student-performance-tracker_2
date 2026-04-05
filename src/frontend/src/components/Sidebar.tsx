import { Link, useRouterState } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import {
  BookOpen,
  Brain,
  Calendar,
  LayoutDashboard,
  LogOut,
  Settings,
  TrendingUp,
  User,
} from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  {
    icon: BookOpen,
    label: "My Courses",
    href: "/dashboard",
    section: "courses",
  },
  {
    icon: TrendingUp,
    label: "Performance",
    href: "/dashboard",
    section: "performance",
  },
  {
    icon: Calendar,
    label: "Timetable",
    href: "/dashboard",
    section: "timetable",
  },
  {
    icon: Brain,
    label: "Study Plan",
    href: "/dashboard",
    section: "recommendations",
  },
  { icon: User, label: "Profile", href: "/about" },
  { icon: Settings, label: "Settings", href: "/dashboard" },
];

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export function Sidebar({
  activeSection = "overview",
  onSectionChange,
}: SidebarProps) {
  const { clear } = useInternetIdentity();
  const router = useRouter();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const handleLogout = () => {
    clear();
    localStorage.removeItem("spt_user_name");
    router.navigate({ to: "/" });
  };

  return (
    <aside
      className="w-56 flex-shrink-0 bg-card border-r border-border flex flex-col"
      data-ocid="sidebar.panel"
    >
      <nav className="flex-1 p-3 space-y-0.5" aria-label="Sidebar navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.section
            ? activeSection === item.section
            : currentPath === item.href && !item.section;

          return item.section ? (
            <button
              type="button"
              key={item.label}
              onClick={() => onSectionChange?.(item.section!)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? "sidebar-active"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
              }`}
              data-ocid="sidebar.link"
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          ) : (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? "sidebar-active"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
              }`}
              data-ocid="sidebar.link"
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* AdSense placeholder at bottom */}
      <div className="p-3 border-t border-border">
        <div className="rounded-lg border-2 border-dashed border-border bg-muted/40 h-20 flex items-center justify-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Ad Space
          </p>
        </div>
      </div>

      <div className="p-3 border-t border-border">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
          data-ocid="sidebar.button"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
