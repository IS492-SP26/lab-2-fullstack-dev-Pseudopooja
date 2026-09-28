"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Dumbbell, Plane, type LucideIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { life } from "@/lib/site";

const icons: LucideIcon[] = [Dumbbell, Plane];

// Resting pose for each depth in the stack: [x offset, y offset, rotation]
const stackPoses: [number, number, number][] = [
  [0, 0, -2],
  [14, 6, 5],
  [-12, 10, -7],
];

function PolaroidStack({
  images,
  caption,
  interval,
  tilt,
}: {
  images: string[];
  caption: string;
  interval: number;
  tilt: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [count, paused, interval]);

  return (
    <button
      type="button"
      onClick={() => setIndex((i) => (i + 1) % count)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={`${caption}: photo ${index + 1} of ${count}. Show next photo`}
      className="group relative aspect-[3/4] w-full cursor-pointer"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {images.map((src, i) => {
        // Depth 0 is on top; the card just dealt away sits at depth count - 1
        const depth = (i - index + count) % count;
        const justLeft = count > 3 && depth === count - 1;
        const visible = depth < stackPoses.length;
        const [x, y, r] = visible ? stackPoses[depth] : [0, 12, 0];

        const transform = justLeft
          ? "translate(45%, -6%) rotate(14deg) scale(0.96)"
          : `translate(${x}px, ${y}px) rotate(${r}deg) scale(${1 - depth * 0.03})`;

        return (
          <figure
            key={src}
            className="absolute inset-0 flex flex-col rounded-md bg-white p-2 pb-0 shadow-[0_18px_40px_-18px_hsl(224_18%_11%/0.45)] ring-1 ring-black/5 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform,
              opacity: visible ? 1 : 0,
              zIndex: count - depth,
            }}
          >
            <div className="relative flex-1 overflow-hidden rounded-[3px] bg-foreground/5">
              <Image
                src={src}
                alt=""
                fill
                quality={90}
                priority={i === 0}
                sizes="(max-width: 768px) 45vw, 20rem"
                className="object-cover"
              />
            </div>
            <figcaption className="flex min-h-10 items-center justify-between gap-2 px-1 py-1.5 leading-snug text-[0.58rem] uppercase tracking-[0.1em] text-neutral-500 sm:h-11 sm:text-[0.68rem] sm:tracking-[0.2em]">
              <span className="min-w-0">{caption}</span>
              <span className="hidden tabular-nums sm:inline">
                {depth === 0 ? `${String(index + 1).padStart(2, "0")}/${String(count).padStart(2, "0")}` : ""}
              </span>
            </figcaption>
          </figure>
        );
      })}
    </button>
  );
}

export function Life() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="life" className="overflow-hidden py-20 sm:py-24 lg:py-28">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12"
        style={{ opacity: isVisible ? undefined : 0 }}
      >
        <div className={isVisible ? "animate-fade-up" : ""}>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Beyond work
          </p>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
            Strength, new places, and a little adventure.
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
            The habits that keep me grounded off-screen shape how I show up on
            every team.
          </p>

          <ul className="mt-10 grid gap-6">
            {life.map((item, index) => {
              const Icon = icons[index % icons.length];
              return (
                <li key={item.title} className="flex gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card/70 text-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                      {item.label}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-medium tracking-[-0.02em] text-foreground">
                      {/* The display font's ampersand is ornamental; set it in the body font */}
                      {item.title.split("&").map((part, i) =>
                        i === 0 ? part : (
                          <span key={i}>
                            <span className="font-sans">&amp;</span>
                            {part}
                          </span>
                        )
                      )}
                    </h3>
                    <p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className={`mx-auto grid w-full max-w-2xl grid-cols-2 gap-6 px-2 sm:gap-12 sm:px-4 ${
            isVisible ? "animate-fade-up" : ""
          }`}
          style={{ animationDelay: isVisible ? "180ms" : undefined }}
        >
          {life.map((item, index) =>
            item.images && item.images.length > 0 ? (
              <div key={item.title} className={index % 2 === 1 ? "mt-16 sm:mt-20" : ""}>
                <PolaroidStack
                  images={item.images}
                  caption={item.caption}
                  interval={3600 + index * 900}
                  tilt={index % 2 === 0 ? -2 : 2}
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
