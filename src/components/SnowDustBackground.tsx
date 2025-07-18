import React, { useEffect, useRef } from 'react';
import { useTheme } from '../App';

const SnowDustBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (theme !== 'light') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId: number;
    function getSnowflakes(num: number, width: number, height: number) {
      return Array.from({ length: num }, () => {
        const speed = Math.random() * 0.5 + 0.3;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 10 + 8,
          speedX: Math.random() * 0.4 - 0.2,
          speedY: speed,
          alpha: Math.random() * 0.5 + 0.5,
          angle: Math.random() * 2 * Math.PI,
          spin: (Math.random() - 0.5) * 0.02,
        };
      });
    }
    let snowflakes = getSnowflakes(120, window.innerWidth, window.innerHeight);
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx = canvas.getContext('2d');
      snowflakes = getSnowflakes(120, window.innerWidth, window.innerHeight);
    }
    resize();
    window.addEventListener('resize', resize);
    function drawSnowflake(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, angle: number, alpha: number) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = '#b3cfff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        ctx.moveTo(0, 0);
        ctx.lineTo(0, r);
        ctx.moveTo(0, r * 0.7);
        ctx.lineTo(r * 0.2, r * 0.5);
        ctx.moveTo(0, r * 0.7);
        ctx.lineTo(-r * 0.2, r * 0.5);
        ctx.rotate(Math.PI / 3);
      }
      ctx.stroke();
      ctx.restore();
    }
    function animate() {
      if (!canvas) return;
      ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#e0f2ff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (const flake of snowflakes) {
        drawSnowflake(ctx, flake.x, flake.y, flake.r, flake.angle, flake.alpha);
        flake.x += flake.speedX;
        flake.y += flake.speedY;
        flake.angle += flake.spin;
        if (flake.x > canvas.width) flake.x = 0;
        if (flake.x < 0) flake.x = canvas.width;
        if (flake.y > canvas.height) {
          flake.y = 0;
          flake.x = Math.random() * canvas.width;
        }
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);
  if (theme !== 'light') return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed left-0 top-0 w-full h-full z-0"
      style={{ pointerEvents: 'none', background: 'transparent' }}
      aria-hidden="true"
    />
  );
};

export default SnowDustBackground; 