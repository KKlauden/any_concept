# any_concept

Klauden 的个人作品集网站。

## 技术栈

- **框架**: Next.js 15 (App Router) + React 19 + TypeScript
- **样式**: Tailwind CSS v4 + 自定义 CSS 变量
- **动画**: Framer Motion
- **内容**: Velite (Markdown → 类型安全数据层)
- **字体**: Syne (Display) + JetBrains Mono (Mono)

## 项目结构

```
any_concept_web/
├── content/articles/       # Markdown 文章 (zh/ 和 en/ 子目录)
├── src/app/                # Next.js App Router 页面
│   ├── page.tsx            # 首页
│   ├── craft/              # 设计作品
│   ├── projects/           # 项目
│   └── articles/           # 文章
├── src/components/         # 共享组件
│   ├── PageHeader.tsx      # 子页面通用顶部导航
│   ├── PageFooter.tsx      # 通用页脚
│   ├── NavButton.tsx       # 全局浮动导航菜单
│   ├── MouseGlow.tsx       # 鼠标跟随光晕
│   └── LanguageSwitcher/   # 语言切换
├── src/hooks/              # useLanguage (i18n Context)
├── src/i18n/locales/       # zh.ts / en.ts 翻译
├── src/data/               # 项目和作品数据 (按 locale 分文件)
├── velite.config.ts        # Velite 内容管道配置
└── docs/                   # 设计文档和计划
```

## 设计系统

- **背景**: `#000000`
- **前景**: `#E8E8E8`
- **强调色**: `#FF6B00` (橙)
- **弱化色**: `#666666`
- **风格**: Brutalist 暗色，点阵网格背景，CRT 质感

## i18n

- 自定义 Context API (`useLanguage` hook)，非 next-intl
- 翻译键扁平化为 Map，O(1) 查找
- UI 翻译: `src/i18n/locales/zh.ts` / `en.ts`
- 文章内容: `content/articles/zh/` / `en/`，同 slug 自动关联语言版本
- localStorage 持久化，支持浏览器语言检测

## 内容管理 (Velite)

- 文章放在 `content/articles/{locale}/xxx.md`
- Frontmatter 必需字段: `title`, `slug`, `date`, `locale`
- 可选字段: `description`, `tags`, `cover`, `draft`
- 同 slug 不同 locale 的文章会在语言切换时自动关联
- 构建输出在 `.velite/` (已 gitignore)

## 开发约定

- 运行: `npm run dev` / `npm run build`
- 所有页面使用 `PageHeader` + `PageFooter` 组件
- 页面 pattern: `'use client'` + `useLanguage()` + Framer Motion 进场动画
- CSS 颜色使用 `var(--accent)` 等变量，不要硬编码色值
- 文章排版样式统一使用 `.article-prose` class
