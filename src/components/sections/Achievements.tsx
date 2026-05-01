import { useRef, useState } from "react";
import { Trophy, Code2, Flag, Award, Sparkles, LayoutGrid, GalleryHorizontalEnd } from "lucide-react";
const sihCert = "/certs/sihcertificate.jpeg";
const sihClg = "/certs/sihclg.jpeg";
const ctf = "/certs/CTF.jpeg";
const hackamor = "/certs/HACKMoR.jpeg";
const hackwithindia = "/certs/HackWithIndia.jpeg";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Item = {
  icon: typeof Trophy;
  title: string;
  detail: string;
  year?: string;
  description: string;
  tags: string[];
  highlight?: boolean;
  images?: string[];
};

const items: Item[] = [
  {
    icon: Trophy,
    title: "Smart India Hackathon 2025",
    detail: "Top 5 Finalist — nationwide",
    description:
      "Built RakshaNetra, an AI-based defense safety portal, competing against thousands of teams across India and securing a Top 5 finalist spot.",
    tags: ["AI/ML", "Real-Time Systems", "React + Python"],
    highlight: true,
    images: [sihCert, sihClg],
  },
  {
    icon: Code2,
    title: "GoDaddy Hackathon",
    detail: "Participant",
    description:
      "Collaborated on a rapid-build product challenge — focused on clean UX and shipping a working MVP within the time limit.",
    tags: ["React.js", "Frontend Dev", "MVP Build"],
  },
  {
    icon: Code2,
    title: "HackMor",
    detail: "Participant",
    description:
      "Participated in an intense student hackathon — sharpened teamwork, rapid prototyping, and problem-framing under pressure.",
    tags: ["JavaScript", "Debugging", "Rapid Prototyping"],
    images: [hackamor],
  },
  {
    icon: Code2,
    title: "HackWithIndia, IGDTUW",
    detail: "Participant",
    description:
      "Took part in a pan-India hackathon exploring real-world problem statements with a strong focus on impact and feasibility.",
    tags: ["Full Stack", "APIs", "Product Thinking"],
    images: [hackwithindia],
  },
  {
    icon: Flag,
    title: "CTF Challenges",
    detail: "Cybersecurity",
    description:
      "Solved Capture-The-Flag challenges covering web exploitation, cryptography and reverse-engineering — built a security-first mindset.",
    tags: ["Web Exploitation", "Cryptography", "Reverse Engineering"],
    images: [ctf],
  },
  {
    icon: Award,
    title: "Techfest Participation",
    detail: "Multiple events",
    description:
      "Actively represented my college across multiple techfests — coding contests, design sprints and technical quizzes.",
    tags: ["DSA", "UI/UX", "Problem Solving"],
  },
];

