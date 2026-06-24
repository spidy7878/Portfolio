import { useState } from "react";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiThreedotjs,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiSocketdotio,
  SiJavascript,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiSqlite,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiGithubactions,
  SiNginx,
  SiVercel,
  SiOpenai,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import {
  FiServer,
  FiGitMerge,
  FiDatabase,
  FiZap,
  FiDownloadCloud,
  FiLayers,
  FiGrid,
  FiActivity,
  FiTrendingUp,
  FiShield,
  FiCode,
} from "react-icons/fi";
import { Section, SectionHeading } from "@/components/layout/Section";
import { FadeUp } from "@/components/anim/Reveal";
import { skillCategories, type Skill } from "@/config/skills";
import { cn } from "@/lib/utils";

/** Maps a config `icon` key to a react-icons component. */
const iconMap: Record<string, IconType> = {
  react: SiReact,
  next: SiNextdotjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  three: SiThreedotjs,
  vite: SiVite,
  node: SiNodedotjs,
  express: SiExpress,
  graphql: SiGraphql,
  socket: SiSocketdotio,
  javascript: SiJavascript,
  python: SiPython,
  postgres: SiPostgresql,
  mysql: SiMysql,
  mongo: SiMongodb,
  redis: SiRedis,
  prisma: SiPrisma,
  sqlite: SiSqlite,
  gcp: SiGooglecloud,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  terraform: SiTerraform,
  actions: SiGithubactions,
  nginx: SiNginx,
  vercel: SiVercel,
  openai: SiOpenai,
  java: FaJava,
  aws: FaAws,
  server: FiServer,
  merge: FiGitMerge,
  database: FiDatabase,
  zap: FiZap,
  scrape: FiDownloadCloud,
  layers: FiLayers,
  grid: FiGrid,
  activity: FiActivity,
  trending: FiTrendingUp,
  shield: FiShield,
};

function SkillCard({ skill }: { skill: Skill }) {
  const Icon = iconMap[skill.icon] ?? FiCode;
  return (
    <div
      className="group card relative flex items-center gap-3 overflow-hidden rounded-xl p-4 transition-transform duration-300 ease-out-expo hover:-translate-y-1"
      style={{ ["--glow" as string]: skill.color }}
    >
      {/* Hover glow — brand-tinted radial, fades in only on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)", filter: "opacity(0.35)" }}
      />
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-line/[0.06] text-ink/80 transition-transform duration-300 group-hover:scale-110">
        <Icon size={20} />
      </span>
      <span className="relative text-sm font-medium text-ink">{skill.name}</span>
    </div>
  );
}

export function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const active = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];

  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Capabilities"
        title="A full-stack toolkit, deep where it counts."
        description="No vanity progress bars — just the technologies I reach for to design, build, ship and operate production software. Browse by domain."
      />

      {/* Category tabs */}
      <FadeUp className="mt-12">
        <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              data-cursor="hover"
              aria-pressed={cat.id === activeId}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                cat.id === activeId
                  ? "bg-ink text-canvas"
                  : "card text-muted hover:text-ink",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </FadeUp>

      {/* Active category blurb */}
      <p className="mt-8 text-lg text-muted">{active.blurb}</p>

      {/* Skill grid — remounts per category for a quick CSS fade-in */}
      <div
        key={active.id}
        className="mt-6 grid animate-fade-in grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        {active.skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </Section>
  );
}
