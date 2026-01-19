import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GrowingNetwork } from "@/components/SubtleBackground";
import portfolioConfig from "@/data/portfolio.config.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#4ade80]/20 relative">
      {/* Growing Network Background Effect */}
      <GrowingNetwork />

      {/* Navigation */}
      <nav className="max-w-2xl mx-auto px-6 py-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar Image */}
            <img 
              src="/avatar.png" 
              alt="Nasir Khan"
              className="w-9 h-9 rounded-full object-cover border-2 border-[#4ade80]/30"
            />
            <span className="font-medium text-foreground">Nasir Khan</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-5 text-sm text-muted-foreground">
              <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
              <a href="#about" className="hover:text-foreground transition-colors">About</a>
              <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12 relative z-10">
        {/* Hero */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-3xl font-bold mb-4 text-foreground">{portfolioConfig.name}</h1>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Hey! I'm Nasir, a passionate full-stack developer focused on building 
            scalable backend systems and modern web applications.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Working with{" "}
            <InlineLink href="#">Node.js</InlineLink>,{" "}
            <InlineLink href="#">TypeScript</InlineLink>,{" "}
            <InlineLink href="#">React</InlineLink>,{" "}
            <InlineLink href="#">Next.js</InlineLink>, and{" "}
            <InlineLink href="#">PostgreSQL</InlineLink>.
            I enjoy turning complex problems into elegant solutions.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Find my{" "}
            <InlineLink href="#projects">projects below</InlineLink>{" "}
            or check out my{" "}
            <InlineLink href={portfolioConfig.resumeUrl} external>resume</InlineLink>.
          </p>
        </motion.section>

        {/* Projects */}
        <motion.section 
          id="projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-foreground">
            <span className="text-[#4ade80]">#</span> Projects
          </h2>
          <div className="space-y-4">
            {portfolioConfig.projects.map((project) => (
              <ProjectItem 
                key={project.id}
                title={project.title}
                description={project.description}
                link={project.link}
                tags={project.tags}
              />
            ))}
          </div>
        </motion.section>

        {/* Expertise */}
        <motion.section 
          id="about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-foreground">
            <span className="text-[#4ade80]">#</span> Expertise
          </h2>
          <div className="space-y-6 text-muted-foreground">
            {portfolioConfig.expertise.map((item, idx) => (
              <div key={idx}>
                <h3 className="text-foreground font-medium mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed mb-2">
                  {item.keyFeatures[0]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs px-2 py-1 bg-secondary rounded text-muted-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section 
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-foreground">
            <span className="text-[#4ade80]">#</span> Find me on
          </h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <InlineLink href={portfolioConfig.socials.github} external>GitHub</InlineLink>
            <InlineLink href={portfolioConfig.socials.linkedin} external>LinkedIn</InlineLink>
            <InlineLink href={portfolioConfig.socials.twitter} external>Twitter</InlineLink>
            <InlineLink href={`mailto:${portfolioConfig.email}`}>Email</InlineLink>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="text-xs text-muted-foreground border-t border-border pt-8 mt-16">
          <p>© {new Date().getFullYear()} {portfolioConfig.name}</p>
        </footer>
      </main>
    </div>
  );
}

// Inline link component with subtle hover
function InlineLink({ 
  href, 
  children, 
  external = false 
}: { 
  href: string; 
  children: React.ReactNode; 
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-[#4ade80] hover:underline underline-offset-4 decoration-[#4ade80]/50 transition-all"
    >
      {children}
    </a>
  );
}

// Project item component
function ProjectItem({ 
  title, 
  description, 
  link, 
  tags 
}: { 
  title: string; 
  description: string; 
  link: string; 
  tags: string[];
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="flex items-start justify-between gap-4 py-3 -mx-3 px-3 rounded-lg hover:bg-secondary/50 transition-colors">
        <div>
          <h3 className="text-foreground font-medium group-hover:text-[#4ade80] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-muted-foreground/70">
                #{tag.toLowerCase().replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        </div>
        <span className="text-muted-foreground group-hover:text-[#4ade80] transition-colors shrink-0">
          →
        </span>
      </div>
    </a>
  );
}
