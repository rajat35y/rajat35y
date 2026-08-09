"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { label: "Work",        href: "#work" },
  { label: "Specialties", href: "#specialities" },
  { label: "About",       href: "#about" },
  { label: "Contact",     href: "#contact" },
];

const DARK_SECTIONS = ["work", "experience", "contact"];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const [active,   setActive]   = useState("");
  const [onDark,   setOnDark]   = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > lastY.current && y > 100);
      lastY.current = y;

      const ids = [...LINKS.map((l) => l.href.slice(1)), "experience"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - 120) {
          setActive(id);
          setOnDark(DARK_SECTIONS.includes(id));
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as Window & { lenis?: { scrollTo: (el: Element, opts: object) => void } }).lenis;
    lenis
      ? lenis.scrollTo(el, { offset: -70, duration: 1.3 })
      : el.scrollIntoView({ behavior: "smooth" });
  };

  const ink    = onDark ? "text-white/55 hover:text-white" : "text-ink/55 hover:text-ink";
  const inkAct = onDark ? "text-white"                     : "text-ink";
  const logo   = onDark ? "text-white"                     : "text-ink";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
      className={`nav-outer fixed inset-x-0 top-0 z-[1000] flex items-center transition-colors duration-300 ${
        scrolled
          ? onDark
            ? "bg-[rgba(9,9,9,.72)] backdrop-blur-[18px]"
            : "bg-[rgba(242,240,235,.78)] backdrop-blur-[18px]"
          : "bg-transparent"
      }`}
      style={{ height: 70 }}
    >
      <div
        className="nav-inner-grid mx-auto grid w-full items-center"
        style={{
          width: "min(1540px, calc(100% - clamp(36px,10vw,156px)))",
          gridTemplateColumns: "1fr auto 1fr",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`nav-logo-el flex items-center font-black tracking-[-0.08em] transition-colors duration-300 ${logo}`}
          style={{ fontSize: 18, gap: 0 }}
          data-cursor-hover
        >
          SY
          <span className="ml-[3px] mt-[2px] inline-block h-[7px] w-[7px] rounded-full bg-red" />
        </button>

        {/* Links — always visible, condensed on mobile */}
        <nav className="nav-links-wrap flex items-center gap-[34px]">
          {LINKS.map((link, i) => {
            const id = link.href.slice(1);
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`nav-link-el mono transition-opacity duration-[250ms] ${
                  i === 2 ? "nav-link-hide-430" : ""
                } ${active === id ? inkAct : ink}`}
                style={{ letterSpacing: "0.18em", fontSize: 10 }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Hire me */}
        <div className="flex justify-end">
          <button
            onClick={() => scrollTo("#contact")}
            className={`nav-hire-el rounded-full border px-[14px] py-[8px] transition-all duration-300 ${
              onDark
                ? "border-white/25 text-white/60 hover:border-white/55 hover:text-white"
                : "border-ink/22 text-ink/55 hover:border-ink/55 hover:text-ink"
            }`}
            style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.16em" }}
            data-cursor-hover
          >
            HIRE ME
          </button>
        </div>
      </div>
    </motion.header>
  );
}
