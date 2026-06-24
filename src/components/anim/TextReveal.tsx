import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Stagger between words (seconds). */
  stagger?: number;
  delay?: number;
  once?: boolean;
}

/**
 * Word-by-word "curtain" reveal — each word rises out of a clipped line.
 * Entirely CSS (transform + transition-delay); IntersectionObserver only flips
 * the `.is-visible` class once.
 */
export function TextReveal({
  text,
  className,
  stagger = 0.05,
  delay = 0,
  once = true,
}: TextRevealProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once });
  const words = text.split(" ");

  return (
    <span
      ref={ref}
      className={cn("tr inline", inView && "is-visible", className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="tr-word" aria-hidden>
          <span className="tr-inner" style={{ transitionDelay: `${delay + i * stagger}s` }}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
