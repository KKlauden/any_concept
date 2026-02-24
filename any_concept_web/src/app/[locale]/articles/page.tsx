import type { Metadata } from 'next';
import ArticlesContent from './ArticlesContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return {
    title: 'Articles',
    description: isZh
      ? 'Klauden 的技术文章 — 关于 AI、设计、编程的思考与实践。'
      : 'Klauden\'s articles — thoughts and practices on AI, design, and programming.',
    alternates: {
      canonical: `https://klauden.xyz/${locale}/articles`,
      languages: { zh: '/zh/articles', en: '/en/articles' },
    },
  };
}

export default function ArticlesPage() {
  return <ArticlesContent />;
}
