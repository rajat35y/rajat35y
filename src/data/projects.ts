export interface Project {
  id: number;
  title: string;
  category: string;
  categorySlug: string;
  year: string;
  client: string;
  description: string;
  thumbnail: string;
  video: string;
  tags: string[];
  featured: boolean;
  accentColor: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Nike — Hyperwind 2025",
    category: "Commercial",
    categorySlug: "commercial-impact",
    year: "2025",
    client: "Nike",
    description:
      "A high-impact brand film crafted to amplify the Hyperwind launch. Dynamic cuts, motion typography, and cinematic color grading.",
    thumbnail: "/images/projects/project-1.jpg",
    video: "/videos/sports.mp4",
    tags: ["Brand Film", "Motion Graphics", "Color Grading"],
    featured: true,
    accentColor: "#E50914",
  },
  {
    id: 2,
    title: "AI Dreams — Conceptual",
    category: "AI",
    categorySlug: "ai-imagined",
    year: "2024",
    client: "Personal Project",
    description:
      "An experimental AI-generated visual journey blending Midjourney stills with cinematic motion and a deeply atmospheric audio landscape.",
    thumbnail: "/images/projects/project-2.jpg",
    video: "/videos/ai.mp4",
    tags: ["AI Visuals", "Motion", "Experimental"],
    featured: true,
    accentColor: "#00E5FF",
  },
  {
    id: 3,
    title: "IPL — Warriors of the Field",
    category: "Sports Film",
    categorySlug: "sport-energy",
    year: "2024",
    client: "IPL Official",
    description:
      "High-energy promo reel capturing the raw power, passion, and iconic moments of IPL 2024. Fast cuts, kinetic typography.",
    thumbnail: "/images/projects/project-3.jpg",
    video: "/videos/sports.mp4",
    tags: ["Sports", "Promo", "Editing"],
    featured: true,
    accentColor: "#FFB800",
  },
  {
    id: 4,
    title: "Tata — Future of Mobility",
    category: "Commercial",
    categorySlug: "commercial-impact",
    year: "2024",
    client: "Tata Motors",
    description:
      "Corporate brand film showcasing Tata's vision for sustainable mobility. Cinematic wide shots combined with precise motion graphics.",
    thumbnail: "/images/projects/project-4.jpg",
    video: "/videos/commercial.mp4",
    tags: ["Corporate", "Brand Film", "Automotive"],
    featured: false,
    accentColor: "#0066CC",
  },
  {
    id: 5,
    title: "Reels That Convert",
    category: "Social & Ads",
    categorySlug: "ad-attention",
    year: "2024",
    client: "D2C Brand",
    description:
      "Scroll-stopping short-form creatives optimized for Meta and Instagram. Hook-led structure with bold supers and rapid-fire cuts.",
    thumbnail: "/images/projects/project-5.jpg",
    video: "/videos/social.mp4",
    tags: ["Social Media", "Ad Creative", "Short Form"],
    featured: false,
    accentColor: "#9B59B6",
  },
  {
    id: 6,
    title: "Ananya & Rohan — Forever",
    category: "Wedding",
    categorySlug: "wedding-forever",
    year: "2024",
    client: "Private Client",
    description:
      "A cinematic wedding film that transforms real emotions and fleeting moments into a story people can relive forever.",
    thumbnail: "/images/projects/project-6.jpg",
    video: "/videos/wedding.mp4",
    tags: ["Wedding", "Cinematic", "Story"],
    featured: false,
    accentColor: "#D4AF37",
  },
];
