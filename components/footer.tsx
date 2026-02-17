import { Linkedin, Github, Mail } from "lucide-react";

const socials = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/sahu-pooja/",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/",
    label: "GitHub",
  },
  {
    icon: Mail,
    href: "mailto:Poojads2@illinois.edu",
    label: "Email",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <p className="text-sm text-primary-foreground/60">
          {"© 2026 Pooja Sahu"}
        </p>

        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground/60 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
