import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import profileImg from "@/components/sections/kirtipic.jpeg"; // change name // change name

const ROLES = [
  "Developer",
  "Hackathon Finalist",
  "Building in AI & Full Stack",
  "Web Builder",
  "Aspiring Software Engineer",
  "Future Founder",
];

function useTyping(words: string[], speed = 90, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let t: ReturnType<typeof setTimeout>;
    if (!del && text === word) {
      t = setTimeout(() => setDel(true), pause);
    } else if (del && text === "") {
      setDel(false);
      setI((v) => v + 1);
    } else {
      t = setTimeout(
        () => setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        del ? speed / 2 : speed
      );
    }
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);

  return text;
}

export function Hero() {
  const role = useTyping(ROLES);

  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-7 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] uppercase tracking-widest font-semibold text-foreground/60">
              Open to Internships
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] text-foreground text-pretty">
            Building ideas into <br />
            <span className="italic text-foreground/40">real-world tech.</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-[52ch] leading-relaxed">
            Hi, I'm <span className="text-foreground font-medium">Kirti Singhal</span> — a B.Tech
            CSE student, blending <span className="text-foreground font-medium">AI</span>,{" "}
            <span className="text-foreground font-medium">web development</span> and a designer's eye into
            products people actually want to use.
          </p>

          <div className="flex items-center gap-3 text-sm font-medium">
            <Sparkles className="size-4 text-accent-foreground" />
            <span className="text-foreground/60">Currently:</span>
            <span className="font-display italic text-xl text-foreground cursor-blink min-w-[14ch]">
              {role}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-twilight text-primary-foreground text-sm font-semibold shadow-lg shadow-twilight/10 hover:scale-[1.02] transition"
            >
              See My Work
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass-panel text-foreground text-sm font-semibold hover:bg-background/60 transition"
            >
              Contact Me
            </a>
            <a
              href="https://pdflink.to/kirti-resume/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-background/60 transition"
>
              View Resume
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md border-t border-border/60 pt-6">
            <div>
              <span className="block text-2xl font-display text-foreground">Top 5</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                SIH 2025
              </span>
            </div>
            <div>
              <span className="block text-2xl font-display text-foreground">5+</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                Hackathons
              </span>
            </div>
            <div>
              <span className="block text-2xl font-display text-foreground">4+</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                Projects Built
              </span>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="lg:col-span-5 relative reveal" style={{ animationDelay: "0.15s" }}>
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
            <div className="absolute inset-0 glass-panel-strong rounded-[40px] p-4 rotate-2 animate-float transition-transform duration-500 hover:rotate-0">
              <div className="w-full h-full rounded-[28px] bg-gradient-to-br from-lavender via-petal to-azure relative overflow-hidden">
                <div className="absolute inset-0 group">
                <img
      src={profileImg}
      alt="Kirti"
      className="w-full h-full object-cover rounded-[28px] transition-transform duration-700 group-hover:scale-105"    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent rounded-[28px]" />
  </div>
                <div className="absolute bottom-6 left-6 right-6 glass-panel-strong rounded-2xl p-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                    Now Building
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    PreCura — Predict Before Symptoms
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 md:-left-10 top-[18%] glass-panel-strong px-5 py-3 rounded-2xl -rotate-6 hidden sm:block">
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-0.5">
                Specialization
              </div>
              <div className="font-display italic text-base text-foreground">AI + Web</div>
            </div>

            <div className="absolute -right-4 md:-right-8 bottom-[14%] glass-panel-strong p-4 rounded-2xl rotate-3 flex flex-col gap-2 hidden sm:flex">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-full bg-lavender flex items-center justify-center text-[10px] font-bold text-twilight">
                  AI
                </div>
                <span className="text-xs font-medium text-foreground/80">ML Systems  
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-full bg-azure flex items-center justify-center text-[10px] font-bold text-twilight">
                  WD
                </div>
                <span className="text-xs font-medium text-foreground/80">UI/UX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
