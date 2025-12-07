import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HoverBorderGradient } from "./HoverBorderGradient";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  timeline?: string;
}

interface BentoGridProps {
  projects: Project[];
  className?: string;
}

export function BentoGrid({ projects, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <HoverBorderGradient containerClassName="h-full">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-5 sm:p-6 h-full group/card"
        data-testid={`card-project-${project.id}`}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover/card:text-foreground/90 transition-colors">
            {project.title}
          </h3>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center opacity-0 scale-90 group-hover/card:opacity-100 group-hover/card:scale-100 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-foreground" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-mono text-[10px] sm:text-xs px-2 py-0.5 bg-secondary/40 text-muted-foreground border-0 hover:bg-secondary/40"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </a>
    </HoverBorderGradient>
  );
}
