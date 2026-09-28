"use client";

import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { projects } from "@/lib/site";
import { trackSpotlight } from "@/lib/spotlight";

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
            Systems I&apos;ve designed across AI, ML, and data.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Open any project for the approach, the decisions behind it, and the
            stack.
          </p>
        </div>

        <div className="mt-14 grid gap-5">
          {projects.map((project, index) => (
            <details
              key={project.title}
              onMouseMove={trackSpotlight}
              className={`spotlight group rounded-[1.5rem] border border-border/70 bg-card/70 p-6 shadow-soft backdrop-blur-md transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-foreground/15 open:border-foreground/15 sm:p-7 ${isVisible ? "animate-fade-up" : ""}`}
              style={{
                opacity: isVisible ? undefined : 0,
                animationDelay: isVisible ? `${140 + index * 100}ms` : undefined,
              }}
            >
              <summary className="cursor-pointer">
                <div className="grid grid-cols-[1fr_auto] items-start gap-x-6">
                  <div className="min-w-0 max-w-3xl">
                    <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground sm:flex-row sm:items-center sm:gap-3">
                      <span className="font-display text-sm tracking-[0.1em] text-[hsl(var(--accent))]">
                        {project.number}
                      </span>
                      <span className="hidden h-px w-8 bg-border sm:block" />
                      <span>{project.category}</span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-medium tracking-[-0.03em] text-foreground sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-pretty text-base leading-7 text-muted-foreground">
                      {project.summary}
                    </p>
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-foreground/20 group-hover:text-foreground group-open:rotate-90 group-open:bg-foreground group-open:text-background">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
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
