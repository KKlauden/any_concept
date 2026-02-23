import { Locale } from '@/i18n/locales';

// 通用接口，避免中英文版本的类型冲突
interface LocalizedCrafts {
  getAllCrafts: () => Promise<any[]>;
  getCraftDetail: (slug: string) => Promise<any | undefined>;
  getAllCraftSlugs: () => Promise<string[]>;
}

interface LocalizedProjects {
  getAllProjects: () => Promise<any[]>;
  getProjectBySlug: (slug: string) => Promise<any | undefined>;
  getProjectById: (id: string) => Promise<any | undefined>;
  getAllProjectSlugs: () => Promise<string[]>;
}

type LocalizedDataKey = 'crafts' | 'projects';

// 函数重载：根据 key 推断返回类型
export async function getLocalizedData(locale: Locale, key: 'crafts'): Promise<LocalizedCrafts>;
export async function getLocalizedData(locale: Locale, key: 'projects'): Promise<LocalizedProjects>;
export async function getLocalizedData(locale: Locale, key: LocalizedDataKey) {
  switch (key) {
    case 'crafts':
      return locale === 'zh'
        ? await import('./crafts') as unknown as LocalizedCrafts
        : await import('./crafts_en') as unknown as LocalizedCrafts;
    case 'projects':
      return locale === 'zh'
        ? await import('./projects') as unknown as LocalizedProjects
        : await import('./projects_en') as unknown as LocalizedProjects;
    default:
      throw new Error(`Unknown data key: ${key}`);
  }
};
