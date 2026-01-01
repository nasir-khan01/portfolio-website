import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const INVARIANTS = [
  {
    id: "idempotency",
    label: "IDEMPOTENCY",
    shorthand: "IDEM",
    desc: "Safe retries on network failure.",
  },
  {
    id: "isolation",
    label: "ISOLATION",
    shorthand: "ISOL",
    desc: "Failures contained, never cascaded.",
  },
  {
    id: "immutability",
    label: "IMMUTABILITY",
    shorthand: "IMMU",
    desc: "Predictable state, zero side-effects.",
  },
];

export const ProductionInvariants = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[400px] mx-auto grid gap-4">
      {INVARIANTS.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
          onMouseEnter={() => setHovered(item.id)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "relative group cursor-default overflow-hidden",
            "border border-border/40 bg-background/50 backdrop-blur-sm",
            "transition-all duration-500 ease-out"
          )}
          style={{
            borderColor: hovered === item.id ? "hsl(var(--primary))" : undefined,
          }}
        >
          {/* Active indicator bar */}
          <div 
            className={cn(
              "absolute left-0 top-0 bottom-0 w-1 bg-primary/20 transition-all duration-300",
               hovered === item.id ? "w-1.5 bg-primary" : "w-1"
            )} 
          />

          <div className="p-4 sm:p-5 flex flex-col justify-center min-h-[80px]">
            <div className="flex items-center justify-between pointer-events-none">
              <h3 className={cn(
                "text-sm sm:text-base font-mono tracking-widest font-semibold transition-colors duration-300",
                hovered === item.id ? "text-foreground" : "text-muted-foreground"
              )}>
                {item.label}
              </h3>
              
              {/* Minimal "Status" Icon */}
              <div className={cn(
                 "w-2 h-2 rounded-full transition-all duration-500",
                 hovered === item.id 
                  ? "bg-primary shadow-[0_0_8px_hsl(var(--primary))]" 
                  : "bg-muted-foreground/20"
              )} />
            </div>

            {/* Description Reveal */}
            <div className="relative h-6 mt-1 overflow-visible">
               <span 
                className={cn(
                  "absolute top-0 left-0 text-xs sm:text-sm text-muted-foreground/50 transition-all duration-500 transform origin-left",
                  hovered === item.id 
                    ? "opacity-0 translate-y-2 scale-95" 
                    : "opacity-100 translate-y-0 scale-100"
                )}
               >
                 0{index + 1}
               </span>
               
               <span 
                className={cn(
                  "absolute top-0 left-0 text-sm font-medium text-primary/90 transition-all duration-300 transform",
                  hovered === item.id 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 -translate-y-2"
                )}
               >
                 {item.desc}
               </span>
            </div>
          </div>

          {/* Background scanline effect on hover */}
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 pointer-events-none transition-opacity duration-500",
              hovered === item.id && "opacity-100"
            )}
          />
        </motion.div>
      ))}
    </div>
  );
};
