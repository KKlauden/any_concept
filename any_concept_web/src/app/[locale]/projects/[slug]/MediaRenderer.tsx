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
  const isVideoFile = useMemo(() => {
    if (isVideo !== undefined) return isVideo;
    return /\.(mp4|webm|mov)$/i.test(src);
  }, [src, isVideo]);

  if (isVideoFile) {
    return (
      <video
        src={src}
        className="w-full h-auto block"
        controls
        autoPlay={false}
        muted
        playsInline
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1034}
      height={600}
      style={{
        width: '100%',
        height: 'auto',
        maxWidth: '100%',
        display: 'block',
      }}
      priority={priority}
    />
  );
};

export default MediaRenderer;
