"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navigationLinks, site } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-white/60 bg-background/85 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-transparent shadow-none"
        }`}
      >
        <a
          href="#hero"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-foreground transition-opacity hover:opacity-70"
        >
          <span className="font-display text-base tracking-[0.24em]">PS.</span>
          <span className="hidden text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground sm:inline">
            {site.name}
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground transition-colors hover:bg-foreground/5 md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-border bg-background/98 px-5 py-6 sm:max-w-sm"
          >
            <div className="flex flex-col gap-6 pt-8">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  Navigate
                </p>
                <p className="mt-2 text-lg font-display text-foreground">
                  {site.name}
                </p>
              </div>

              <nav className="flex flex-col gap-2" aria-label="Mobile primary">
                {navigationLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl border border-transparent bg-foreground/5 px-4 py-3 text-base text-foreground transition-colors hover:border-border hover:bg-foreground/8"
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
