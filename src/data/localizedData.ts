import { Locale } from '@/i18n/locales';
import introDataZh from './introtext.json';
import introDataEn from './introtext_en.json';
import * as craftsZh from './crafts';
import * as craftsEn from './crafts_en';
import * as projectsZh from './projects';
import * as projectsEn from './projects_en';

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

interface LocalizedData {
  introtext: any;
  crafts: LocalizedCrafts;
  projects: LocalizedProjects;
  // 添加其他需要本地化的数据
}

const localizedData: Record<Locale, LocalizedData> = {
  zh: {
    introtext: introDataZh,
    crafts: craftsZh as unknown as LocalizedCrafts,
    projects: projectsZh as unknown as LocalizedProjects,
  },
  en: {
    introtext: introDataEn,
    crafts: craftsEn as unknown as LocalizedCrafts,
    projects: projectsEn as unknown as LocalizedProjects,
  }
};

export const getLocalizedData = (locale: Locale, key: keyof LocalizedData) => {
  return localizedData[locale][key];
};

export default localizedData; 