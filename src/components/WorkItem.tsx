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
  textColor?: string;
  textPosition?: "top" | "bottom";
  link?: string; // 外部链接
  slug?: string; // 内部详情页链接
  type?: string;
};

const WorkItem = ({ 
  title, 
  year, 
  coverImage, 
  videoSrc, 
  height = 300,
  link,
  slug,
  type,
  textColor = "white",
  textPosition = "bottom"
}: WorkItemProps) => {
  
  // 检测coverImage是否为视频文件
  const isVideoFile = useMemo(() => {
    if (!coverImage) return false;
    return coverImage.endsWith('.mp4') || coverImage.endsWith('.webm') || coverImage.endsWith('.mov');
  }, [coverImage]);
  
  // 设置自定义高度
  const heightStyle = { height: `${height}px` };
  let textColorStyle = textColor === "white" ? "text-white" : "text-black/87";
  
  const content = (
    <div 
      className="relative group w-full hover:cursor-pointer"
      style={heightStyle}
    >
      {/* 媒体容器 */}
      <div className="absolute inset-0 bg-white overflow-hidden rounded-xl border border-black/10">
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
    <div className="w-full h-full transition-all duration-300 hover:translate-y-[-1px]">
      {content}
    </div>
  );
  
  // 如果有外部链接，优先使用外部链接
  if (link) {
    return (
      <Link href={link} className="block outline-none" target="_blank" rel="noopener noreferrer">
        {wrapper}
      </Link>
    );
  }
  
  // 如果有slug，使用内部详情页链接
  if (slug) {
    return (
      <Link href={`/craft/${slug}`} className="block outline-none">
        {wrapper}
      </Link>
    );
  }
  
  // 没有链接，直接返回内容
  return wrapper;
};

export default WorkItem; 