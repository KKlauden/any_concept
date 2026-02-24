# klauden.xyz SEO 优化实施方案

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**目标：** 为 klauden.xyz 建立完整的 SEO 基础设施，使搜索引擎能正确爬取和索引所有页面内容。

**架构思路：** 采用 SC wrapper + CC 内容的标准 Next.js 模式 — 每个 `page.tsx` 改为 Server Component 导出 metadata，交互逻辑下放到独立的 Client Component。同时添加 sitemap、robots、JSON-LD 结构化数据、Open Graph 等 SEO 基础设施。不改变 i18n 路由结构（保持客户端切换），仅在 metadata 层做优化。

**技术栈：** Next.js 15 App Router Metadata API、JSON-LD (schema.org)、Velite

**不改变的部分：**

- 所有页面的视觉效果和交互行为（动画、语言切换、数据加载方式）
- i18n 路由结构（保持当前 localStorage 模式，不引入 `[locale]` 前缀路由）
- 数据文件结构（projects.ts、crafts.ts 等）

---

## 当前问题总结

| 问题 | 严重程度 | 涉及文件 |
|------|---------|---------|
| 所有 `page.tsx` 都是 `'use client'`，无法导出 metadata | 致命 | 全部 7 个页面 |
| 无 sitemap.xml | 高 | 缺失 |
| 无 robots.txt | 高 | 缺失 |
| 全局 metadata 极简（仅 title + 有 typo 的 description） | 高 | `layout.tsx` |
| 无 Open Graph / Twitter Card | 中 | 缺失 |
| 无 JSON-LD 结构化数据 | 中 | 缺失 |
| 文章详情页内容被 `isClient` 守卫挡住，爬虫看到空白 | 高 | `articles/[slug]/page.tsx` |

---

## Task 1: 完善全局 Layout Metadata

**文件：**

- 修改: `any_concept_web/src/app/layout.tsx`

**说明：** 在 `layout.tsx` 中补全 `metadataBase`、`title.template`、完整 `description`、`openGraph`、`twitter` 等全局 metadata。这是所有子页面 metadata 的基础。

**Step 1: 更新 metadata 对象**

将 `layout.tsx` 中的 metadata 替换为：

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://klauden.xyz'),
  title: {
    default: 'Klauden — Full-Stack Designer',
    template: '%s | Klauden',
  },
  description: 'Klauden 的个人网站。全栈设计师，专注于 UI/UX 设计与前端开发，基于上海。',
  keywords: ['Klauden', 'Full-Stack Designer', 'UI/UX', '前端开发', '上海', 'Portfolio'],
  authors: [{ name: 'Klauden' }],
  creator: 'Klauden',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    siteName: 'Klauden',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

**Step 2: 验证构建**

```bash
cd any_concept_web && npm run build
```

预期：构建成功，无报错。

---

## Task 2: 添加 robots.ts

**文件：**

- 新建: `any_concept_web/src/app/robots.ts`

**说明：** 使用 Next.js App Router 的 file-based metadata 约定，创建 `robots.ts` 生成 robots.txt。

**Step 1: 创建 robots.ts**

```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://klauden.xyz/sitemap.xml',
  };
}
```

**Step 2: 验证**

```bash
cd any_concept_web && npm run build
```

构建成功后，访问 `/robots.txt` 应返回正确的 robots 规则。

---

## Task 3: 添加 sitemap.ts

**文件：**

- 新建: `any_concept_web/src/app/sitemap.ts`

**说明：** 动态生成 sitemap，包含所有静态页面 + 动态页面（项目、作品、文章）。使用数据文件中的 slug 列表。

**Step 1: 创建 sitemap.ts**

