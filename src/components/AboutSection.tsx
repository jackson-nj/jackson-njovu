import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { useInView } from "../hooks/use-in-view";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import myPhoto from './img/WhatsApp Image 2025-05-10 at 16.07.35_501bc0d8.jpg';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={cn(
        "section-padding min-h-screen flex items-center relative section-transition",
        isInView && "in-view"
      )}
    >
      <div className="container max-w-5xl">
        <h2
          className={cn(
            "text-3xl md:text-5xl font-bold tracking-tight mb-12 relative",
            isInView ? "glitch" : "",
            isInView ? "mask-reveal" : ""
          )}
          data-text="About Me"
        >
          About <span className="text-primary glow-text">Me</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className={cn(
            "col-span-1 md:col-span-4 transition-all duration-700 ease-out",
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <div className="aspect-square relative overflow-hidden rounded-xl glass-panel p-1 glow-border">
              {/* Profile image with better styling */}
              <Avatar className="w-full h-full rounded-lg">
                <AvatarImage src={myPhoto} alt="Jack" className="object-cover" />
                <AvatarFallback className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 animate-glow flex items-center justify-center">
                  <div className="text-5xl font-bold text-primary glow-text">
                    J
                  </div>
                </AvatarFallback>
              </Avatar>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-primary/10 blur-xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-accent/10 blur-xl animate-pulse"></div>
            </div>
            
            {/* Testimonial overlay */}
            <div className={cn(
              "mt-6 p-6 rounded-lg glass-panel relative transition-all duration-700 ease-out",
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
            <p className="text-lg text-foreground/90 leading-relaxed">
              I'm Jackson njovu, a Computer Science student and CSO at Instay Homes. I'm exploring system design, 
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
      
      {/* Background decorative elements */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-accent/5 blur-3xl"></div>
    </section>
  );
};

export default AboutSection;
