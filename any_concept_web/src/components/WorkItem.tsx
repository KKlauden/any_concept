"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";

export type WorkItemProps = {
  title: string;
  year: string | number;
  coverImage?: string;
  videoSrc?: string;
  aspectRatio?: string;
  type?: string;
  hasExternal?: boolean;
  externalText?: string;
  link?: string;
  slug?: string;
  index?: number;
};

const WorkItem = ({
  title,
  year,
  coverImage,
  videoSrc,
  aspectRatio = "1.5",
  type,
  hasExternal = false,
  link,
  slug,
  index = 0,
}: WorkItemProps) => {
  const isVideoFile = useMemo(() => {
    if (!coverImage) return false;
    return /\.(mp4|webm|mov)$/i.test(coverImage);
  }, [coverImage]);

  const mediaSrc = coverImage || videoSrc;
  const isVideo = isVideoFile || (!coverImage && !!videoSrc);

  const card = (
    <motion.div
      className="craft-card cursor-pointer"
      style={{ aspectRatio }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* 媒体 */}
      <div className="absolute inset-0 bg-zinc-950">
        {mediaSrc && isVideo ? (
          <video
            src={mediaSrc}
            className="craft-card__media absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="craft-card__media object-cover"
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 45vw, 30vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-mono text-white/30">{title}</span>
          </div>
        )}
      </div>

      {/* 渐变遮罩 */}
      <div className="craft-card__overlay" />

      {/* 外部链接标记 */}
      {hasExternal && (
        <div className="craft-card__external">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 11L11 5M11 5H6M11 5V10" />
          </svg>
        </div>
      )}

      {/* 底部信息 */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display font-bold text-sm text-foreground leading-tight truncate">
              {title}
            </h3>
            {type && (
              <span className="meta-label-sub mt-1 block">{type}</span>
            )}
          </div>
          <span className="meta-label shrink-0">{year}</span>
        </div>
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <Link href={link} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2">
        {card}
      </Link>
    );
  }

  if (slug) {
    return (
      <Link href={`/craft/${slug}`} className="block focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2">
        {card}
      </Link>
    );
  }

  return card;
};

export default WorkItem;
