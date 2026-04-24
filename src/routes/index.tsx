import { createFileRoute } from "@tanstack/react-router";
import { AtmosphericBackground } from "../components/AtmosphericBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Skills } from "../components/sections/Skills";
import { Projects } from "../components/sections/Projects";
import { Experience } from "../components/sections/Experience";
import { Achievements } from "../components/sections/Achievements";
import { Leadership } from "../components/sections/Leadership";
import { Contact } from "../components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kirti Singhal — Developer · SIH Finalist · AI Enthusiast" },
      {
        name: "description",
        content:
          "Portfolio of Kirti Singhal — 2nd-year B.Tech CSE student building AI, web and innovation projects. SIH 2025 Top 5 finalist.",
      },
      { property: "og:title", content: "Kirti Singhal — Developer · SIH Finalist · AI Enthusiast" },
      {
        property: "og:description",
        content:
          "Building ideas into real-world tech — AI, web development and innovation. Open to internships and collaborations.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AtmosphericBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
