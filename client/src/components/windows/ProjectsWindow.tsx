import { WindowFrame } from "@/components/WindowFrame";
import { ArrowUpRight } from "lucide-react";
import portfolioConfig from "@/data/portfolio.config.json";

interface ProjectsWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectsWindow({ isOpen, onClose }: ProjectsWindowProps) {
  const projects = portfolioConfig.projects;
  const expertise = portfolioConfig.expertise;

  return (
    <WindowFrame
      title="work"
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-2xl max-h-[80vh] overflow-y-auto"
    >
      <div className="space-y-8">
        {/* Call to Action */}
        <div className="p-4 bg-[var(--accent-orange)]/10 rounded-lg border border-[var(--accent-orange)]/20">
          <p className="text-[var(--accent-orange)] font-medium">
            Currently open to new opportunities! 
            <a href={`mailto:${portfolioConfig.email}`} className="underline ml-1">
              work email!
            </a>
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            I specialize in backend systems, frontend development, and DevOps.
          </p>
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
              Development
            </h3>
            <div className="flex flex-wrap gap-2">
              {expertise.flatMap(e => e.techStack).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md border border-blue-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Expertise Areas */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
              Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {expertise.map((e) => (
                <span
                  key={e.title}
                  className="px-3 py-1.5 text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-md border border-purple-500/20"
                >
                  {e.title}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Projects */}
        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
            Recent Projects
          </h3>
          <div className="space-y-3">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg border border-border hover:border-[var(--accent-orange)]/50 hover:bg-[var(--accent-orange)]/5 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-[var(--accent-orange)] transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs text-muted-foreground">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[var(--accent-orange)] shrink-0 mt-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}
