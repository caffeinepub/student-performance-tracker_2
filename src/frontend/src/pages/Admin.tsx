import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import {
  BarChart3,
  Loader2,
  Mail,
  MessageSquare,
  Shield,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  sentAt: string;
}

export default function Admin() {
  const { actor, isFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const { data: isAdmin, isLoading: isCheckingAdmin } = useQuery({
    queryKey: ["isAdmin", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });

  useEffect(() => {
    if (!isInitializing && !identity) {
      router.navigate({ to: "/login" });
    }
  }, [isInitializing, identity, router]);

  useEffect(() => {
    if (!isCheckingAdmin && isAdmin === false) {
      router.navigate({ to: "/dashboard" });
    }
  }, [isCheckingAdmin, isAdmin, router]);

  useEffect(() => {
    const stored = localStorage.getItem("spt_messages");
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  if (isInitializing || isCheckingAdmin || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3" data-ocid="admin.loading_state">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground text-sm">
            Verifying admin access...
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const mockStats = [
    {
      label: "Total Users",
      value: "142",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active Sessions",
      value: "38",
      icon: BarChart3,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Messages",
      value: messages.length.toString(),
      icon: MessageSquare,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Subjects Tracked",
      value: "864",
      icon: Shield,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  const mockUsers = [
    {
      name: "Muhammad Basharat Bashir Khan",
      email: "basharatbashir033@gmail.com",
      role: "admin",
      joined: "Jan 2025",
    },
    {
      name: "Ahmad Ali Khan",
      email: "ahmad.ali@uos.edu.pk",
      role: "user",
      joined: "Feb 2025",
    },
    {
      name: "Sara Bibi",
      email: "sara.bibi@uos.edu.pk",
      role: "user",
      joined: "Mar 2025",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl header-gradient flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">
              Muhammad Basharat Bashir Khan &mdash; Platform Administrator
            </p>
          </div>
          <Badge className="ml-auto bg-primary/10 text-primary border-primary/20">
            Admin
          </Badge>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          data-ocid="admin.section"
        >
          {mockStats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="bg-card rounded-xl border border-border p-5 card-shadow"
                data-ocid="admin.card"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">
                    {s.label}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center`}
                  >
                    <Icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-black text-foreground">
                  {s.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact messages */}
        <div
          className="bg-card rounded-xl border border-border p-6 card-shadow mb-6"
          data-ocid="admin.section"
        >
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-foreground">Contact Messages</h2>
            <Badge variant="outline" className="ml-auto">
              {messages.length} messages
            </Badge>
          </div>

          {messages.length === 0 ? (
            <div
              className="text-center py-10 text-muted-foreground"
              data-ocid="admin.empty_state"
            >
              <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No contact messages yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  className="rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors"
                  data-ocid={`admin.item.${idx + 1}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground text-sm">
                          {msg.name}
                        </span>
                        <a
                          href={`mailto:${msg.email}`}
                          className="flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          <Mail className="w-3 h-3" />
                          {msg.email}
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {msg.message}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(msg.sentAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User management */}
        <div
          className="bg-card rounded-xl border border-border p-6 card-shadow"
          data-ocid="admin.section"
        >
          <div className="flex items-center gap-2 mb-5">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-foreground">User Management</h2>
          </div>
          <div className="space-y-3">
            {mockUsers.map((user, idx) => (
              <div
                key={user.email}
                className="flex items-center gap-3 p-3 rounded-lg border border-border"
                data-ocid={`admin.item.${idx + 1}`}
              >
                <div className="w-9 h-9 rounded-full header-gradient flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {user.joined}
                  </span>
                  <Badge
                    variant={user.role === "admin" ? "default" : "outline"}
                    className="text-xs"
                  >
                    {user.role}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-card py-4">
        <div className="max-w-6xl mx-auto px-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} SPT Admin Panel
        </div>
      </footer>
    </div>
  );
}
