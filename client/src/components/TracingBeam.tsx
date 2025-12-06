import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TracingBeamProps {
  events: TimelineEvent[];
  className?: string;
}

export function TracingBeam({ events, className }: TracingBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, [events]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, svgHeight]),
    { stiffness: 500, damping: 90 }
  );

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="absolute left-3 sm:left-4 top-0 w-px h-full">
        <svg
          viewBox={`0 0 2 ${svgHeight}`}
          width="2"
          height={svgHeight}
          className="absolute left-0 top-0"
          aria-hidden="true"
        >
          <line
            x1="1"
            y1="0"
            x2="1"
            y2={svgHeight}
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
          <motion.line
            x1="1"
            y1="0"
            x2="1"
            y2={y1}
            stroke="url(#beam-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="beam-gradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.2)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.9)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div ref={contentRef} className="relative pl-10 sm:pl-12">
        {events.map((event, index) => (
          <TimelineItem key={index} event={event} index={index} />
        ))}
      </div>
    </div>
  );
}

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
}

function TimelineItem({ event, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative pb-10 sm:pb-12 last:pb-0"
      data-testid={`timeline-event-${index}`}
    >
      <motion.div 
        className="absolute -left-[1.65rem] sm:-left-[1.9rem] w-3 h-3 rounded-full bg-background border-2 border-purple-500/60"
        whileInView={{
          boxShadow: [
            "0 0 0 0 rgba(139, 92, 246, 0)",
            "0 0 0 6px rgba(139, 92, 246, 0.1)",
            "0 0 8px 2px rgba(139, 92, 246, 0.2)",
          ],
        }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        viewport={{ once: true }}
      />
      
      <div className="space-y-1.5">
        <motion.span 
          className="inline-block font-mono text-xs sm:text-sm text-purple-400/80 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          viewport={{ once: true }}
        >
          {event.year}
        </motion.span>
        <h3 className="text-base sm:text-lg font-semibold text-foreground leading-snug">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {event.description}
        </p>
      </div>
    </motion.div>
  );
}
