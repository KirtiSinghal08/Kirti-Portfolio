import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kirti Singhal" },
      { name: "description", content: "Portfolio" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// ─── Intro animation timings ───────────────────────────────────────────────
const PATHS = [
  { id: "p-smile",  len: 60,  delay: 0 },
  { id: "p-eyes",   len: 50,  delay: 300 },
  { id: "p-head",   len: 320, delay: 600 },
  { id: "p-hair",   len: 700, delay: 1100 },
  { id: "p-neck",   len: 60,  delay: 1700 },
  { id: "p-body",   len: 500, delay: 1900 },
  { id: "p-jacket", len: 150, delay: 2400 },
  { id: "p-larm",   len: 280, delay: 2700 },
  { id: "p-lhand",  len: 70,  delay: 3000 },
  { id: "p-rarm",   len: 250, delay: 3100 },
  { id: "p-rhand",  len: 90,  delay: 3350 },
  { id: "p-pants",  len: 700, delay: 3500 },
  { id: "p-shoes",  len: 200, delay: 4100 },
] as const;

const SPEED = 600;
const DRAW_DONE = 4100 + SPEED; // ~4700ms

function IntroOverlay({ onDone }: { onDone: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [girlBlur, setGirlBlur]     = useState(false);
  const [nameIn, setNameIn]         = useState(false);
  const [nameOut, setNameOut]       = useState(false);
  const [subShow, setSubShow]       = useState(false);
  const [subHide, setSubHide]       = useState(false);
  const [sparks, setSparks]         = useState(false);
  const [stageOut, setStageOut]     = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Kick off stroke-dashoffset draws
    const kick = setTimeout(() => {
      if (!svgRef.current) return;
      PATHS.forEach(({ id, len, delay }) => {
        const el = svgRef.current!.getElementById(id) as SVGPathElement | null;
        if (!el) return;
        el.style.strokeDasharray  = String(len);
        el.style.strokeDashoffset = String(len);
        el.style.transition = `stroke-dashoffset ${SPEED}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.strokeDashoffset = "0";
          });
        });
      });
    }, 50);
    timers.push(kick);

    // After all paths drawn: sparkles + wave
    timers.push(setTimeout(() => {
      setSparks(true);
      const wa  = svgRef.current?.getElementById("wave-anim")  as SVGAnimateTransformElement | null;
      const wa2 = svgRef.current?.getElementById("wave-anim2") as SVGAnimateTransformElement | null;
      wa?.beginElement();
      wa2?.beginElement();
    }, DRAW_DONE));

    // Name floats in
    timers.push(setTimeout(() => { setNameIn(true);  setSubShow(true);  }, DRAW_DONE + 400));

    // Girl blurs out
    timers.push(setTimeout(() => { setGirlBlur(true); }, DRAW_DONE + 600));

    // Name floats out
    timers.push(setTimeout(() => { setNameOut(true); setSubHide(true); }, DRAW_DONE + 2200));

    // Whole stage fades → parent removes it
    timers.push(setTimeout(() => { setStageOut(true); }, DRAW_DONE + 3000));
    timers.push(setTimeout(() => { onDone(); },         DRAW_DONE + 4000));

    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        pointerEvents: "none",
        opacity: stageOut ? 0 : 1,
        transition: stageOut ? "opacity 1s ease" : "none",
        overflow: "hidden",
      }}
    >
      {/* ── SVG girl ── */}
      <svg
        ref={svgRef}
        id="girl-svg"
        width="180"
        height="320"
        viewBox="0 0 180 320"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -52%)",
          filter:  girlBlur ? "blur(18px)" : "blur(0px)",
          opacity: girlBlur ? 0 : 1,
          transition: "filter 1.2s ease, opacity 1.2s ease",
        }}
      >
        <style>{`
          .dp {
            fill: none;
            stroke: #c0392b;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 1.6;
          }
        `}</style>

        {/* Smile */}
        <path id="p-smile" className="dp" d="M73 92 Q82 100 91 92"
          strokeDasharray={60} strokeDashoffset={60} />

        {/* Eyes */}
        <path id="p-eyes" className="dp" d="M70 82 Q73 78 76 82 M88 82 Q91 78 94 82"
          strokeDasharray={50} strokeDashoffset={50} strokeWidth={2.2} />

        {/* Head */}
        <path id="p-head" className="dp"
          d="M58 82 Q58 54 82 50 Q106 54 106 82 Q106 108 82 110 Q58 108 58 82 Z"
          strokeDasharray={320} strokeDashoffset={320} />

        {/* Hair */}
        <path id="p-hair" className="dp" d={`
          M58 78 Q52 58 68 50 Q82 44 96 50 Q112 58 106 78
          M106 78 Q120 92 118 130 Q116 155 110 168
          M58 78 Q44 92 46 130 Q48 155 54 168
          M62 56 Q58 48 64 44 Q74 38 82 42
          M96 54 Q106 46 108 52
        `} strokeDasharray={700} strokeDashoffset={700} />

        {/* Neck */}
        <path id="p-neck" className="dp" d="M76 110 L74 128 M88 110 L90 128"
          strokeDasharray={60} strokeDashoffset={60} />

        {/* Body / jacket */}
        <path id="p-body" className="dp" d={`
          M64 130 Q58 148 56 170 Q54 182 58 190 L76 194 L88 194 L106 190
          Q110 182 108 170 Q106 148 100 130 Z
        `} strokeDasharray={500} strokeDashoffset={500} />

        {/* Jacket details */}
        <path id="p-jacket" className="dp"
          d="M74 130 L80 158 M90 130 L84 158 M56 155 Q80 162 108 155"
          strokeDasharray={150} strokeDashoffset={150} />

        {/* Left arm */}
        <path id="p-larm" className="dp"
          d="M64 134 Q50 152 44 168 Q42 176 48 180 Q54 184 58 176 Q64 162 68 148"
          strokeDasharray={280} strokeDashoffset={280} />
        <path id="p-lhand" className="dp"
          d="M48 180 Q42 184 40 180 M48 180 Q44 186 41 184 M48 180 Q46 187 43 187"
          strokeDasharray={70} strokeDashoffset={70} />

        {/* Right arm (waving) */}
        <path id="p-rarm" className="dp"
          d="M100 134 Q116 116 124 100 Q128 90 124 85 Q119 80 114 88 Q108 102 102 120"
          strokeDasharray={250} strokeDashoffset={250} />
        <path id="p-rhand" className="dp"
          d="M124 85 Q128 78 126 74 M124 85 Q130 80 130 74 M124 85 Q132 85 132 80 M124 85 Q130 92 133 88"
          strokeDasharray={90} strokeDashoffset={90} />

        {/* Pants */}
        <path id="p-pants" className="dp" d={`
          M70 194 Q66 216 62 242 Q60 262 58 282 Q64 286 70 284 Q74 280 74 274 Q76 254 80 232
          M94 194 Q98 216 102 242 Q104 262 106 282 Q100 286 94 284 Q90 280 90 274 Q88 254 84 232
          M60 194 Q80 200 104 194
        `} strokeDasharray={700} strokeDashoffset={700} />

        {/* Shoes */}
        <path id="p-shoes" className="dp" d={`
          M58 282 Q50 286 46 282 Q42 278 46 274 Q54 272 64 274 Q70 276 70 282
          M106 282 Q114 286 118 282 Q122 278 118 274 Q110 272 100 274 Q94 276 94 282
        `} strokeDasharray={200} strokeDashoffset={200} />

        {/* Sparkles */}
        <g style={{ opacity: sparks ? 0.5 : 0, transition: "opacity 0.6s ease" }}>
          <line x1="22" y1="60" x2="22" y2="70" stroke="#c0392b" strokeWidth={1.2} />
          <line x1="17" y1="65" x2="27" y2="65" stroke="#c0392b" strokeWidth={1.2} />
          <line x1="148" y1="95" x2="148" y2="103" stroke="#c0392b" strokeWidth={1.2} />
          <line x1="144" y1="99" x2="152" y2="99" stroke="#c0392b" strokeWidth={1.2} />
          <line x1="28" y1="210" x2="28" y2="218" stroke="#c0392b" strokeWidth={1.2} />
          <line x1="24" y1="214" x2="32" y2="214" stroke="#c0392b" strokeWidth={1.2} />
          <line x1="155" y1="200" x2="155" y2="206" stroke="#c0392b" strokeWidth={1.2} />
          <line x1="152" y1="203" x2="158" y2="203" stroke="#c0392b" strokeWidth={1.2} />
        </g>

        {/* Wave animations — SMIL */}
        <animateTransform id="wave-anim" href="#p-rarm" attributeName="transform"
          type="rotate"
          values="0 100 134;-20 100 134;0 100 134"
          dur="1s" repeatCount="indefinite" begin="indefinite" additive="sum"
          calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
        <animateTransform id="wave-anim2" href="#p-rhand" attributeName="transform"
          type="rotate"
          values="0 100 134;-20 100 134;0 100 134"
          dur="1s" repeatCount="indefinite" begin="indefinite" additive="sum"
          calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1" />
      </svg>

      {/* ── Name ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: nameOut
            ? "translate(-50%, -60%)"
            : "translate(-50%, -50%)",
          fontFamily: "'Georgia', serif",
          fontSize: "clamp(32px, 7vw, 72px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#f0ede6",
          whiteSpace: "nowrap",
          opacity: nameIn && !nameOut ? 1 : 0,
          filter: nameIn && !nameOut ? "blur(0px)" : "blur(20px)",
          transition: nameOut
            ? "opacity 0.9s ease, filter 0.9s ease, transform 0.9s ease"
            : "opacity 1.4s ease, filter 1.4s ease, transform 1.4s ease",
          pointerEvents: "none",
        }}
      >
        KIRTI SINGHAL
      </div>

      {/* ── Subtitle ── */}
      <div
        style={{
          position: "absolute",
          top: "calc(50% + clamp(28px, 5vw, 56px))",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: "11px",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "#555",
          whiteSpace: "nowrap",
          opacity: subShow && !subHide ? 1 : 0,
          transition: subHide
            ? "opacity 0.5s ease"
            : "opacity 1s ease 0.3s",
        }}
      >
        portfolio · 2026
      </div>
    </div>
  );
}

function RootComponent() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroOverlay onDone={() => setShowIntro(false)} />}
      <Outlet />
    </>
  );
}