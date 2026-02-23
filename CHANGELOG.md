# Changelog

## [Unreleased]

### Added

- **EMAIL 复制交互**：底部导航 CONTACT 改为 EMAIL，点击复制邮箱到剪贴板
  - Roller 动画：文字向上滚动切换为 COPIED（橙色）
  - ✓ 图标弹入反馈，2 秒后自动回弹
  - 与导航链接的 → 箭头视觉区分
- **自定义光标**：十字准星风格，hover 交互元素时变为橙色圆环
- **交互文本图标补全**：全部 13 个可交互项均配备图标
  - 新增 moon、shield、layers、clock、cup 五个 SVG 图标
  - 统一 18×18 / 1.5px 描边 / 圆角端点风格
- **交互文本视觉增强**
  - 未探索项呼吸脉动动画
  - 深度视觉层级（depth-1/2/3 颜色递减 + 竖线指示器）
  - 展开光标闪烁 → 自动淡出
  - 进度条完成彩蛋（打字效果 "CURIOSITY NOTED."）
  - 已探索计数去重

### Changed

- **性能优化**
  - SVG feTurbulence 实时滤镜 → 静态 PNG 噪点纹理（background-clip: text）
  - KineticLetter 7 个 mousemove 监听器 → 1 个注册表模式
  - 移除 ambient-glow 的 `will-change: transform, opacity`
- **交互文本内容重写**
  - 从"技能清单"风格改为"个人思考者"风格
  - 打破 "I WONDER / I BUILD / I BELIEVE" 重复句式
  - 移除内嵌链接（防止误触跳转）、移除末尾邮箱地址
- **首页文字噪点**：text-grain 从父级 span 移至每个 KineticLetter，修复 hover 文字消失问题
- **光标闪烁颜色**：`_` 光标移出 text-grain 作用域，确保 accent 橙色不被 filter 影响
- Next.js 15.3.4 → 15.5.12（修复 CVE-2025-66478）

### Fixed

- React 19 "Expected static flag" 错误：InteractiveBox / LinkBox 提取为顶级组件
- React hooks 顺序错误：ProgressIndicator 中 useEffect 移至条件 return 之前
- `useRef is not defined`：修复遗漏的 import

---

## [0.2.0] - 2026-02-21

### Added

- **文章模块 (Articles)**：基于 Velite 的 Markdown 内容管理系统
  - 文章列表页 `/articles`，按日期降序排列，支持 locale 过滤
  - 文章详情页 `/articles/[slug]`，暗色 prose 排版，上一篇/下一篇导航
  - 支持中英文文章（同 slug 跨 locale 自动关联）
  - Velite 构建时处理 Markdown，运行时零开销
  - 文章排版样式 `.article-prose`，适配暗色设计系统
- **通用组件抽取**
  - `PageHeader` 组件：子页面通用顶部导航
  - `PageFooter` 组件：统一页脚
- **首页导航调整**：新增 `03 — ARTICLES` 入口

### Changed

- `next.config.ts` 从 CommonJS 改为 ESM，集成 Velite 构建
- `tsconfig.json` 添加 `.velite` 路径别名
- 6 个子页面的 header/footer 重构为 `PageHeader` / `PageFooter` 组件
- 页脚年份统一为 2026

### Fixed

- 文章列表页在浏览器语言为英文时显示空列表的问题
- 文章详情页在大屏幕上内容居中

---

## [0.1.0] - 2026-02-20

### Added

- 初始项目结构
- 首页暗色设计，Hero 动画
- Craft 作品展示（瀑布流 + 详情页）
- Projects 项目展示（表格式列表 + 详情页）
- 中英文双语支持（自定义 Context API）
- 点阵网格背景 + 鼠标跟随光晕效果
- 全局浮动导航菜单 (NavButton)
