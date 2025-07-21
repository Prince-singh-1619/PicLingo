import React, { useRef, useEffect } from 'react';
import useTheme from '../hooks/useTheme';

const InteractiveCard = ({ children, className = '' }) => {
  const wrapperRef = useRef(null);
  const theme = useTheme();

  // Update background color when theme changes
  useEffect(() => {
    if (wrapperRef.current) {
      const isDark = theme === "dark";
      wrapperRef.current.style.background = isDark ? '#1a1a1a' : '#E2E8F0';
    }
  }, [theme]);

  const handleMouseMove = (e) => {
    const el = wrapperRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 4;
    const centerY = rect.height / 4;
    const rotateX = (y - centerY) / 30;
    const rotateY = -(x - centerX) / 30;

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const isDark = theme === "dark";
    const baseColor = isDark ? '#1a1a1a' : '#E2E8F0';

    el.style.background = `
      radial-gradient(circle at ${x}px ${y}px, rgba(0,255,255,0.3), transparent 60%),
      ${baseColor}
    `;
    el.style.borderRadius = "1rem";
  };

  const handleMouseLeave = () => {
    const el = wrapperRef.current;
    el.style.transform = `rotateX(0deg) rotateY(0deg)`;

    const isDark = theme === "dark";
    el.style.background = isDark ? '#1a1a1a' : '#E2E8F0';
    el.style.borderRadius = "0.5rem"; // Reset to rounded-lg
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        transition-all duration-200 ease-in-out
        will-change-[background,transform,border-radius]
        border-2 rounded-lg  
        hover:rounded-lg
        hover:[border-image:linear-gradient(90deg,#e63946,#f1fa8c,#2a9d8f,#457b9d)_1]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default InteractiveCard;