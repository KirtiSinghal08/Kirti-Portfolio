import { Briefcase, Crown } from "lucide-react";

const items = [
  {
    icon: Briefcase,
    role: "Content & Social Media Intern",
    org: "Brew & Bytes",
    period: "Internship | Sep 2025 - Present",
    points: [
      "Developed and executed content strategies across social platforms.",
      "Simplified complex tech topics into engaging posts.",
      "Improved audience reach and engagement.",
    ],
    tags: ["Content Strategy", "Design", "Social Media"]
  },
  {
    icon: Crown,
    role: "EDC Intern",
    org: "Entrepreneurship Development Cell (EDC)",
    period: "Internship | Sep 2024 - Dec 2024",
    points: [
      "Led initiatives connecting students with startup, founders & ideas.",
      "organized entrepreneurial events, workshops and pitch sessions.",
      "Strengthened leadership, Communication and team coordination skills.",
    ],
    tags: ["Leadership", "Event Management", "Communication"]
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 reveal">
          <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-muted-foreground mb-3">
            04 — Experience
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            Where I’ve <span className="italic text-foreground/50">built and contributed.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map(({ icon: Icon, role, org, period, points, tags }, i) => (
            <div
              key={role}
              className="reveal glass-panel rounded-3xl p-7 hover:-translate-y-1 transition-transform"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="size-12 rounded-2xl bg-gradient-to-br from-lavender to-petal flex items-center justify-center">
                  <Icon className="size-5 text-twilight" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  {period}
                </span>
              </div>
              <h3 className="font-display text-2xl text-foreground">{role}</h3>
              <p className="text-sm text-accent-foreground font-medium mb-4">{org}</p>
              <ul className="space-y-2">
                {points.map((pt) => (
                  <li key={pt} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-foreground/40 mt-1.5">·</span>
                    {pt}
                  </li>
                ))}
                {tags && (
  <div className="flex flex-wrap gap-2 mt-4">
    {tags.map((tag) => (
      <span
        key={tag}
        className="px-2.5 py-1 rounded-full border border-border bg-background/40 text-[10px] font-medium text-foreground/70"
      >
        {tag}
      </span>
    ))}
  </div>
)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
