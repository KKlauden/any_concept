'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={`flex items-center gap-1 text-xs font-mono tracking-wider ${className}`}>
      <button
        onClick={() => setLocale('zh')}
        className={`px-1 py-0.5 transition-colors duration-200 cursor-pointer ${
          locale === 'zh'
            ? 'text-foreground font-bold'
            : 'text-muted hover:text-foreground'
        }`}
        aria-label="切换为中文"
      >
        ZH
      </button>
      <span className="text-white/20">/</span>
      <button
        onClick={() => setLocale('en')}
        className={`px-1 py-0.5 transition-colors duration-200 cursor-pointer ${
          locale === 'en'
            ? 'text-foreground font-bold'
            : 'text-muted hover:text-foreground'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
