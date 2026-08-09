"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, X } from "lucide-react";

export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-20%" });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 300);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setOpen(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
    document.body.style.overflow = "";
  };

  return (
    <>
      {/* ── Full-viewport dark section ── */}
      <section
        id="showreel"
        ref={sectionRef}
        className="relative section-dark flex flex-col items-center justify-center overflow-hidden py-36 md:py-44"
      >
        {/* Subtle radial warm glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_50%_50%,rgba(229,9,20,0.04)_0%,transparent_70%)] pointer-events-none" />

        {/* Ghost "REEL" — large typographic texture */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-black text-white/[0.025] tracking-tight"
            style={{ fontSize: "clamp(8rem, 22vw, 30rem)", fontFamily: "var(--font-syne)", lineHeight: 1 }}
            aria-hidden
          >
            REEL
          </span>
        </div>

        {/* Horizontal film-strip lines */}
        <div className="absolute left-0 right-0 top-[38%] h-px bg-white/[0.04] pointer-events-none" />
        <div className="absolute left-0 right-0 top-[62%] h-px bg-white/[0.04] pointer-events-none" />

        {/* Corner metadata — barely visible, cinematic */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute top-8 left-8 md:left-12"
        >
          <p className="text-[8px] tracking-[0.6em] uppercase text-white/12">Shubh Yadav</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute top-8 right-8 md:right-12"
        >
          <p className="text-[8px] tracking-[0.6em] uppercase text-white/12">2025</p>
        </motion.div>

        {/* The play trigger — the only focal point */}
        <motion.button
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleOpen}
          className="group flex flex-col items-center gap-7 relative z-10"
          data-cursor-video
        >
          {/* Circle — thin, breathing */}
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/18 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/[0.03] transition-all duration-500"
          >
            <Play
              size={20}
              fill="currentColor"
              className="text-white/40 group-hover:text-white/75 ml-1 transition-colors duration-400"
            />
          </motion.div>

          {/* Label */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[9px] tracking-[0.6em] uppercase text-white/22 group-hover:text-white/45 transition-colors duration-400">
              Play Showreel
            </p>
            <div className="w-px h-6 bg-gradient-to-b from-white/15 to-transparent" />
          </div>
        </motion.button>

        {/* Bottom label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 1.2 }}
          className="absolute bottom-9 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.6em] uppercase text-white/10"
        >
          Showreel 2025
        </motion.p>
      </section>

      {/* ── Fullscreen lightbox ── */}
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 z-10 flex items-center gap-2 text-white/35 hover:text-white transition-colors text-[9px] tracking-[0.4em] uppercase"
            data-cursor-hover
          >
            Close <X size={14} />
          </button>

          {/* Video — full viewport */}
          <video
            ref={videoRef}
            src="/videos/showreel.mp4"
            poster="/videos/showreel-poster.jpg"
            className="w-full h-full object-contain"
            playsInline
            controls
            loop
          />
        </motion.div>
      )}
    </>
  );
}
