import React, { useEffect, useRef } from 'react';

// Simple water ripple/dissolve effect following the cursor
const WaterCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouse = { x: -100, y: -100 };
    let ripples: { x: number; y: number; r: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // Add a new ripple at the cursor
      ripples.push({ x: mouse.x, y: mouse.y, r: 0, alpha: 0.5 });
    };
    window.addEventListener('mousemove', handleMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw ripples
      ripples.forEach((ripple, i) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.r, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(0, 180, 255, ${ripple.alpha})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = `rgba(0,180,255,${ripple.alpha})`;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
        ripple.r += 1.5;
        ripple.alpha *= 0.96;
        if (ripple.alpha < 0.03) ripples.splice(i, 1);
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    />
  );
};

export default WaterCursor; 