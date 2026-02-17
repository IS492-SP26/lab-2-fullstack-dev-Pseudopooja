"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const lastScrollY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY;
      setVisible(currentY > 400);

      if (currentY > lastScrollY.current + 5) {
        setDirection("down");
      } else if (currentY < lastScrollY.current - 5) {
        setDirection("up");
      }

      lastScrollY.current = currentY;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback(() => {
    if (direction === "up") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [direction]);

  const label = direction === "up" ? "Scroll to top" : "Scroll to bottom";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={`fixed bottom-8 left-1/2 z-40 -translate-x-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 shadow-lg backdrop-blur-md transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
      style={{
        backgroundColor: "hsl(220 60% 25% / 0.55)",
        color: "#fff",
      }}
    >
      <span className="transition-transform duration-300" style={{ display: "flex", transform: direction === "down" ? "rotate(180deg)" : "rotate(0deg)" }}>
        <ChevronUp size={20} strokeWidth={2.5} />
      </span>
    </button>
  );
}
