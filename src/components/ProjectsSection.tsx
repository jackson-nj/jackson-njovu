
import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { useInView } from "../hooks/use-in-view";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  delay: number;
  isInView: boolean;
  imageSrc?: string;
}

const ProjectCard = ({ title, description, tags, delay, isInView, imageSrc }: ProjectCardProps) => (
  <Card className={cn(
    "bg-card border-white/5 hover:border-primary/50 transition-all duration-300 h-full flex flex-col",
    "hover:shadow-[0_0_25px_rgba(99,102,241,0.1)] group",
    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
  )}
    style={{ transitionDelay: `${150 * delay}ms` }}
  >
    {imageSrc && (
      <div className="relative overflow-hidden">
        <AspectRatio ratio={16/9} className="bg-muted border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <div 
            className="w-full h-full bg-center bg-cover group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url(${imageSrc})` }}
          ></div>
        </AspectRatio>
      </div>
    )}
    <CardHeader>
      <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center">
        {title}
        <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </CardTitle>
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
      imageSrc: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "CLI Tools",
      description: "Collection of Python and Bash automation scripts for developer productivity and system management.",
      tags: ["Python", "Bash", "Automation"],
      imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Landing Pages",
      description: "Quick-deploy MVP templates using Supabase for auth and database, with TailwindCSS for styling.",
      tags: ["Supabase", "TailwindCSS", "Vite"],
      imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "AI Notes",
      description: "Personal knowledge management system with AI-powered search and organization features.",
      tags: ["TypeScript", "AI", "Local-first"],
      imageSrc: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "E-learning Platform",
      description: "Proof-of-concept for interactive learning experiences with progress tracking and community features.",
      tags: ["Next.js", "Firebase", "TailwindCSS"],
      imageSrc: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Data Visualizer",
      description: "Interactive data visualization tool for exploring and analyzing complex datasets.",
      tags: ["D3.js", "React", "TypeScript"],
      imageSrc: "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&q=80"
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
              imageSrc={project.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
