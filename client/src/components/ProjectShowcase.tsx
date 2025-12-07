import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  image?: string;
  keyFeatures?: string[];
}

interface ProjectShowcaseProps {
  projects: Project[];
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = projects.length > visibleCount;

  return (
    <div className="w-full">
      {/* Top Border for the Grid */}
      <div className="w-full h-px bg-zinc-800" />

      <div className="flex flex-col">
          {visibleProjects.map((project, index) => (
             <SwissGridRow key={project.id} project={project} index={index} />
          ))}
      </div>

       {/* Load More - Simple Text Link */}
       {hasMore && (
           <div className="flex justify-center mt-12">
               <Button 
                    variant="link" 
                    onClick={() => setVisibleCount((prev) => prev + 3)}
                    className="text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest decoration-zinc-800 hover:decoration-white"
               >
                 View All Projects
               </Button>
           </div>
       )}
    </div>
  );
}

function SwissGridRow({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group w-full flex flex-col md:flex-row border-x border-b border-zinc-800 bg-black hover:bg-[#111] transition-colors duration-300 min-h-[160px]"
    >
        {/* Section 1: Identity (25%) - Title Only */}
        <div className="w-full md:w-1/4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col justify-start">
            <h3 className="text-3xl font-bold text-white tracking-tighter leading-none group-hover:text-zinc-200 transition-colors">
                {project.title}
            </h3>
        </div>

        {/* Section 2: Context (50%) */}
        <div className="w-full md:w-1/2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col justify-start">
            <p className="text-zinc-400 text-base leading-relaxed max-w-lg">
                {project.description}
            </p>
        </div>

        {/* Section 3: Tech & Action (25%) */}
        <div className="w-full md:w-1/4 p-6 md:p-8 flex flex-col justify-between">
            <div className="flex flex-col gap-1.5">
                {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-[10px] uppercase font-medium text-zinc-500 tracking-wider">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex justify-end mt-6 md:mt-0">
                <span className="text-xs font-bold text-white flex items-center gap-2 group-hover:gap-3 transition-all">
                    VIEW <ArrowRight className="w-3 h-3" />
                </span>
            </div>
        </div>
    </motion.a>
  );
}
