import { useRef, useState } from "react";
import { Trophy, Code2, Flag, Award, Sparkles, LayoutGrid, GalleryHorizontalEnd } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import sihCert from "@/components/sections/sihcertificate.jpeg";
import sihClg from "@/components/sections/sihclg.jpeg";
import ctf from "@/components/sections/CTF.jpeg";
import hackamor from "@/components/sections/HACKMoR.jpeg";
import hackwithindia from "@/components/sections/HackWithIndia.jpeg";
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
                mode="grid"
                extraClass={item.highlight ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
              />
            ))}
          </div>
        ) : (
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[autoplay.current]}
            className="reveal pt-6"
          >
            <CarouselContent className="-ml-4">
              {items.map((item, i) => (
                <CarouselItem
                  key={item.title}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full py-2">
                    <AchievementCard item={item} index={i} mode="carousel" extraClass="h-full" />
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
  mode,
  extraClass = "",
}: {
  item: Item;
  index: number;
  mode: "grid" | "carousel";
  extraClass?: string;
}) {
  const [lightbox, setLightbox] = useState(false);
  const { icon: Icon, title, detail, year, description, tags, highlight, images } = item;
  const hasImages = images && images.length > 0;

  return (
    <>
      <div
        onClick={() => hasImages && mode === "carousel" && setLightbox(true)}
        className={`group reveal relative rounded-3xl transition-all duration-500 ease-out will-change-transform transform-gpu cursor-pointer
          hover:-translate-y-3 hover:z-20
          hover:shadow-[0_32px_80px_-12px_rgba(0,0,0,0.35)]
          ${mode === "grid" ? "overflow-hidden" : "overflow-hidden"}
          ${
            highlight
              ? "bg-gradient-to-br from-lavender via-petal to-azure border border-background/50 shadow-silk-lg"
              : "glass-panel"
          } ${extraClass}`}
        style={{ animationDelay: `${index * 0.06}s`, zIndex: highlight ? 10 : 1 }}
      >
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
          bg-[radial-gradient(circle_at_top_right,theme(colors.white/0.5),transparent_60%)]
          dark:bg-[radial-gradient(circle_at_top_right,theme(colors.white/0.08),transparent_60%)]" />

        {/* Slide-up image overlay — grid only */}
        {hasImages && mode === "grid" && (
          <div className="absolute inset-x-0 bottom-0 h-[70%] z-10
            translate-y-full group-hover:translate-y-0
            transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            <div className="absolute inset-x-0 top-0 h-8 z-10
              bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm" />
            <img
              src={images[0]}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2
              bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-1.5 z-20">
              {tags.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide
                  bg-white/20 text-white border border-white/30 backdrop-blur-md">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Card content */}
        <div className="relative z-[5] p-6 md:p-7">
          <div className="flex items-start justify-between mb-4">
            <div className={`size-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg] ${
              highlight ? "bg-background/70 shadow-silk" : "bg-gradient-to-br from-lavender to-petal"
            }`}>
              <Icon className="size-5 text-twilight" />
            </div>
            {year && (
              <span className={`text-[10px] uppercase tracking-widest font-bold tabular-nums ${
                highlight ? "text-twilight/70" : "text-muted-foreground"
              }`}>
                {year}
              </span>
            )}
          </div>

          {highlight && (
            <p className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-twilight/80 mb-2">
              <Sparkles className="size-3" />
              Featured Achievement
            </p>
          )}

          <h3 className={`font-display leading-tight ${
            highlight ? "text-2xl md:text-3xl text-twilight" : "text-xl text-foreground"
          }`}>
            {title}
          </h3>

          <p className={`mt-2 text-sm ${
            highlight ? "text-twilight/80 font-medium" : "text-muted-foreground"
          }`}>
            {detail}
          </p>

          {/* Carousel: show click hint if has images */}
          {hasImages && mode === "carousel" && (
            <p className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold">
              Click to view certificate
            </p>
          )}

          <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${
            hasImages && mode === "grid"
              ? "grid-rows-[0fr]"
              : "grid-rows-[0fr] group-hover:grid-rows-[1fr]"
          }`}>
            <div className="overflow-hidden">
              <p className={`mt-4 text-[13px] leading-relaxed opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500 delay-75 ${
                highlight ? "text-twilight/85" : "text-muted-foreground"
              }`}>
                {description}
              </p>
              {(!hasImages || mode === "carousel") && (
                <div className="mt-3 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                  {tags.map((t) => (
                    <span key={t} className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide ${
                      highlight
                        ? "bg-background/70 text-twilight border border-background/60"
                        : "bg-background/60 text-foreground/70 border border-border"
                    }`}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox — carousel mode only */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setLightbox(false)}
        >
          <img
            src={images![0]}
            alt={title}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
}