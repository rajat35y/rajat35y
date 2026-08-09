import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shubh Yadav — Senior Multimedia Designer & Video Editor",
  description:
    "Senior Multimedia Designer, Video Editor, and Motion Graphics Artist with 8+ years crafting cinematic, premium visual experiences for world-class brands.",
  keywords: [
    "Video Editor",
    "Motion Graphics",
    "Multimedia Designer",
    "Brand Film",
    "Shubh Yadav",
    "Motion Designer India",
  ],
  openGraph: {
    title: "Shubh Yadav — Senior Multimedia Designer",
    description: "Cinematic. Premium. Unforgettable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="bg-bg text-ink min-h-full overflow-x-hidden">
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
