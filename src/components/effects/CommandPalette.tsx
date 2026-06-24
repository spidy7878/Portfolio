import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiBriefcase,
  FiMail,
  FiMoon,
  FiSearch,
  FiSun,
  FiUser,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { navItems, siteConfig } from "@/config/site";
import { useTheme } from "@/providers/ThemeProvider";
import { useSectionNav } from "@/hooks/useSectionNav";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Command {
  id: string;
  label: string;
  hint?: string;
  icon: IconType;
  run: () => void;
}

const sectionIcons: Record<string, IconType> = {
  "#work": FiBriefcase,
  "#about": FiUser,
};

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const { theme, toggleTheme } = useTheme();
  const { go } = useSectionNav();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const navTo = (href: string) => {
    onOpenChange(false);
    go(href);
  };

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = navItems.map((n) => ({
      id: `nav-${n.href}`,
      label: `Go to ${n.label}`,
      hint: "Section",
      icon: sectionIcons[n.href] ?? FiArrowRight,
      run: () => navTo(n.href),
    }));
    const actions: Command[] = [
      {
        id: "theme",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
        hint: "Appearance",
        icon: theme === "dark" ? FiSun : FiMoon,
        run: () => {
          toggleTheme();
          onOpenChange(false);
        },
      },
      {
        id: "email",
        label: "Copy email address",
        hint: siteConfig.email,
        icon: FiMail,
        run: () => {
          navigator.clipboard?.writeText(siteConfig.email);
          onOpenChange(false);
        },
      },
      {
        id: "call",
        label: "Message me on WhatsApp",
        hint: "WhatsApp",
        icon: FaWhatsapp,
        run: () => {
          window.open(siteConfig.booking, "_blank");
          onOpenChange(false);
        },
      },
    ];
    return [...nav, ...actions];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q),
    );
  }, [commands, query]);

  // Escape closes the palette (⌘K toggle is owned by App so it works pre-mount).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenChange]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-start justify-center px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <div className="absolute inset-0 bg-canvas/60 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong relative w-full max-w-xl overflow-hidden rounded-2xl shadow-soft"
          >
            <div className="flex items-center gap-3 border-b border-line/10 px-4">
              <FiSearch className="text-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections and actions…"
                className="h-14 w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint"
              />
              <kbd className="rounded bg-line/10 px-1.5 py-0.5 font-mono text-[10px] text-faint">
                ESC
              </kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-faint">No results</li>
              )}
              {filtered.map((c, i) => {
                const Icon = c.icon;
                return (
                  <li key={c.id}>
                    <button
                      onClick={c.run}
                      onMouseEnter={() => setActive(i)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        i === active ? "bg-line/[0.07] text-ink" : "text-muted"
                      }`}
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-line/[0.06]">
                        <Icon size={15} />
                      </span>
                      <span className="flex-1">{c.label}</span>
                      {c.hint && <span className="text-xs text-faint">{c.hint}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
