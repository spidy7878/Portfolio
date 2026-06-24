/** Engagement process — how a project moves from idea to ongoing support. */

export interface ProcessStep {
  icon: "discovery" | "design" | "build" | "test" | "deploy" | "support";
  title: string;
  description: string;
  /** Short tag for what you walk away with after this phase. */
  deliverable: string;
}

export const processSteps: ProcessStep[] = [
  {
    icon: "discovery",
    title: "Discovery & Planning",
    description:
      "We align on goals, users, scope and constraints. I research the domain and turn it into a clear, prioritised plan.",
    deliverable: "Scope & roadmap",
  },
  {
    icon: "design",
    title: "Architecture & Design",
    description:
      "I design the system architecture, data model and interface — the decisions that make everything afterwards cheaper.",
    deliverable: "Architecture & wireframes",
  },
  {
    icon: "build",
    title: "Development",
    description:
      "Iterative, transparent delivery in milestones. You see working software early and often, never a black box.",
    deliverable: "Shippable increments",
  },
  {
    icon: "test",
    title: "Testing & QA",
    description:
      "Automated tests, edge-case hunting and performance checks so what ships is correct, fast and accessible.",
    deliverable: "Verified quality",
  },
  {
    icon: "deploy",
    title: "Deployment",
    description:
      "CI/CD pipelines, infrastructure as code and monitoring — a release process that's repeatable and observable.",
    deliverable: "Live & monitored",
  },
  {
    icon: "support",
    title: "Maintenance & Support",
    description:
      "Ongoing improvements, monitoring and a dependable point of contact long after launch.",
    deliverable: "Long-term partnership",
  },
];
