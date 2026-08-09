"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { type Category, type CategoryProject } from "@/data/categories";

function GalleryCard({ project }: { project: CategoryProject }) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [openPlayer, setOpenPlayer] = useState(false);

  const enter = useCallback(() => {
    setPlaying(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  const leave = useCallback(() => {
    setPlaying(false);
    const v = videoRef.current;
    if (v) { v.pause(); v.currentTime = 0; }
  }, []);

  return (
    <>
      <div
        className="video-card group relative rounded-lg overflow-hidden bg-[#111] border border-white/[0.06] cursor-pointer aspect-video"
        onMouseEnter={enter}
        onMouseLeave={leave}
        onClick={() => setOpenPlayer(true)}
        data-cursor-video
      >
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${project.accentColor}18, #0D0D0D 70%)` }}
        />
        <div className="absolute top-3 left-3 text-[10px] font-mono text-white/15 z-10">
          {String(project.id).padStart(2, "0")}
        </div>
        <video
          ref={videoRef} src={project.video} muted loop playsInline preload="none"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: playing ? 1 : 0, transition: "opacity 0.5s ease" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center bg-black/25">
            <Play size={13} fill="white" className="text-white ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-xs font-bold text-white/75 truncate">{project.title}</p>
          <p className="text-[10px] text-white/30 mt-0.5">{project.client} · {project.year}</p>
        </div>
      </div>

      <AnimatePresence>
        {openPlayer && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/90" onClick={() => setOpenPlayer(false)} />
            <motion.div
              className="relative z-10 w-full max-w-3xl px-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <button onClick={() => setOpenPlayer(false)}
                className="absolute -top-10 right-4 text-white/40 hover:text-white flex items-center gap-2 text-xs tracking-widest">
                CLOSE <X size={14} />
              </button>
              <div className="rounded-xl overflow-hidden bg-black border border-white/10 aspect-video flex items-center justify-center">
                <video src={project.video} controls muted loop autoPlay playsInline className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface SpecialtyModalProps {
  category: Category | null;
  onClose: () => void;
}

export default function SpecialtyModal({ category, onClose }: SpecialtyModalProps) {
  useEffect(() => {
    if (category) document.body.style.overflow = "hidden";
    else          document.body.style.overflow = "";
    return ()   => { document.body.style.overflow = ""; };
  }, [category]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {category && (
        <motion.div
          className="fixed inset-0 z-[150] flex flex-col bg-[#0A0A0A] overflow-y-auto"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="sticky top-0 z-20 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/[0.06] px-6 md:px-10 py-5 flex items-center justify-between">
            <div>
              <p className="mb-1 text-[10px] font-medium tracking-[0.08em] uppercase text-red/90">
                Category {category.id}
              </p>
              <h2
                className="text-xl font-bold tracking-[-0.02em] text-white md:text-2xl"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {category.title}
              </h2>
              <p
                className="mt-1 text-sm text-white/40"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {category.tagline}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white/35 hover:text-white text-xs tracking-widest uppercase transition-colors"
              data-cursor-hover
            >
              Close <X size={15} />
            </button>
          </div>

          {/* Description */}
          <div className="px-6 md:px-10 py-7 border-b border-white/[0.06]">
            <p className="text-base md:text-lg text-white/35 max-w-2xl leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
              {category.description}
            </p>
          </div>

          {/* Gallery grid */}
          <div className="px-6 md:px-10 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.projects.map((p) => (
                <GalleryCard key={p.id} project={p} />
              ))}
            </div>
          </div>

          <div className="px-6 md:px-10 pb-8 text-center">
            <p className="text-xs text-white/15 tracking-widest">Placeholder content — replace with your own work</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
