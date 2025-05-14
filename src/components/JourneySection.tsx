
import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { useInView } from "../hooks/use-in-view";

interface TimelineItemProps {
  title: string;
  year?: string;
  description: string;
  icon: string;
  delay: number;
  isInView: boolean;
}

const TimelineItem = ({ title, year, description, icon, delay, isInView }: TimelineItemProps) => (
  <div className={cn(
    "flex mb-12 transition-all duration-700 ease-out",
    isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
  )}
    style={{ transitionDelay: `${delay * 200}ms` }}
  >
    <div className="relative mr-8">
      {/* Timeline dot */}
      <div className="absolute w-6 h-6 bg-primary rounded-full -left-3 mt-1 flex items-center justify-center z-10 animate-glow">
        <span className="text-sm">{icon}</span>
      </div>
      {/* Timeline year badge */}
      {year && (
        <div className="absolute -left-24 text-sm font-mono text-foreground/50 mt-1">
          {year}
        </div>
      )}
    </div>
    <div>
      <h3 className="text-xl font-medium mb-1">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  </div>
);

const JourneySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  const timelineItems = [
    {
      title: "Started Computer Science",
      year: "2020",
      description: "Began my journey into the world of computer science, learning fundamentals and program structures.",
      icon: "📘",
    },
    {
      title: "Learned C++, Python",
      year: "2021",
      description: "Developed strong programming foundations in key languages used across the industry.",
      icon: "⚙️",
    },
    {
      title: "Explored Core CS Concepts",
      year: "2022",
      description: "Deep dive into data structures, networking protocols, and database management systems.",
      icon: "🧠",
    },
    {
      title: "CSO at Instay Homes",
      year: "2023",
      description: "Leading technical strategy and product development for student housing platform.",
      icon: "🛠",
    },
    {
      title: "Building & Exploring AI",
      year: "Now",
      description: "Creating AI-powered tools while continuing to learn about new technologies.",
      icon: "🔬",
    },
  ];

  return (
    <section 
      id="journey" 
      ref={sectionRef} 
      className="section-padding min-h-screen py-24 relative flex items-center"
    >
      <div className="container max-w-5xl">
        <h2 className={cn(
          "text-3xl md:text-4xl font-bold tracking-tight mb-16 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        )}>
          My <span className="text-primary">Journey</span>
        </h2>
        
        <div className="ml-8 md:ml-24 relative">
          {/* Timeline connector - vertical line */}
          {isInView && (
            <div className="timeline-connector"></div>
          )}
          
          {/* Timeline items */}
          <div className="space-y-6">
            {timelineItems.map((item, index) => (
              <TimelineItem
                key={index}
                title={item.title}
                year={item.year}
                description={item.description}
                icon={item.icon}
                delay={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