```typescript
import type { MetadataRoute } from 'next';
import { getAllProjectSlugs } from '@/data/projects';
import { getAllCraftSlugs } from '@/data/crafts';
import { articles } from '#site/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://klauden.xyz';

  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/articles`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/craft`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  // 项目详情页
  const projectSlugs = await getAllProjectSlugs();
  const projectPages: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // 作品详情页
  const craftSlugs = await getAllCraftSlugs();
  const craftPages: MetadataRoute.Sitemap = craftSlugs.map((slug) => ({
    url: `${baseUrl}/craft/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // 文章详情页
  const articlePages: MetadataRoute.Sitemap = articles
    .filter((a) => !a.draft)
    .map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    }));

  return [...staticPages, ...projectPages, ...craftPages, ...articlePages];
}
```

**注意：** `getAllProjectSlugs` 和 `getAllCraftSlugs` 当前是 async 函数，可以在 Server Component 中直接调用。需要确认从中文版数据文件导入即可（slug 在中英文版本中相同）。

**Step 2: 验证构建**

```bash
cd any_concept_web && npm run build
```

预期：构建成功。构建输出应显示 `/sitemap.xml` 路由。

---

## Task 4: 首页 page.tsx 拆分为 SC + CC

**文件：**

- 修改: `any_concept_web/src/app/page.tsx` → 改为 Server Component
- 新建: `any_concept_web/src/app/HomeContent.tsx` → Client Component（原有全部代码）

**说明：** 首页不使用 `useLanguage`，改造最简单。将现有 `page.tsx` 的全部内容移到 `HomeContent.tsx`，`page.tsx` 只导出 metadata 并渲染 `<HomeContent />`。

**Step 1: 创建 HomeContent.tsx**

将 `page.tsx` 的**全部内容**（包括 `'use client'`、所有 import、所有组件定义、`Home` 函数）移动到 `src/app/HomeContent.tsx`。仅将 `export default function Home()` 改为 `export default function HomeContent()`。

**Step 2: 重写 page.tsx**

```typescript
import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: 'Klauden — Full-Stack Designer',
  description: 'Klauden 的个人网站。全栈设计师，专注于 UI/UX 设计与前端开发，基于上海。',
};

export default function Home() {
  return <HomeContent />;
}
```

注意：`page.tsx` 中不要有 `'use client'`，因为它是 Server Component。`title` 用完整标题而非 template（因为这是首页，不需要 `| Klauden` 后缀）。

**Step 3: 验证**

```bash
cd any_concept_web && npm run dev
```

打开首页，确认所有功能正常：KineticLetter 动画、LiveClock、InteractiveText 展开、导航链接、CopyEmail。

---

## Task 5: 项目列表页 SC + CC 拆分 + Metadata

**文件：**

- 修改: `any_concept_web/src/app/projects/page.tsx` → Server Component
- 新建: `any_concept_web/src/app/projects/ProjectsContent.tsx` → Client Component

**Step 1: 创建 ProjectsContent.tsx**

将 `projects/page.tsx` 的全部内容移到 `ProjectsContent.tsx`，导出函数名改为 `ProjectsContent`。

**Step 2: 重写 projects/page.tsx**

```typescript
import type { Metadata } from 'next';
import ProjectsContent from './ProjectsContent';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Klauden 的项目作品集 — 涵盖 Web 应用、移动应用、AI 工具等全栈项目。',
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
```

**Step 3: 验证**

```bash
cd any_concept_web && npm run dev
```

打开 `/projects`，确认项目列表正常加载、语言切换正常。

---

## Task 6: 项目详情页 SC + CC 拆分 + generateMetadata

**文件：**

- 修改: `any_concept_web/src/app/projects/[slug]/page.tsx` → Server Component
- 新建: `any_concept_web/src/app/projects/[slug]/ProjectDetailContent.tsx` → Client Component

**说明：** 项目详情页需要 `generateMetadata` 动态生成每个项目的 title 和 description。由于项目数据存在中文版数据文件中，`generateMetadata` 直接调用 `getProjectBySlug`（服务端可直接 import 调用）。

**Step 1: 创建 ProjectDetailContent.tsx**

将 `projects/[slug]/page.tsx` 的全部内容（除了 `export default function ProjectDetailPage`）移到 `ProjectDetailContent.tsx`。注意 `MediaRenderer` 的 import 路径需要调整为 `./MediaRenderer`（同目录）。

**Step 2: 重写 projects/[slug]/page.tsx**

```typescript
import type { Metadata } from 'next';
import { getProjectBySlug } from '@/data/projects';
import ProjectDetailContent from './ProjectDetailContent';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
  };
}

