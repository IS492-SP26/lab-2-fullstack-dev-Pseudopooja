"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, Github, Linkedin } from "lucide-react";
import profilePic from "./ProfilePic.jpeg";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top_left,_rgba(109,91,255,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(17,17,17,0.06),_transparent_24%)]" />

      <div className="mx-auto grid max-w-6xl gap-14 px-6 pb-18 lg:grid-cols-[1.25fr_0.85fr] lg:items-center lg:gap-10 lg:pb-28">
        <div className="max-w-3xl">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              {site.currentStudy} · {site.currentRole}
            </p>
            <h1 className="mt-5 text-balance font-display text-5xl font-medium tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
              {site.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
              {site.name} is building at the intersection of machine learning,
              enterprise data, and product thinking. Calm interfaces, precise
              systems, and work that is easy to trust.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-foreground">
            {site.roles.map((role, index) => (
              <span
                key={role}
                className={`rounded-full border border-border bg-background/70 px-4 py-2 backdrop-blur-sm ${
                  index === 0 ? "shadow-soft" : ""
                }`}
              >
                {role}
              </span>
            ))}
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

        <div className="relative mx-auto w-full max-w-[28rem] animate-scale-in lg:justify-self-end">
          <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(109,91,255,0.18),_transparent_55%)] blur-2xl" />
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-foreground/5">
              <Image
                src={profilePic}
                alt="Portrait of Pooja Sahu"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 28rem"
                className="object-cover object-[50%_18%]"
              />
            </div>
            <div className="border-t border-border bg-background/95 p-5 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Currently building
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    AI + data products with product judgment.
                  </p>
                </div>
                <span className="rounded-full border border-border bg-foreground/5 px-3 py-1 text-xs font-medium text-muted-foreground">
                  {site.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
