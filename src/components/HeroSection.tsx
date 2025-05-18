
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
  
  // Enhanced liquid animation effect with 3D objects
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 150; // Increased number for more visibility
    
    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initialize canvas size
    resizeCanvas();
    
    // 3D object definitions
    class ThreeDObject {
      x: number;
      y: number;
      z: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
      size: number;
      type: string;
      color: string;
      
      constructor(type: string) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 200 - 100;
        this.rotationX = Math.random() * Math.PI * 2;
        this.rotationY = Math.random() * Math.PI * 2;
        this.rotationZ = Math.random() * Math.PI * 2;
        this.size = Math.random() * 40 + 20;
        this.type = type;
        
        const colors = [
          'rgba(0, 245, 255, ',  // Cyan
          'rgba(99, 102, 241, ', // Primary
          'rgba(252, 87, 67, ',  // Accent/orange
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.3 + 0.1;
        this.color = `${randomColor}${opacity})`;
      }
      
      update(time: number) {
        // Add rotation for 3D effect
        this.rotationX += 0.002;
        this.rotationY += 0.001;
        this.rotationZ += 0.0015;
        
        // Floating movement
        this.y += Math.sin(time * 0.2 + this.x * 0.01) * 0.5;
        this.x += Math.cos(time * 0.2 + this.y * 0.01) * 0.5;
        
        // Wrap around screen edges
        if (this.x < -this.size) this.x = canvas.width + this.size;
        else if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        else if (this.y > canvas.height + this.size) this.y = -this.size;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotationZ);
        
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color.replace(')', ', 0.8)');
        ctx.lineWidth = 1;
        
        // Draw different shapes based on type
        if (this.type === 'cube') {
          // Simplified cube representation (square with perspective lines)
          const halfSize = this.size / 2;
          
          // Front face
          ctx.beginPath();
          ctx.rect(-halfSize, -halfSize, this.size, this.size);
          ctx.fillStyle = this.color.replace(')', ', 0.3)');
          ctx.fill();
          ctx.stroke();
          
          // Perspective lines to show depth
          ctx.beginPath();
          ctx.moveTo(-halfSize, -halfSize);
          ctx.lineTo(-halfSize + halfSize * 0.4, -halfSize - halfSize * 0.4);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(halfSize, -halfSize);
          ctx.lineTo(halfSize + halfSize * 0.4, -halfSize - halfSize * 0.4);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(-halfSize, halfSize);
          ctx.lineTo(-halfSize + halfSize * 0.4, halfSize - halfSize * 0.4);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(halfSize, halfSize);
          ctx.lineTo(halfSize + halfSize * 0.4, halfSize - halfSize * 0.4);
          ctx.stroke();
          
          // Top face with perspective
          ctx.beginPath();
          ctx.moveTo(-halfSize + halfSize * 0.4, -halfSize - halfSize * 0.4);
          ctx.lineTo(halfSize + halfSize * 0.4, -halfSize - halfSize * 0.4);
          ctx.lineTo(halfSize, -halfSize);
          ctx.lineTo(-halfSize, -halfSize);
          ctx.closePath();
          ctx.fillStyle = this.color.replace(')', ', 0.5)');
          ctx.fill();
          ctx.stroke();
        } else if (this.type === 'sphere') {
          // Draw a circle with gradient for sphere effect
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
          const baseColor = this.color.replace(/[^,]+(?=\))/, '0.6');
          gradient.addColorStop(0, baseColor);
          gradient.addColorStop(1, this.color.replace(/[^,]+(?=\))/, '0.1'));
          
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Add highlight
          ctx.beginPath();
          ctx.arc(-this.size * 0.3, -this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.fill();
        } else if (this.type === 'pyramid') {
          // Simplified pyramid (triangle with a base)
          const halfSize = this.size / 2;
          
          // Base
          ctx.beginPath();
          ctx.rect(-halfSize, halfSize * 0.5, this.size, halfSize * 0.2);
          ctx.fillStyle = this.color.replace(')', ', 0.4)');
          ctx.fill();
          ctx.stroke();
          
          // Pyramid sides
          ctx.beginPath();
          ctx.moveTo(0, -halfSize * 1.2);
          ctx.lineTo(-halfSize, halfSize * 0.5);
          ctx.lineTo(halfSize, halfSize * 0.5);
          ctx.closePath();
          ctx.fillStyle = this.color.replace(')', ', 0.6)');
          ctx.fill();
          ctx.stroke();
        }
        
        ctx.restore();
      }
    }
    
    // Create 3D objects
    const threeDObjects: ThreeDObject[] = [];
    const objectTypes = ['cube', 'sphere', 'pyramid'];
    
    for (let i = 0; i < 10; i++) {
      const type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
      threeDObjects.push(new ThreeDObject(type));
    }
    
    // Create particle class with enhanced visibility
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
        this.size = Math.random() * 3 + 0.5; // Increased size for better visibility
        this.speedX = Math.random() * 0.7 - 0.35; // Increased speed
        this.speedY = Math.random() * 0.7 - 0.35; // Increased speed
        this.amplitude = Math.random() * 30 + 15; // Increased amplitude
        this.frequency = Math.random() * 0.03 + 0.01;
        this.phase = Math.random() * Math.PI * 2;
        
        // Use primarily the accent and primary colors for particles with increased opacity
        const colors = [
          'rgba(0, 245, 255, ', // Cyan
          'rgba(99, 102, 241, ', // Primary
          'rgba(252, 87, 67, ', // Accent
          'rgba(255, 255, 255, ', // White
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.7 + 0.3; // Increased opacity for better visibility
        this.color = `${randomColor}${opacity})`;
      }
      
      update(time: number) {
        // Enhanced sinusoidal movement for more visible liquid effect
        this.x += this.speedX + Math.sin(time * this.frequency + this.phase) * 0.5;
        this.y += this.speedY + Math.cos(time * this.frequency + this.phase) * 0.5;
        
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
    
    // Enhanced animation
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw enhanced grid lines for depth effect
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.2)'; // Increased opacity for better visibility
      ctx.lineWidth = 1.5; // Make grid lines thicker
      const gridSize = 60; // Larger grid for better visibility
      
      // Draw vertical grid lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        
        // Add a glow effect to grid lines
        const glowStrength = (Math.sin(time + x * 0.01) + 1) * 0.5;
        ctx.strokeStyle = `rgba(0, 245, 255, ${0.1 + glowStrength * 0.2})`;
        
        ctx.stroke();
      }
      
      // Draw horizontal grid lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        
        const glowStrength = (Math.sin(time + y * 0.01) + 1) * 0.5;
        ctx.strokeStyle = `rgba(0, 245, 255, ${0.1 + glowStrength * 0.2})`;
        
        ctx.stroke();
      }
      
      // Draw enhanced liquid wave effects (multiple waves for more visual interest)
      // Primary wave
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.7)'; // Increased opacity for primary wave
      ctx.lineWidth = 4; // Thicker line for better visibility
      
      for (let x = 0; x < canvas.width; x += 5) {
        const y = Math.sin(x * 0.01 + time) * 30 + canvas.height / 2;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Secondary wave
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)'; // Different color for secondary wave
      ctx.lineWidth = 3;
      
      for (let x = 0; x < canvas.width; x += 5) {
        const y = Math.sin(x * 0.01 + time + Math.PI) * 20 + canvas.height / 2 + 40;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Draw 3D objects behind particles for depth
      for (const object of threeDObjects) {
        object.update(time);
        object.draw(ctx);
      }
      
      // Draw enhanced particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(time);
        particles[i].draw();
        
        // Draw connections with enhanced visibility
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            // Enhance connection visibility with pulse effect
            const alpha = (Math.sin(time * 2) + 1.5) * 0.1;
            const connectionStrength = 0.25 - (distance / 150) * 0.25;
            ctx.strokeStyle = `rgba(0, 245, 255, ${connectionStrength + alpha})`;
            ctx.lineWidth = 1;
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
      
      {/* Enhanced liquid animation canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />
      
      {/* Parallax effect on background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-20"
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
