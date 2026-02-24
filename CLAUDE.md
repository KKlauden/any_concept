# any_concept — AI 上下文

## 项目概述

klauden.xyz 个人网站，Next.js 15 + React 19 + Tailwind v4 + Framer Motion。
Vercel 部署，Root Directory 为 `any_concept_web`。

## 关键文件

| 文件 | 作用 |
|------|------|
| `src/app/[locale]/page.tsx` | 首页 SC wrapper（metadata + HomeContent） |
| `src/app/[locale]/HomeContent.tsx` | 首页 CC：Hero（KineticLetter）+ 交互文本 + 导航 + CopyEmail |
| `src/app/[locale]/layout.tsx` | locale layout：NextIntlClientProvider + JSON-LD |
| `src/app/layout.tsx` | 根 layout：html + 字体 + 全局 metadata |
| `src/middleware.ts` | next-intl middleware：locale 检测与重定向 |
| `src/i18n/routing.ts` | i18n 路由定义（locales: zh/en，默认 en） |
| `src/i18n/navigation.ts` | locale-aware Link、usePathname、useRouter |
| `src/i18n/messages/zh.json` | 中文翻译 |
| `src/i18n/messages/en.json` | 英文翻译 |
| `src/app/globals.css` | 设计系统变量 + 全局样式（text-grain、interactive-box、nav-link 等） |
| `src/components/InteractiveText.tsx` | 可展开交互文本系统（IconMap、InteractiveBox、ProgressIndicator） |
| `src/components/PageBackground.tsx` | 背景层：dot-grid + ambient-glow + MouseGlow + CustomCursor |
| `src/components/CustomCursor.tsx` | 自定义十字准星光标 |
| `src/data/introContent.ts` | 首页交互文本数据（13 个可交互项，最深 4 层） |
| `src/data/localizedData.ts` | 同步 locale 数据选择（projects/crafts 中英文切换） |
| `docs/UI设计系统规范.md` | 完整设计系统规范（色彩、字体、间距、动效、组件） |
| `docs/SEO优化实施方案.md` | SEO 优化完整记录 |

## 设计约束

- **色板**: 纯黑 `#000` / 浅灰 `#E8E8E8` / 琥珀橙 `#FF6B00`
- **字体**: Syne (Display) + JetBrains Mono (Mono)，禁用 Inter/Roboto/Arial
- **动效缓动**: 统一 `cubic-bezier(0.25, 0.1, 0.25, 1)`
- **CSS 颜色**: 使用 `var(--accent)` 等变量，不硬编码色值
- **图标**: 手写 SVG，18×18 / strokeWidth 1.5 / round cap+join

## 已知陷阱

- **React 19**: 组件不能定义在其他组件内部（"Expected static flag" 错误）
- **React hooks**: 所有 hooks 必须在条件 return 之前调用
- **CSS filter**: 父级 filter 影响全部子元素，无法在子元素上 `filter: none` 覆盖
- **text-grain**: 使用 `background-clip: text` + PNG 噪点，必须加在每个字母元素上（不是包裹 span），否则 hover 位移时文字消失
- **KineticLetter mousemove**: 使用注册表模式共享单个监听器（非每个字母单独绑定）
- **Vercel**: `vercel.json` 不支持 `rootDirectory`，需在 Dashboard Settings 设置

## 路由结构

```
src/app/
├── layout.tsx              ← 根 layout（html + 字体 + 全局 metadata）
├── robots.ts               ← 生成 robots.txt
├── sitemap.ts              ← 双语 sitemap + alternates
├── [locale]/
│   ├── layout.tsx          ← NextIntlClientProvider + JSON-LD
│   ├── page.tsx + HomeContent.tsx
│   ├── not-found.tsx       ← 自定义 404
│   ├── opengraph-image.tsx ← 站点级 OG 图片
│   ├── projects/           ← page.tsx + ProjectsContent.tsx + ProjectItem.tsx
│   ├── articles/           ← page.tsx + ArticlesContent.tsx
│   └── craft/              ← page.tsx + CraftContent.tsx
```

## 开发约定

- `npm run dev` / `npm run build`（在 `any_concept_web/` 目录下）
- 所有子页面使用 `PageHeader` + `PageFooter` 组件
- 页面模式: SC wrapper（page.tsx 导出 metadata）+ CC 内容组件（`'use client'` + Framer Motion）
- i18n: `useTranslations()` + `useLocale()` from `next-intl`，Link from `@/i18n/navigation`
- 数据: projects/crafts 使用 `localizedData.ts` 的同步函数（`getAllProjectsSync` 等）
- 文章: `content/articles/{locale}/xxx.md`，Velite 构建
