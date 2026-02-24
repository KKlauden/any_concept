import type { Metadata } from 'next';
import { getCraftDetail } from '@/data/crafts';
import CraftDetailContent from './CraftDetailContent';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const craft = await getCraftDetail(slug);

  if (!craft) {
    return { title: 'Craft Not Found' };
  }

  return {
    title: craft.title,
    description: craft.description,
    openGraph: {
      title: craft.title,
      description: craft.description,
      type: 'article',
      ...(craft.coverImage && {
        images: [{ url: craft.coverImage }],
      }),
    },
    alternates: {
      canonical: `https://klauden.xyz/${locale}/craft/${slug}`,
      languages: {
        zh: `/zh/craft/${slug}`,
        en: `/en/craft/${slug}`,
      },
    },
  };
}

export default function CraftDetailPage() {
  return <CraftDetailContent />;
}
