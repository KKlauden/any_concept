'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';
const NavButton = dynamic(() => import('@/components/NavButton'), { ssr: false });
import WorkItem from "@/components/WorkItem";
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedData } from '@/data/localizedData';

export default function CraftPage() {
  const { locale, isClient } = useLanguage();
  
  // 获取本地化的作品数据
  const [works, setWorks] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  
  // 当客户端渲染或语言变更时获取数据
  React.useEffect(() => {
    if (isClient) {
      const fetchData = async () => {
        const craftsModule = await getLocalizedData(locale, 'crafts');
        const worksData = await craftsModule.getAllCrafts();
        setWorks(worksData);
        setLoading(false);
      };
      
      fetchData();
    }
  }, [locale, isClient]);

  return (
    <main className="bg-white text-black/87 min-h-screen p-2 pb-36">
      <h1 className="sr-only">Craft</h1>
      {/* 作品网格 */}
      <section className="mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-2">
          {loading ? (
            // 使用空白页面而非骨架屏
            <div className="min-h-[70vh]"></div>
          ) : (
            works.map((work) => (
              <div key={work.id} className="mb-2 break-inside-avoid">
                <WorkItem 
                  title={work.title}
                  year={work.year}
                  coverImage={work.coverImage}
                  height={work.height}
                  aspectRatio={work.aspectRatio}
                  type={work.type}
                  textColor={work.textColor}
                  textPosition={work.textPosition}
                  hasExternal={work.hasExternal}
                  externalText={work.externalText}
                  link={work.externalLink}
                  slug={!work.externalLink ? work.slug : undefined}
                />
              </div>
            ))
          )}
        </div>
      </section>
      <NavButton />
      
    </main>
  );
} 