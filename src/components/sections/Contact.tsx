import { useState } from "react";
import { Mail, Linkedin, Github, Send, Check } from "lucide-react";
import { z } from "zod";
import emailjs from "@emailjs/browser";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  message: z.string().trim().min(5, "Message is too short").max(1000),
});

const links = [
  { icon: Mail, label: "Email", value: "kirtisinghal0811@gmail.com", href: "mailto:kirtisinghal0811@gmail.com"},
  { icon: Linkedin, label: "LinkedIn", value: "kirtisinghal0811", href: "https://www.linkedin.com/in/kirtisinghal0811/" },
  { icon: Github, label: "GitHub", value: "KirtiSinghal08", href: "https://github.com/KirtiSinghal08" },
];

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

emailjs.send(
  "service_j307y43",
  "template_8smc5dd",
  {
    from_name: data.name,
    from_email: data.email,
    message: data.message,
  },
  "ACqtiDsFZQbvOGfuB"
).then(
  () => {
    setSent(true);
    setStatus("success");
    setLoading(false);
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 4000);
  },
  (error) => {
    console.error(error);
    setLoading(false);
    setStatus("error");
  }
);
  };

  return (
    <section id="contact" className="relative py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 reveal">
            <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-muted-foreground mb-3">
              07 — Contact
            </p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              Let's build <span className="italic text-foreground/50">something together.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">
              I'm open to internships, freelance projects, hackathon teams or just a good conversation
              about tech and ideas. Drop a note — I usually reply within a day.
            </p>

            <div className="mt-8 space-y-3">
              {links.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="group glass-panel rounded-2xl p-4 flex items-center gap-4 hover:-translate-y-0.5 transition-transform"
                >
                  <div className="size-10 rounded-xl bg-gradient-to-br from-lavender to-petal flex items-center justify-center">
                    <Icon className="size-4 text-twilight" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-foreground truncate">{value}</p>
                  </div>
                  <span className="text-foreground/40 group-hover:text-foreground transition-colors">→</span>
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="lg:col-span-7 glass-panel-strong rounded-3xl p-7 md:p-9 space-y-5 reveal"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Your name" name="name" placeholder="Your name" error={errors.name} />
              <Field label="Email" name="email" type="email" placeholder="name@company.com" error={errors.email} />
            </div>
            <Field
              label="Message"
              name="message"
              placeholder="Tell me about your idea, internship or project…"
              error={errors.message}
              textarea
            />

            <button
              type="submit"
              disabled={sent || loading}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-twilight text-primary-foreground text-sm font-semibold shadow-lg shadow-twilight/10 hover:scale-[1.02] transition disabled:opacity-70"
            >
              {loading ? (
              "Sending..."
               ) : sent ? (
              <>
              <Check className="size-4" /> Message sent
              </>
              ) : (
  <>
    Send message
    <Send className="size-4 group-hover:translate-x-0.5 transition" />
  </>
)}
            </button>
            {status === "success" && (
  <p className="text-green-500 text-sm mt-3">
    Message sent successfully!
  </p>
)}

{status === "error" && (
  <p className="text-red-500 text-sm mt-3">
    Failed to send message. Try again.
  </p>
)}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  textarea?: boolean;
}) {
  const cls =
    "w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30 text-sm placeholder:text-muted-foreground/60 transition";
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-2">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} rows={5} placeholder={placeholder} className={cls} />
      ) : (
        <input type={type} name={name} placeholder={placeholder} className={cls} />
      )}
      {error && <span className="block mt-1.5 text-xs text-destructive">{error}</span>}
    </label>
  );
}
