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
    id: "mastea",
    slug: "mastea",
    title: "Mastea",
    description: "AI-driven tea customization platform",
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
      "Mastea is an AI-powered personalized wellness tea customization platform that combines traditional Chinese medicine theory with modern technology to provide users with exclusive constitution analysis and tea recommendations. Through a WeChat Mini Program, users can complete constitution assessments, receive health reports, consult an AI wellness tea advisor, and purchase or customize teas suitable for their individual needs.",
    projectType: "WeChat Mini Program",
    role: "Full-stack Developer",
    duration: "June 2025 - Ongoing",
    teamSize: 4,
    isWIP: true,
    highlights: [
      "AI intelligent consultation system based on Chinese medicine constitution theory",
      "Personalized tea recommendation engine",
      "Natural language interactive AI tea advisor",
      "Seamless WeChat Mini Program authorization and payment integration",
      "Complete shopping cart and order management system",
    ],
    challenges: [
      "Syntax compatibility limitations in the WeChat Mini Program environment",
      "Special adaptation of TailwindCSS in Mini Programs",
      "Type-safe data interaction between frontend and backend",
      "Accuracy of Chinese medicine constitution analysis and tea recommendation algorithms",
    ],
    solutions: [
      "Developed coding style guidelines compatible with WeChat Mini Program environment",
      "Customized TailwindCSS configuration for Mini Program environment",
      "Used TypeScript interfaces to ensure data consistency",
      "Combined traditional Chinese medicine theory with modern AI technology to build recommendation system",
    ],
    images: [
     
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
    description: "Personal portfolio and creative showcase platform",
    year: 2025,
    repo: "https://github.com/KKlauden/any_concept",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    detailDescription:
      "AnyConcept is a platform for showcasing personal work and creativity, built entirely on Next.js and React technology stack. This project aims to create a minimalist yet elegant portfolio website while practicing the latest web development technologies and concepts.",
    projectType: "Web Application",
    role: "Full-stack Developer",
    duration: "July 2025 - Ongoing",
    teamSize: 1,
    highlights: [
      "Adopts Next.js App Router architecture",
      "Responsive design adapted for various device sizes",
      "Focuses on ultimate interaction experience optimization",
      "Implements custom interactive text components",
    ],
    challenges: [
      "Providing rich functionality while maintaining minimalist design",
      "Optimizing first-screen loading performance",
      "Implementing complex text animation effects",
    ],
    solutions: [
      "Adopted component-based design with separation of concerns",
      "Used Next.js image and font optimization features",
      "Implemented theme switching using CSS variables",
    ],
    images: [
     
    ],
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