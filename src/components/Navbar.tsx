import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const moreLinks = [
  { label: "Achievements", href: "#achievements" },
  { label: "Leadership", href: "#leadership" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMore = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMoreOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMoreOpen(false), 120);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-4 md:px-6 flex items-center justify-between transition-all ${
          scrolled ? "" : ""
        }`}
      >
        <div
          className={`flex items-center justify-between gap-4 px-4 md:px-6 py-3 rounded-full w-full ${
            scrolled ? "glass-panel-strong" : "glass-panel"
          }`}
        >
          <a
  href="#top"
  className="flex items-center gap-3 text-twilight font-semibold tracking-tight"
>
  {/* Stylish Logo */}
  <span className="relative flex items-center justify-center w-10 h-10">
    <span className="absolute inset-0 rotate-45 rounded-xl border-2 border-twilight"></span>
    <span className="relative font-display text-xl italic font-bold text-twilight">
      KS
    </span>
  </span>

  {/* Name */}
  <span className="font-display italic text-lg">
    Kirti Singhal
  </span>
</a>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-foreground/65">
            {links.map((l) => (
  <div key={l.href} className="flex items-center">
    <a
      href={l.href}
      className="hover:text-foreground transition-colors"
    >
      {l.label}
    </a>

    {/* Show "More" after Experience */}
    {l.label === "Experience" && (
      <div
        className="relative"
        onMouseEnter={openMore}
        onMouseLeave={scheduleClose}
      >
        <button
          type="button"
          onClick={() => setMoreOpen((v) => !v)}
          className="ml-7 flex items-center gap-1 hover:text-foreground transition-colors"
        >
          More
          <ChevronDown
            className={`size-3.5 transition-transform ${
              moreOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`absolute top-full pt-3 ${
            moreOpen ? "block" : "hidden"
          }`}
        >
          <div className="glass-panel-strong rounded-2xl p-2 shadow-lg">
            {moreLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMoreOpen(false)}
                className="block px-4 py-2"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
))}
            
          </div>
          <div className="flex items-center gap-2">
            <div className="md:hidden relative">
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                More
                <ChevronDown
                  className={`size-3.5 transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                role="menu"
                className={`absolute right-0 top-full mt-2 min-w-[180px] origin-top-right transition-all duration-200 ease-out ${
                  moreOpen
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 -translate-y-1 scale-95 pointer-events-none"
                }`}
              >
                <div className="glass-panel-strong rounded-2xl p-2 shadow-lg">
                  {moreLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 rounded-xl text-sm text-foreground/75 hover:text-foreground hover:font-semibold hover:bg-foreground/5 transition-all"                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden sm:inline-flex px-4 py-2 rounded-full bg-twilight text-primary-foreground text-xs font-semibold tracking-wide hover:opacity-90 transition"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
