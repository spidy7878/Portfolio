import type { IconType } from "react-icons";
import {
  FiSearch,
  FiPenTool,
  FiCode,
  FiCheckCircle,
  FiUploadCloud,
  FiLifeBuoy,
} from "react-icons/fi";
import { Section, SectionHeading } from "@/components/layout/Section";
import { FadeUp } from "@/components/anim/Reveal";
import { processSteps, type ProcessStep } from "@/config/process";

const stepIcons: Record<ProcessStep["icon"], IconType> = {
  discovery: FiSearch,
  design: FiPenTool,
  build: FiCode,
  test: FiCheckCircle,
  deploy: FiUploadCloud,
  support: FiLifeBuoy,
};

export function Process() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Process"
        title="From discovery to long-term support."
        description="A transparent, milestone-driven way of working — so you always know where the project stands and what comes next."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step, i) => {
          const Icon = stepIcons[step.icon];
          return (
            <FadeUp key={step.title} delay={(i % 3) * 0.07}>
              <div className="card group relative h-full overflow-hidden rounded-2xl p-7">
                {/* Watermark step number */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-bold text-line/[0.05] transition-colors duration-500 group-hover:text-line/[0.08]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon size={20} />
                </span>

                <div className="relative mt-5">
                  <span className="text-xs font-medium uppercase tracking-[0.16em] text-faint">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 font-display text-xl font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>

                <div className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-line/10 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-gradient" />
                  <span className="text-xs text-muted">{step.deliverable}</span>
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </Section>
  );
}
