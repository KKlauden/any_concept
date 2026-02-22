"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/**
 * 数据类型接口
 */
export interface TextItem { type: 'text'; text: string; }
export interface InteractiveItem { type: 'interactive'; id: string; trigger: string; expanded: ContentItem[]; icon?: string; }
export interface LinkItem { type: 'link'; url: string; text: string; icon?: string; }
export interface ImageItem { type: 'image'; src: string; alt: string; width: number; height: number; }
export interface ParagraphItem { type: 'paragraph'; content: ContentItem[]; icon_size?: number; }
export type ContentItem = TextItem | InteractiveItem | LinkItem | ImageItem | ParagraphItem;
export interface InteractiveTextProps { data: ContentItem; }

/**
 * SVG 图标系统
 */
const IconMap: Record<string, React.ReactNode> = {
  code: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 5L2 9L6 13" /><path d="M12 5L16 9L12 13" />
    </svg>
  ),
  pin: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 16L4.5 10.5C2 7.5 4 3 9 3C14 3 16 7.5 13.5 10.5L9 16Z" /><circle cx="9" cy="7.5" r="2" />
    </svg>
  ),
  pen: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L16 5L6 15H3V12L13 2Z" />
    </svg>
  ),
  window: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="14" height="12" rx="1" /><line x1="2" y1="7" x2="16" y2="7" />
      <circle cx="4.5" cy="5" r="0.5" fill="currentColor" /><circle cx="6.5" cy="5" r="0.5" fill="currentColor" />
    </svg>
  ),
  server: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="12" height="5" rx="1" /><rect x="3" y="11" width="12" height="5" rx="1" />
      <line x1="9" y1="7" x2="9" y2="11" /><circle cx="6" cy="4.5" r="0.5" fill="currentColor" /><circle cx="6" cy="13.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  spark: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2V5M9 13V16M2 9H5M13 9H16" /><path d="M4.5 4.5L6.5 6.5M11.5 11.5L13.5 13.5M13.5 4.5L11.5 6.5M6.5 11.5L4.5 13.5" />
    </svg>
  ),
  bulb: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 15H11M7 13H11" /><path d="M9 2C6 2 4 4.5 4 7C4 9 5.5 10 6 11H12C12.5 10 14 9 14 7C14 4.5 12 2 9 2Z" />
    </svg>
  ),
  handshake: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8L5 4H8L9 5L10 4H13L16 8L12 12L9 10L6 12L2 8Z" />
    </svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="14" height="10" rx="1" /><path d="M2 4L9 10L16 4" />
    </svg>
  ),
  network: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="2" /><circle cx="4" cy="4" r="1.5" /><circle cx="14" cy="4" r="1.5" /><circle cx="14" cy="14" r="1.5" />
      <line x1="7.5" y1="7.5" x2="5" y2="5" /><line x1="10.5" y1="7.5" x2="13" y2="5" /><line x1="10.5" y1="10.5" x2="13" y2="13" />
    </svg>
  ),
  device: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="10" height="8" rx="1" /><rect x="10" y="7" width="6" height="9" rx="1" />
    </svg>
  ),
  wand: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 16L11 7" /><path d="M11 7L14 4L16 2" /><path d="M10 3L11 5M14 6L12 7M7 6L9 7" />
    </svg>
  ),
  boxes: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="6" height="6" /><rect x="10" y="2" width="6" height="6" /><rect x="2" y="10" width="6" height="6" /><rect x="10" y="10" width="6" height="6" />
    </svg>
  ),
  eye: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 9C1 9 4 3 9 3C14 3 17 9 17 9C17 9 14 15 9 15C4 15 1 9 1 9Z" /><circle cx="9" cy="9" r="2.5" />
    </svg>
  ),
  arrow: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9H14M14 9L10 5M14 9L10 13" />
    </svg>
  ),
};

