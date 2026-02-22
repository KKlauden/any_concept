# KLAUDEN Portfolio — UI 设计系统规范

> 基于首页定稿版本，作为所有页面统一改造的参考基准。

---

## 1. 设计理念

**风格关键词**：Kinetic Typography / 信息设计 / 精密工程感

- 纯黑画布上的强力排版，以文字运动和精致细节传递个性
- 不追求 Brutalist 的粗暴感，而是精确、克制、有层次的「系统界面」气质
- 信息密度适中，通过元信息标签（坐标、时间、编号）营造工程蓝图感
- 所有装饰元素极度克制（opacity 不超过 0.1），服务于信息层次而非装饰本身

---

## 2. 色彩系统

### 核心色板

| Token | 值 | 用途 |
|-------|-----|------|
| `--background` | `#000000` | 页面背景，纯黑 |
| `--foreground` | `#E8E8E8` | 主文字色，略偏暖的浅灰 |
| `--accent` | `#FF4100` | 强调色/交互反馈，琥珀橙 |
| `--muted` | `#666666` | 次要文字、disabled 状态 |
| `--border` | `rgba(255, 255, 255, 0.1)` | 分隔线、边框基准 |

### 透明度层级（白色基准）

用于在纯黑背景上构建信息层次：

| 层级 | 透明度 | 用途 |
|------|--------|------|
| 极弱 | `white/[0.03-0.04]` | 背景纹理（点阵、光晕） |
| 微弱 | `white/[0.06-0.08]` | 角落装饰、disabled 边框 |
| 弱 | `white/10` (`0.1`) | 分隔线、标准边框 |
| 次要 | `white/15-20` (`0.12-0.2`) | 元信息标签、编号文字 |
| 标准 | `white/25` (`0.25`) | 元信息标签主层级 |
| 交互 | `white/30-35` (`0.3-0.35`) | hover 边框 |

### Accent 色透明度

| 透明度 | 用途 |
|--------|------|
| `rgba(255, 107, 0, 0.04)` | 鼠标光晕 |
| `rgba(255, 107, 0, 0.06)` | link hover 背景 |
| `rgba(255, 107, 0, 0.3)` | link 边框 |
| `rgba(255, 107, 0, 0.4)` | 状态指示点光晕 |
| `var(--accent)` 全值 | 选中文字背景、强调文字 |

### Zinc 色阶（子页面可选）

已在 `:root` 中定义 `--zinc-50` 至 `--zinc-950`，供子页面需要浅色方案或灰度层次时使用。

### 文字选中样式

```css
::selection {
  background: var(--accent);  /* 橙色背景 */
  color: #000000;              /* 黑色文字 */
}
```

---

## 3. 字体系统

### 字体家族

| Token | 字体 | 用途 |
|-------|------|------|
| `--font-display` / `font-display` | **Syne** (Google Fonts) | 标题、导航、强调性文字 |
| `--font-mono` / `font-mono` | **JetBrains Mono** (Google Fonts) | 正文、元信息标签、代码 |

字重加载范围：400, 500, 600, 700, 800

### 字体使用规则

- **Display（Syne）**：所有标题、导航链接、交互文本区的大字，使用 `font-bold` 至 `font-extrabold`
- **Mono（JetBrains Mono）**：页面正文（body 默认）、元信息标签、进度指示器、页脚
- 永远不使用 Inter、Roboto、Arial 等通用字体

### 排版尺度

| 元素 | 尺寸 | 其他属性 |
|------|------|----------|
| 英雄标题（名字） | `clamp(72px, 15vw, 200px)` | `leading-[0.85] tracking-[-0.04em] font-extrabold` |
| 交互文本 | `clamp(22px, 4vw, 40px)` | `leading-[1.15] tracking-[-0.02em] font-bold uppercase` |
| 导航链接 | `text-3xl md:text-5xl` | `font-bold` |
| 章节标签 | `9px` | `tracking-[0.25em] uppercase` |
| 元信息标签 | `10px` | `tracking-[0.2em] uppercase` |
| 元信息次标签 | `9px` | `tracking-[0.15em] uppercase` |
| 导航编号 | `text-xs` | `font-mono tracking-wider` |
| 页脚 | `text-xs` | `font-mono tracking-wider` |

