"use client";

import Image from "next/image";
import { useMemo } from "react";

interface MediaRendererProps {
  src: string;
  alt: string;
  priority?: boolean;
}

const isVideoFile = (src: string): boolean => {
  return /\.(mp4|webm|mov)$/i.test(src);
};

const MediaRenderer = ({ src, alt, priority = false }: MediaRendererProps) => {
  const isVideo = useMemo(() => isVideoFile(src), [src]);

  if (isVideo) {
    return (
      <video
        src={src}
        className="w-full h-auto block"
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
        maxWidth: '100%',
        display: 'block',
      }}
      priority={priority}
    />
  );
};

export default MediaRenderer;
