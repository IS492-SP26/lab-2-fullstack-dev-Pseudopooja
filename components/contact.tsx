"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { site, socialLinks } from "@/lib/site";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { ref, isVisible } = useScrollAnimation();
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(data: typeof formData): FormErrors {
    const errs: FormErrors = {};
    if (!data.name.trim()) {
      errs.name = "Name is required.";
    } else if (data.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters.";
    }
    if (!data.email.trim()) {
      errs.email = "Email is required.";
    } else if (!emailRegex.test(data.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!data.message.trim()) {
      errs.message = "Message is required.";
    } else if (data.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    return errs;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    if (touched[e.target.name]) {
      const fieldErrors = validate(updated);
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: fieldErrors[e.target.name as keyof FormErrors],
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = e.target.name as keyof FormErrors;
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validate(formData);
    setErrors(allErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(allErrors).length > 0) return;

    const mailtoLink = `mailto:${site.email}?subject=${encodeURIComponent(
      `Portfolio inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`;
    window.open(mailtoLink);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTouched({});
    setErrors({});
    setTimeout(() => setSubmitted(false), 4000);
  };

  const fieldClass = (field: keyof FormErrors) =>
    `w-full rounded-2xl border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
      errors[field] && touched[field]
        ? "border-red-400 bg-red-50/50 focus:ring-red-300 dark:bg-red-950/20"
        : touched[field] && !errors[field] && formData[field as keyof typeof formData]
          ? "border-emerald-400 bg-card focus:ring-emerald-300"
          : "border-input bg-card focus:ring-ring"
    }`;

  return (
    <section id="contact" className="py-20 sm:py-24 lg:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-6" style={{ opacity: isVisible ? undefined : 0 }}>
        <div className={isVisible ? "animate-fade-up" : ""}>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Contact
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
            Have an interesting problem to solve? Let&apos;s talk.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Recruiters, hiring managers, and collaborators can reach me directly
            without friction.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className={isVisible ? "animate-fade-right" : ""} style={{ opacity: isVisible ? undefined : 0 }}>
            <div className="rounded-[1.5rem] border border-border/70 bg-card/70 p-6 shadow-soft backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Direct access
              </p>

              <div className="mt-5 grid gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.label === "Email" ? undefined : "_blank"}
                    rel={link.label === "Email" ? undefined : "noopener noreferrer"}
                    className="group flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-4 transition-colors hover:bg-foreground/5"
                  >
                    <span className="flex items-center gap-3 text-sm font-medium text-foreground">
                      {link.label === "Email" ? (
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      ) : link.label === "LinkedIn" ? (
                        <Linkedin className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Github className="h-4 w-4 text-muted-foreground" />
                      )}
                      {link.label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                For recruiter conversations, email is usually the fastest way to
                reach me. For context, LinkedIn and GitHub are always one tap away.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`rounded-[1.5rem] border border-border/70 bg-card/70 p-6 shadow-soft backdrop-blur-md ${isVisible ? "animate-fade-left" : ""}`}
            style={{ opacity: isVisible ? undefined : 0 }}
            noValidate
          >
            {submitted && (
              <div className="flex items-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Your email client is open. Thank you for reaching out.
              </div>
            )}

            <div className="mt-0 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={fieldClass("name")}
                  placeholder="Your name"
                />
                {errors.name && touched.name && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={fieldClass("email")}
                  placeholder="you@example.com"
                />
                {errors.email && touched.email && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                  Message <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`resize-none ${fieldClass("message")}`}
                  placeholder="Tell me a little about the role, project, or idea."
                />
                {errors.message && touched.message && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform duration-300 hover:-translate-y-0.5"
            >
              Send message
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
