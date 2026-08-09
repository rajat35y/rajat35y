"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/data/experience";

const EASE = [0.16, 1, 0.3, 1] as const;

function TimelineRow({ exp, index }: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.25), ease: EASE }}
      className="exp-row-el group relative grid items-start hover:bg-white/[0.025] transition-colors duration-300"
      style={{
        gridTemplateColumns: "clamp(80px,10vw,150px) 1fr minmax(0,2fr) 28px",
        gap: "0 clamp(16px,3vw,40px)",
        padding: "30px 0",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      {/* Year */}
      <p
        className="exp-year-el pt-0.5 text-white/30"
        style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.12em", lineHeight: 1.45 }}
      >
        {exp.period.start.split(" ").pop()}
        {exp.period.end !== exp.period.start && (
          <> — {exp.period.end === "Present" ? "NOW" : exp.period.end.split(" ").pop()}</>
        )}
      </p>

      {/* Role + company */}
      <div className="min-w-0">
        <p
          className="mb-1 text-white/38"
          style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase" }}
        >
          {exp.role}
        </p>
        <h3 className="exp-role-el">{exp.company}</h3>
        {exp.type === "freelance" && (
          <span
            className="mt-2 inline-block rounded-full border border-white/15 px-[9px] py-[4px] text-white/32"
            style={{ fontFamily: "var(--font-dm-mono)", fontSize: 8, letterSpacing: "0.12em" }}
          >
            FREELANCE
          </span>
        )}
      </div>

      {/* Description + highlights */}
      <div className="exp-company-el min-w-0">
        <p
          className="mb-4 leading-[1.65] text-white/38"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13 }}
        >
          {exp.description}
        </p>
        <ul className="space-y-[6px]">
          {exp.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 text-white/25"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, lineHeight: 1.5 }}
            >
              <span className="mt-[6px] h-[3px] w-[3px] shrink-0 rounded-full bg-red/55" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Arrow */}
      <ArrowUpRight
        size={14}
        className="exp-arrow-el mt-0.5 text-white/18 transition-all duration-300 group-hover:text-white/45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ backgroundColor: "#090909", padding: "clamp(5.5rem,10vw,9.5rem) 0" }}
    >
      <div className="port-container">
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
            <p className="section-head-label label mono text-white/30">05 / EXPERIENCE</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <h2 className="section-title-el m-0 text-white/90">
              The{" "}
              <em className="serif-em text-white/75">timeline.</em>
            </h2>
          </motion.div>
        </div>

        {/* Column headers */}
        <div
          className="grid border-t border-white/[0.08] py-3"
          style={{
            gridTemplateColumns: "clamp(80px,10vw,150px) 1fr minmax(0,2fr) 28px",
            gap: "0 clamp(16px,3vw,40px)",
          }}
        >
          {["YEAR", "ROLE / COMPANY", "DETAILS", ""].map((col) => (
            <span
              key={col}
              className="mono text-white/20"
              style={{ letterSpacing: "0.08em" }}
            >
              {col}
            </span>
          ))}
        </div>

        {/* Timeline rows */}
        {experiences.map((exp, i) => (
          <TimelineRow key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}
