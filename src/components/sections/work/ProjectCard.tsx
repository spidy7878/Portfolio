import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/config/projects";
import { ProjectMockup } from "./ProjectMockup";

interface ProjectCardProps {
  project: Project;
}

/**
 * Premium work card. Hover lift + mockup zoom are pure CSS transitions (GPU
 * transform/opacity only). Whole card is a link to the case study.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/work/${project.slug}`}
      data-cursor="hover"
      aria-label={`View case study: ${project.title}`}
      className="card group relative flex flex-col overflow-hidden rounded-3xl p-3 transition-transform duration-500 ease-out-expo hover:-translate-y-1.5"
    >
      {/* Visual */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-xl object-cover"
              style={{ aspectRatio: "16 / 10" }}
            />
          ) : (
            <ProjectMockup gradient={project.gradient} variant="card" />
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-faint">
            {project.category}
          </span>
          <span className="text-xs text-faint">{project.year}</span>
        </div>

        <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.tagline}</p>

        {/* Metrics */}
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-line/10 pt-4">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-display text-base font-semibold text-ink">{m.value}</div>
              <div className="mt-0.5 text-[11px] leading-tight text-faint">{m.label}</div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-ink">
          <span className="border-b border-transparent transition-colors group-hover:border-accent">
            View case study
          </span>
          <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
