"use client";

import { ResumeLink } from "@/components/resume-gate";
import { ArrowRight, Blocks, BrainCircuit, Sparkle, Telescope } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { currentlyCards, site } from "@/lib/site";
import { trackSpotlight } from "@/lib/spotlight";

// Each card gets its own icon, hover animation, and tint from the background palette
const icons = [
  { Icon: Blocks, hover: "group-hover:animate-[iconStack_0.9s_ease-in-out]", hue: "248 75% 62%" },
  { Icon: BrainCircuit, hover: "group-hover:animate-[iconPulse_1.1s_ease-in-out_infinite]", hue: "22 85% 58%" },
  { Icon: Telescope, hover: "group-hover:animate-[iconScan_1.4s_ease-in-out]", hue: "165 50% 40%" },
];

export function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 sm:py-24 lg:py-28">
      <div
        ref={ref}
        className="mx-auto max-w-6xl px-6"
        style={{ opacity: isVisible ? undefined : 0 }}
      >
        <div className={isVisible ? "animate-fade-up" : ""}>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            About / currently
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
            A concise picture of how I work and what I am building toward.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            {site.name} combines AI curiosity, data discipline, and product
            thinking to move from interesting ideas to trustworthy systems.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {currentlyCards.map((card, index) => {
            const { Icon, hover, hue } = icons[index % icons.length];
            return (
            <article
              key={card.label}
              onMouseMove={trackSpotlight}
              className={`spotlight group rounded-[1.5rem] border border-border/70 bg-card/70 p-6 shadow-soft backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 ${
                isVisible ? "animate-fade-up" : ""
              }`}
              style={{
                opacity: isVisible ? undefined : 0,
                animationDelay: isVisible ? `${120 + index * 120}ms` : undefined,
              }}
            >
              <div
                className="relative h-12 w-12 animate-[iconFloat_4s_ease-in-out_infinite] motion-reduce:animate-none"
                style={{ animationDelay: `${index * 0.6}s`, "--tint": hue } as React.CSSProperties}
              >
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[hsl(var(--tint)/0.1)] text-[hsl(var(--tint))] ring-1 ring-[hsl(var(--tint)/0.15)] transition-all duration-300 group-hover:bg-[hsl(var(--tint))] group-hover:text-white group-hover:shadow-[0_10px_24px_-10px_hsl(var(--tint))]">
                  <Icon className={`h-5 w-5 ${hover} motion-reduce:animate-none`} />
                </div>
                <Sparkle className="absolute -right-1.5 -top-1.5 h-3.5 w-3.5 scale-0 fill-[hsl(var(--tint))] text-[hsl(var(--tint))] opacity-0 group-hover:animate-[sparklePop_0.5s_ease-out_forwards]" />
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {card.label}
              </p>
              <h3 className="mt-3 font-display text-xl font-medium tracking-[-0.03em] text-foreground">
                {card.value}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {card.description}
              </p>
            </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ResumeLink
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            Resume
            <ArrowRight className="h-4 w-4" />
          </ResumeLink>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            Talk to me
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
