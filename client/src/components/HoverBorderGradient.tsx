import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverBorderGradientProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: React.ElementType;
}

export function HoverBorderGradient({
  children,
  className,
  containerClassName,
  as: Component = "div",
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn("relative group", containerClassName)}
    >
      <motion.div
        className="absolute -inset-px rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: hovered
            ? `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(120, 119, 198, 0.15), transparent 40%)`
            : "none",
        }}
      />
      <div
        className={cn(
          "absolute -inset-px rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-gradient-to-r from-violet-600/20 via-purple-500/20 to-violet-600/20"
        )}
        style={{
          maskImage: `radial-gradient(200px circle at ${position.x}px ${position.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(200px circle at ${position.x}px ${position.y}px, black, transparent)`,
        }}
      />
      <Component
        className={cn(
          "relative bg-card border border-border/50 rounded-md",
          "transition-colors duration-300",
          "group-hover:border-border",
          className
        )}
      >
        {children}
      </Component>
    </div>
  );
}
