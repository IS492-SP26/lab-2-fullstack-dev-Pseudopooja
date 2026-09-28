"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Github, Linkedin, MapPin } from "lucide-react";
import profilePic from "./ProfilePic.jpeg";
import { site } from "@/lib/site";

function RotatingRole({ roles }: { roles: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <span className="relative inline-grid font-medium text-foreground">
      <span className="sr-only">{roles.join(", ")}</span>
      {/* Longest role reserves the width so the pill never jumps */}
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {roles.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <span key={roles[index]} className="animate-role-in col-start-1 row-start-1" aria-hidden>
        {roles[index]}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top_left,_rgba(109,91,255,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(17,17,17,0.06),_transparent_24%)]" />

      <div className="mx-auto grid max-w-6xl gap-14 px-6 pb-20 lg:grid-cols-[1.25fr_0.85fr] lg:items-center lg:gap-10 lg:pb-28">
        <div className="max-w-3xl">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              {site.currentStudy} · {site.currentRole}
            </p>
            <h1 className="mt-5 text-balance font-display text-5xl font-medium tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
              {site.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
              I&apos;m Pooja — a data scientist with a product mindset, obsessed
              with making AI genuinely useful, not just impressive.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 shadow-soft">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--accent))] opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
              </span>
              <RotatingRole roles={site.roles} />
            </span>
            <span className="rounded-full border border-border bg-foreground/5 px-4 py-2 text-muted-foreground">
              {site.graduation}
            </span>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore my work
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/75 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/20 hover:bg-foreground/5"
            >
              Resume
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>

        <figure className="group mx-auto w-full max-w-[23rem] animate-scale-in pr-3 lg:justify-self-end">
          <div className="relative">
            {/* Offset outline, like a matted print */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] border border-foreground/15 transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-4"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-foreground/5 shadow-soft">
              <Image
                src={profilePic}
                alt="Portrait of Pooja Sahu"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 23rem"
                className="object-cover object-[45%_40%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </div>
          <figcaption className="mt-7 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
            <span>{site.name}</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              {site.location}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
