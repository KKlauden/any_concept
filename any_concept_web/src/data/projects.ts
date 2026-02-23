// 定义项目类型
export interface Project {
  id: string; // 项目唯一标识
  title: string; // 项目标题
  description: string; // 项目描述（可选，用于显示在项目列表中）
  year: string | number; // 项目年份
  link?: string; // 项目链接（可选，用于外部跳转）
  repo?: string; // 代码仓库链接（可选）
  techStack?: string[]; // 技术栈（可选）
  isWIP?: boolean; // 是否为进行中的项目（Work In Progress）

  // 详情页字段
  slug?: string; // URL 友好的标识符
  detailDescription?: string; // 详细描述
  projectType?: string; // 项目类型：如"Web应用"、"移动应用"等
  role?: string; // 担任角色
  duration?: string; // 项目持续时间
  teamSize?: number; // 团队规模
  highlights?: string[]; // 项目亮点列表
  challenges?: string[]; // 项目挑战列表
  solutions?: string[]; // 解决方案列表
  images?: ProjectImage[]; // 项目图片
  references?: { title: string; source: string }[]; // 项目参考文献
}

// 定义项目图片类型
export interface ProjectImage {
  src: string; // 图片路径
  alt?: string; // 图片替代文本
  caption?: string; // 图片说明
  isVideo?: boolean; // 是否为视频
}

