import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiExternalLink,
  FiGithub,
  FiBookOpen,
} from "react-icons/fi";
import { getNextProject, getProject } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { FadeUp } from "@/components/anim/Reveal";
import { TextReveal } from "@/components/anim/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectMockup } from "@/components/sections/work/ProjectMockup";
import { useSectionNav } from "@/hooks/useSectionNav";

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;
  const { go } = useSectionNav();

  // Always start a case study from the top.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  if (!project) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <span className="eyebrow">404</span>
        <h1 className="mt-4 text-display-sm font-semibold text-ink">Project not found</h1>
        <p className="mt-4 text-muted">This case study doesn't exist or has moved.</p>
        <Link
          to="/"
          data-cursor="hover"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-canvas transition-transform hover:-translate-y-0.5"
        >
          <FiArrowLeft /> Back home
        </Link>
      </div>
    );
  }

  const next = getNextProject(project.slug);
  const [from, to] = project.gradient;

  // Treat "#" / empty as "no link yet" so placeholder buttons stay hidden.
  const isRealLink = (href?: string): href is string => !!href && href !== "#";
  const links = project.links ?? {};
  const hasLinks = isRealLink(links.live) || isRealLink(links.github) || isRealLink(links.docs);

  return (
    <article className="pt-28">
      {/* ---- Hero ---- */}
      <header className="mx-auto w-full max-w-5xl px-6">
        <FadeUp>
          <button
            onClick={() => go("#work")}
            data-cursor="hover"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <FiArrowLeft size={15} /> All work
          </button>
        </FadeUp>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs">
          <span
            className="rounded-full px-3 py-1 font-medium"
            style={{ background: `${from}1f`, color: from }}
          >
            {project.category}
          </span>
          <span className="text-faint">{project.year}</span>
        </div>

        <h1 className="mt-5 max-w-3xl text-display-sm font-semibold leading-[1.05] text-ink md:text-display-md">
          <TextReveal text={project.title} />
        </h1>
        <FadeUp delay={0.1} className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {project.tagline}
        </FadeUp>

        {/* Links (hidden until real URLs are provided) */}
        {hasLinks && (
          <FadeUp delay={0.15} className="mt-8 flex flex-wrap gap-3">
            {isRealLink(links.live) && (
              <ButtonLink href={links.live} target="_blank" rel="noreferrer" size="sm">
                <FiExternalLink /> Live demo
              </ButtonLink>
            )}
            {isRealLink(links.github) && (
              <ButtonLink
                href={links.github}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                size="sm"
              >
                <FiGithub /> Source
              </ButtonLink>
            )}
            {isRealLink(links.docs) && (
              <ButtonLink
                href={links.docs}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                size="sm"
              >
                <FiBookOpen /> Docs
              </ButtonLink>
            )}
          </FadeUp>
        )}
      </header>

      {/* Hero visual */}
      <FadeUp className="mx-auto mt-12 w-full max-w-5xl px-6">
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full rounded-2xl object-cover shadow-soft"
            style={{ aspectRatio: "16 / 9" }}
          />
        ) : (
          <ProjectMockup gradient={project.gradient} variant="hero" className="shadow-soft" />
        )}
      </FadeUp>

      {/* ---- Meta strip ---- */}
      <section className="mx-auto mt-16 w-full max-w-5xl px-6">
        <div className="grid gap-8 border-y border-line/10 py-8 sm:grid-cols-3">
          <div>
            <span className="eyebrow">Role</span>
            <ul className="mt-3 space-y-1">
              {project.role.map((r) => (
                <li key={r} className="text-sm text-ink">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow">Tech stack</span>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line/10 px-2.5 py-1 text-xs text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="eyebrow">Outcomes</span>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-display text-lg font-semibold text-ink">{m.value}</div>
                  <div className="text-[11px] leading-tight text-faint">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Problem / Solution ---- */}
      <section className="mx-auto mt-20 grid w-full max-w-5xl gap-12 px-6 md:grid-cols-2">
        <FadeUp>
          <span className="eyebrow">
            <span className="h-px w-6 bg-accent" /> The problem
          </span>
          <p className="mt-5 text-lg leading-relaxed text-muted">{project.problem}</p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <span className="eyebrow">
            <span className="h-px w-6 bg-accent" /> The solution
          </span>
          <p className="mt-5 text-lg leading-relaxed text-ink/90">{project.solution}</p>
        </FadeUp>
      </section>

      {/* ---- Architecture ---- */}
      <section className="mx-auto mt-24 w-full max-w-5xl px-6">
        <FadeUp>
          <h2 className="text-display-sm font-semibold text-ink">Architecture & approach</h2>
        </FadeUp>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/[0.06] sm:grid-cols-2">
          {project.architecture.map((point, i) => (
            <FadeUp key={i} delay={(i % 2) * 0.06} className="bg-canvas">
              <div className="flex h-full gap-4 p-6">
                <span
                  className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-xs font-semibold"
                  style={{ background: `${from}1f`, color: from }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-muted">{point}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ---- Key features ---- */}
      <section className="mx-auto mt-24 w-full max-w-5xl px-6">
        <FadeUp>
          <h2 className="text-display-sm font-semibold text-ink">Key features</h2>
        </FadeUp>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {project.features.map((f, i) => (
            <FadeUp key={f} delay={(i % 3) * 0.05}>
              <div className="card flex items-center gap-3 rounded-xl p-4">
                <span
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
                  style={{ background: `${from}1f`, color: from }}
                >
                  <FiCheck size={13} />
                </span>
                <span className="text-sm text-ink">{f}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ---- Challenges ---- */}
      <section className="mx-auto mt-24 w-full max-w-5xl px-6">
        <FadeUp>
          <h2 className="text-display-sm font-semibold text-ink">Challenges solved</h2>
        </FadeUp>
        <div className="mt-10 space-y-4">
          {project.challenges.map((c, i) => (
            <FadeUp key={c.title} delay={i * 0.05}>
              <div className="card rounded-2xl p-6 md:p-8">
                <h3 className="font-display text-lg font-semibold text-ink">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{c.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ---- Results ---- */}
      <section className="mx-auto mt-24 w-full max-w-5xl px-6">
        <FadeUp>
          <div
            className="relative overflow-hidden rounded-3xl border border-line/10 p-8 md:p-12"
            style={{ backgroundImage: `radial-gradient(28rem 18rem at 0% 0%, ${from}1a, transparent 70%)` }}
          >
            <h2 className="text-display-sm font-semibold text-ink">Results</h2>
            <ul className="mt-8 space-y-4">
              {project.results.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span
                    className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                    style={{ background: `${to}26`, color: to }}
                  >
                    <FiCheck size={12} />
                  </span>
                  <span className="text-lg leading-relaxed text-ink/90">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </section>

      {/* ---- Testimonial placeholder ---- */}
      <section className="mx-auto mt-24 w-full max-w-5xl px-6">
        <FadeUp>
          <figure className="card rounded-3xl p-8 text-center md:p-14">
            <div
              className="mx-auto h-10 w-10 rounded-full"
              style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
            />
            <blockquote className="mx-auto mt-6 max-w-2xl font-display text-xl leading-snug text-ink md:text-2xl">
              "Client testimonial coming soon — a short, specific quote about the outcome and what
              it was like to work together."
            </blockquote>
            <figcaption className="mt-6 text-sm text-faint">Client name · Role, Company</figcaption>
          </figure>
        </FadeUp>
      </section>

      {/* ---- Next project ---- */}
      <section className="mx-auto mt-24 w-full max-w-5xl px-6">
        <Link
          to={`/work/${next.slug}`}
          data-cursor="hover"
          className="group flex flex-col gap-6 rounded-3xl border border-line/10 p-8 transition-colors hover:bg-surface/40 md:flex-row md:items-center md:justify-between md:p-12"
        >
          <div>
            <span className="eyebrow">Next case study</span>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink md:text-3xl">
              {next.title}
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted">{next.tagline}</p>
          </div>
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink text-canvas transition-transform duration-300 group-hover:translate-x-1">
            <FiArrowRight size={22} />
          </span>
        </Link>
      </section>

      {/* ---- CTA ---- */}
      <section className="mx-auto mt-24 w-full max-w-5xl px-6">
        <div className="flex flex-col items-center gap-5 border-t border-line/10 py-16 text-center">
          <h2 className="max-w-xl text-display-sm font-semibold text-ink">
            Have a project like this in mind?
          </h2>
          <ButtonLink href={`mailto:${siteConfig.email}`} size="lg">
            <span>Start a conversation</span>
            <FiArrowUpRight />
          </ButtonLink>
        </div>
      </section>
    </article>
  );
}
