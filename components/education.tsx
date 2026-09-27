"use client";

import { GraduationCap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { education } from "@/lib/site";

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
            Compact, but still worth scanning.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {education.map((item, index) => (
            <article
              key={item.school}
              className={`rounded-[1.5rem] border border-border bg-card p-6 shadow-soft ${
                isVisible ? "animate-fade-up" : ""
              }`}
              style={{
                opacity: isVisible ? undefined : 0,
                animationDelay: isVisible ? `${120 + index * 110}ms` : undefined,
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-foreground/5 text-foreground">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {item.period}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-medium tracking-[-0.03em] text-foreground">
                    {item.school}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
                  <p className="mt-4 text-base leading-7 text-foreground">{item.degree}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
