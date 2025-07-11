import Image from "next/image";
import Link from "next/link";
import NavButton from '@/components/NavButton';
import { notFound } from 'next/navigation';
import { getCraftDetail, getAllCraftSlugs, CraftImage } from '../../../data/crafts';
import MediaRenderer from './MediaRenderer';

// 生成静态路由参数
export async function generateStaticParams() {
  const slugs = getAllCraftSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

// 详情页面组件 - 正确处理params
export default function CraftDetailPage({ params }: { params: { slug: string } }) {
  // params.slug已经是字符串，不需要await
  const { slug } = params;
  const craftData = getCraftDetail(slug);
  
  // 如果找不到数据或者作品配置为外部链接，则返回404
  if (!craftData || craftData.externalLink) {
    notFound();
  }

  return (
    <main className="bg-white text-black/87 min-h-screen pb-36">
      <div className="max-w-[1034px] mx-auto pt-16 md:pt-32 px-2 md:px-16 xl:px-0">
        {/* 顶部导航 */}
        <div className="font-jetbrains-mono">
          <div className=" text-sm md:text-base leading-none">(01) CRAFT</div>
          
          {/* 标题 */}
          <h1 className="text-4xl md:text-6xl font-bold my-1 md:my-3 leading-tight max-w-2xl">{craftData.title}</h1>
          
          {/* 面包屑导航 */}
          <div className="flex items-center space-x-2 text-xs md:text-sm text-black/54 leading-none">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <Link href="/craft" className="hover:underline">CRAFT</Link>
            <span>/</span>
            <span>{craftData.title}</span>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="my-12 md:my-24">
          
          {/* 图片/视频组合 - 支持视频文件 */}
          <div className="flex flex-col">
            {craftData.images?.map((image: CraftImage, index: number) => (
              <div key={index} className="w-full mb-0">
                {/* 使用响应式容器 */}
                <div className="w-full">
                  <MediaRenderer 
                    src={image.src}
                    alt={image.alt || `${craftData.title} - 图片 ${index + 1}`}
                    priority={index < 3}
                  />
                </div>
                
                {image.caption && (
                  <p className="text-sm text-black/54 text-center font-jetbrains-mono">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>

         
      </div>
      <NavButton />
    </main>
  );
} 