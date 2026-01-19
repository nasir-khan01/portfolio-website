import { WindowFrame } from "@/components/WindowFrame";
import portfolioConfig from "@/data/portfolio.config.json";

interface AboutWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutWindow({ isOpen, onClose }: AboutWindowProps) {
  return (
    <WindowFrame
      title="about"
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-lg"
    >
      <div className="flex flex-col gap-6">
        {/* Profile Section */}
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent-orange)] to-orange-400 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {portfolioConfig.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{portfolioConfig.name}</h2>
            <p className="text-sm text-muted-foreground">Full Stack Developer</p>
            <a 
              href={`mailto:${portfolioConfig.email}`}
              className="text-sm text-[var(--accent-orange)] hover:underline"
            >
              {portfolioConfig.email}
            </a>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-3">
          <p className="text-muted-foreground leading-relaxed">
            hi! I'm a passionate developer with expertise in building scalable backend systems and modern frontend applications.
          </p>
          
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-muted-foreground">
              <span className="text-[var(--accent-orange)]">•</span>
              <span>Architect <strong className="text-foreground">scalable microservices</strong> and real-time systems</span>
            </li>
            <li className="flex items-start gap-2 text-muted-foreground">
              <span className="text-[var(--accent-orange)]">•</span>
              <span>Build <strong className="text-foreground">high-performance web apps</strong> with Next.js & React</span>
            </li>
            <li className="flex items-start gap-2 text-muted-foreground">
              <span className="text-[var(--accent-orange)]">•</span>
              <span>Optimize <strong className="text-foreground">DevOps pipelines</strong> and cloud infrastructure</span>
            </li>
          </ul>
        </div>

        {/* Resume Link */}
        <a
          href={portfolioConfig.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent-orange)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium w-fit"
        >
          View Resume →
        </a>
      </div>
    </WindowFrame>
  );
}
