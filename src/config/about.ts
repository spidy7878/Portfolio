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
  { to: 4, suffix: "+", label: "Years building software" },
  { to: 20, suffix: "+", label: "Clients & collaborators" },
  { to: 4.9, decimals: 1, label: "Average client rating" },
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
    period: "B.Tech years",
    title: "Code before class",
    body: "While studying engineering, I taught myself to build real software — not just coursework, but production apps with actual users. The degree gave me fundamentals; freelancing gave me the rest.",
  },
  {
    period: "First clients",
    title: "Freelancing from university",
    body: "Still in my final years of B.Tech, I started taking on paid client work — turning briefs into shipped products. That early pressure to deliver for real people shaped everything about how I work.",
  },
  {
    period: "Founder partnerships",
    title: "Building with founders",
    body: "Started collaborating directly with startup founders — joining early, shaping the architecture, and owning delivery end to end. Learned to think in products and outcomes, not just tasks.",
  },
  {
    period: "SaaS & enterprise",
    title: "Complex systems at scale",
    body: "Went deep on multi-tenant SaaS, compliance platforms and enterprise business systems — domains where reliability and correctness aren't optional. Every decision has real consequences.",
  },
  {
    period: "Today",
    title: "Independent, worldwide",
    body: "Now working independently with agencies and clients across the world — solving hard enterprise problems, from architecture through to deployment, entirely on my own.",
  },
];
