"use client";

import MouseGlow from "./MouseGlow";
import CustomCursor from "./CustomCursor";

/**
 * 全局页面背景层 — 点阵网格 + 双光源漂移 + 鼠标跟随光晕
 */
const PageBackground = () => (
  <>
    <div className="dot-grid" aria-hidden="true" />
    <div className="ambient-glow-left" aria-hidden="true" />
    <div className="ambient-glow-right" aria-hidden="true" />
    <MouseGlow />
    <CustomCursor />
  </>
);

export default PageBackground;
