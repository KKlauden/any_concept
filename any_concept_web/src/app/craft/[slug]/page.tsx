'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { notFound, useParams } from 'next/navigation';
import MediaRenderer from './MediaRenderer';
import PageBackground from '@/components/PageBackground';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedData } from '@/data/localizedData';

export default function CraftDetailPage() {
  const params = useParams();
  const { locale, isClient, t } = useLanguage();
  const [craftData, setCraftData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [prevCraft, setPrevCraft] = useState<any>(null);
  const [nextCraft, setNextCraft] = useState<any>(null);
  const slug = params?.slug as string;

  useEffect(() => {
    if (isClient && slug) {
      const fetchData = async () => {
        setLoading(true);
        const craftsModule = await getLocalizedData(locale, 'crafts');

        const [data, allCrafts] = await Promise.all([
          craftsModule.getCraftDetail(slug),
          craftsModule.getAllCrafts(),
        ]);

        if (!data || data.externalLink) {
          notFound();
        }

        const internalCrafts = allCrafts.filter(
          (craft: { externalLink?: string }) => !craft.externalLink
        );
        const currentIndex = internalCrafts.findIndex(
          (c: { slug: string }) => c.slug === slug
        );
        setPrevCraft(currentIndex > 0 ? internalCrafts[currentIndex - 1] : null);
        setNextCraft(
          currentIndex < internalCrafts.length - 1
            ? internalCrafts[currentIndex + 1]
            : null
        );

        setCraftData(data);
        setLoading(false);
      };

      fetchData();
    }
  }, [locale, isClient, slug]);

  if (!craftData && !loading) {
    notFound();
  }

  return (
    <main className="relative z-10 min-h-screen bg-background text-foreground overflow-x-clip">
      <PageBackground />

      {/* 顶部导航条 */}
      <PageHeader backHref="/craft" backText="BACK TO CRAFT" />

      {loading ? (
        <div className="min-h-[80vh]" />
      ) : (
        <>
          {/* 项目头部 */}
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
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ transformOrigin: 'left' }}
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <h1
                className="font-display font-extrabold leading-[1] tracking-[-0.04em] text-foreground max-w-4xl"
                style={{ fontSize: 'clamp(28px, 6vw, 80px)' }}
              >
                {craftData.title}
              </h1>
              <div className="flex items-center gap-6 mt-4">
                {craftData.type && (
                  <span className="meta-label">{craftData.type}</span>
                )}
                <span className="meta-label">{craftData.year}</span>
              </div>
            </motion.div>
          </section>

          {/* 图片序列 */}
          <section className="mt-12 md:mt-20 max-w-[1034px] mx-auto px-4 md:px-8 xl:px-0">
            <div className="flex flex-col gap-1">
              {craftData.images?.map((image: any, index: number) => (
                <motion.div
                  key={index}
                  className="w-full border border-white/[0.04]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.5,
                    delay: index < 3 ? index * 0.1 : 0,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <MediaRenderer
                    src={image.src}
                    alt={
                      image.alt ||
                      `${craftData.title} - ${t('craft.image')} ${index + 1}`
                    }
                    priority={index < 3}
                  />
                  {image.caption && (
                    <p className="text-xs font-mono text-white/20 tracking-wider px-4 py-3">
                      {image.caption}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* 上一个/下一个导航 */}
          <nav className="px-6 md:px-20 lg:px-28 mt-20 md:mt-32">
            <motion.div
              className="h-px bg-white/10 mb-8 md:mb-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ transformOrigin: 'left' }}
            />

            <div className="flex justify-between items-center">
              {prevCraft ? (
                <Link
                  href={`/craft/${prevCraft.slug}`}
                  className="group flex items-center gap-3"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent transition-transform duration-300 group-hover:-translate-x-2"
                  >
                    <path d="M15 18L9 12L15 6" />
                  </svg>
                  <div>
                    <div className="meta-label mb-1">
                      {t('craft.previousCraft')}
                    </div>
                    <div className="font-display font-bold text-lg md:text-2xl text-foreground group-hover:text-accent transition-colors duration-200">
                      {prevCraft.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextCraft ? (
                <Link
                  href={`/craft/${nextCraft.slug}`}
                  className="group flex items-center gap-3 text-right"
                >
                  <div>
                    <div className="meta-label mb-1">
                      {t('craft.nextCraft')}
                    </div>
                    <div className="font-display font-bold text-lg md:text-2xl text-foreground group-hover:text-accent transition-colors duration-200">
                      {nextCraft.title}
                    </div>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent transition-transform duration-300 group-hover:translate-x-2"
                  >
                    <path d="M9 18L15 12L9 6" />
                  </svg>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </nav>

          {/* 页脚 */}
          <PageFooter />
        </>
      )}
    </main>
  );
}
