import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AmbientBackground } from "@/components/effects/AmbientBackground";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { LoadingScreen } from "@/components/effects/LoadingScreen";
import { HomePage } from "@/pages/HomePage";

// Command palette is the only Framer Motion consumer — lazy-load it so Framer
// stays out of the initial bundle and downloads on first ⌘K / open.
const CommandPalette = lazy(() =>
  import("@/components/effects/CommandPalette").then((m) => ({ default: m.CommandPalette })),
);

// Case-study pages are route-split so their code/content isn't in the landing bundle.
const CaseStudyPage = lazy(() =>
  import("@/pages/CaseStudyPage").then((m) => ({ default: m.CaseStudyPage })),
);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandMounted, setCommandMounted] = useState(false);

  const openCommand = useCallback(() => {
    setCommandMounted(true);
    setCommandOpen(true);
  }, []);

  // Global ⌘K / Ctrl+K toggle lives here so the shortcut works before the
  // palette has been mounted/downloaded.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandMounted(true);
        setCommandOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ThemeProvider>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Decorative layers (global) */}
      <AmbientBackground />
      <GrainOverlay />
      <CustomCursor />
      <ScrollProgress />

      {commandMounted && (
        <Suspense fallback={null}>
          <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
        </Suspense>
      )}

      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
      >
        Skip to content
      </a>

      <Navbar onOpenCommand={openCommand} />

      <main
        className={`relative z-10 transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </ThemeProvider>
  );
}
