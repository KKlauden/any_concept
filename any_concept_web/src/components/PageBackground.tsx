"use client";

import MouseGlow from "./MouseGlow";
import CustomCursor from "./CustomCursor";

/**
 * 全局页面背景层 — 点阵网格 + 双光源漂移 + 鼠标跟随光晕
 */
const PageBackground = () => (
  <>
    {/* SVG 滤镜定义 — 供 .text-grain 使用 */}
    <svg
      aria-hidden="true"
      style={{ position: "absolute", width: 0, height: 0 }}
    >
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.75"
          numOctaves="4"
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix in="noise" type="saturate" values="0" result="gray" />
        <feBlend
          in="SourceGraphic"
          in2="gray"
          mode="multiply"
          result="blended"
        />
        {/* slope 控制噪点深浅：0.5=很深, 0.8=中等, 1.0=无效果 */}
        <feComponentTransfer in="blended" result="adjusted">
          <feFuncR type="linear" slope="1" intercept="-0.15" />
          <feFuncG type="linear" slope="1" intercept="-0.15" />
          <feFuncB type="linear" slope="1" intercept="-0.15" />
        </feComponentTransfer>
        <feComposite in="adjusted" in2="SourceGraphic" operator="in" />
      </filter>
    </svg>
    <div className="dot-grid" aria-hidden="true" />
    <div className="ambient-glow-left" aria-hidden="true" />
    <div className="ambient-glow-right" aria-hidden="true" />
    <MouseGlow />
    <CustomCursor />
  </>
);

export default PageBackground;