export default function ProjectDetailPage() {
  return <ProjectDetailContent />;
}
```

**注意：** Next.js 15 中 `params` 是 `Promise`，需要 `await`。

**Step 3: 验证**

```bash
cd any_concept_web && npm run dev
```

打开任意项目详情页（如 `/projects/doc-chat`），确认：

- 页面功能正常（数据加载、图片、上下篇导航）
- 查看页面源代码，确认 `<title>` 标签包含项目名

---

## Task 7: 文章列表页 SC + CC 拆分 + Metadata

**文件：**

- 修改: `any_concept_web/src/app/articles/page.tsx` → Server Component
- 新建: `any_concept_web/src/app/articles/ArticlesContent.tsx` → Client Component

**Step 1: 创建 ArticlesContent.tsx**

将 `articles/page.tsx` 的全部内容移到 `ArticlesContent.tsx`。

**Step 2: 重写 articles/page.tsx**

```typescript
import type { Metadata } from 'next';
import ArticlesContent from './ArticlesContent';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Klauden 的技术文章 — 关于 AI、设计、编程的思考与实践。',
};

export default function ArticlesPage() {
  return <ArticlesContent />;
}
```

**Step 3: 验证**

打开 `/articles`，确认文章列表正常、语言过滤正常。

---

## Task 8: 文章详情页 SC + CC 拆分 + generateMetadata

**文件：**

- 修改: `any_concept_web/src/app/articles/[slug]/page.tsx` → Server Component
- 新建: `any_concept_web/src/app/articles/[slug]/ArticleDetailContent.tsx` → Client Component

**说明：** 文章详情页是 SEO 改造收益最大的页面。Velite 数据在构建时生成，`generateMetadata` 可直接读取文章的 title、description、tags、date 等信息。

**Step 1: 创建 ArticleDetailContent.tsx**

将原 `page.tsx` 的全部内容移到 `ArticleDetailContent.tsx`，保持 `'use client'` 和所有逻辑不变。

**Step 2: 重写 articles/[slug]/page.tsx**

```typescript
import type { Metadata } from 'next';
import { articles } from '#site/content';
import ArticleDetailContent from './ArticleDetailContent';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug && !a.draft);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.title,
    description: article.description || `${article.title} — Klauden`,
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.description || `${article.title} — Klauden`,
      type: 'article',
      publishedTime: article.date,
      tags: article.tags,
    },
  };
}

export default function ArticleDetailPage() {
  return <ArticleDetailContent />;
}
```

**Step 3: 验证**

打开任意文章页（如 `/articles/dialectics-in-ai-age`），查看页面源代码，确认 `<head>` 中有：

- `<title>` 包含文章标题
- `<meta name="description">` 包含文章描述
- `<meta property="og:title">` 等 OG 标签

---

## Task 9: Craft 列表页 SC + CC 拆分 + Metadata

**文件：**

- 修改: `any_concept_web/src/app/craft/page.tsx` → Server Component
- 新建: `any_concept_web/src/app/craft/CraftContent.tsx` → Client Component

**Step 1: 创建 CraftContent.tsx**

移动 `craft/page.tsx` 全部内容。

**Step 2: 重写 craft/page.tsx**

```typescript
import type { Metadata } from 'next';
import CraftContent from './CraftContent';

export const metadata: Metadata = {
  title: 'Craft',
  description: 'Klauden 的设计作品 — UI 设计、品牌视觉、方案设计等精选作品集。',
};

