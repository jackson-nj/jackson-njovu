
import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { useInView } from "../hooks/use-in-view";
import { Github, Linkedin, X } from "lucide-react";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.5 });

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com",
    },
    {
      name: "X",
      icon: X,
      url: "https://x.com",
    },
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-t from-muted to-background"
    >
      <div className="container max-w-5xl text-center">
        <div className={cn(
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Let's <span className="text-primary">Connect</span>
          </h2>
          
          <p className="text-foreground/70 mb-8 max-w-md mx-auto">
            Built with clarity and curiosity
          </p>
          
          <a href="mailto:jack@instay.com" className="text-primary hover:text-primary/80 text-lg font-medium inline-block mb-8">
            jack@instay.com
          </a>
          
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a 
                  key={link.name}
                  href={link.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted/20 text-foreground/70 hover:text-primary hover:bg-muted/40 transition-colors"
                  aria-label={link.name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
