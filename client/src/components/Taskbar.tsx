import { Github, Twitter, Linkedin } from "lucide-react";
import portfolioConfig from "@/data/portfolio.config.json";

const socials = portfolioConfig.socials;

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: socials.twitter },
  { name: "GitHub", icon: Github, href: socials.github },
  { name: "LinkedIn", icon: Linkedin, href: socials.linkedin },
];

export function Taskbar() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="flex items-center justify-center gap-4 py-4 px-6">
        {/* Social Links */}
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--taskbar-icon-bg)] hover:bg-[var(--taskbar-icon-hover-bg)] border border-[var(--taskbar-icon-border)] transition-all duration-200 hover:scale-110"
                aria-label={link.name}
              >
                <Icon className="w-4 h-4 text-[var(--taskbar-icon-color)]" />
              </a>
            );
          })}
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center pb-3">
        <span className="text-xs text-[var(--taskbar-text-color)] font-mono">
          © {currentYear} {portfolioConfig.name}
        </span>
      </div>
    </div>
  );
}
