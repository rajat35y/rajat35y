import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import CreativeWork from "@/components/CreativeWork";
import WorkSpecialties from "@/components/WorkSpecialties";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <MarqueeBanner />
      <CreativeWork />
      <WorkSpecialties />
      <About />
      <Experience />
      <Contact />
    </main>
  );
}
