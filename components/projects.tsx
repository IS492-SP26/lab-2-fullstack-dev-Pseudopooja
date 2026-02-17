"use client";

import { ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const projects = [
  {
    title: "Generative AI Systems Evaluation",
    description:
      "Built a Ping Pong game using Gemini CLI, GitHub Copilot, and ChatGPT, comparing tools on code quality, interpretability, development speed, and human oversight, with documented insights on responsible AI use and transparency.",
    tools: ["Gemini CLI", "GitHub Copilot", "ChatGPT", "Responsible AI"],
    accent: "hsl(220 60% 25%)",
  },
  {
    title: "AI-Powered Personal Website",
    description:
      "Designed and deployed an AI-generated website using v0.dev and Vercel, integrating a Supabase (SQL) feedback database and evaluating AI tools on design control, responsiveness, and data handling.",
    tools: ["v0.dev", "Vercel", "Supabase", "SQL", "Next.js"],
    accent: "hsl(174 60% 40%)",
  },
];

export function Projects() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-6" style={{ opacity: isVisible ? undefined : 0 }}>
        <div className={isVisible ? "animate-fade-up" : ""}>
          <h2 className="text-center text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Key Projects
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full" style={{ backgroundColor: "hsl(174 60% 45%)" }} />
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 md:max-w-4xl md:mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group flex flex-col rounded-xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lg ${isVisible ? "animate-scale-in" : ""}`}
              style={{
                opacity: isVisible ? undefined : 0,
                animationDelay: isVisible ? `${200 + index * 150}ms` : undefined,
              }}
            >
              <div
                className="mb-4 h-1.5 w-12 rounded-full"
                style={{ backgroundColor: project.accent }}
              />
              <h3 className="text-lg font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full px-3 py-1 text-xs font-medium ring-1 ring-border"
                    style={{
                      backgroundColor: project.accent + " / 0.08",
                      color: project.accent,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <button
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: project.accent }}
              >
                View Details
                <ExternalLink size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
