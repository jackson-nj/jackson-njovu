
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.2;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        
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
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
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
    
    // Animation
    const animate = () => {
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
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
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

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"
        style={{ 
          transform: `translateY(${scrollY * 0.1}px)`,
          transition: 'transform 0.05s linear'
        }} 
      />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30" 
           style={{
             background: 'radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.1), transparent 70%)',
             animation: 'pulse 8s ease-in-out infinite alternate'
           }} />
      
      <div 
        ref={containerRef} 
        className="container max-w-5xl z-10 px-6" 
        style={{ 
          transform: `translateY(${-scrollY * 0.2}px)`, 
          transition: 'transform 0.05s linear' 
        }}
      >
        <div className="stagger-animation in-view">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4">
            <span className="text-foreground/90">Jack</span>
            <span className="glow-text text-primary"> Beker</span>
            <span className="inline-block ml-2 align-middle animate-pulse">
              <ArrowRight size={32} className="text-primary/70" />
            </span>
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground tracking-tight font-light mt-2">
            CS student · CSO at Instay Homes
          </h2>
          <p className="max-w-md text-lg text-foreground/70 mt-6">
            Exploring systems, AI, and building tools for the future
          </p>
          <div className="flex flex-wrap gap-4 pt-8">
            <Button className="rounded-full group shine" size="lg" asChild>
              <a href="#projects">
                See My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="outline" className="rounded-full shine" size="lg" asChild>
              <a href="#contact">Let's Connect</a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
        <div className="text-sm text-muted-foreground font-mono animate-fade-in space-y-2 text-right opacity-60">
          <p>/* Working with me was</p>
          <p className="text-primary">a game changer */</p>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
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
