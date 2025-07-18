import React from 'react';

const staticFlakes = Array.from({ length: 28 }, (_, i) => ({
  x: 40 + i * 50 + Math.random() * 30,
  y: 60 + Math.random() * 10,
  r: Math.random() * 7 + 4,
  angle: Math.random() * 2 * Math.PI,
  opacity: Math.random() * 0.5 + 0.5,
}));

const SnowMoundsFooter: React.FC = () => (
  <div className="w-full absolute left-0 bottom-0 z-10 pointer-events-none select-none">
    <svg viewBox="0 0 1440 80" fill="none" className="w-full h-20">
      <path d="M0 60 Q 180 20 360 60 T 720 60 T 1080 60 T 1440 60 V80H0Z" fill="#e0f2ff" />
      <path d="M0 70 Q 180 40 360 70 T 720 70 T 1080 70 T 1440 70 V80H0Z" fill="#b3cfff" />
      {/* Static snowflakes on the mounds */}
      {staticFlakes.map((flake, i) => (
        <g key={i} opacity={flake.opacity} transform={`translate(${flake.x},${flake.y}) rotate(${flake.angle * 57.2958})`}>
          <g stroke="#b3cfff" strokeWidth="1.2">
            <line x1="0" y1={-flake.r} x2="0" y2={flake.r} />
            <line x1={-flake.r} y1="0" x2={flake.r} y2="0" />
            <line x1={-flake.r * 0.7} y1={-flake.r * 0.7} x2={flake.r * 0.7} y2={flake.r * 0.7} />
            <line x1={flake.r * 0.7} y1={-flake.r * 0.7} x2={-flake.r * 0.7} y2={flake.r * 0.7} />
          </g>
        </g>
      ))}
    </svg>
    {/* Large background snowflakes */}
    <svg className="absolute left-10 bottom-8 w-12 h-12 animate-spin-slow opacity-40" viewBox="0 0 48 48" fill="none">
      <g stroke="#b3cfff" strokeWidth="2">
        <line x1="24" y1="4" x2="24" y2="44" />
        <line x1="4" y1="24" x2="44" y2="24" />
        <line x1="10" y1="10" x2="38" y2="38" />
        <line x1="38" y1="10" x2="10" y2="38" />
      </g>
    </svg>
    <svg className="absolute right-16 bottom-12 w-8 h-8 animate-spin-slow-rev opacity-30" viewBox="0 0 32 32" fill="none">
      <g stroke="#b3cfff" strokeWidth="1.5">
        <line x1="16" y1="3" x2="16" y2="29" />
        <line x1="3" y1="16" x2="29" y2="16" />
        <line x1="7" y1="7" x2="25" y2="25" />
        <line x1="25" y1="7" x2="7" y2="25" />
      </g>
    </svg>
  </div>
);

export default SnowMoundsFooter; 