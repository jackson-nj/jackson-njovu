
import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { useInView } from "../hooks/use-in-view";

const NowSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  const statusItems = [
    { emoji: "📍", label: "Now", value: "Lusaka" },
    { emoji: "🎯", label: "Goal", value: "Build micro-tools that solve real problems" },
    { emoji: "📘", label: "Learning", value: "Development for businesses" },
    { emoji: "⚙️", label: "Building", value: "Internal Instay dashboard" },
    { emoji: "🧠", label: "Reading", value: "\"Designing Data-Intensive Applications\"" },
  ];

  return (
    <section 
      id="now" 
      ref={sectionRef}
      className={cn(
        "section-padding py-24 bg-gradient-to-t from-background to-muted/20 section-transition",
        isInView && "in-view"
      )}
    >
      <div className="container max-w-5xl">
        <h2 className={cn(
          "text-3xl md:text-5xl font-bold tracking-tight mb-12 transition-all duration-500 relative",
          isInView ? "mask-reveal" : ""
        )}>
          <span className="text-primary glow-text">Now</span>
        </h2>
        
        <div className="glass-panel p-8 max-w-2xl mx-auto hover:border-primary/20 hover:shadow-[0_0_30px_rgba(0,245,255,0.1)] transition-all duration-500">
          <ul className="space-y-6 font-mono">
            {statusItems.map((item, index) => (
              <li 
                key={index}
                className={cn(
                  "transition-all duration-500 flex items-start transform",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <span className="mr-4 text-lg">{item.emoji}</span>
                <div>
                  <span className="text-foreground/60 mr-2">{item.label}:</span>
                  <span className="text-foreground">{item.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-1/4 h-1/4 bg-primary/5 blur-3xl rounded-full opacity-20"></div>
      <div className="absolute bottom-1/4 right-0 w-1/3 h-1/3 bg-accent/5 blur-3xl rounded-full opacity-20"></div>
    </section>
  );
};

export default NowSection;
