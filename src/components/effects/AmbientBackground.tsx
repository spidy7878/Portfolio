/**
 * Fixed atmospheric backdrop for the whole page. Built from *static* radial
 * gradients (inherently soft — no `filter: blur`, no animation) plus a faint
 * masked grid. Painted once; zero runtime cost.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Soft accent washes — radial gradients, not blurred elements */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(40rem 30rem at 12% 8%, rgb(var(--accent) / 0.12), transparent 70%), radial-gradient(38rem 30rem at 88% 42%, rgb(var(--accent-violet) / 0.1), transparent 70%)",
        }}
      />
      {/* Faint grid, masked to fade toward the edges */}
      <div
        className="absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--line)/0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--line)/0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
