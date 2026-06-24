import { useEffect, useRef } from "react";

/**
 * Thin accent progress bar. Updates a single `scaleX` transform from a passive
 * scroll listener (rAF-coalesced) — no Framer, no layout thrash.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? doc.scrollTop / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-accent-gradient"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
