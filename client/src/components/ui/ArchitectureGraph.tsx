import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Graph Topology
// Level 0: Client
// Level 1: Gateway
// Level 2: Services
// Level 3: Database

const NODES = [
  { id: "client", label: "Client", x: 50, y: 10, type: "source" },
  { id: "gateway", label: "API Gateway", x: 50, y: 40, type: "infra" },
  { id: "auth", label: "Auth", x: 20, y: 70, type: "service" },
  { id: "core", label: "Core API", x: 50, y: 70, type: "service" },
  { id: "payments", label: "Payments", x: 80, y: 70, type: "service" },
  { id: "db", label: "Primary DB", x: 50, y: 95, type: "data" },
];

const EDGES = [
  { from: "client", to: "gateway" },
  { from: "gateway", to: "auth" },
  { from: "gateway", to: "core" },
  { from: "gateway", to: "payments" },
  { from: "auth", to: "db" },
  { from: "core", to: "db" },
  { from: "payments", to: "db" },
];

export const ArchitectureGraph = () => {
  const [activePath, setActivePath] = useState<string[]>([]);

  // Function to determine active nodes based on hover
  const handleNodeHover = (nodeId: string | null) => {
    if (!nodeId) {
      setActivePath([]);
      return;
    }

    // Simple path logic for visual effect
    // If hovering a service, highlight path from client -> gateway -> service -> db
    const paths: Record<string, string[]> = {
      client: ["client", "gateway", "auth", "core", "payments"],
      gateway: ["client", "gateway", "auth", "core", "payments"],
      auth: ["client", "gateway", "auth", "db"],
      core: ["client", "gateway", "core", "db"],
      payments: ["client", "gateway", "payments", "db"],
      db: ["core", "auth", "payments", "db"],
    };

    setActivePath(paths[nodeId] || []);
  };

  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto p-4 select-none" onMouseLeave={() => handleNodeHover(null)}>
      {/* SVG Container for Edges */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        {EDGES.map((edge) => {
          const start = NODES.find((n) => n.id === edge.from);
          const end = NODES.find((n) => n.id === edge.to);
          if (!start || !end) return null;

          const isActive = activePath.includes(edge.from) && activePath.includes(edge.to);

          return (
            <motion.line
              key={`${edge.from}-${edge.to}`}
              x1={`${start.x}%`}
              y1={`${start.y}%`}
              x2={`${end.x}%`}
              y2={`${end.y}%`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: isActive ? 0.8 : 0.1,
                stroke: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" 
              }}
              strokeWidth={isActive ? 2 : 1}
              transition={{ duration: 0.4 }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {NODES.map((node) => {
        const isActive = activePath.includes(node.id);

        return (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
            onMouseEnter={() => handleNodeHover(node.id)}
          >
            <div
              className={cn(
                "relative flex items-center justify-center transition-all duration-300",
                "bg-background border-2 rounded-lg px-3 py-1.5",
                isActive 
                  ? "border-primary text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]" 
                  : "border-border text-muted-foreground hover:border-primary/50"
              )}
            >
              <div className={cn(
                "absolute inset-0 bg-primary/5 rounded-lg opacity-0 transition-opacity",
                isActive && "opacity-100"
              )} />
              
              {/* Node Icon/Shape */}
              <div className={cn(
                "w-1.5 h-1.5 rounded-full mr-2 transition-colors",
                isActive ? "bg-primary" : "bg-muted-foreground/30"
              )} />
              
              <span className="text-xs font-mono font-medium tracking-wide">
                {node.label}
              </span>
            </div>
          </motion.div>
        );
      })}
      
      {/* Background Grid Hint */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at center, hsl(var(--foreground)) 1px, transparent 1px)',
             backgroundSize: '20px 20px' 
           }} 
      />
    </div>
  );
};
