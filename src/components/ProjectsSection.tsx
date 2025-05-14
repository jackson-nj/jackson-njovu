
import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { useInView } from "../hooks/use-in-view";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  delay: number;
  isInView: boolean;
}

const ProjectCard = ({ title, description, tags, delay, isInView }: ProjectCardProps) => (
  <Card className={cn(
    "bg-card border-white/5 hover:border-primary/50 transition-all duration-300 h-full flex flex-col",
    "hover:shadow-[0_0_25px_rgba(99,102,241,0.1)] group",
    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
  )}
    style={{ transitionDelay: `${150 * delay}ms` }}
  >
    <CardHeader>
      <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-foreground/70">{description}</p>
    </CardContent>
    <CardFooter>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="outline" className="bg-muted text-foreground/80">
            {tag}
          </Badge>
        ))}
      </div>
    </CardFooter>
  </Card>
);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  const projects = [
    {
      title: "Instay Homes",
      description: "Student housing platform that streamlines property discovery and booking for college students.",
      tags: ["React", "Supabase", "TailwindCSS"],
    },
    {
      title: "CLI Tools",
      description: "Collection of Python and Bash automation scripts for developer productivity and system management.",
      tags: ["Python", "Bash", "Automation"],
    },
    {
      title: "Landing Pages",
      description: "Quick-deploy MVP templates using Supabase for auth and database, with TailwindCSS for styling.",
      tags: ["Supabase", "TailwindCSS", "Vite"],
    },
    {
      title: "AI Notes",
      description: "Personal knowledge management system with AI-powered search and organization features.",
      tags: ["TypeScript", "AI", "Local-first"],
    },
    {
      title: "E-learning Platform",
      description: "Proof-of-concept for interactive learning experiences with progress tracking and community features.",
      tags: ["Next.js", "Firebase", "TailwindCSS"],
    },
    {
      title: "Data Visualizer",
      description: "Interactive data visualization tool for exploring and analyzing complex datasets.",
      tags: ["D3.js", "React", "TypeScript"],
    },
  ];

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="section-padding py-24"
    >
      <div className="container max-w-5xl">
        <h2 className={cn(
          "text-3xl md:text-4xl font-bold tracking-tight mb-12 transition-all duration-500",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        )}>
          My <span className="text-primary">Projects</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
              delay={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
