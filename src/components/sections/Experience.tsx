"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────
//  ADD YOUR DATA HERE
//  For each job, set `photo` to your image path/URL.
//  While you don't have photos, it uses the gradient colour.
// ─────────────────────────────────────────────────────────────
const experiences = [
  {
    period: "Internship · Sep 2025 – Present",
    role: "Content & Social Media Intern",
    org: "Brew & Bytes",
    points: [
      "Developed and executed content strategies across social platforms.",
      "Simplified complex tech topics into engaging, shareable posts.",
      "Improved audience reach and engagement metrics consistently.",
    ],
    tags: ["Content Strategy", "Design", "Social Media"],
    // ✏️  Replace with your actual photo:
    //   photo: "/images/brew-bytes.jpg"   ← file in /public/images/
    //   photo: "https://..."              ← any URL
    photo: "",
    photoAlt: "Brew & Bytes internship",
    // fallback gradient shown when photo is empty
    bgColor: "#2a1f3d",
  },
  {
    period: "Internship · Sep 2024 – Dec 2024",
    role: "EDC Intern",
    org: "Entrepreneurship Development Cell, MRIU",
    points: [
      "Led initiatives connecting students with startup founders & ideas.",
      "Organised entrepreneurial events, workshops and pitch sessions.",
      "Strengthened leadership, communication and team coordination.",
    ],
    tags: ["Leadership", "Event Management", "Communication"],
    // ✏️  Replace with your actual photo:
    photo: "",
    photoAlt: "EDC internship",
    bgColor: "#1f2a3d",
  },
];

