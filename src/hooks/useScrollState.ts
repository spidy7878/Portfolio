import { useEffect, useState } from "react";

interface ScrollState {
  /** True when scrolling down past a threshold (for hide-on-scroll nav). */
  hidden: boolean;
  /** True once the page has scrolled away from the top. */
  scrolled: boolean;
}

/**
 * Tracks scroll direction/offset via a single passive listener, coalesced with
 * rAF so it runs at most once per frame and only while the user scrolls.
 * State updates only at threshold crossings, so React re-renders are rare.
 */
export function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({ hidden: false, scrolled: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const hidden = y > lastY && y > 240;
      const scrolled = y > 24;
      lastY = y;
      ticking = false;
      setState((prev) =>
        prev.hidden === hidden && prev.scrolled === scrolled ? prev : { hidden, scrolled },
      );
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}
