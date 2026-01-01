import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const AbstractOrb = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics
  const springConfig = { damping: 15, stiffness: 150, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Chaotic transforms - movement constrained slightly to keep action inside
  const blob1X = useTransform(smoothX, (value) => value * 0.4);
  const blob1Y = useTransform(smoothY, (value) => value * 0.4);
  
  const blob2X = useTransform(smoothX, (value) => value * -0.3);
  const blob2Y = useTransform(smoothY, (value) => value * -0.3);
  
  const blob3X = useTransform(smoothX, (value) => value * 0.3);
  const blob3Y = useTransform(smoothY, (value) => value * -0.2);

  const blob4X = useTransform(smoothX, (value) => value * -0.4);
  const blob4Y = useTransform(smoothY, (value) => value * 0.3);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full max-w-md aspect-square mx-auto flex items-center justify-center cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {/* SVG Filters */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="orb-liquid-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -10"
              result="liquid"
            />
            <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Main Glass/Orb Container - Masked & Contained */}
      <div 
        className={cn(
          "relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full overflow-hidden transition-all duration-1000 ease-out",
          isHovered ? "bg-black ring-1 ring-white/10 shadow-2xl" : "bg-black/20 ring-0 shadow-none"
        )}
      >
        
        {/* Inner Liquid Layer - Filter Applied Here */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ filter: "url(#orb-liquid-filter)" }}
        >
          {/* Base Dark Fluid Background */}
          <motion.div 
            className="absolute inset-0 bg-black" 
            animate={{ opacity: isHovered ? 0.9 : 0.2 }}
            transition={{ duration: 1 }}
          />

          {/* NEON BLOBS */}
          
          {/* Neon Cyan */}
          <motion.div
            style={{ x: blob1X, y: blob1Y }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400 rounded-full blur-xl mix-blend-screen"
            animate={{
              scale: isHovered ? 1.6 : 0.8,
              opacity: isHovered ? 1 : 0.4,
              rotate: isHovered ? 90 : [0, 90, 180, 270, 360],
              x: isHovered ? 0 : [0, 20, 0, -20, 0], 
              y: isHovered ? 0 : [0, -20, 0, 20, 0],
            }}
            transition={{ 
              duration: isHovered ? 0.6 : 10, 
              ease: isHovered ? "easeOut" : "linear",
              repeat: isHovered ? 0 : Infinity,
            }}
          />

          {/* Neon Pink/Fuchsia */}
          <motion.div
            style={{ x: blob2X, y: blob2Y }}
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-fuchsia-500 rounded-full blur-xl mix-blend-screen"
            animate={{
              scale: isHovered ? 1.5 : 0.9,
              opacity: isHovered ? 1 : 0.3,
              rotate: isHovered ? -45 : [360, 270, 180, 90, 0],
              x: isHovered ? 0 : [0, -30, 0, 30, 0],
              y: isHovered ? 0 : [0, 20, -20, 0],
            }}
            transition={{ 
              duration: isHovered ? 0.7 : 12, 
              ease: isHovered ? "easeOut" : "linear",
              delay: isHovered ? 0.05 : 0,
              repeat: isHovered ? 0 : Infinity, 
            }}
          />

          {/* Neon Lime/Green */}
          <motion.div
            style={{ x: blob3X, y: blob3Y }}
            className="absolute top-1/4 right-1/4 w-28 h-28 bg-lime-400 rounded-full blur-xl mix-blend-screen"
            animate={{
              scale: isHovered ? 1.4 : 0.7,
              opacity: isHovered ? 1 : 0.3,
              rotate: isHovered ? 135 : [0, -90, -180, -270, -360],
              x: isHovered ? 0 : [0, 25, 0, -25, 0],
              y: isHovered ? 0 : [0, -15, 15, 0],
            }}
            transition={{ 
              duration: isHovered ? 0.8 : 15, 
              ease: isHovered ? "easeOut" : "linear",
              delay: isHovered ? 0.1 : 0,
              repeat: isHovered ? 0 : Infinity,
            }}
          />

          {/* Neon Violet */}
          <motion.div
            style={{ x: blob4X, y: blob4Y }}
            className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-violet-500 rounded-full blur-xl mix-blend-screen"
            animate={{
              scale: isHovered ? 1.7 : 0.8,
              opacity: isHovered ? 1 : 0.4,
              rotate: isHovered ? -90 : [360, 180, 0],
              x: isHovered ? 0 : [0, -20, 20, 0],
              y: isHovered ? 0 : [0, 30, -30, 0],
            }}
            transition={{ 
              duration: isHovered ? 0.6 : 14, 
              ease: isHovered ? "easeOut" : "linear",
              delay: isHovered ? 0.05 : 0,
              repeat: isHovered ? 0 : Infinity,
            }}
          />
        </div>

        {/* Glass Reflections / Overlays - Inside the container */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-full" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none rounded-full" />
        
        {/* Noise Texture */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
          style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }} 
        />
      </div>

      {/* External Glow (Optional) - adds atmosphere without "splashing" */}
      <motion.div
        className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl z-[-1]"
        animate={{
          scale: isHovered ? 1.2 : 0.8,
          opacity: isHovered ? 0.2 : 0,
        }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
};
