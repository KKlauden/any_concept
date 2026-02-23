// Define project types
export interface Project {
  id: string; // Unique project identifier
  title: string; // Project title
  description: string; // Project description (optional, used for display in project list)
  year: string | number; // Project year
  link?: string; // Project link (optional, for external navigation)
  repo?: string; // Code repository link (optional)
  techStack?: string[]; // Technology stack (optional)
  isWIP?: boolean; // Whether it's a work in progress project

  // Detail page fields
  slug?: string; // URL-friendly identifier
  detailDescription?: string; // Detailed description
  projectType?: string; // Project type: e.g., "Web Application", "Mobile App", etc.
  role?: string; // Role in the project
  duration?: string; // Project duration
  teamSize?: number; // Team size
  highlights?: string[]; // Project highlights list
  challenges?: string[]; // Project challenges list
  solutions?: string[]; // Solutions list
  images?: ProjectImage[]; // Project images
  references?: { title: string; source: string }[]; // Project references
}

// Define project image types
export interface ProjectImage {
  src: string; // Image path
  alt?: string; // Image alt text
  caption?: string; // Image caption
  isVideo?: boolean; // Whether it's a video
}

// Project data
const projectData: Project[] = [
  {
    id: "doc-chat",
    slug: "doc-chat",
    title: "DocChat",
    description: "AI-powered API documentation assistant",
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
      "DocChat is an AI-powered API documentation assistant designed to help developers locate endpoints, understand parameters, and explore data structures through natural language. The system uses a deterministic-first + LLM-fallback two-phase routing architecture — ~80% of queries are resolved without any LLM calls, significantly reducing costs. Currently launched with Opta/Stats Perform sports data APIs as the first use case, supporting Motorsport (7 feeds) and Soccer (92 feeds) with a 4-layer knowledge injection system for precise answers. The long-term vision is a general-purpose API documentation platform where users can upload any OpenAPI spec and auto-generate knowledge bases. The frontend features a terminal-style dark theme (neon green + Matrix rain background), SSE streaming conversations, session history management, and user authentication.",
    projectType: "Full-stack Application",
    role: "Full-stack Developer",
    duration: "February 2026 - Ongoing",
    teamSize: 1,
    isWIP: true,
    highlights: [
      "Two-phase routing — deterministic keyword matching first (~2650 triggers), LLM fallback, ~80% queries with zero LLM calls",
      "4-layer knowledge injection — endpoint-level docs → domain overview → shared knowledge base → dynamic topic routing (INDEX.yaml driven)",
      "Current use case: Opta sports data API — 99 endpoints covered (Motorsport 7 + Soccer 92), each with full knowledge files",
      "Terminal-style UI — neon green (#DCFF71) + Matrix rain background, Hack font, glassmorphism input",
      "SSE streaming chat + Streamdown Markdown rendering + syntax highlighting + bilingual (EN/CN) support",
      "Full user system — JWT auth (Access + Refresh tokens), conversation history, auto-generated session titles",
    ],
    challenges: [
      "Knowledge organization and precise routing across large-scale API endpoints, preventing LLM hallucination in massive documentation",
      "Data fusion from three sources: OpenAPI specs + PDF documentation + hand-written knowledge files",
      "SSE streaming communication with static-exported frontend (output: export)",
      "Docker containerized deployment with PostgreSQL network topology configuration",
    ],
    solutions: [
      "Built enhanced index JSON (Swagger parsing + PDF extraction + metadata injection), loaded into memory at startup",
      "Designed META.yaml with triggers + fields + scenarios for multi-dimensional matching, covering the vast majority of queries deterministically",
      "Vercel AI SDK v6 + TextStreamChatTransport for frontend SSE consumption",
      "Docker Compose with external network sharing PostgreSQL container, Nginx reverse proxy + Let's Encrypt HTTPS",
    ],
    images: [
      {
        src: "/images/projects/doc-chat/doc_chat_01.jpg",
        alt: "DocChat terminal-style login interface",
        caption: "Matrix rain background + terminal emulator-style secure authentication interface",
      },
      {
        src: "/images/projects/doc-chat/doc_chat_02.jpg",
        alt: "DocChat main chat interface",
        caption: "Soccer API with 92 feeds loaded, sidebar session history, suggested query prompts",
      },
      {
        src: "/images/projects/doc-chat/doc_chat_03.jpg",
        alt: "DocChat AI conversation response",
        caption: "Natural language query → precise TM2 endpoint match with structured parameter docs and dependency chain",
      },
    ],
  },
  {
    id: "mastea",
    slug: "mastea",
    title: "Mastea",
    description: "AI-driven personalized wellness tea platform",
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
      "Mastea is an AI-powered personalized wellness tea platform that combines Traditional Chinese Medicine (TCM) Nine-Constitution theory with LLM-driven analysis to deliver a full-loop experience — from constitution assessment and tongue diagnosis to personalized tea recommendations. The frontend is a Taro React WeChat Mini Program; the backend runs FastAPI + PostgreSQL with DeepSeek-V3 for AI consultation and SSE streaming. Features include VIP subscription with custom tea blend formulas, health goal milestone tracking, long-term constitution record management, and a complete e-commerce system (cart, orders, WeChat Pay).",
    projectType: "WeChat Mini Program",
    role: "Full-stack Developer",
    duration: "June 2025 - Ongoing",
    teamSize: 4,
    isWIP: true,
    highlights: [
      "12-question TCM constitution quiz + AI radar-chart report (composite score, constitution analysis, AI insights)",
      "AI tongue diagnosis — photo upload for tongue coating analysis and constitution-based health advice",
      "SSE-streaming AI wellness advisor powered by DeepSeek-V3 for real-time consultations",
      "VIP subscription system — custom tea blend ingredients with AI-precise dosage recommendations",
      "Health goal milestones — daily check-ins, tea reminders, tongue tracking, completion rewards",
      "Long-term constitution records — historical report timeline, score trend charts, periodic re-assessment reminders",
      "Full e-commerce system — seasonal picks, category filters, shopping cart, WeChat Pay, order management",
    ],
    challenges: [
      "API differences and syntax constraints of Taro React in WeChat Mini Program environment",
      "TailwindCSS class name compilation and adaptation in Mini Program WXSS",
      "Implementing SSE streaming responses via Mini Program RequestTask",
      "Secure tongue image upload to Tencent Cloud COS with proper authentication",
      "Scientific rigor of TCM constitution scoring and accuracy of AI recommendations",
    ],
    solutions: [
      "Built Taro compatibility layer unifying H5 and Mini Program API calls",
      "Custom TailwindCSS PostCSS plugin for Mini Program class name transformation",
      "ReadableStream-based SSE client wrapper with typewriter effect support",
      "Backend-issued temporary keys + client-direct COS upload to reduce server bandwidth",
      "Combined TCM Nine-Constitution standard scoring system with DeepSeek-V3 semantic analysis",
    ],
    images: [
      {
        src: "/images/projects/mastea/xhs_01.JPG",
        alt: "Constitution radar chart and health report",
        caption: "AI-generated nine-constitution radar chart with composite health score report",
      },
      {
        src: "/images/projects/mastea/xhs_02.JPG",
        alt: "Daily health briefing",
        caption: "AI daily health briefing with personalized wellness recommendations",
      },
      {
        src: "/images/projects/mastea/xhs_03.JPG",
        alt: "AI tongue diagnosis",
        caption: "Photo-based tongue coating analysis with AI constitution recognition",
      },
      {
        src: "/images/projects/mastea/xhs_04.JPG",
        alt: "AI conversational consultation",
        caption: "DeepSeek-V3 powered SSE-streaming AI wellness advisor",
      },
      {
        src: "/images/projects/mastea/xhs_05.JPG",
        alt: "Visual constitution assessment",
        caption: "Detailed constitution breakdown (physical traits, symptoms, psychology, susceptible diseases) with AI insights",
      },
      {
        src: "/images/projects/mastea/xhs_06.JPG",
        alt: "Personalized tea recommendations",
        caption: "VIP custom tea blend formulas vs basic recommendations with AI-precise ingredients",
      },
      {
        src: "/images/projects/mastea/xhs_07.JPG",
        alt: "Tea shop and health milestones",
        caption: "Seasonal tea picks, category browsing, health goal check-ins and tongue tracking",
      },
      {
        src: "/images/projects/mastea/xhs_08.JPG",
        alt: "Long-term constitution records",
        caption: "Constitution score trend charts, historical report timeline, periodic re-assessment prompts",
      },
    ],
  },

  {
    id: "absolute-book",
    slug: "absolute-book",
    title: "AbsoluteBook",
    description: "Open-source intelligent reading software",
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
      "AbsoluteBook is an intelligent reading software that combines AI technology to provide deep reading experiences. The system supports importing e-books, enables intelligent conversations based on book content, provides translation assistance, and offers note-taking and annotation features. The platform also supports community sharing, allowing users to share translations and annotations to build a collaborative learning knowledge base.",
    projectType: "Full-stack Application",
    role: "Full-stack Developer",
    duration: "May 2025 - Ongoing",
    teamSize: 1,
    highlights: [
      "AI dialogue system based on Agent architecture that understands entire book context",
      "Multi-layered Retrieval Augmented Generation system for precise content understanding",
      "Intelligent translation quality assessment and improvement functionality",
      "Multi-color annotation and text annotation system",
      "Community-shared knowledge base",
    ],
    challenges: [
      "Building AI dialogue system capable of understanding long-text context",
      "Optimizing retrieval efficiency and accuracy for large-scale text",
      "Designing high-quality translation assessment system",
      "Implementing smooth multi-platform reading experience",
    ],
    solutions: [
      "Adopted LangGraph to build multi-Agent collaboration system",
      "Implemented hybrid retrieval strategy combining vector search and structured filtering",
      "Designed specialized translation evaluation and improvement chains",
      "Built cross-platform reader core based on epub.js",
    ],
    images: [
      
    ],
  },

  {
    id: "any-concept",
    slug: "any-concept",
    title: "AnyConcept",
    description: "Personal website — portfolio, projects, articles",
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
      "AnyConcept is the personal website at klauden.xyz, built with Kinetic Typography and precision-engineered aesthetics. The homepage features spring-physics-driven letter animations, a multi-layer expandable interactive text system, a custom crosshair cursor, and layered background effects. The article system is powered by Velite's Markdown content pipeline, and the entire site is deployed on Vercel.",
    projectType: "Web Application",
    role: "Design + Full-stack Development",
    duration: "July 2025 - Ongoing",
    teamSize: 1,
    highlights: [
      "KineticLetter spring physics — letters displace elastically on mouse proximity",
      "13-item expandable interactive text system, up to 4 levels deep, with progress tracking and completion easter egg",
      "Custom crosshair cursor with accent-colored hover ring",
      "EMAIL copy button — roller animation with ✓ feedback",
      "Static PNG noise texture + background-clip: text replacing real-time SVG filters",
      "Multi-layer background: dot grid + dual ambient glow drift + mouse-following glow",
      "Velite-powered Markdown article system with bilingual support",
    ],
    challenges: [
      "React 19 strict mode constraints on component definitions and hooks ordering",
      "SVG feTurbulence filter causing high GPU load",
      "CSS filter inheritance — parent filter cannot be overridden on child elements",
      "Performance bottleneck from multiple mousemove listeners",
    ],
    solutions: [
      "Extracted all sub-components to top-level definitions, hooks placed before conditional returns",
      "Replaced real-time SVG filter with 128×128 PNG noise + background-clip: text",
      "Moved text-grain class from wrapper span to individual letter elements",
      "Registry pattern: consolidated 7 mousemove listeners into 1 shared handler",
    ],
    images: [],
  },

  {
    id: "bilibili-football",
    slug: "bilibili-football",
    title: "Bilibili Football",
    description: "live streaming solution",
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
      "Football live streaming system developed for Bilibili, including data visualization pages and animated live streaming pages. The system processes data based on Opta data sources, providing real-time match data, player statistics, tactical analysis, and supports embedding into various Bilibili platform scenarios. The project focuses on user experience and innovative data presentation, enhancing the viewing value of football content through rich visual effects.",
    projectType: "Web Application",
    role: "Full-stack Developer",
    duration: "October 2023 - August 2024",
    teamSize: 3,
    highlights: [
      "Real-time football data visualization component library",
      "Canvas and WebGL-based animated match replay system",
      "Data-driven tactical analysis interface",
      "Responsive design adapted for multiple terminal devices",
      "Real-time WebSocket data update mechanism",
      "Customized theme supporting Bilibili brand style",
    ],
    challenges: [
      "Handling complex football data structures and real-time updates",
      "Optimizing rendering performance for large amounts of data",
      "Ensuring fluidity and accuracy of animation systems",
      "Meeting Bilibili's specific embedded scenario requirements",
    ],
    solutions: [
      "Designed modular data processing and display architecture",
      "Used virtualization technology to optimize long list performance",
      "Implemented hybrid Canvas rendering and GSAP animation technology",
      "Developed specialized embedding SDK for different scenarios",
    ],
    images: [
      {
        src: "/images/projects/bilibili-football/bilibili_01.jpg",
        alt: "Bilibili Football Data Panel",
      },
    
    ],
  },
  {
    id: "migu-data-service",
    slug: "migu-data-service",
    title: "Migu Data Service",
    description: "Custom football data integration API service",
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
      "Custom football data integration API service developed for Chinese video company Migu. This project implements football match data interfaces required by the Migu platform, including match information, game data, team information, player details, and various other data services to support Migu's video streaming and user interaction experience.",
    projectType: "API Service",
    role: "Backend Developer",
    duration: "December 2023 - July 2024",
    teamSize: 3,
    highlights: [
      "High-performance API design and implementation supporting large-scale concurrent requests",
      "Complete football data integration service covering multiple match types",
      "Secure user authentication and authorization mechanism",
      "Specially customized Euro 2024 data service",
      "Docker-based high-availability containerized deployment",
    ],
    challenges: [
      "Processing and integrating football match data from multiple data sources",
      "Ensuring high performance and low latency of API services",
      "Implementing real-time data updates and synchronization",
      "Meeting customized data display requirements",
    ],
    solutions: [
      "Adopted FastAPI to implement high-performance asynchronous API services",
      "Designed optimized database models and queries based on SQLAlchemy",
      "Implemented modular service architecture for easy expansion and maintenance",
      "Used Docker containerization technology for reliable deployment",
    ],
    images: [
      {
        src: "/images/projects/migu-data-service/migu_01.jpg",
        alt: "Migu Video Data Service",
      },
     
    ],
  },

  {
    id: "bravo-gpt",
    slug: "bravo-gpt",
    title: "BRAVO GPT",
    description: "Football match large language model",
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
      "Bravo GPT is an intelligent analysis and prediction system for football matches that combines large language model technology with sports data analysis. Users can browse upcoming football matches, query detailed odds and historical data, and receive AI analysis, predictions, and betting advice through the intelligent Q&A system.",
    projectType: "Web Application",
    role: "Full-stack Developer",
    duration: "August 2023 - September 2023",
    teamSize: 1,
    highlights: [
      "Intelligent Q&A system based on LlamaIndex",
      "Real-time match data visualization and analysis",
      "Odds analysis and betting recommendation functionality",
      "Historical match data integration and display",
      "Modern responsive user interface",
    ],
    challenges: [
      "Processing and integrating football match data from multiple data sources",
      "Building efficient text indexing and retrieval system",
      "Optimizing AI model response speed and accuracy",
      "Designing intuitive and user-friendly interaction interface",
    ],
    solutions: [
      "Adopted modular architecture to separate frontend and backend concerns",
      "Used LlamaIndex and GPT-3.5 for semantic retrieval and generation",
      "Implemented database caching to optimize query performance",
      "Built component-based UI based on TypeScript and Tailwind",
    ],
    images: [
      {
        src: "/images/projects/bravo-gpt/bravo_gpt_01.jpg",
        alt: "Bravo GPT Interface",
      },
    
    ],
  },

  {
    id: "bravo-website-v3",
    slug: "bravo-website-v3",
    title: "BRAVO Website",
    description: "Bravo official website",
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
      "This is a football data analysis platform built with Next.js, providing match data visualization, match predictions, and other features. With internationalization and light/dark theme switching, it provides users with a comprehensive football match data analysis experience.",
    projectType: "Web Application",
    role: "Product Design, UI/UX, Frontend Development",
    duration: "March 2023 - December 2023",
    link: "https://bravo.klauden.xyz",
    teamSize: 3,
    highlights: [
      "Server-side rendering architecture based on Next.js",
      "Complex football data visualization implemented with ECharts",
      "Multi-language internationalization support",
      "Responsive design adapted for mobile and desktop",
      "Light/dark theme switching functionality",
      "World Cup match prediction and data analysis",
    ],
    challenges: [
      "Compatibility issues using client-side libraries (like ECharts) in server-side rendering (SSR) environment",
      "Handling complex football match data structures and real-time updates",
      "Ensuring consistent experience across different devices and browsers",
      "Optimizing loading performance for large amounts of data",
    ],
    solutions: [
      "Used dynamic imports and NoSSR components to solve SSR issues with client-side libraries",
      "Designed modular component architecture to improve code reusability",
      "Adopted Tailwind CSS for responsive design implementation",
      "Used client-side data caching to optimize performance",
    ],
    images: [
      {
        src: "/images/projects/bravo-website/bravo_website_01.jpg",
        alt: "Bravo Website V3 Interface",
      },
      
    ],
  },

  {
    id: "autobet",
    slug: "autobet",
    title: "AUTOBET",
    description: "Automated betting system",
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
      "AUTOBET is an automated betting system for football matches that integrates multi-source football data, provides match predictions and betting recommendations. The system collects various football match data, uses AI technology for analysis and prediction, and provides betting references and automated services to users through Telegram bots.",
    projectType: "Data Analysis System",
    role: "Full-stack Developer",
    duration: "August 2022 - May 2023",
    teamSize: 2,
    highlights: [
      "Multi-source football data integration and analysis system",
      "Match result prediction model based on historical data",
      "Odds analysis and value betting recommendations",
      "Multi-language Telegram bot service",
      "Automated data update and processing workflow",
    ],
    challenges: [
      "Processing heterogeneous data from multiple data sources",
      "Building high-accuracy prediction models",
      "Optimizing storage and query efficiency for large-scale data",
      "Ensuring 24/7 real-time data updates and service availability",
    ],
    solutions: [
      "Designed modular data collection and processing workflow",
      "Implemented hybrid analysis strategy combining statistical models and AI prediction",
      "Used PostgreSQL for efficient data management",
      "Built high-availability deployment architecture based on Docker",
    ],
    images: [
      {
        src: "/images/projects/autobet/autobet_01.jpg",
        alt: "AUTOBET Interface",
      }
     
    ],
  },
  {
    id: "soccer-ml",
    slug: "soccer-ml",
    title: "SoccerML",
    description: "Football match result prediction system",
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
      "SoccerML is a football match result prediction system that integrates multi-source data (odds, historical records, real-time indicators, etc.) to build various machine learning models to predict home win, draw, or away win outcomes in football matches. The system uses multiple algorithms including SVM, XGBoost, and neural networks, combined with Poisson distribution and statistical analysis methods to improve prediction accuracy.",
    projectType: "Data Analysis & Prediction System",
    role: "Machine Learning Engineer",
    duration: "September 2021 - June 2022",
    teamSize: 2,
    highlights: [
      "Multi-model ensemble prediction system (SVM, XGBoost, Neural Networks)",
      "Poisson distribution-based goal prediction model",
      "Feature engineering and automatic feature selection (Boruta algorithm)",
      "Real-time odds data processing and analysis",
      "Multi-version iterative optimization model architecture",
    ],
    challenges: [
      "Handling high uncertainty in football match results",
      "Integrating multi-source heterogeneous data and extracting effective features",
      "Balancing model complexity and prediction accuracy",
      "Responding to real-time changes in odds data",
    ],
    solutions: [
      "Designed modular data processing workflow",
      "Implemented multi-model voting system to improve prediction robustness",
      "Used Boruta and RFE algorithms for feature selection optimization",
      "Developed automated data collection and model training workflow",
    ],
    images: [
      {
        src: "/images/projects/soccer-ml/soccer_ml_01.jpg",
        alt: "SoccerML Interface",
      },
    
    ],
    references: [
      {
        title:
          "Deep Generative Multi-Agent Imitation Model as a Computational Benchmark for Evaluating Human Performance in Complex Interactive Tasks: A Soccer Case Study",
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
    description: "Automated video generation tool",
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
      "Dorgari Videos is an automated video production tool designed specifically for football match data visualization. The system can read football match data (including match time, team information, league data, and data insights) and automatically generate professional pre-match prediction and data analysis videos, greatly improving the efficiency of sports content creation.",
    projectType: "Desktop Application",
    role: "Full-stack Developer",
    duration: "August 2021 - December 2021",
    teamSize: 1,
    highlights: [
      "Supports multiple football leagues (Champions League, Premier League, La Liga, Serie A, etc.)",
      "Automatic text-to-speech functionality",
      "Dual format video generation (landscape and portrait)",
      "Data visualization and chart generation",
      "User-friendly graphical interface",
    ],
    challenges: [
      "Handling diverse data from different leagues and teams",
      "Optimizing video rendering performance",
      "Implementing high-quality text-to-speech conversion",
      "Designing video templates adaptable to various screen ratios",
    ],
    solutions: [
      "Built modular data processing workflow",
      "Used MoviePy for efficient video composition",
      "Integrated Microsoft Cognitive Services API for natural speech synthesis",
      "Designed highly adaptive video template system",
    ],
    images: [
      {
        src: "/images/projects/dorgari-videos/dorgari_videos_01.jpg",
        alt: "DorgariVideos Interface",
      },
     
    ],
  },
];

// Get all project data
export async function getAllProjects(): Promise<Project[]> {
  return projectData;
}

// Get specific project by ID
export async function getProjectById(id: string): Promise<Project | undefined> {
  return projectData.find((project) => project.id === id);
}

// Get specific project by slug
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return projectData.find((project) => project.slug === slug);
}

// Get all project slugs
export async function getAllProjectSlugs(): Promise<string[]> {
  return projectData
    .filter((project) => project.slug)
    .map((project) => project.slug || "");
}