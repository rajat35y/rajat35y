"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Play } from "lucide-react";
import MagneticButton from "./MagneticButton";

const EASE = [0.2, 0.7, 0.2, 1] as const;

const PILLS = ["CINEMATIC", "COMMERCIAL", "SPORTS", "AI FILM", "WEDDING"];

const STATS = [
  { val: "08", suffix: "+", label: "YEARS OF CRAFT" },
  { val: "200", suffix: "+", label: "PROJECTS DELIVERED" },
  { val: "05", suffix: "",  label: "STUDIOS & BRANDS" },
];

function MaskReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span style={{ display: "block", overflow: "hidden" }}>
      <motion.span
        style={{ display: "block" }}
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function ShowreelCard({ onOpen }: { onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover]     = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const enter = () => {
    setHover(true);
    videoRef.current?.play().catch(() => {});
  };
  const leave = () => {
    setHover(false);
    const v = videoRef.current;
    if (v) { v.pause(); v.currentTime = 0; }
  };

  const baseRotate  = isMobile ? -1   : -2.1;
  const baseAspect  = isMobile ? "9/11" : "4/5";
  const baseRadius  = isMobile ? 18   : 28;

  return (
    <div className="showreel-outer-el relative w-full" style={{ maxWidth: isMobile ? "none" : 640 }}>
      <motion.div
        className="relative w-full cursor-pointer overflow-hidden bg-[#10100f]"
        style={{
          aspectRatio: baseAspect,
          borderRadius: baseRadius,
          boxShadow: "0 30px 90px rgba(0,0,0,.18)",
          rotate: hover ? 0 : baseRotate,
          y: hover ? -6 : 0,
        }}
        transition={{ duration: 0.8, ease: EASE }}
        onClick={onOpen}
        onMouseEnter={enter}
        onMouseLeave={leave}
        data-cursor-video
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") onOpen(); }}
        aria-label="Play showreel"
      >
        {/* Cinematic gradient bg */}
        <div
          className="absolute inset-0 z-0"
          style={{ background: "radial-gradient(circle at 50% 48%,#7b651b44,transparent 45%), linear-gradient(135deg,#020302,#0c0d08 48%,#171006)" }}
          aria-hidden
        />

        {/* Video */}
        <video
          ref={videoRef}
          src="/videos/showreel.mp4"
          muted loop playsInline preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: hover ? 0.8 : 0.55, transition: "opacity 0.5s ease", zIndex: 1 }}
          aria-hidden
        />

        {/* Gradient vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,.25) 0%, transparent 40%, rgba(0,0,0,.6) 100%)" }}
          aria-hidden
        />

        {/* Scan lines */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,.2) 3px,rgba(255,255,255,.2) 4px)" }}
          aria-hidden
        />

        {/* Top meta */}
        <div
          className="absolute inset-x-0 top-0 z-[4] flex items-center justify-between"
          style={{ padding: isMobile ? 13 : 20, fontFamily: "var(--font-dm-mono)", fontSize: isMobile ? 6 : 7, letterSpacing: "0.2em", color: "rgba(255,255,255,.35)" }}
          aria-hidden
        >
          <span>SHUBH YADAV</span>
          <span>2025 · 4K</span>
        </div>

        {/* Center play */}
        <div className="absolute inset-0 z-[4] flex flex-col items-center justify-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center rounded-full border border-white/40 backdrop-blur-sm"
            style={{
              width: isMobile ? 62 : 76,
              height: isMobile ? 62 : 76,
              background: "rgba(255,255,255,.08)",
            }}
          >
            <Play size={isMobile ? 16 : 20} fill="white" className="ml-1 text-white" />
          </motion.div>
          <span
            className="mt-1"
            style={{ fontFamily: "var(--font-dm-mono)", fontSize: isMobile ? 7 : 9, letterSpacing: "0.35em", color: "rgba(255,255,255,.5)" }}
          >
            PLAY SHOWREEL
          </span>
        </div>

        {/* Bottom meta */}
        <div
          className="absolute inset-x-0 bottom-0 z-[4] flex items-end justify-between"
          style={{ padding: isMobile ? 13 : 20, fontFamily: "var(--font-dm-mono)", fontSize: isMobile ? 6 : 7, letterSpacing: "0.14em", color: "rgba(255,255,255,.35)" }}
          aria-hidden
        >
          <span style={{ maxWidth: isMobile ? 150 : undefined, lineHeight: 1.5 }}>CINEMATIC EDITS FOR BRANDS, SPORT &amp; CELEBRATION.</span>
          <span>REEL ↗</span>
        </div>
      </motion.div>

      {/* Available for work pill */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="avail-pill-el absolute -bottom-[1px] -right-[4px] flex items-center gap-[7px] rounded-full border border-border bg-bg px-3 py-[7px]"
        style={{ fontFamily: "var(--font-dm-mono)", fontSize: 8, letterSpacing: "0.15em", color: "#999" }}
        aria-label="Available for work"
      >
        <span className="h-[6px] w-[6px] rounded-full bg-red" />
        AVAILABLE FOR WORK
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "12%"]),  { stiffness: 80, damping: 25 });
  const cardY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]), { stiffness: 80, damping: 25 });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    const lenis = (window as Window & { lenis?: { scrollTo: (el: Element, opts: object) => void } }).lenis;
    if (el) lenis ? lenis.scrollTo(el, { offset: -70, duration: 1.3 }) : el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-outer relative overflow-hidden bg-bg"
      style={{ minHeight: "100svh", padding: "92px 0 58px" }}
    >
      {/* Ambient gradient */}
      <div
        className="pointer-events-none absolute"
        style={{
          inset: "12% -10% auto 38%",
          height: "65%",
          background: "radial-gradient(circle at 58% 45%,rgba(229,194,156,.16),transparent 28%), radial-gradient(circle at 72% 55%,rgba(190,175,125,.10),transparent 35%)",
        }}
        aria-hidden
      />

      {/* Vertical watermark */}
      <div
        className="pointer-events-none absolute z-[2] hidden lg:block"
        style={{
          right: "clamp(18px,5vw,78px)",
          bottom: 28,
          fontFamily: "var(--font-dm-mono)",
          fontSize: 9,
          letterSpacing: "0.24em",
          writingMode: "vertical-rl",
          color: "rgba(9,9,9,.35)",
        }}
        aria-hidden
      >
        SHUBH / 01
      </div>

      {/* Main grid */}
      <div
        className="hero-inner-grid port-container relative z-[2] grid items-center"
        style={{
          gridTemplateColumns: "minmax(0,1.02fr) minmax(0,.88fr)",
          gap: "clamp(48px,7vw,120px)",
        }}
      >
        {/* LEFT — copy */}
        <motion.div className="flex min-w-0 flex-col" style={{ y: textY, paddingTop: "clamp(12px,4vh,48px)" }}>

          {/* REC */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="hero-rec-el mono flex items-center gap-[9px] text-ink/40"
            style={{ marginBottom: 35 }}
          >
            <span className="relative flex h-[7px] w-[7px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red/40 opacity-60" />
              <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-red" />
            </span>
            REC — 24FPS
          </motion.div>

          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
            className="hero-role-el mono inline-flex w-fit items-center gap-[9px] rounded-full border border-border bg-white/25 text-ink/55"
            style={{ padding: "8px 12px", marginBottom: 40 }}
          >
            <span className="hero-role-circle inline-block shrink-0 rounded-full bg-ink" style={{ width: 17, height: 17 }} />
            Senior Multimedia Designer
          </motion.div>

          {/* Name */}
          <div className="relative" style={{ marginBottom: 40 }}>
            <h1 className="hero-h1-el relative m-0 text-ink">
              <MaskReveal delay={0.2}>SHUBH</MaskReveal>
              <MaskReveal delay={0.35}>
                <span className="hero-name-line2" style={{ display: "block", marginLeft: "clamp(54px,8vw,125px)" }}>
                  YADAV<em style={{ fontStyle: "normal", color: "var(--color-red)" }}>.</em>
                </span>
              </MaskReveal>
            </h1>

            {/* Red underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.65 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
              style={{
                position: "absolute",
                left: 4,
                bottom: -22,
                width: "min(240px,28vw)",
                height: 1,
                background: "linear-gradient(90deg,var(--color-red),transparent)",
                transformOrigin: "left",
              }}
              aria-hidden
            />
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.6, ease: EASE }}
            className="hero-desc-el text-ink/55"
            style={{ maxWidth: 590, margin: "40px 0 25px", fontSize: 17, lineHeight: 1.55, fontFamily: "var(--font-dm-sans)" }}
          >
            High-end video editor for{" "}
            <span className="text-ink/80">cinematic, commercial, sports, AI, and wedding</span>{" "}
            films — raw footage refined into work worth watching.
          </motion.p>

          {/* Specialty pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.72 }}
            className="hero-pills-wrap flex flex-wrap"
            style={{ gap: 7, marginBottom: 25 }}
          >
            {PILLS.map((label) => (
              <span
                key={label}
                className="hero-pill-el mono rounded-full border border-border text-ink/50"
                style={{ padding: "6px 10px" }}
              >
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.84, ease: EASE }}
            className="hero-actions-el flex flex-wrap items-center"
            style={{ gap: 12, marginBottom: 25 }}
          >
            <MagneticButton
              onClick={() => scrollTo("work")}
              className="hero-btn-el btn-dark-el mono flex items-center gap-3 rounded-full bg-ink px-[17px] py-[11px] text-white shadow-[0_14px_36px_-14px_rgba(9,9,9,.5)] transition-[background-color,box-shadow] duration-300 hover:bg-red hover:shadow-[0_16px_36px_-14px_rgba(237,45,39,.45)]"
              style={{ letterSpacing: "0.13em" }}
            >
              View Work ↗
            </MagneticButton>

            <button
              onClick={() => scrollTo("work")}
              className="hero-btn-el mono flex items-center gap-3 rounded-full border border-border px-[17px] py-[11px] text-ink/55 transition-colors duration-300 hover:border-ink/45 hover:text-ink"
              style={{ letterSpacing: "0.13em" }}
              data-cursor-hover
            >
              Watch Showreel
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="hero-stats-el grid border-t border-border"
            style={{ gridTemplateColumns: "repeat(3,1fr)", maxWidth: 650 }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`hero-stat-el pr-4 ${i < STATS.length - 1 ? "border-r border-border" : ""} ${i > 0 ? "pl-4" : ""}`}
                style={{ paddingTop: 12 }}
              >
                <p
                  className="hero-stat-val text-ink"
                  style={{ fontFamily: "var(--font-dm-sans)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.06em", lineHeight: 1 }}
                >
                  {s.val}
                  {s.suffix && <span style={{ color: "var(--color-red)" }}>{s.suffix}</span>}
                </p>
                <p className="hero-stat-lbl mono mt-[2px] text-ink/40" style={{ fontSize: 9, letterSpacing: "0.1em" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — showreel card */}
        <motion.div
          className="relative flex justify-end"
          style={{ y: cardY, paddingTop: 18, paddingBottom: 28 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="w-full"
          >
            <ShowreelCard onOpen={() => scrollTo("work")} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
