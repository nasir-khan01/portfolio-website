import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, FileText } from "lucide-react";
import { FloatingNav } from "@/components/FloatingNav";
import { CodeWindow } from "@/components/CodeWindow";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BentoGrid } from "@/components/BentoGrid";
import { Expertise } from "@/components/Expertise";
import { Section } from "@/components/Section";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { navItems } from "@/constants";
import portfolioConfig from "@/data/portfolio.config.json";
import type { Project } from "@/components/BentoGrid";

export default function Home() {
  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const resumeUrl = portfolioConfig.resumeUrl;
  const email = portfolioConfig.email;

  const handleDownloadResume = () => {
    window.open(resumeUrl, "_blank");
  };

  const name = portfolioConfig.name;
  const projects: Project[] = portfolioConfig.projects;
  const projectsTitle = portfolioConfig.projectsTitle || "Projects";
  const expertiseTitle = portfolioConfig.expertiseTitle || "My Expertise";
  const expertise = portfolioConfig.expertise || [];
  
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <FloatingNav navItems={navItems} />
      
      <div className="fixed top-4 left-4 z-50">
        <ThemeToggle />
      </div>

      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015]"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-20 dark:opacity-10"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 rounded-full opacity-15 dark:opacity-10"
            style={{
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              y: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <Badge 
                  variant="secondary" 
                  className="gap-2 px-3 py-1.5 text-xs font-medium"
                  data-testid="status-badge"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  Available for work
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]"
              >
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                  {name}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg"
              >
                A full-stack developer who loves crafting beautiful, 
                performant web experiences. I turn ideas into elegant code.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-3 mb-8"
              >
                <Button
                  onClick={handleScrollToContact}
                  className="gap-2"
                  data-testid="button-get-in-touch"
                >
                  <Mail className="w-4 h-4" />
                  Get in touch
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownloadResume}
                  className="gap-2"
                  data-testid="button-download-resume"
                >
                  <FileText className="w-4 h-4" />
                  Download Resume
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-1"
              >
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors p-2"
                  data-testid="link-github-hero"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors p-2"
                  data-testid="link-twitter-hero"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors p-2"
                  data-testid="link-linkedin-hero"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </motion.div>
            </div>

            <div className="w-full flex justify-center lg:justify-end perspective-1000">
              <CodeWindow className="w-full lg:max-w-xl xl:max-w-2xl transform transition-transform hover:scale-[1.01] duration-500" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="fixed bottom-8 right-8 z-40 hidden md:block"
          >
            <button
              onClick={handleScrollToProjects}
              className="group flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-scroll-projects"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-2 group-hover:translate-y-0">
                Explore
              </span>
              <div className="relative w-[22px] h-[36px] rounded-full border-2 border-muted-foreground/30 group-hover:border-foreground/50 transition-colors flex justify-center p-1">
                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    opacity: [1, 0, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="w-1 h-1.5 rounded-full bg-foreground"
                />
              </div>
            </button>
          </motion.div>
        </div>
      </section>

      <Section id="projects" title={projectsTitle}>
        <BentoGrid projects={projects} />
      </Section>

      <Section id="expertise" title={expertiseTitle}>
        <Expertise items={expertise} />
      </Section>

      <Section id="contact" title="Get in Touch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
            Have a project in mind or just want to chat? I'm always open to 
            discussing new opportunities and ideas.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              asChild
              className="gap-2"
              data-testid="button-email-contact"
            >
              <a href={`mailto:${email}`}>
                <Mail className="w-4 h-4" />
                {email}
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={handleDownloadResume}
              className="gap-2"
              data-testid="button-resume-contact"
            >
              <FileText className="w-4 h-4" />
              Download Resume
            </Button>
          </div>
        </motion.div>
      </Section>

      <Footer />
    </div>
  );
}
