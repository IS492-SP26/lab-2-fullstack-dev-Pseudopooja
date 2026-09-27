"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { currentlyCards, site } from "@/lib/site";

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
          {currentlyCards.map((card, index) => (
            <article
              key={card.label}
              className={`rounded-[1.5rem] border border-border bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 ${
                isVisible ? "animate-fade-up" : ""
              }`}
              style={{
                opacity: isVisible ? undefined : 0,
                animationDelay: isVisible ? `${120 + index * 120}ms` : undefined,
              }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground/5 text-foreground">
                <Sparkles className="h-5 w-5" />
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
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          <span>Built to feel calm, not crowded.</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            Resume
            <ArrowRight className="h-4 w-4" />
          </a>
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
