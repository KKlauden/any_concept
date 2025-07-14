"use client";

import NavButton from '@/components/NavButton';
import { getAllProjects } from '@/data/projects';
import ProjectItem from './ProjectItem';
 
export default function ProjectsPage() {
  // 获取所有项目数据
  const projects = getAllProjects();

  return (
    <main className="min-h-screen bg-white text-black/87 pb-36">
      <div className="max-w-[684px] mx-auto pt-12 md:pt-28 px-4 md:px-6">
      
        {/* 项目列表 */}
        <div className="mt-8 flex flex-col gap-2">
          {projects.map((project, index) => (
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
          ))}
        </div>
      </div>
      <NavButton />
    </main>
  );
} 