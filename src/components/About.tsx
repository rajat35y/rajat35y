"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-15%" });

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    const lenis = (window as Window & { lenis?: { scrollTo: (el: Element, opts: object) => void } }).lenis;
    if (el) lenis ? lenis.scrollTo(el, { offset: -70, duration: 1.3 }) : el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" ref={sectionRef} className="bg-surface" style={{ padding: "clamp(5.5rem,10vw,9.5rem) 0" }}>
      <div
        className="about-grid-el port-container grid"
        style={{ gridTemplateColumns: "1fr 4fr", gap: "5vw" }}
      >
        {/* Left — label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="about-label-el label mono text-ink/30" style={{ letterSpacing: "0.35em" }}>
            ( ABOUT )
          </p>
        </motion.div>

        {/* Right — content */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
            className="about-h2-el m-0 text-ink"
          >
            Eight years.
            <br />
            <em className="serif-em">Every frame</em>
            <br />
            intentional.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.38, ease: EASE }}
            className="about-desc-el text-ink/52"
            style={{ maxWidth: 650, marginTop: 40, fontSize: 17, lineHeight: 1.7, fontFamily: "var(--font-dm-sans)" }}
          >
            Passionate video editor and multimedia designer with 8+ years crafting
            high-quality content across sports, healthcare, education, and commercial
            brands. From broadcast-grade sports productions to quiet cinematic
            weddings — the same obsession with craft, different canvas.
          </motion.p>

          <motion.a
            href="#contact"
            onClick={scrollToContact}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.68 }}
            className="about-link-el mono group inline-flex items-center gap-2 border-b border-ink/18 pb-[7px] text-ink/40 transition-colors duration-300 hover:border-ink/45 hover:text-ink"
            style={{ letterSpacing: "0.17em", marginTop: 30, display: "inline-flex" }}
            data-cursor-hover
          >
            AVAILABLE FOR CREATIVE COLLABORATIONS ↗
            <ArrowUpRight
              size={11}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
