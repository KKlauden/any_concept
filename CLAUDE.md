# any_concept — AI 上下文

## 项目概述

klauden.xyz 个人网站，Next.js 15 + React 19 + Tailwind v4 + Framer Motion。
Vercel 部署，Root Directory 为 `any_concept_web`。

## 关键文件

| 文件 | 作用 |
|------|------|
| `src/app/page.tsx` | 首页：Hero（KineticLetter）+ 交互文本 + 导航 + CopyEmail |
| `src/app/globals.css` | 设计系统变量 + 全局样式（text-grain、interactive-box、nav-link 等） |
| `src/components/InteractiveText.tsx` | 可展开交互文本系统（IconMap、InteractiveBox、ProgressIndicator） |
| `src/components/PageBackground.tsx` | 背景层：dot-grid + ambient-glow + MouseGlow + CustomCursor |
| `src/components/CustomCursor.tsx` | 自定义十字准星光标 |
| `src/data/introContent.ts` | 首页交互文本数据（13 个可交互项，最深 4 层） |
| `docs/UI设计系统规范.md` | 完整设计系统规范（色彩、字体、间距、动效、组件） |

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

## 开发约定

- `npm run dev` / `npm run build`（在 `any_concept_web/` 目录下）
- 所有子页面使用 `PageHeader` + `PageFooter` 组件
- 页面模式: `'use client'` + `useLanguage()` + Framer Motion 进场动画
- 文章: `content/articles/{locale}/xxx.md`，Velite 构建
