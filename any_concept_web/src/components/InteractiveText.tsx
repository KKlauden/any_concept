"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypewriterText from './TypewriterText';
import Image from 'next/image';

/**
 * 数据类型接口定义
 */
// 纯文本项
export interface TextItem {
  type: 'text';
  text: string;
}

// 可交互项（点击展开）
export interface InteractiveItem {
  type: 'interactive';
  id: string;
  trigger: string;
  expanded: ContentItem[];
  icon?: string;       // 图标路径，可选
}

// 链接项
export interface LinkItem {
  type: 'link';
  url: string;
  text: string;
  icon?: string;       // 图标路径，可选
}

// 图片项
export interface ImageItem {
  type: 'image';
  src: string;
  alt: string;
  width: number;
  height: number;
}

// 段落容器
export interface ParagraphItem {
  type: 'paragraph';
  content: ContentItem[];
  icon_size?: number;  // 图标尺寸，可选，默认为28
}

// 通用内容项类型（联合类型）
export type ContentItem = TextItem | InteractiveItem | LinkItem | ImageItem | ParagraphItem;

// 模块级正则常量，避免每次调用时重新创建
const ICON_PATH_RE = /\/([^\/]+)\.[^\.]+$/;
const NON_ASCII_RE = /[^\u0000-\u00ff]/;
const CJK_TOKEN_RE = /([^\s\p{P}]+)|(\p{P}+)|\s+/gu;

/**
 * 提取图标名称作为alt文本
 * @param iconPath 图标路径
 * @returns Alt文本
 */
const getIconAlt = (iconPath: string): string => {
  const match = iconPath.match(ICON_PATH_RE);
  return match ? match[1] : 'icon';
};

/**
 * 文本分词处理，将文本拆分为单词数组
 * @param text 输入文本
 * @returns 单词数组
 */
const tokenizeText = (text: string): string[] => {
  const tokens: string[] = [];

  const containsNonASCII = NON_ASCII_RE.test(text);

  if (containsNonASCII) {
    // 中文处理：匹配中文字符、西文单词、标点符号等
    CJK_TOKEN_RE.lastIndex = 0;
    let match;

    while ((match = CJK_TOKEN_RE.exec(text)) !== null) {
      if (match[0].trim() !== '') {
        tokens.push(match[0]);
      } else if (match[0].includes('\n')) {
        // 处理换行符
        tokens.push('\n');
      } else if (match[0].includes(' ')) {
        // 处理空格
        tokens.push(' ');
      }
    }
  } else {
    // 英文处理：保留单词间的空格
    // 将文本按照单词和空格分割，同时保留标点符号
    const words = text.split(/(\s+)/);
    words.forEach(word => {
      if (word) {
        tokens.push(word);
      }
    });
  }
  
  return tokens;
};

/**
 * 单词组件属性
 */
interface WordProps {
  text: string;
  isInteractive?: boolean;   // 是否可交互（可点击）
  onClick?: () => void;      // 点击处理函数
  isVisible: boolean;        // 是否可见
  isDisabled?: boolean;      // 是否禁用（已点击过）
  children?: React.ReactNode; // 子元素（用于嵌套内容）
  delay?: number;            // 打字延迟
  icon?: string;             // 图标路径
  iconSize?: number;         // 图标尺寸
}

/**
 * 主组件属性
 */
export interface InteractiveTextProps {
  data: ContentItem;  // 内容数据
}

/**
 * 单词组件 - 渲染单个文本单元
 */
const Word: React.FC<WordProps> = ({ 
  text, 
  isInteractive = false,
  onClick,
  isVisible,
  isDisabled = false,
  children,
  delay = 0,
  icon,
  iconSize = 28
}) => {
  // 处理换行符
  if (text.startsWith('\n')) {
    return (
      <>
        <br className="mb-0" />
        <TypewriterText
          text={text.substring(1)}
          isVisible={isVisible}
          isDisabled={isDisabled}
          isInteractive={isInteractive}
          delay={delay}
          onClick={isInteractive && onClick ? onClick : undefined}
          className="mx-0"
          icon={icon}
          iconSize={iconSize}
        />
        {children}
      </>
    );
  }
  
  return (
    <>
      <TypewriterText
        text={text}
        isVisible={isVisible}
        isDisabled={isDisabled}
        isInteractive={isInteractive}
        delay={delay}
        onClick={isInteractive && onClick ? onClick : undefined}
        className="mx-0"
        icon={icon}
        iconSize={iconSize}
      />
      {children}
    </>
  );
};

/**
 * 计算内容中的可交互项总数（不包括链接）
 * @param item 内容项
 * @returns 可交互项总数
 */
