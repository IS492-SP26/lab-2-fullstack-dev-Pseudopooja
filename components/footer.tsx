import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { site, socialLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#141414] py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-white/70">© 2026 {site.name}</p>
          <p className="mt-2 text-sm text-white/50">
            Built with curiosity, data, and a healthy respect for clean systems.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.label === "Email" ? undefined : "_blank"}
              rel={social.label === "Email" ? undefined : "noopener noreferrer"}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {social.label === "LinkedIn" ? (
                <Linkedin className="h-4 w-4" />
              ) : social.label === "GitHub" ? (
                <Github className="h-4 w-4" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
              {social.label}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
