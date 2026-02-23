"use client";

import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)');
    if (!mq.matches || !dotRef.current) return;

    const el = dotRef.current;
    el.style.opacity = '1';

    const handleMouseMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

      const target = e.target as HTMLElement;
      const hovering = !!target.closest('a, button, [role="button"], .interactive-box, .nav-link');
      if (hovering !== isHoveringRef.current) {
        isHoveringRef.current = hovering;
        el.classList.toggle('custom-cursor--hover', hovering);
      }
    };

    const handleMouseLeave = () => {
      el.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      el.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="custom-cursor"
      style={{ opacity: 0 }}
    />
  );
};

export default CustomCursor;
