// 定义作品图片类型
export interface CraftImage {
  src: string;
  alt?: string;
  caption?: string;
  height?: number | string;
}

// 定义作品详情类型
export interface CraftDetail {
  id: string;
  slug: string;
  title: string;
  year: string | number;
  type: "品牌视觉" | "UI设计" | "方案设计";
  coverImage?: string; // 可选的详情页封面图，如果不提供则使用imageSrc
  description: string;
  details?: string;
  conclusion?: string;
  hasExternal?: boolean; // 是否为外部链接
  externalText?: string; // 外部链接文本
  externalLink?: string; // 外部链接，如果提供则点击跳转到外部网站
  images?: CraftImage[]; // 详情页的图片列表
  height?: number;
  aspectRatio?: string;
  textColor?: string;
  textPosition?: "top" | "bottom";
}

// 作品数据
export const craftData: CraftDetail[] = [
    {
        id: "bilibili-live",
        slug: "bilibili-live",
        title: "BILIBILI 动画直播及数据页面",
        year: "2022/2024",
        type: "UI设计",
        coverImage: "/images/crafts/cover/bilibili-live.jpg",
        description: "为B站设计的动画直播及数据页面，融合了动画元素和实时数据展示。",
        details: "这个项目需要处理大量实时数据，同时保持界面的美观和用户友好性。我们采用了模块化设计，让用户可以自定义自己关注的数据模块。",
        conclusion: "最终的设计既满足了数据展示的需求，又保持了B站特有的动画风格和用户体验。",
        height: 360,
        aspectRatio: "1.35",
        textColor: "white",
        textPosition: "bottom",
        images: [
          {
            src: "/images/crafts/bilibili-live/bilibili_01.jpg",
            alt: "直播界面设计",
            height: "678px"
          },
          {
            src: "/images/crafts/bilibili-live/bilibili_02.jpg",
            alt: "数据展示模块",
            height: "768px"
          },
          {
            src: "/images/crafts/bilibili-live/bilibili_03.jpg",
            alt: "数据展示模块",
            height: "689px"
          },
          {
            src: "/images/crafts/bilibili-live/bilibili_04.jpg",
            alt: "数据展示模块",
            height: "604px"
          },
          
          
          
        ]
      },
      {
        id: "opta-yinxiang",
        slug: "opta-yinxiang",
        title: "印象笔记xOpta 体育营销方案",
        year: 2021,
        type: "方案设计",
        coverImage: "/images/crafts/cover/opta-yinxiang.jpg",
        description: "印象笔记xOpta 体育营销方案",
        details: "印象笔记xOpta 体育营销方案",
        conclusion: "印象笔记xOpta 体育营销方案",
        height: 184,
        aspectRatio: "2.64",
        textColor: "black",
        textPosition: "bottom",
        images:[
          {
            src:"/images/crafts/opta-yinxiang/yinxiang_01.jpg",
            alt:"印象笔记xOpta 体育营销方案",
            height:"855px"
          },
        //   {
        //     src:"/images/crafts/opta-yinxiang/yinxiang_02.jpg",
        //     alt:"印象笔记xOpta 体育营销方案",
        //     height:"161px"
        //   },
          {
            src:"/images/crafts/opta-yinxiang/yinxiang_03.jpg",
            alt:"印象笔记xOpta 体育营销方案",
            height:"1081px"
          },
          {
            src:"/images/crafts/opta-yinxiang/yinxiang_04.jpg",
            alt:"印象笔记xOpta 体育营销方案",
            height:"860px"
          },
          // {
          //   src:"/images/crafts/opta-yinxiang/yinxiang_05.jpg",
          //   alt:"印象笔记xOpta 体育营销方案",
          //   height:"775px"
          // },
         
        ]
      },
      {
        id: "live-switch",
        slug: "live-switch",
        title: "直播切换动画",
        year: 2021,
        type: "UI设计",
        coverImage: "/videos/live-switch.mp4",
        description: "直播切换动画",
        details: "直播切换动画",
        conclusion: "直播切换动画",
        height: 289,
        aspectRatio: "1.5",
        textColor: "white",
        textPosition: "bottom",
        images:[
          {
            src:"/videos/live-switch.mp4",
            alt:"直播切换动画",
            height:"289px"
          },
        ]
      },
      {
        id: "bravo-h5",
        slug: "bravo-h5",
        title: "BRAVO Web App",
        year: 2021,
        type: "UI设计",
        coverImage: "/videos/bravo_h5_02.mp4",
        description: "BRAVO H5",
        details: "BRAVO H5",
        conclusion: "BRAVO H5",
        height: 240,
        aspectRatio: "1.72",
        textColor: "black",
        textPosition: "bottom",
        hasExternal: true,
        externalText: "查看网站",
        externalLink: "https://bravo.klauden.xyz/",

      },
  {
    id: "bravo-vi",
    slug: "bravo-vi",
    title: "BRAVO VI",
    year: 2022,
    type: "品牌视觉",
    coverImage: "/images/crafts/cover/bravo-vi.jpg",
    description: "Bravo 是足球相关的一个体育数据项目，基于大数据的足球比赛分析平台。",
    details: "为了让足球数据更加直观，我们设计了一套完整的可视化系统，包括数据图表、比赛分析界面和球员数据展示。",
    conclusion: "这个项目使用了现代化的UI设计，结合了体育元素和数据可视化，为用户提供了清晰的数据分析体验。",
    height: 256,
    aspectRatio: "1.9",
    textColor: "white",
    textPosition: "bottom",
    images: [
      {
        src: "/images/crafts/bravo-vi/bravo_vi_01.jpg",
        alt: "BRAVO VI 品牌设计 - 1",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_02.jpg",
        alt: "BRAVO VI 品牌设计 - 2",
        height: "507px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_03.jpg",
        alt: "BRAVO VI 品牌设计 - 3",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_04.jpg",
        alt: "BRAVO VI 品牌设计 - 4",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_05.jpg",
        alt: "BRAVO VI 品牌设计 - 5",
        height: "436px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_06.jpg",
        alt: "BRAVO VI 品牌设计 - 6",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_07.jpg",
        alt: "BRAVO VI 品牌设计 - 7",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_08.jpg",
        alt: "BRAVO VI 品牌设计 - 8",
        height: "268px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_09.jpg",
        alt: "BRAVO VI 品牌设计 - 9",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_10.jpg",
        alt: "BRAVO VI 品牌设计 - 10",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_11.jpg",
        alt: "BRAVO VI 品牌设计 - 11",
        height: "457px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_12.jpg",
        alt: "BRAVO VI 品牌设计 - 12",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_13.jpg",
        alt: "BRAVO VI 品牌设计 - 13",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_14.jpg",
        alt: "BRAVO VI 品牌设计 - 14",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_15.jpg",
        alt: "BRAVO VI 品牌设计 - 15",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_16.jpg",
        alt: "BRAVO VI 品牌设计 - 16",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_17.jpg",
        alt: "BRAVO VI 品牌设计 - 17",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_18.jpg",
        alt: "BRAVO VI 品牌设计 - 18",
        height: "541px"
      },
      {
        src: "/images/crafts/bravo-vi/bravo_vi_19.jpg",
        alt: "BRAVO VI 品牌设计 - 19",
        height: "393px"
      }
    ]
  },
  {
    id:"football-live-animate",
    slug:"football-live-animate",
    title:"足球直播动画 UI",
    year:2020,
    type:"UI设计",
    coverImage:"/images/crafts/cover/football-live.jpg",
    description:"足球直播动画 UI",
    details:"足球直播动画 UI",
    conclusion:"足球直播动画 UI",
    height:368,
    aspectRatio: "1.32",
    textColor:"black",
    textPosition:"bottom",
    images:[
      {
        src:"/images/crafts/live-animate/live_animate_01.jpg",
        alt:"足球直播动画",
        height:"632px"
      },
      {
        src:"/images/crafts/live-animate/live_animate_02.jpg",
        alt:"足球直播动画",
        height:"745px"
      },
      {
        src:"/images/crafts/live-animate/live_animate_03.jpg",
        alt:"足球直播动画",
        height:"815px"
      },
      {
        src:"/images/crafts/live-animate/live_animate_04.jpg",
        alt:"足球直播动画",
        height:"632px"
      },
      
      
      
    ]
  },
  {
    id:"dorgari-admin",
    slug:"dorgari-admin",
    title:"DORGARI 后台管理系统",
    year:2020,
    type:"UI设计",
    coverImage:"/images/crafts/cover/dorgari-admin.jpg",
    description:"DORGAR 后台管理系统",
    details:"DORGAR 后台管理系统",
    conclusion:"DORGAR 后台管理系统",
    height:168,
    aspectRatio: "2.43",
    textColor:"white",
    textPosition:"bottom",
    hasExternal: true,
    externalText: "查看原型",
    externalLink:"https://www.figma.com/proto/s6qTB7kTMlqTyzGCcevYGH/%E9%81%93%E6%A0%BC%E5%88%A9%E7%AE%A1%E7%90%86%E5%90%8E%E5%8F%B0?page-id=0%3A1&node-id=103-5254&p=f&viewport=354%2C118%2C0.04&t=O1Jq9pzfoLyGYPmo-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=103%3A5254/",
  },
  {
    id:"jd-live",
    slug:"jd-live",
    title:"京东赛事 LIVE UI",
    year:2020,
    type:"UI设计",
    coverImage:"/images/crafts/cover/jd-live.jpg",
    description:"京东赛事 LIVE UI 设计",
    details:"京东赛事 LIVE UI 设计",
    conclusion:"京东赛事 LIVE UI 设计",
    height:350,
    aspectRatio: "1.39",
    textColor:"white",
    textPosition:"bottom",
    images:[
      {
        src:"/images/crafts/jd-live/jd_01.jpg",
        alt:"京东赛事 LIVE UI",
        height:"582px"
      },
      {
        src:"/images/crafts/jd-live/jd_02.jpg",
        alt:"京东赛事 LIVE UI",
        height:"644px"
      },
      {
        src:"/images/crafts/jd-live/jd_03.jpg",
        alt:"京东赛事 LIVE UI",
        height:"689px"
      },
      {
        src:"/images/crafts/jd-live/jd_04.jpg",
        alt:"京东赛事 LIVE UI",
        height:"760px"
      },
      {
        src:"/images/crafts/jd-live/jd_05.jpg",
        alt:"京东赛事 LIVE UI",
        height:"682px"
      },
      {
        src:"/images/crafts/jd-live/jd_06.jpg",
        alt:"京东赛事 LIVE UI",
        height:"1136px"
      },
    ],
  },
  {
    id:"tokyo-ui",
    slug:"tokyo-ui",
    title:"OLYMPIC 奥运赛事 UI",
    year:2021,
    type:"UI设计",
    coverImage:"/images/crafts/cover/tokyo-ui.jpg",
    description:"TOKYO UI",
    details:"TOKYO UI",
    conclusion:"TOKYO UI",
    height:284,
    aspectRatio: "1.72",
    textColor:"black",
    textPosition:"bottom",
    hasExternal: true,
    externalText: "查看原型",
    externalLink:"https://www.figma.com/proto/jyvvv6WbxXjhSKhlvyw7vw/TOKYO-OLYMPIC---DORGARI?page-id=0%3A1&node-id=3-4&p=f&viewport=1032%2C603%2C0.08&t=ARoFyVmxC1TetU5n-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3%3A4/",
  }
  // 可以继续添加更多作品...
];

// 获取所有作品的slug
export async function getAllCraftSlugs(): Promise<string[]> {
  return craftData
    .filter((craft) => craft.slug && !craft.externalLink) // 排除外部链接
    .map((craft) => craft.slug || "");
}

// 根据slug获取作品详情
export async function getCraftDetail(slug: string): Promise<CraftDetail | undefined> {
  return craftData.find((craft) => craft.slug === slug);
}

// 获取所有作品
export async function getAllCrafts(): Promise<CraftDetail[]> {
  return craftData;
} 