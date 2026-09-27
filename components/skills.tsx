"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { skills } from "@/lib/site";

export function Skills() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="bg-foreground/[0.025] py-20 sm:py-24 lg:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-6" style={{ opacity: isVisible ? undefined : 0 }}>
        <div className={isVisible ? "animate-fade-up" : ""}>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Capabilities
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
            Organized by how I actually use them.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((group, index) => (
            <div
              key={group.category}
              className={`rounded-[1.5rem] border border-border bg-card p-6 shadow-soft ${isVisible ? "animate-fade-up" : ""}`}
              style={{
                opacity: isVisible ? undefined : 0,
                animationDelay: isVisible ? `${120 + index * 90}ms` : undefined,
              }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {group.category}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-foreground/5 px-3 py-1.5 text-sm text-foreground"
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
