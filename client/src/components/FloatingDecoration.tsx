import { motion } from "framer-motion";

interface FloatingDecorationProps {
  children: React.ReactNode;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export function FloatingDecoration({ children, position, className = "" }: FloatingDecorationProps) {
  const positionClasses = {
    "top-left": "top-8 left-8",
    "top-right": "top-8 right-8",
    "bottom-left": "bottom-24 left-8",
    "bottom-right": "bottom-24 right-8",
  };

  return (
    <motion.div
      className={`fixed ${positionClasses[position]} z-10 pointer-events-none ${className}`}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
