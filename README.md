# klauden.xyz

Klauden 的个人网站 — 作品集、项目展示、文章。

**Live**: [klauden.xyz](https://klauden.xyz)

## 技术栈

| 技术 | 说明 |
|------|------|
| Next.js 15 | App Router, React 19 |
| TypeScript | 严格模式 |
| Tailwind CSS v4 | `@theme inline` 配置 |
| Framer Motion | 动画与交互 |
| Velite | Markdown → 类型安全数据层 |
| Vercel | 部署与托管 |

## 设计系统

Kinetic Typography / 信息设计 / 精密工程感

- **色板**: 纯黑 `#000` + 浅灰 `#E8E8E8` + 琥珀橙 `#FF6B00`
- **字体**: Syne (Display) + JetBrains Mono (Mono)
- **背景**: 点阵网格 + 双侧光源漂移 + 鼠标跟随光晕
- **交互**: KineticLetter 弹簧位移、可展开交互文本、自定义十字光标

详细规范见 [docs/UI设计系统规范.md](docs/UI设计系统规范.md)。

## 项目结构

```
any_concept/
├── any_concept_web/           # Next.js 应用（Vercel Root Directory）
│   ├── content/articles/      # Markdown 文章 (zh/ 和 en/)
│   ├── src/
│   │   ├── app/               # 页面路由
│   │   │   ├── page.tsx       # 首页（Hero + 交互文本 + 导航）
│   │   │   ├── craft/         # 设计作品
│   │   │   ├── projects/      # 项目展示
│   │   │   └── articles/      # 文章
│   │   ├── components/        # 共享组件
│   │   │   ├── InteractiveText.tsx  # 可展开交互文本系统
│   │   │   ├── PageBackground.tsx   # 背景层（网格 + 光晕 + 光标）
│   │   │   ├── CustomCursor.tsx     # 自定义十字光标
│   │   │   ├── MouseGlow.tsx        # 鼠标跟随光晕
│   │   │   ├── PageHeader.tsx       # 子页面通用导航
│   │   │   └── PageFooter.tsx       # 通用页脚
│   │   ├── data/              # 静态数据（作品、项目、交互文本内容）
│   │   ├── hooks/             # useLanguage (i18n)
│   │   └── i18n/locales/      # zh.ts / en.ts
│   ├── public/images/         # 静态资源
│   └── velite.config.ts       # 内容管道配置
├── docs/                      # 设计文档与计划
├── CHANGELOG.md
└── README.md
```

## 开发

```bash
cd any_concept_web
npm install
npm run dev       # http://localhost:3000
npm run build     # 生产构建
```

## 部署

- 平台: Vercel
- Root Directory: `any_concept_web`
- 域名: `klauden.xyz` + `www.klauden.xyz`
- DNS: Cloudflare（A → 76.76.21.21, CNAME www → cname.vercel-dns.com）
- 推送 `main` 分支自动触发部署

## 内容管理

文章放在 `any_concept_web/content/articles/{locale}/xxx.md`：

```yaml
---
title: 文章标题
slug: article-slug
date: 2026-02-20
locale: zh
description: 可选描述
tags: [tag1, tag2]
---
```

同 slug 不同 locale 的文章会自动关联语言版本。
