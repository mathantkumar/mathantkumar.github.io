import React, { useEffect, useRef } from 'react';
import { useTheme } from '../App';

const MovingStarsBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (theme !== 'dark') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId: number;
    function getStars(num: number, width: number, height: number) {
      return Array.from({ length: num }, () => {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 0.4 + 0.15;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.7 + 0.7,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          alpha: Math.random() * 0.6 + 0.4,
        };
      });
    }
    let stars = getStars(160, window.innerWidth, window.innerHeight);
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx = canvas.getContext('2d');
      stars = getStars(160, window.innerWidth, window.innerHeight);
    }
    resize();
    window.addEventListener('resize', resize);
    function animate() {
      if (!canvas) return;
      ctx = canvas.getContext('2d');
      if (!ctx) return;
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#181c2a');
      gradient.addColorStop(1, '#232946');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        if (!ctx) continue;
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
        star.x += star.speedX;
        star.y += star.speedY;
        if (star.x > canvas.width) star.x = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y > canvas.height) star.y = 0;
        if (star.y < 0) star.y = canvas.height;
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);
  if (theme !== 'dark') return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed left-0 top-0 w-full h-full z-0"
      style={{ pointerEvents: 'none', background: 'transparent' }}
      aria-hidden="true"
    />
  );
};

export default MovingStarsBackground; 