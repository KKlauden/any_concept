import type { Metadata } from 'next';
import { getProjectBySlug } from '@/data/projects';
import ProjectDetailContent from './ProjectDetailContent';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
    },
    alternates: {
      canonical: `https://klauden.xyz/${locale}/projects/${slug}`,
      languages: {
        zh: `/zh/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
  };
}

export default function ProjectDetailPage() {
  return <ProjectDetailContent />;
}
