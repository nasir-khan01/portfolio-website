import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}

export function IconButton({ icon, label, onClick, className = "" }: IconButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-xl",
        "hover:bg-[var(--icon-hover-bg)] transition-colors duration-200",
        "group cursor-pointer",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-14 h-14 flex items-center justify-center text-[var(--icon-color)] group-hover:text-[var(--icon-hover-color)] transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium text-[var(--icon-label-color)] group-hover:text-[var(--icon-label-hover-color)] transition-colors">
        {label}
      </span>
    </motion.button>
  );
}
