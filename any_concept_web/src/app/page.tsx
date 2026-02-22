"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import InteractiveText from "@/components/InteractiveText";
import MouseGlow from "@/components/MouseGlow";
import { introContent } from "@/data/introContent";
import Link from "next/link";

/**
 * 实时时钟 — 上海时区
 */
const LiveClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Shanghai",
        }),
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="tabular-nums">{time || "--:--:--"}</span>;
};

/**
 * 滚动指示器
 */
const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.8, duration: 0.5 }}
  >
    <span className="text-[9px] font-mono tracking-[0.25em] text-white/25 uppercase">
      Scroll
    </span>
    <div className="relative w-px h-8 overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-full bg-white/30"
        animate={{
          height: ["0%", "100%", "100%", "0%"],
          top: ["0%", "0%", "0%", "100%"],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.4, 0.6, 1],
        }}
      />
    </div>
  </motion.div>
);

/**
 * 角落标记 — 建筑图纸风格
 */
const CornerMarkers = () => (
  <>
    <motion.div
      className="absolute top-4 left-4 md:top-6 md:left-6 w-4 h-4 border-t border-l border-white/[0.06]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.4 }}
    />
    <motion.div
      className="absolute top-4 right-4 md:top-6 md:right-6 w-4 h-4 border-t border-r border-white/[0.06]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.55, duration: 0.4 }}
    />
    <motion.div
      className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-4 h-4 border-b border-l border-white/[0.06]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.4 }}
    />
    <motion.div
      className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-4 h-4 border-b border-r border-white/[0.06]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.65, duration: 0.4 }}
    />
  </>
);

/**
 * 动态字母组件 — 鼠标接近时产生弹性位移
 */
const KineticLetter = ({ char, index }: { char: string; index: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.8 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);
      const maxDist = 250;

      if (dist < maxDist) {
        const force = (1 - dist / maxDist) * -10;
        y.set(force);
      } else {
        y.set(0);
      }
    };

    const mq = window.matchMedia("(hover: hover)");
    if (mq.matches) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [y]);

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ y: springY }}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {char}
    </motion.span>
  );
};

/**
 * 导航链接组件
 */
const NavLink = ({
  href,
  label,
  num,
  index,
  external = false,
}: {
  href: string;
  label: string;
  num: string;
  index: number;
  external?: boolean;
}) => {
  const content = (
    <motion.div
      className="nav-link text-3xl md:text-5xl font-display font-bold text-foreground py-3 md:py-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <span className="text-xs font-mono text-white/30 mr-4 align-middle tracking-wider">
        {num}
      </span>
      <span>{label}</span>
      <span className="nav-arrow text-accent ml-3 text-2xl md:text-3xl">
        &rarr;
      </span>
    </motion.div>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
};

/**
 * 章节标签
 */
const SectionLabel = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => (
  <motion.div
    className="text-[9px] font-mono tracking-[0.25em] text-white/25 uppercase mb-6 md:mb-8"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
  >
    {text}
  </motion.div>
);

/**
 * 首页
 */
export default function Home() {
  const letters = "KLAUDEN".split("");

  return (
    <main className="relative z-10 min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* 背景层 */}
      <div className="dot-grid" aria-hidden="true" />
      <MouseGlow />

      {/* ====== Hero: 全屏视口 ====== */}
      <section className="relative min-h-screen flex flex-col">
        <CornerMarkers />

        {/* 顶部元信息条 */}
        <motion.div
          className="flex justify-between items-start px-6 md:px-20 lg:px-28 pt-6 md:pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="flex flex-col gap-1">
            <span className="meta-label">Full-Stack Designer</span>
            <span className="meta-label-sub flex items-center gap-1.5">
              <span className="status-dot" />
              Available for Work
            </span>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <span className="meta-label">
              <LiveClock />
            </span>
            <span className="meta-label-sub">UTC+8 Shanghai</span>
          </div>
        </motion.div>

        {/* 中心: 巨型名字 */}
        <div className="flex-1 flex items-center px-6 md:px-20 lg:px-28">
          <h1
            className="font-display font-extrabold leading-[0.85] tracking-[-0.04em] select-none"
            style={{ fontSize: "clamp(72px, 15vw, 200px)" }}
          >
            {letters.map((letter, i) => (
              <KineticLetter key={i} char={letter} index={i} />
            ))}
            <motion.span
              className="animate-cursor-blink"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              _
            </motion.span>
          </h1>
        </div>

        {/* 底部元信息条 */}
        <motion.div
          className="flex justify-between items-end px-6 md:px-20 lg:px-28 pb-16 md:pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <span className="meta-label">31.23°N 121.47°E</span>
          <span className="meta-label">WebSite &mdash; 2026</span>
        </motion.div>

        {/* 滚动指示器 */}
        <ScrollIndicator />
      </section>

      {/* ====== 交互文本区 ====== */}
      <section className="px-6 md:px-20 lg:px-28 pt-24 md:pt-36">
        <SectionLabel text="001 — About" />
        <motion.div
          className="h-px bg-white/10 mb-10 md:mb-14"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: "left" }}
        />
        <InteractiveText data={introContent} />
      </section>

      {/* ====== 底部导航区 ====== */}
      <nav className="px-6 md:px-20 lg:px-28 mt-24 md:mt-36">
        <SectionLabel text="002 — Explore" />
        <motion.div
          className="h-px bg-white/10 mb-8 md:mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: "left" }}
        />

        <NavLink href="/craft" label="CRAFT" num="01" index={0} />
        <NavLink href="/projects" label="PROJECTS" num="02" index={1} />
        <NavLink
          href="mailto:kklauden@gmail.com"
          label="CONTACT"
          num="03"
          index={2}
          external
        />
      </nav>

      {/* ====== 页脚 ====== */}
      <footer className="px-6 md:px-20 lg:px-28 pt-20 md:pt-28 pb-12">
        <motion.div
          className="h-px bg-white/[0.06] mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: "left" }}
        />
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-muted font-mono tracking-wider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span>&copy; 2025 KLAUDEN &middot; SHANGHAI</span>
          <a
            href="mailto:kklauden@gmail.com"
            className="hover:text-foreground transition-colors duration-200"
          >
            kklauden@gmail.com
          </a>
        </motion.div>
      </footer>
    </main>
  );
}
