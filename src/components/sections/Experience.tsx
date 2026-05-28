"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, Crown } from "lucide-react";

const items = [
  {
    icon: Briefcase,
    role: "Content & Social Media Intern",
    org: "Brew & Bytes",
    period: "Internship · Sep 2025 – Present",
    points: [
      "Developed and executed content strategies across social platforms.",
      "Simplified complex tech topics into engaging posts.",
      "Improved audience reach and engagement.",
    ],
    tags: ["Content Strategy", "Design", "Social Media"],
    // ─── ADD YOUR PHOTO ───────────────────────────────────────────────────
    // Option A — local file: place image in /public/images/ and write:
    //   photo: "/images/brew-bytes.jpg",
    // Option B — external URL:
    //   photo: "https://your-image-url.com/photo.jpg",
    // Option C — leave undefined for the lavender gradient placeholder
    photo: undefined as string | undefined,
    photoAlt: "Brew & Bytes internship",
    gradientFrom: "#e8deff",
    gradientVia: "#f5d0f0",
    gradientTo: "#fce4f5",
  },
  {
    icon: Crown,
    role: "EDC Intern",
    org: "Entrepreneurship Development Cell (EDC)",
    period: "Internship · Sep 2024 – Dec 2024",
    points: [
      "Led initiatives connecting students with startup founders & ideas.",
      "Organized entrepreneurial events, workshops and pitch sessions.",
      "Strengthened leadership, communication and team coordination skills.",
    ],
    tags: ["Leadership", "Event Management", "Communication"],
    // ─── ADD YOUR PHOTO ───────────────────────────────────────────────────
    photo: undefined as string | undefined,
    photoAlt: "EDC internship",
    gradientFrom: "#dde8ff",
    gradientVia: "#e8d0f8",
    gradientTo: "#f0e4ff",
  },
];

export function Experience() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [displayed, setDisplayed] = useState(0);
  const [cardVisible, setCardVisible] = useState(true);
  const busyRef = useRef(false);

  // Scroll → transition logic
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const THRESHOLD = 260;

    const onScroll = () => {
      const target = el.scrollTop > THRESHOLD ? 1 : 0;
      if (busyRef.current || target === current) return;

      busyRef.current = true;
      setAnimating(true);
      setCardVisible(false);

      setTimeout(() => {
        setDisplayed(target);
        setCurrent(target);
        setTimeout(() => {
          setCardVisible(true);
          setAnimating(false);
          busyRef.current = false;
        }, 80);
      }, 320);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [current]);

  const jumpTo = (idx: number) => {
    scrollerRef.current?.scrollTo({ top: idx === 0 ? 0 : 580, behavior: "smooth" });
  };

  const item = items[displayed];
  const Icon = item.icon;

  return (
    <section id="experience" className="relative py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <div className="mb-8 reveal">
          <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-muted-foreground mb-3">
            04 — Experience
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            Where I've{" "}
            <span className="italic text-foreground/50">built and contributed.</span>
          </h2>
        </div>

        {/* ── Scroll scene ── */}
        <div className="reveal rounded-3xl overflow-hidden border border-lavender/20"
          style={{ height: 480 }}>

          {/* Outer: scroll container */}
          <div
            ref={scrollerRef}
            className="relative overflow-y-scroll"
            style={{ height: 480, scrollbarWidth: "thin", scrollbarColor: "#c9b8e8 transparent" }}
          >
            {/* Sticky panel — locks to top while spacer scrolls */}
            <div className="sticky top-0 z-10" style={{ height: 480 }}>

              {/* ── Background ── */}
              <div
                className="absolute inset-0 transition-all duration-700"
                style={{
                  background: `linear-gradient(135deg, ${item.gradientFrom} 0%, ${item.gradientVia} 50%, ${item.gradientTo} 100%)`,
                }}
              >
                {/* Photo (if provided) fills the right 55% of the background */}
                {item.photo && (
                  <div
                    className="absolute inset-y-0 right-0 w-[55%] transition-all duration-700"
                    style={{
                      backgroundImage: `url(${item.photo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center top",
                      opacity: animating ? 0.3 : 1,
                      filter: animating ? "blur(4px) brightness(0.85)" : "brightness(0.92)",
                    }}
                  />
                )}
              </div>

              {/* ── Photo placeholder (shown when no photo set) ── */}
              {!item.photo && (
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-lavender/40 bg-white/30 backdrop-blur-sm"
                  style={{ width: 160, height: 200 }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(164,140,196,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <p className="text-[9px] text-center leading-relaxed" style={{ color: "rgba(140,110,180,0.65)" }}>
                    Add your photo<br />
                    <span className="opacity-70">{item.photoAlt}</span>
                  </p>
                </div>
              )}

              {/* ── Dot navigation ── */}
              <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => jumpTo(i)}
                    aria-label={`Go to experience ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: 6,
                      height: i === current ? 22 : 6,
                      borderRadius: i === current ? 3 : 999,
                      background: i === current ? "#a48cc4" : "rgba(164,140,196,0.35)",
                    }}
                  />
                ))}
              </div>

              {/* ── Step counter ── */}
              <div className="absolute top-5 right-7 text-[11px] tracking-widest z-20"
                style={{ color: "#a48cc4" }}>
                {String(current + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </div>

              {/* ── Experience card ── */}
              <div className="absolute bottom-8 left-7 z-20" style={{ maxWidth: 340 }}>
                <div
                  className="rounded-3xl p-6 backdrop-blur-md"
                  style={{
                    background: "rgba(255,255,255,0.72)",
                    border: "0.5px solid rgba(164,140,196,0.3)",
                    opacity: cardVisible ? 1 : 0,
                    transform: cardVisible ? "translateY(0)" : "translateY(36px)",
                    transition: cardVisible
                      ? "opacity 0.45s ease, transform 0.6s cubic-bezier(.22,.68,0,1.2)"
                      : "none",
                  }}
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="size-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: displayed === 0
                          ? "linear-gradient(135deg, #c9b8e8, #f0b8d8)"
                          : "linear-gradient(135deg, #b8cce8, #c9b8e8)",
                      }}
                    >
                      <Icon className="size-4" style={{ color: "#3c2c6a" }} />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest font-semibold mb-0.5"
                        style={{ color: "#a48cc4" }}>
                        {item.period}
                      </p>
                      <h3 className="text-[15px] font-medium leading-tight" style={{ color: "#1a1525" }}>
                        {item.role}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[12px] font-medium mb-3" style={{ color: "#7a6a9a" }}>
                    {item.org}
                  </p>

                  <ul className="flex flex-col gap-1.5 mb-3">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex gap-2 text-[11px] leading-relaxed"
                        style={{ color: "#4a3a6a" }}>
                        <span style={{ color: "#c9b8e8", flexShrink: 0, marginTop: 2 }}>·</span>
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[9px] font-medium"
                        style={{
                          border: "0.5px solid rgba(164,140,196,0.35)",
                          background: "rgba(255,255,255,0.5)",
                          color: "#7a6a9a",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Scroll hint ── */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] tracking-wider z-20 pointer-events-none transition-opacity duration-500"
                style={{ color: "rgba(120,100,160,0.55)", opacity: current === 0 ? 1 : 0 }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-bounce">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
                scroll for next experience
              </div>
            </div>

            {/* Scroll spacer — creates the scroll distance */}
            <div style={{ height: 1100 }} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}