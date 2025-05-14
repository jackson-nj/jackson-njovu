
import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { useInView } from "../hooks/use-in-view";
import { Code, FileCode, GitBranch, Database, Network, MonitorSmartphone, BrainCircuit, Code2, Laptop } from "lucide-react";

interface SkillCategoryProps {
  title: string;
  skills: Array<{
    name: string;
    icon: React.ElementType;
  }>;
  delay: number;
  isInView: boolean;
}

const SkillCategory = ({ title, skills, delay, isInView }: SkillCategoryProps) => (
  <div className={cn(
    "transition-all duration-700", 
    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  )}
    style={{ transitionDelay: `${delay * 150}ms` }}
  >
    <h3 className="text-xl font-medium mb-4">{title}</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {skills.map((skill, index) => {
        const Icon = skill.icon;
        return (
          <div 
            key={index} 
            className="flex flex-col items-center p-4 rounded-lg border border-white/10 
                     hover:border-primary/40 transition-all duration-500 bg-muted/30 hover:bg-muted/50
                     transform hover:scale-105 hover:shadow-[0_0_15px_rgba(0,245,255,0.15)]"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <Icon className="h-8 w-8 mb-2 text-primary" />
            <span className="text-sm text-foreground/80">{skill.name}</span>
          </div>
        );
      })}
    </div>
  </div>
);

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "JavaScript", icon: Code },
        { name: "Python", icon: FileCode },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "Git", icon: GitBranch },
        { name: "Databases", icon: Database },
        { name: "Figma", icon: Code2 },
      ],
    },
    {
      title: "Concepts",
      skills: [
        { name: "Databases", icon: Database },
        { name: "Networking", icon: Network },
        { name: "OS", icon: Laptop },
      ],
    },
    {
      title: "Learning Now",
      skills: [
        { name: "AI", icon: BrainCircuit },
        { name: "Backend", icon: MonitorSmartphone },
      ],
    },
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className={cn(
        "section-padding py-24 bg-gradient-to-b from-background to-muted/20 section-transition",
        isInView && "in-view"
      )}
    >
      <div className="container max-w-5xl">
        <h2 className={cn(
          "text-3xl md:text-5xl font-bold tracking-tight mb-12 transition-all duration-500 relative",
          isInView ? "mask-reveal" : ""
        )}>
          My <span className="text-primary glow-text">Skills</span>
        </h2>
        
        <div className="space-y-16">
          {skillCategories.map((category, index) => (
            <SkillCategory 
              key={category.title}
              title={category.title}
              skills={category.skills}
              delay={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-1/3 right-0 w-1/4 h-1/4 bg-primary/5 blur-3xl rounded-full opacity-20"></div>
      <div className="absolute bottom-1/3 left-0 w-1/3 h-1/3 bg-accent/5 blur-3xl rounded-full opacity-20"></div>
    </section>
  );
};

export default SkillsSection;
