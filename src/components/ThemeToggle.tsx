import React from 'react';
import { useTheme } from '../App';

const ThemeToggle: React.FC = () => {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold shadow z-50 transition focus:outline-none focus:ring-2 focus:ring-yellow-400
        ${theme === 'dark' ? 'bg-gray-800/80 text-white hover:bg-gray-700' : 'bg-yellow-300 text-orange-900 hover:bg-yellow-400'}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};

export default ThemeToggle; 