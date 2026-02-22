"use client";

import React, { useEffect, useRef } from 'react';

/**
 * HexMatrix — 流动十六进制数据矩阵背景动画
 *
 * 在 canvas 上绘制固定网格的 hex 字符，缓慢随机刷新，
 * 营造实时内存转储（memory dump）的氛围。
 *
 * 极低透明度，不干扰前景内容。GPU 合成，性能友好。
 */

const HEX_CHARS = '0123456789ABCDEF';
const FONT_SIZE = 11;
const COL_GAP = 14;       // 列间距
const ROW_GAP = 18;       // 行间距
const PADDING = 20;        // 画布内边距
const UPDATE_INTERVAL = 80; // 每帧间隔 ms
const CHANGE_PROB = 0.03;   // 每帧每个字符变化概率
const FADE_DURATION = 600;  // 字符变化后的高亮衰减时间 ms

const randomHex = () => HEX_CHARS[Math.floor(Math.random() * 16)];

const HexMatrix: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 检查 prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    let cols = 0;
    let rows = 0;
    let grid: string[] = [];
    let lastChanged: number[] = [];   // 每个格子上次变化的时间戳

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.floor((w - PADDING * 2) / COL_GAP);
      rows = Math.floor((h - PADDING * 2) / ROW_GAP);
      const total = cols * rows;

      // 保留已有数据或初始化
      if (grid.length !== total) {
        grid = Array.from({ length: total }, () => randomHex());
        lastChanged = Array.from({ length: total }, () => 0);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    ctx.font = `${FONT_SIZE}px ui-monospace, "JetBrains Mono", monospace`;
    ctx.textBaseline = 'top';

    let lastTick = 0;

    const draw = (now: number) => {
      // 节流：按 UPDATE_INTERVAL 刷新
      if (now - lastTick >= UPDATE_INTERVAL) {
        lastTick = now;

        // 随机变更部分字符
        const total = cols * rows;
        for (let i = 0; i < total; i++) {
          if (Math.random() < CHANGE_PROB) {
            grid[i] = randomHex();
            lastChanged[i] = now;
          }
        }
      }

      // 清屏
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制
      const total = cols * rows;
      for (let i = 0; i < total; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = PADDING + col * COL_GAP;
        const y = PADDING + row * ROW_GAP;

        // 计算衰减后的透明度
        const elapsed = now - lastChanged[i];
        let alpha: number;

        if (elapsed < FADE_DURATION) {
          // 刚变化：从较亮衰减到基础亮度
          const progress = elapsed / FADE_DURATION;
          alpha = 0.12 - progress * 0.08; // 0.12 → 0.04
        } else {
          alpha = 0.04; // 基础亮度
        }

        ctx.fillStyle = `rgba(72, 213, 151, ${alpha})`;
        ctx.fillText(grid[i], x, y);
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    />
  );
};

export default HexMatrix;
