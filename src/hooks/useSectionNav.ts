import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToId, scrollToTop } from "@/lib/scroll";

/**
 * Navigates to an on-page section. If we're already on the home route it
 * smooth-scrolls; otherwise it routes home with the hash so HomePage can scroll
 * once mounted. Returns `{ go, goTop }`.
 */
export function useSectionNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  const go = useCallback(
    (href: string) => {
      const hash = href.startsWith("#") ? href : `#${href}`;
      if (onHome) scrollToId(hash);
      else navigate(`/${hash}`);
    },
    [onHome, navigate],
  );

  const goTop = useCallback(() => {
    if (onHome) scrollToTop();
    else navigate("/");
  }, [onHome, navigate]);

  return { go, goTop };
}
