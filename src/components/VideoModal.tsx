"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { type Project } from "@/data/projects";

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function VideoModal({ project, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      setTimeout(() => videoRef.current?.play().catch(() => {}), 420);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/92 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-[92vw] md:max-w-5xl px-4"
            initial={{ scale: 0.93, opacity: 0, y: 28 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 18 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute -top-11 right-0 flex items-center gap-2 text-white/40 hover:text-white transition-colors z-20 text-xs tracking-widest"
              data-cursor-hover
            >
              CLOSE <X size={15} />
            </button>

            {/* Video */}
            <div className="relative rounded-xl overflow-hidden bg-black border border-white/10" style={{ aspectRatio: "16/9" }}>
              {/* Placeholder overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A] pointer-events-none z-10">
                <div className="flex flex-col items-center gap-3 text-white/15">
                  <Play size={44} />
                  <p className="text-sm tracking-widest">Replace with your video</p>
                </div>
              </div>
              <video
                ref={videoRef}
                src={project.video}
                className="w-full h-full object-cover relative z-20"
                controls muted playsInline loop
              />
            </div>

            {/* Info */}
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-red mb-1">{project.category}</p>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  {project.title}
                </h3>
                <p className="text-white/40 text-sm mt-2 max-w-xl leading-relaxed">{project.description}</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-xs text-white/25 tracking-widest">{project.year}</div>
                <div className="text-sm text-white/40 mt-1">{project.client}</div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-white/10 text-white/30">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
