export interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  period: { start: string; end: string };
  description: string;
  highlights: string[];
  type: "full-time" | "freelance" | "contract";
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Katsam Media Pvt. Ltd.",
    role: "Sr. Multimedia Designer",
    duration: "Mar 2023 — Present",
    period: { start: "Mar 2023", end: "Present" },
    description:
      "Leading multimedia design and video production at a full-service media agency, delivering broadcast-grade content for major national sports leagues and commercial clients.",
    highlights: [
      "Official media production for Women's Kabaddi League 2023",
      "Broadcast visuals and motion packages for Uttar Pradesh Kabaddi League 2024",
      "Comprehensive multimedia delivery for Indian Premier Kabaddi League 2024",
    ],
    type: "full-time",
  },
  {
    id: 2,
    company: "Aayam Career Institute",
    role: "Sr. Graphic Designer & Video Editor",
    duration: "Nov 2021 — Feb 2023",
    period: { start: "Nov 2021", end: "Feb 2023" },
    description:
      "Oversaw all visual communication and video production for a leading career institute, building brand identity and creating educational and promotional content at scale.",
    highlights: [
      "Designed campaigns and print materials reaching thousands of students",
      "Produced explainer videos, course previews, and event films",
      "Built and maintained the institute's complete social media visual system",
    ],
    type: "full-time",
  },
  {
    id: 3,
    company: "Plumax eBusiness Solution",
    role: "Sr. Graphic Designer & Video Editor",
    duration: "Nov 2020 — Nov 2021",
    period: { start: "Nov 2020", end: "Nov 2021" },
    description:
      "Senior creative role spanning graphic design and video editing for an e-business agency — product content, digital marketing, and brand campaigns for multiple clients.",
    highlights: [
      "Product label design and print advertisement campaigns",
      "Social media visual content production for brand clients",
      "End-to-end video encoding, compression, and delivery workflows",
    ],
    type: "full-time",
  },
  {
    id: 4,
    company: "Soulager Healthcare Pvt. Ltd.",
    role: "Video Creator",
    duration: "Jul 2018 — Oct 2020",
    period: { start: "Jul 2018", end: "Oct 2020" },
    description:
      "Created corporate and patient-facing video content for a healthcare company, covering internal communications, product showcases, and brand films.",
    highlights: [
      "Corporate and training videos for internal and external audiences",
      "Colour correction, VFX, and green screen compositing for medical content",
      "Full production workflow management from shoot to final export",
    ],
    type: "full-time",
  },
  {
    id: 5,
    company: "Redfx Media Creation",
    role: "Video Creator",
    duration: "Feb 2017 — Jun 2018",
    period: { start: "Feb 2017", end: "Jun 2018" },
    description:
      "Began career in media production, building core skills in video editing, compositing, and motion design across a variety of commercial projects.",
    highlights: [
      "Commercial and promotional video editing",
      "Compositing & VFX using Adobe After Effects and Premiere Pro",
      "Motion title design, colour grading, and storyboarding",
    ],
    type: "full-time",
  },
  {
    id: 6,
    company: "Freelance",
    role: "Video Editor & Graphic Designer",
    duration: "2017 — Present",
    period: { start: "2017", end: "Present" },
    description:
      "Ongoing freelance practice running alongside full-time roles, delivering personal and commercial creative projects for individuals and businesses.",
    highlights: [
      "Wedding films, pre-wedding videos, and video albums",
      "Explainer videos and brand promotional content",
      "Graphic design for social media, events, and print",
    ],
    type: "freelance",
  },
];