export function Achievements() {
  const [view, setView] = useState<"grid" | "carousel">("carousel");
  const autoplay = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <section id="achievements" className="relative py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 reveal flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-muted-foreground mb-3">
              05 — Achievements & Milestones
            </p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              Wins that <span className="italic text-foreground/50">pushed me forward.</span>
            </h2>
          </div>

          <div className="inline-flex items-center gap-1 p-1 rounded-full glass-panel">
            <button
              onClick={() => setView("grid")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-semibold transition-all ${
                view === "grid"
                  ? "bg-twilight text-primary-foreground shadow-silk"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={view === "grid"}
            >
              <LayoutGrid className="size-3.5" />
              Grid
            </button>
            <button
              onClick={() => setView("carousel")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-semibold transition-all ${
                view === "carousel"
                  ? "bg-twilight text-primary-foreground shadow-silk"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={view === "carousel"}
            >
              <GalleryHorizontalEnd className="size-3.5" />
              Carousel
            </button>
          </div>
        </div>

        {view === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 sm:gap-y-6 pt-6">
            {items.map((item, i) => (
  <AchievementCard
    key={item.title}
    item={item}
    index={i}
    extraClass={item.highlight ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
  />
))}
          </div>
        ) : (
          <Carousel
  opts={{ align: "start", loop: true }}
  plugins={[autoplay.current]}
  className="reveal pt-6 overflow-visible"   {/* ← add overflow-visible */}
>
  <CarouselContent className="-ml-4 overflow-visible">  {/* ← add overflow-visible */}
    {items.map((item, i) => (
      <CarouselItem
        key={item.title}
        className="pl-4 md:basis-1/2 lg:basis-1/3 overflow-visible"  {/* ← add overflow-visible */}
      >
        <div className="h-full py-2 overflow-visible">   {/* ← add overflow-visible */}
          <AchievementCard item={item} index={i} extraClass="h-full" />
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
            <div className="flex items-center justify-end gap-2 mt-6">
              <CarouselPrevious className="static translate-y-0 size-10 glass-panel" />
              <CarouselNext className="static translate-y-0 size-10 glass-panel" />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
}

function AchievementCard({
  item,
  index,
  extraClass = "",
}: {
  item: Item;
  index: number;
  extraClass?: string;
}) {
  const { icon: Icon, title, detail, year, description, tags, highlight, images } = item;

  return (
    <div
      className={`group reveal relative overflow-visible rounded-3xl p-6 md:p-7 transition-all duration-500 ease-out will-change-transform transform-gpu cursor-default
        hover:scale-[1.04] hover:-translate-y-3 hover:z-20
        hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.25)]
        ${
          highlight
            ? "bg-gradient-to-br from-lavender via-petal to-azure border border-background/50 shadow-silk-lg"
            : "glass-panel"
        } ${extraClass}`}
      style={{ animationDelay: `${index * 0.06}s`, zIndex: highlight ? 10 : 1 }}
    >
      {/* Glow effect */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,theme(colors.white/0.5),transparent_60%)] dark:bg-[radial-gradient(circle_at_top_right,theme(colors.white/0.08),transparent_60%)]" />

      {/* Floating certificate stack */}
      {images && images.length > 0 && (
        <div className="absolute top-0 right-0 translate-x-10 -translate-y-10 flex flex-col gap-3
          opacity-0 group-hover:opacity-100 group-hover:-translate-y-8
          transition-all duration-500 z-20 pointer-events-none">
          {images.slice(0, 3).map((img, i) => (
            <img
              key={i}
              src={img}
              alt="certificate"
              className={`w-48 h-32 object-cover bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-white/30
                transition-all duration-500 group-hover:scale-105
                ${i === 0 ? "rotate-[-6deg]" : ""}
                ${i === 1 ? "rotate-[2deg] ml-6" : ""}
                ${i === 2 ? "rotate-[6deg] ml-12" : ""}
              `}
            />
          ))}
        </div>
      )}

      <div className="relative">
        {/* Icon */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`size-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg] ${
              highlight ? "bg-background/70 shadow-silk" : "bg-gradient-to-br from-lavender to-petal"
            }`}
          >
            <Icon className="size-5 text-twilight" />
          </div>
          {year && (
            <span
              className={`text-[10px] uppercase tracking-widest font-bold tabular-nums ${
                highlight ? "text-twilight/70" : "text-muted-foreground"
              }`}
            >
              {year}
            </span>
          )}
        </div>

        {/* Featured badge */}
        {highlight && (
          <p className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-twilight/80 mb-2">
            <Sparkles className="size-3" />
            Featured Achievement
          </p>
        )}

        {/* Title */}
        <h3
          className={`font-display leading-tight ${
            highlight ? "text-2xl md:text-3xl text-twilight" : "text-xl text-foreground"
          }`}
        >
          {title}
        </h3>

        {/* Detail */}
        <p
          className={`mt-2 text-sm ${
            highlight ? "text-twilight/80 font-medium" : "text-muted-foreground"
          }`}
        >
          {detail}
        </p>

        {/* Description + Tags reveal */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
          <div className="overflow-hidden">
            <p
              className={`mt-4 text-[13px] leading-relaxed opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500 delay-75 ${
                highlight ? "text-twilight/85" : "text-muted-foreground"
              }`}
            >
              {description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
              {tags.map((t) => (
                <span
                  key={t}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide ${
                    highlight
                      ? "bg-background/70 text-twilight border border-background/60"
                      : "bg-background/60 text-foreground/70 border border-border"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