const countInteractiveItems = (item: ContentItem): number => {
  switch (item.type) {
    case 'interactive':
      // 递归计算子项
      return 1 + item.expanded.reduce((sum, child) => sum + countInteractiveItems(child), 0);
    case 'paragraph':
      // 递归计算子项
      return item.content.reduce((sum, child) => sum + countInteractiveItems(child), 0);
    case 'text':
    case 'link':
    case 'image':
    default:
      return 0;
  }
};

/**
 * 交互式文本组件 - 主组件
 */
const InteractiveText: React.FC<InteractiveTextProps> = ({ data }) => {
  // 状态管理
  const [visibleItems, setVisibleItems] = useState<string[]>(['main']); // 默认显示main状态的文字
  const [typingInProgress, setTypingInProgress] = useState<boolean>(true); // 初始状态为正在打字
  const [disabledItems, setDisabledItems] = useState<string[]>([]); // 已被点击过的项
  const [isRemoteClick, setIsRemoteClick] = useState<boolean>(false); // 是否是远程点击
  const [clickCount, setClickCount] = useState<number>(0); // 点击计数
  const [totalInteractiveItems, setTotalInteractiveItems] = useState<number>(0); // 可交互项总数
  // isComplete 从 clickCount 和 totalInteractiveItems 直接计算
  
  // 加载动画状态
  const [showInitialAnimation, setShowInitialAnimation] = useState<boolean>(true); // 是否显示初始动画
  const [showPrefix, setShowPrefix] = useState<boolean>(false); // 是否显示前缀 "0/"
  const [animationNumber, setAnimationNumber] = useState<number>(0); // 动画中显示的数字
  const [showMainContent, setShowMainContent] = useState<boolean>(false); // 是否显示主要内容
  
  // 初始化时计算可交互项总数
  useEffect(() => {
    const count = countInteractiveItems(data);
    setTotalInteractiveItems(count);
    
    // 初始加载动画
    if (count > 0) {
      // 先从0滚动到总数
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setAnimationNumber(current);
        if (current >= count) {
          clearInterval(interval);
          
          // 滚动结束后，显示前缀 "0/"
          setTimeout(() => {
            setShowInitialAnimation(false);
            setShowPrefix(true);
            
            // 前缀出现后，再显示主要内容
            setTimeout(() => {
              setShowMainContent(true);
            }, 200);
          }, 300);
        }
      }, 50); // 更快的滚动速度
      
      return () => clearInterval(interval);
    }
  }, [data]);
  
  // 直接计算是否完成所有点击
  const isComplete = totalInteractiveItems > 0 && clickCount >= totalInteractiveItems;
  
  // 获取图标尺寸
  const iconSize = data.type === 'paragraph' ? data.icon_size || 28 : 28;
  
  // 设置闪烁效果
  const blinkerRef = useRef<HTMLSpanElement>(null);
  const [blinkerState, setBlinkerState] = useState<'idle' | 'typing' | 'active'>('typing');
  
  // 初始打字效果完成后改变blinker状态
  useEffect(() => {
    // 初始状态为打字中，2秒后结束
    const typingTimer = setTimeout(() => {
      setTypingInProgress(false);
      setBlinkerState('idle');
    }, 2000);
    
    return () => clearTimeout(typingTimer);
  }, []);
  
  // 绿色闪烁效果
  useEffect(() => {
    if (blinkerState === 'idle') {
      // 每隔6秒闪烁一次
      const pingInterval = setInterval(() => {
        const el = blinkerRef.current;
        if (el) {
          el.classList.add('counter-blinker--ping');
          setTimeout(() => {
            el.classList.remove('counter-blinker--ping');
          }, 500);
        }
      }, 6000);
      
      return () => clearInterval(pingInterval);
    }
  }, [blinkerState]);
  
  /**
   * 处理交互项点击
   */
  const handleInteractiveClick = (id: string) => {
    // 如果正在进行打字动画，不响应点击
    if (typingInProgress) return;
    
    // 如果点击的项ID已在可见状态中，则隐藏它
    if (visibleItems.includes(id)) {
      setVisibleItems(prev => prev.filter(item => item !== id));
      setDisabledItems(prev => prev.filter(item => item !== id));
      return;
    }
    
    // 点击后立即将项添加到已点击列表
    setDisabledItems(prev => [...prev, id]);
    
    // 触发本地点击效果
    setIsRemoteClick(false);
    setBlinkerState('active');
    
    // 设置打字动画进行中
    setTypingInProgress(true);
    
    // 添加新项到可见状态
    setVisibleItems(prev => [...prev, id]);
    
    // 打字效果完成后，关闭打字进行中状态
    setTimeout(() => {
      setTypingInProgress(false);
      setBlinkerState('idle');
    }, 1000); // 预计打字效果大约持续1秒
    
    setClickCount(prev => prev + 1);
  };
  
  /**
   * 递归渲染内容项
   * @param item 当前内容项
   * @param index 索引（用于延迟计算）
   * @param parentId 父级ID（用于嵌套内容）
   */
  const renderContent = (item: ContentItem, index: number = 0, parentId: string = 'main'): React.ReactNode => {
    switch (item.type) {
      // 渲染纯文本
      case 'text': {
        // 将文本分词处理
        const tokens = tokenizeText(item.text);
        return (
          <React.Fragment key={`text-${parentId}-${index}`}>
            {tokens.map((token, tokenIndex) => {
              if (token === '\n') {
                return <br key={`br-${parentId}-${index}-${tokenIndex}`} />;
              }
              return (
                <Word
                  key={`token-${parentId}-${index}-${tokenIndex}`}
                  text={token}
                  isInteractive={false}
                  isVisible={visibleItems.includes(parentId)}
                  delay={index * 50 + tokenIndex * 20}
                />
              );
            })}
          </React.Fragment>
        );
      }
      
      // 渲染可交互项（有展开内容）
      case 'interactive': {
        const isExpanded = visibleItems.includes(item.id);
        const isDisabled = disabledItems.includes(item.id);
        
        return (
          <React.Fragment key={`interactive-${item.id}`}>
            <Word
              text={item.trigger}
              isInteractive={true}
              onClick={() => handleInteractiveClick(item.id)}
              isVisible={visibleItems.includes(parentId)}
              isDisabled={isDisabled}
              delay={index * 50}
              icon={item.icon}
              iconSize={iconSize}
            />
            {isExpanded && (
              <span className="expanded-content">
                {item.expanded.map((expandedItem, expandedIndex) => 
                  renderContent(expandedItem, expandedIndex, item.id)
                )}
              </span>
            )}
          </React.Fragment>
        );
      }
      
      // 渲染链接
      case 'link':
        return (
          <a 
            key={`link-${parentId}-${index}`}
            href={item.url} 
            className="text-blue-600 hover:underline relative group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Word
              text={item.text}
              isInteractive={true}
              isVisible={visibleItems.includes(parentId)}
              delay={index * 50}
              icon={item.icon}
              iconSize={iconSize}
            />
            <svg aria-hidden="true" className="absolute -top-2 -right-[2px]" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="6" cy="6" r="6" fill="black"/>
<path d="M8.875 3.5C8.875 3.29289 8.70711 3.125 8.5 3.125L5.125 3.125C4.91789 3.125 4.75 3.29289 4.75 3.5C4.75 3.70711 4.91789 3.875 5.125 3.875H8.125V6.875C8.125 7.08211 8.29289 7.25 8.5 7.25C8.70711 7.25 8.875 7.08211 8.875 6.875L8.875 3.5ZM4 8L4.26517 8.26517L8.76517 3.76516L8.5 3.5L8.23484 3.23483L3.73483 7.73483L4 8Z" fill="white"/>
</svg>
          </a>
        );
      
      // 渲染图片
      case 'image':
        return (
          <span key={`image-${parentId}-${index}`} className="inline-block align-middle">
            {visibleItems.includes(parentId) && (
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="rounded-md"
              />
            )}
          </span>
        );
      
      // 渲染段落容器
      case 'paragraph':
        return (
          <div key={`paragraph-${parentId}-${index}`} className="paragraph">
            {item.content.map((contentItem, contentIndex) => 
              renderContent(contentItem, contentIndex, parentId)
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="interactive-text-container relative">
      <AnimatePresence>
        {showMainContent && (
          <>
          <motion.div 
            className="text-container text-xl md:text-2xl flex flex-wrap leading-relaxed tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent(data)}
          </motion.div>
          <div className='w-full h-12 md:h-28'></div>
          </>
        )}
      </AnimatePresence>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="counter-container flex flex-row justify-start items-center gap-2 w-full mb-28"
      >
        <span ref={blinkerRef} className={`counter-blinker ${
          blinkerState === 'typing' ? 'counter-blinker--typing' : 
          blinkerState === 'active' ? 'counter-blinker--active counter-blinker--local' : 
          'counter-blinker--idle'
        }`}></span>
        <div className="counter-text text-[13px] font-jetbrains font-normal ml-1 tracking-widest">
          {showInitialAnimation ? (
            <motion.span
              key="animation"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=""
            >
              {animationNumber}
            </motion.span>
          ) : (
            <AnimatePresence>
              {showPrefix && (
                <motion.span
                  key="prefix"
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className=""
                >
                  {clickCount}/
                </motion.span>
              )}
              <span className="">{totalInteractiveItems}</span>
            </AnimatePresence>
          )} <span className="">CLICKS</span> {isComplete && " 🎉"}
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveText;