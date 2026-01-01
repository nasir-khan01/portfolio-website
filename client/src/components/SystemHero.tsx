import { motion } from "framer-motion";
import { ProductionInvariants } from "./ui/ProductionInvariants";

export const SystemHero = () => {
  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-background overflow-hidden selection:bg-primary/20">
      
      {/* Subtle Grid Background */}
       <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      <div className="w-full max-w-7xl mx-auto z-10 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* LEFT COLUMN: Identity & Manifesto */}
        <div className="flex flex-col items-start text-left">
          
          {/* Identity Tag */}
          <motion.div
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             className="mb-8 flex items-center gap-3"
          >
            <div className="relative flex items-center justify-center w-2 h-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </div>
            <span className="text-sm font-mono tracking-[0.2em] uppercase text-muted-foreground font-semibold">
              Nasir Khan
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
          >
            Precision engineering <br />
            for <span className="text-primary">complex</span> backend systems.
          </motion.h1>

          {/* Supporting Line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed font-light"
          >
            Turning ambiguity into stable, production-grade software.
          </motion.p>
        </div>

        {/* RIGHT COLUMN: Interactive Topology */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.4, duration: 0.8 }}
           className="relative flex justify-center items-center w-full min-h-[300px] lg:min-h-[500px]"
        >
          {/* Container for the graph to ensure it fits well */}
          <div className="w-full max-w-lg">
            <ProductionInvariants />
          </div>
        </motion.div>

      </div>

      {/* Functional Scroll Indicator */}
      <motion.button
         onClick={handleScrollToProjects}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1, duration: 1 }}
         className="absolute bottom-12 left-6 sm:left-12 lg:left-24 flex items-center gap-4 group cursor-pointer"
      >
        <div className="h-px w-12 bg-muted-foreground/40 group-hover:bg-primary transition-colors duration-300" />
        <span className="text-xs font-mono tracking-wider text-muted-foreground group-hover:text-primary transition-colors duration-300">
          REVIEW TECHNICAL CASE STUDIES
        </span>
      </motion.button>

    </section>
  );
};
