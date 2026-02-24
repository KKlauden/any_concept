import type { Metadata } from 'next';
import ProjectsContent from './ProjectsContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return {
    title: 'Projects',
    description: isZh
      ? 'Klauden 的项目作品集 — 涵盖 Web 应用、移动应用、AI 工具等全栈项目。'
      : 'Klauden\'s project portfolio — full-stack projects including web apps, mobile apps, and AI tools.',
    alternates: {
      canonical: `https://klauden.xyz/${locale}/projects`,
      languages: { zh: '/zh/projects', en: '/en/projects' },
    },
  };
}

export default function ProjectsPage() {
  return <ProjectsContent />;
}
