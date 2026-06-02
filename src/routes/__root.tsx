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

// ─── Particle data ───────────────────────────────────────────────────────────
// Seeded PRNG so SSR and client produce identical values → no hydration mismatch
function makeRand(seed: number) {
  let s = seed;
  return () => {
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b);
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b);
    s ^= s >>> 16;
    return (s >>> 0) / 0x100000000;
  };
}

type PType = "dot" | "cross" | "ring" | "sparkle";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  dur: number;
  delay: number;
  type: PType;
  drift: number;
  color: string; // "#f0ede6" cream | "#c0392b" red
};

function buildParticles(n: number): Particle[] {
  const r = makeRand(7);
  const colors = ["#f0ede6", "#f0ede6", "#f0ede6", "#c0392b", "#f0ede6", "#f0ede6"];
  return Array.from({ length: n }, (_, i) => {
    const typeRoll = r();
    const type: PType =
      typeRoll < 0.55 ? "dot"
      : typeRoll < 0.72 ? "ring"
      : typeRoll < 0.87 ? "cross"
      : "sparkle";
    return {
      id: i,
      x: r() * 100,
      y: r() * 100,
      size:
        type === "dot"     ? 1.2 + r() * 2.2
        : type === "ring"  ? 4   + r() * 5
        : type === "cross" ? 6   + r() * 4
        :                    5   + r() * 4,
      opacity: 0.05 + r() * 0.14,
      dur: 7 + r() * 14,
      delay: -(r() * 18),
      type,
      drift: (r() - 0.5) * 50,
      color: colors[Math.floor(r() * colors.length)],
    };
  });
}

const PARTICLES = buildParticles(60);

// ─── Ambient particles layer ─────────────────────────────────────────────────
function AmbientParticles({ fading }: { fading: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: fading ? 0 : 1,
        transition: "opacity 1s ease",
      }}
    >
      <style>{`
        @keyframes amb-float {
          0%   { transform: translate(0, 0px);              opacity: var(--op); }
          50%  { transform: translate(var(--dx), -30px);    opacity: calc(var(--op) * 1.8); }
          100% { transform: translate(0, 0px);              opacity: var(--op); }
        }
        @keyframes amb-pulse {
          0%, 100% { transform: scale(1);   opacity: var(--op); }
          50%       { transform: scale(1.6); opacity: calc(var(--op) * 2); }
        }
        @keyframes amb-twinkle {
          0%, 100% { opacity: var(--op); transform: scale(1) rotate(0deg); }
          25%       { opacity: calc(var(--op)*0.3); transform: scale(0.7) rotate(15deg); }
          75%       { opacity: calc(var(--op)*1.8); transform: scale(1.3) rotate(-10deg); }
        }
        .p-dot {
          position: absolute;
          border-radius: 50%;
          animation: amb-float var(--dur) ease-in-out var(--del) infinite;
        }
        .p-ring {
          position: absolute;
          border-radius: 50%;
          background: transparent;
          border: 1px solid currentColor;
          animation: amb-pulse var(--dur) ease-in-out var(--del) infinite;
        }
        .p-cross {
          position: absolute;
          animation: amb-twinkle var(--dur) ease-in-out var(--del) infinite;
        }
        .p-cross::before, .p-cross::after {
          content: '';
          position: absolute;
          background: currentColor;
          border-radius: 1px;
        }
        .p-cross::before { width: 100%; height: 1.5px; top: 50%; left: 0; transform: translateY(-50%); }
        .p-cross::after  { width: 1.5px; height: 100%; left: 50%; top: 0; transform: translateX(-50%); }
        .p-sparkle {
          position: absolute;
          animation: amb-twinkle var(--dur) ease-in-out var(--del) infinite;
        }
        .p-sparkle::before, .p-sparkle::after {
          content: '';
          position: absolute;
          background: currentColor;
          border-radius: 2px;
        }
        /* 4-pointed star via two rotated bars */
        .p-sparkle::before { width: 100%; height: 1.5px; top: 50%; left: 0; transform: translateY(-50%) rotate(45deg); }
        .p-sparkle::after  { width: 100%; height: 1.5px; top: 50%; left: 0; transform: translateY(-50%) rotate(-45deg); }
      `}</style>

      {PARTICLES.map((p) => {
        const shared: React.CSSProperties = {
          left: `${p.x}%`,
          top:  `${p.y}%`,
          width:  p.size,
          height: p.size,
          color: p.color,
          ["--op"  as string]: p.opacity,
          ["--dur" as string]: `${p.dur}s`,
          ["--del" as string]: `${p.delay}s`,
          ["--dx"  as string]: `${p.drift}px`,
        };

        if (p.type === "dot") {
          return (
            <div key={p.id} className="p-dot" style={{ ...shared, background: p.color }} />
          );
        }
        if (p.type === "ring") {
          return <div key={p.id} className="p-ring" style={shared} />;
        }
        if (p.type === "cross") {
          return <div key={p.id} className="p-cross" style={shared} />;
        }
        // sparkle
        return <div key={p.id} className="p-sparkle" style={shared} />;
      })}

      {/* Dark vignette keeps centre readable */}
      <div style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse 65% 55% at 50% 50%, transparent 35%, rgba(0,0,0,0.65) 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ─── SVG draw-on config ──────────────────────────────────────────────────────
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

