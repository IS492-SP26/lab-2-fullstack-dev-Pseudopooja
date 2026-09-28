"use client";

import { Plus } from "lucide-react";
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
            Where I&apos;ve built, shipped, and learned.
          </h2>
        </div>

        {/* Editorial index: outlined start years, hairline rows, details on click */}
        <div className="mt-14 border-t border-foreground/10">
          {experience.map((item, index) => {
            const startYear = item.period.match(/\d{4}/)?.[0] ?? item.period;
            const isCurrent = /present/i.test(item.period);
            return (
              <details
                key={item.company}
                className={`group border-b border-foreground/10 ${isVisible ? "animate-fade-up" : ""}`}
                style={{
                  opacity: isVisible ? undefined : 0,
                  animationDelay: isVisible ? `${140 + index * 110}ms` : undefined,
                }}
              >
                <summary className="grid cursor-pointer grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 py-7 sm:grid-cols-[8.5rem_1fr_auto] sm:py-8 lg:grid-cols-[11rem_1fr_auto]">
                  <span
                    className="col-start-1 row-start-1 font-display text-5xl font-medium leading-none tracking-[-0.04em] text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_hsl(var(--foreground)/0.35)] group-hover:text-[hsl(var(--accent))] group-hover:[-webkit-text-stroke:1px_hsl(var(--accent))] group-open:text-[hsl(var(--accent))] group-open:[-webkit-text-stroke:1px_hsl(var(--accent))] sm:text-6xl lg:text-7xl"
                  >
                    {startYear}
                  </span>

                  <div className="col-span-2 col-start-1 row-start-2 min-w-0 transition-transform duration-500 ease-out group-hover:translate-x-1.5 sm:col-span-1 sm:col-start-2 sm:row-start-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground">
                        {item.category}
                      </p>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent)/0.1)] px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-[hsl(var(--accent))]">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--accent))] opacity-60 motion-reduce:hidden" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
                          </span>
                          Now
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-medium tracking-[-0.03em] text-foreground sm:text-3xl">
                      {item.company}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {item.title}
                      <span className="mx-2 text-foreground/20">/</span>
                      {item.period}
                      <span className="mx-2 text-foreground/20">/</span>
                      {item.location}
                    </p>
                  </div>

                  <span className="col-start-2 row-start-1 flex h-10 w-10 items-center justify-center justify-self-end rounded-full border border-foreground/15 text-muted-foreground transition-all duration-300 group-hover:border-foreground/30 group-hover:text-foreground group-open:rotate-45 group-open:border-foreground group-open:bg-foreground group-open:text-background sm:col-start-3">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>

                <div className="grid gap-6 pb-8 sm:grid-cols-[8.5rem_1fr] lg:grid-cols-[11rem_1fr]">
                  <div className="hidden sm:block" />
                  <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                    <p className="text-pretty text-base leading-7 text-muted-foreground">{item.summary}</p>
                    <ul className="grid gap-3">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
