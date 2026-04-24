import { Code2, Globe, Brain, Wrench, Users } from "lucide-react";

const groups = [
  {
    icon: Code2,
    title: "Languages",
    color: "from-lavender to-petal",
    items: ["Python","Java", "JavaScript"],
  },
  {
    icon: Globe,
    title: "Web Development",
    color: "from-azure to-lavender",
    items: ["HTML", "CSS", "JavaScript", "Responsive Design", "React"],
  },
  {
    icon: Brain,
    title: "AI & ML",
    color: "from-petal to-azure",
    items: ["Machine Learning Basics", "Chatbot Development", "Prompt Engineering", "Speech APIs"],
  },
  {
    icon: Wrench,
    title: "Tools & Platforms",
    color: "from-mint to-azure",
    items: ["GitHub", "VS Code", "Canva", "Adobe", "Excel" ],
  },
  {
    icon: Users,
    title: "Core Skills",
    color: "from-petal to-lavender",
    items: ["Problem Solving", "Team Collaboration", "UI/UX Thinking", "Communication"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 reveal">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-muted-foreground mb-3">
              02 — Skills
            </p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              The tools I used to <span className="italic text-foreground/50">built.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Technologies I use to design, build, and ship real-world projects.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map(({ icon: Icon, title, items, color }, i) => (
            <div
              key={title}
              className="reveal group relative glass-panel rounded-3xl p-6 hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div
                className={`size-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5`}
              >
                <Icon className="size-5 text-twilight" />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-3">{title}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full bg-background/60 border border-border text-xs font-medium text-foreground/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
