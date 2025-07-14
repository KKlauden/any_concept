"use client";

import Image from "next/image";
import { useMemo } from "react";

interface MediaRendererProps {
  src: string;
  alt: string;
  priority?: boolean;
  isVideo?: boolean;
}

const MediaRenderer = ({ src, alt, priority = false, isVideo }: MediaRendererProps) => {
  // 检测媒体类型
  const isVideoFile = useMemo(() => {
    if (isVideo !== undefined) return isVideo;
    return src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');
  }, [src, isVideo]);

  if (isVideoFile) {
    return (
      <video 
        src={src} 
        className="w-full h-auto rounded-xl" 
        controls
        autoPlay={false}
        muted 
        playsInline
      />
    );
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-zinc-50">
      <Image 
        src={src} 
        alt={alt} 
        width={1034}
        height={600}
        className="w-full h-auto"
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '100%'
        }}
        priority={priority}
      />
    </div>
  );
};

export default MediaRenderer; 