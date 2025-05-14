
import React, { useEffect } from 'react';
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import JourneySection from "@/components/JourneySection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import NowSection from "@/components/NowSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  // Update page title
  useEffect(() => {
    document.title = "Jack | CS Student + Builder";
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <JourneySection />
        <ProjectsSection />
        <SkillsSection />
        <NowSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
