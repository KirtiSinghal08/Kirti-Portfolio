const roles = [
  {
    title: "Coordinator",
    org: "Digital Nexus (Tech Club)",
    impact: "Leading tech initiatives, events & building a strong dev community.",
    tags: ["Leadership", "Management", "Tech Community"],
    highlight: true,
  },
  {
    title: "Core Member",
    org: "Dance Club",
    impact: "Organizing performances, collaborating creatively & stage presence.",
    tags: ["Creativity", "Teamwork"],
  },
  {
    title: "Core Member",
    org: "TechSoul",
    impact: "Contributing to tech events, hackathons & peer learning.",
    tags: ["Events", "Collaboration"],
  },
];

export function Leadership() {
  return (
    <section id="leadership" className="relative py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 reveal">
          <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-muted-foreground mb-3">
            06 — Leadership
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            Beyond the <span className="italic text-foreground/50">code editor.</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            I believe great engineers are also great collaborators. These are the communities where I lead,
            create and connect.
          </p>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5 reveal" style={{ animationDelay: "0.1s" }}>
  {roles.map((r, i) => (
    <div
      key={r.org}
      className={`group relative rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-silk-lg cursor-default
      ${
        r.highlight
          ? "bg-gradient-to-br from-lavender via-petal to-azure border border-background/50 sm:col-span-2"
          : "glass-panel"
      }`}
    >
      <span className="absolute top-4 right-5 text-[10px] font-bold text-muted-foreground/60">
        {String(i + 1).padStart(2, "0")}
      </span>

      <h3 className="font-display text-2xl text-foreground">{r.org}</h3>
      <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mt-1">
        {r.title}
      </p>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        {r.impact}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {r.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-[10px] rounded-full bg-background/60 border border-border text-foreground/70 font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top,theme(colors.white/0.3),transparent_70%)]" />
    </div>
  ))}
</div>
      </div>
    </section>
  );
}
