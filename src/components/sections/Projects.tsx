import { ArrowUpRight, Star, Github } from "lucide-react";
import bubutalkImg from "@/components/sections/BubuTalk.png";
import rakshaImg from "@/components/sections/RakshaNetra.png";
import fitcheckImg from "@/components/sections/Fitcheck.png";
import chatbotImg from "@/components/sections/MRUChatbot.png";
import carparkingImg from "@/components/sections/carparkingtollgatewaysystem.jpeg";

type Project = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  badge?: string;
  featured?: boolean;
  gradient: string;
  initial: string;
  image?: string;
  live?: string;
  github?: string;
};

const projects: Project[] = [
  {
    name: "BubuTalk",
    tagline: "AI Language Learning Platform",
    description:
      "AI-powered language learning platform enabling real-time voice and text conversations for immersive practice. Built interactive chat flows using speech APIs to simulate natural conversations and improve user engagement.",
    stack: ["HTML","CSS", "JavaScript", "React.js", "Node.js", "Web Speech API"],
    badge: "Featured",
    featured: true,
    gradient: "from-lavender via-petal to-azure",
    initial: "B",
    image: bubutalkImg,
    live: "https://bubutalk.c37.airoapp.ai/"
  },
  {
    name: "RakshaNetra",
    tagline: "AI Defense Safety Portal",
    description:
      "AI-enabled defense safety monitoring portal developed as a Smart India Hackathon 2025 finalist project (Top 5 nationwide). Designed to detect and report incidents in real-time, improving situational awareness and response efficiency.",
    stack: ["AI/ML", "Python", "Blockchain", "React"],
    badge: "SIH Top 5",
    featured: true,
    gradient: "from-azure via-lavender to-mint",
    initial: "R",
    image: rakshaImg,
    live: "https://canva.link/d75uv6n82240ydq"
  },
  {
    name: "FitCheck",
    tagline: "E-commerce Clothing Site",
    description:
      "Responsive e-commerce web application for clothing with a clean UI and seamless browsing experience. Implemented product listing, filtering, and user-friendly design to enhance usability.",
    stack: ["HTML", "CSS", "JS", "Responsive UI design"],
    gradient: "from-petal to-lavender",
    initial: "F",
    image: fitcheckImg,
    live: "https://fitcheck.vercel.app/",
    github: "https://github.com/KirtiSinghal08/Fitcheck"
  },
  {
    name: "College Enquiry Chatbot",
    tagline: "AI Admission Assistant",
    description:
      "AI-powered chatbot designed to automate college admission queries, providing instant and accurate responses. Built using NLP concepts to reduce manual workload and improve user interaction efficiency.",
    stack: ["Python", "NLP", "JavaScript", "Speech synthesis API"],
    gradient: "from-mint to-azure",
    initial: "C",
    image: chatbotImg,
    live: "https://mru-chatbot.vercel.app/",
    github: "https://github.com/KirtiSinghal08/MRU-Chatbot"
  },
  {
    name: "Car Parking Toll System",
    tagline: "Hardware Automation",
    description:
      "Arduino-based smart parking and toll automation system that detects vehicles and manages entry/exit processes. Designed to reduce manual intervention and improve operational efficiency.",
    stack: ["Arduino", "Sensors"],
    gradient: "from-azure to-petal",
    initial: "P",
    image: carparkingImg,
    live: "https://canva.link/2rq3ddkzsl7g3d9"
  },
];

function Card({ p, large }: { p: Project; large?: boolean }) {
  return (
    <a
  href={p.live || p.github || "#"}
  target="_blank"
  rel="noopener noreferrer"
  className={`group reveal relative glass-panel rounded-3xl overflow-hidden hover:-translate-y-1.5 transition-all duration-500 block ${
    large ? "lg:col-span-2" : ""
  }`}
>
      <div
        className={`relative ${large ? "aspect-[16/8]" : "aspect-[16/10]"} bg-gradient-to-br ${p.gradient} overflow-hidden`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
           {/* Initial Letter (default) */}
          <span className="font-display italic text-[10rem] md:text-[14rem] text-twilight/15 leading-none select-none group-hover:scale-110 transition-transform duration-700">
            {p.initial}
          </span>
          {/* Image on Hover */}
  {p.image && (
    <img
      src={p.image}
      alt={p.name}
      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500"
    />
  )}
        </div>
        {p.badge && (
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-[10px] uppercase tracking-widest font-bold text-foreground">
            <Star className="size-3 fill-current" />
            {p.badge}
          </div>
        )}
        <div className="absolute top-4 right-4 size-10 rounded-full bg-twilight text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="size-4" />
        </div>
      </div>

      <div className="p-6 md:p-7 space-y-3">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-1">
            {p.tagline}
          </p>
          <h3 className="font-display text-2xl md:text-3xl text-foreground">{p.name}</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-full border border-border bg-background/40 text-[10px] font-medium text-foreground/70"
            >
              {s}
            </span>
          ))}
        </div>

        {/* LIVE + CODE BUTTONS */}
<div className="flex gap-3 pt-3">
  {p.live && (
    <span
      onClick={(e) => { e.preventDefault(); window.open(p.live!, "_blank"); }}
      className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 hover:bg-green-500/20 transition cursor-pointer"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      LIVE
    </span>
  )}

  {p.github && (
    <span
      onClick={(e) => { e.preventDefault(); window.open(p.github!, "_blank"); }}
      className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-500/10 text-gray-700 hover:bg-gray-500/20 transition cursor-pointer"
    >
      <Github className="size-3" />
      CODE
    </span>
          )}
        </div>

      </div>
    </a>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 reveal">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-muted-foreground mb-3">
              03 — Projects
            </p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              Things I've <span className="italic text-foreground/50">actually shipped.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            A mix of AI, web and hardware — each one taught me something I couldn't learn from a textbook.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {featured.map((p) => (
            <Card key={p.name} p={p} />
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {rest.map((p) => (
            <Card key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
