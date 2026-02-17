"use client";

import { useState } from "react";
import { Mail, MapPin, Linkedin, Phone, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
    if (!data.subject.trim()) {
      errs.subject = "Subject is required.";
    } else if (data.subject.trim().length < 3) {
      errs.subject = "Subject must be at least 3 characters.";
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
    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(allErrors).length > 0) return;

    const mailtoLink = `mailto:Poojads2@illinois.edu?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`;
    window.open(mailtoLink);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTouched({});
    setErrors({});
    setTimeout(() => setSubmitted(false), 4000);
  };

  const fieldClass = (field: keyof FormErrors) =>
    `w-full rounded-lg border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
      errors[field] && touched[field]
        ? "border-red-400 bg-red-50/50 focus:ring-red-300 dark:bg-red-950/20"
        : touched[field] && !errors[field] && formData[field]
          ? "border-emerald-400 bg-card focus:ring-emerald-300"
          : "border-input bg-card focus:ring-ring"
    }`;

  return (
    <section id="contact" className="py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-6" style={{ opacity: isVisible ? undefined : 0 }}>
        <div className={isVisible ? "animate-fade-up" : ""}>
          <h2 className="text-center text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {"Let's Connect"}
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full" style={{ backgroundColor: "hsl(174 60% 45%)" }} />
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          {/* Form */}
          <form onSubmit={handleSubmit} className={`flex flex-col gap-5 ${isVisible ? "animate-fade-right animate-delay-200" : ""}`} style={{ opacity: isVisible ? undefined : 0 }} noValidate>
            {submitted && (
              <div className="flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                <CheckCircle2 size={16} />
                Your email client has been opened. Thank you for reaching out!
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
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
                  <AlertCircle size={12} />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldClass("email")}
                placeholder="your@email.com"
              />
              {errors.email && touched.email && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                  <AlertCircle size={12} />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Subject <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldClass("subject")}
                placeholder="Subject"
              />
              {errors.subject && touched.subject && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                  <AlertCircle size={12} />
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`resize-none ${fieldClass("message")}`}
                placeholder="Your message..."
              />
              {errors.message && touched.message && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                  <AlertCircle size={12} />
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              style={{ backgroundColor: "hsl(174 60% 40%)" }}
            >
              Send Message
              <Send size={16} />
            </button>
          </form>

          {/* Contact Info */}
          <div className={`flex flex-col justify-center gap-6 ${isVisible ? "animate-fade-left animate-delay-300" : ""}`} style={{ opacity: isVisible ? undefined : 0 }}>
            <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
              <h3 className="mb-5 text-lg font-semibold text-foreground">
                Contact Information
              </h3>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: "hsl(220 60% 25% / 0.1)",
                    }}
                  >
                    <Mail
                      size={18}
                      style={{ color: "hsl(220 60% 25%)" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Email
                    </p>
                    <a
                      href="mailto:Poojads2@illinois.edu"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      Poojads2@illinois.edu
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: "hsl(174 60% 40% / 0.1)",
                    }}
                  >
                    <Phone
                      size={18}
                      style={{ color: "hsl(174 60% 40%)" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Phone
                    </p>
                    <a
                      href="tel:+12176373023"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      (217) 637-3023
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: "hsl(200 65% 40% / 0.1)",
                    }}
                  >
                    <Linkedin
                      size={18}
                      style={{ color: "hsl(200 65% 40%)" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      LinkedIn
                    </p>
                    <a
                      href="https://linkedin.com/in/sahu-pooja/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      linkedin.com/in/sahu-pooja/
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: "hsl(43 74% 49% / 0.1)",
                    }}
                  >
                    <MapPin
                      size={18}
                      style={{ color: "hsl(43 74% 49%)" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Location
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Champaign, IL (Willing to Relocate)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
