
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { useInView } from "../hooks/use-in-view";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section-padding min-h-screen flex items-center"
    >
      <div className="container max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">About <span className="text-primary">Me</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className={cn(
            "col-span-1 md:col-span-4 transition-all duration-700 ease-out",
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <div className="aspect-square relative overflow-hidden rounded-xl bg-muted flex items-center justify-center">
              {/* Profile image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 animate-glow">
                <div className="text-4xl font-bold text-primary">
                  J
                </div>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "col-span-1 md:col-span-8 space-y-6 transition-all duration-700 ease-out delay-300",
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <p className="text-lg text-foreground/80 leading-relaxed">
              I'm Jack, a Computer Science student and CSO at Instay Homes. I'm exploring system design, 
              databases, AI, and automation. My mission is to build tech that matters — from housing 
              to human potential.
            </p>
            
            <div className="w-20 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
            
            <p className="text-base text-foreground/70 leading-relaxed">
              I believe in building tools that solve real problems. Currently, I'm focused on leveraging 
              technology to improve student housing access and working on personal projects that explore 
              the intersection of AI and human-centered design.
            </p>
            
            <p className="text-base text-foreground/70 leading-relaxed">
              When I'm not coding, you might find me exploring new tech, reading about system design, 
              or thinking about how to make technology more accessible and useful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
