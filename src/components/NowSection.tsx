
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
      className="section-padding py-24 bg-gradient-to-t from-background to-muted/20"
    >
      <div className="container max-w-5xl">
        <h2 className={cn(
          "text-3xl md:text-4xl font-bold tracking-tight mb-12 transition-all duration-500",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        )}>
          <span className="text-primary">Now</span>
        </h2>
        
        <div className="glass-panel p-8 max-w-2xl mx-auto">
          <ul className="space-y-6 font-mono">
            {statusItems.map((item, index) => (
              <li 
                key={index}
                className={cn(
                  "transition-all duration-500 flex items-start",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
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
    </section>
  );
};

export default NowSection;
