'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import dynamic from "next/dynamic";
const NavButton = dynamic(() => import("@/components/NavButton"), { ssr: false });
import MediaRenderer from "./MediaRenderer";
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedData } from '@/data/localizedData';

// 可复用的标题组件
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className=" font-medium text-sm mb-2  text-black/54">{children}</h2>
);

// 可复用的列表组件
const ItemList = ({ items }: { items: string[] }) => (
  <ul className="list-disc pl-5 space-y-2 text-sm">
    {items.map((item, index) => (
      <li key={index} className="">{item}</li>
    ))}
  </ul>
);

// 可复用的引用列表组件
const ReferenceList = ({ references }: { references: { title: string; source: string }[] }) => (
  <ul className="list-disc pl-5 space-y-2 text-sm">
    {references.map((reference, index) => (
      <li key={index} className="">
        <span className="">{reference.title}</span>
        {reference.source && (
          <span className="text-black/54 ml-2 text-sm">
            — {reference.source}
          </span>
        )}
      </li>
    ))}
  </ul>
);

// 可复用的元数据标题组件
const MetadataTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xs uppercase text-black/54 mb-1 ">{children}</h3>
);

// 可复用的区块组件
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </section>
);

// 项目详情页面组件
export default function ProjectDetailPage() {
  const params = useParams();
  const { locale, isClient, t } = useLanguage();
  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [prevProject, setPrevProject] = useState<any>(null);
  const [nextProject, setNextProject] = useState<any>(null);
  const slug = params?.slug as string;

  useEffect(() => {
    if (isClient && slug) {
      const fetchData = async () => {
        setLoading(true);
        const projectsModule = await getLocalizedData(locale, 'projects');

        // 并行请求项目数据和全部项目列表
        const [data, allProjects] = await Promise.all([
          projectsModule.getProjectBySlug(slug),
          projectsModule.getAllProjects(),
        ]);

        if (!data) {
          notFound();
        }

        const currentIndex = allProjects.findIndex((p: { slug: string }) => p.slug === slug);
        setPrevProject(currentIndex > 0 ? allProjects[currentIndex - 1] : null);
        setNextProject(currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null);

        setProjectData(data);
        setLoading(false);
      };
      
      fetchData();
    }
  }, [locale, isClient, slug]);

  if (!projectData && !loading) {
    notFound();
  }

  // 提取技术栈
  const techStack = projectData?.techStack || [];

  return (
    <main className="bg-white text-black/87 min-h-screen pb-36">
      <div className="max-w-[1034px] mx-auto pt-16 md:pt-24 px-4 md:px-16 xl:px-8">
        {loading ? (
          // 使用空白页面而非骨架屏
          <div className="min-h-[80vh]"></div>
        ) : (
          <>
            {/* 顶部导航和标题 */}
            <div className="font-jetbrains-mono">
              <div className="text-sm md:text-base leading-none text-black/54">
                (02) {t('nav.projects')}
              </div>

              {/* 项目标题 */}
              <h1 className="text-4xl md:text-6xl font-bold my-3 md:my-6 leading-tight">
                {projectData.title}
              </h1>

              {/* 面包屑导航 */}
              <div className="flex items-center space-x-2 text-xs md:text-sm text-black/54 leading-none">
                <Link href="/" className="hover:underline">
                  {t('nav.home')}
                </Link>
                <span>/</span>
                <Link href="/projects" className="hover:underline">
                  {t('nav.projects')}
                </Link>
                <span>/</span>
                <span className="text-black/87">{projectData.title}</span>
              </div>
            </div>

            {/* 项目信息卡片 */}
            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 左侧：项目元数据 */}
              <div className="col-span-1">
                <div className="bg-zinc-50 p-6 rounded-xl space-y-6">
                  {/* 项目类型 */}
                  <div>
                    <MetadataTitle>{t('projects.projectType')}</MetadataTitle>
                    <p className="text-sm font-medium">{projectData.projectType}</p>
                  </div>

                  {/* 技术栈 */}
                  <div>
                    <MetadataTitle>{t('projects.techStack')}</MetadataTitle>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech: string, index: number) => (
                        <span
                          key={index}
                          className="text-xs bg-white px-2 py-1 rounded-md border border-zinc-200 font-jetbrains-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 角色 */}
                  {projectData.role && (
                    <div>
                      <MetadataTitle>{t('projects.role')}</MetadataTitle>
                      <p className="text-sm">{projectData.role}</p>
                    </div>
                  )}

                  {/* 团队规模 */}
                  {projectData.teamSize && (
                    <div>
                      <MetadataTitle>{t('projects.teamSize')}</MetadataTitle>
                      <p className="text-sm">{projectData.teamSize} {t('projects.teamSizeSuffix')}</p>
                    </div>
                  )}

                  {/* 项目周期 */}
                  {projectData.duration && (
                    <div>
                      <MetadataTitle>{t('projects.duration')}</MetadataTitle>
                      <p className="text-sm">{projectData.duration}</p>
                    </div>
                  )}

                  {/* 外部链接 */}
                  <div className="pt-2 space-y-2">
                    {projectData.link && (
                      <a
                        href={projectData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center font-medium text-black/87 hover:underline"
                      >
                        {t('projects.visitWebsite')}
                        <svg
                          aria-hidden="true"
                          className="ml-1 h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                    {projectData.repo && (
                      <a
                        href={projectData.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center font-medium text-black/87 hover:underline"
                      >
                        {t('projects.viewCode')}
                        <svg
                          aria-hidden="true"
                          className="ml-1 h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* 右侧：项目详情 */}
              <div className="col-span-1 md:col-span-2 space-y-10 text-black/87 max-w-[560px]">
                {/* 项目描述 */}
                <Section title={t('projects.overview')}>
                  <p className=" leading-relaxed text-sm">
                    {projectData.detailDescription || projectData.description}
                  </p>
                </Section>

                {/* 项目亮点 */}
                {projectData.highlights && projectData.highlights.length > 0 && (
                  <Section title={t('projects.highlights')}>
                    <ItemList items={projectData.highlights} />
                  </Section>
                )}

                {/* 项目挑战 */}
                {projectData.challenges && projectData.challenges.length > 0 && (
                  <Section title={t('projects.challenges')}>
                    <ItemList items={projectData.challenges} />
                  </Section>
                )}

                {/* 项目解决方案 */}
                {projectData.solutions && projectData.solutions.length > 0 && (
                  <Section title={t('projects.solutions')}>
                    <ItemList items={projectData.solutions} />
                  </Section>
                )}

                {/* 参考文献 */}
                {projectData.references && projectData.references.length > 0 && (
                  <Section title={t('projects.references')}>
                    <ReferenceList references={projectData.references} />
                  </Section>
                )}
              </div>
            </div>

            {/* 项目图片/视频 */}
            {projectData.images && projectData.images.length > 0 && (
              <div className="mt-16 space-y-6">
                {projectData.images.map((image: any, index: number) => (
                  <div key={index} className="w-full">
                    <MediaRenderer
                      src={image.src}
                      alt={image.alt || `${projectData.title} - ${t('projects.image')} ${index + 1}`}
                      isVideo={image.isVideo}
                      priority={index < 2}
                    />
                    {image.caption && (
                      <p className="mt-1 text-xs text-center text-black/54">
                        {image.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 项目导航按钮 */}
            <div className="mt-20 flex justify-between font-jetbrains-mono">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
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
                    <div className="text-sm uppercase">{t('projects.previousProject')}</div>
                    <div className="text-xs font-medium">{prevProject.title}</div>
                  </div>
                </Link>
              ) : (
                <div></div>
              )}
              
              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="flex items-center group hover:text-black text-black/60 transition-colors text-right rounded-lg focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2"
                >
                  <div>
                    <div className="text-sm uppercase">{t('projects.nextProject')}</div>
                    <div className="text-xs font-medium">{nextProject.title}</div>
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
          </>
        )}
      </div>
      <NavButton />
    </main>
  );
}


