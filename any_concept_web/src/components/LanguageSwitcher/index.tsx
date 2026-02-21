'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

interface LanguageSwitcherProps {
  onClick?: () => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onClick }) => {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === 'zh' ? 'en' : 'zh');
    // 切换语言后调用传入的onClick函数（用于关闭导航菜单）
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="mt-2">
      <button 
        onClick={toggleLanguage}
        className="relative w-[58px] h-[26px] rounded-full bg-zinc-100 border p-1 border-black/12 flex items-center hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label={locale === 'zh' ? 'Switch to English' : '切换为中文'}
      >
        {/* 滑块 */}
        <motion.div 
          className="absolute w-[24px] h-[16px] bg-black rounded-full z-10"
          animate={{ x: locale === 'zh' ? 0 : 24 }}
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        
        {/* 中文文字 */}
        <div className={`relative z-20 w-[24px] h-[16px] flex items-center justify-center font-jetbrains-mono text-[10px] ${locale === 'zh' ? 'text-white' : 'text-black'}`}>
          中
        </div>
        
        {/* 英文文字 */}
        <div className={`relative z-20 w-[24px] h-[16px] flex items-center justify-center font-jetbrains-mono text-[10px] ${locale === 'en' ? 'text-white' : 'text-black'}`}>
          EN
        </div>
      </button>
    </div>
  );
};

export default LanguageSwitcher; 