---

## 4. 间距系统

### 页面内边距（横向）

统一使用三级响应式内边距：

```
px-6 md:px-20 lg:px-28
```

即 `24px → 80px → 112px`，所有内容区域保持一致。

### 纵向节奏

| 位置 | 间距 |
|------|------|
| Hero 顶部 padding | `pt-6 md:pt-8` |
| Hero 底部 padding | `pb-16 md:pb-20` |
| 章节间距 | `pt-24 md:pt-36` |
| 章节内分隔线下方 | `mb-10 md:mb-14`（文本区）/ `mb-8 md:mb-12`（导航区） |
| 导航区距上一区域 | `mt-24 md:mt-36` |
| 页脚距上一区域 | `pt-20 md:pt-28` |
| 页脚底部 | `pb-12` |
| 章节标签下方 | `mb-6 md:mb-8` |

---

## 5. 背景与装饰层

### 层级结构

```
z-index: 0  — 点阵网格（fixed）
z-index: 1  — 鼠标跟随光晕（fixed）
z-index: 10 — 页面主内容（relative）
```

### 点阵网格 `.dot-grid`

```css
position: fixed;
inset: 0;
pointer-events: none;
background-image: radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px);
background-size: 32px 32px;
```

- 全页面固定层，滚动时网格不动
- 使用 `aria-hidden="true"`

### 鼠标跟随光晕 `.mouse-glow`

```css
position: fixed;
inset: 0;
pointer-events: none;
background: radial-gradient(
  600px circle at var(--mouse-x) var(--mouse-y),
  rgba(255, 107, 0, 0.04),
  transparent 80%
);
```

- 通过 JS 设置 CSS 变量 `--mouse-x` / `--mouse-y`，零 React 重渲染
- 仅在 `(hover: hover)` 设备上激活
- 光晕颜色为 accent 色的极低透明度

### 角落标记 `CornerMarkers`

- 四角 L 形边框装饰，`w-4 h-4`
- 边框颜色 `border-white/[0.06]`，极度克制
- 定位：`top-4 left-4 md:top-6 md:left-6`（响应式）
- 用于 Hero 等全屏区块，不必每个章节都加

### 分隔线

- 颜色：`bg-white/10`（标准）或 `bg-white/[0.06]`（弱化，如页脚前）
- 动效：`initial={{ scaleX: 0 }}` → `whileInView={{ scaleX: 1 }}`
- `transformOrigin: 'left'`（从左向右展开）

---

## 6. 章节系统

### 章节标签 `SectionLabel`

每个内容区域顶部放置编号标签：

```
001 — About
002 — Explore
```

样式：`text-[9px] font-mono tracking-[0.25em] text-white/15 uppercase`

**编号规则**：三位数递增（001, 002, 003...），用 ` — ` 连接英文标签。

### 标准章节结构

```jsx
<section className="px-6 md:px-20 lg:px-28 pt-24 md:pt-36">
  <SectionLabel text="00X — Title" />
  <motion.div className="h-px bg-white/10 mb-10 md:mb-14"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    style={{ transformOrigin: 'left' }}
  />
  {/* 章节内容 */}
</section>
```

---

## 7. 动效规范

### 缓动曲线

全局统一使用：

```ts
const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
```

对应 CSS：`cubic-bezier(0.25, 0.1, 0.25, 1)`

### 入场动画分类

| 类型 | 属性 | 时长 | 适用 |
|------|------|------|------|
| 淡入 | `opacity: 0 → 1` | 0.4-0.5s | 元信息标签、装饰元素 |
| 上滑淡入 | `opacity: 0, y: 12 → opacity: 1, y: 0` | 0.5-0.6s | 内容块 |
| 左滑淡入 | `opacity: 0, x: -20 → opacity: 1, x: 0` | 0.5s | 导航链接 |
| 展开线 | `scaleX: 0 → 1` | 0.6-0.8s | 分隔线 |
| 逐词模糊渐入 | `opacity: 0, y: 6, blur(6px) → visible` | 0.35s/词 | 展开内容（stagger 0.04s） |
| 弹入 | `opacity: 0, y: 8, scale: 0.97 → visible` | 0.3s | 交互元素展开 |

