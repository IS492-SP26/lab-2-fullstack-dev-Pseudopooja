"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { skills } from "@/lib/site";
import { trackSpotlight } from "@/lib/spotlight";

export function Skills() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-20 sm:py-24 lg:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-6" style={{ opacity: isVisible ? undefined : 0 }}>
        <div className={isVisible ? "animate-fade-up" : ""}>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Capabilities
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
            What I bring to an AI team.
          </h2>
        </div>

        {/* All capabilities visible at once, in the same card language as About */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {skills.map((item, index) => {
            const [before, metric, after] = item.proof;
            return (
              <article
                key={item.category}
                onMouseMove={trackSpotlight}
                className={`spotlight flex flex-col rounded-[1.5rem] border border-border/70 bg-card/70 p-6 shadow-soft backdrop-blur-md sm:p-7 ${
                  isVisible ? "animate-fade-up" : ""
                }`}
                style={{
                  opacity: isVisible ? undefined : 0,
                  animationDelay: isVisible ? `${120 + index * 100}ms` : undefined,
                }}
              >
                <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-foreground">
                  {/* The display font's ampersand is ornamental; set it in the body font */}
                  {item.category.split("&").map((part, i) =>
                    i === 0 ? part : (
                      <span key={i}>
                        <span className="font-sans">&amp;</span>
                        {part}
                      </span>
                    )
                  )}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-7 text-muted-foreground">
                  {before} <strong className="font-semibold text-foreground">{metric}</strong> {after}
                </p>
                <p className="mt-5 border-t border-border/70 pt-4 text-xs leading-5 text-muted-foreground">
                  {item.tools.join(" · ")}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
