import { useState } from "react";
import { FiMenu, FiX, FiArrowUpRight, FiDownload } from "react-icons/fi";
import { navItems, siteConfig } from "@/config/site";
import { useScrollState } from "@/hooks/useScrollState";
import { useSectionNav } from "@/hooks/useSectionNav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
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
            <img
              src="/logo.png"
              alt={siteConfig.name}
              className="h-12 w-12 object-contain dark:invert"
            />
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
            <a
              href="/resume.pdf"
              download
              data-cursor="hover"
              className="hidden items-center gap-1.5 rounded-full border border-line/10 px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-ink sm:inline-flex"
            >
              <FiDownload size={14} />
              Resume
            </a>
            <ButtonLink
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                goTo("#contact");
              }}
              size="sm"
              className="hidden sm:inline-flex"
            >
              <span>Contact</span>
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

      {/* Mobile menu — slides down from top */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] flex flex-col rounded-b-[2rem] bg-canvas/90 backdrop-blur-2xl shadow-soft transition-[transform,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          menuOpen ? "visible translate-y-0" : "invisible -translate-y-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-2 pt-5">
          <button
            onClick={() => { setMenuOpen(false); goTop(); }}
            aria-label="Home"
          >
            <img
              src="/logo.png"
              alt={siteConfig.name}
              className="h-10 w-10 object-contain dark:invert"
            />
          </button>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-line/20 bg-surface/50 text-ink transition-colors hover:border-accent/30"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col px-6 py-4">
          {navItems.map((item) => (
            <li key={item.href} className="border-b border-line/10 last:border-0">
              <button
                onClick={() => goTo(item.href)}
                tabIndex={menuOpen ? 0 : -1}
                className="w-full py-4 text-left font-display text-2xl font-semibold text-ink/60 transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Book a Call */}
        <div className="px-5 pb-8 pt-3">
          <a
            href={siteConfig.booking}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            className="flex w-full items-center justify-center rounded-2xl bg-accent-gradient py-4 font-display text-base font-semibold text-white transition-opacity hover:opacity-90"
          >
            Book a Call
          </a>
        </div>
      </div>
    </>
  );
}
