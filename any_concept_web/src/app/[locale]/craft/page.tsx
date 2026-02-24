import type { Metadata } from 'next';
import CraftContent from './CraftContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return {
    title: 'Craft',
    description: isZh
      ? 'Klauden 的设计作品 — UI 设计、品牌视觉、方案设计等精选作品集。'
      : 'Klauden\'s design work — selected UI design, brand visual, and solution design works.',
    alternates: {
      canonical: `https://klauden.xyz/${locale}/craft`,
      languages: { zh: '/zh/craft', en: '/en/craft' },
    },
  };
}

export default function CraftPage() {
  return <CraftContent />;
}
