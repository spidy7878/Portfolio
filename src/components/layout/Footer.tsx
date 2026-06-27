import { FiArrowUpRight } from "react-icons/fi";
import { navItems, siteConfig } from "@/config/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { useSectionNav } from "@/hooks/useSectionNav";

export function Footer() {
  const year = new Date().getFullYear();
  const { go: goTo } = useSectionNav();

  return (
    <footer className="relative z-10 mt-20 border-t border-line/10">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Brand + CTA */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt={siteConfig.name}
                className="h-24 w-24 object-contain dark:invert"
              />
              <span className="font-display text-lg tracking-tight text-ink">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">{siteConfig.tagline}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              data-cursor="hover"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink"
            >
              <span className="border-b border-line/20 pb-0.5 transition-colors group-hover:border-accent">
                {siteConfig.email}
              </span>
              <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <nav className="flex flex-col gap-3">
              <span className="eyebrow mb-1">Explore</span>
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => goTo(item.href)}
                  data-cursor="hover"
                  className="text-left text-sm text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <span className="eyebrow mb-1">Connect</span>
              <span className="text-sm text-muted">{siteConfig.location}</span>
              <div className="-ml-2.5">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line/10 pt-8 text-xs text-faint sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name}. Designed & engineered end to end.
          </p>
          <p className="font-mono">Built with React · Three.js · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
