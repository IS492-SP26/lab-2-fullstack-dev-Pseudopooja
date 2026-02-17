"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown, Download, Mail, X } from "lucide-react";
import profilePic from "./ProfilePic.jpeg";

export function Hero() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleDownload(e: React.FormEvent) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    
    setIsLoading(true);
    try {
      // Call the resume download API
      const response = await fetch("/api/resume-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to record email");
      }

      setError("");
      setShowModal(false);
      setEmail("");
      window.open(
        "https://drive.google.com/file/d/1zOKHKuoapfC_vn4oN6RNyCcysRF3U7Rf/view?usp=sharing",
        "_blank",
        "noopener,noreferrer"
      );
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to process request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-primary pt-28 pb-20 md:pt-36 md:pb-28">
        {/* subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent" />
          <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-accent/50" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-6 md:flex-row md:gap-16">
          {/* Text */}
          <div className="flex-1 text-center md:text-left animate-fade-right">
            <p
              className="mb-3 text-sm font-semibold uppercase tracking-widest"
              style={{ color: "hsl(174 60% 65%)" }}
            >
              Welcome to my portfolio
            </p>
            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
              {"Hi, I'm "}
              <span style={{ color: "hsl(174 60% 65%)" }}>Pooja Sahu</span>
            </h1>
            <p className="mt-4 text-lg font-medium text-primary-foreground/80 md:text-xl">
              Data Governance &amp; Business Analyst
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-primary-foreground/65 md:text-lg">
              MS in Information Management at UIUC | Translating data
              governance, risk, and AI requirements into enterprise-ready
              solutions.
            </p>
            <p className="mt-2 text-sm text-primary-foreground/50">
              Champaign, IL (Willing to Relocate)
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
                style={{ backgroundColor: "hsl(174 60% 45%)", color: "#fff" }}
              >
                View My Work
                <ArrowDown size={16} />
              </a>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: "hsl(43 74% 49%)",
                  color: "#fff",
                }}
              >
                Download Resume
                <Download size={16} />
              </button>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/25 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Get In Touch
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="relative flex-shrink-0 animate-scale-in animate-delay-200">
            <div
              className="h-64 w-64 overflow-hidden rounded-full border-4 shadow-2xl md:h-80 md:w-80"
              style={{ borderColor: "hsl(174 60% 45%)" }}
            >
              <Image
                src={profilePic}
                alt="Pooja Sahu professional portrait"
                width={320}
                height={320}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Email Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Enter email to download resume"
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl ring-1 ring-border"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setError("");
                setEmail("");
              }}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-foreground">
              Download Resume
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Please enter your email address to access my resume.
            </p>

            <form onSubmit={handleDownload} className="mt-6">
              <label
                htmlFor="resume-email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Email Address
              </label>
              <input
                id="resume-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm" style={{ color: "hsl(0 72% 51%)" }}>
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-4 w-full rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "hsl(174 60% 45%)" }}
              >
                {isLoading ? "Processing..." : "Continue"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
