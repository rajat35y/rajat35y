export interface CategoryProject {
  id: number;
  title: string;
  client: string;
  year: string;
  video: string;
  thumbnail: string;
  accentColor: string;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  projects: CategoryProject[];
}

const makePlaceholderProjects = (
  count: number,
  baseColor: string,
  videoFile: string
): CategoryProject[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Project ${String(i + 1).padStart(2, "0")}`,
    client: "Client Name",
    year: "2024",
    video: `/videos/${videoFile}`,
    thumbnail: `/images/placeholder-thumb-${((i % 4) + 1)}.jpg`,
    accentColor: baseColor,
  }));

export const categories: Category[] = [
  {
    id: "01",
    slug: "ai-imagined",
    title: "AI Film",
    tagline: "Generative & experimental visuals",
    description:
      "Where artificial intelligence meets human imagination — impossible visuals, surreal worlds, and ideas that exist nowhere else.",
    projects: makePlaceholderProjects(6, "#00E5FF", "ai.mp4"),
  },
  {
    id: "02",
    slug: "motion-unleashed",
    title: "Motion Graphics",
    tagline: "Kinetic type & brand motion",
    description:
      "Pure kinetic energy translated into frame-perfect motion graphics — typography that moves, brands that breathe.",
    projects: makePlaceholderProjects(6, "#E50914", "social.mp4"),
  },
  {
    id: "03",
    slug: "sport-energy",
    title: "Sports Film",
    tagline: "Broadcast & league storytelling",
    description:
      "Broadcast-grade sports films for national leagues — raw adrenaline, defining moments, and stories that outlast the final whistle.",
    projects: makePlaceholderProjects(6, "#FFB800", "sports.mp4"),
  },
  {
    id: "04",
    slug: "commercial-impact",
    title: "Commercial Film",
    tagline: "Brand stories built to perform",
    description:
      "Brand films engineered for impact — cinematic production, precise storytelling, and visuals that make products unforgettable.",
    projects: makePlaceholderProjects(8, "#E50914", "commercial.mp4"),
  },
  {
    id: "05",
    slug: "edit-culture",
    title: "Video Editing",
    tagline: "Post-production & narrative craft",
    description:
      "Every cut is a decision. Every transition is intention. Editing that turns raw footage into a story worth finishing.",
    projects: makePlaceholderProjects(6, "#06B6D4", "nature.mp4"),
  },
  {
    id: "06",
    slug: "ad-attention",
    title: "Social & Ads",
    tagline: "Short-form performance creative",
    description:
      "Scroll-stopping creatives built for performance — hook-led structure, bold visuals, and messages that land in three seconds flat.",
    projects: makePlaceholderProjects(8, "#9B59B6", "social.mp4"),
  },
  {
    id: "07",
    slug: "visual-craft",
    title: "Visual Design",
    tagline: "Identity & graphic systems",
    description:
      "From graphic design to visual identity — building the visual language that makes brands instantly recognisable across every medium.",
    projects: makePlaceholderProjects(6, "#10B981", "nature.mp4"),
  },
  {
    id: "08",
    slug: "animation-alive",
    title: "Animation",
    tagline: "Character & frame-by-frame work",
    description:
      "Characters, worlds, and ideas brought to life through frame-by-frame animation — expression without limits, creativity without boundaries.",
    projects: makePlaceholderProjects(6, "#F97316", "ai.mp4"),
  },
  {
    id: "09",
    slug: "wedding-forever",
    title: "Wedding Film",
    tagline: "Cinematic celebration stories",
    description:
      "Cinematic wedding films that turn the most important day into a film people will watch again and again, forever.",
    projects: makePlaceholderProjects(6, "#D97706", "wedding.mp4"),
  },
];
