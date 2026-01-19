import { useEffect, useRef, useState } from "react";

// Creative growing "Smokey Roots" effect
// Uses a flow field to create organic, root-like trails that look ethereal
export function GrowingNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();
    
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let flowField: number[] = [];
    const rows = 50;
    const cols = 50;
    let cellWidth = canvas.width / cols;
    let cellHeight = canvas.height / rows;

    class Particle {
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      history: { x: number; y: number }[];
      maxLength: number;
      angle: number;
      timer: number;
      color: string;
      lineWidth: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.history = [];
        this.maxLength = Math.floor(Math.random() * 100 + 50);
        this.angle = 0;
        this.timer = this.maxLength * 2;
        
        // White/Smokey colors
        const opacity = Math.random() * 0.05 + 0.01;
        this.color = isDark 
          ? `rgba(255, 255, 255, ${opacity})`
          : `rgba(0, 0, 0, ${opacity * 0.5})`;
        this.lineWidth = Math.random() * 2 + 0.5;
      }

      update() {
        this.timer--;
        if (this.timer >= 1) {
            let x = Math.floor(this.x / cellWidth);
            let y = Math.floor(this.y / cellHeight);
            let index = y * cols + x;
            
            // If out of bounds, randomize angle
            if (index < 0 || index >= flowField.length) {
                this.angle += (Math.random() - 0.5) * 0.5;
            } else {
                 this.angle = flowField[index];
            }

            this.speedX = Math.cos(this.angle);
            this.speedY = Math.sin(this.angle);
            this.x += this.speedX * 0.8; // Organic speed
            this.y += this.speedY * 0.8;

            // Add point to history
            this.history.push({ x: this.x, y: this.y });
            if (this.history.length > this.maxLength) {
                this.history.shift();
            }
        } else if (this.history.length > 1) {
            this.history.shift();
        } else {
             this.reset();
        }
      }

      reset() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.history = [];
        this.timer = this.maxLength * 2;
        this.maxLength = Math.floor(Math.random() * 100 + 50); // Reset length
        
        // Start from edges mostly
        if (Math.random() < 0.9) { // 90% edge spawn for better coverage
             const side = Math.floor(Math.random() * 4);
             if (side === 0) this.y = 0; // Top
             else if (side === 1) this.x = canvas!.width; // Right
             else if (side === 2) this.y = canvas!.height; // Bottom
             else this.x = 0; // Left
        }
      }

      draw(context: CanvasRenderingContext2D) {
        if (this.history.length < 2) return;
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length; i++) {
            context.lineTo(this.history[i].x, this.history[i].y);
        }
        context.strokeStyle = this.color;
        
        // Smokey blur effect (Optimized: Removed heavy shadowBlur for performance)
        // context.shadowBlur = 5;
        // context.shadowColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";
        
        context.lineWidth = this.lineWidth;
        context.lineCap = "round"; // Smooth ends
        context.stroke();
      }
    }

    const init = () => {
      // Create flow field
      cellWidth = canvas.width / cols;
      cellHeight = canvas.height / rows;
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let angle = (Math.cos(x * 0.1) + Math.sin(y * 0.1)) * Math.PI * 2;
          flowField.push(angle);
        }
      }

      particles = [];
      const numberOfParticles = 300; // Balanced count
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
        
        // Randomize initial history size to stagger growth
        const p = particles[i];
        if (Math.random() < 0.5) {
            p.history = []; // Start fresh
        }
      }
    };
    
    // Animate loop
    const animate = () => {
        // Clear with fade effect for trails
        // ctx.fillStyle = isDark ? 'rgba(18, 18, 18, 0.02)' : 'rgba(255, 255, 255, 0.02)';
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Or just clear completely since we are drawing trails in the particle class
         ctx.clearRect(0,0, canvas.width, canvas.height); 
        
        particles.forEach(p => {
            p.update();
            p.draw(ctx);
        });
        
        // Update flow field slightly for movement
        for(let i=0; i<flowField.length; i++) {
            flowField[i] += 0.002;
        }

        animationId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }

    handleResize(); // Initialize
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
