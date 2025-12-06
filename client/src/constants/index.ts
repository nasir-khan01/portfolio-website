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

// todo: remove mock functionality - replace with real timeline
export const timeline = [
  {
    year: "2024",
    title: "Joined Acme Corp as Senior Engineer",
    description: "Leading the frontend architecture team and mentoring junior developers on React best practices.",
  },
  {
    year: "2023",
    title: "Launched Velocity",
    description: "Built and shipped a real-time collaboration tool that grew to 10k+ active users in the first month.",
  },
  {
    year: "2022",
    title: "Open Source Contributions",
    description: "Became a core contributor to several popular open source projects in the React ecosystem.",
  },
  {
    year: "2021",
    title: "Started Freelancing",
    description: "Worked with startups and agencies to build MVPs and scale their engineering teams.",
  },
  {
    year: "2020",
    title: "First Developer Role",
    description: "Joined a seed-stage startup as a full-stack developer, wearing many hats and learning fast.",
  },
];
