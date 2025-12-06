import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { SpotifyWidget } from "./SpotifyWidget";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const socialLinks = [
  { name: "GitHub", icon: Github, href: "#", testId: "link-github" },
  { name: "Twitter", icon: Twitter, href: "#", testId: "link-twitter" },
  { name: "LinkedIn", icon: Linkedin, href: "#", testId: "link-linkedin" },
  { name: "Email", icon: Mail, href: "mailto:hello@example.com", testId: "link-email" },
];

export function Footer({ className }: FooterProps) {
  const handleSocialClick = (name: string) => {
    console.log(`Clicked ${name} link`);
  };

  return (
    <footer
      className={cn(
        "border-t border-border/30 py-10 sm:py-12",
        className
      )}
      id="contact"
      data-testid="footer"
    >
      <div className="max-w-2xl mx-auto px-5 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <SpotifyWidget />
          <div className="flex items-center gap-5 sm:gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href === "#") {
                      e.preventDefault();
                      handleSocialClick(link.name);
                    }
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label={link.name}
                  data-testid={link.testId}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground/60 text-center">
            Built with care. Open source on{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                console.log("Clicked source link");
              }}
              className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              data-testid="link-source"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
