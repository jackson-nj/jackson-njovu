
import React, { useEffect, useRef, useState } from 'react';
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
  
  // Track active section for potential animations
  const [activeSection, setActiveSection] = useState('home');
  const sections = ['home', 'about', 'journey', 'projects', 'skills', 'now', 'contact'];
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300; // Offset to trigger earlier
      
      const activeSectionId = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const top = element.offsetTop;
        const height = element.offsetHeight;
        return scrollPosition >= top && scrollPosition < top + height;
      });
      
      if (activeSectionId && activeSectionId !== activeSection) {
        setActiveSection(activeSectionId);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      <NavBar />
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <JourneySection />
        <ProjectsSection />
        <SkillsSection />
        <NowSection />
        <ContactSection />
        
        {/* Scroll position indicator */}
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
          <div className="flex flex-col items-center space-y-6">
            {sections.map(section => (
              <a 
                key={section} 
                href={`#${section}`}
                className={cn(
                  "w-3 h-3 rounded-full border border-white/30 transition-all duration-300",
                  activeSection === section ? "bg-primary scale-125 border-primary" : "bg-transparent hover:border-primary/50"
                )}
                aria-label={`Go to ${section} section`}
              />
            ))}
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
