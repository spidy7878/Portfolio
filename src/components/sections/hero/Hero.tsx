import { useRef } from "react";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiActivity,
  FiCheckCircle,
} from "react-icons/fi";
import { siteConfig, heroStats } from "@/config/site";
import { Button, ButtonLink } from "@/components/ui/Button";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Magnetic } from "@/components/anim/Magnetic";
import { TextReveal } from "@/components/anim/TextReveal";
import { FadeUp } from "@/components/anim/Reveal";
import { scrollToId } from "@/lib/scroll";
import { useHasFinePointer } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Lightweight premium hero — pure CSS/DOM. Depth comes from layered glass
 * cards, soft radial "orbs", a subtle CSS float, and pointer parallax driven by
 * two CSS variables (`--mx`/`--my`). No canvas, no rAF, no scroll listener.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const parallaxOn = finePointer && !reduced;

  const handleParallax = (e: React.PointerEvent<HTMLElement>) => {
    if (!parallaxOn || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width - 0.5;
    const my = (e.clientY - rect.top) / rect.height - 0.5;
    sectionRef.current.style.setProperty("--mx", mx.toFixed(3));
    sectionRef.current.style.setProperty("--my", my.toFixed(3));
  };

  const resetParallax = () => {
    sectionRef.current?.style.setProperty("--mx", "0");
    sectionRef.current?.style.setProperty("--my", "0");
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      onPointerMove={handleParallax}
      onPointerLeave={resetParallax}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-28 pb-20"
      style={{ ["--mx" as string]: 0, ["--my" as string]: 0 }}
    >
      {/* Hero-local soft glows (static radial gradients) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(36rem 28rem at 78% 30%, rgb(var(--accent) / 0.14), transparent 70%), radial-gradient(30rem 24rem at 60% 80%, rgb(var(--accent-violet) / 0.1), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---- Copy ---- */}
        <div>
          <FadeUp>
            <AvailabilityBadge label={siteConfig.availability} />
          </FadeUp>

          <h1 className="mt-7 max-w-2xl text-display-sm font-semibold leading-[1.02] text-ink lg:text-display-md">
            <TextReveal text="Full Stack Developer -" delay={0.15} />
            <br className="hidden sm:block" />
            <TextReveal
              text="From Idea to Production"
              delay={0.35}
              className="text-gradient text-[0.5em]"
            />
          </h1>

          <FadeUp
            delay={0.15}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted"
          >
            I'm {siteConfig.name} — {siteConfig.description}
          </FadeUp>

          <FadeUp
            delay={0.25}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <ButtonLink
                href={siteConfig.booking}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                className="h-12 px-7"
              >
                <span>Book a discovery call</span>
                <FiArrowUpRight />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <Button
                variant="secondary"
                size="md"
                className="h-12 px-7"
                onClick={() => scrollToId("#work")}
              >
                View selected work
              </Button>
            </Magnetic>
            <div className="ml-1 hidden sm:block">
              <SocialLinks />
            </div>
          </FadeUp>

          <FadeUp
            delay={0.35}
            as="dl"
            className="mt-16 grid max-w-2xl grid-cols-3 gap-3 border-t border-line/10 pt-8 sm:gap-6"
          >
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-lg font-semibold text-ink sm:text-2xl md:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[10px] leading-snug text-faint sm:text-xs md:text-sm">
                  {s.label}
                </dd>
              </div>
            ))}
          </FadeUp>
        </div>

        {/* ---- Visual: layered glass cards + floating orbs ---- */}
        <div className="relative hidden h-[30rem] lg:block" aria-hidden>
          {/* Orbs (radial gradients, gentle float, parallax via translate vars) */}
          <div
            className="absolute right-6 top-4 h-64 w-64 rounded-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgb(var(--accent) / 0.5), transparent 70%)",
              transform:
                "translate3d(calc(var(--mx) * 28px), calc(var(--my) * 28px), 0)",
              transition: "transform 0.35s ease-out",
            }}
          >
            <div className="floaty h-full w-full" />
          </div>
          <div
            className="absolute bottom-2 left-2 h-52 w-52 rounded-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgb(var(--accent-violet) / 0.45), transparent 70%)",
              transform:
                "translate3d(calc(var(--mx) * -22px), calc(var(--my) * -22px), 0)",
              transition: "transform 0.35s ease-out",
            }}
          />

          {/* Primary glass panel */}
          <div
            className="glass-strong absolute right-4 top-8 w-72 rounded-2xl p-5 shadow-soft"
            style={{
              transform:
                "translate3d(calc(var(--mx) * 18px), calc(var(--my) * 18px), 0)",
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow">Deployment</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                <FiCheckCircle size={12} /> Passing
              </span>
            </div>
            <div className="mt-4 space-y-2.5">
              {["Build", "Tests · 482", "Type-check", "Deploy · prod"].map(
                (row, i) => (
                  <div key={row} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="flex-1 text-sm text-muted">{row}</span>
                    <span className="font-mono text-[11px] text-faint">
                      {(0.8 + i * 0.4).toFixed(1)}s
                    </span>
                  </div>
                )
              )}
            </div>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-line/10">
              <div className="h-full w-full bg-accent-gradient" />
            </div>
          </div>

          {/* Secondary metric card */}
          <div
            className="glass absolute bottom-6 left-0 w-52 rounded-2xl p-5 shadow-soft"
            style={{
              transform:
                "translate3d(calc(var(--mx) * 34px), calc(var(--my) * 34px), 0)",
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="flex items-center gap-2 text-muted">
              <FiActivity size={14} className="text-accent" />
              <span className="text-xs uppercase tracking-wide">Uptime</span>
            </div>
            <div className="mt-2 font-display text-3xl font-semibold text-ink">
              99.9%
            </div>
            <div className="mt-3 flex items-end gap-1">
              {[10, 16, 12, 20, 14, 22, 18].map((h, i) => (
                <span
                  key={i}
                  className="w-2 rounded-sm bg-accent/40"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToId("#work")}
        aria-label="Scroll to work"
        data-cursor="hover"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <FiArrowDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
}
