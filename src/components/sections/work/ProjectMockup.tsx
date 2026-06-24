import { cn } from "@/lib/utils";

interface ProjectMockupProps {
  gradient: [string, string];
  /** Compact variant for cards; full variant for the case-study hero. */
  variant?: "card" | "hero";
  className?: string;
}

/**
 * A generated, image-free "product" visual — a stylised dashboard frame tinted
 * by the project's gradient. Pure CSS/SVG so there are no screenshots to load
 * and it adapts to dark/light automatically.
 */
export function ProjectMockup({ gradient, variant = "card", className }: ProjectMockupProps) {
  const [from, to] = gradient;
  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-line/10 bg-surface/40",
        className,
      )}
      style={{ aspectRatio: isHero ? "16 / 9" : "16 / 10" }}
      aria-hidden
    >
      {/* Ambient tint */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: `radial-gradient(120% 80% at 100% 0%, ${from}22, transparent 60%), radial-gradient(120% 80% at 0% 100%, ${to}22, transparent 60%)`,
        }}
      />

      {/* Window chrome */}
      <div className="relative flex items-center gap-1.5 border-b border-line/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-line/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-line/15" />
        <span className="ml-3 h-4 w-40 rounded-full bg-line/[0.07]" />
      </div>

      {/* Body: sidebar + content */}
      <div className="relative flex gap-3 p-4">
        {/* Sidebar */}
        <div className="hidden w-1/4 shrink-0 space-y-2 sm:block">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-3 rounded-full"
              style={{
                width: `${90 - i * 12}%`,
                background: i === 0 ? `linear-gradient(90deg, ${from}, ${to})` : "rgb(var(--line) / 0.07)",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          {/* Stat row */}
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg border border-line/10 bg-canvas/40 p-2.5">
                <div className="h-2 w-2/3 rounded-full bg-line/[0.08]" />
                <div
                  className="mt-2 h-3 w-1/2 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
                />
              </div>
            ))}
          </div>
          {/* Chart */}
          <div className="rounded-lg border border-line/10 bg-canvas/40 p-3">
            <div className="flex items-end gap-1.5" style={{ height: isHero ? 88 : 56 }}>
              {[40, 62, 48, 78, 56, 88, 70, 96, 64].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(180deg, ${from}, ${to})`,
                    opacity: 0.35 + (i / 9) * 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
