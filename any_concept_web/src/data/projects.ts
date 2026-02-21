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
    id: "mastea",
    slug: "mastea",
    title: "Mastea",
    description: "AI驱动的个性化养生茶定制平台",
    year: 2025,
    techStack: [
      "Taro",
      "TypeScript",
      "TailwindCSS",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "OpenAI",
      "JWT",
    ],

    detailDescription:
      "Mastea 是一个基于人工智能的个性化养生茶定制平台，结合传统中医理论和现代科技，为用户提供专属的体质分析和茶饮推荐。通过微信小程序，用户可完成体质测评、获取健康报告、咨询AI养生茶顾问，并选购或定制适合自己的茶品。",
    projectType: "微信小程序",
    role: "全栈开发者",
    duration: "2025年6月 - 进行中",
    teamSize: 4,
    isWIP: true,
    highlights: [
      "基于中医体质理论的AI智能问诊系统",
      "个性化茶品推荐引擎",
      "自然语言交互的AI茶饮顾问",
      "微信小程序无缝授权与支付集成",
      "完整的购物车与订单管理系统",
    ],
    challenges: [
      "微信小程序环境下的语法兼容性限制",
      "TailwindCSS在小程序中的特殊适配",
      "前后端数据交互的类型安全保障",
      "中医体质分析与茶品推荐算法的精确性",
    ],
    solutions: [
      "开发兼容微信小程序环境的代码风格规范",
      "针对小程序环境定制TailwindCSS配置",
      "使用TypeScript接口定义确保数据一致性",
      "结合传统中医理论与现代AI技术构建推荐系统",
    ],
    images: [
    
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
    title: "AnyConecpt",
    description: "个人作品及创意展示平台",
    year: 2025,
    repo: "https://github.com/KKlauden/any_concept",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    detailDescription:
      "AnyConecpt是一个用于展示个人作品和创意的平台，完全基于Next.js和React技术栈构建。这个项目旨在创建一个极简而优雅的作品集网站，同时实践最新的Web开发技术和理念。",
    projectType: "Web应用",
    role: "全栈开发者",
    duration: "2025年7月 - 进行中",
    teamSize: 1,
    highlights: [
      "采用Next.js的App Router架构",
      "响应式设计，适配各种设备尺寸",
      "专注于交互体验的极致优化",
      "实现了自定义交互式文本组件",
    ],
    challenges: [
      "保持极简设计的同时提供丰富的功能",
      "优化首屏加载性能",
      "实现复杂的文本动画效果",
    ],
    solutions: [
      "采用组件化设计，分离关注点",
      "使用Next.js的图像和字体优化功能",
      "使用CSS变量实现主题切换",
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
