import { useRef, useState, type FormEvent } from "react";
import {
  FiArrowUpRight,
  FiCheck,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiSend,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { Section } from "@/components/layout/Section";
import { FadeUp, SlideLeft } from "@/components/anim/Reveal";
import { TextReveal } from "@/components/anim/TextReveal";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { Button } from "@/components/ui/Button";
import { siteConfig, socials } from "@/config/site";
import { cn } from "@/lib/utils";
import { useHasFinePointer } from "@/hooks/useMediaQuery";

type Status = "idle" | "submitting" | "success";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

const PROJECT_TYPES = [
  "SaaS Platform",
  "Automation",
  "Enterprise / ERP",
  "Other",
] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const methodIcon = {
  github: FiGithub,
  linkedin: FiLinkedin,
  whatsapp: FaWhatsapp,
  mail: FiMail,
  x: FiArrowUpRight,
} as const;

export function Contact() {
  const finePointer = useHasFinePointer();
  const cardRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [projectType, setProjectType] =
    useState<(typeof PROJECT_TYPES)[number]>("SaaS Platform");
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [status, setStatus] = useState<Status>("idle");

  // Pointer-reactive glow on the form card (CSS vars, no rAF).
  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!finePointer || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty(
      "--gx",
      `${((e.clientX - r.left) / r.width) * 100}%`
    );
    cardRef.current.style.setProperty(
      "--gy",
      `${((e.clientY - r.top) / r.height) * 100}%`
    );
  };

  const setField = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(form.email))
      next.email = "That email doesn't look right.";
    if (form.message.trim().length < 10)
      next.message = "A little more detail helps (10+ chars).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting" || !validate()) return;
    setStatus("submitting");

    const payload = {
      access_key: "0fcb642e-29ee-4a26-bcab-426c65979a3a",
      subject: `New project enquiry — ${form.name} (${projectType})`,
      name: form.name,
      email: form.email,
      company: form.company || "—",
      project_type: projectType,
      message: form.message,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("idle");
        alert("Something went wrong. Please try again or email me directly.");
      }
    } catch {
      setStatus("idle");
      alert("Network error. Please try again or email me directly.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-line/10 bg-canvas/40 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent/50 focus:ring-2 focus:ring-accent/20";

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* ---- Left: pitch + contact methods ---- */}
        <SlideLeft>
          <AvailabilityBadge label={siteConfig.availability} />
          <h2 className="mt-7 text-display-sm font-semibold leading-[1.05] text-ink md:text-display-md">
            <TextReveal text="Let's build something" />{" "}
            <TextReveal
              text="worth shipping."
              delay={0.15}
              className="text-gradient"
            />
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Tell me about your product, timeline and goals. I reply within 24
            hours with honest next steps — no pressure, no jargon.
          </p>

          {/* Book a call — WhatsApp */}
          <a
            href={siteConfig.booking}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="group mt-8 inline-flex items-center gap-3 rounded-2xl border border-line/10 bg-surface/40 p-4 transition-colors hover:border-accent/30"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
              <FaWhatsapp size={19} />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-medium text-ink">
                Message me on WhatsApp
              </span>
              <span className="block text-xs text-faint">
                Quick chat · usually replies fast
              </span>
            </span>
            <FiArrowUpRight className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
          </a>

          {/* Methods */}
          <ul className="mt-8 space-y-1">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                data-cursor="hover"
                className="group flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm transition-colors hover:bg-surface/50"
              >
                <FiMail className="text-accent" />
                <span className="text-muted transition-colors group-hover:text-ink">
                  {siteConfig.email}
                </span>
              </a>
            </li>
            {socials.map((s) => {
              const Icon = methodIcon[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    data-cursor="hover"
                    className="group flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm transition-colors hover:bg-surface/50"
                  >
                    <Icon className="text-accent" />
                    <span className="text-muted transition-colors group-hover:text-ink">
                      {s.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </SlideLeft>

        {/* ---- Right: the form ---- */}
        <FadeUp delay={0.1}>
          <div
            ref={cardRef}
            onPointerMove={handlePointer}
            className="glass-strong relative overflow-hidden rounded-3xl p-6 shadow-soft sm:p-8"
          >
            {/* Pointer-reactive glow */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(20rem 20rem at var(--gx, 80%) var(--gy, 0%), rgb(var(--accent) / 0.1), transparent 60%)",
              }}
            />

            {status === "success" ? (
              <div className="relative flex min-h-[24rem] flex-col items-center justify-center text-center animate-fade-in">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
                  <FiCheck size={30} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
                  Message sent!
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                  Prefer a faster reply? Use the WhatsApp or email links on the left.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-medium text-accent hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="relative" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" error={errors.name} htmlFor="c-name">
                    <input
                      id="c-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      className={inputClass}
                      value={form.name}
                      aria-invalid={!!errors.name}
                      onChange={(e) => setField("name", e.target.value)}
                    />
                  </Field>
                  <Field label="Email" error={errors.email} htmlFor="c-email">
                    <input
                      id="c-email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      className={inputClass}
                      value={form.email}
                      aria-invalid={!!errors.email}
                      onChange={(e) => setField("email", e.target.value)}
                    />
                  </Field>
                </div>

                <div className="mt-5">
                  <Field label="Company" htmlFor="c-company" optional>
                    <input
                      id="c-company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Acme Inc."
                      className={inputClass}
                      value={form.company}
                      onChange={(e) => setField("company", e.target.value)}
                    />
                  </Field>
                </div>

                {/* Project type segmented control */}
                <div className="mt-5">
                  <span className="mb-2 block text-sm font-medium text-ink">
                    Project type
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={projectType === t}
                        onClick={() => setProjectType(t)}
                        data-cursor="hover"
                        className={cn(
                          "rounded-full px-4 py-2 text-sm transition-colors",
                          projectType === t
                            ? "bg-ink text-canvas"
                            : "border border-line/10 text-muted hover:text-ink"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <Field
                    label="Message"
                    error={errors.message}
                    htmlFor="c-message"
                  >
                    <textarea
                      id="c-message"
                      rows={4}
                      placeholder="What are you building, and what does success look like?"
                      className={cn(inputClass, "resize-none")}
                      value={form.message}
                      aria-invalid={!!errors.message}
                      onChange={(e) => setField("message", e.target.value)}
                    />
                  </Field>
                </div>

                <div className="mt-7 flex items-center gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "submitting"}
                  >
                    <span>
                      {status === "submitting" ? "Preparing…" : "Send message"}
                    </span>
                    {status === "submitting" ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <FiSend />
                    )}
                  </Button>
                  <span className="text-xs text-faint">
                    Replies within 24 hours.
                  </span>
                </div>
              </form>
            )}
          </div>
        </FadeUp>
      </div>
    </Section>
  );
}

/** Labelled field wrapper with an animated inline error. */
function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-center gap-2 text-sm font-medium text-ink"
      >
        {label}
        {optional && (
          <span className="text-xs font-normal text-faint">optional</span>
        )}
      </label>
      {children}
      <span
        role={error ? "alert" : undefined}
        className={cn(
          "block overflow-hidden text-xs text-red-400 transition-all duration-300",
          error ? "mt-1.5 max-h-6 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {error}
      </span>
    </div>
  );
}
