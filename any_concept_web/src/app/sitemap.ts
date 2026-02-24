import type { MetadataRoute } from 'next';
import { getAllProjectSlugs } from '@/data/projects';
import { getAllCraftSlugs } from '@/data/crafts';
import { articles } from '#site/content';

const baseUrl = 'https://klauden.xyz';
const locales = ['zh', 'en'] as const;

function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      locales.map((l) => [l, `${baseUrl}/${l}${path}`])
    ),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // 静态页面
  const staticPaths = ['', '/projects', '/articles', '/craft'];
  for (const path of staticPaths) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'monthly' : path === '/articles' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
        alternates: alternates(path),
      });
    }
  }

  // 项目详情页
  const projectSlugs = await getAllProjectSlugs();
  for (const slug of projectSlugs) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: alternates(`/projects/${slug}`),
      });
    }
  }

  // 作品详情页
  const craftSlugs = await getAllCraftSlugs();
  for (const slug of craftSlugs) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/craft/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: alternates(`/craft/${slug}`),
      });
    }
  }

  // 文章详情页
  const publishedArticles = articles.filter((a) => !a.draft);
  for (const article of publishedArticles) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/articles/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'yearly',
        priority: 0.7,
        alternates: alternates(`/articles/${article.slug}`),
      });
    }
  }

  return entries;
}
