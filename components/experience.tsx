"use client";

import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { experience } from "@/lib/site";

export function Experience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-20 sm:py-24 lg:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-6" style={{ opacity: isVisible ? undefined : 0 }}>
        <div className={isVisible ? "animate-fade-up" : ""}>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Experience
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
            Cleaner than a timeline, more useful than a résumé dump.
          </h2>
        </div>

        <div className="mt-14 grid gap-5">
          {experience.map((item, index) => (
            <details
              key={item.company}
              className={`group rounded-[1.5rem] border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 ${
                isVisible ? "animate-fade-up" : ""
              }`}
              style={{
                opacity: isVisible ? undefined : 0,
                animationDelay: isVisible ? `${140 + index * 120}ms` : undefined,
              }}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 outline-none">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {item.category}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.03em] text-foreground">
                    {item.company}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.title}</p>
                </div>

                <div className="flex shrink-0 items-center gap-3 text-right">
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-foreground">{item.period}</p>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-90" />
                </div>
              </summary>

              <div className="mt-6 grid gap-6 border-t border-border pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <p className="text-pretty text-base leading-7 text-muted-foreground">
                  {item.summary}
                </p>

                <ul className="grid gap-3 text-sm text-foreground">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 leading-6 text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
