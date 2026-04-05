import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@tanstack/react-router";
import { GraduationCap, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Login() {
  const { login, isLoggingIn, isLoginSuccess, identity } =
    useInternetIdentity();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (isLoginSuccess && identity) {
      if (displayName.trim()) {
        localStorage.setItem("spt_user_name", displayName.trim());
      }
      router.navigate({ to: "/dashboard" });
    }
  }, [isLoginSuccess, identity, router, displayName]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background px-4"
      style={{
        background: "linear-gradient(135deg, #EEF3FB 0%, #F3F6FB 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl header-gradient shadow-lg mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-foreground">
            Student Performance Tracker
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Sign in to access your academic dashboard
          </p>
        </div>

        <Card className="border-border shadow-card" data-ocid="login.panel">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>
              Log in to continue tracking your progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Optional display name */}
            <div className="space-y-1.5">
              <Label htmlFor="displayName">Your Name (optional)</Label>
              <Input
                id="displayName"
                placeholder="e.g. Muhammad Basharat"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                data-ocid="login.input"
              />
              <p className="text-xs text-muted-foreground">
                Used to personalize your dashboard
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Secure Authentication
                </span>
              </div>
            </div>

            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full header-gradient text-white font-semibold h-11"
              data-ocid="login.submit_button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Connecting...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-5 w-5" /> Secure Login
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Protected by Internet Identity — no passwords stored
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-semibold hover:underline"
            data-ocid="login.link"
          >
            Sign up free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
