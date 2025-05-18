
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn, buttonVariants, textAnimationVariants, randomPoint3D, distance3D } from "@/lib/utils";

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
  
  // Enhanced hyper-realistic constellation animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Constellation stars
    class Star {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      twinkleSpeed: number;
      twinkleOffset: number;
      brightness: number;
      maxBrightness: number;
      
      constructor() {
        // 3D positioning for depth effect
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 200 - 100;
        
        // Visual properties
        this.size = Math.random() * 2 + (1 - (this.z + 100) / 200); // Larger stars in foreground
        this.twinkleSpeed = Math.random() * 0.05 + 0.01;
        this.twinkleOffset = Math.random() * Math.PI * 2;
        
        // Color and brightness
        this.maxBrightness = Math.random() * 0.5 + 0.5;
        this.brightness = this.maxBrightness;
        
        const hue = Math.random() > 0.8 
          ? Math.floor(Math.random() * 60) + 180 // Cyan/blue hues
          : Math.floor(Math.random() * 30); // White/slightly yellow
          
        const saturation = Math.random() * 30 + 70;
        this.color = `hsla(${hue}, ${saturation}%, 80%, 1)`;
      }
      
      update(time: number) {
        // Subtle floating movement
        this.y += Math.sin(time * 0.2 + this.x * 0.01) * 0.05;
        this.x += Math.cos(time * 0.2 + this.y * 0.01) * 0.05;
        
        // Twinkle effect
        this.brightness = this.maxBrightness * (0.5 + Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.5);
        
        // Screen wrapping
        if (this.x < 0) this.x = canvas.width;
        else if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        else if (this.y > canvas.height) this.y = 0;
      }
      
      draw() {
        if (!ctx) return;
        
        // Create a glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 4
        );
        
        const alpha = this.brightness * (1 - (this.z + 100) / 200);
        gradient.addColorStop(0, this.color.replace('1)', `${alpha})`));
        gradient.addColorStop(1, this.color.replace('1)', '0)'));
        
        // Draw the star glow
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw the star core
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness * 0.8})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Constellation class
    class Constellation {
      stars: Star[];
      connections: {p1: number, p2: number, strength: number}[];
      maxDistance: number;
      
      constructor(starCount: number) {
        this.stars = [];
        this.connections = [];
        this.maxDistance = 150;
        
        // Create stars
        for (let i = 0; i < starCount; i++) {
          this.stars.push(new Star());
        }
        
        // Determine connections
        this.calculateConnections();
      }
      
      calculateConnections() {
        // Reset connections
        this.connections = [];
        
        // Calculate distances and create connections
        for (let i = 0; i < this.stars.length; i++) {
          for (let j = i + 1; j < this.stars.length; j++) {
            const dist = Math.hypot(
              this.stars[i].x - this.stars[j].x,
              this.stars[i].y - this.stars[j].y
            );
            
            // Create connection if stars are close enough
            if (dist < this.maxDistance) {
              // Connection strength inversely proportional to distance
              const strength = 1 - dist / this.maxDistance;
              this.connections.push({
                p1: i,
                p2: j,
                strength
              });
            }
          }
        }
      }
      
      update(time: number) {
        // Update each star
        this.stars.forEach(star => star.update(time));
        
        // Recalculate connections every few frames for better performance
        if (Math.floor(time * 10) % 30 === 0) {
          this.calculateConnections();
        }
      }
      
      draw() {
        if (!ctx) return;
        
        // Draw connections first (behind stars)
        this.connections.forEach(conn => {
          const star1 = this.stars[conn.p1];
          const star2 = this.stars[conn.p2];
          
          const gradient = ctx.createLinearGradient(
            star1.x, star1.y, star2.x, star2.y
          );
          
          const baseColor = 'rgba(0, 245, 255,';
          gradient.addColorStop(0, `${baseColor} ${star1.brightness * conn.strength * 0.5})`);
          gradient.addColorStop(1, `${baseColor} ${star2.brightness * conn.strength * 0.5})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = conn.strength * 0.8;
          ctx.beginPath();
          ctx.moveTo(star1.x, star1.y);
          ctx.lineTo(star2.x, star2.y);
          ctx.stroke();
        });
        
        // Then draw stars on top
        this.stars.forEach(star => star.draw());
      }
    }
    
    // 3D Nebula effect
    class Nebula {
      points: {x: number, y: number, z: number, radius: number, color: string, opacity: number, speed: number}[];
      count: number;
      
      constructor(count: number) {
        this.count = count;
        this.points = [];
        
        // Create nebula cloud points
        for (let i = 0; i < count; i++) {
          // Create clusters of points for more realistic nebula shapes
          const clusterCenterX = Math.random() * canvas.width;
          const clusterCenterY = Math.random() * canvas.height;
          const clusterRadius = Math.random() * 200 + 100;
          
          // Random angle and distance from cluster center
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.pow(Math.random(), 2) * clusterRadius; // Squared for denser center
          
          const x = clusterCenterX + Math.cos(angle) * distance;
          const y = clusterCenterY + Math.sin(angle) * distance;
          const z = Math.random() * 300 - 150;
          
          // Determine color - blue/purple/cyan nebulae
          let color;
          const colorType = Math.random();
          if (colorType < 0.33) {
            // Blue/cyan nebula
            color = `rgba(0, ${Math.floor(Math.random() * 150 + 100)}, 255,`;
          } else if (colorType < 0.66) {
            // Purple nebula
            color = `rgba(${Math.floor(Math.random() * 100 + 100)}, 0, ${Math.floor(Math.random() * 150 + 100)},`;
          } else {
            // Cyan nebula
            color = `rgba(0, ${Math.floor(Math.random() * 150 + 100)}, ${Math.floor(Math.random() * 150 + 100)},`;
          }
          
          this.points.push({
            x,
            y, 
            z,
            radius: Math.random() * 60 + 20,
            color,
            opacity: Math.random() * 0.2 + 0.1,
            speed: Math.random() * 0.01 + 0.005
          });
        }
      }
      
      update(time: number) {
        this.points.forEach(point => {
          // Subtle movement
          point.x += Math.sin(time * point.speed) * 0.1;
          point.y += Math.cos(time * point.speed) * 0.1;
          
          // Pulse opacity
          point.opacity = (Math.sin(time * 0.2 + point.x * 0.01) + 1) * 0.1 + 0.05;
        });
      }
      
      draw() {
        if (!ctx) return;
        
        this.points.forEach(point => {
          const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, point.radius
          );
          
          gradient.addColorStop(0, `${point.color}${point.opacity})`);
          gradient.addColorStop(1, `${point.color}0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    }
    
    // Resize canvas
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create constellation and nebula
    const constellation = new Constellation(150); // 150 stars
    const nebula = new Nebula(8); // 8 nebula clouds
    
    let time = 0;
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.005;
      
      // Draw grid background for tech feel
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.15)';
      ctx.lineWidth = 0.5;
      
      // Draw grid with perspective
      const gridSize = 80;
      const gridDepth = 3; // Number of depth layers
      
      for (let depth = 0; depth < gridDepth; depth++) {
        const scale = 1 + depth * 0.5; // Scale grid based on depth
        const opacity = 0.15 / (depth + 1); // Fade with depth
        
        ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
        
        // Horizontal lines
        for (let y = 0; y < canvas.height; y += gridSize / scale) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
        
        // Vertical lines
        for (let x = 0; x < canvas.width; x += gridSize / scale) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
      }
      
      // Draw nebula behind stars
      nebula.update(time);
      nebula.draw();
      
      // Draw constellation
      constellation.update(time);
      constellation.draw();
      
      // Draw digital noise/dust particles for texture
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
        ctx.fillRect(x, y, size, size);
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
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
      
      {/* Enhanced constellation animation canvas */}
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
