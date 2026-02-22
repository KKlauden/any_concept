'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MouseGlow from '@/components/MouseGlow';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import ProjectItem from './ProjectItem';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedData } from '@/data/localizedData';

export default function ProjectsPage() {
  const { locale, isClient, t } = useLanguage();
  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

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
    <main className="relative z-10 min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="dot-grid" aria-hidden="true" />
      <MouseGlow />

      <PageHeader
        backHref="/"
        backText="KLAUDEN"
        rightContent={!loading && <>{projects.length} PROJECTS</>}
      />

      {/* 页面标题区 */}
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
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: 'left' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1
            className="font-display font-extrabold leading-[0.85] tracking-[-0.05em] text-foreground"
            style={{ fontSize: 'clamp(44px, 14vw, 148px)', overflowWrap: 'break-word' }}
          >
            PROJECTS
          </h1>
        </motion.div>
      </section>

      {/* 项目列表 */}
      <section className="px-6 md:px-20 lg:px-28 mt-16 md:mt-24">
        {loading ? (
          <div className="min-h-[50vh]" />
        ) : (
          <div className="flex flex-col gap-1">
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
        )}
      </section>

      <PageFooter />
    </main>
  );
}
