
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ease-in-out",
      isScrolled ? "py-4 bg-background/80 backdrop-blur-md border-b border-white/5" : "py-6"
    )}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a href="#" className="text-lg font-medium tracking-tighter hover:text-primary">
          jack<span className="text-primary">.</span>
        </a>
        <div className="hidden md:flex space-x-10">
          <a href="#about" className="text-sm text-foreground/70 hover:text-primary transition-colors">about</a>
          <a href="#journey" className="text-sm text-foreground/70 hover:text-primary transition-colors">journey</a>
          <a href="#projects" className="text-sm text-foreground/70 hover:text-primary transition-colors">projects</a>
          <a href="#skills" className="text-sm text-foreground/70 hover:text-primary transition-colors">skills</a>
          <a href="#now" className="text-sm text-foreground/70 hover:text-primary transition-colors">now</a>
          <a href="#contact" className="text-sm text-foreground/70 hover:text-primary transition-colors">contact</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
