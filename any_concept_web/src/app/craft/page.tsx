'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageBackground from '@/components/PageBackground';
import WorkItem from '@/components/WorkItem';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
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
      <PageBackground />

      {/* 顶部导航条 */}
      <PageHeader
        backHref="/"
        backText="KLAUDEN"
        rightContent={!loading && <>{works.length} WORKS</>}
      />

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
            className="font-display font-extrabold leading-[0.85] tracking-[-0.05em] text-foreground text-grain"
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
      <PageFooter />
    </main>
  );
}
