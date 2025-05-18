
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn, buttonVariants, textAnimationVariants } from "@/lib/utils";
import GalaxyScene from './GalaxyScene';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  
  // Preloader animation
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 30);
    
    return () => clearInterval(timer);
  }, []);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create the class names for animated elements with staggered delays
  const getAnimationClass = (index: number) => {
    return cn(
      "opacity-0 transform translate-y-8", 
      isLoading ? "" : "animate-fade-in",
      {
        "transition-all duration-700 delay-300": index === 0,
        "transition-all duration-700 delay-500": index === 1,
        "transition-all duration-700 delay-700": index === 2,
        "transition-all duration-700 delay-900": index === 3,
      }
    );
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Galaxy Scene */}
      <div className="absolute inset-0 z-10">
        <GalaxyScene className="w-full h-full" />
      </div>
      
      {/* Dark overlay to ensure text visibility */}
      <div className="absolute inset-0 bg-black/50 z-20" />
      
      {/* Parallax effect on background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background z-20"
        style={{ 
          transform: `translateY(${scrollY * 0.1}px)`,
          transition: 'transform 0.05s linear'
        }} 
      />
      
      {/* Animated gradient overlay with enhanced visibility */}
      <div className="absolute inset-0 opacity-40 z-20" 
           style={{
             background: 'radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.15), transparent 70%)',
             animation: 'pulse 8s ease-in-out infinite alternate'
           }} />
      
      {/* Preloader */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-primary font-mono text-sm">{loadProgress}%</p>
        </div>
      )}
      
      {/* Main content with parallax effect */}
      <div 
        ref={containerRef} 
        className="container max-w-5xl z-30 px-6 flex flex-col items-center justify-center md:items-start" 
        style={{ 
          transform: `translateY(${-scrollY * 0.2}px)`, 
          transition: 'transform 0.05s linear',
          opacity: isLoading ? 0 : 1
        }}
      >
        <div className="space-y-6 text-center md:text-left max-w-full">
          <h1 className={getAnimationClass(0)}>
            <span className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 inline-flex items-center">
              <span className="text-foreground/90">Jackson</span>
              <span className={cn("text-primary glow-text animate-float-subtle", textAnimationVariants.glow)}> Njovu</span>
              <span className="inline-block ml-2 align-middle transform animate-pulse">
                <ArrowRight size={32} className="text-primary/70" />
              </span>
            </span>
          </h1>
          <h2 className={getAnimationClass(1)}>
            <span className="text-xl md:text-2xl text-muted-foreground tracking-tight font-light mt-2">
              Computer Science major · CSO at Instay Homes
            </span>
          </h2>
          <p className={cn(getAnimationClass(2), "max-w-md text-lg text-foreground/70 mt-6")}>
            Exploring systems, AI, and building tools for the future
          </p>
          <div className={getAnimationClass(3)}>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-8">
              <Button 
                className={cn(
                  "rounded-full group relative overflow-hidden button-pop", 
                  buttonVariants.shine,
                  buttonVariants.glow
                )} 
                size="lg" 
                asChild
              >
                <a href="#projects" className="flex items-center">
                  See My Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                className={cn(
                  "rounded-full relative overflow-hidden button-pop border-primary/30",
                  buttonVariants.float
                )} 
                size="lg" 
                asChild
              >
                <a href="#contact">Let's Connect</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30">
        <div className="text-sm text-muted-foreground font-mono space-y-2 text-right opacity-60">
          
        </div>
      </div>
      
      <div className={cn("absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-30", isLoading ? "opacity-0" : "opacity-100 transition-opacity delay-1000 duration-500")}>
        <a href="#about" className="flex flex-col items-center text-sm text-foreground/50 hover:text-primary transition-colors">
          <span className="mb-1">Scroll</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
