import Image from "next/image";
import Link from "next/link";
import NavButton from '@/components/NavButton';
import WorkItem from "@/components/WorkItem";
import { getAllCrafts } from '../../data/crafts';

export default async function CraftPage() {
  // 获取所有作品数据
  const works = await getAllCrafts();

  return (
    <main className="bg-white text-black/87 min-h-screen p-2 pb-36">  
      
      {/* 作品网格 */}
      <section className="mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-2">
          {works.map((work) => (
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
          ))}
        </div>
      </section>
      <NavButton />
      
    </main>
  );
} 