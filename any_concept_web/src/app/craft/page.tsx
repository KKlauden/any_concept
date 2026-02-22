'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MouseGlow from '@/components/MouseGlow';
import WorkItem from '@/components/WorkItem';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedData } from '@/data/localizedData';

export default function CraftPage() {
  const { locale, isClient, t } = useLanguage();
  const [works, setWorks] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (isClient) {
      const fetchData = async () => {
        const craftsModule = await getLocalizedData(locale, 'crafts');
        const worksData = await craftsModule.getAllCrafts();
        setWorks(worksData);
        setLoading(false);
      };
      fetchData();
    }
  }, [locale, isClient]);

  return (
    <main className="relative z-10 min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="dot-grid" aria-hidden="true" />
      <MouseGlow />

      {/* 顶部导航条 */}
      <motion.header
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-20 lg:px-28 py-4 md:py-6 backdrop-blur-md bg-background/80 border-b border-white/[0.04]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Link
          href="/"
          className="group flex items-center gap-2 meta-label hover:text-white/40 transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:-translate-x-0.5">
            <path d="M10 7H4M4 7L7 4M4 7L7 10" />
          </svg>
          KLAUDEN
        </Link>
        <LanguageSwitcher />
        <span className="meta-label">
          {!loading && <>{works.length} WORKS</>}
        </span>
      </motion.header>

      {/* 页面标题区 */}
      <section className="px-6 md:px-20 lg:px-28 pt-16 md:pt-24">
        <motion.div
          className="text-[9px] font-mono tracking-[0.25em] text-white/25 uppercase mb-6 md:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          001 — {t('nav.craft')}
        </motion.div>

        <motion.div
          className="h-px bg-white/10 mb-10 md:mb-14"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: 'left' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1
            className="font-display font-extrabold leading-[0.85] tracking-[-0.05em] text-foreground"
            style={{ fontSize: 'clamp(44px, 14vw, 148px)', overflowWrap: 'break-word' }}
          >
            CRAFT
          </h1>
          <p className="meta-label mt-4">{t('home.selectedWork')}</p>
        </motion.div>
      </section>

      {/* 作品网格 */}
      <section className="px-6 md:px-20 lg:px-28 mt-16 md:mt-24">
        {loading ? (
          <div className="min-h-[50vh]" />
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {works.map((work, i) => (
              <div key={work.id} className="mb-4 break-inside-avoid">
                <WorkItem
                  title={work.title}
                  year={work.year}
                  coverImage={work.coverImage}
                  aspectRatio={work.aspectRatio}
                  type={work.type}
                  hasExternal={work.hasExternal}
                  link={work.externalLink}
                  slug={!work.externalLink ? work.slug : undefined}
                  index={i}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 页脚 */}
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
          <span>&copy; 2025 KLAUDEN &middot; SHANGHAI</span>
          <a
            href="mailto:kklauden@gmail.com"
            className="hover:text-foreground transition-colors duration-200"
          >
            kklauden@gmail.com
          </a>
        </motion.div>
      </footer>
    </main>
  );
}
