"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ICON_PATH_RE = /\/([^\/]+)\.[^\.]+$/;

interface TypewriterTextProps {
  text: string;
  onComplete?: () => void;
  delay?: number;
  isVisible?: boolean;
  isDisabled?: boolean;
  isInteractive?: boolean;
  className?: string;
  onClick?: () => void;
  icon?: string;
  iconSize?: number;
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
  const [displayText, setDisplayText] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setDisplayText('');
      return;
    }

    if (displayText === text) return;

    let currentIndex = 0;
    let currentText = '';

    const startTimer = setTimeout(() => {
      const typingProcess = () => {
        if (currentIndex < text.length) {
          const char = text[currentIndex];
          currentText += char;
          setDisplayText(currentText);
          currentIndex++;

          let nextDelay = 35 + Math.random() * 15;
          if (char === ' ') nextDelay = 25;
          else if (char === '\n') nextDelay = 80;
          else if ([',', '.', '!', '?', ';', ':', '，', '。', '！', '？', '；', '：'].includes(char)) {
            nextDelay = 50 + Math.random() * 30;
          }

          timeoutRef.current = setTimeout(typingProcess, nextDelay);
        } else {
          onCompleteRef.current?.();
        }
      };

      typingProcess();
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, isVisible, delay]);

  const getIconAlt = (iconPath: string): string => {
    const match = iconPath.match(ICON_PATH_RE);
    return match ? match[1] : 'icon';
  };

  const baseClasses = `relative inline-flex items-center my-[3px] ${className}`;

  const interactiveClasses = isInteractive
    ? isDisabled
      ? 'word-interactive word-interactive--disabled'
      : 'word-interactive'
    : '';

  const colorClass = isDisabled
    ? 'text-muted'
    : 'text-foreground';

  return (
    <motion.span
      className={`${baseClasses} ${interactiveClasses} ${colorClass}`}
      style={{ display: 'inline-flex', alignItems: 'center' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
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
    >
      <span className="whitespace-pre-wrap break-words">{displayText}</span>
      {icon && isVisible && (
        <Image
          src={icon}
          alt={getIconAlt(icon)}
          width={iconSize}
          height={iconSize}
          className="inline-block align-middle ml-1 invert brightness-90"
        />
      )}
    </motion.span>
  );
};

export default TypewriterText;
