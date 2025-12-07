import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, title, children, className, containerClassName }: SectionProps & { containerClassName?: string }) {
  return (
    <section
      id={id}
      className={cn("py-10 sm:py-16 md:py-20", className)}
      data-testid={`section-${id}`}
    >
      <div className={cn("max-w-2xl mx-auto px-5 sm:px-6", containerClassName)}>
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10 sm:mb-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {title}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
