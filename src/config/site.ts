/**
 * Single source of truth for site-wide content & metadata.
 * Edit copy here rather than inside components.
 *
 * ▼▼▼ DROP REAL DATA HERE ▼▼▼ — the values most worth replacing are grouped at
 * the top so you only edit in one place.
 */

// ── Identity ────────────────────────────────────────────────────────────────
const NAME = "Mohammed Anas";
const EMAIL = "anasmd021@gmail.com";

// ── Links (TODO: replace placeholders with real URLs) ─────────────────────────
const GITHUB_URL = "https://github.com/"; // TODO: https://github.com/<you>
const LINKEDIN_URL = "https://linkedin.com/in/"; // TODO: https://linkedin.com/in/<you>

/** WhatsApp number — digits only, including country code, NO "+" or spaces. */
const WHATSAPP_NUMBER = "0000000000"; // TODO: e.g. "447700900123"
/** Prefilled message opened when someone taps "Message on WhatsApp". */
const WHATSAPP_PREFILL = "Hi Anas, I'd like to discuss a project.";

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const WHATSAPP_BOOKING_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_PREFILL,
)}`;

export const siteConfig = {
  name: NAME,
  shortName: "Anas",
  initials: "MA",
  role: "Full-Stack Engineer & SaaS Architect",
  tagline: "I design and engineer enterprise-grade software that businesses trust.",
  description:
    "I partner with founders and teams to ship enterprise-grade SaaS platforms, automation systems, cloud-native applications and AI-powered products — from architecture to pixel.",
  email: EMAIL,
  location: "Available worldwide · Remote",
  availability: "Available for new projects",
  /** Where "Book a call" actions point (set to WhatsApp). */
  booking: WHATSAPP_BOOKING_LINK,
  whatsapp: WHATSAPP_LINK,
} as const;

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "whatsapp" | "mail" | "x";
}

export const socials: SocialLink[] = [
  { label: "GitHub", href: GITHUB_URL, icon: "github" },
  { label: "LinkedIn", href: LINKEDIN_URL, icon: "linkedin" },
  { label: "WhatsApp", href: WHATSAPP_LINK, icon: "whatsapp" },
  { label: "Email", href: `mailto:${EMAIL}`, icon: "mail" },
];

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

/** Headline stats surfaced in the hero / about strip. */
export const heroStats: { value: string; label: string }[] = [
  { value: "8+", label: "Production platforms shipped" },
  { value: "5★", label: "Average client rating" },
  { value: "99.9%", label: "Uptime across deployments" },
];
