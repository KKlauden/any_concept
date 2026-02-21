"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from '@/hooks/useLanguage';

interface ProjectItemProps {
  title: string;
  description: string;
  year: string | number;
  link?: string;
  repo?: string;
  isWIP?: boolean;
  index: number;
  id: string;
}

// 贝塞尔曲线计算函数 - 模拟 cubic-bezier(.2, .8, .2, 1)
const snappyEasing = (t: number): number => {
  // 贝塞尔曲线控制点: P0(0,0), P1(0.2,0.8), P2(0.2,1), P3(1,1)
  // 这是一个近似实现，实际的贝塞尔曲线计算更复杂
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// 随机字符生成函数
const getRandomChar = () => {
  // 包含字母、数字和一些特殊字符
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  description,
  year,
  link,
  repo,
  isWIP,
  index,
  id,
}) => {
  const { locale, t } = useLanguage();
  const [opacity, setOpacity] = useState(0);
  
  // 文字动画相关状态
  const [displayTitle, setDisplayTitle] = useState('');
  const [displayDesc, setDisplayDesc] = useState('');
  const [displayYear, setDisplayYear] = useState('');
  const [displayWIP, setDisplayWIP] = useState(false); // 添加WIP动画状态
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // 追踪所有 interval，防止泄漏
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllIntervals = () => {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
  };

  // 增加延迟时间，错开加载动画
  const loadingDelay = 300 + (index * 180);

  useEffect(() => {
    // 设置初始不透明度为0，然后在组件挂载后逐渐显示
    const timer = setTimeout(() => {
      setOpacity(1);
      animateText();
    }, loadingDelay);
    
    return () => clearTimeout(timer);
  }, [loadingDelay]);

  // 语言变更时重新开始动画
  useEffect(() => {
    clearAllIntervals();
    setAnimationComplete(false);
    setDisplayTitle('');
    setDisplayDesc('');
    setDisplayYear('');
    setDisplayWIP(false);

    const timer = setTimeout(() => {
      setOpacity(1);
      animateText();
    }, 100); // 短延迟，确保状态已经重置

    return () => {
      clearTimeout(timer);
      clearAllIntervals();
    };
  }, [locale, title, description, year]);
  
  // 文字动画函数
  const animateText = () => {
    clearAllIntervals();

    // 标题动画
    let titleProgress = 0;
    const titleInterval = setInterval(() => {
      // 使用贝塞尔曲线计算进度
      titleProgress += 0.4; // 更慢的进度增长
      
      if (titleProgress <= 1) {
        // 计算当前显示的长度
        const currentLength = Math.floor(snappyEasing(titleProgress) * title.length);
        
        // 创建滚动效果的字符串：前部分是实际标题，后部分是随机字符
        let randomChars = '';
        for (let i = 0; i < Math.min(5, title.length - currentLength); i++) {
          randomChars += getRandomChar();
        }
        
        // 如果是WIP项目，在标题完全显示后才开始显示WIP标签
        setDisplayTitle(title.substring(0, currentLength) + randomChars);
      } else {
        clearInterval(titleInterval);
        setDisplayTitle(title);
        
        // 如果是WIP项目，添加WIP标签动画
        if (isWIP) {
          setTimeout(() => {
            setDisplayWIP(true);
          }, 200);
        }
        
        // 描述动画开始前等待一小段时间
        setTimeout(() => {
          // 描述动画
          if (description) {
            let descProgress = 0;
            const descInterval = setInterval(() => {
              descProgress += 0.015; // 更慢的进度增长

              if (descProgress <= 1) {
                const currentLength = Math.floor(snappyEasing(descProgress) * description.length);

                let randomChars = '';
                for (let i = 0; i < Math.min(8, description.length - currentLength); i++) {
                  randomChars += getRandomChar();
                }

                setDisplayDesc(description.substring(0, currentLength) + randomChars);
              } else {
                clearInterval(descInterval);
                setDisplayDesc(description);
                setAnimationComplete(true);
              }
            }, 35); // 更慢的动画间隔
            intervalsRef.current.push(descInterval);
          } else {
            setAnimationComplete(true);
          }
        }, 150);
      }
    }, 50); // 更慢的动画间隔
    intervalsRef.current.push(titleInterval);

    // 年份动画 - 与标题动画同时开始
    const yearStr = year.toString();
    let yearProgress = 0;
    const yearInterval = setInterval(() => {
      yearProgress += 0.04;
      
      if (yearProgress <= 1) {
        const currentLength = Math.floor(snappyEasing(yearProgress) * yearStr.length);
        
        let randomChars = '';
        for (let i = 0; i < Math.min(2, yearStr.length - currentLength); i++) {
          randomChars += getRandomChar();
        }
        
        setDisplayYear(yearStr.substring(0, currentLength) + randomChars);
      } else {
        clearInterval(yearInterval);
        setDisplayYear(yearStr);
      }
    }, 50); // 更慢的动画间隔
    intervalsRef.current.push(yearInterval);
  };
  
  // 动画效果
  const loadingAnimation = {
    opacity: opacity,
    transition: `opacity 0.8s cubic-bezier(.2, .8, .2, 1)`, // 添加贝塞尔曲线
  };
  
  // 创建项目链接
  // 如果有外部链接，使用外部链接，否则链接到项目详情页
  const projectUrl = `/projects/${id}`;
  // 移除isExternalLink变量，统一在当前页面打开链接
  
  // 线条动画样式，直接从rauno.me网站参考
  const lineAnimationStyle = {
    flex: 1,
    position: 'relative' as const
  };
  
  // 计算延迟时间
  const lineAnimationDelay = 0.05 * index;

  // 使用i18n翻译WIP文本
  const wipText = t('projects.wip');
  
  return (
    <Link 
      href={projectUrl} 
      target="_self" 
      className="block outline-none hover:bg-zinc-100 rounded-xl transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2"
    >
      <div
        className="flex flex-row items-center px-3 py-3 -mx-0 w-full"
        style={loadingAnimation}
      >
        {/* 项目标题和描述 */}
        <div className="flex-1 flex flex-row items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-black/87 font-jetbrains-mono">
              {displayTitle || (animationComplete ? title : '')}
              {(displayWIP || animationComplete) && isWIP && <span className="text-primary/70 font-normal ml-1">{wipText}</span>}
            </span>
          </div>
          <span className="text-sm text-black/54 hidden md:inline-block ml-2">
            {displayDesc || (animationComplete ? description : '')}
          </span>
          
          {/* 线条动画 - 直接使用与rauno.me相似的实现方式 */}
          <div 
            className={`line-animation-${index} mx-4`} 
            style={lineAnimationStyle}
          ></div>
        </div>
        
        {/* 年份标签 */}
        <div className="text-sm text-black/32 font-jetbrains-mono">
          {displayYear || (animationComplete ? year : '')}
        </div>
      </div>

      <style jsx>{`
        .line-animation-${index} {
          flex: 1;
          position: relative;
          height: 16px;
        }
        
        .line-animation-${index}:after {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          height: 1px;
          width: 0;
          background-color: transparent;
          animation: lineGrow 1s ease forwards;
          animation-delay: ${lineAnimationDelay}s;
        }
        
        .line-animation-${index}:before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          height: 1px;
          width: 0;
          z-index: 3;
          background-color: transparent;
          animation: lineFlash 1s ease forwards;
          animation-delay: ${lineAnimationDelay + 0.1}s;
        }
        
        @keyframes lineGrow {
          0% { 
            width: 0; 
            background-color: transparent;
          }
          50% { 
            width: 50%; 
            background-color: rgba(0,0,0,0.32);
          }
          100% { 
            width: 100%; 
            background-color: rgba(0,0,0,0.12);
          }
        }
        
        @keyframes lineFlash {
          0% { 
            width: 0; 
            background-color: transparent;
          }
          50% { 
            width: 50%; 
            background-color: rgba(0,0,0,0.3);
          }
          100% { 
            width: 100%; 
            background-color: transparent;
          }
        }
      `}</style>
    </Link>
  );
};

export default ProjectItem; 