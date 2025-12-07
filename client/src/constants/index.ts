import { Home, FolderKanban, Code2, Mail } from "lucide-react";

// todo: remove mock functionality - replace with real data
export const navItems = [
  { name: "Home", link: "#home", icon: Home },
  { name: "Projects", link: "#projects", icon: FolderKanban },
  { name: "Expertise", link: "#expertise", icon: Code2 },
  { name: "Contact", link: "#contact", icon: Mail },
];

// todo: remove mock functionality - replace with real projects
export const projects = [
  {
    id: 1,
    title: "Velocity",
    description: "A real-time collaboration platform for distributed teams. Built with a focus on speed and simplicity.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    link: "#",
  },
  {
    id: 2,
    title: "Pulse Analytics",
    description: "Privacy-first analytics dashboard that respects user data while providing actionable insights.",
    tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
    link: "#",
  },
  {
    id: 3,
    title: "Forge CLI",
    description: "Developer toolkit for scaffolding modern web applications with best practices baked in.",
    tags: ["Rust", "CLI", "Templates"],
    link: "#",
  },
  {
    id: 4,
    title: "Nimbus",
    description: "Minimal cloud storage solution with end-to-end encryption and seamless sync across devices.",
    tags: ["Go", "React Native", "AWS"],
    link: "#",
  },
];


