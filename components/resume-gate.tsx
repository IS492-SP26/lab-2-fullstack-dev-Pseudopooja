"use client";

import { useEffect, useState } from "react";
import { AlertCircle, ArrowUpRight, X } from "lucide-react";
import { site } from "@/lib/site";

const OPEN_EVENT = "open-resume-gate";

// Resume link used everywhere on the page. With JavaScript it opens the email
// dialog below; without it, it still links straight to the PDF.
export function ResumeLink({
  className,
  children,
  onOpen,
}: {
  className?: string;
  children: React.ReactNode;
  onOpen?: () => void;
}) {
  return (
    <a
      href={site.resume}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        onOpen?.();
        window.dispatchEvent(new Event(OPEN_EVENT));
      }}
    >
      {children}
    </a>
  );
}

// Asks for an email, records it via /api/resume-download (Supabase), then opens the resume.
export function ResumeGate() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener(OPEN_EVENT, show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, show);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Open the tab now, while the click still counts as a user gesture, so
    // Safari's popup blocker allows it; point it at the PDF once recorded.
    const tab = window.open("", "_blank");
    setIsLoading(true);
    try {
      const response = await fetch("/api/resume-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!response.ok) throw new Error("Failed to record email");
    } catch (err) {
      // Never block a recruiter from the resume because logging failed
      console.error("Resume download log failed:", err);
    } finally {
      setIsLoading(false);
    }

    if (tab) tab.location.href = site.resume;
    else window.location.href = site.resume;
    setOpen(false);
    setEmail("");
    setError("");
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-gate-title"
    >
      <div
        className="relative w-full max-w-md rounded-[1.5rem] border border-border bg-card p-7 shadow-soft sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <h3 id="resume-gate-title" className="font-display text-xl font-medium tracking-[-0.02em] text-foreground">
          View my resume
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Leave your email so I know who&apos;s stopping by — the resume opens right after.
        </p>

        <form onSubmit={handleSubmit} className="mt-6" noValidate>
          <label htmlFor="resume-email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="resume-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            autoFocus
            className={`w-full rounded-2xl border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
              error ? "border-red-400 focus:ring-red-300" : "border-input focus:ring-ring"
            }`}
          />
          {error && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle size={12} />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? "Opening…" : "Open resume"}
            {!isLoading && <ArrowUpRight size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
}
