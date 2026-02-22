"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

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

// 贝塞尔曲线计算函数
const snappyEasing = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// 随机字符生成函数
const getRandomChar = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
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
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayDesc, setDisplayDesc] = useState("");
  const [displayYear, setDisplayYear] = useState("");
  const [displayWIP, setDisplayWIP] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllIntervals = () => {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
  };

  const loadingDelay = 300 + index * 180;

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
      animateText();
    }, loadingDelay);
    return () => clearTimeout(timer);
  }, [loadingDelay]);

  useEffect(() => {
    clearAllIntervals();
    setAnimationComplete(false);
    setDisplayTitle("");
    setDisplayDesc("");
    setDisplayYear("");
    setDisplayWIP(false);

    const timer = setTimeout(() => {
      setOpacity(1);
      animateText();
    }, 100);

    return () => {
      clearTimeout(timer);
      clearAllIntervals();
    };
  }, [locale, title, description, year]);

  const animateText = () => {
    clearAllIntervals();

    // 标题动画
    let titleProgress = 0;
    const titleInterval = setInterval(() => {
      titleProgress += 0.4;
      if (titleProgress <= 1) {
        const currentLength = Math.floor(
          snappyEasing(titleProgress) * title.length,
        );
        let randomChars = "";
        for (let i = 0; i < Math.min(5, title.length - currentLength); i++) {
          randomChars += getRandomChar();
        }
        setDisplayTitle(title.substring(0, currentLength) + randomChars);
      } else {
        clearInterval(titleInterval);
        setDisplayTitle(title);
        if (isWIP) {
          setTimeout(() => setDisplayWIP(true), 200);
        }
        setTimeout(() => {
          if (description) {
            let descProgress = 0;
            const descInterval = setInterval(() => {
              descProgress += 0.015;
              if (descProgress <= 1) {
                const currentLength = Math.floor(
                  snappyEasing(descProgress) * description.length,
                );
                let randomChars = "";
                for (
                  let i = 0;
                  i < Math.min(8, description.length - currentLength);
                  i++
                ) {
                  randomChars += getRandomChar();
                }
                setDisplayDesc(
                  description.substring(0, currentLength) + randomChars,
                );
              } else {
                clearInterval(descInterval);
                setDisplayDesc(description);
                setAnimationComplete(true);
              }
            }, 35);
            intervalsRef.current.push(descInterval);
          } else {
            setAnimationComplete(true);
          }
        }, 150);
      }
    }, 50);
    intervalsRef.current.push(titleInterval);

    // 年份动画
    const yearStr = year.toString();
    let yearProgress = 0;
    const yearInterval = setInterval(() => {
      yearProgress += 0.04;
      if (yearProgress <= 1) {
        const currentLength = Math.floor(
          snappyEasing(yearProgress) * yearStr.length,
        );
        let randomChars = "";
        for (let i = 0; i < Math.min(2, yearStr.length - currentLength); i++) {
          randomChars += getRandomChar();
        }
        setDisplayYear(yearStr.substring(0, currentLength) + randomChars);
      } else {
        clearInterval(yearInterval);
        setDisplayYear(yearStr);
      }
    }, 50);
    intervalsRef.current.push(yearInterval);
  };

  const loadingAnimation = {
    opacity: opacity,
    transition: `opacity 0.8s cubic-bezier(.2, .8, .2, 1)`,
  };

  const projectUrl = `/projects/${id}`;
  const lineAnimationDelay = 0.05 * index;
  const wipText = t("projects.wip");

  return (
    <Link
      href={projectUrl}
      target="_self"
      className="block outline-none  hover:bg-white/[0.04] transition-colors duration-300 focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      <div
        className="flex flex-row items-center px-3 py-3 w-full"
        style={loadingAnimation}
      >
        <div className="flex-1 flex flex-row items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-foreground font-mono">
              {displayTitle || (animationComplete ? title : "")}
              {(displayWIP || animationComplete) && isWIP && (
                <span className="text-accent/70 font-normal ml-1">
                  {wipText}
                </span>
              )}
            </span>
          </div>
          <span className="text-sm text-white/35 hidden md:inline-block ml-2">
            {displayDesc || (animationComplete ? description : "")}
          </span>

          {/* 线条动画 */}
          <div
            className={`line-animation-${index} mx-4`}
            style={{ flex: 1, position: "relative" as const }}
          />
        </div>

        {/* 年份 */}
        <div className="text-sm text-white/35 font-mono">
          {displayYear || (animationComplete ? year : "")}
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
          animation: lineGrow-${index} 1s ease forwards;
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
          animation: lineFlash-${index} 1s ease forwards;
          animation-delay: ${lineAnimationDelay + 0.1}s;
        }
        @keyframes lineGrow-${index} {
          0% {
            width: 0;
            background-color: transparent;
          }
          50% {
            width: 50%;
            background-color: rgba(255, 255, 255, 0.2);
          }
          100% {
            width: 100%;
            background-color: rgba(255, 255, 255, 0.06);
          }
        }
        @keyframes lineFlash-${index} {
          0% {
            width: 0;
            background-color: transparent;
          }
          50% {
            width: 50%;
            background-color: rgba(255, 107, 0, 0.25);
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
