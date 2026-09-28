"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useActiveSection } from "@/hooks/use-active-section";
import { navigationLinks, site } from "@/lib/site";

// "hero" is observed too, so returning to the top clears the highlight
const sectionIds = ["hero", ...navigationLinks.map((link) => link.href.slice(1))];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(window.scrollY > 12);
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-[hsl(var(--accent))]"
        style={{ transform: `scaleX(${progress})` }}
      />
      <div
        className={`mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-5 md:grid-cols-[1fr_auto_1fr] ${
          scrolled
            ? "border-white/60 bg-background/85 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-transparent shadow-none"
        }`}
      >
        <a
          href="#hero"
          className="inline-flex items-center gap-2 justify-self-start text-sm font-semibold tracking-[0.2em] text-foreground transition-opacity hover:opacity-70"
        >
          <span className="font-display text-base tracking-[0.24em]">PS.</span>
          <span className="hidden text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground lg:inline">
            {site.name}
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navigationLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors duration-300 lg:px-4 ${
                  isActive
                    ? "bg-foreground/[0.07] text-foreground"
                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden justify-self-end md:block">
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform duration-300 hover:-translate-y-0.5"
          >
            Resume
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center justify-self-end rounded-full border border-border bg-background/90 text-foreground transition-colors hover:bg-foreground/5 md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-border bg-background px-5 py-6 sm:max-w-sm"
          >
            <div className="flex flex-col gap-6 pt-8">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  Navigate
                </p>
                <SheetTitle className="mt-2 font-display text-lg font-normal text-foreground">
                  {site.name}
                </SheetTitle>
                <SheetDescription className="sr-only">Jump to a section of the portfolio</SheetDescription>
              </div>

              <nav className="flex flex-col gap-2" aria-label="Mobile primary">
                {navigationLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-2xl border px-4 py-3 text-base text-foreground transition-colors hover:border-border ${
                      active === link.href.slice(1)
                        ? "border-border bg-card shadow-soft"
                        : "border-transparent bg-foreground/5"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background"
              >
                Resume
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
