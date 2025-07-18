import React from 'react';
import { useTheme } from '../App';

const ThemedButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  const { theme } = useTheme();
  return (
    <button
      {...props}
      className={`rounded-full font-semibold shadow-lg transition text-lg px-8 py-4
        ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-yellow-400 text-orange-900 hover:bg-yellow-500'}
        ${props.className || ''}`}
    >
      {children}
    </button>
  );
};

export default ThemedButton; 