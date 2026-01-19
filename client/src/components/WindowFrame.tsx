import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WindowFrameProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  showCloseButton?: boolean;
  isOpen?: boolean;
}

export function WindowFrame({ 
  title, 
  children, 
  onClose, 
  className = "",
  showCloseButton = true,
  isOpen = true,
}: WindowFrameProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "bg-[var(--window-body-bg)] rounded-xl shadow-2xl overflow-hidden",
        "border border-[var(--window-border)]",
        className
      )}
    >
      {/* Window Header */}
      <div className="bg-[var(--window-header-bg)] px-4 py-2.5 flex items-center justify-between">
        <span className="font-mono text-sm text-[var(--window-header-text)] tracking-wider">
          {title}
        </span>
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="font-mono text-sm text-[var(--window-header-text)] hover:text-white/80 transition-colors px-2"
            aria-label="Close window"
          >
            [x]
          </button>
        )}
      </div>
      
      {/* Window Body */}
      <div className="p-6 md:p-8">
        {children}
      </div>
    </motion.div>
  );
}
