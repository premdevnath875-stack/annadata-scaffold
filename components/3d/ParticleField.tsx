'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Three.js Particle Field — lightweight canvas-based particles
 * for the hero section background. Uses raw WebGL/Canvas2D for
 * smaller bundle size instead of importing all of Three.js.
 */
export function ParticleField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Check for low-power devices
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency < 4) {
      setIsLowPower(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;
    let isVisible = true;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    // Particle colors
    const colors = [
      'rgba(225, 89, 89, 0.6)',   // Coral Red
      'rgba(50, 136, 165, 0.6)',   // Teal Blue
      'rgba(255, 255, 255, 0.4)',  // White
    ];

    // Create particles
    const PARTICLE_COUNT = 200;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      size: Math.random() * 3 + 1,
      speedY: -(Math.random() * 0.3 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      parallaxFactor: Math.random() * 0.02 + 0.005,
    }));

    // Mouse tracking for parallax
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;
    };

    canvas.addEventListener('mousemove', handleMouse);

    // Visibility API — pause when tab hidden
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) animate();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const animate = () => {
      if (!isVisible) return;

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        // Update position
        p.y += p.speedY;
        p.x += p.speedX;

        // Parallax offset from mouse
        const px = p.x + mouseX * p.parallaxFactor;
        const py = p.y + mouseY * p.parallaxFactor;

        // Wrap around
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isLowPower]);

  if (isLowPower) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      aria-hidden="true"
    />
  );
}
