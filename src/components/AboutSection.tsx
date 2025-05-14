
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { useInView } from "../hooks/use-in-view";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section-padding min-h-screen flex items-center relative"
    >
      <div className="container max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">About <span className="text-primary">Me</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className={cn(
            "col-span-1 md:col-span-4 transition-all duration-700 ease-out",
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <div className="aspect-square relative overflow-hidden rounded-xl bg-gradient-to-br from-muted/60 to-muted/20 glass-panel p-1">
              {/* Profile image with better styling */}
              <Avatar className="w-full h-full rounded-lg">
                <AvatarImage src="/placeholder.svg" alt="Jack" className="object-cover" />
                <AvatarFallback className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 animate-glow flex items-center justify-center">
                  <div className="text-5xl font-bold text-primary">
                    J
                  </div>
                </AvatarFallback>
              </Avatar>
              
              {/* Decorative element */}
              <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-primary/10 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-accent/10 blur-xl"></div>
            </div>
            
            {/* Testimonial overlay */}
            <div className={cn(
              "mt-6 p-4 rounded-lg glass-panel relative transition-all duration-700 ease-out",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: '400ms' }}>
              <div className="text-sm italic text-foreground/80">
                "We increased our conversions by 200%+"
              </div>
              <div className="text-xs text-right mt-2 text-foreground/50">- Instay Team</div>
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
