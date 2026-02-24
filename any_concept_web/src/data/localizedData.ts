import { Project } from './projects';
import { CraftDetail } from './crafts';

// 接受 string 以兼容 next-intl 的 useLocale() 返回值
type Locale = string;

// 静态导入所有数据模块（支持 SSR）
import { projectData as projectsZh } from './projects';
import { projectData as projectsEn } from './projects_en';
import { craftData as craftsZh } from './crafts';
import { craftData as _craftsEn } from './crafts_en';

// 中英文 CraftDetail 的 type 字段字面量不同，统一到 zh 接口
const craftsEn = _craftsEn as unknown as CraftDetail[];

// 同步获取数据（替代原有的动态 import 异步版本）
function getProjects(locale: Locale): Project[] {
  return locale === 'zh' ? projectsZh : (projectsEn as unknown as Project[]);
}

function getCrafts(locale: Locale): CraftDetail[] {
  return locale === 'zh' ? craftsZh : craftsEn;
}

// Projects 同步 API
export function getAllProjectsSync(locale: Locale): Project[] {
  return getProjects(locale);
}

export function getProjectBySlugSync(locale: Locale, slug: string): Project | undefined {
  return getProjects(locale).find((p) => p.slug === slug);
}

export function getAllProjectSlugsSync(locale: Locale): string[] {
  return getProjects(locale)
    .filter((p) => p.slug)
    .map((p) => p.slug!);
}

// Crafts 同步 API
export function getAllCraftsSync(locale: Locale): CraftDetail[] {
  return getCrafts(locale);
}

export function getCraftDetailSync(locale: Locale, slug: string): CraftDetail | undefined {
  return getCrafts(locale).find((c) => c.slug === slug);
}

export function getAllCraftSlugsSync(locale: Locale): string[] {
  return getCrafts(locale)
    .filter((c) => c.slug && !c.externalLink)
    .map((c) => c.slug);
}

