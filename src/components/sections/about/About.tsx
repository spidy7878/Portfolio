import type { IconType } from "react-icons";
import { FiBox, FiTarget, FiCompass, FiShield } from "react-icons/fi";
import { Section, SectionHeading } from "@/components/layout/Section";
import { FadeUp } from "@/components/anim/Reveal";
import { Counter } from "@/components/anim/Counter";
import {
  aboutIntro,
  aboutStats,
  journey,
  principles,
  type Principle,
} from "@/config/about";

const principleIcons: Record<Principle["icon"], IconType> = {
  product: FiBox,
  business: FiTarget,
  problem: FiCompass,
  ownership: FiShield,
};

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title="A product engineer who thinks in business outcomes."
        description={aboutIntro}
      />

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/[0.06] md:grid-cols-4">
        {aboutStats.map((s, i) => (
          <FadeUp key={s.label} delay={(i % 4) * 0.06} className="bg-canvas">
            <div className="p-6">
              <div className="font-display text-3xl font-semibold text-ink md:text-4xl">
                <Counter
                  to={s.to}
                  decimals={s.decimals}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              </div>
              <div className="mt-2 text-sm leading-snug text-faint">{s.label}</div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* Principles */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((p, i) => {
          const Icon = principleIcons[p.icon];
          return (
            <FadeUp key={p.title} delay={(i % 4) * 0.06}>
              <div className="card group h-full rounded-2xl p-6 transition-transform duration-500 ease-out-expo hover:-translate-y-1">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon size={19} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </FadeUp>
          );
        })}
      </div>

      {/* Journey timeline */}
      <div className="mt-24">
        <FadeUp>
          <h3 className="font-display text-2xl font-semibold text-ink">The journey</h3>
        </FadeUp>

        <ol className="relative mt-10 border-l border-line/12 pl-8 md:pl-10">
          {journey.map((m, i) => (
            <FadeUp key={m.title} as="li" delay={(i % 2) * 0.05} className="relative pb-10 last:pb-0">
              {/* Node */}
              <span
                className="absolute -left-[2.15rem] top-1 grid h-4 w-4 place-items-center rounded-full bg-canvas md:-left-[2.65rem]"
                aria-hidden
              >
                <span className="h-2.5 w-2.5 rounded-full bg-accent-gradient" />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-faint">
                {m.period}
              </span>
              <h4 className="mt-1.5 font-display text-xl font-semibold text-ink">{m.title}</h4>
              <p className="mt-2 max-w-xl leading-relaxed text-muted">{m.body}</p>
            </FadeUp>
          ))}
        </ol>
      </div>
    </Section>
  );
}
