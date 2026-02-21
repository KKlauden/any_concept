"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export type WorkItemProps = {
  title: string;
  year: string | number;
  coverImage?: string;
  videoSrc?: string;
  height?: number; // 自定义高度属性（像素值）
  aspectRatio?: string; // 宽高比属性，例如 "1.35"
  textColor?: string;
  textPosition?: "top" | "bottom";
  hasExternal?: boolean;
  link?: string; // 外部链接
  slug?: string; // 内部详情页链接
  type?: string;
  externalText?: string;
};

const WorkItem = ({ 
  title, 
  year, 
  coverImage, 
  videoSrc, 
  height = 300,
  aspectRatio = "1.5", // 默认宽高比为1.5
  link,
  slug,
  type,
  textColor = "white",
  textPosition = "bottom",
  hasExternal = false,
  externalText = "查看网站"
}: WorkItemProps) => {
  
  // 检测coverImage是否为视频文件
  const isVideoFile = useMemo(() => {
    if (!coverImage) return false;
    return coverImage.endsWith('.mp4') || coverImage.endsWith('.webm') || coverImage.endsWith('.mov');
  }, [coverImage]);
  
  // 设置容器样式，使用aspect-ratio确保一致的宽高比
  const containerStyle = useMemo(() => {
    return { aspectRatio };
  }, [aspectRatio]);
  
  let textColorStyle = textColor === "white" ? "text-white" : "text-black/87";
  let bgColorStyle = textColor === "white" ? "bg-black" : "bg-white";
  
  const content = (
    <div 
      className="relative group w-full hover:cursor-pointer"
      style={containerStyle}
    >
      {/* 媒体容器 */}
      <div className="absolute inset-0 bg-white overflow-hidden rounded-lg">
        {coverImage && !isVideoFile ? (
          <Image 
            src={coverImage} 
            alt={title} 
            fill 
            className="object-cover"
            sizes="(max-width: 640px) 95vw, (max-width: 768px) 45vw, 30vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8/frVfwAJRwNB04NHEAAAAABJRU5ErkJggg=="
          />
        ) : coverImage && isVideoFile ? (
          <video 
            src={coverImage} 
            className="absolute inset-0 w-full h-full object-cover" 
            autoPlay 
            muted 
            loop 
            playsInline
          />
        ) : videoSrc ? (
          <video 
            src={videoSrc} 
            className="absolute inset-0 w-full h-full object-cover" 
            autoPlay 
            muted 
            loop 
            playsInline
          />
        ) : (
          <div className={`absolute inset-0 flex items-center justify-center`}>
            <span className="text-sm font-jetbrains-mono text-black">{title}</span>
          </div>
        )}
      </div>
      
      {/* 标题和年份 */}
      <div className={`absolute left-0 right-0 ${textPosition === "top" ? "top-0" : "bottom-0"} p-4 flex flex-row justify-between items-center font-jetbrains-mono  ${textColorStyle} text-sm`}>
        <h3 className={``}>{title}</h3>
        <h3 className={``}>{year}</h3>
      </div>
    </div>
  );
  
  // 添加整体悬停效果
  const wrapper = (
    <div className={`group w-full h-full transition-all duration-300 hover:translate-y-[-1px] flex flex-col ${hasExternal ? "p-1" : ""} overflow-hidden gap-1 border border-black/8 rounded-xl bg-white`}>
      {content}
      {hasExternal && (
          <div className="bg-zinc-100 rounded-lg flex items-center justify-center h-[40px] hover:bg-zinc-200 group-hover:bg-zinc-200 transition-colors duration-200">
            <p className="text-sm font-jetbrains-mono text-black mr-2">{externalText}</p>
            <svg aria-hidden="true" height="14" strokeLinejoin="round" viewBox="0 0 16 16" width="14"><path fillRule="evenodd" clipRule="evenodd" d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z" fill="currentColor"></path></svg>
        </div>
      )}
    </div>
  );
  
  // 如果有外部链接，优先使用外部链接
  if (link) {
    return (
      <Link href={link} className="block outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 rounded-xl" target="_blank" rel="noopener noreferrer">
        {wrapper}
      </Link>
    );
  }
  
  // 如果有slug，使用内部详情页链接
  if (slug) {
    return (
      <Link href={`/craft/${slug}`} className="block outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 rounded-xl">
        {wrapper}
      </Link>
    );
  }
  
  // 没有链接，直接返回内容
  return wrapper;
};

export default WorkItem; 