"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Reel catalogue ─── */
const REELS = [
  {
    id: "01",
    video: "/videos/sports.mp4",
    cls: "reel-vertical",
    label: "Sports Film",
  },
  {
    id: "02",
    video: "/videos/showreel.mp4",
    cls: "reel-large",
    label: "Showreel",
  },
  {
    id: "03",
    video: "/videos/ai.mp4",
    cls: "reel-square",
    label: "AI Film",
  },
  {
    id: "04",
    video: "/videos/wedding.mp4",
    cls: "reel-vertical-2",
    label: "Wedding Film",
  },
  {
    id: "05",
    video: "/videos/commercial.mp4",
    cls: "reel-wide",
    label: "Commercial",
  },
  {
    id: "06",
    video: "/videos/social.mp4",
    cls: "reel-square",
    label: "Social & Ads",
  },
] as const;

/* ─── Framer Motion stagger ─── */
const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 52, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.95, ease: EASE },
  },
};

/* ═══════════════════════════════════════════════════
   REEL CARD
═══════════════════════════════════════════════════ */
function ReelCard({
  reel,
  onOpen,
}: {
  reel: (typeof REELS)[number];
  onOpen: (src: string, time: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Force autoplay on mount */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    if (v.readyState >= 2) {
      tryPlay();
    } else {
      v.addEventListener("canplay", tryPlay, { once: true });
    }
  }, []);

  const handleClick = useCallback(() => {
    const v = videoRef.current;
    if (v) onOpen(v.currentSrc || v.src, v.currentTime);
  }, [onOpen]);

  return (
    <motion.article
      variants={cardVariants}
      className={`group relative cursor-pointer overflow-hidden bg-[#111] ${reel.cls}`}
      style={{ borderRadius: 3, isolation: "isolate" }}
      onClick={handleClick}
      data-cursor-video
    >
      {/* Autoplay video — fills card */}
      <video
        ref={videoRef}
        src={reel.video}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          transition:
            "transform 0.9s cubic-bezier(.2,.7,.2,1), filter 0.6s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLVideoElement).style.transform =
            "scale(1.06)";
          (e.currentTarget as HTMLVideoElement).style.filter =
            "contrast(1.04)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLVideoElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLVideoElement).style.filter = "contrast(1)";
        }}
        aria-hidden
      />

      {/* Cinematic gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,.08) 0%, transparent 50%, rgba(0,0,0,.3) 100%)",
        }}
        aria-hidden
      />

      {/* Number badge */}
      <div
        className="card-meta-mob absolute left-[15px] top-[15px] z-20 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white/35 bg-black/25 font-mono text-[9px] text-white opacity-70"
        style={{ backdropFilter: "blur(10px)" }}
      >
        {reel.id}
      </div>

      {/* Label — appears on hover */}
      <div
        className="absolute bottom-0 inset-x-0 z-20 p-4 translate-y-1 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <span
          className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/70"
          style={{ fontFamily: "var(--font-dm-mono)" }}
        >
          {reel.label}
        </span>
      </div>

      {/* Hover border glow */}
      <div
        className="pointer-events-none absolute inset-0 z-20 border border-transparent transition-colors duration-500 group-hover:border-white/10"
        aria-hidden
      />
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════
   FULLSCREEN VIEWER
═══════════════════════════════════════════════════ */
function ReelViewer({
  src,
  startTime,
  onClose,
}: {
  src: string;
  startTime: number;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Start at the same frame the card was on */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;
    document.body.style.overflow = "hidden";

    const start = () => {
      v.currentTime = startTime;
      v.muted = false;
      v.play().catch(() => {});
    };

    if (v.readyState >= 2) start();
    else v.addEventListener("canplay", start, { once: true });

    return () => {
      document.body.style.overflow = "";
    };
  }, [src, startTime]);

  /* ESC to close */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/96 p-6"
      style={{ backdropFilter: "blur(20px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-[30px] top-[25px] flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
        aria-label="Close viewer"
        data-cursor-hover
      >
        <X size={20} />
      </button>

      {/* Video with native controls */}
      <motion.video
        ref={videoRef}
        src={src}
        controls
        playsInline
        className="h-full max-h-[90vh] w-full max-w-[90vw] object-contain"
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════════ */
export default function CreativeWork() {
  const [viewer, setViewer] = useState<{
    src: string;
    time: number;
  } | null>(null);

  const openViewer = useCallback((src: string, time: number) => {
    setViewer({ src, time });
  }, []);

  const closeViewer = useCallback(() => {
    setViewer(null);
  }, []);

  return (
    <>
      <section
        id="work"
        className="work-sec-mob relative overflow-hidden bg-[#080808] text-white"
        style={{ padding: "clamp(82px,12vw,190px) clamp(20px,5vw,78px) clamp(75px,10vw,160px)" }}
      >
        {/* ── Subtle red radial glow (background decoration) ── */}
        <div
          className="pointer-events-none absolute"
          style={{
            width: 500,
            height: 500,
            top: "10%",
            left: "35%",
            background:
              "radial-gradient(circle, rgba(255,35,35,.08), transparent 70%)",
          }}
          aria-hidden
        />

        {/* ══════════════════════════════════════════
            HEADER
        ══════════════════════════════════════════ */}
        <motion.div
          className="section-head-el relative z-[2] mb-[48px] grid items-end"
          style={{ gridTemplateColumns: "1fr 3fr", gap: "5vw" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Kicker */}
          <span className="section-head-label label mono shrink-0 text-white/35">
            02 / SELECTED WORK
          </span>

          {/* Heading block */}
          <div>
            <h2
              className="section-title-el m-0 text-white"
              style={{ lineHeight: 0.82, letterSpacing: "-0.07em" }}
            >
              Creative{" "}
              <em className="serif-em font-[400] text-white/50">Work.</em>
            </h2>

            <p
              className="section-intro-el max-w-[380px] text-[14px] leading-[1.7] text-white/50"
              style={{ fontFamily: "var(--font-dm-sans)", marginTop: 28 }}
            >
              A visual archive of short-form edits, brand films and cinematic stories.
              Every frame built around rhythm, emotion and a clear point of view.
            </p>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════
            BENTO GRID
        ══════════════════════════════════════════ */}
        <motion.div
          className="creative-grid relative z-[2]"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8%" }}
        >
          {REELS.map((reel) => (
            <ReelCard key={reel.id} reel={reel} onOpen={openViewer} />
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════════ */}
        <motion.div
          className="relative z-[2] mt-[45px] flex items-center gap-5 font-mono text-[10px] tracking-[.16em] text-white/35"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <span>MORE WORK</span>
          <div className="h-px flex-1 bg-white/12" />
          <button
            onClick={() =>
              document.getElementById("specialities")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="transition-colors duration-300 hover:text-white/65"
            data-cursor-hover
          >
            SCROLL TO EXPLORE ↓
          </button>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          FULLSCREEN VIEWER
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {viewer && (
          <ReelViewer
            src={viewer.src}
            startTime={viewer.time}
            onClose={closeViewer}
          />
        )}
      </AnimatePresence>
    </>
  );
}
