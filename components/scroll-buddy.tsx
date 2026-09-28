"use client";

import { useEffect, useRef, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";

// What the robot says in each section
const sections = [
  { id: "hero", quip: "Hi! I'm Pooja's sidekick 👋" },
  { id: "about", quip: "The backstory" },
  { id: "experience", quip: "The receipts 🧾" },
  { id: "projects", quip: "Ooh, the good stuff" },
  { id: "skills", quip: "The superpowers ⚡" },
  { id: "education", quip: "Straight A's, btw" },
  { id: "life", quip: "The fun part 🏔️" },
  { id: "contact", quip: "Go on, say hi" },
] as const;

const sectionIds = sections.map((s) => s.id);

type Mode = "section" | "fast" | "done";

// Lines it cycles through when clicked
const greetings = [
  "Hi there! 👋",
  "Beep boop 🤖",
  "Psst… Pooja's hiring-ready ✨",
  "You found me! 🎉",
];

// A tiny AI robot riding a rail on the right edge: its position mirrors reading
// progress, it squishes with scroll speed, and it comments on each section.
export function ScrollBuddy() {
  const trackRef = useRef<HTMLDivElement>(null);
  const riderRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const [moving, setMoving] = useState(false);
  const [mode, setMode] = useState<Mode>("section");
  const [greeting, setGreeting] = useState<{ text: string; id: number } | null>(
    null,
  );
  const greetCount = useRef(0);
  const greetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const active = useActiveSection(sectionIds);

  // Clicking the robot makes it hop, wave, and say hi
  const greet = () => {
    const id = greetCount.current++;
    setGreeting({ text: greetings[id % greetings.length], id });
    clearTimeout(greetTimer.current);
    greetTimer.current = setTimeout(() => setGreeting(null), 2200);
  };

  useEffect(() => () => clearTimeout(greetTimer.current), []);

  const quip = greeting
    ? greeting.text
    : mode === "done"
      ? "You made it! Now say hi →"
      : mode === "fast"
        ? "Speed-reading? I'll wait ☕"
        : (sections.find((s) => s.id === active) ?? sections[0]).quip;

  useEffect(() => {
    const track = trackRef.current;
    const rider = riderRef.current;
    const body = bodyRef.current;
    const eyes = eyesRef.current;
    if (!track || !rider || !body || !eyes) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let lastY = window.scrollY;
    let frame = 0;
    let idle: ReturnType<typeof setTimeout> | undefined;
    // The speed joke only fires for sustained fast scrolling, never for nav-link
    // jumps, and at most once per visit so it stays a surprise rather than a nag.
    let fastSince = 0;
    let fastShown = false;
    let ignoreFastUntil = 0;

    const progress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };

    const place = () => {
      const travel = track.clientHeight - rider.clientHeight;
      rider.style.transform = `translate3d(0, ${progress() * travel}px, 0)`;
    };

    const settle = () => {
      body.style.transform = "scale(1, 1)";
      eyes.style.transform = "translate(0, 0)";
      setMoving(false);
      setMode((m) => (m === "fast" ? "section" : m));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        place();

        const velocity = window.scrollY - lastY;
        lastY = window.scrollY;
        const now = performance.now();
        const speeding = Math.abs(velocity) > 120 && now > ignoreFastUntil;
        fastSince = speeding ? fastSince || now : 0;
        const showFast = !fastShown && speeding && now - fastSince > 600;
        if (showFast) fastShown = true;

        const atEnd = progress() > 0.985;
        setMode((m) =>
          atEnd ? "done" : showFast || m === "fast" ? "fast" : "section",
        );
        setMoving(true);

        if (!reduced) {
          // Faster scrolling stretches the robot along the direction of travel
          const stretch = Math.min(Math.abs(velocity) / 60, 0.25);
          body.style.transform = `scale(${1 - stretch * 0.5}, ${1 + stretch})`;
          eyes.style.transform = `translate(0, ${Math.sign(velocity) * 1.2}px)`;
        }

        clearTimeout(idle);
        idle = setTimeout(settle, 900);
      });
    };

    const onAnchorClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest('a[href^="#"]')) {
        ignoreFastUntil = performance.now() + 2000;
      }
    };

    place();
    document.addEventListener("click", onAnchorClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(idle);
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", place);
    };
  }, []);

  const showBubble = moving || mode === "done" || greeting !== null;
  const waving = mode === "done" || greeting !== null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden h-[46vh] -translate-y-1/2 xl:block"
    >
      <div ref={trackRef} className="relative h-full w-8">
        {/* Rail */}
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-foreground/15 to-transparent" />

        <div
          ref={riderRef}
          className="absolute left-0 top-0 h-10 w-8 will-change-transform"
        >
          {/* Speech bubble */}
          <span
            className={`absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-2xl rounded-br-md border border-border/70 bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-soft backdrop-blur-md transition-all duration-300 ${
              showBubble
                ? "translate-x-0 scale-100 opacity-100"
                : "translate-x-2 scale-95 opacity-0"
            }`}
          >
            {quip}
          </span>

          {/* Decorative easter egg, so it stays out of the tab order */}
          <button
            type="button"
            tabIndex={-1}
            onClick={greet}
            className="pointer-events-auto block h-10 w-8 cursor-pointer"
          >
            <div
              key={greeting?.id ?? "idle"}
              className={`h-10 w-8 ${greeting ? "animate-[buddyHop_0.7s_cubic-bezier(0.34,1.6,0.64,1)]" : ""}`}
            >
              <div
                ref={bodyRef}
                className="h-10 w-8 origin-bottom drop-shadow-[0_6px_10px_hsl(248_70%_45%/0.35)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.8,0.64,1)]"
              >
                <svg
                  viewBox="0 0 32 40"
                  className="h-full w-full overflow-visible"
                >
                  <defs>
                    <linearGradient
                      id="buddy-shell"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="hsl(248 90% 78%)" />
                      <stop offset="100%" stopColor="hsl(248 68% 56%)" />
                    </linearGradient>
                  </defs>

                  {/* Antenna with a softly glowing bulb */}
                  <line
                    x1="16"
                    y1="3.5"
                    x2="16"
                    y2="8.5"
                    stroke="hsl(248 60% 45%)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="16"
                    cy="3"
                    r="2.4"
                    className="animate-[buddyGlow_2.4s_ease-in-out_infinite]"
                    fill="hsl(40 95% 62%)"
                  />

                  {/* Head */}
                  <rect
                    x="3"
                    y="8"
                    width="26"
                    height="20"
                    rx="8"
                    fill="url(#buddy-shell)"
                  />
                  <rect
                    x="6.5"
                    y="12.5"
                    width="19"
                    height="10.5"
                    rx="5.25"
                    fill="hsl(235 30% 14%)"
                  />
                  <g
                    ref={eyesRef}
                    className="transition-transform duration-300"
                  >
                    {greeting ? (
                      // Happy ^ ^ eyes while greeting
                      <>
                        <path
                          d="M10.4 18.8 L12.3 16.6 L14.2 18.8"
                          fill="none"
                          stroke="hsl(185 95% 75%)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.8 18.8 L19.7 16.6 L21.6 18.8"
                          fill="none"
                          stroke="hsl(185 95% 75%)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </>
                    ) : (
                      <>
                        <ellipse
                          cx="12.3"
                          cy="17.8"
                          rx="1.9"
                          ry="2.2"
                          fill="hsl(185 95% 75%)"
                          className="origin-center animate-[buddyBlink_4.5s_infinite] [transform-box:fill-box]"
                        />
                        <ellipse
                          cx="19.7"
                          cy="17.8"
                          rx="1.9"
                          ry="2.2"
                          fill="hsl(185 95% 75%)"
                          className="origin-center animate-[buddyBlink_4.5s_infinite] [transform-box:fill-box]"
                        />
                      </>
                    )}
                  </g>
                  <circle
                    cx="7.2"
                    cy="25"
                    r="1.4"
                    fill="hsl(340 85% 78%)"
                    opacity="0.8"
                  />
                  <circle
                    cx="24.8"
                    cy="25"
                    r="1.4"
                    fill="hsl(340 85% 78%)"
                    opacity="0.8"
                  />

                  {/* Body and arms */}
                  <rect
                    x="9.5"
                    y="29"
                    width="13"
                    height="8.5"
                    rx="4"
                    fill="url(#buddy-shell)"
                  />
                  <line
                    x1="9.5"
                    y1="32"
                    x2="5.5"
                    y2="35.5"
                    stroke="hsl(248 68% 60%)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="5" cy="36" r="1.6" fill="hsl(248 90% 80%)" />
                  <g
                    className={`origin-[22.5px_32px] ${waving ? "animate-[buddyWave_0.45s_ease-in-out_infinite]" : ""}`}
                  >
                    <line
                      x1="22.5"
                      y1="32"
                      x2="26.5"
                      y2="35.5"
                      stroke="hsl(248 68% 60%)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="27" cy="36" r="1.6" fill="hsl(248 90% 80%)" />
                  </g>
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
