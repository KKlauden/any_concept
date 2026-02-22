'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

interface PageHeaderProps {
  backHref: string;
  backText: string;
  rightContent?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ backHref, backText, rightContent }) => {
  return (
    <motion.header
      className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-20 lg:px-28 py-4 md:py-6 backdrop-blur-md bg-background/80 border-b border-white/[0.04]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Link
        href={backHref}
        className="group flex items-center gap-2 meta-label hover:text-white/50 transition-colors duration-200"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        >
          <path d="M10 7H4M4 7L7 4M4 7L7 10" />
        </svg>
        {backText}
      </Link>
      <LanguageSwitcher />
      {rightContent && (
        <span className="meta-label">{rightContent}</span>
      )}
    </motion.header>
  );
};

export default PageHeader;