// 项目数据
const projectData: Project[] = [
  {
    id: "doc-chat",
    slug: "doc-chat",
    title: "DocChat",
    description: "AI驱动的API文档智能助手",
    year: 2026,
    link: "https://normtech.site",
    techStack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Vercel AI SDK",
      "Streamdown",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "DeepSeek",
      "JWT",
      "Docker",
      "Nginx",
    ],
    detailDescription:
      "DocChat 是一个 AI 驱动的 API 文档智能助手，目标是让开发者通过自然语言快速定位任意 API 的接口、参数和数据结构。采用确定性优先 + LLM 兜底的两阶段路由架构，约 80% 的查询无需调用大模型，显著降低成本。当前以 Opta/Stats Perform 体育数据 API 为首个场景落地，已支持 Motorsport（7 个 feed）和 Soccer（92 个 feed），配合 4 层知识注入系统保证回答精准。未来将拓展为通用的 API 文档助手平台，支持用户上传任意 OpenAPI 规范与文档自动生成知识库。前端采用终端风格深色主题（霓虹绿 + Matrix 背景），支持 SSE 流式对话、会话历史管理和用户认证。",
    projectType: "全栈应用",
    role: "全栈开发者",
    duration: "2026年2月 - 进行中",
    teamSize: 1,
    isWIP: true,
    highlights: [
      "两阶段路由架构 — 确定性关键词匹配优先（~2650 triggers），LLM 兜底，~80% 查询零 LLM 调用",
      "4 层知识注入系统 — 接口级文档 → 领域概览 → 共享知识库 → 动态话题路由（INDEX.yaml 驱动）",
      "当前场景：Opta 体育数据 API — 已覆盖 99 个接口（Motorsport 7 + Soccer 92），每个接口含完整知识文件",
      "终端风格 UI — 霓虹绿 (#DCFF71) + Matrix 字符雨背景，Hack 字体，玻璃拟态输入框",
      "SSE 流式对话 + Streamdown Markdown 渲染 + 代码高亮 + 中英文双语支持",
      "完整用户系统 — JWT 认证（Access + Refresh Token）、会话历史、自动生成对话标题",
    ],
    challenges: [
      "大规模 API 接口的知识组织与精准路由，避免 LLM 在海量文档中产生幻觉",
      "OpenAPI 规范 + PDF 文档 + 手写知识文件三种来源的数据融合",
      "前端静态导出（output: export）下的 SSE 流式通信实现",
      "Docker 容器化部署中后端与 PostgreSQL 的网络拓扑配置",
    ],
    solutions: [
      "构建增强索引 JSON（Swagger 解析 + PDF 提取 + 元数据注入），启动时加载到内存",
      "设计 META.yaml triggers + fields + scenarios 多维匹配，确定性阶段覆盖绝大多数查询",
      "Vercel AI SDK v6 + TextStreamChatTransport 实现前端 SSE 消费",
      "Docker Compose 外部网络共享 PostgreSQL 容器，Nginx 反代 + Let's Encrypt HTTPS",
    ],
    images: [
      {
        src: "/images/projects/doc-chat/doc_chat_01.jpg",
        alt: "DocChat 终端风格登录界面",
        caption: "Matrix 字符雨背景 + 终端模拟器风格的安全认证界面",
      },
      {
        src: "/images/projects/doc-chat/doc_chat_02.jpg",
        alt: "DocChat 主聊天界面",
        caption: "Soccer API 92 feeds 已加载，侧边栏会话历史，推荐查询提示",
      },
      {
        src: "/images/projects/doc-chat/doc_chat_03.jpg",
        alt: "DocChat AI 对话回复",
        caption: "自然语言查询 → 精准匹配 TM2 接口，结构化参数说明与调用依赖链",
      },
    ],
  },
  {
    id: "mastea",
    slug: "mastea",
    title: "Mastea",
    description: "AI驱动的个性化养生茶定制平台",
    year: 2025,
    techStack: [
      "Taro",
      "React",
      "Redux Toolkit",
      "TypeScript",
      "TailwindCSS",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "DeepSeek-V3",
      "WeChat Pay",
      "Tencent Cloud COS",
      "JWT",
      "SSE",
    ],

    detailDescription:
      "Mastea 是一个基于人工智能的个性化养生茶定制平台，结合中医九种体质理论和 AI 大模型，为用户提供从体质测评、舌象分析、健康报告到个性化茶饮推荐的完整闭环。前端基于 Taro React 构建微信小程序，后端采用 FastAPI + PostgreSQL，集成 DeepSeek-V3 大模型实现 AI 问诊和流式对话。支持 VIP 订阅定制茶包成分、健康目标打卡追踪、长期体质记录管理，以及完整的茶品电商系统（购物车、订单、微信支付）。",
    projectType: "微信小程序",
    role: "全栈开发者",
    duration: "2025年6月 - 进行中",
    teamSize: 4,
    isWIP: true,
    highlights: [
      "12题中医体质测评 + AI 雷达图可视化报告（综合评分、体质分析、AI 洞察）",
      "AI 舌象分析 — 拍照上传舌苔图，AI 识别体质特征并给出调理建议",
      "SSE 流式对话的 AI 养生顾问，基于 DeepSeek-V3 大模型实时问诊",
      "VIP 订阅体系 — 自定义茶包成分配比，AI 精准推荐成分与用量",
      "健康目标里程碑 — 每日打卡、饮茶提醒、舌象跟踪、完成奖励",
      "长期体质记录管理 — 历史报告时间轴、体质分数趋势图、定期复测提醒",
      "完整电商系统 — 时令推荐、分类筛选、购物车、微信支付、订单管理",
    ],
    challenges: [
      "Taro React 在微信小程序环境中的 API 差异与语法限制",
      "TailwindCSS 在小程序 WXSS 中的类名编译与适配",
      "SSE 流式响应在小程序 RequestTask 中的实现",
      "舌象图片上传至腾讯云 COS 的鉴权与安全处理",
      "中医体质测评算法的科学性与 AI 推荐的精准度",
    ],
    solutions: [
      "封装 Taro 兼容层，统一 H5 与小程序的 API 调用",
      "定制 TailwindCSS PostCSS 插件处理小程序类名转换",
      "基于 ReadableStream 封装 SSE 客户端，支持打字机效果",
      "后端签发临时密钥 + 前端直传 COS，降低服务器带宽压力",
      "结合中医九种体质标准评分体系与 DeepSeek-V3 语义分析",
    ],
    images: [
      {
        src: "/images/projects/mastea/xhs_01.JPG",
        alt: "Mastea 体质雷达图与健康报告",
        caption: "AI 生成的九种体质雷达图与综合健康评分报告",
      },
      {
        src: "/images/projects/mastea/xhs_02.JPG",
        alt: "每日健康简报",
        caption: "AI 每日健康简报与个性化养生建议",
      },
      {
        src: "/images/projects/mastea/xhs_03.JPG",
        alt: "AI 舌象分析",
        caption: "拍照上传舌苔图，AI 智能识别体质特征",
      },
      {
        src: "/images/projects/mastea/xhs_04.JPG",
        alt: "AI 对话式问诊",
        caption: "基于 DeepSeek-V3 的 SSE 流式 AI 养生顾问",
      },
      {
        src: "/images/projects/mastea/xhs_05.JPG",
        alt: "可视化体质评估",
        caption: "体质详解（形体特征、常见表现、心理特征、易感病症）与 AI 洞察",
      },
      {
        src: "/images/projects/mastea/xhs_06.JPG",
        alt: "个性化茶品推荐",
        caption: "VIP 定制茶包成分 vs 基础推荐，AI 精准配方",
      },
      {
        src: "/images/projects/mastea/xhs_07.JPG",
        alt: "茶商城与健康里程碑",
        caption: "时令茶品推荐、分类筛选、健康目标打卡与舌象跟踪",
      },
      {
        src: "/images/projects/mastea/xhs_08.JPG",
        alt: "长期体质记录管理",
        caption: "体质分数趋势图、历史报告时间轴、定期复测提醒",
      },
    ],
  },
  {
    id: "absolute-book",
    slug: "absolute-book",
    title: "AbsoluteBook",
    description: "开源智能读书软件",
    year: 2025,
    // repo: "https://github.com/username/absolute_book",
    techStack: [
      "Python",
      "FastAPI",
      "LangChain",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "Milvus",
    ],
    isWIP: true,
    detailDescription:
      "AbsoluteBook是一款智能读书软件，结合AI技术提供深度阅读体验。系统支持导入电子书，基于书籍内容进行智能对话，提供翻译辅助功能，以及笔记与标注功能。平台还支持社区共享，用户可以分享翻译和注释，构建共同学习的知识库。",
    projectType: "全栈应用",
    role: "全栈开发者",
    duration: "2025年5月 - 进行中",
    teamSize: 1,
    highlights: [
      "基于Agent架构的AI对话系统，能理解整本书的上下文",
      "多层级检索增强生成系统，提供精准内容理解",
      "智能翻译质量评估与改进功能",
      "多色标注和文本注释系统",
      "社区共享知识库",
    ],
    challenges: [
      "构建能理解长文本上下文的AI对话系统",
      "优化大规模文本的检索效率和准确性",
      "设计高质量的翻译评估系统",
      "实现流畅的多端阅读体验",
    ],
    solutions: [
      "采用LangGraph构建多Agent协作系统",
      "实现混合检索策略，结合向量搜索和结构化过滤",
      "设计专用翻译评估链和改进链",
      "基于epub.js构建跨平台阅读器核心",
    ],
    images: [],
  },

  {
    id: "any-concept",
    slug: "any-concept",
    title: "AnyConcept",
    description: "个人网站 — 作品集、项目展示、文章",
    year: 2025,
    link: "https://klauden.xyz",
    repo: "https://github.com/KKlauden/any_concept",
    techStack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Velite",
    ],
    detailDescription:
      "AnyConcept 是 klauden.xyz 个人网站，以 Kinetic Typography 和精密工程感为设计语言。首页通过弹簧物理驱动的动态字母、多层可展开交互文本、自定义十字光标等细节，打造沉浸式的第一印象。基于 Velite 的 Markdown 内容管道支撑文章系统，全站部署于 Vercel。",
    projectType: "Web应用",
    role: "设计 + 全栈开发",
    duration: "2025年7月 - 进行中",
    teamSize: 1,
    highlights: [
      "KineticLetter 弹簧物理交互 — 鼠标接近时字母产生弹性位移",
      "13 项可展开交互文本系统，最深 4 层嵌套，含进度追踪和完成彩蛋",
      "自定义十字准星光标，hover 交互元素时变为橙色圆环",
      "EMAIL 复制按钮 — roller 动画切换 + ✓ 反馈",
      "静态 PNG 噪点纹理 + background-clip: text 替代 SVG 实时滤镜",
      "点阵网格 + 双侧光源漂移 + 鼠标跟随光晕的多层背景系统",
      "基于 Velite 的 Markdown 文章系统，支持中英文",
    ],
    challenges: [
      "React 19 严格模式下的组件定义和 hooks 顺序约束",
      "SVG feTurbulence 滤镜导致的 GPU 高负载",
      "CSS filter 继承问题 — 父级 filter 无法在子元素覆盖",
      "多个 mousemove 监听器的性能瓶颈",
    ],
    solutions: [
      "所有子组件提取为顶级定义，hooks 置于条件 return 之前",
      "用 128×128 PNG 噪点 + background-clip: text 替代实时 SVG 滤镜",
      "将 text-grain 从包裹 span 移至每个字母元素，解决 filter 继承",
      "注册表模式：7 个 mousemove 合并为 1 个共享监听器",
    ],
    images: [],
  },

  // {
  //   id: "interactive-text",
  //   slug: "interactive-text",
  //   title: "交互式文本引擎",
  //   description: "支持打字机效果和多层级交互内容展示的React组件",
  //   year: 2025,
  //   techStack: ["React", "TypeScript", "Framer Motion"],
  //   detailDescription:
  //     "交互式文本引擎是一个专为创意内容展示设计的React组件库，它提供了丰富的文本动画和交互效果，包括打字机效果、文本分词、动态展开和折叠等功能。",
  //   projectType: "React组件库",
  //   role: "前端开发者",
  //   duration: "2023年7月",
  //   teamSize: 1,
  //   highlights: [
  //     "高度可定制的打字机效果",
  //     "支持中英文混排自然换行",
  //     "多级嵌套内容结构",
  //     "动画效果丰富且性能优化",
  //   ],
  //   challenges: [
  //     "实现自然的打字机效果同时保持性能",
  //     "处理中英文混排时的分词和换行",
  //     "多层级内容的状态管理",
  //   ],
  //   solutions: [
  //     "使用RequestAnimationFrame精确控制动画帧",
  //     "实现自定义文本分词算法",
  //     "采用Context API进行状态管理",
  //   ],
  //   images: [

  //   ],
  // },

  {
    id: "bilibili-football",
    slug: "bilibili-football",
    title: "哔哩哔哩足球直播系统",
    description: "赛事数据可视化与动画直播解决方案",
    year: 2024,
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "D3.js",
      "WebSocket",
      "Canvas",
      "GSAP",
      "Three.js",
      "Python",
      "FastAPI",
    ],
    detailDescription:
      "为Bilibili开发的足球赛事直播系统，包含数据可视化页面和动画直播页面。系统基于opta数据源进行处理，提供实时比赛数据、球员数据、战术分析等内容，支持嵌入至Bilibili平台的多种场景。项目注重用户体验和数据呈现的创新性，通过丰富的视觉效果提升了足球内容的观赏价值。",
    projectType: "Web应用",
    role: "全栈开发者",
    duration: "2023年10月 - 2024年8月",
    teamSize: 3,
    highlights: [
      "实时足球数据可视化组件库",
      "基于Canvas和WebGL的动画比赛回放系统",
      "数据驱动的战术分析界面",
      "响应式设计，适配多种终端设备",
      "实时WebSocket数据更新机制",
      "定制化主题支持B站品牌风格",
    ],
    challenges: [
      "处理复杂的足球数据结构和实时更新",
      "优化大量数据的渲染性能",
      "确保动画系统的流畅性和准确性",
      "满足B站特有的嵌入式场景需求",
    ],
    solutions: [
      "设计模块化的数据处理与展示架构",
      "使用虚拟化技术优化长列表性能",
      "实现Canvas绘制与GSAP动画混合技术",
      "开发专用的嵌入SDK适配不同场景",
    ],
    images: [
      {
        src: "/images/projects/bilibili-football/bilibili_01.jpg",
        alt: "哔哩哔哩足球数据面板",
      },
    ],
  },
  {
    id: "migu-data-service",
    slug: "migu-data-service",
    title: "咪咕视频数据服务",
    description: "为咪咕视频开发的足球数据对接定制API服务",
    year: 2024,
    techStack: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "PostgreSQL",
      "Docker",
      "Uvicorn",
      "Gunicorn",
      "HTTPS/SSL",
      "RESTful API",
    ],
    detailDescription:
      "为中国视频公司咪咕开发的足球数据对接定制API服务。该项目实现了咪咕平台所需的足球赛事数据接口，包括赛事信息、比赛数据、球队信息、球员详情等多种类型的数据服务，支持咪咕的视频直播和用户交互体验。",
    projectType: "API服务",
    role: "后端开发者",
    duration: "2023年12月 - 2024年7月",
    teamSize: 3,
    highlights: [
      "高性能API设计与实现，支持大规模并发请求",
      "完整的足球数据对接服务，覆盖多种赛事类型",
      "安全的用户认证与授权机制",
      "特别定制的欧洲杯2024数据服务",
      "基于Docker的高可用容器化部署",
    ],
    challenges: [
      "处理和整合来自多个数据源的足球赛事数据",
      "确保API服务的高性能和低延迟",
      "实现数据的实时更新和同步",
      "满足定制化的数据展示需求",
    ],
    solutions: [
      "采用FastAPI实现高性能异步API服务",
      "基于SQLAlchemy设计优化的数据库模型和查询",
      "实现模块化的服务架构，便于扩展和维护",
      "使用Docker容器化技术实现可靠部署",
    ],
    images: [
      {
        src: "/images/projects/migu-data-service/migu_01.jpg",
        alt: "咪咕视频数据服务",
      },
    ],
  },

  {
    id: "bravo-gpt",
    slug: "bravo-gpt",
    title: "BRAVO GPT",
    description: "足球赛事大语言模型",
    year: 2023,
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "LlamaIndex",
      "OpenAI",
      "PostgreSQL",
      "SQLAlchemy",
    ],
    detailDescription:
      "Bravo GPT是一个针对足球赛事的智能分析和预测系统，结合了大语言模型技术与体育数据分析。用户可以浏览即将进行的足球比赛，查询详细赔率和历史数据，并通过智能问答系统获取AI分析、预测和购彩建议。",
    projectType: "Web应用",
    role: "全栈开发者",
    duration: "2023年8月 - 2023年9月",
    teamSize: 1,
    highlights: [
      "基于LlamaIndex的智能问答系统",
      "实时赛事数据可视化与分析",
      "赔率分析与购彩建议功能",
      "历史对阵数据整合与展示",
      "现代化响应式用户界面",
    ],
    challenges: [
      "处理和整合来自多个数据源的足球赛事数据",
      "构建高效的文本索引和检索系统",
      "优化AI模型响应速度和准确性",
      "设计直观易用的用户交互界面",
    ],
    solutions: [
      "采用模块化架构分离前后端关注点",
      "使用LlamaIndex和GPT-3.5进行语义检索与生成",
      "实现数据库缓存优化查询性能",
      "基于TypeScript和Tailwind构建组件化UI",
    ],
    images: [
      {
        src: "/images/projects/bravo-gpt/bravo_gpt_01.jpg",
        alt: "Bravo GPT 页面",
      },
    ],
  },

  {
    id: "bravo-website-v3",
    slug: "bravo-website-v3",
    title: "BRAVO Website",
    description: "Bravo 官方网站",
    year: 2023,
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "ECharts",
      "i18next",
      "date-fns",
    ],
    detailDescription:
      "这是一个使用Next.js构建的足球数据分析平台，提供比赛数据可视化、比赛预测等功能。国际化，以及亮/暗色主题切换，为用户提供全面的足球赛事数据分析体验。",
    projectType: "Web应用",
    role: "产品设计，UI/UX，前端开发",
    duration: "2023年3月 - 2023年12月",
    link: "https://bravo.klauden.xyz",
    teamSize: 3,
    highlights: [
      "基于Next.js的服务器端渲染架构",
      "使用ECharts实现复杂足球数据可视化",
      "多语言国际化支持",
      "响应式设计，适配移动端和桌面端",
      "亮/暗色主题切换功能",
      "世界杯赛事预测和数据分析",
    ],
    challenges: [
      "在服务器端渲染(SSR)环境中使用客户端库(如ECharts)的兼容性问题",
      "处理复杂的足球赛事数据结构和实时更新",
      "确保在不同设备和浏览器上的一致性体验",
      "优化大量数据的加载性能",
    ],
    solutions: [
      "使用动态导入和NoSSR组件解决客户端库的SSR问题",
      "设计模块化组件架构，提高代码复用性",
      "采用Tailwind CSS实现响应式设计",
      "使用客户端数据缓存优化性能",
    ],
    images: [
      {
        src: "/images/projects/bravo-website/bravo_website_01.jpg",
        alt: "Bravo Website V3 页面",
      },
    ],
  },

  {
    id: "autobet",
    slug: "autobet",
    title: "AUTOBET",
    description: "自动投注系统",
    year: 2022,
    techStack: [
      "Python",
      "PostgreSQL",
      "SQLAlchemy",
      "Telegram Bot API",
      "OpenAI",
      "Docker",
      "BeautifulSoup",
      "Redis",
    ],
    detailDescription:
      "AUTOBET是一个足球比赛自动投注系统，集成了多源足球数据，提供比赛预测和投注建议。系统通过采集各种足球赛事数据，结合AI技术进行分析预测，并通过Telegram机器人为用户提供投注参考和自动化服务。",
    projectType: "数据分析系统",
    role: "全栈开发者",
    duration: "2022年8月 - 2023年5月",
    teamSize: 2,
    highlights: [
      "多源足球数据整合与分析系统",
      "基于历史数据的比赛结果预测模型",
      "赔率分析与价值投注推荐",
      "多语言支持的Telegram机器人服务",
      "自动化数据更新与处理流程",
    ],
    challenges: [
      "处理来自多个数据源的异构数据",
      "构建高准确度的预测模型",
      "优化大规模数据的存储和查询效率",
      "保证24/7实时数据更新与服务可用性",
    ],
    solutions: [
      "设计模块化的数据采集与处理流程",
      "实现混合分析策略，结合统计模型与AI预测",
      "使用PostgreSQL进行高效数据管理",
      "构建基于Docker的高可用部署架构",
    ],
    images: [
      {
        src: "/images/projects/autobet/autobet_01.jpg",
        alt: "AUTOBET 页面",
      },
    ],
  },
  {
    id: "soccer-ml",
    slug: "soccer-ml",
    title: "SoccerML",
    description: "足球赛事结果预测系统",
    year: 2021,
    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "XGBoost",
      "PyTorch",
      "Scikit-learn",
      "SQLAlchemy",
      "PostgreSQL",
      "Jupyter Notebook",
      "Boruta",
    ],
    detailDescription:
      "SoccerML是一个足球比赛结果预测系统，通过整合多源数据（赔率、历史战绩、实时指标等）构建多种机器学习模型以预测足球比赛的主胜、平局或客胜结果。系统使用SVM、XGBoost和神经网络等多种算法，结合泊松分布和统计分析方法，提高预测准确性。",
    projectType: "数据分析与预测系统",
    role: "机器学习工程师",
    duration: "2021年9月 - 2022年6月",
    teamSize: 2,
    highlights: [
      "多模型集成预测系统（SVM、XGBoost、神经网络）",
      "基于泊松分布的进球预测模型",
      "特征工程与自动特征选择（Boruta算法）",
      "赔率数据实时处理与分析",
      "多版本迭代优化的模型架构",
    ],
    challenges: [
      "处理足球比赛结果的高度不确定性",
      "整合多源异构数据并提取有效特征",
      "平衡模型复杂度与预测准确性",
      "应对赔率数据的实时变化",
    ],
    solutions: [
      "设计模块化的数据处理流程",
      "实现多模型投票系统提高预测鲁棒性",
      "使用Boruta和RFE算法进行特征选择优化",
      "开发自动化数据采集和模型训练流程",
    ],
    images: [
      {
        src: "/images/projects/soccer-ml/soccer_ml_01.jpg",
        alt: "SoccerML 页面",
      },
    ],
    references: [
      {
        title:
          "深度生成多智能体模仿模型作为评估人类在复杂交互任务中表现的计算基准：足球案例研究",
        source: "",
      },
      {
        title: "Prediction of football match results with Machine Learning",
        source: "arXiv",
      },
      {
        title: "Machine Learning in Football Betting Prediction",
        source: "IEEE",
      },
      {
        title: "Investigating the efficiency of the Asian handicap",
        source: "Journal of Sports Economics",
      },
      {
        title:
          "Bayesian modelling of football outcomes: Using the Skellam's distribution",
        source: "International Journal of Forecasting",
      },
    ],
  },

  {
    id: "dorgari-videos",
    slug: "dorgari-videos",
    title: "DorgariVideos",
    description: "自动化视频生成工具",
    year: 2021,
    repo: "https://github.com/KKlauden/dorgari-video-maker",
    techStack: [
      "Python",
      "MoviePy",
      "Tkinter",
      "Pandas",
      "Microsoft Cognitive Services API",
      "jieba",
      "librosa",
    ],
    detailDescription:
      "Dorgari Videos是一个专为足球赛事数据可视化设计的自动化视频制作工具。该系统能够读取足球比赛数据（包括比赛时间、球队信息、联赛资料和数据洞察），自动生成专业的赛前预测和数据分析视频，大大提高了体育内容创作的效率。",
    projectType: "桌面应用",
    role: "全栈开发者",
    duration: "2021年8月 - 2021年12月",
    teamSize: 1,
    highlights: [
      "支持多种足球联赛（欧冠、英超、西甲、意甲等）",
      "自动文本转语音功能",
      "横版和竖版双格式视频生成",
      "数据可视化和图表生成",
      "用户友好的图形界面",
    ],
    challenges: [
      "处理不同联赛和球队的多样化数据",
      "优化视频渲染性能",
      "实现高质量的文本到语音转换",
      "设计适应多种屏幕比例的视频模板",
    ],
    solutions: [
      "构建模块化的数据处理流程",
      "使用MoviePy进行高效视频合成",
      "集成微软认知服务API实现自然语音合成",
      "设计适应性强的视频模板系统",
    ],
    images: [
      {
        src: "/images/projects/dorgari-videos/dorgari_videos_01.jpg",
        alt: "DorgariVideos 页面",
      },
    ],
  },
];

// 获取所有项目数据
export async function getAllProjects(): Promise<Project[]> {
  return projectData;
}

// 通过ID获取特定项目
export async function getProjectById(id: string): Promise<Project | undefined> {
  return projectData.find((project) => project.id === id);
}

// 通过slug获取特定项目
export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  return projectData.find((project) => project.slug === slug);
}

// 获取所有项目的slug
export async function getAllProjectSlugs(): Promise<string[]> {
  return projectData
    .filter((project) => project.slug)
    .map((project) => project.slug || "");
}
