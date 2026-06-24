import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useHasFinePointer } from "@/hooks/useMediaQuery";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Max pull toward the cursor in px. */
  strength?: number;
}

/**
 * Magnetic hover — pulls its child toward the cursor. Sets `transform`
 * directly on the node (no Framer, no rAF); a CSS transition smooths the
 * return. No-op on touch / coarse pointers.
 */
export function Magnetic({ children, className, strength = 16 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useHasFinePointer();

  if (!finePointer) return <div className={className}>{children}</div>;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - (rect.left + rect.width / 2)) / rect.width) * strength * 2;
    const y = ((e.clientY - (rect.top + rect.height / 2)) / rect.height) * strength * 2;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      className={cn("transition-transform duration-300 ease-out will-change-transform", className)}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </div>
  );
}
