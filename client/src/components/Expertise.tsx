import { motion } from "framer-motion";
import { Laptop, Database, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpertiseItem {
  title: string;
  keyFeatures: string[];
  techStack: string[];
}

interface ExpertiseProps {
  items: ExpertiseItem[];
}

export function Expertise({ items }: ExpertiseProps) {
  const [frontend, backend, devops] = items;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Top Row: Frontend (Full Width, Horizontal Layout) */}
        <div className="col-span-1 md:col-span-2">
            <BentoCard 
                item={frontend} 
                icon={<Laptop className="w-8 h-8 text-white/80" />} 
                horizontal
            />
        </div>

        {/* Bottom Row Left: Backend */}
        <div className="col-span-1">
            <BentoCard 
                item={backend} 
                icon={<Database className="w-8 h-8 text-white/80" />} 
            />
        </div>

        {/* Bottom Row Right: DevOps */}
        <div className="col-span-1">
             <BentoCard 
                item={devops} 
                icon={<Cloud className="w-8 h-8 text-white/80" />} 
            />
        </div>
      </div>
    </div>
  );
}

interface BentoCardProps {
    item: ExpertiseItem;
    icon: React.ReactNode;
    className?: string;
    horizontal?: boolean;
}

// Add import at the top
import { HoverBorderGradient } from "./HoverBorderGradient";

// ... [Skipping to BentoCard implementation]

function BentoCard({ item, icon, className, horizontal }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn("h-full", className)}
    >
      <HoverBorderGradient containerClassName="h-full" className="h-full">
        <div className={cn(
          "p-6 md:p-8 h-full rounded-2xl transition-all duration-300",
          "flex gap-6", 
          horizontal ? "flex-col md:flex-row md:items-start" : "flex-col"
        )}>
          
          {/* Icon Container */}
          <div className="shrink-0">
               <div className="inline-flex items-center justify-center p-3 rounded-xl bg-secondary/50 border border-white/5 group-hover:border-purple-500/20 group-hover:bg-purple-500/10 transition-colors duration-300">
                  {icon}
              </div>
          </div>

          {/* Content */}
          <div className="flex-grow">
              <h3 className="text-xl font-bold text-foreground mb-4">
              {item.title}
              </h3>

              <ul className="space-y-3 mb-6">
                {item.keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                    <span className="text-sm text-muted-foreground font-mono leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                  {item.techStack.map((tech, i) => (
                      <span key={i} className="text-xs font-medium text-muted-foreground bg-secondary/40 px-2.5 py-1 rounded border border-white/5 group-hover:text-purple-300/80 group-hover:border-purple-500/20 transition-colors">
                          {tech}
                      </span>
                  ))}
              </div>
          </div>
        </div>
      </HoverBorderGradient>
    </motion.div>
  );
}
