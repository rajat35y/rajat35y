"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories, type Category } from "@/data/categories";
import SpecialtyModal from "./SpecialtyModal";

const EASE = [0.16, 1, 0.3, 1] as const;

function SpecialtyRow({ cat, index, onClick }: {
  cat: Category;
  index: number;
  onClick: () => void;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: Math.min(index * 0.055, 0.28), ease: EASE }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="special-row-el group relative grid cursor-pointer items-center overflow-hidden border-b border-border"
      style={{
        gridTemplateColumns: "70px 1fr 1fr 30px",
        minHeight: 125,
        gap: "0 clamp(12px,2.5vw,36px)",
      }}
      data-cursor-hover
    >
      {/* Ambient glow */}
      <div
        className="special-glow"
        style={{ opacity: hovered ? 1 : 0 }}
        aria-hidden
      />

      {/* Num */}
      <p className="special-num-el mono relative z-[1] text-ink/28 tabular-nums">
        {cat.id}
      </p>

      {/* Name */}
      <h3
        className="special-name-el relative z-[1] text-ink"
        style={{ transform: hovered ? "translateX(15px)" : "translateX(0px)" }}
      >
        {cat.title}
      </h3>

      {/* Desc — hidden on mobile via CSS */}
      <p
        className="special-desc-el relative z-[1] text-[13px] leading-[1.5] text-ink/42 max-w-[370px]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {cat.tagline}
      </p>

      {/* Arrow */}
      <ArrowUpRight
        size={16}
        className="special-arrow-el relative z-[1] text-ink/25 transition-all duration-300 group-hover:text-ink/65 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </motion.div>
  );
}

export default function WorkSpecialties() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section id="specialities" ref={sectionRef} className="bg-bg">
      <div
        className="port-container"
        style={{ paddingTop: "clamp(5.5rem,10vw,9.5rem)", paddingBottom: "clamp(5.5rem,10vw,9.5rem)" }}
      >
        {/* Header */}
        <div
          className="section-head-el grid items-end"
          style={{ gridTemplateColumns: "1fr 3fr", gap: "5vw", marginBottom: 55 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="section-head-label label mono text-ink/45">03 / SPECIALTIES</p>
          </motion.div>

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
              className="section-title-el m-0 text-ink"
            >
              Built for{" "}
              <em className="serif-em">motion.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="section-intro-el text-ink/45"
              style={{ maxWidth: 470, lineHeight: 1.7, fontSize: 14, marginTop: 28 }}
            >
              Different canvases. Same obsession with craft.
            </motion.p>
          </div>
        </div>

        {/* Rows */}
        <div className="border-t border-border">
          {categories.map((cat, i) => (
            <SpecialtyRow
              key={cat.id}
              cat={cat}
              index={i}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      </div>

      <SpecialtyModal category={activeCategory} onClose={() => setActiveCategory(null)} />
    </section>
  );
}