export function Experience() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [cardIn, setCardIn] = useState(true);
  const busyRef = useRef(false);
  const tickRef = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const THRESH = 280;

    const onScroll = () => {
      if (tickRef.current) return;
      tickRef.current = true;
      requestAnimationFrame(() => {
        const target = el.scrollTop > THRESH ? 1 : 0;
        if (!busyRef.current && target !== current) {
          busyRef.current = true;
          setCardIn(false);
          setTimeout(() => {
            setDisplayed(target);
            setCurrent(target);
            requestAnimationFrame(() => requestAnimationFrame(() => {
              setCardIn(true);
              setTimeout(() => { busyRef.current = false; }, 700);
            }));
          }, 320);
        }
        tickRef.current = false;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [current]);

  const jumpTo = (idx: number) =>
    scrollRef.current?.scrollTo({ top: idx === 0 ? 0 : 600, behavior: "smooth" });

  const ex = experiences[displayed];
  const prev = experiences[current === 1 ? 0 : 1];

  return (
    <section id="experience" className="relative py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Section heading ───────────────────────────── */}
        <div className="mb-10 reveal">
          <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-muted-foreground mb-3">
            04 — Experience
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            Where I&apos;ve{" "}
            <span className="italic text-foreground/40">built and contributed.</span>
          </h2>
        </div>

        {/* ── Scroll stage ──────────────────────────────── */}
        <div className="reveal rounded-3xl overflow-hidden" style={{ height: "90vh", maxHeight: 640 }}>
          <div
            ref={scrollRef}
            className="relative overflow-y-scroll"
            style={{ height: "100%", scrollbarWidth: "none" }}
          >
            {/* Sticky full-screen frame */}
            <div className="sticky top-0 overflow-hidden" style={{ height: "90vh", maxHeight: 640 }}>

              {/* ── Photo layers (stacked, crossfade) ───── */}

              {/* Layer A — current (or previous blurred out) */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: prev.photo ? `url(${prev.photo})` : "none",
                  backgroundColor: prev.bgColor,
                  opacity: current === displayed ? 0.18 : 1,
                  filter:
                    current === displayed
                      ? "brightness(0.35) blur(8px)"
                      : "brightness(0.55)",
                  transition: "opacity 0.8s ease, filter 0.8s ease",
                }}
              />

              {/* Layer B — incoming (fades to full) */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: ex.photo ? `url(${ex.photo})` : "none",
                  backgroundColor: ex.bgColor,
                  opacity: cardIn ? 1 : 0,
                  filter: "brightness(0.55)",
                  transition: "opacity 0.8s ease",
                }}
              />

              {/* Gradient scrim — bottom dark fade */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,5,18,0.88) 0%, rgba(8,5,18,0.32) 40%, rgba(8,5,18,0.06) 100%)",
                  zIndex: 2,
                }}
              />

              {/* ── Top-left label ──────────────────────── */}
              <p
                className="absolute top-6 left-8 text-[10px] uppercase tracking-[0.2em] font-semibold"
                style={{ color: "rgba(255,255,255,0.4)", zIndex: 5 }}
              >
                Kirti Singhal · Experience
              </p>

              {/* ── Counter ─────────────────────────────── */}
              <p
                className="absolute top-6 right-8 text-[11px] tracking-widest"
                style={{ color: "rgba(255,255,255,0.38)", zIndex: 5 }}
              >
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(experiences.length).padStart(2, "0")}
              </p>

              {/* ── Dot navigation ──────────────────────── */}
              <div
                className="absolute right-7 top-1/2 -translate-y-1/2 flex flex-col gap-2.5"
                style={{ zIndex: 5 }}
              >
                {experiences.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => jumpTo(i)}
                    aria-label={`Jump to experience ${i + 1}`}
                    style={{
                      width: 5,
                      height: i === current ? 24 : 5,
                      borderRadius: i === current ? 3 : 999,
                      background:
                        i === current
                          ? "rgba(255,255,255,0.88)"
                          : "rgba(255,255,255,0.28)",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      transition: "height 0.35s ease, background 0.3s ease",
                    }}
                  />
                ))}
              </div>

              {/* ── Experience card ─────────────────────── */}
              <div
                className="absolute bottom-0 left-0 right-0 px-8 pb-10"
                style={{ zIndex: 6 }}
              >
                <div
                  className="rounded-2xl"
                  style={{
                    maxWidth: 480,
                    padding: "24px 28px 22px",
                    background: "rgba(255,255,255,0.09)",
                    border: "0.5px solid rgba(255,255,255,0.16)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    opacity: cardIn ? 1 : 0,
                    transform: cardIn ? "translateY(0)" : "translateY(44px)",
                    transition: cardIn
                      ? "opacity 0.5s ease, transform 0.65s cubic-bezier(0.22,0.68,0,1.15)"
                      : "none",
                  }}
                >
                  {/* Eyebrow / period */}
                  <div
                    className="flex items-center gap-2 mb-3 text-[9px] uppercase tracking-[0.18em] font-semibold"
                    style={{ color: "rgba(210,190,255,0.65)" }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 18,
                        height: 1,
                        background: "rgba(200,180,255,0.4)",
                        flexShrink: 0,
                      }}
                    />
                    {ex.period}
                  </div>

                  {/* Role */}
                  <h3
                    className="font-light leading-tight mb-1"
                    style={{ fontSize: 22, color: "#fff", letterSpacing: "-0.01em" }}
                  >
                    {ex.role}
                  </h3>

                  {/* Org */}
                  <p
                    className="text-[13px] mb-4"
                    style={{ color: "rgba(195,175,235,0.7)" }}
                  >
                    {ex.org}
                  </p>

                  {/* Divider */}
                  <div
                    style={{
                      width: "100%",
                      height: "0.5px",
                      background: "rgba(255,255,255,0.1)",
                      marginBottom: 14,
                    }}
                  />

                  {/* Bullet points */}
                  <ul className="flex flex-col gap-2 mb-4">
                    {ex.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex gap-2 text-[12px] leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.76)" }}
                      >
                        <span
                          style={{
                            color: "rgba(200,178,255,0.5)",
                            flexShrink: 0,
                            marginTop: 1,
                            fontSize: 16,
                            lineHeight: 1.4,
                          }}
                        >
                          ·
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {ex.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-medium"
                        style={{
                          padding: "4px 10px",
                          borderRadius: 999,
                          border: "0.5px solid rgba(255,255,255,0.16)",
                          color: "rgba(215,200,255,0.72)",
                          background: "rgba(255,255,255,0.05)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Scroll hint ─────────────────────────── */}
              <div
                className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] tracking-widest pointer-events-none transition-opacity duration-500"
                style={{
                  bottom: 14,
                  zIndex: 7,
                  color: "rgba(255,255,255,0.32)",
                  opacity: current === 0 ? 1 : 0,
                  whiteSpace: "nowrap",
                }}
              >
                <svg
                  width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  className="animate-bounce"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                scroll for next experience
              </div>

            </div>{/* /sticky-frame */}

            {/* Scroll spacer — creates the scroll distance */}
            <div style={{ height: "1200px" }} aria-hidden="true" />
          </div>
        </div>

      </div>
    </section>
  );
}
