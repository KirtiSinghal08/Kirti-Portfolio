import { GraduationCap, Lightbulb, Rocket, Palette } from "lucide-react";

const pillars = [
  { icon: GraduationCap, title: "B.Tech CSE", text: "Manav Rachna University · 2024–2028" },
  { icon: Lightbulb, title: "AI & Web", text: "Building voice agents, chatbots, real products" },
  { icon: Rocket, title: "Hackathons", text: "SIH Top 5, GoDaddy, HackMor, HackWithIndia" },
  { icon: Palette, title: "Code + Craft", text: "Developer mind, designer's eye, content voice" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 reveal">
          <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-muted-foreground mb-4">
            01 — About
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight text-pretty">
            A curious builder{" "}
            <span className="italic text-foreground/50">with a focus on real-world impact.</span>
          </h2>
        </div>

        <div className="lg:col-span-7 space-y-6 reveal" style={{ animationDelay: "0.1s" }}>
          <p className="text-lg leading-relaxed text-foreground/80">
            I’m a second-year Computer Science student who prefers building over just studying.
            I’ve created AI-powered tools, chatbots, and web apps that focus on real usability — not just theory.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            As a Smart India Hackathon 2025 finalist (Top 5 nationwide), 
            I learned how to take ideas from zero to execution under pressure.
            My work blends technical skills with a strong sense of design and user experience.
            Currently, I’m focused on building scalable AI + web applications and exploring opportunities 
            where I can contribute, learn fast, and ship impactful products.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="glass-panel rounded-2xl p-5 hover:-translate-y-1 transition-transform"
              >
                <Icon className="size-5 text-accent-foreground mb-3" />
                <h3 className="font-display text-lg text-foreground mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
