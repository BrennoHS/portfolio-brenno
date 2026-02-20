import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TimelineSection from "@/components/TimelineSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import BackToTopButton from "@/components/BackToTopButton";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-clip">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:ring-2 focus:ring-primary/70"
      >
        Pular para o conteúdo
      </a>
      <CursorGlow />
      <ScrollProgressBar />
      <div className="relative z-10">
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <TimelineSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </div>
      <BackToTopButton />
    </div>
  );
};

export default Index;
