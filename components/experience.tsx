"use client";

import Image from "next/image";
import { useState } from "react";
import { Briefcase, ChevronDown, Database, GraduationCap, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import accentureLogo from "./accenture logo.png";
import suntekLogo from "./suntek logo.png";
import capgeminiLogo from "./capgemini logo.png";

const experiences = [
  {
    icon: GraduationCap,
    title: "Growth Coach",
    subtitle: "BUS 401: Leadership, Decision-Making & Professional Development",
    company: "University of Illinois Urbana-Champaign",
    location: "Champaign, IL",
    period: "Sep 2025 - Present",
    bullets: [
      "Led and facilitated BUS 401 sessions for 50+ students, delivering structured content and decision-making frameworks through discussion-driven, workshop-style sessions.",
      "Evaluated and graded student deliverables and action plans, assessing analytical rigor, clarity of reasoning, and execution readiness against defined criteria.",
    ],
    accent: "hsl(174 60% 45%)",
  },
  {
    icon: Briefcase,
    title: "Business Analyst - Technology & Risk Systems",
    subtitle: "",
    company: "Accenture",
    location: "Mumbai, India",
    period: "Jun 2023 - Jul 2025",
    bullets: [
      "Translated regulatory, risk, and data governance requirements into enterprise system workflows, supporting compliant, AI-ready, and analytics-enabled data environments.",
      "Maintained and validated 50,000+ enterprise data records, performing data quality checks, reconciliation, and lineage validation across integrated platforms.",
      "Supported data governance and risk classification, including identification of sensitive data elements (PII) and usage constraints across systems.",
      "Collaborated with cross-functional teams to document data ownership, control logic, and reporting structures, improving transparency and auditability.",
      "Executed UAT cycles to validate data integrity, reporting accuracy, and control behavior, while supporting system integrations feeding governance dashboards.",
    ],
    accent: "hsl(220 60% 25%)",
    logo: accentureLogo,
  },
  {
    icon: TrendingUp,
    title: "Management Intern",
    subtitle: "",
    company: "Sunteck Realty",
    location: "Mumbai, India",
    period: "May 2022 - Sep 2022",
    bullets: [
      "Analyzed sales, customer, and marketing data to identify demand trends, customer segments, and performance gaps, supporting data-driven business and marketing decisions.",
      "Developed dashboards and analytical reports using Excel, SQL, and Power BI, translating complex datasets into clear, actionable insights for non-technical stakeholders.",
      "Conducted market and competitive analysis and synthesized findings into executive-ready presentations to support management decision-making.",
    ],
    accent: "hsl(43 74% 49%)",
    logo: suntekLogo,
  },
  {
    icon: Database,
    title: "Data & Analytics Intern",
    subtitle: "",
    company: "Capgemini",
    location: "Mumbai, India",
    period: "May 2021 - Jun 2021",
    bullets: [
      "Analyzed large datasets to identify data quality issues, inconsistencies, and trends, supporting accurate reporting and business analysis.",
      "Worked closely with engineering and analytics teams to clarify data requirements, validate assumptions, and resolve data-related gaps impacting downstream reporting.",
      "Documented data validation rules, logic, and findings using Excel and Python, enabling repeatable analysis and improved data reliability for business use cases.",
    ],
    accent: "hsl(200 65% 40%)",
    logo: capgeminiLogo,
  },
];

export function Experience() {
  const { ref, isVisible } = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section id="experience" className="bg-muted/50 py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-6" style={{ opacity: isVisible ? undefined : 0 }}>
        <div className={isVisible ? "animate-fade-up" : ""}>
          <h2 className="text-center text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Professional Journey
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full" style={{ backgroundColor: "hsl(174 60% 45%)" }} />
        </div>

        <div className="relative mt-14">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 hidden w-0.5 bg-border md:left-1/2 md:block" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={exp.title}
                  className={`relative flex flex-col gap-4 md:flex-row md:items-start ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } ${isVisible ? (index % 2 === 0 ? "animate-fade-right" : "animate-fade-left") : ""}`}
                  style={{
                    opacity: isVisible ? undefined : 0,
                    animationDelay: isVisible ? `${200 + index * 150}ms` : undefined,
                  }}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      className={`w-full rounded-xl bg-card p-6 text-left shadow-sm ring-1 ring-border transition-all duration-300 hover:shadow-md ${
                        isOpen ? "ring-2" : ""
                      }`}
                      style={{
                        borderColor: isOpen ? exp.accent : undefined,
                        ringColor: isOpen ? exp.accent : undefined,
                      }}
                    >
                      {/* Header row */}
                      <div
                        className={`flex items-center gap-3 ${
                          index % 2 === 0 ? "md:justify-end" : ""
                        }`}
                      >
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: exp.accent + " / 0.12" }}
                        >
                          {exp.logo ? (
                            <Image
                              src={exp.logo}
                              alt={exp.company}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          ) : (
                            <exp.icon size={20} style={{ color: exp.accent }} />
                          )}
                        </div>
                        <span
                          className="rounded-full px-3 py-1 text-xs font-semibold"
                          style={{
                            backgroundColor: exp.accent + " / 0.12",
                            color: exp.accent,
                          }}
                        >
                          {exp.period}
                        </span>

                        {/* Chevron indicator */}
                        <ChevronDown
                          size={18}
                          className="ml-auto shrink-0 text-muted-foreground transition-transform duration-300"
                          style={{
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        />
                      </div>

                      {/* Title & company (always visible) */}
                      <h3 className="mt-3 text-lg font-semibold text-foreground">
                        {exp.title}
                      </h3>
                      {exp.subtitle && (
                        <p className="mt-0.5 text-xs italic text-muted-foreground">
                          {exp.subtitle}
                        </p>
                      )}
                      <p className="mt-0.5 text-sm font-medium" style={{ color: exp.accent }}>
                        {exp.company}{" "}
                        <span className="text-muted-foreground">
                          {"— "}
                          {exp.location}
                        </span>
                      </p>

                      {/* Expandable bullet points */}
                      <div
                        className="overflow-hidden transition-all duration-400 ease-in-out"
                        style={{
                          maxHeight: isOpen ? `${exp.bullets.length * 120}px` : "0px",
                          opacity: isOpen ? 1 : 0,
                        }}
                      >
                        <ul className="mt-4 flex flex-col gap-2 text-left">
                          {exp.bullets.map((bullet, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                            >
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ backgroundColor: exp.accent }}
                              />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Hint text when collapsed */}
                      {!isOpen && (
                        <p className="mt-3 text-xs text-muted-foreground/60">
                          Click to view details
                        </p>
                      )}
                    </button>
                  </div>

                  {/* Timeline dot */}
                  <div
                    className="absolute left-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-card transition-transform duration-300 md:left-1/2 md:block"
                    style={{
                      backgroundColor: exp.accent,
                      transform: isOpen ? "translateX(-50%) scale(1.4)" : "translateX(-50%) scale(1)",
                    }}
                  />

                  {/* Empty side for layout */}
                  <div className="hidden flex-1 md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
