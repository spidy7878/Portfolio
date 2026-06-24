import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/sections/hero/Hero";
import { Work } from "@/components/sections/work/Work";
import { About } from "@/components/sections/about/About";
import { Skills } from "@/components/sections/skills/Skills";
import { Services } from "@/components/sections/services/Services";
import { Process } from "@/components/sections/process/Process";
import { Testimonials } from "@/components/sections/testimonials/Testimonials";
import { Clients } from "@/components/sections/clients/Clients";
import { Contact } from "@/components/sections/contact/Contact";
import { scrollToId } from "@/lib/scroll";

/** The single-page home composition. */
export function HomePage() {
  const { hash } = useLocation();

  // When arriving with a hash (e.g. routed home from a case study), scroll to
  // the target section once mounted.
  useEffect(() => {
    if (hash) {
      const id = hash;
      requestAnimationFrame(() => scrollToId(id));
    }
  }, [hash]);

  return (
    <>
      <Hero />

      <Work />

      <About />

      <Skills />

      <Services />

      <Process />

      <Testimonials />

      <Clients />

      <Contact />
    </>
  );
}
