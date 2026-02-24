import type { Metadata } from 'next';
import { articles } from '#site/content';
import ArticleDetailContent from './ArticleDetailContent';
import JsonLd from '@/components/JsonLd';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// 构建时预生成所有文章页面（SSG）
export function generateStaticParams() {
  const slugs = [...new Set(articles.filter((a) => !a.draft).map((a) => a.slug))];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = articles.find((a) => a.slug === slug && !a.draft);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.title,
    description: article.description || `${article.title} — Klauden`,
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.description || `${article.title} — Klauden`,
      type: 'article',
      publishedTime: article.date,
      tags: article.tags,
    },
    alternates: {
      canonical: `https://klauden.xyz/${locale}/articles/${slug}`,
      languages: {
        zh: `/zh/articles/${slug}`,
        en: `/en/articles/${slug}`,
      },
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const article = articles.find((a) => a.slug === slug && !a.draft);

  return (
    <>
      {article && (
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.description,
          datePublished: article.date,
          inLanguage: locale,
          author: {
            '@type': 'Person',
            name: 'Klauden',
            url: 'https://klauden.xyz',
          },
          publisher: {
            '@type': 'Person',
            name: 'Klauden',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://klauden.xyz/${locale}/articles/${article.slug}`,
          },
          keywords: article.tags,
        }} />
      )}
      <ArticleDetailContent />
    </>
  );
}
