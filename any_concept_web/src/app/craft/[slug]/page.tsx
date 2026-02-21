'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';
const NavButton = dynamic(() => import('@/components/NavButton'), { ssr: false });
import { notFound, useParams } from 'next/navigation';
import MediaRenderer from './MediaRenderer';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedData } from '@/data/localizedData';

// 详情页面组件
export default function CraftDetailPage() {
  const params = useParams();
  const { locale, isClient, t } = useLanguage();
  const [craftData, setCraftData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [prevCraft, setPrevCraft] = useState<any>(null);
  const [nextCraft, setNextCraft] = useState<any>(null);
  const slug = params?.slug as string;

  useEffect(() => {
    if (isClient && slug) {
      const fetchData = async () => {
        setLoading(true);
        const craftsModule = await getLocalizedData(locale, 'crafts');

        // 并行请求作品数据和全部作品列表
        const [data, allCrafts] = await Promise.all([
          craftsModule.getCraftDetail(slug),
          craftsModule.getAllCrafts(),
        ]);

        if (!data || data.externalLink) {
          notFound();
        }

        // 筛选掉有externalLink的作品，因为它们不会有详情页
        const internalCrafts = allCrafts.filter((craft: { externalLink?: string }) => !craft.externalLink);
        const currentIndex = internalCrafts.findIndex((c: { slug: string }) => c.slug === slug);
        setPrevCraft(currentIndex > 0 ? internalCrafts[currentIndex - 1] : null);
        setNextCraft(currentIndex < internalCrafts.length - 1 ? internalCrafts[currentIndex + 1] : null);

        setCraftData(data);
        setLoading(false);
      };
      
      fetchData();
    }
  }, [locale, isClient, slug]);

  if (!craftData && !loading) {
    notFound();
  }

  return (
    <main className="bg-white text-black/87 min-h-screen pb-36">
      <div className="max-w-[1034px] mx-auto pt-16 md:pt-32 px-2 md:px-16 xl:px-0">
        {loading ? (
          // 使用空白页面而非骨架屏
          <div className="min-h-[80vh]"></div>
        ) : (
          <>
            {/* 顶部导航 */}
            <div className="font-jetbrains-mono">
              <div className=" text-sm md:text-base leading-none">(01) {t('nav.craft')}</div>
              
              {/* 标题 */}
              <h1 className="text-4xl md:text-6xl font-bold my-1 md:my-3 leading-tight max-w-2xl">{craftData.title}</h1>
              
              {/* 面包屑导航 */}
              <div className="flex items-center space-x-2 text-xs md:text-sm text-black/54 leading-none">
                <Link href="/" className="hover:underline">{t('nav.home')}</Link>
                <span>/</span>
                <Link href="/craft" className="hover:underline">{t('nav.craft')}</Link>
                <span>/</span>
                <span>{craftData.title}</span>
              </div>
            </div>

            {/* 主要内容区域 */}
            <div className="my-12 md:my-24">
              
              {/* 图片/视频组合 - 支持视频文件 */}
              <div className="flex flex-col">
                {craftData.images?.map((image: any, index: number) => (
                  <div key={index} className="w-full mb-0">
                    {/* 使用响应式容器 */}
                    <div className="w-full">
                      <MediaRenderer 
                        src={image.src}
                        alt={image.alt || `${craftData.title} - ${t('craft.image')} ${index + 1}`}
                        priority={index < 3}
                      />
                    </div>
                    
                    {image.caption && (
                      <p className="text-sm text-black/54 text-center font-jetbrains-mono">{image.caption}</p>
                    )}
                  </div>
                ))}
              </div>
              
              {/* 作品导航按钮 */}
              <div className="mt-20 flex justify-between font-jetbrains-mono">
                {prevCraft ? (
                  <Link
                    href={`/craft/${prevCraft.slug}`}
                    className="flex items-center group hover:text-black text-black/60 transition-colors rounded-lg focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2"
                  >
                    <svg
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 transition-transform group-hover:-translate-x-1"
                    >
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>
                      <div className="text-sm uppercase">{t('craft.previousCraft')}</div>
                      <div className="text-xs font-medium">{prevCraft.title}</div>
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}

                {nextCraft ? (
                  <Link
                    href={`/craft/${nextCraft.slug}`}
                    className="flex items-center group hover:text-black text-black/60 transition-colors text-right rounded-lg focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2"
                  >
                    <div>
                      <div className="text-sm uppercase">{t('craft.nextCraft')}</div>
                      <div className="text-xs font-medium">{nextCraft.title}</div>
                    </div>
                    <svg
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <NavButton />
    </main>
  );
} 