export default function CraftPage() {
  return <CraftContent />;
}
```

**Step 3: 验证**

打开 `/craft`，确认作品瀑布流正常加载。

---

## Task 10: Craft 详情页 SC + CC 拆分 + generateMetadata

**文件：**

- 修改: `any_concept_web/src/app/craft/[slug]/page.tsx` → Server Component
- 新建: `any_concept_web/src/app/craft/[slug]/CraftDetailContent.tsx` → Client Component

**Step 1: 创建 CraftDetailContent.tsx**

移动原 `page.tsx` 全部内容。注意 `MediaRenderer` 的 import 路径不变（同目录）。

**Step 2: 重写 craft/[slug]/page.tsx**

```typescript
import type { Metadata } from 'next';
import { getCraftDetail } from '@/data/crafts';
import CraftDetailContent from './CraftDetailContent';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const craft = await getCraftDetail(slug);

  if (!craft) {
    return { title: 'Craft Not Found' };
  }

  return {
    title: craft.title,
    description: craft.description,
    openGraph: {
      title: craft.title,
      description: craft.description,
      type: 'article',
      ...(craft.coverImage && {
        images: [{ url: craft.coverImage }],
      }),
    },
  };
}

export default function CraftDetailPage() {
  return <CraftDetailContent />;
}
```

**Step 3: 验证**

打开作品详情页，确认功能正常。

---

## Task 11: 添加 JSON-LD 结构化数据

**文件：**

- 新建: `any_concept_web/src/components/JsonLd.tsx`
- 修改: `any_concept_web/src/app/layout.tsx` — 添加全局 WebSite + Person schema
- 修改: `any_concept_web/src/app/articles/[slug]/page.tsx` — 添加 Article schema

**说明：** JSON-LD 不需要 `'use client'`，可直接在 Server Component 中通过 `<script type="application/ld+json">` 注入。

**Step 1: 创建 JsonLd 组件**

```typescript
// src/components/JsonLd.tsx

