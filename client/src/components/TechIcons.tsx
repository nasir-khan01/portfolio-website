import React from 'react';
import { 
  SiNodedotjs, 
  SiGraphql, 
  SiPostgresql, 
  SiRedis, 
  SiNextdotjs, 
  SiTypescript, 
  SiReactquery, 
  SiDocker, 
  SiAwslambda, 
  SiGithubactions, 
  SiVercel,
  SiReact
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa"; // Fallback for Zustand (Store)

// Map specific tech names to their React Icon components
const iconMap: Record<string, React.ElementType> = {
  "Node.js": SiNodedotjs,
  "GraphQL": SiGraphql,
  "PostgreSQL": SiPostgresql,
  "Redis": SiRedis,
  "Next.js": SiNextdotjs,
  "Next.js 14": SiNextdotjs,
  "TypeScript": SiTypescript,
  "TanStack Query": SiReactquery, // Often associated with React Query icon
  "Zustand": FaDatabase, // Generic store icon as specific one might be missing
  "Docker": SiDocker,
  "AWS Lambda": SiAwslambda,
  "GitHub Actions": SiGithubactions,
  "Vercel": SiVercel,
  "React": SiReact
};

export function TechIcon({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  // Normalize name for fallback matching if needed
  const key = name.includes("Next.js") ? "Next.js" : name;
  const IconComponent = iconMap[key] || iconMap[name] || FaDatabase; // Default to DB/Generic if unknown

  return <IconComponent className={className} />;
}
