/** Content for the About section — story, stats, principles, journey. */

export interface AboutStat {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface Principle {
  icon: "product" | "business" | "problem" | "ownership";
  title: string;
  body: string;
}

export interface Milestone {
  period: string;
  title: string;
  body: string;
}

export const aboutIntro =
  "I'm a full-stack engineer who treats software as a means to a business outcome — not an end in itself. Over the past several years I've taken products from a blank repository to production: shaping the architecture, designing the experience, writing the code and owning the deployment. I care about the same things my clients do — reliability, clarity and results.";

export const aboutStats: AboutStat[] = [
  { to: 8, suffix: "+", label: "Production platforms shipped" },
  { to: 6, suffix: "+", label: "Years building software" },
  { to: 20, suffix: "+", label: "Clients & collaborators" },
  { to: 99.9, decimals: 1, suffix: "%", label: "Uptime across deployments" },
];

export const principles: Principle[] = [
  {
    icon: "product",
    title: "Product thinking",
    body: "I start from the user and the outcome, then work back to the code — so what ships actually moves the metric that matters.",
  },
  {
    icon: "business",
    title: "Business understanding",
    body: "I speak in trade-offs and timelines, not just tickets. Scope, cost and ROI are part of every technical decision.",
  },
  {
    icon: "problem",
    title: "Problem solving",
    body: "Ambiguous, messy domains are where I do my best work — modelling the real world into systems that hold up.",
  },
  {
    icon: "ownership",
    title: "Ownership",
    body: "From architecture to monitoring, I take responsibility for the whole lifecycle — and for keeping it running.",
  },
];

export const journey: Milestone[] = [
  {
    period: "The start",
    title: "First production code",
    body: "Began building real applications for real users — and got hooked on shipping things people depend on.",
  },
  {
    period: "Going full-stack",
    title: "End-to-end engineering",
    body: "Grew from frontend into databases, APIs and infrastructure — owning features from UI to deployment.",
  },
  {
    period: "Freelancing",
    title: "Partnering with clients",
    body: "Started working directly with founders and businesses, translating goals into shipped software.",
  },
  {
    period: "Enterprise & ERP",
    title: "Complex business systems",
    body: "Took on compliance platforms, ERPs and inspection systems — high-stakes domains demanding rigour.",
  },
  {
    period: "SaaS & automation",
    title: "Scaling products",
    body: "Built multi-tenant SaaS, realtime systems and automation engines designed to scale and stay reliable.",
  },
  {
    period: "Today",
    title: "Your technical partner",
    body: "Available to architect and build enterprise-grade software for teams who want it done properly.",
  },
];
