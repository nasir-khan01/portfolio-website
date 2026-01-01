import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface LiquidHoverProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export const LiquidHover = ({
  children,
  className,
  onClick,
  ...props
}: LiquidHoverProps) => {
  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-3 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      onClick={onClick}
      initial="initial"
      whileHover="hover"
      {...props}
    >
      {/* Wave Container */}
      <div className="absolute inset-x-0 bottom-0 h-[200%] pointer-events-none translate-y-full overflow-hidden">
        {/* Wave 1 - Deep Violet (Slower, Background) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 top-0 text-violet-500/30 dark:text-violet-400/20"
          variants={{
            initial: { y: "50%" },
            hover: { y: "0%", transition: { duration: 0.6, ease: "easeOut" } }
          }}
        >
          <svg className="w-[200%] h-full absolute bottom-0 left-0 animate-wave-slow" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,100 L0,100 Z" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Wave 2 - Muted Cyan (Medium, Middle) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 top-0 text-cyan-400/40 dark:text-cyan-300/30 mix-blend-multiply dark:mix-blend-screen"
          variants={{
            initial: { y: "50%" },
            hover: { y: "0%", transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } }
          }}
        >
          <svg className="w-[200%] h-full absolute bottom-0 left-0 animate-wave-medium opacity-80" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,50 C200,80 400,20 600,50 C800,80 1000,20 1200,50 L1200,100 L0,100 Z" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Wave 3 - Warm Amber (Fast, Foreground) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 top-0 text-amber-400/40 dark:text-amber-300/30 mix-blend-multiply dark:mix-blend-screen"
          variants={{
            initial: { y: "50%" },
            hover: { y: "0%", transition: { duration: 0.4, ease: "easeOut", delay: 0.15 } }
          }}
        >
          <svg className="w-[200%] h-full absolute bottom-0 left-0 animate-wave-fast opacity-90" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,60 C250,90 450,10 700,60 C950,110 1150,30 1400,60 L1400,100 L0,100 Z" fill="currentColor" />
          </svg>
        </motion.div>
      </div>

      {/* Background backing for contrast */}
      <div className="absolute inset-0 z-0 bg-primary/5 dark:bg-primary/10 transition-colors duration-300" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 tracking-wide">
        {children}
      </span>
    </motion.button>
  );
};
