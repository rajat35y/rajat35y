"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { social } from "@/data/social";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROJECT_TYPES = ["Cinematic Edit", "Brand Film", "Sports", "Wedding"];

const SOCIAL_LINKS = [
  { label: "INSTAGRAM", href: social.instagram },
  { label: "LINKEDIN",  href: social.linkedin },
  { label: "BEHANCE",   href: social.behance },
  { label: "WHATSAPP",  href: social.whatsapp },
];

/* ── Shared input style ── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#111111",
  border: "1px solid #1c1c1c",
  borderRadius: 10,
  padding: "14px 16px",
  color: "#ffffff",
  fontSize: 13,
  outline: "none",
  fontFamily: "var(--font-dm-sans)",
  transition: "border-color 0.25s ease",
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-12%" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "Cinematic Edit",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4500);
    setForm({ name: "", email: "", projectType: "Cinematic Edit", message: "" });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ background: "#000000", color: "#f2f0eb", padding: "100px 0 40px", fontFamily: "var(--font-dm-sans)" }}
    >
      <div className="port-container">

        {/* ── Big editorial title ── */}
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE }}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(64px,11vw,150px)",
            lineHeight: 0.82,
            letterSpacing: "-0.06em",
            fontWeight: 800,
            margin: "0 0 60px 0",
            color: "#ffffff",
          }}
        >
          {"Let's make"}
          <br />
          <em
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#888888",
              letterSpacing: "-0.03em",
            }}
          >
            something
          </em>
          <br />
          worth watching.
        </motion.h2>

        {/* ── 2-column grid ── */}
        <div className="contact-layout-grid">

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <p
              style={{
                color: "#777777",
                fontSize: 15,
                lineHeight: 1.6,
                maxWidth: 380,
                marginBottom: 40,
              }}
            >
              Have a film, campaign, or story that needs a stronger visual voice?
              Drop a message or reach out directly across socials.
            </p>

            {/* Info cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 30 }}>
              {/* Email card */}
              <div className="contact-info-card">
                <span
                  className="mono"
                  style={{ fontSize: 8, color: "#555555", letterSpacing: "0.15em" }}
                >
                  DIRECT EMAIL
                </span>
                <a
                  href={`mailto:${social.email}`}
                  style={{ fontSize: 14, color: "#ffffff", fontWeight: 500, textDecoration: "none" }}
                  className="contact-info-link"
                >
                  {social.email} ↗
                </a>
              </div>

              {/* Location card */}
              <div className="contact-info-card">
                <span
                  className="mono"
                  style={{ fontSize: 8, color: "#555555", letterSpacing: "0.15em" }}
                >
                  LOCATION &amp; TIMEZONE
                </span>
                <div style={{ fontSize: 14, color: "#ffffff", fontWeight: 500 }}>
                  India (IST / UTC+5:30)
                </div>
              </div>
            </div>

            {/* Social pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-pill mono"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT — form card ── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
            className="contact-form-card"
          >
            {/* Name + Email */}
            <div className="contact-form-2col">
              <div className="contact-form-group">
                <label
                  className="mono"
                  style={{ fontSize: 8, color: "#666666", letterSpacing: "0.15em" }}
                >
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#333333"; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = "#1c1c1c"; }}
                />
              </div>

              <div className="contact-form-group">
                <label
                  className="mono"
                  style={{ fontSize: 8, color: "#666666", letterSpacing: "0.15em" }}
                >
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#333333"; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = "#1c1c1c"; }}
                />
              </div>
            </div>

            {/* Project type — radio pill selector */}
            <div className="contact-form-group">
              <label
                className="mono"
                style={{ fontSize: 8, color: "#666666", letterSpacing: "0.15em" }}
              >
                PROJECT TYPE
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {PROJECT_TYPES.map((type) => {
                  const active = form.projectType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setForm({ ...form, projectType: type })}
                      style={{
                        display: "inline-block",
                        padding: "8px 16px",
                        border: `1px solid ${active ? "#ed2d27" : "#222222"}`,
                        borderRadius: 99,
                        fontSize: 12,
                        color: active ? "#ffffff" : "#777777",
                        background: active ? "#ed2d27" : "transparent",
                        fontWeight: active ? 600 : 400,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontFamily: "var(--font-dm-sans)",
                        lineHeight: 1,
                      }}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div className="contact-form-group">
              <label
                className="mono"
                style={{ fontSize: 8, color: "#666666", letterSpacing: "0.15em" }}
              >
                PROJECT BRIEF / MESSAGE *
              </label>
              <textarea
                rows={4}
                placeholder="Tell me about your timeline, scope, and vision..."
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#333333"; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = "#1c1c1c"; }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mono contact-submit-btn"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                background: sent ? "rgba(255,255,255,.08)" : "#f2f0eb",
                color: sent ? "#888888" : "#000000",
                border: "none",
                borderRadius: 99,
                padding: "16px 24px",
                fontSize: 9,
                letterSpacing: "0.15em",
                fontWeight: 700,
                cursor: "pointer",
                transition: "opacity 0.2s ease",
              }}
            >
              <span>{sent ? "MESSAGE SENT — I'LL BE IN TOUCH" : "SEND INQUIRY"}</span>
              {!sent && (
                <span style={{ fontStyle: "normal", fontSize: 18, lineHeight: 1 }}>→</span>
              )}
            </button>
          </motion.form>
        </div>

        {/* ── Footer ── */}
        <div
          className="mono contact-footer-bar"
          style={{
            marginTop: 100,
            paddingTop: 20,
            borderTop: "1px solid #141414",
            display: "flex",
            justifyContent: "space-between",
            color: "#444444",
            fontSize: 8,
            letterSpacing: "0.15em",
          }}
        >
          <span>© 2026 SHUBH YADAV</span>
          <span>BUILT FRAME BY FRAME</span>
        </div>
      </div>
    </section>
  );
}
