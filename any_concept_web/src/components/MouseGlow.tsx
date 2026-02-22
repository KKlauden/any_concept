'use client';

import { useEffect } from 'react';

/**
 * 鼠标跟随光晕 — 通过 CSS 变量驱动，零重渲染
 */
const MouseGlow = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    const mq = window.matchMedia('(hover: hover)');
    if (mq.matches) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div className="mouse-glow" aria-hidden="true" />;
};

export default MouseGlow;
