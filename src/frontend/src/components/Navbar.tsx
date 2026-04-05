import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useRouter } from "@tanstack/react-router";
import { Bell, GraduationCap, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface NavbarProps {
  userName?: string;
}

export function Navbar({ userName }: NavbarProps) {
  const { identity, clear, isLoggingIn } = useInternetIdentity();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const isAuthenticated = !!identity;

  const displayName = userName || (isAuthenticated ? "Student" : "");
  const initials =
    displayName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "S";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    clear();
    localStorage.removeItem("spt_user_name");
    router.navigate({ to: "/" });
  };

  return (
    <header
      className="header-gradient sticky top-0 z-50 shadow-lg"
      data-ocid="navbar.panel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="navbar.link"
        >
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-2xl font-black text-white tracking-tight leading-none block">
              SPT
            </span>
            <span className="text-[10px] text-white/70 leading-none block hidden sm:block">
              Student Performance Tracker
            </span>
          </div>
        </Link>

        {/* Center Nav - Desktop */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              activeProps={{
                className:
                  "text-white bg-white/15 px-4 py-2 rounded-lg text-sm font-medium",
              }}
              data-ocid="navbar.link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button
                type="button"
                className="relative p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Notifications"
                data-ocid="navbar.button"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    data-ocid="navbar.toggle"
                  >
                    <Avatar className="w-7 h-7">
                      <AvatarFallback
                        className="text-xs font-bold"
                        style={{ background: "#ffffff20", color: "white" }}
                      >
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-white font-medium hidden sm:block">
                      {displayName}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" data-ocid="navbar.link">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    data-ocid="navbar.button"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-white/80 hover:text-white hover:bg-white/10"
                disabled={isLoggingIn}
              >
                <Link to="/login" data-ocid="navbar.link">
                  Login
                </Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-white text-brand-700 hover:bg-white/90 font-semibold"
              >
                <Link to="/signup" data-ocid="navbar.link">
                  Sign Up
                </Link>
              </Button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-white/80 hover:bg-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-ocid="navbar.toggle"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-brand-700">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => setMenuOpen(false)}
                data-ocid="navbar.link"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
