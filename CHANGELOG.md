# Changelog

## [Unreleased]

### Added

- **文章模块 (Articles)**：基于 Velite 的 Markdown 内容管理系统
  - 文章列表页 `/articles`，按日期降序排列，支持 locale 过滤
  - 文章详情页 `/articles/[slug]`，暗色 prose 排版，上一篇/下一篇导航
  - 支持中英文文章（同 slug 跨 locale 自动关联）
  - Velite 构建时处理 Markdown，运行时零开销
  - 文章排版样式 `.article-prose`，适配暗色设计系统
- **通用组件抽取**
  - `PageHeader` 组件：子页面通用顶部导航（返回按钮 + 语言切换 + 可选状态）
  - `PageFooter` 组件：统一页脚（年份、地点、邮箱）
- **首页导航调整**：新增 `03 — ARTICLES` 入口，CONTACT 调整为 `04`
- **NavButton 菜单**：新增 ARTICLES 导航项
- **i18n 扩展**：zh.ts / en.ts 添加 articles 相关翻译键

### Changed

- `next.config.ts` 从 CommonJS 改为 ESM，集成 Velite 构建
- `tsconfig.json` 添加 `.velite` 路径别名 (`#site/content`)
- `.gitignore` 添加 `.velite/` 目录
- `globals.css` 中 article-prose 的强调色统一使用 `var(--accent)` 变量（不再硬编码 `rgba(255, 107, 0, ...)`）
- 6 个子页面的 header/footer 从内联代码重构为 `PageHeader` / `PageFooter` 组件
- 页脚年份统一为 2026

### Fixed

- 文章列表页在浏览器语言为英文时显示空列表的问题（添加 locale fallback）
- 文章详情页在大屏幕上内容左对齐改为居中（`mx-auto`）

---

## [0.1.0] - 2026-02-20

### Added

- 初始项目结构
- 首页 Brutalist 暗色设计，Hero 动画
- Craft 作品展示（瀑布流 + 详情页）
- Projects 项目展示（表格式列表 + 详情页）
- 中英文双语支持（自定义 Context API）
- 点阵网格背景 + 鼠标跟随光晕效果
- 全局浮动导航菜单 (NavButton)
