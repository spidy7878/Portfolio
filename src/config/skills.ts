/**
 * Skills grouped by domain. `icon` is a key resolved to a react-icons
 * component in Skills.tsx; `color` is the brand hue used for the hover glow.
 */

export interface Skill {
  name: string;
  icon: string;
  color: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  blurb: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Interfaces that feel fast, accessible and considered.",
    skills: [
      { name: "React", icon: "react", color: "#61dafb" },
      { name: "Next.js", icon: "next", color: "#ffffff" },
      { name: "TypeScript", icon: "typescript", color: "#3178c6" },
      { name: "Tailwind CSS", icon: "tailwind", color: "#38bdf8" },
      { name: "Three.js", icon: "three", color: "#ffffff" },
      { name: "Vite", icon: "vite", color: "#9b6bff" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "APIs and services built for reliability and scale.",
    skills: [
      { name: "Node.js", icon: "node", color: "#5fa04e" },
      { name: "Express", icon: "express", color: "#ffffff" },
      { name: "GraphQL", icon: "graphql", color: "#e535ab" },
      { name: "REST APIs", icon: "server", color: "#5b8cff" },
      { name: "WebSockets", icon: "socket", color: "#ffffff" },
      { name: "Queues / Jobs", icon: "merge", color: "#5b8cff" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    blurb: "Fluent across the stack and the paradigms that fit the job.",
    skills: [
      { name: "TypeScript", icon: "typescript", color: "#3178c6" },
      { name: "JavaScript", icon: "javascript", color: "#f7df1e" },
      { name: "Python", icon: "python", color: "#3776ab" },
      { name: "Java", icon: "java", color: "#f89820" },
      { name: "SQL", icon: "database", color: "#5b8cff" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    blurb: "Modelling data so it stays correct as systems grow.",
    skills: [
      { name: "PostgreSQL", icon: "postgres", color: "#4169e1" },
      { name: "MySQL", icon: "mysql", color: "#4479a1" },
      { name: "MongoDB", icon: "mongo", color: "#47a248" },
      { name: "Redis", icon: "redis", color: "#ff4438" },
      { name: "Prisma", icon: "prisma", color: "#ffffff" },
      { name: "SQLite", icon: "sqlite", color: "#0f80cc" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    blurb: "Shipping and operating software with confidence.",
    skills: [
      { name: "AWS", icon: "aws", color: "#ff9900" },
      { name: "Google Cloud", icon: "gcp", color: "#4285f4" },
      { name: "Docker", icon: "docker", color: "#2496ed" },
      { name: "Kubernetes", icon: "kubernetes", color: "#326ce5" },
      { name: "Terraform", icon: "terraform", color: "#7b42bc" },
      { name: "GitHub Actions", icon: "actions", color: "#2088ff" },
      { name: "Nginx", icon: "nginx", color: "#009639" },
      { name: "Vercel", icon: "vercel", color: "#ffffff" },
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    blurb: "Putting models and automation to work on real problems.",
    skills: [
      { name: "OpenAI APIs", icon: "openai", color: "#10a37f" },
      { name: "Automation", icon: "zap", color: "#f5b400" },
      { name: "Web Scraping", icon: "scrape", color: "#5b8cff" },
      { name: "Workflows", icon: "merge", color: "#9b6bff" },
    ],
  },
  {
    id: "architecture",
    label: "Architecture",
    blurb: "Designing systems that stay simple under pressure.",
    skills: [
      { name: "System Design", icon: "layers", color: "#5b8cff" },
      { name: "Microservices", icon: "grid", color: "#9b6bff" },
      { name: "Event-Driven", icon: "activity", color: "#5b8cff" },
      { name: "Scalability", icon: "trending", color: "#10a37f" },
      { name: "Security", icon: "shield", color: "#f5b400" },
      { name: "API Design", icon: "server", color: "#5b8cff" },
    ],
  },
];
