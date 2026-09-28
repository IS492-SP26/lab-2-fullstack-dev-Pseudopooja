"use client";

import { useEffect } from "react";

// Always open the portfolio at the hero: turn off the browser's scroll restoration,
// drop any leftover #section from the URL, and handle in-page links without
// writing a hash, so a reload never lands mid-page.
export function StartAtTop() {
  useEffect(() => {
    history.scrollRestoration = "manual";
    if (location.hash) {
      history.replaceState(null, "", location.pathname + location.search);
    }
    const toTop = () => window.scrollTo({ top: 0, behavior: "instant" });
    toTop();
    // The browser may still apply its own fragment jump after hydration
    const settle = requestAnimationFrame(toTop);
    if (document.readyState !== "complete") window.addEventListener("load", toTop, { once: true });

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const target = link && document.getElementById(link.hash.slice(1));
      if (!target) return;

      e.preventDefault();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    };

    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(settle);
      window.removeEventListener("load", toTop);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