### 触发方式

- **首屏（Hero）**：基于 `delay` 的编排式动画序列（0.2s → 1.8s）
- **折叠线以下**：使用 `whileInView` + `viewport={{ once: true }}`
- **交互反馈**：`whileHover={{ scale: 1.01 }}` / `whileTap={{ scale: 0.98 }}`

### Hero 动画时间轴

```
0.2s~0.8s  KLAUDEN 字母逐个弹入（stagger 0.08s）
1.0s       光标闪烁开始
1.2s       顶部元信息条淡入
1.4s       底部元信息条淡入
1.5s~1.65s 角落标记逐个淡入
1.8s       滚动指示器淡入
```

### 持续动画

| 元素 | 动画 | 参数 |
|------|------|------|
| 光标闪烁 | step-end on/off | 1s 循环 |
| 状态指示点 | 透明度脉冲 + 光晕扩散 | 2.5s ease-in-out 循环 |
| 滚动指示器 | 竖线上下流动 | 2.5s ease-in-out 循环 |
| 进度完成文字 | 透明度呼吸 | 2s ease-in-out 循环 |

### 鼠标交互

- **KineticLetter**：弹簧物理（stiffness: 300, damping: 20, mass: 0.8），鼠标 proximity 250px 范围内产生 Y 轴位移
- **导航链接 hover**：`letter-spacing: 0 → 0.08em` + `color → accent` + 箭头 `translateX(8px)`
- **交互方框 hover**：边框亮度增强 + 背景微亮
- **链接方框 hover**：边框变 accent + 文字变 accent + 背景微橙

---

## 8. 组件清单

### 全局组件（可跨页面复用）

| 组件 | 文件 | 用途 |
|------|------|------|
| `MouseGlow` | page.tsx（可提取） | 鼠标跟随光晕，CSS 变量驱动 |
| `LiveClock` | page.tsx（可提取） | 实时时钟，UTC+8 |
| `CornerMarkers` | page.tsx（可提取） | 角落 L 形装饰 |
| `ScrollIndicator` | page.tsx（可提取） | 底部滚动指示 |
| `SectionLabel` | page.tsx（可提取） | 编号章节标签 |
| `InteractiveText` | components/InteractiveText.tsx | 可展开交互文本（首页专用） |
| `NavButton` | components/NavButton.tsx | 返回导航按钮（子页面使用） |

### 子页面改造时可复用的模式

- **页面容器**：`<main className="relative z-10 min-h-screen bg-background text-foreground overflow-x-hidden">`
- **背景双层**：`<div className="dot-grid" />` + `<MouseGlow />`
- **章节结构**：`SectionLabel` + 分隔线动画 + 内容
- **页脚**：统一格式，弱化分隔线 + 版权 + 邮箱

---

## 9. 交互方框系统 `.interactive-box`

用于可点击的内联元素，有三种变体：

### 基础交互方框

```css
display: inline-flex;
align-items: center;
gap: 0.4em;
padding: 0.15em 0.4em;
border: 1px solid rgba(255, 255, 255, 0.15);
cursor: pointer;
```

### 变体

| 变体 | 类名 | 边框色 | hover 表现 |
|------|------|--------|-----------|
| 默认 | `.interactive-box` | `white/15` | 边框亮 + 背景微亮 |
| 禁用 | `+ --disabled` | `white/8` | 无反应 |
| 链接 | `+ --link` | `accent/30` | 边框+文字变 accent |

### 内联 SVG 图标

交互方框内使用 18x18 的 SVG 图标，`stroke="currentColor"` + `strokeWidth="1.5"`。

图标清单：`code`, `pin`, `pen`, `window`, `server`, `spark`, `bulb`, `handshake`, `mail`, `network`, `device`, `wand`, `boxes`, `eye`, `arrow`

---

