
import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { useInView } from "../hooks/use-in-view";
import { Github, Linkedin, X, Phone, Instagram, Facebook } from "lucide-react";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.5 });

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/jackson-nj",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/jackson_nj5?igsh=YzljYTk1ODg3Zg==",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/profile.php?id=100086003796045",
    },
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={cn(
        "py-24 bg-gradient-to-t from-muted to-background section-transition",
        isInView && "in-view"
      )}
    >
      <div className="container max-w-5xl text-center">
        <div className={cn(
          "transition-all duration-700 stagger-animation",
          isInView && "in-view"
        )}>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 relative">
            Let's <span className="text-primary glow-text">Connect</span>
          </h2>
          
          <p className="text-foreground/70 mb-8 max-w-md mx-auto">
            Built with clarity and curiosity
          </p>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <Phone className="h-5 w-5 text-primary" />
            <a href="tel:+260977502711" className="text-primary hover:text-primary/80 text-lg font-medium inline-block hover:glow-text transition-all duration-300">
              +260 977502711
            </a>
          </div>
          
          <a href="mailto:jack@instay.com" className="text-primary hover:text-primary/80 text-lg font-medium inline-block mb-8 hover:glow-text transition-all duration-300">
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
                  className="p-4 rounded-full bg-muted/20 text-foreground/70 hover:text-primary hover:bg-muted/40 transition-all duration-300
                            hover:shadow-[0_0_15px_rgba(0,245,255,0.2)] transform hover:scale-110"
                  aria-label={link.name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent opacity-50"></div>
    </section>
  );
};

export default ContactSection;