const SPEED     = 600;
const DRAW_DONE = 4100 + SPEED;

// ─── Intro overlay ───────────────────────────────────────────────────────────
function IntroOverlay({ onDone }: { onDone: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null);

  const [girlBlur, setGirlBlur] = useState(false);
  const [nameIn,   setNameIn]   = useState(false);
  const [nameOut,  setNameOut]  = useState(false);
  const [subShow,  setSubShow]  = useState(false);
  const [subHide,  setSubHide]  = useState(false);
  const [sparks,   setSparks]   = useState(false);
  const [stageOut, setStageOut] = useState(false);

  useEffect(() => {
    const T: ReturnType<typeof setTimeout>[] = [];

    T.push(setTimeout(() => {
      if (!svgRef.current) return;
      PATHS.forEach(({ id, len, delay }) => {
        const el = svgRef.current!.getElementById(id) as SVGPathElement | null;
        if (!el) return;
        el.style.strokeDasharray  = String(len);
        el.style.strokeDashoffset = String(len);
        el.style.transition =
          `stroke-dashoffset ${SPEED}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          el.style.strokeDashoffset = "0";
        }));
      });
    }, 50));

    T.push(setTimeout(() => {
      setSparks(true);
      (svgRef.current?.getElementById("wave-anim")  as SVGAnimateTransformElement | null)?.beginElement();
      (svgRef.current?.getElementById("wave-anim2") as SVGAnimateTransformElement | null)?.beginElement();
    }, DRAW_DONE));

    T.push(setTimeout(() => { setNameIn(true);  setSubShow(true);  }, DRAW_DONE + 400));
    T.push(setTimeout(() => { setGirlBlur(true); },                  DRAW_DONE + 600));
    T.push(setTimeout(() => { setNameOut(true); setSubHide(true); }, DRAW_DONE + 2200));
    T.push(setTimeout(() => { setStageOut(true); },                  DRAW_DONE + 3000));
    T.push(setTimeout(() => { onDone(); },                           DRAW_DONE + 4000));

    return () => T.forEach(clearTimeout);
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
        overflow: "hidden",
        opacity: stageOut ? 0 : 1,
        transition: stageOut ? "opacity 1s ease" : "none",
      }}
    >
      {/* ✦ Magic layer */}
      <AmbientParticles fading={stageOut} />

      {/* SVG girl */}
      <svg
        ref={svgRef}
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
        <style>{`.dp{fill:none;stroke:#c0392b;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.6}`}</style>

        <path id="p-smile"  className="dp" d="M73 92 Q82 100 91 92" strokeDasharray={60} strokeDashoffset={60}/>
        <path id="p-eyes"   className="dp" d="M70 82 Q73 78 76 82 M88 82 Q91 78 94 82" strokeDasharray={50} strokeDashoffset={50} strokeWidth={2.2}/>
        <path id="p-head"   className="dp" d="M58 82 Q58 54 82 50 Q106 54 106 82 Q106 108 82 110 Q58 108 58 82 Z" strokeDasharray={320} strokeDashoffset={320}/>
        <path id="p-hair"   className="dp" d="M58 78 Q52 58 68 50 Q82 44 96 50 Q112 58 106 78 M106 78 Q120 92 118 130 Q116 155 110 168 M58 78 Q44 92 46 130 Q48 155 54 168 M62 56 Q58 48 64 44 Q74 38 82 42 M96 54 Q106 46 108 52" strokeDasharray={700} strokeDashoffset={700}/>
        <path id="p-neck"   className="dp" d="M76 110 L74 128 M88 110 L90 128" strokeDasharray={60} strokeDashoffset={60}/>
        <path id="p-body"   className="dp" d="M64 130 Q58 148 56 170 Q54 182 58 190 L76 194 L88 194 L106 190 Q110 182 108 170 Q106 148 100 130 Z" strokeDasharray={500} strokeDashoffset={500}/>
        <path id="p-jacket" className="dp" d="M74 130 L80 158 M90 130 L84 158 M56 155 Q80 162 108 155" strokeDasharray={150} strokeDashoffset={150}/>
        <path id="p-larm"   className="dp" d="M64 134 Q50 152 44 168 Q42 176 48 180 Q54 184 58 176 Q64 162 68 148" strokeDasharray={280} strokeDashoffset={280}/>
        <path id="p-lhand"  className="dp" d="M48 180 Q42 184 40 180 M48 180 Q44 186 41 184 M48 180 Q46 187 43 187" strokeDasharray={70} strokeDashoffset={70}/>
        <path id="p-rarm"   className="dp" d="M100 134 Q116 116 124 100 Q128 90 124 85 Q119 80 114 88 Q108 102 102 120" strokeDasharray={250} strokeDashoffset={250}/>
        <path id="p-rhand"  className="dp" d="M124 85 Q128 78 126 74 M124 85 Q130 80 130 74 M124 85 Q132 85 132 80 M124 85 Q130 92 133 88" strokeDasharray={90} strokeDashoffset={90}/>
        <path id="p-pants"  className="dp" d="M70 194 Q66 216 62 242 Q60 262 58 282 Q64 286 70 284 Q74 280 74 274 Q76 254 80 232 M94 194 Q98 216 102 242 Q104 262 106 282 Q100 286 94 284 Q90 280 90 274 Q88 254 84 232 M60 194 Q80 200 104 194" strokeDasharray={700} strokeDashoffset={700}/>
        <path id="p-shoes"  className="dp" d="M58 282 Q50 286 46 282 Q42 278 46 274 Q54 272 64 274 Q70 276 70 282 M106 282 Q114 286 118 282 Q122 278 118 274 Q110 272 100 274 Q94 276 94 282" strokeDasharray={200} strokeDashoffset={200}/>

        {/* In-figure sparkles */}
        <g style={{ opacity: sparks ? 0.55 : 0, transition: "opacity 0.6s ease" }}>
          <line x1="22"  y1="60"  x2="22"  y2="70"  stroke="#c0392b" strokeWidth={1.2}/>
          <line x1="17"  y1="65"  x2="27"  y2="65"  stroke="#c0392b" strokeWidth={1.2}/>
          <line x1="148" y1="95"  x2="148" y2="103" stroke="#c0392b" strokeWidth={1.2}/>
          <line x1="144" y1="99"  x2="152" y2="99"  stroke="#c0392b" strokeWidth={1.2}/>
          <line x1="28"  y1="210" x2="28"  y2="218" stroke="#c0392b" strokeWidth={1.2}/>
          <line x1="24"  y1="214" x2="32"  y2="214" stroke="#c0392b" strokeWidth={1.2}/>
          <line x1="155" y1="200" x2="155" y2="206" stroke="#c0392b" strokeWidth={1.2}/>
          <line x1="152" y1="203" x2="158" y2="203" stroke="#c0392b" strokeWidth={1.2}/>
        </g>

        <animateTransform id="wave-anim" href="#p-rarm" attributeName="transform"
          type="rotate" values="0 100 134;-20 100 134;0 100 134"
          dur="1s" repeatCount="indefinite" begin="indefinite" additive="sum"
          calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/>
        <animateTransform id="wave-anim2" href="#p-rhand" attributeName="transform"
          type="rotate" values="0 100 134;-20 100 134;0 100 134"
          dur="1s" repeatCount="indefinite" begin="indefinite" additive="sum"
          calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/>
      </svg>

      {/* Name */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: nameOut ? "translate(-50%, -60%)" : "translate(-50%, -50%)",
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
      }}>
        KIRTI SINGHAL
      </div>

      {/* Subtitle */}
      <div style={{
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
        transition: subHide ? "opacity 0.5s ease" : "opacity 1s ease 0.3s",
      }}>
        Dream it. Code it. Ship it.
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