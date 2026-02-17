"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const skillGroups = [
  {
    category: "AI, Data & Governance",
    color: "hsl(220 60% 25%)",
    skills: [
      "SQL",
      "Power BI",
      "Excel",
      "Data Analysis",
      "KPI Design",
      "Trend Analysis",
      "Root Cause Analysis",
      "Data Validation",
      "Decision Support",
      "Data Governance",
      "Data Quality Management",
      "Data Documentation",
      "Data Ownership & Stewardship",
      "Sensitive Data Identification (PII)",
      "Responsible Data Use",
    ],
  },
  {
    category: "Business Analysis & Stakeholder Engagement",
    color: "hsl(174 60% 40%)",
    skills: [
      "Requirements Elicitation",
      "Business Process Analysis",
      "Use Cases",
      "User Stories",
      "Gap Analysis",
      "Workshop Facilitation",
      "Cross-Functional Collaboration",
      "Executive-Level Communication",
    ],
  },
  {
    category: "Process, Systems & Delivery",
    color: "hsl(43 74% 49%)",
    skills: [
      "Process Mapping (AS-IS / TO-BE)",
      "Workflow Analysis",
      "UAT Coordination",
      "Defect Tracking",
      "Change Management",
      "Agile / Scrum",
      "SDLC Fundamentals",
    ],
  },
  {
    category: "Tools & Technical Foundations",
    color: "hsl(200 65% 40%)",
    skills: [
      "Python",
      "Power BI",
      "Tableau",
      "Microsoft Excel",
      "PowerPoint",
      "Word",
      "REST APIs",
    ],
  },
];

export function Skills() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="bg-muted/50 py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-6" style={{ opacity: isVisible ? undefined : 0 }}>
        <div className={isVisible ? "animate-fade-up" : ""}>
          <h2 className="text-center text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {"Technical & Functional Skills"}
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full" style={{ backgroundColor: "hsl(174 60% 45%)" }} />
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <div
              key={group.category}
              className={`rounded-xl bg-card p-6 shadow-sm ring-1 ring-border ${isVisible ? "animate-fade-up" : ""}`}
              style={{
                opacity: isVisible ? undefined : 0,
                animationDelay: isVisible ? `${200 + index * 120}ms` : undefined,
              }}
            >
              <h3
                className="mb-5 text-base font-semibold"
                style={{ color: group.color }}
              >
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full px-4 py-2 text-sm font-medium transition-shadow hover:shadow-md"
                    style={{
                      backgroundColor: group.color + " / 0.1",
                      color: group.color,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
