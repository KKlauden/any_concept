"use client";

import Image from "next/image";
import { useMemo } from "react";

interface MediaRendererProps {
  src: string;
  alt: string;
  priority?: boolean;
}

// 检测是否为视频文件的函数
const isVideoFile = (src: string): boolean => {
  return src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');
};

const MediaRenderer = ({ src, alt, priority = false }: MediaRendererProps) => {
  // 使用useMemo缓存结果，避免不必要的重新计算
  const isVideo = useMemo(() => isVideoFile(src), [src]);

  if (isVideo) {
    return (
      <video 
        src={src} 
        className="w-full h-auto" 
        controls
        autoPlay 
        muted 
        loop 
        playsInline
      />
    );
  }

  return (
    <Image 
      src={src} 
      alt={alt} 
      width={1034}
      height={500}
      style={{
        width: '100%',
        height: 'auto',
        maxWidth: '100%'
      }}
      priority={priority}
    />
  );
};

export default MediaRenderer; 