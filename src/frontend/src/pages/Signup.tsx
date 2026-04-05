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
import { CheckCircle, GraduationCap, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const perks = [
  "Free GPA & CGPA calculator",
  "Unlimited subject tracking",
  "Performance analytics & charts",
  "Smart study recommendations",
];

export default function Signup() {
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
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left: value prop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block"
        >
          <div className="header-gradient rounded-2xl p-8 text-white shadow-xl">
            <GraduationCap className="w-12 h-12 mb-4 text-white/80" />
            <h2 className="text-2xl font-black mb-2">
              Student Performance Tracker
            </h2>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              Join thousands of students building better academic habits with
              SPT.
            </p>
            <ul className="space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span className="text-white/90">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-6 md:hidden">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl header-gradient shadow-lg mb-3">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-black text-foreground">
              Student Performance Tracker
            </h1>
          </div>

          <Card className="border-border shadow-card" data-ocid="signup.panel">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Create Your Account</CardTitle>
              <CardDescription>
                Start tracking your academic journey today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Muhammad Basharat"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  data-ocid="signup.input"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Secure Sign Up
                  </span>
                </div>
              </div>

              <Button
                onClick={login}
                disabled={isLoggingIn}
                className="w-full header-gradient text-white font-semibold h-11"
                data-ocid="signup.submit_button"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Connecting...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="mr-2 h-5 w-5" /> Create Account
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Secured by Internet Identity &mdash; no email or password needed
              </p>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
              data-ocid="signup.link"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
