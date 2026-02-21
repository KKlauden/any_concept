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
        className="fixed bottom-4 right-4 md:bottom-12 md:right-12 z-50 cursor-pointer p-4 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 rounded-full"
        onClick={toggleNav}
        aria-label={isOpen ? '关闭导航菜单' : '打开导航菜单'}
        aria-expanded={isOpen}
      >
        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center shadow-[0px_4px_8px_0px_rgba(0,0,0,0.04),0px_1px_1px_0px_rgba(0,0,0,0.02)] border border-black/8">
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
                  className="object-contain"
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
                  className="object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.3,
              ease: customEasing
            }}
          >
            
              <nav className="space-y-8 flex flex-col items-start justify-center font-jetbrains-mono w-[272px] absolute top-28 right-9 lg:top-52 lg:right-60">
                <NavItem idx="00" title={t('nav.home')} href="/" />
                <NavItem idx="01" title={t('nav.craft')} href="/craft" />
                <NavItem idx="02" title={t('nav.projects')} href="/projects" />
                <NavItem idx="03" title={t('nav.photos')} href="/photos" isInDevelopment={true} />
                <NavItem idx="04" title={t('nav.books')} href="/books" isInDevelopment={true} />

                <LanguageSwitcher />
              </nav>
              <div className='flex flex-col items-start justify-center gap-2 text-xs text-black/54 absolute bottom-19 left-8 lg:bottom-auto lg:top-[354px] lg:left-[68px]'>
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
      <div className={`text-sm font-normal ${isInDevelopment ? 'text-black/54' : 'text-black/87'}`}>({idx})</div>
      <div className={`text-4xl font-normal transition-colors duration-200 ${
        isInDevelopment 
          ? 'text-black/54 line-through' 
          : isActive 
            ? 'text-black/54' 
            : 'text-black/87 hover:text-black/54'
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
    <Link href={href} className="block rounded-lg focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2">
      {content}
    </Link>
  );
};
