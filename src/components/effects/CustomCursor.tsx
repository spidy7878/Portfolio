import { useEffect, useRef } from "react";
import { useHasFinePointer } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Two-part custom cursor: an instant dot and a trailing ring. The trail comes
 * from a CSS `transition` on the ring — NOT a rAF lerp loop — so the only work
 * per mouse move is writing two transforms. Hover state is toggled via a data
 * attribute (no React re-render). Interactive targets opt in with
 * `data-cursor="hover" | "text"` (+ optional `data-cursor-label`).
 */
export function CustomCursor() {
  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = finePointer && !reduced;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;
    document.body.dataset.customCursor = "true";
    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMove = (e: PointerEvent) => {
      const t = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (dot) dot.style.transform = t;
      if (ring) ring.style.transform = t;
      if (ring && ring.style.opacity !== "1") {
        ring.style.opacity = "1";
        if (dot) dot.style.opacity = "1";
      }
    };

    const onOver = (e: PointerEvent) => {
      if (!ring) return;
      const hit = (e.target as Element | null)?.closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea, label",
      );
      const mode = hit?.dataset.cursor;
      ring.dataset.state = !hit ? "default" : mode === "text" ? "text" : "hover";
      if (mode === "text" && labelRef.current) {
        labelRef.current.textContent = hit?.dataset.cursorLabel ?? "";
      }
    };

    const onLeave = () => {
      if (ring) ring.style.opacity = "0";
      if (dot) dot.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      delete document.body.dataset.customCursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
      {/* Dot: top-left anchored, centered via -50% margins; transform sets position */}
      <div
        ref={dotRef}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-200"
      />
      {/* Ring: CSS transition on transform creates the trailing lag */}
      <div
        ref={ringRef}
        data-state="default"
        className="group absolute -ml-4 -mt-4 grid h-8 w-8 place-items-center rounded-full border border-line/30 opacity-0 transition-[transform,width,height,background-color,border-color,margin,opacity] duration-200 ease-out data-[state=hover]:-ml-6 data-[state=hover]:-mt-6 data-[state=hover]:h-12 data-[state=hover]:w-12 data-[state=hover]:border-accent/40 data-[state=hover]:bg-accent/10 data-[state=text]:-ml-8 data-[state=text]:-mt-8 data-[state=text]:h-16 data-[state=text]:w-16 data-[state=text]:border-transparent data-[state=text]:bg-ink/90"
        style={{ transitionDuration: "200ms, 300ms, 300ms, 300ms, 300ms, 300ms, 200ms" }}
      >
        <span
          ref={labelRef}
          className="text-[10px] font-medium uppercase tracking-wide text-canvas opacity-0 group-data-[state=text]:opacity-100"
        />
      </div>
    </div>
  );
}