type JsonLdProps = {
  data: Record<string, unknown>;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

**Step 2: 在 layout.tsx 添加全局 schema**

在 `<body>` 标签内最前面添加：

```tsx
import JsonLd from '@/components/JsonLd';

// 在 return 的 <body> 内部最前面：
<JsonLd data={{
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Klauden',
  url: 'https://klauden.xyz',
  description: 'Klauden 的个人网站',
  author: {
    '@type': 'Person',
    name: 'Klauden',
    url: 'https://klauden.xyz',
    jobTitle: 'Full-Stack Designer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Shanghai',
      addressCountry: 'CN',
    },
  },
}} />
```

**Step 3: 在文章详情页添加 Article schema**

在 `articles/[slug]/page.tsx` 中，`<ArticleDetailContent />` 前面添加 JSON-LD：

```tsx
import JsonLd from '@/components/JsonLd';
import { articles } from '#site/content';

export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // 注意：这里需要在 Server Component 中同步获取数据
  // 由于 Velite 数据是构建时静态数据，可以直接在渲染中使用
  // 但 params 是 Promise，需要用 async default export 或在 generateMetadata 中处理
  // 实际实现时，可以在 page.tsx 中用 await params 获取 slug，然后查找文章

  return (
    <>
      {article && (
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.description,
          datePublished: article.date,
          author: {
            '@type': 'Person',
            name: 'Klauden',
            url: 'https://klauden.xyz',
          },
          publisher: {
            '@type': 'Person',
            name: 'Klauden',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://klauden.xyz/articles/${article.slug}`,
          },
          keywords: article.tags,
        }} />
      )}
      <ArticleDetailContent />
    </>
  );
}
```

**实现注意事项：** 由于 `page.tsx` 是 async Server Component，可以 `await params` 获取 slug，再从 `articles` 数组中查找对应文章数据来构建 JSON-LD。具体代码需要在实现时根据 Next.js 15 的 async page 模式调整。

**Step 4: 验证**

```bash
cd any_concept_web && npm run build
```

构建成功后，可以用 [Google Rich Results Test](https://search.google.com/test/rich-results) 测试页面的结构化数据。

---

## Task 12: 全面构建验证 + 功能回归测试

**说明：** 最后一步，完整构建并手动测试所有页面。

**Step 1: 生产构建**

```bash
cd any_concept_web && npm run build
```

预期：无报错，无警告。

**Step 2: 本地预览**

```bash
cd any_concept_web && npm run start
```

**Step 3: 逐页验证清单**

| 页面 | 验证项 |
|------|-------|
| `/` | KineticLetter 动画、LiveClock、InteractiveText、导航、CopyEmail |
| `/projects` | 项目列表加载、语言切换、ProjectItem 交互 |
| `/projects/[slug]` | 项目详情加载、图片/视频、上下篇导航 |
| `/articles` | 文章列表、语言过滤 |
| `/articles/[slug]` | 文章正文渲染、上下篇导航 |
| `/craft` | 作品瀑布流、WorkItem 交互 |
| `/craft/[slug]` | 作品图片序列、上下篇导航 |

**Step 4: SEO 验证清单**

对每个页面查看源代码（View Page Source），检查：

- [ ] `<title>` 标签包含正确内容
- [ ] `<meta name="description">` 存在且有意义
- [ ] `<meta property="og:title">` 存在
- [ ] `<meta property="og:description">` 存在
- [ ] `/robots.txt` 返回正确规则
- [ ] `/sitemap.xml` 包含所有页面 URL
- [ ] 首页有 WebSite + Person JSON-LD
- [ ] 文章页有 Article JSON-LD

---

## 文件变更总结

### 新建文件（7 个）

| 文件 | 用途 |
|------|------|
| `src/app/robots.ts` | 生成 robots.txt |
| `src/app/sitemap.ts` | 生成 sitemap.xml |
| `src/app/HomeContent.tsx` | 首页 Client Component |
| `src/app/projects/ProjectsContent.tsx` | 项目列表 Client Component |
| `src/app/projects/[slug]/ProjectDetailContent.tsx` | 项目详情 Client Component |
| `src/app/articles/ArticlesContent.tsx` | 文章列表 Client Component |
| `src/app/articles/[slug]/ArticleDetailContent.tsx` | 文章详情 Client Component |
| `src/app/craft/CraftContent.tsx` | 作品列表 Client Component |
| `src/app/craft/[slug]/CraftDetailContent.tsx` | 作品详情 Client Component |
| `src/components/JsonLd.tsx` | JSON-LD 结构化数据组件 |

### 修改文件（8 个）

| 文件 | 改动 |
|------|------|
| `src/app/layout.tsx` | 补全 metadata + 添加 WebSite JSON-LD |
| `src/app/page.tsx` | 改为 SC，导出 metadata，渲染 HomeContent |
| `src/app/projects/page.tsx` | 改为 SC，导出 metadata，渲染 ProjectsContent |
| `src/app/projects/[slug]/page.tsx` | 改为 SC，generateMetadata，渲染 ProjectDetailContent |
| `src/app/articles/page.tsx` | 改为 SC，导出 metadata，渲染 ArticlesContent |
| `src/app/articles/[slug]/page.tsx` | 改为 SC，generateMetadata + Article JSON-LD |
| `src/app/craft/page.tsx` | 改为 SC，导出 metadata，渲染 CraftContent |
| `src/app/craft/[slug]/page.tsx` | 改为 SC，generateMetadata，渲染 CraftDetailContent |

### 未来可选优化（不在本次范围内）

- 引入 `next-intl` + `[locale]` 前缀路由，彻底解决双语 SEO
- 添加 `opengraph-image.tsx` 动态生成 OG 图片
- 将项目/作品详情页的核心内容也改为服务端渲染
- 添加 `hreflang` 标签
- 提交 sitemap 到 Google Search Console
