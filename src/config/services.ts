/** Service offerings — grouped from the full capability list into focused engagements. */

export interface Service {
  icon:
    | "saas"
    | "enterprise"
    | "automation"
    | "api"
    | "cloud"
    | "architecture";
  title: string;
  description: string;
  tags: string[];
  /** Render the card across two columns on large screens. */
  wide?: boolean;
}

export const services: Service[] = [
  {
    icon: "saas",
    title: "Full-Stack SaaS Development",
    description:
      "Multi-tenant products taken from blank repo to production — authentication, billing, dashboards and everything between, designed and engineered end to end.",
    tags: ["Multi-tenant", "Auth & RBAC", "Billing", "Dashboards", "Realtime"],
    wide: true,
  },
  {
    icon: "enterprise",
    title: "Enterprise Software & ERP",
    description:
      "Complex business systems — compliance, inventory, inspections and workflows — modelled accurately and built to be reliable and auditable.",
    tags: ["ERP", "Compliance", "Workflows"],
  },
  {
    icon: "automation",
    title: "Automation & Web Scraping",
    description:
      "Durable workflow engines, bots and data pipelines that replace manual work — with retries, logging and observability baked in.",
    tags: ["Workflows", "Scraping", "Bots", "Pipelines"],
  },
  {
    icon: "api",
    title: "API & Microservices",
    description:
      "Clean, documented APIs and event-driven services that integrate cleanly and scale independently.",
    tags: ["REST", "GraphQL", "Event-driven", "Integrations"],
  },
  {
    icon: "cloud",
    title: "Cloud & DevOps",
    description:
      "Deployment, CI/CD, infrastructure as code and monitoring — so shipping is boring and uptime is high.",
    tags: ["AWS", "Docker", "CI/CD", "Terraform", "Monitoring"],
  },
  {
    icon: "architecture",
    title: "Architecture & Consultation",
    description:
      "System design, scalability and security reviews, and hands-on technical advisory for teams who want a second pair of senior eyes.",
    tags: ["System design", "Scalability", "Security", "Advisory"],
    wide: true,
  },
];
