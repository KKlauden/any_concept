'use client';

import React from 'react';
import InteractiveText from '@/components/InteractiveText';
import dynamic from 'next/dynamic';
const NavButton = dynamic(() => import('@/components/NavButton'), { ssr: false });
import { useLanguage } from '@/hooks/useLanguage';
import { ContentItem } from '@/components/InteractiveText';
import { getLocalizedData } from '@/data/localizedData';

export default function Home() {
  const { locale, isClient } = useLanguage();
  const [introData, setIntroData] = React.useState<ContentItem | null>(null);

  React.useEffect(() => {
    if (isClient) {
      getLocalizedData(locale, 'introtext').then((data) => {
        setIntroData(data as ContentItem);
      });
    }
  }, [locale, isClient]);

  return (
    <main className="min-h-screen bg-white">
      <div className="p-4 md:p-16 text-black/87 max-w-6xl 2xl:max-w-[1440px]">
        {introData ? <InteractiveText data={introData} /> : null}
      </div>
      <NavButton />
    </main>
  );
}
