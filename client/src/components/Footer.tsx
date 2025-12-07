import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/nasir-khan01", testId: "link-github" },
  { name: "Twitter", icon: Twitter, href: "https://x.com/nasir_khan83353", testId: "link-twitter" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/nasir-khan01/", testId: "link-linkedin" },
  { name: "Email", icon: Mail, href: "mailto:nasir.projects1@gmail.com", testId: "link-email" },
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

          <div className="flex items-center gap-5 sm:gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              const isExternal = link.href.startsWith('http');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
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
        </div>
      </div>
    </footer>
  );
}
