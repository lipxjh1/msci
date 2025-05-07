'use client';

import { useRef, useEffect } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particles: Particle[] = [];
    let animationFrameId: number;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      blurSize: number;
      glow: boolean;
      opacity: number;
      
      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = this.getRandomColor();
        this.blurSize = Math.random() * 2 + 1;
        this.glow = Math.random() > 0.7;
        this.opacity = Math.random() * 0.5 + 0.3;
      }
      
      getRandomColor() {
        const colors = [
          'rgba(6, 182, 212, 0.7)',   // cyan
          'rgba(59, 130, 246, 0.7)',  // blue
          'rgba(16, 185, 129, 0.7)',  // green
          'rgba(139, 92, 246, 0.7)',  // purple
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        const width = canvas?.width || window.innerWidth;
        const height = canvas?.height || window.innerHeight;
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x < 0 || this.x > width) {
          this.speedX = -this.speedX;
        }
        
        if (this.y < 0 || this.y > height) {
          this.speedY = -this.speedY;
        }
        
        // Random slight direction change
        if (Math.random() > 0.99) {
          this.speedX += (Math.random() - 0.5) * 0.2;
          this.speedY += (Math.random() - 0.5) * 0.2;
        }
        
        // Speed limits
        this.speedX = Math.max(-0.5, Math.min(0.5, this.speedX));
        this.speedY = Math.max(-0.5, Math.min(0.5, this.speedY));
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        
        if (this.glow) {
          ctx.shadowBlur = this.blurSize * 5;
          ctx.shadowColor = this.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
    }
    
    // Create particles
    const createParticles = () => {
      const particleCount = isMobile ? 50 : 150;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    // Connection lines between particles
    const connect = () => {
      if (!ctx) return;
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(30, 64, 175, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgb(2, 6, 23)');
      gradient.addColorStop(1, 'rgb(10, 15, 34)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    createParticles();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 bg-gradient-to-b from-black to-blue-950"
    />
  );
} 