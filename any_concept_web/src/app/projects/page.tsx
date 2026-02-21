'use client';

import React from 'react';
import dynamic from 'next/dynamic';
const NavButton = dynamic(() => import('@/components/NavButton'), { ssr: false });
import ProjectItem from './ProjectItem';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedData } from '@/data/localizedData';
 
export default function ProjectsPage() {
  const { locale, isClient } = useLanguage();
  
  // 获取本地化的项目数据
  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  
  // 当客户端渲染或语言变更时获取数据
  React.useEffect(() => {
    if (isClient) {
      const fetchData = async () => {
        const projectsModule = await getLocalizedData(locale, 'projects');
        const projectsData = await projectsModule.getAllProjects();
        setProjects(projectsData);
        setLoading(false);
      };
      
      fetchData();
    }
  }, [locale, isClient]);

  return (
    <main className="min-h-screen bg-white text-black/87 pb-36">
      <h1 className="sr-only">Projects</h1>
      <div className="max-w-[684px] mx-auto pt-12 md:pt-28 px-4 md:px-6">

        {/* 项目列表 */}
        <div className="mt-8 flex flex-col gap-2">
          {loading ? (
            // 使用空白页面而非骨架屏
            <div className="min-h-[60vh]"></div>
          ) : (
            projects.map((project, index) => (
              <ProjectItem 
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                year={project.year}
                link={project.link}
                repo={project.repo}
                isWIP={project.isWIP}
                index={index}
              />
            ))
          )}
        </div>
      </div>
      <NavButton />
    </main>
  );
} 