import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}

export function FloatingNav({ navItems, className }: FloatingNavProps) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  // Handle visibility on scroll
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // Always show near the top
        setVisible(true);
      } else {
        if (direction < 0) {
          // Scrolling up
          setVisible(true);
        } else {
          // Scrolling down
          setVisible(false);
        }
      }
    }
  });

  // Handle active section tracking with IntersectionObserver
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-20% 0px -35% 0px", // Only trigger when section is well within view
      threshold: 0.1,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    // Observe all sections tracked in navItems
    navItems.forEach((item) => {
      const sectionId = item.link.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [navItems]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    e.preventDefault();
    const targetId = link.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: 100 }}
        animate={{ y: visible ? 0 : 100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed bottom-6 left-[60%] -translate-x-1/2 z-[100]",
          "flex items-center gap-1 px-2 py-2",
          "rounded-full border border-border/50",
          "bg-card/80 backdrop-blur-xl",
          className
        )}
        data-testid="nav-floating"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const targetId = item.link.replace("#", "");
          const isActive = activeSection === targetId;

          return (
            <a
              key={item.name}
              href={item.link}
              onClick={(e) => handleNavClick(e, item.link)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 rounded-full",
                "text-sm font-medium transition-all duration-200",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              data-testid={`nav-link-${item.name.toLowerCase()}`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-secondary rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{item.name}</span>
            </a>
          );
        })}
      </motion.nav>
    </AnimatePresence>
  );
}
