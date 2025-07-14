'use client';

import Image from "next/image";
import InteractiveText from '@/components/InteractiveText';
import NavButton from '@/components/NavButton';
import { useLanguage } from '@/hooks/useLanguage';
import { ContentItem } from '@/components/InteractiveText';
import { getLocalizedData } from '@/data/localizedData';

export default function Home() {
  const { locale, t, isClient } = useLanguage();
  const introData = isClient ? getLocalizedData(locale, 'introtext') : null;

  return (
    <main className="min-h-screen bg-white">
      <div className="p-4 md:p-16 text-black/87 max-w-6xl 2xl:max-w-[1440px]">
        {isClient && introData && (
          <InteractiveText data={introData as ContentItem} />
        )}
      </div>
      <NavButton />
     
    </main>
  );
}
