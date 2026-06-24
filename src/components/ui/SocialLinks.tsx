import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { socials, type SocialLink } from "@/config/site";
import { cn } from "@/lib/utils";

const iconMap: Record<SocialLink["icon"], IconType> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  whatsapp: FaWhatsapp,
  mail: FiMail,
  x: FaXTwitter,
};

interface SocialLinksProps {
  className?: string;
  size?: number;
}

export function SocialLinks({ className, size = 18 }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {socials.map((s) => {
        const Icon = iconMap[s.icon];
        return (
          <li key={s.label}>
            <a
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              aria-label={s.label}
              data-cursor="hover"
              className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface/60 hover:text-ink"
            >
              <Icon size={size} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
