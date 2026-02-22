"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSwitcher from './LanguageSwitcher';

const NavButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  
  // 定义贝塞尔曲线过渡效果
  const customEasing = cubicBezier(0.25, 0.1, 0.25, 1);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-4 md:bottom-12 md:right-12 z-50 cursor-pointer p-4 focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:outline-none"
        onClick={toggleNav}
        aria-label={isOpen ? '关闭导航菜单' : '打开导航菜单'}
        aria-expanded={isOpen}
      >
        <div className="w-14 h-14 bg-zinc-900 flex items-center justify-center" style={{ border: '1px solid var(--crt-green-15)' }}>
          <AnimatePresence mode="popLayout">
            {!isOpen ? (
              <motion.div
                key="open-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.2,
                  ease: customEasing
                }}
              >
                <Image
                  src="/images/logo-open.svg"
                  alt=""
                  width={28}
                  height={28}
                  className="object-contain invert"
                />
              </motion.div>
            ) : (
              <motion.div
                key="close-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.2,
                  ease: customEasing
                }}
              >
                <Image
                  src="/images/logo-close.svg"
                  alt=""
                  width={28}
                  height={28}
                  className="object-contain invert"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-crt-bg z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.3,
              ease: customEasing
            }}
          >
            
              <nav className="space-y-6 flex flex-col items-start justify-center font-jetbrains-mono w-[272px] absolute top-28 right-9 lg:top-52 lg:right-60 crt-glow-text">
                <NavItem idx="00" title={t('nav.home')} href="/" />
                <NavItem idx="01" title={t('nav.craft')} href="/craft" />
                <NavItem idx="02" title={t('nav.projects')} href="/projects" />
                <NavItem idx="03" title={t('nav.photos')} href="/photos" isInDevelopment={true} />
                <NavItem idx="04" title={t('nav.books')} href="/books" isInDevelopment={true} />

                <LanguageSwitcher />
              </nav>
              <div className='flex flex-col items-start justify-center gap-1.5 text-[10px] text-white/30 absolute bottom-19 left-8 lg:bottom-auto lg:top-[340px] lg:left-[68px]'>
                <div>{t('common.copyright')}</div>
                <div>{t('common.builtWith')}</div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavButton; 


interface NavItemProps {
    idx:string;
  title: string;
  href: string;
  isInDevelopment?: boolean;
}

const NavItem = ({ idx, title, href, isInDevelopment = false }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [isHovered, setIsHovered] = useState(false);
  
  // 创建内容元素
  const content = (
    <div 
      className={`flex flex-row justify-center items-center gap-2 group`}
      onMouseEnter={() => !isInDevelopment && setIsHovered(true)}
      onMouseLeave={() => !isInDevelopment && setIsHovered(false)}
    >
      <div className={`text-xs font-normal ${isInDevelopment ? 'text-white/25' : 'text-white/40'}`}>({idx})</div>
      <div className={`text-2xl font-normal transition-colors duration-100 ${
        isInDevelopment
          ? 'text-white/30 line-through'
          : isActive
            ? 'text-white/40'
            : 'text-white/87 hover:text-white/50'
      }`}>
        {(isActive || isHovered) && !isInDevelopment && <span className="mr-2">#</span>}
        {title}
      </div>
    </div>
  );
  
  // 如果正在开发中，则不使用Link包装
  if (isInDevelopment) {
    return content;
  }
  
  // 否则使用Link包装
  return (
    <Link href={href} className="block focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:outline-none">
      {content}
    </Link>
  );
};