## 10. 导航链接系统 `.nav-link`

大字导航，带编号前缀：

```jsx
<span className="text-xs font-mono text-white/20 mr-4">01</span>
<span>CRAFT</span>
<span className="nav-arrow text-accent ml-3">→</span>
```

hover 效果：字距展开 `0.08em` + 颜色变 accent + 箭头右移 `8px`

---

## 11. 无障碍

### `prefers-reduced-motion`

所有动画、过渡在 `prefers-reduced-motion: reduce` 下禁用：

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 键盘交互

- 交互方框支持 `tabIndex`、`role="button"`、Enter/Space 触发
- 链接方框使用原生 `<a>` 标签
- `focus-visible` 样式：`outline: 1px solid var(--accent); outline-offset: 2px`

### 语义化

- 装饰性元素使用 `aria-hidden="true"`
- 按钮状态使用 `aria-disabled`

---

## 12. 子页面改造指南

### 统一要素

以下元素应在所有页面保持一致：

1. **背景双层**：`.dot-grid` + `.mouse-glow`（全局固定层）
2. **页面容器**：`relative z-10 min-h-screen bg-background text-foreground`
3. **横向内边距**：`px-6 md:px-20 lg:px-28`
4. **章节标签+分隔线**：每个内容区域顶部
5. **字体系统**：Syne（标题）+ JetBrains Mono（正文）
6. **色彩系统**：纯黑背景 + 浅灰文字 + 橙色强调
7. **页脚**：统一格式
8. **动效缓动**：`cubic-bezier(0.25, 0.1, 0.25, 1)`
9. **`whileInView` 触发**：所有折叠线以下的内容

### Craft / Projects 页面改造方向

- 移除旧版语言切换逻辑（`useLanguage`, `getLocalizedData`），简化为纯英文或固定数据
- 移除旧版 `NavButton` 导航，改为与首页一致的元信息条 + 返回链接
- 页面顶部：小型标题区（非全屏 Hero），保留编号标签
- 列表/网格布局：使用 `whileInView` stagger 入场
- 卡片/项目项：边框使用 `white/10`，hover 使用 `white/15-20` + 微背景

### 详情页改造方向

- 顶部：项目标题 + 元信息标签（类型/年份/技术栈）
- 内容区：标准章节结构
- 图片：暗色调处理，边框 `white/[0.06]`
- 返回导航：左上角固定或顶部栏内

---

## 13. 技术栈与工具

| 技术 | 版本/说明 |
|------|----------|
| Next.js | 15.3.4, App Router |
| React | 19 |
| TypeScript | 严格模式 |
| Tailwind CSS | v4, `@theme` / `@theme inline` 配置 |
| framer-motion | 12.x, 动画核心库 |
| Google Fonts | Syne + JetBrains Mono, `next/font/google` |

### CSS 架构

- 全局样式：`globals.css`（设计系统变量 + 组件样式）
- Tailwind 主题：`@theme inline` 映射 CSS 变量到 Tailwind
- 组件级样式：优先使用 Tailwind utility，复杂交互样式使用 `globals.css` 中的 BEM 类名

---

## 14. 文件结构参考

```
src/
├── app/
│   ├── globals.css          # 设计系统变量 + 全局样式
│   ├── layout.tsx           # 字体加载 + 全局 Provider
│   ├── page.tsx             # 首页（Hero + 交互文本 + 导航）
│   ├── craft/
│   │   ├── page.tsx         # Craft 列表页（待改造）
│   │   └── [slug]/page.tsx  # Craft 详情页（待改造）
│   └── projects/
│       ├── page.tsx         # Projects 列表页（待改造）
│       └── [slug]/page.tsx  # Projects 详情页（待改造）
├── components/
│   ├── InteractiveText.tsx  # 可展开交互文本系统
│   ├── TypewriterText.tsx   # 打字机效果（备用）
│   ├── NavButton.tsx        # 旧版返回按钮（待替换）
│   └── LanguageSwitcher/    # 旧版语言切换（待移除）
└── data/
    └── introContent.ts      # 首页交互文本数据
```
