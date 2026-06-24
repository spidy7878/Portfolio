import { type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

type Variant = "up" | "down" | "left" | "right" | "scale" | "fade";

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  /** Delay in seconds (drives `transition-delay` via CSS var). */
  delay?: number;
  once?: boolean;
  /** Render element (semantic wrapper). Defaults to div. */
  as?: ElementType;
}

/**
 * The single reveal primitive. Pure CSS transition (opacity + transform)
 * toggled by IntersectionObserver — no Framer, no scroll listener.
 *
 * Prefer the named helpers below (`<FadeUp/>`, etc.) at call sites.
 */
export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  once = true,
  as,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ once });
  const Tag = (as ?? "div") as ElementType;

  const style = delay ? ({ "--anim-delay": `${delay}s` } as CSSProperties) : undefined;

  return (
    <Tag
      ref={ref}
      className={cn("anim", inView && "is-visible", className)}
      data-variant={variant === "fade" ? undefined : variant}
      style={style}
    >
      {children}
    </Tag>
  );
}

type HelperProps = Omit<RevealProps, "variant">;

export const FadeUp = (props: HelperProps) => <Reveal variant="up" {...props} />;
export const FadeIn = (props: HelperProps) => <Reveal variant="fade" {...props} />;
export const ScaleIn = (props: HelperProps) => <Reveal variant="scale" {...props} />;
export const SlideLeft = (props: HelperProps) => <Reveal variant="left" {...props} />;
export const SlideRight = (props: HelperProps) => <Reveal variant="right" {...props} />;
