// Define craft image type
export interface CraftImage {
  src: string;
  alt?: string;
  caption?: string;
  height?: number | string;
}

// Define craft detail type
export interface CraftDetail {
  id: string;
  slug: string;
  title: string;
  year: string | number;
  type: "Brand Visual" | "UI Design" | "Solution Design";
  coverImage?: string; // Optional detail page cover image, uses imageSrc if not provided
  description: string;
  details?: string;
  conclusion?: string;
  hasExternal?: boolean; // Whether it's an external link
  externalText?: string; // External link text
  externalLink?: string; // External link, if provided, clicking will redirect to external website
  images?: CraftImage[]; // Image list for detail page
  height?: number;
  aspectRatio?: string;
  textColor?: string;
  textPosition?: "top" | "bottom";
}

// Craft data
const craftData: CraftDetail[] = [
    {
        id: "bilibili-live",
        slug: "bilibili-live",
        title: "BILIBILI Live Animation & Data",
        year: "2022/2024",
        type: "UI Design",
        coverImage: "/images/crafts/cover/bilibili-live.jpg",
        description: "Animation live streaming and data pages designed for Bilibili, integrating animation elements with real-time data display.",
        details: "This project required handling large amounts of real-time data while maintaining interface aesthetics and user-friendliness. We adopted a modular design approach, allowing users to customize their preferred data modules.",
        conclusion: "The final design met both data display requirements and maintained Bilibili's unique animation style and user experience.",
        height: 360,
        aspectRatio: "1.35",
        textColor: "white",
        textPosition: "bottom",
        images: [
          {
            src: "/images/crafts/bilibili-live/bilibili_01.jpg",
            alt: "Live streaming interface design",
            height: "678px"
          },
          {
            src: "/images/crafts/bilibili-live/bilibili_02.jpg",
            alt: "Data display module",
            height: "768px"
          },
          {
            src: "/images/crafts/bilibili-live/bilibili_03.jpg",
            alt: "Data display module",
            height: "689px"
          },
          {
            src: "/images/crafts/bilibili-live/bilibili_04.jpg",
            alt: "Data display module",
            height: "604px"
          },
        ]
      },
      {
        id: "opta-yinxiang",
        slug: "opta-yinxiang",
        title: "Evernote x Opta Sports Marketing Solution",
        year: 2021,
        type: "Solution Design",
        coverImage: "/images/crafts/cover/opta-yinxiang.jpg",
        description: "Sports marketing solution for Evernote x Opta collaboration",
        details: "Comprehensive sports marketing strategy combining Evernote's note-taking capabilities with Opta's sports data analytics.",
        conclusion: "Successfully integrated two platforms to create a unified sports marketing approach that leverages both brands' strengths.",
        height: 184,
        aspectRatio: "2.64",
        textColor: "black",
        textPosition: "bottom",
        images:[
          {
            src:"/images/crafts/opta-yinxiang/yinxiang_01.jpg",
            alt:"Evernote x Opta Sports Marketing Solution",
            height:"855px"
          },
          {
            src:"/images/crafts/opta-yinxiang/yinxiang_03.jpg",
            alt:"Evernote x Opta Sports Marketing Solution",
            height:"1081px"
          },
          {
            src:"/images/crafts/opta-yinxiang/yinxiang_04.jpg",
            alt:"Evernote x Opta Sports Marketing Solution",
            height:"860px"
          },
        ]
      },
      {
        id: "live-switch",
        slug: "live-switch",
        title: "Live Streaming Switch Animation",
        year: 2021,
        type: "UI Design",
        coverImage: "/videos/live-switch.mp4",
        description: "Smooth transition animation for live streaming platform switching",
        details: "Designed intuitive and engaging animations for seamless live stream transitions, enhancing user experience during content switching.",
        conclusion: "Created fluid animations that provide visual feedback and maintain user engagement during live stream transitions.",
        height: 289,
        aspectRatio: "1.5",
        textColor: "white",
        textPosition: "bottom",
        images:[
          {
            src:"/videos/live-switch.mp4",
            alt:"Live streaming switch animation",
            height:"289px"
          },
        ]
      },
      {
        id: "bravo-h5",
        slug: "bravo-h5",
        title: "BRAVO Web App",
        year: 2021,
        type: "UI Design",
        coverImage: "/videos/bravo_h5_02.mp4",
        description: "Mobile-optimized web application for BRAVO sports platform",
        details: "Responsive H5 application designed for mobile sports enthusiasts, featuring intuitive navigation and real-time data visualization.",
        conclusion: "Delivered a high-performance mobile web app that provides seamless sports data access across all devices.",
        height: 240,
        aspectRatio: "1.72",
        textColor: "black",
        textPosition: "bottom",
        hasExternal: true,
        externalText: "View Website",
        externalLink: "https://bravo.klauden.xyz/",
      },
  {
    id: "bravo-vi",
    slug: "bravo-vi",
    title: "BRAVO Visual Identity",
    year: 2022,
    type: "Brand Visual",
    coverImage: "/images/crafts/cover/bravo-vi.jpg",
    description: "Bravo is a football-related sports data project - a big data-driven football match analysis platform.",
    details: "To make football data more intuitive, we designed a complete visualization system including data charts, match analysis interfaces, and player data displays.",
    conclusion: "This project utilized modern UI design combined with sports elements and data visualization, providing users with a clear data analysis experience.",
    height: 256,
    aspectRatio: "1.9",
    textColor: "white",
    textPosition: "bottom",
    images: [
      {
        src: "/images/crafts/bravo-vi/bravo_vi_01.jpg",
        alt: "BRAVO Visual Identity - Logo Design",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_02.jpg",
        alt: "BRAVO Visual Identity - Color Palette",
        height: "507px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_03.jpg",
        alt: "BRAVO Visual Identity - Typography",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_04.jpg",
        alt: "BRAVO Visual Identity - Brand Guidelines",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_05.jpg",
        alt: "BRAVO Visual Identity - Application Examples",
        height: "436px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_06.jpg",
        alt: "BRAVO Visual Identity - Digital Assets",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_07.jpg",
        alt: "BRAVO Visual Identity - Brand Extension",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_08.jpg",
        alt: "BRAVO Visual Identity - Logo Variations",
        height: "268px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_09.jpg",
        alt: "BRAVO Visual Identity - Print Materials",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_10.jpg",
        alt: "BRAVO Visual Identity - Digital Interface",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_11.jpg",
        alt: "BRAVO Visual Identity - Brand Mockups",
        height: "457px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_12.jpg",
        alt: "BRAVO Visual Identity - Sports Graphics",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_13.jpg",
        alt: "BRAVO Visual Identity - Data Visualization",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_14.jpg",
        alt: "BRAVO Visual Identity - Mobile Application",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_15.jpg",
        alt: "BRAVO Visual Identity - Web Platform",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_16.jpg",
        alt: "BRAVO Visual Identity - Marketing Materials",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_17.jpg",
        alt: "BRAVO Visual Identity - Brand System",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_18.jpg",
        alt: "BRAVO Visual Identity - Final Implementation",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_19.jpg",
        alt: "BRAVO Visual Identity - Brand Summary",
        height: "393px"
      }
    ]
  },
  {
    id:"football-live-animate",
    slug:"football-live-animate",
    title:"Football Live Animation UI",
    year:2020,
    type:"UI Design",
    coverImage:"/images/crafts/cover/football-live.jpg",
    description:"Interactive UI design for football live streaming with dynamic animations",
    details:"Created engaging animated interfaces for football live streaming platform, featuring real-time score updates, player statistics, and interactive match visualizations.",
    conclusion:"Delivered an immersive live streaming experience that keeps viewers engaged with dynamic animations and real-time data integration.",
    height:368,
    aspectRatio: "1.32",
    textColor:"black",
    textPosition:"bottom",
    images:[
      {
        src:"/images/crafts/live-animate/live_animate_01.jpg",
        alt:"Football live streaming animation interface",
        height:"632px"
      },
      {
        src:"/images/crafts/live-animate/live_animate_02.jpg",
        alt:"Live match statistics display",
        height:"745px"
      },
      {
        src:"/images/crafts/live-animate/live_animate_03.jpg",
        alt:"Interactive player information panel",
        height:"815px"
      },
      {
        src:"/images/crafts/live-animate/live_animate_04.jpg",
        alt:"Real-time score and match timeline",
        height:"632px"
      },
    ]
  },
  {
    id:"dorgari-admin",
    slug:"dorgari-admin",
    title:"DORGARI Admin Management System",
    year:2020,
    type:"UI Design",
    coverImage:"/images/crafts/cover/dorgari-admin.jpg",
    description:"Comprehensive admin dashboard for DORGARI sports platform management",
    details: "Designed an intuitive admin interface for managing sports content, user data, and platform analytics with streamlined workflows and clear data visualization.",
    conclusion: "Created an efficient management system that simplifies complex operations while maintaining data clarity and user-friendly navigation.",
    height:168,
    aspectRatio: "2.43",
    textColor:"white",
    textPosition:"bottom",
    hasExternal: true,
    externalText: "View Prototype",
    externalLink:"https://www.figma.com/proto/s6qTB7kTMlqTyzGCcevYGH/%E9%81%93%E6%A0%BC%E5%88%A9%E7%AE%A1%E7%90%86%E5%90%8E%E5%8F%B0?page-id=0%3A1&node-id=103-5254&p=f&viewport=354%2C118%2C0.04&t=O1Jq9pzfoLyGYPmo-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=103%3A5254/",
  },
  {
    id:"jd-live",
    slug:"jd-live",
    title:"JD Sports Live UI",
    year:2020,
    type:"UI Design",
    coverImage:"/images/crafts/cover/jd-live.jpg",
    description:"Live sports streaming interface design for JD Sports platform",
    details:"Developed a comprehensive live streaming UI for JD Sports, featuring real-time match updates, interactive chat, and seamless e-commerce integration.",
    conclusion:"Successfully merged sports entertainment with e-commerce functionality, creating an engaging platform that drives both viewership and sales.",
    height:350,
    aspectRatio: "1.39",
    textColor:"white",
    textPosition:"bottom",
    images:[
      {
        src:"/images/crafts/jd-live/jd_01.jpg",
        alt:"JD Sports live streaming main interface",
        height:"582px"
      },
      {
        src:"/images/crafts/jd-live/jd_02.jpg",
        alt:"Interactive live chat and user engagement",
        height:"644px"
      },
      {
        src:"/images/crafts/jd-live/jd_03.jpg",
        alt:"Sports merchandise integration",
        height:"689px"
      },
      {
        src:"/images/crafts/jd-live/jd_04.jpg",
        alt:"Live match statistics and data",
        height:"760px"
      },
      {
        src:"/images/crafts/jd-live/jd_05.jpg",
        alt:"User profile and purchase history",
        height:"682px"
      },
      {
        src:"/images/crafts/jd-live/jd_06.jpg",
        alt:"Mobile responsive design showcase",
        height:"1136px"
      },
    ],
  },
  {
    id:"tokyo-ui",
    slug:"tokyo-ui",
    title:"OLYMPIC Tokyo Games UI",
    year:2021,
    type:"UI Design",
    coverImage:"/images/crafts/cover/tokyo-ui.jpg",
    description:"Olympic Games interface design for Tokyo 2020 sports coverage",
    details:"Created a comprehensive Olympic Games viewing experience with event schedules, live results, athlete profiles, and medal tracking functionality.",
    conclusion:"Delivered an immersive Olympic experience that captured the spirit of the games while providing comprehensive sports coverage and real-time updates.",
    height:284,
    aspectRatio: "1.72",
    textColor:"black",
    textPosition:"bottom",
    hasExternal: true,
    externalText: "View Prototype",
    externalLink:"https://www.figma.com/proto/jyvvv6WbxXjhSKhlvyw7vw/TOKYO-OLYMPIC---DORGARI?page-id=0%3A1&node-id=3-4&p=f&viewport=1032%2C603%2C0.08&t=ARoFyVmxC1TetU5n-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3%3A4/",
  }
  // Add more crafts as needed...
];

// Get all craft slugs
export async function getAllCraftSlugs(): Promise<string[]> {
  return craftData
    .filter((craft) => craft.slug && !craft.externalLink) // Exclude external links
    .map((craft) => craft.slug || "");
}

// Get craft detail by slug
export async function getCraftDetail(slug: string): Promise<CraftDetail | undefined> {
  return craftData.find((craft) => craft.slug === slug);
}

// Get all crafts
export async function getAllCrafts(): Promise<CraftDetail[]> {
  return craftData;
}