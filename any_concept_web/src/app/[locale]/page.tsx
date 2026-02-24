import type { Metadata } from 'next';
import HomeContent from './HomeContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return {
    title: 'Klauden — Full-Stack Designer',
    description: isZh
      ? 'Klauden 的个人网站。全栈设计师，专注于 UI/UX 设计与前端开发，基于上海。'
      : 'Personal website of Klauden. Full-Stack Designer specializing in UI/UX design and frontend development, based in Shanghai.',
    alternates: {
      canonical: `https://klauden.xyz/${locale}`,
      languages: { zh: '/zh', en: '/en' },
    },
  };
}

export default function Home() {
  return <HomeContent />;
}
