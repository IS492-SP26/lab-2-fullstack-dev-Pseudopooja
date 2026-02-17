"use client";

import Image from "next/image";
import { BarChart3, Bot, GraduationCap, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import uiucLogo from "./UIUC logo.png";
import nmimsMogo from "./nmims logo.png";

const focusAreas = [
  {
    icon: BarChart3,
    label: "Data Governance & Quality",
    color: "hsl(220 60% 25%)",
  },
  {
    icon: Bot,
    label: "AI & Responsible Data Use",
    color: "hsl(174 60% 40%)",
  },
  {
    icon: Zap,
    label: "Business & Process Analysis",
    color: "hsl(43 74% 49%)",
  },
];

const education = [
  {
    school: "University of Illinois Urbana-Champaign",
    subtitle: "School of Information Science",
    degree: "Master of Science in Information Management",
    gpa: "CGPA: 4.0 / 4.0",
    period: "August 2025 - May 2027 (Expected)",
    coursework: "Introduction to Generative AI, Sociotechnical Information Systems, Information Consulting",
    accent: "hsl(174 60% 45%)",
    logo: uiucLogo,
  },
  {
    school: "NMIMS (Narsee Monjee Institute of Management Studies)",
    subtitle: "",
    degree: "MBA in Technology Management & B.E. in Electronics and Telecommunication (Dual Degree)",
    gpa: "CGPA: 3.53 / 4.0",
    period: "July 2018 - May 2023",
    coursework: "Major: Business Intelligence & Analytics | Minor: Marketing Analytics",
    accent: "hsl(220 60% 25%)",
    logo: nmimsMogo,
  },
];

export function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-6" style={{ opacity: isVisible ? undefined : 0 }}>
        <div className={isVisible ? "animate-fade-up" : ""}>
          <h2 className="text-center text-3xl font-bold tracking-tight text-primary md:text-4xl">
            About Me
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full" style={{ backgroundColor: "hsl(174 60% 45%)" }} />
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:items-start">
          {/* Background */}
          <div className={isVisible ? "animate-fade-right animate-delay-200" : ""} style={{ opacity: isVisible ? undefined : 0 }}>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Background
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              {"I am pursuing a Master's in Information Management at the University of Illinois Urbana-Champaign (CGPA: 4.0) with a dual-degree background in Technology Management (MBA) and Electronics Engineering from NMIMS, Mumbai. At Accenture, I spent two years translating regulatory, risk, and data governance requirements into enterprise system workflows, supporting compliant, AI-ready, and analytics-enabled data environments. I bridge the gap between technical data systems and strategic business goals."}
            </p>

            {/* Focus Areas */}
            <h3 className="mb-4 mt-8 text-lg font-semibold text-foreground">
              Focus Areas
            </h3>
            <div className="flex flex-col gap-4">
              {focusAreas.map((area) => (
                <div
                  key={area.label}
                  className="flex items-center gap-4 rounded-xl bg-card p-5 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: area.color + " / 0.12" }}
                  >
                    <area.icon size={24} style={{ color: area.color }} />
                  </div>
                  <span className="text-base font-medium text-foreground">
                    {area.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className={isVisible ? "animate-fade-left animate-delay-300" : ""} style={{ opacity: isVisible ? undefined : 0 }}>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Education
            </h3>
            <div className="flex flex-col gap-5">
              {education.map((edu) => (
                <div
                  key={edu.school}
                  className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: edu.accent + " / 0.12" }}
                    >
                      {edu.logo ? (
                        <Image
                          src={edu.logo}
                          alt={edu.school}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      ) : (
                        <GraduationCap size={20} style={{ color: edu.accent }} />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground leading-snug">
                        {edu.school}
                      </h4>
                      {edu.subtitle && (
                        <p className="text-xs text-muted-foreground">{edu.subtitle}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-foreground">{edu.degree}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor: edu.accent + " / 0.12",
                        color: edu.accent,
                      }}
                    >
                      {edu.gpa}
                    </span>
                    <span className="text-xs text-muted-foreground">{edu.period}</span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {edu.coursework}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
