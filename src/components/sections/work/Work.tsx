import { Section, SectionHeading } from "@/components/layout/Section";
import { FadeUp } from "@/components/anim/Reveal";
import { featuredProjects } from "@/config/projects";
import { ProjectCard } from "./ProjectCard";

/** Featured work — the most important section for converting clients. */
export function Work() {
  return (
    <Section id="work">
      <SectionHeading
        eyebrow="Selected Work"
        title="Products, not just projects."
        description="A selection of platforms I've architected and shipped end to end — each one a real product with measurable outcomes. Open any card for the full case study."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <FadeUp key={project.slug} delay={(i % 2) * 0.08}>
            <ProjectCard project={project} />
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
