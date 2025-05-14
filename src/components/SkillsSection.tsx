
import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { useInView } from "../hooks/use-in-view";
import { Javascript, Python, Git, Supabase, Figma, Database, Networking, UserIcon, Backend } from "lucide-react";

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
                     hover:border-primary/40 transition-colors bg-muted/30 hover:bg-muted/50"
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
        { name: "JavaScript", icon: Javascript },
        { name: "Python", icon: Python },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "Git", icon: Git },
        { name: "Supabase", icon: Supabase },
        { name: "Figma", icon: Figma },
      ],
    },
    {
      title: "Concepts",
      skills: [
        { name: "Databases", icon: Database },
        { name: "Networking", icon: Networking },
        { name: "OS", icon: UserIcon },
      ],
    },
    {
      title: "Learning Now",
      skills: [
        { name: "AI", icon: UserIcon },
        { name: "Backend", icon: Backend },
      ],
    },
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="section-padding py-24 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container max-w-5xl">
        <h2 className={cn(
          "text-3xl md:text-4xl font-bold tracking-tight mb-12 transition-all duration-500",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        )}>
          My <span className="text-primary">Skills</span>
        </h2>
        
        <div className="space-y-12">
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
    </section>
  );
};

export default SkillsSection;
