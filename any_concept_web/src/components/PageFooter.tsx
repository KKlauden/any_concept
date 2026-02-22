'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PageFooter: React.FC = () => {
  return (
    <footer className="px-6 md:px-20 lg:px-28 pt-20 md:pt-28 pb-12">
      <motion.div
        className="h-px bg-white/[0.06] mb-8"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: 'left' }}
      />
      <motion.div
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-muted font-mono tracking-wider"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <span>&copy; 2026 KLAUDEN &middot; SHANGHAI</span>
        <a
          href="mailto:kklauden@gmail.com"
          className="hover:text-foreground transition-colors duration-200"
        >
          kklauden@gmail.com
        </a>
      </motion.div>
    </footer>
  );
};

export default PageFooter;
