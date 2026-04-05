import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { AdPlaceholder } from "../components/AdPlaceholder";
import { Navbar } from "../components/Navbar";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  sentAt: string;
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "basharatbashir033@gmail.com",
    href: "mailto:basharatbashir033@gmail.com",
  },
  {
    icon: MapPin,
    label: "Institution",
    value: "University of Swat",
    href: undefined,
  },
  {
    icon: Phone,
    label: "Response Time",
    value: "Within 24-48 hours",
    href: undefined,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.message.trim() || form.message.length < 10)
      errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const existing: ContactMessage[] = JSON.parse(
        localStorage.getItem("spt_messages") || "[]",
      );
      existing.push({
        id: crypto.randomUUID(),
        ...form,
        sentAt: new Date().toISOString(),
      });
      localStorage.setItem("spt_messages", JSON.stringify(existing));
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            Contact Us
          </Badge>
          <h1 className="text-4xl font-black text-foreground mb-3">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a question, suggestion, or feedback? We&apos;d love to hear
            from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left info */}
          <div className="md:col-span-2 space-y-4">
            <Card
              className="border-border shadow-card"
              data-ocid="contact.card"
            >
              <CardContent className="p-6 space-y-4">
                <h2 className="font-bold text-foreground">
                  Contact Information
                </h2>
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium text-primary hover:underline break-all"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-foreground">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <AdPlaceholder size="square" />
          </div>

          {/* Right form */}
          <div className="md:col-span-3">
            <Card
              className="border-border shadow-card"
              data-ocid="contact.card"
            >
              <CardContent className="p-7">
                {submitted ? (
                  <div
                    className="text-center py-10 space-y-3"
                    data-ocid="contact.success_state"
                  >
                    <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
                    <h3 className="text-xl font-bold text-foreground">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Thank you for reaching out. We&apos;ll get back to you
                      soon.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      data-ocid="contact.button"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    data-ocid="contact.modal"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-bold text-foreground">
                        Send a Message
                      </h2>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        data-ocid="contact.input"
                      />
                      {errors.name && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="contact.error_state"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        data-ocid="contact.input"
                      />
                      {errors.email && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="contact.error_state"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Type your message here..."
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, message: e.target.value }))
                        }
                        data-ocid="contact.textarea"
                      />
                      {errors.message && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="contact.error_state"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full header-gradient text-white font-semibold h-11"
                      data-ocid="contact.submit_button"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" /> Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-card py-6 mt-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-muted-foreground">
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
        </div>
      </footer>
    </div>
  );
}
