import { WindowFrame } from "@/components/WindowFrame";
import { Github, Twitter, Linkedin, Mail, FileText } from "lucide-react";
import portfolioConfig from "@/data/portfolio.config.json";

interface LinksWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  {
    name: "GitHub",
    icon: Github,
    href: portfolioConfig.socials.github,
    description: "Check out my code",
    color: "hover:bg-gray-100 dark:hover:bg-gray-800",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: portfolioConfig.socials.linkedin,
    description: "Connect with me",
    color: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: portfolioConfig.socials.twitter,
    description: "Follow my updates",
    color: "hover:bg-sky-50 dark:hover:bg-sky-900/20",
  },
  {
    name: "Email",
    icon: Mail,
    href: `mailto:${portfolioConfig.email}`,
    description: "Send me a message",
    color: "hover:bg-orange-50 dark:hover:bg-orange-900/20",
  },
  {
    name: "Resume",
    icon: FileText,
    href: portfolioConfig.resumeUrl,
    description: "View my resume",
    color: "hover:bg-green-50 dark:hover:bg-green-900/20",
  },
];

export function LinksWindow({ isOpen, onClose }: LinksWindowProps) {
  return (
    <WindowFrame
      title="links"
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-md"
    >
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground mb-4">
          Clicking any of the links will open a new tab!
        </p>
        
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-border transition-all ${link.color}`}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted">
                <Icon className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{link.name}</h4>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </div>
            </a>
          );
        })}
      </div>
    </WindowFrame>
  );
}
