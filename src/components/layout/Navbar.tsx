import { useState } from "react";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { navItems, siteConfig } from "@/config/site";
import { useScrollState } from "@/hooks/useScrollState";
import { useSectionNav } from "@/hooks/useSectionNav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenCommand: () => void;
}

export function Navbar({ onOpenCommand }: NavbarProps) {
  const { hidden, scrolled } = useScrollState();
  const { go, goTop } = useSectionNav();
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (href: string) => {
    setMenuOpen(false);
    go(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] flex justify-center px-4 pt-4",
          "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
          hidden && !menuOpen ? "-translate-y-[140%]" : "translate-y-0",
        )}
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500",
            scrolled ? "glass-strong shadow-soft" : "bg-transparent",
          )}
        >
          {/* Logo */}
          <button
            onClick={goTop}
            data-cursor="hover"
            className="flex items-center gap-2.5 pl-1"
            aria-label="Back to top"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-gradient font-display text-sm font-semibold text-white">
              {siteConfig.initials}
            </span>
            <span className="hidden font-display text-sm font-medium tracking-tight text-ink sm:block">
              {siteConfig.name}
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => goTo(item.href)}
                  data-cursor="hover"
                  className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:bg-surface/50 hover:text-ink"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCommand}
              data-cursor="hover"
              aria-label="Open command palette"
              className="glass hidden items-center gap-2 rounded-full px-3 py-2 text-xs text-faint transition-colors hover:text-ink md:flex"
            >
              <span>Search</span>
              <kbd className="rounded bg-line/10 px-1.5 py-0.5 font-mono text-[10px] text-muted">
                ⌘K
              </kbd>
            </button>
            <ThemeToggle />
            <ButtonLink
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                goTo("#contact");
              }}
              size="sm"
              className="hidden sm:inline-flex"
            >
              <span>Book a call</span>
              <FiArrowUpRight />
            </ButtonLink>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full text-ink lg:hidden"
            >
              <FiMenu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — CSS-only slide-in (solid bg, no backdrop-filter,
          visibility-gated so it isn't painted while closed) */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-0 z-[100] flex flex-col bg-canvas transition-[transform,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          menuOpen ? "visible translate-x-0" : "invisible translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <span className="font-display text-lg text-ink">{siteConfig.name}</span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="grid h-11 w-11 place-items-center rounded-full text-ink"
          >
            <FiX size={22} />
          </button>
        </div>
        <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => goTo(item.href)}
                tabIndex={menuOpen ? 0 : -1}
                className="font-display text-4xl tracking-tight text-ink transition-colors hover:text-accent"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-line/10 px-6 py-6">
          <SocialLinks />
          <ButtonLink href="#contact" onClick={() => goTo("#contact")} size="sm">
            Book a call
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
