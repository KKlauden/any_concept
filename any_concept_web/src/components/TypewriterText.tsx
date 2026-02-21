"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// 模块级正则常量
const ICON_PATH_RE = /\/([^\/]+)\.[^\.]+$/;

interface TypewriterTextProps {
  text: string;
  onComplete?: () => void;
  delay?: number; // 初始延迟
  isVisible?: boolean;
  isDisabled?: boolean;
  isInteractive?: boolean; // 是否为可交互元素（可点击）
  className?: string;
  onClick?: () => void;
  icon?: string; // 图标路径
  iconSize?: number; // 图标尺寸
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  onComplete,
  delay = 0,
  isVisible = true,
  isDisabled = false,
  isInteractive = false,
  className = '',
  onClick,
  icon,
  iconSize = 28
}) => {
  // 组件状态
  const [displayText, setDisplayText] = useState<string>(''); // 当前显示的文本（用于打字效果）
  const [isTyping, setIsTyping] = useState<boolean>(false); // 是否正在进行打字动画
  const [isComplete, setIsComplete] = useState<boolean>(false); // 打字效果是否完成
  const [showBackground, setShowBackground] = useState<boolean>(isInteractive); // 是否显示背景色
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // 存储setTimeout引用，用于清理
  const onCompleteRef = useRef(onComplete); // 稳定引用，避免 useEffect 重跑
  onCompleteRef.current = onComplete;
  
  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // 处理文字打字效果
  useEffect(() => {
    // 如果元素不可见，重置所有状态
    if (!isVisible) {
      setDisplayText('');
      setIsComplete(false);
      setShowBackground(isInteractive);
      return;
    }
    
    // 设置初始背景显示状态
    setShowBackground(true); // 打字过程中显示背景
    
    // 如果已经完全显示文本，则不需要再次触发打字效果
    if (displayText === text) {
      return;
    }
    
    // 初始化打字状态
    setIsTyping(true);
    let currentIndex = 0;
    let currentText = '';
    
    // 延迟开始打字
    const startTimer = setTimeout(() => {
      // 递归打字过程
      const typingProcess = () => {
        if (currentIndex < text.length) {
          const char = text[currentIndex];
          currentText += char;
          setDisplayText(currentText);
          currentIndex++;
          
          // 根据字符类型调整延迟，使打字效果更自然
          let nextDelay = 40 + Math.random() * 20; // 默认速度
          
          if (char === ' ') {
            nextDelay = 30; // 空格快一点
          } else if (char === '\n') {
            nextDelay = 100; // 换行慢一点
          } else if ([',', '.', '!', '?', ';', ':'].includes(char)) {
            nextDelay = 60 + Math.random() * 40; // 标点符号慢一点
          }
          
          timeoutRef.current = setTimeout(typingProcess, nextDelay);
        } else {
          finishTyping();
        }
      };
      
      // 完成打字效果
      const finishTyping = () => {
        setIsTyping(false);
        setIsComplete(true);
        
        // 打字完成后，如果不是交互元素，则移除背景
        timeoutRef.current = setTimeout(() => {
          if (!isInteractive) {
            setShowBackground(false);
          }
        }, 2000);
        
        onCompleteRef.current?.();
      };
      
      // 开始打字过程
      typingProcess();
    }, delay);
    
    // 清理函数
    return () => {
      clearTimeout(startTimer);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, isVisible, delay, isInteractive]);
  
  // 鼠标悬停状态
  const [isHovered, setIsHovered] = useState(false);
  
  // 计算样式类名
  const getStyleClasses = () => {
    let classes = `relative inline ${isInteractive ? 'inline-flex items-center' : ''} rounded-[4px] my-[6px] ${className} `;
    
    // 文字颜色
    classes += isDisabled ? 'text-black/54 ' : 'text-black/87 ';
    
    // 交互元素样式
    if (isInteractive) {
      classes += 'word-clickable group font-medium font-noto-sans cursor-cell px-2 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none ';
    }
    
    // 已点击样式
    if (isDisabled) {
      classes += 'clicked bg-zinc-50 ';
    }
    
    // 背景颜色
    if (showBackground) {
      if (isInteractive) {
        classes += isHovered ? 'bg-zinc-200 ' : 'bg-zinc-100 ';
      } else {
        classes += 'bg-zinc-100 ';
      }
    }
    
    return classes.trim();
  };
  
  // 提取图标名称作为alt文本
  const getIconAlt = (iconPath: string): string => {
    const match = iconPath.match(ICON_PATH_RE);
    return match ? match[1] : 'icon';
  };
  
  return (
    <motion.span
      className={getStyleClasses()}
      style={{
        transition: 'background-color 0.4s ease',
        display: 'inline-flex',
        alignItems: 'center',
        // height: '39px'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive && !isDisabled ? 0 : undefined}
      aria-disabled={isDisabled || undefined}
      onClick={isInteractive && !isDisabled && onClick ? onClick : undefined}
      onKeyDown={isInteractive && !isDisabled && onClick ? (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      onMouseEnter={isInteractive ? () => setIsHovered(true) : undefined}
      onMouseLeave={isInteractive ? () => setIsHovered(false) : undefined}
    >

      <span className="whitespace-pre-wrap break-words">{displayText}</span>
      {icon && isVisible && (
        <Image
          src={icon}
          alt={getIconAlt(icon)}
          width={iconSize}
          height={iconSize}
          className="inline-block align-middle mx-1"
        />
      )}
    </motion.span>
  );
};

export default TypewriterText; 