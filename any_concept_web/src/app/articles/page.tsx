'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageBackground from '@/components/PageBackground';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import { useLanguage } from '@/hooks/useLanguage';
import { articles } from '#site/content';

export default function ArticlesPage() {
  const { locale, isClient, t } = useLanguage();

  const allPublished = articles
    .filter((a) => !a.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 优先显示当前语言的文章，如果没有则显示所有文章
  const localeFiltered = allPublished.filter((a) => a.locale === locale);
  const filtered = localeFiltered.length > 0 ? localeFiltered : allPublished;

  return (
    <main className="relative z-10 min-h-screen bg-background text-foreground overflow-x-clip">
      <PageBackground />

      {/* 顶部导航条 */}
      <PageHeader
        backHref="/"
        backText="KLAUDEN"
        rightContent={isClient && <>{filtered.length} {t('articles.count')}</>}
      />

      {/* 页面标题区 */}
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
            ARTICLES
          </h1>
        </motion.div>
      </section>

      {/* 文章列表 */}
      <section className="px-6 md:px-20 lg:px-28 mt-16 md:mt-24">
        {!isClient ? (
          <div className="min-h-[50vh]" />
        ) : (
        <div className="flex flex-col">
          {filtered.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.6 + index * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Link
                href={`/articles/${article.slug}`}
                className="group block py-6 border-b border-white/[0.06] hover:border-white/[0.15] transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                  {/* 日期 */}
                  <time className="text-xs font-mono text-white/30 tracking-wider shrink-0 md:w-28">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </time>

                  {/* 标题与摘要 */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base md:text-lg font-display font-semibold text-white/87 group-hover:text-white transition-colors duration-200 leading-tight">
                      {article.title}
                    </h2>
                    {article.description && (
                      <p className="mt-2 text-sm text-white/40 leading-relaxed line-clamp-2">
                        {article.description}
                      </p>
                    )}
                  </div>

                  {/* 标签 */}
                  <div className="flex gap-2 shrink-0">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono tracking-wider text-white/25 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 箭头 */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hidden md:block text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
                  >
                    <path d="M4 7H10M10 7L7 4M10 7L7 10" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <motion.div
              className="text-center py-20 text-white/30 font-mono text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              {t('articles.empty')}
            </motion.div>
          )}
        </div>
        )}
      </section>

      {/* 页脚 */}
      <PageFooter />
    </main>
  );
}
