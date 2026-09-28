"use client";

import { BookOpen, ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { education } from "@/lib/site";
import { trackSpotlight } from "@/lib/spotlight";

export function Education() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="education" className="py-20 sm:py-24 lg:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-6" style={{ opacity: isVisible ? undefined : 0 }}>
        <div className={isVisible ? "animate-fade-up" : ""}>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Education
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
            Engineering roots, information-science focus.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2 lg:items-start">
          {education.map((item, index) => (
            <article
              key={item.school}
              onMouseMove={trackSpotlight}
              className={`spotlight rounded-[1.5rem] border border-border/70 bg-card/70 p-6 shadow-soft backdrop-blur-md sm:p-7 ${
                isVisible ? "animate-fade-up" : ""
              }`}
              style={{
                opacity: isVisible ? undefined : 0,
                animationDelay: isVisible ? `${120 + index * 110}ms` : undefined,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 min-w-12 shrink-0 items-center justify-center rounded-2xl bg-foreground px-3 font-display text-sm font-medium tracking-[0.08em] text-background">
                  {item.shortName}
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  {item.gpa && (
                    <span className="whitespace-nowrap rounded-full bg-[hsl(var(--accent)/0.1)] px-3 py-1 text-xs font-medium text-[hsl(var(--accent))]">
                      GPA {item.gpa}
                    </span>
                  )}
                  <span className="whitespace-nowrap rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                    {item.period}
                  </span>
                </div>
              </div>

              <h3 className="mt-6 font-display text-2xl font-medium tracking-[-0.03em] text-foreground">
                {item.school}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{item.detail}</p>

              <ul className="mt-6 grid gap-3">
                {item.degrees.map((degree) => (
                  <li key={degree.name} className="border-l-2 border-[hsl(var(--accent)/0.6)] pl-4">
                    <p className="text-base font-medium leading-7 text-foreground">{degree.name}</p>
                    {degree.focus && (
                      <p className="text-sm leading-6 text-muted-foreground">{degree.focus}</p>
                    )}
                  </li>
                ))}
              </ul>

              {item.coursework && item.coursework.length > 0 && (
                <details className="group mt-6 border-t border-border pt-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium text-foreground">
                    <span className="inline-flex items-center gap-2.5">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      Relevant coursework
                      <span className="rounded-full bg-foreground/5 px-2 py-0.5 text-xs text-muted-foreground">
                        {item.coursework.reduce((n, term) => n + term.courses.length, 0)}
                      </span>
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                  </summary>

                  <div className="mt-5 grid gap-5">
                    {item.coursework.map((term) => (
                      <div key={term.term}>
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                          {term.term}
                          {term.current && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent)/0.1)] px-2 py-0.5 text-[0.65rem] tracking-[0.12em] text-[hsl(var(--accent))]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
                              In progress
                            </span>
                          )}
                        </div>
                        <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
                          {term.courses.map((course) => (
                            <li
                              key={course.code}
                              className="rounded-xl border border-border/70 bg-background/60 px-3.5 py-2.5"
                            >
                              <p className="font-display text-xs tracking-[0.08em] text-[hsl(var(--accent))]">
                                {course.code}
                              </p>
                              <p className="mt-0.5 text-sm leading-5 text-foreground">{course.title}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
