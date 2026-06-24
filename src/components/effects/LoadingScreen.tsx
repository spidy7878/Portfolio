import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  onComplete: () => void;
}

/**
 * Brief branded intro: logo fade + a CSS-animated progress bar, then the panel
 * slides up. No rAF counter, no Framer — just two timers and CSS transitions.
 * Skipped instantly under reduced motion.
 */
export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const reduced = usePrefersReducedMotion();
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      onComplete();
      return;
    }
    const tExit = setTimeout(() => setExiting(true), 700);
    const tDone = setTimeout(() => {
      setGone(true);
      onComplete();
    }, 1400);
    return () => {
      clearTimeout(tExit);
      clearTimeout(tDone);
    };
  }, [reduced, onComplete]);

  if (gone) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-canvas transition-transform duration-700 ease-[cubic-bezier(0.83,0,0.17,1)]",
        exiting ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="flex items-center gap-3 animate-fade-in">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-gradient font-display text-lg font-semibold text-white">
          {siteConfig.initials}
        </span>
        <span className="font-display text-2xl tracking-tight text-ink">{siteConfig.name}</span>
      </div>
      <div className="mt-10 h-px w-56 overflow-hidden bg-line/10">
        <div className="loader-bar h-full bg-accent-gradient" />
      </div>
    </div>
  );
}