const renderIcon = (iconKey?: string) => {
  if (!iconKey || !IconMap[iconKey]) return null;
  return <span className="inline-flex items-center shrink-0 text-accent">{IconMap[iconKey]}</span>;
};

/**
 * 动效变体
 */
const expandContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const wordRevealVariants = {
  hidden: { opacity: 0, y: 6, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.35, ease: easeOut },
  },
};

const itemRevealVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.3, ease: easeOut },
  },
};

/**
 * 计算可交互项总数
 */
const countInteractiveItems = (item: ContentItem): number => {
  switch (item.type) {
    case 'interactive':
      return 1 + item.expanded.reduce((sum, child) => sum + countInteractiveItems(child), 0);
    case 'paragraph':
      return item.content.reduce((sum, child) => sum + countInteractiveItems(child), 0);
    default:
      return 0;
  }
};

/**
 * 进度指示器
 */
const ProgressIndicator: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  if (total === 0) return null;
  const pct = Math.min((current / total) * 100, 100);
  const isComplete = current >= total;

  return (
    <motion.div
      className="mt-12 md:mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.4 }}
    >
      {/* 进度条轨道 */}
      <div className="relative h-[2px] bg-white/8 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ background: isComplete ? 'var(--accent)' : 'rgba(255,255,255,0.4)' }}
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
      {/* 计数文字 */}
      <div className="flex items-center justify-between mt-3 text-[11px] font-mono tracking-[0.15em] uppercase">
        <span className={isComplete ? 'text-accent' : 'text-white/30'}>
          {current} / {total}
        </span>
        <motion.span
          className={isComplete ? 'text-accent' : 'text-white/20'}
          animate={isComplete ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={isComplete ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        >
          {isComplete ? 'ALL EXPLORED' : 'EXPLORED'}
        </motion.span>
      </div>
    </motion.div>
  );
};


/**
 * InteractiveText 主组件
 */
const InteractiveText: React.FC<InteractiveTextProps> = ({ data }) => {
  const [visibleItems, setVisibleItems] = useState<string[]>(['main']);
  const [typingInProgress, setTypingInProgress] = useState<boolean>(false);
  const [disabledItems, setDisabledItems] = useState<string[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [totalInteractiveItems, setTotalInteractiveItems] = useState(0);

  useEffect(() => {
    setTotalInteractiveItems(countInteractiveItems(data));
  }, [data]);

  const handleInteractiveClick = useCallback((id: string) => {
    if (typingInProgress) return;

    if (visibleItems.includes(id)) {
      setVisibleItems(prev => prev.filter(item => item !== id));
      setDisabledItems(prev => prev.filter(item => item !== id));
      return;
    }

    setDisabledItems(prev => [...prev, id]);
    setTypingInProgress(true);
    setVisibleItems(prev => [...prev, id]);
    setClickCount(prev => prev + 1);

    setTimeout(() => {
      setTypingInProgress(false);
    }, 400);
  }, [typingInProgress, visibleItems]);

  /**
   * 交互方框
   */
  const InteractiveBox = ({ trigger, icon, isDisabled, onClick }: {
    trigger: string; icon?: string; isDisabled: boolean; onClick: () => void;
  }) => (
    <motion.span
      className={`interactive-box ${isDisabled ? 'interactive-box--disabled' : ''}`}
      onClick={!isDisabled ? onClick : undefined}
      role="button"
      tabIndex={!isDisabled ? 0 : undefined}
      aria-disabled={isDisabled || undefined}
      onKeyDown={!isDisabled ? (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }
      } : undefined}
      whileHover={!isDisabled ? { scale: 1.01 } : undefined}
      whileTap={!isDisabled ? { scale: 0.98 } : undefined}
    >
      {renderIcon(icon)}
      <span>{trigger}</span>
    </motion.span>
  );

  /**
   * 链接方框 — 新标签页打开
   */
  const LinkBox = ({ text, url, icon }: { text: string; url: string; icon?: string; }) => (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="interactive-box interactive-box--link"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {renderIcon(icon)}
      <span>{text}</span>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 ml-1">
        <path d="M4 10L10 4M10 4H5.5M10 4V8.5" />
      </svg>
    </motion.a>
  );

  /**
   * 将文字拆分为单词用于 stagger 动效
   */
  const renderStaggeredText = (text: string, parentKey: string) => {
    const parts = text.split('\n');
    return parts.map((part, i) => (
      <React.Fragment key={`${parentKey}-line-${i}`}>
        {i > 0 && <br />}
        {part.split(/(\s+)/).map((word, j) => (
          <motion.span
            key={`${parentKey}-w-${i}-${j}`}
            variants={wordRevealVariants}
            style={{ display: 'inline' }}
          >
            {word}
          </motion.span>
        ))}
      </React.Fragment>
    ));
  };

  /**
   * 递归渲染内容
   */
  const renderContent = (
    item: ContentItem,
    index: number = 0,
    parentId: string = 'main',
    isInsideExpansion: boolean = false,
  ): React.ReactNode => {
    switch (item.type) {
      case 'text': {
        if (isInsideExpansion) {
          return (
            <React.Fragment key={`text-${parentId}-${index}`}>
              {renderStaggeredText(item.text, `text-${parentId}-${index}`)}
            </React.Fragment>
          );
        }
        const parts = item.text.split('\n');
        return (
          <React.Fragment key={`text-${parentId}-${index}`}>
            {parts.map((part, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {part}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      }

      case 'interactive': {
        const isExpanded = visibleItems.includes(item.id);
        const isDisabled = disabledItems.includes(item.id);

        const boxElement = isInsideExpansion ? (
          <motion.span variants={itemRevealVariants} style={{ display: 'inline' }}>
            <InteractiveBox
              trigger={item.trigger}
              icon={item.icon}
              isDisabled={isDisabled}
              onClick={() => handleInteractiveClick(item.id)}
            />
          </motion.span>
        ) : (
          <InteractiveBox
            trigger={item.trigger}
            icon={item.icon}
            isDisabled={isDisabled}
            onClick={() => handleInteractiveClick(item.id)}
          />
        );

        return (
          <React.Fragment key={`interactive-${item.id}`}>
            {boxElement}
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  className="expanded-content"
                  variants={expandContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {item.expanded.map((expandedItem, expandedIndex) =>
                    renderContent(expandedItem, expandedIndex, item.id, true)
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </React.Fragment>
        );
      }

      case 'link': {
        const linkElement = <LinkBox text={item.text} url={item.url} icon={item.icon} />;
        if (isInsideExpansion) {
          return (
            <motion.span key={`link-${parentId}-${index}`} variants={itemRevealVariants} style={{ display: 'inline' }}>
              {linkElement}
            </motion.span>
          );
        }
        return <React.Fragment key={`link-${parentId}-${index}`}>{linkElement}</React.Fragment>;
      }

      case 'image':
        return (
          <motion.span
            key={`image-${parentId}-${index}`}
            className="inline-block align-middle mx-1"
            variants={isInsideExpansion ? itemRevealVariants : undefined}
          >
            {visibleItems.includes(parentId) && (
              <Image src={item.src} alt={item.alt} width={item.width} height={item.height} className="invert" />
            )}
          </motion.span>
        );

      case 'paragraph':
        return (
          <span key={`paragraph-${parentId}-${index}`} className="paragraph">
            {item.content.map((contentItem, contentIndex) =>
              renderContent(contentItem, contentIndex, parentId, isInsideExpansion)
            )}
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <motion.div
        className="interactive-text font-display font-bold uppercase leading-[1.15] tracking-[-0.02em]"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {renderContent(data)}
      </motion.div>

      {/* 进度指示器 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <ProgressIndicator current={clickCount} total={totalInteractiveItems} />
      </motion.div>

    </>
  );
};

export default InteractiveText;
