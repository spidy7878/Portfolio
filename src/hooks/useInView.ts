import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Stop observing after the first reveal (default true). */
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

/**
 * Lightweight IntersectionObserver hook — the backbone of the CSS reveal
 * system. No scroll listeners, no rAF; the observer fires only when the
 * element crosses the viewport threshold.
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {},
) {
  const { once = true, rootMargin = "0px 0px -12% 0px", threshold = 0.15 } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
