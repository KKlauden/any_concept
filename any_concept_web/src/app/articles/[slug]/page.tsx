'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { notFound, useParams } from 'next/navigation';
import MouseGlow from '@/components/MouseGlow';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import { useLanguage } from '@/hooks/useLanguage';
import { articles } from '#site/content';

export default function ArticleDetailPage() {
  const params = useParams();
  const { locale, isClient } = useLanguage();
  const slug = params?.slug as string;

  const allPublished = articles
    .filter((a) => !a.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 优先匹配当前语言，找不到则 fallback 到任意语言
  const article =
    allPublished.find((a) => a.slug === slug && a.locale === locale) ||
    allPublished.find((a) => a.slug === slug);

  // 用于上一篇/下一篇导航的列表
  const localeFiltered = allPublished.filter((a) => a.locale === (article?.locale ?? locale));
  const navList = localeFiltered.length > 0 ? localeFiltered : allPublished;

  if (!isClient) {
    return (
      <main className="relative z-10 min-h-screen bg-background text-foreground overflow-x-clip">
        <div className="dot-grid" aria-hidden="true" />
        <MouseGlow />
        <div className="min-h-[80vh]" />
      </main>
    );
  }

  if (!article) notFound();

  return <ArticleContent article={article} allArticles={navList} />;
}

function ArticleContent({
  article,
  allArticles,
}: {
  article: (typeof articles)[number];
  allArticles: (typeof articles)[number][];
}) {
  const { t } = useLanguage();

  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < allArticles.length - 1
      ? allArticles[currentIndex + 1]
      : null;

  return (
    <main className="relative z-10 min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="dot-grid" aria-hidden="true" />
      <MouseGlow />

      {/* 顶部导航条 */}
      <PageHeader backHref="/articles" backText={t('articles.backToList')} />

      {/* 文章头部 */}
      <section className="px-6 md:px-20 lg:px-28 pt-16 md:pt-24">
        <motion.div
          className="text-[9px] font-mono tracking-[0.25em] text-white/25 uppercase mb-6 md:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          003 — {t('nav.articles')}
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
          className="max-w-3xl mx-auto"
        >
          <h1
            className="font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground"
            style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}
          >
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <time className="text-xs font-mono text-white/30 tracking-wider">
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>

            {article.tags.length > 0 && (
              <>
                <span className="text-white/10">|</span>
                <div className="flex gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono tracking-wider text-white/30 px-2 py-0.5 border border-white/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* 文章正文 */}
      <motion.section
        className="px-6 md:px-20 lg:px-28 mt-12 md:mt-16"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.7,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <div
          className="article-prose max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </motion.section>

      {/* 上一篇/下一篇导航 */}
      {(prevArticle || nextArticle) && (
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

          <div className="flex justify-between items-start">
            {prevArticle ? (
              <Link
                href={`/articles/${prevArticle.slug}`}
                className="group flex items-center gap-3 max-w-[45%]"
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
                  className="text-accent transition-transform duration-300 group-hover:-translate-x-2 shrink-0"
                >
                  <path d="M15 18L9 12L15 6" />
                </svg>
                <div>
                  <div className="meta-label mb-1">
                    {t('articles.previous')}
                  </div>
                  <div className="font-display font-bold text-base md:text-lg text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-2">
                    {prevArticle.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle ? (
              <Link
                href={`/articles/${nextArticle.slug}`}
                className="group flex items-center gap-3 text-right max-w-[45%]"
              >
                <div>
                  <div className="meta-label mb-1">{t('articles.next')}</div>
                  <div className="font-display font-bold text-base md:text-lg text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-2">
                    {nextArticle.title}
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
                  className="text-accent transition-transform duration-300 group-hover:translate-x-2 shrink-0"
                >
                  <path d="M9 18L15 12L9 6" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      )}

      {/* 页脚 */}
      <PageFooter />
    </main>
  );
}
