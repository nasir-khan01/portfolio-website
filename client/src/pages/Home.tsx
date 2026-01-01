import { motion } from "framer-motion";
import { FloatingNav } from "@/components/FloatingNav";
import { SystemHero } from "@/components/SystemHero";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Expertise } from "@/components/Expertise";
import { Section } from "@/components/Section";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { navItems } from "@/constants";
import portfolioConfig from "@/data/portfolio.config.json";
import type { Project } from "@/components/ProjectShowcase";

export default function Home() {

  
  // handleScrollToContact unused? wait, used in SystemHero? No, SystemHero has its own. 
  // But Home.tsx doesn't pass it.
  // Actually SystemHero has its own handleScrollToContact.
  // So we can remove these handlers from Home.tsx if they are not passed to anything.
  // Wait, I see `handleScrollToProjects` in Home.tsx. Is it used?
  // Previous Hero used it. SystemHero does NOT take props.
  // So removing them is correct.

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

      <SystemHero />

      <Section id="projects" title={projectsTitle} containerClassName="max-w-5xl">
        <ProjectShowcase projects={projects} />
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
          <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Have a project in mind or just want to chat? Fill out the form below 
            and I'll get back to you as soon as possible.
          </p>
          <ContactForm />
        </motion.div>
      </Section>

      <Footer />
    </div>
  );
}
