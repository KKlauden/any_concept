'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { notFound, useParams } from 'next/navigation';
import MediaRenderer from './MediaRenderer';
import MouseGlow from '@/components/MouseGlow';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedData } from '@/data/localizedData';

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

        const [data, allProjects] = await Promise.all([
          projectsModule.getProjectBySlug(slug),
          projectsModule.getAllProjects(),
        ]);

        if (!data) {
          notFound();
        }

        const currentIndex = allProjects.findIndex(
          (p: { slug: string }) => p.slug === slug
        );
        setPrevProject(
          currentIndex > 0 ? allProjects[currentIndex - 1] : null
        );
        setNextProject(
          currentIndex < allProjects.length - 1
            ? allProjects[currentIndex + 1]
            : null
        );

        setProjectData(data);
        setLoading(false);
      };
      fetchData();
    }
  }, [locale, isClient, slug]);

  if (!projectData && !loading) {
    notFound();
  }

  const techStack = projectData?.techStack || [];

  return (
    <main className="relative z-10 min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="dot-grid" aria-hidden="true" />
      <MouseGlow />

      <PageHeader backHref="/projects" backText="BACK TO PROJECTS" />

      {loading ? (
        <div className="min-h-[80vh]" />
      ) : (
        <>
          {/* 项目头部 */}
          <section className="px-6 md:px-20 lg:px-28 pt-16 md:pt-24">
            <motion.div
              className="text-[9px] font-mono tracking-[0.25em] text-white/25 uppercase mb-6 md:mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              002 — {t('nav.projects')}
            </motion.div>

            <motion.div
              className="h-px bg-white/10 mb-10 md:mb-14"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ transformOrigin: 'left' }}
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <h1
                className="font-display font-extrabold leading-[1] tracking-[-0.04em] text-foreground max-w-4xl"
                style={{ fontSize: 'clamp(28px, 6vw, 80px)' }}
              >
                {projectData.title}
              </h1>
              <div className="flex items-center gap-6 mt-4">
                {projectData.projectType && (
                  <span className="meta-label">{projectData.projectType}</span>
                )}
                <span className="meta-label">{projectData.year}</span>
                {projectData.isWIP && (
                  <span className="text-[10px] font-mono tracking-wider text-accent/70 uppercase">
                    {t('projects.wip')}
                  </span>
                )}
              </div>
            </motion.div>
          </section>

          {/* 项目信息 — 两栏布局 */}
          <section className="px-6 md:px-20 lg:px-28 mt-16 md:mt-24">
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 md:gap-16">
              {/* 左侧：项目元数据 */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {/* 技术栈 */}
                {techStack.length > 0 && (
                  <div>
                    <h3 className="meta-label mb-3">
                      {t('projects.techStack')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech: string, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono tracking-wider px-2.5 py-1 border border-white/[0.08] text-white/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 角色 */}
                {projectData.role && (
                  <div>
                    <h3 className="meta-label mb-2">{t('projects.role')}</h3>
                    <p className="text-sm text-white/60">{projectData.role}</p>
                  </div>
                )}

                {/* 团队规模 */}
                {projectData.teamSize && (
                  <div>
                    <h3 className="meta-label mb-2">
                      {t('projects.teamSize')}
                    </h3>
                    <p className="text-sm text-white/60">
                      {projectData.teamSize} {t('projects.teamSizeSuffix')}
                    </p>
                  </div>
                )}

                {/* 项目周期 */}
                {projectData.duration && (
                  <div>
                    <h3 className="meta-label mb-2">
                      {t('projects.duration')}
                    </h3>
                    <p className="text-sm text-white/60">
                      {projectData.duration}
                    </p>
                  </div>
                )}

                {/* 外部链接 */}
                <div className="flex flex-col gap-3 pt-2">
                  {projectData.link && (
                    <a
                      href={projectData.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors duration-200"
                    >
                      {t('projects.visitWebsite')}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
                      </svg>
                    </a>
                  )}
                  {projectData.repo && (
                    <a
                      href={projectData.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors duration-200"
                    >
                      {t('projects.viewCode')}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>

              {/* 右侧：项目详情 */}
              <motion.div
                className="space-y-10"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {/* 项目描述 */}
                <div>
                  <h2 className="meta-label mb-4">{t('projects.overview')}</h2>
                  <p className="text-sm leading-relaxed text-white/60">
                    {projectData.detailDescription || projectData.description}
                  </p>
                </div>

                {/* 项目亮点 */}
                {projectData.highlights && projectData.highlights.length > 0 && (
                  <div>
                    <h2 className="meta-label mb-4">
                      {t('projects.highlights')}
                    </h2>
                    <ul className="space-y-2">
                      {projectData.highlights.map(
                        (item: string, i: number) => (
                          <li
                            key={i}
                            className="text-sm text-white/60 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-px before:bg-accent/50"
                          >
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* 项目挑战 */}
                {projectData.challenges &&
                  projectData.challenges.length > 0 && (
                    <div>
                      <h2 className="meta-label mb-4">
                        {t('projects.challenges')}
                      </h2>
                      <ul className="space-y-2">
                        {projectData.challenges.map(
                          (item: string, i: number) => (
                            <li
                              key={i}
                              className="text-sm text-white/60 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-px before:bg-white/20"
                            >
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* 解决方案 */}
                {projectData.solutions &&
                  projectData.solutions.length > 0 && (
                    <div>
                      <h2 className="meta-label mb-4">
                        {t('projects.solutions')}
                      </h2>
                      <ul className="space-y-2">
                        {projectData.solutions.map(
                          (item: string, i: number) => (
                            <li
                              key={i}
                              className="text-sm text-white/60 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-px before:bg-accent/50"
                            >
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* 参考文献 */}
                {projectData.references &&
                  projectData.references.length > 0 && (
                    <div>
                      <h2 className="meta-label mb-4">
                        {t('projects.references')}
                      </h2>
                      <ul className="space-y-2">
                        {projectData.references.map(
                          (
                            ref: { title: string; source: string },
                            i: number
                          ) => (
                            <li
                              key={i}
                              className="text-sm text-white/60 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-px before:bg-white/20"
                            >
                              {ref.title}
                              {ref.source && (
                                <span className="text-white/25 ml-2">
                                  — {ref.source}
                                </span>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </motion.div>
            </div>
          </section>

          {/* 项目图片/视频 */}
          {projectData.images && projectData.images.length > 0 && (
            <section className="mt-16 md:mt-24 max-w-[1034px] mx-auto px-4 md:px-8 xl:px-0">
              <div className="flex flex-col gap-1">
                {projectData.images.map((image: any, index: number) => (
                  <motion.div
                    key={index}
                    className="w-full border border-white/[0.04]"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.5,
                      delay: index < 3 ? index * 0.1 : 0,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <MediaRenderer
                      src={image.src}
                      alt={
                        image.alt ||
                        `${projectData.title} - ${t('projects.image')} ${index + 1}`
                      }
                      isVideo={image.isVideo}
                      priority={index < 2}
                    />
                    {image.caption && (
                      <p className="text-xs font-mono text-white/20 tracking-wider px-4 py-3">
                        {image.caption}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* 上一个/下一个导航 */}
          <nav className="px-6 md:px-20 lg:px-28 mt-20 md:mt-32">
            <motion.div
              className="h-px bg-white/10 mb-8 md:mb-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ transformOrigin: 'left' }}
            />

            <div className="flex justify-between items-center">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group flex items-center gap-3"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent transition-transform duration-300 group-hover:-translate-x-2"
                  >
                    <path d="M15 18L9 12L15 6" />
                  </svg>
                  <div>
                    <div className="meta-label mb-1">
                      {t('projects.previousProject')}
                    </div>
                    <div className="font-display font-bold text-lg md:text-2xl text-foreground group-hover:text-accent transition-colors duration-200">
                      {prevProject.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group flex items-center gap-3 text-right"
                >
                  <div>
                    <div className="meta-label mb-1">
                      {t('projects.nextProject')}
                    </div>
                    <div className="font-display font-bold text-lg md:text-2xl text-foreground group-hover:text-accent transition-colors duration-200">
                      {nextProject.title}
                    </div>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent transition-transform duration-300 group-hover:translate-x-2"
                  >
                    <path d="M9 18L15 12L9 6" />
                  </svg>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </nav>

          <PageFooter />
        </>
      )}
    </main>
  );
}
