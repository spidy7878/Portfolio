import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/anim/Reveal";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  /** Removes default vertical padding when composing custom layouts. */
  flush?: boolean;
}

/** Consistent page section: max width, generous vertical rhythm, anchor id. */
export function Section({ id, className, children, flush }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-6xl px-6",
        !flush && "py-24 md:py-32 lg:py-40",
        className,
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <FadeUp
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <span className="eyebrow">
        <span className="h-px w-6 bg-accent" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-display-sm font-semibold text-ink md:text-display-md">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>
      )}
    </FadeUp>
  );
}
