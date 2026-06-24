import type { IconType } from "react-icons";
import { FiLayers, FiServer, FiZap, FiShare2, FiCloud, FiCompass } from "react-icons/fi";
import { Section, SectionHeading } from "@/components/layout/Section";
import { FadeUp } from "@/components/anim/Reveal";
import { services, type Service } from "@/config/services";

const serviceIcons: Record<Service["icon"], IconType> = {
  saas: FiLayers,
  enterprise: FiServer,
  automation: FiZap,
  api: FiShare2,
  cloud: FiCloud,
  architecture: FiCompass,
};

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title="How I can help your team ship."
        description="Whether you need a product built from scratch or a senior partner to strengthen an existing system, here's where I add the most value."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = serviceIcons[service.icon];
          return (
            <FadeUp key={service.title} delay={(i % 3) * 0.07}>
              <div className="card group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-transform duration-500 ease-out-expo hover:-translate-y-1.5">
                {/* Top accent line — grows on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent-gradient transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
                />

                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon size={19} />
                  </span>
                  <span className="font-mono text-xs text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line/10 px-2.5 py-1 text-[11px] text-faint"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </Section>
  );
}
