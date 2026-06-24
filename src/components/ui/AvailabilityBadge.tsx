import { cn } from "@/lib/utils";

interface AvailabilityBadgeProps {
  label: string;
  className?: string;
}

/** Glassy pill with a softly pulsing status dot. */
export function AvailabilityBadge({ label, className }: AvailabilityBadgeProps) {
  return (
    <div
      className={cn(
        "glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm text-muted",
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="font-medium text-ink/90">{label}</span>
    </div>
  );
}
