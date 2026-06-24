import { FiStar } from "react-icons/fi";
import { Section, SectionHeading } from "@/components/layout/Section";
import { FadeUp } from "@/components/anim/Reveal";
import { testimonials, type Testimonial } from "@/config/testimonials";

function initials(name: string): string {
  return name
    .replace(/[^A-Za-z. ]/g, "")
    .split(" ")
    .map((p) => p.replace(".", "").charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const [from, to] = t.gradient;
  return (
    <figure className="card flex h-full flex-col rounded-2xl p-6">
      {/* Rating */}
      {t.rating && (
        <div className="flex gap-0.5" aria-label={`${t.rating} out of 5`}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <FiStar key={i} size={14} className="fill-accent text-accent" />
          ))}
        </div>
      )}

      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/90">
        "{t.quote}"
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-line/10 pt-5">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-semibold text-white"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
          aria-hidden
        >
          {initials(t.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-ink">{t.name}</span>
          <span className="block truncate text-xs text-faint">
            {t.role} · {t.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Testimonials"
        title="Trusted to deliver, end to end."
        description="A few words from the founders and teams I've partnered with. (Placeholder quotes — real testimonials coming soon.)"
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <FadeUp key={t.name + t.company} delay={(i % 3) * 0.07}>
            <TestimonialCard t={t} />
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
