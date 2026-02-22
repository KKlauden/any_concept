"use client";

import React, { useEffect, useState } from 'react';

const CRTOverlay: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {!isMobile && <div className="crt-noise" aria-hidden="true" />}
      <div className="crt-vignette" aria-hidden="true" />
      {!isMobile && <div className="crt-scanlines" aria-hidden="true" />}
    </>
  );
};

export default CRTOverlay;
