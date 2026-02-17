"use client";

import { useState, useEffect } from "react";
import { X, Send, AlertCircle, CheckCircle2, Star, Linkedin } from "lucide-react";

type FormErrors = {
  name?: string;
  message?: string;
  rating?: string;
};

export function Feedback() {
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
    anonymous: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Show button based on scroll and time
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage > 30) {
        setShowButton(true);
      }
    };

    const timer = setTimeout(() => {
      setShowButton(true);
    }, 20000); // 20 seconds

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  function validate(data: typeof formData): FormErrors {
    const errs: FormErrors = {};
    if (!data.anonymous && !data.name.trim()) {
      errs.name = "Name is required unless anonymous.";
    } else if (!data.anonymous && data.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters.";
    }
    if (!data.message.trim()) {
      errs.message = "Feedback is required.";
    } else if (data.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    if (!data.rating || data.rating < 1 || data.rating > 5) {
      errs.rating = "Please select a rating.";
    }
    return errs;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const updated = {
      ...formData,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : (name === "rating" ? parseInt(value) : value),
    };
    setFormData(updated);
    if (touched[name]) {
      const fieldErrors = validate(updated);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name as keyof FormErrors],
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const field = e.target.name;
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validate(formData);
    setErrors(allErrors);
    setTouched({ name: true, message: true, rating: true });

    if (Object.keys(allErrors).length > 0) return;

    setIsLoading(true);
    try {
      // Send feedback to API
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "", rating: 5, anonymous: false });
      setTouched({});
      setErrors({});
      setTimeout(() => {
        setSubmitted(false);
        setShowModal(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setErrors({ message: "Failed to submit feedback. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const fieldClass = (field: keyof FormErrors) =>
    `w-full rounded-lg border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
      errors[field] && touched[field]
        ? "border-red-400 bg-red-50/50 focus:ring-red-300 dark:bg-red-950/20"
        : touched[field] && !errors[field] && formData[field as keyof typeof formData]
          ? "border-emerald-400 bg-card focus:ring-emerald-300"
          : "border-input bg-card focus:ring-ring"
    }`;

  return (
    <>
      {/* Floating Feedback Button - Only show when user is engaged */}
      {showButton && !showModal && (
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 z-40 flex h-12 w-32 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl font-semibold text-sm animate-fade-up"
          style={{
            backgroundColor: "hsl(174 60% 45%)",
            color: "#fff",
            borderRadius: "50px",
          }}
          aria-label="Send feedback"
        >
          Feedback
        </button>
      )}

      {/* Feedback Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Send feedback"
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl ring-1 ring-border"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setErrors({});
                setTouched({});
              }}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle2 size={48} className="mb-4 text-emerald-500" />
                <h3 className="text-lg font-bold text-foreground">
                  Thank You!
                </h3>
                <p className="mt-2 text-center text-sm text-muted-foreground mb-6">
                  Your feedback matters and helps me improve. I appreciate it!
                </p>
                <a
                  href="https://www.linkedin.com/in/sahu-pooja/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "hsl(200 65% 40%)" }}
                >
                  <Linkedin size={16} />
                  Connect on LinkedIn
                </a>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-foreground">
                  Quick Feedback
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  How's my portfolio looking? Your thoughts help me improve!
                </p>

                <form onSubmit={handleSubmit} className="mt-6" noValidate>
                  {/* Anonymous Checkbox */}
                  <div className="mb-4 flex items-center gap-2">
                    <input
                      id="anonymous"
                      type="checkbox"
                      name="anonymous"
                      checked={formData.anonymous}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-border"
                    />
                    <label htmlFor="anonymous" className="text-sm text-muted-foreground cursor-pointer">
                      Keep me anonymous
                    </label>
                  </div>

                  {/* Name Field - Hidden if anonymous */}
                  {!formData.anonymous && (
                    <div className="mb-4">
                      <label
                        htmlFor="feedback-name"
                        className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="feedback-name"
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={fieldClass("name")}
                      />
                      {errors.name && touched.name && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle size={12} />
                          {errors.name}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="mb-4">
                    <label
                      htmlFor="feedback-email"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Email (Optional)
                    </label>
                    <input
                      id="feedback-email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  {/* Rating Field */}
                  <div className="mb-4">
                    <label className="mb-3 block text-sm font-medium text-foreground">
                      How would you rate this portfolio? <span className="text-red-400">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, rating: star });
                            setTouched((prev) => ({ ...prev, rating: true }));
                          }}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            size={28}
                            className={`${
                              star <= formData.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {errors.rating && touched.rating && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle size={12} />
                        {errors.rating}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="mb-6">
                    <label
                      htmlFor="feedback-message"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      What could I improve? <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="feedback-message"
                      name="message"
                      rows={3}
                      placeholder="e.g., Better project descriptions, more case studies, etc."
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`resize-none ${fieldClass("message")}`}
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
                    disabled={isLoading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: "hsl(174 60% 45%)" }}
                  >
                    {isLoading ? "Sending..." : "Send Feedback"}
                    {!isLoading && <Send size={16} />}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
