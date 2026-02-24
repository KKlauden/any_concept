'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={`flex items-center gap-1 text-xs font-mono tracking-wider ${className}`}>
      <Link
        href={pathname}
        locale="zh"
        className={`px-1 py-0.5 transition-colors duration-200 ${
          locale === 'zh'
            ? 'text-foreground font-bold'
            : 'text-muted hover:text-foreground'
        }`}
        aria-label="切换为中文"
      >
        ZH
      </Link>
      <span className="text-white/20">/</span>
      <Link
        href={pathname}
        locale="en"
        className={`px-1 py-0.5 transition-colors duration-200 ${
          locale === 'en'
            ? 'text-foreground font-bold'
            : 'text-muted hover:text-foreground'
        }`}
        aria-label="Switch to English"
      >
        EN
      </Link>
    </div>
  );
};

export default LanguageSwitcher;
