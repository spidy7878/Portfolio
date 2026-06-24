/**
 * Native, dependency-free smooth scrolling. Relies on CSS `scroll-behavior`
 * and `scroll-padding-top` (set in index.css) so there is no JS scroll loop.
 */
export function scrollToId(id: string): void {
  const selector = id.startsWith("#") ? id : `#${id}`;
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ block: "start" });
}

/** Scroll back to the very top. */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, left: 0 });
}
