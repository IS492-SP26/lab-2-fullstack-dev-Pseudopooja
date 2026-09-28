"use client";

import { useEffect, useRef } from "react";

// Fixed, decorative layer behind the whole page: drifting colour fields,
// a soft light that trails the cursor, and a fine grain texture.
export function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const target = { x: window.innerWidth / 2, y: window.innerHeight * 0.3 };
    const current = { ...target };
    let frame = 0;

    const tick = () => {
      // Ease toward the pointer so the light trails rather than snaps
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      root.style.setProperty("--cursor-x", `${current.x}px`);
      root.style.setProperty("--cursor-y", `${current.y}px`);
      root.style.setProperty("--scroll-y", `${window.scrollY}`);

      const settled =
        Math.abs(target.x - current.x) < 0.5 && Math.abs(target.y - current.y) < 0.5;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    // Only animate while something is changing
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      wake();
    };

    if (finePointer) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", wake, { passive: true });
    wake();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", wake);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="ambient pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-layer" style={{ "--parallax": "-0.04" } as React.CSSProperties}>
        <span className="ambient-blob ambient-blob--indigo" />
      </div>
      <div className="ambient-layer" style={{ "--parallax": "-0.07" } as React.CSSProperties}>
        <span className="ambient-blob ambient-blob--peach" />
      </div>
      <div className="ambient-layer" style={{ "--parallax": "-0.025" } as React.CSSProperties}>
        <span className="ambient-blob ambient-blob--sage" />
      </div>
      <div className="ambient-layer" style={{ "--parallax": "-0.055" } as React.CSSProperties}>
        <span className="ambient-blob ambient-blob--rose" />
      </div>
      <div className="ambient-cursor" />
      <div className="ambient-grain" />
    </div>
  );
}
