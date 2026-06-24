import { Section } from "@/components/layout/Section";
import { FadeUp } from "@/components/anim/Reveal";
import { clients } from "@/config/clients";

/**
 * Logo wall rendered as monochrome text wordmarks in a hairline grid — muted by
 * default, brightening on hover. Swap text for SVG logos when available.
 */
export function Clients() {
  return (
    <Section id="clients" className="py-16 md:py-20">
      <FadeUp>
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-faint">
          Trusted by teams across industries
        </p>
      </FadeUp>

      <FadeUp delay={0.1} className="mt-10">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/[0.06] sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((name) => (
            <li
              key={name}
              data-cursor="hover"
              className="group grid place-items-center bg-canvas px-4 py-7 transition-colors hover:bg-surface/50"
            >
              <span className="font-display text-sm font-semibold tracking-tight text-faint transition-colors duration-300 group-hover:text-ink sm:text-base">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </FadeUp>
    </Section>
  );
}
