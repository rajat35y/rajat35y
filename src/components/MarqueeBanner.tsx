"use client";

const ITEMS = [
  "Cinematic Edits",
  "Brand Films",
  "Sports Broadcast",
  "AI Visuals",
  "Wedding Cinema",
  "Motion Graphics",
  "Color Grade",
  "Sound Design",
];

const ROW = [...ITEMS, ...ITEMS];

export default function MarqueeBanner() {
  return (
    <div
      className="overflow-hidden border-y border-border bg-bg"
      style={{ padding: "13px 0" }}
      aria-hidden
    >
      <div className="marquee-track inline-flex items-center whitespace-nowrap" style={{ gap: 55 }}>
        {ROW.map((item, i) => (
          <span
            key={i}
            className="mono flex items-center text-ink/45"
            style={{ gap: 55 }}
          >
            {item}
            <b className="text-red/70">•</b>
          </span>
        ))}
      </div>
    </div>
  );
}
