"use client";

import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { projects } from "@/lib/site";

export function Projects() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-20 sm:py-24 lg:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-6" style={{ opacity: isVisible ? undefined : 0 }}>
        <div className={isVisible ? "animate-fade-up" : ""}>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Selected work
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
            The strongest proof points, presented like a product story.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            These projects are arranged to be easy to scan quickly, then open up
            into a little more depth when someone wants the details.
          </p>
        </div>

        <div className="mt-14 grid gap-5">
          {projects.map((project, index) => (
            <details
              key={project.title}
              className={`group rounded-[1.5rem] border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 ${isVisible ? "animate-fade-up" : ""}`}
              style={{
                opacity: isVisible ? undefined : 0,
                animationDelay: isVisible ? `${140 + index * 100}ms` : undefined,
              }}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 outline-none">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <span>{project.number}</span>
                    <span className="h-px w-8 bg-border" />
                    <span>{project.category}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-medium tracking-[-0.03em] text-foreground sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-pretty text-base leading-7 text-muted-foreground">
                    {project.summary}
                  </p>
                </div>

                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-90" />
              </summary>

              <div className="mt-6 grid gap-6 border-t border-border pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <ul className="grid gap-3 text-sm text-muted-foreground">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 leading-6">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
