import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn, buttonVariants, textAnimationVariants } from "@/lib/utils";

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
  
  // Liquid animation effect with canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 100;
    
    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initialize canvas size
    resizeCanvas();
    
    // Create particle
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      amplitude: number;
      frequency: number;
      phase: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.2;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.amplitude = Math.random() * 20 + 10;
        this.frequency = Math.random() * 0.02 + 0.01;
        this.phase = Math.random() * Math.PI * 2;
        
        // Use primarily the accent and primary colors for particles
        const colors = [
          'rgba(0, 245, 255, ', // Cyan
          'rgba(99, 102, 241, ', // Primary
          'rgba(255, 255, 255, ', // White
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.5 + 0.1;
        this.color = `${randomColor}${opacity})`;
      }
      
      update(time: number) {
        // Add sinusoidal movement for liquid effect
        this.x += this.speedX + Math.sin(time * this.frequency + this.phase) * 0.3;
        this.y += this.speedY + Math.cos(time * this.frequency + this.phase) * 0.3;
        
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    let time = 0;
    
    // Animation
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines for depth effect
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 0.5;
      const gridSize = 50;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw liquid wave effect
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.1)';
      ctx.lineWidth = 2;
      
      for (let x = 0; x < canvas.width; x += 5) {
        const y = Math.sin(x * 0.01 + time) * 20 + canvas.height / 2;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(time);
        particles[i].draw();
        
        // Draw connections
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.15 - (distance / 150) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
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
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="https://cdn.lovable.dev/media/2024/6/14/9/f1a23e68-bcf2-41f2-9abe-3b30f73d51d2/abstract_tech.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" /> {/* Dark overlay */}
      </div>
      
      {/* Liquid animation canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />
      
      {/* Parallax effect on background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-20"
        style={{ 
          transform: `translateY(${scrollY * 0.1}px)`,
          transition: 'transform 0.05s linear'
        }} 
      />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30 z-20" 
           style={{
             background: 'radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.1), transparent 70%)',
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
          opacity: isLoading ? 0 : 1,
          transitionProperty: 'opacity',
          transitionDuration: '0.5s',
          transitionTimingFunction: 'ease-in-out'
        }}
      >
        <div className="space-y-6 text-center md:text-left max-w-full">
          <h1 className={getAnimationClass(0)}>
            <span className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 inline-flex items-center">
              <span className="text-foreground/90">Jack</span>
              <span className={cn("text-primary glow-text animate-float-subtle", textAnimationVariants.glow)}> Beker</span>
              <span className="inline-block ml-2 align-middle transform animate-pulse">
                <ArrowRight size={32} className="text-primary/70" />
              </span>
            </span>
          </h1>
          <h2 className={getAnimationClass(1)}>
            <span className="text-xl md:text-2xl text-muted-foreground tracking-tight font-light mt-2">
              CS student · CSO at Instay Homes
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
          <p className={cn(getAnimationClass(1))}>/* Working with me was</p>
          <p className={cn(getAnimationClass(2), "text-primary")}>a game changer */</p>
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
