/**
 * Featured projects — single source of truth for both the Work grid and the
 * dedicated case-study pages. Content is realistic placeholder copy; swap in
 * real metrics, links and screenshots when available.
 */

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Challenge {
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Short domain label, e.g. "Healthcare SaaS". */
  category: string;
  year: string;
  /** One-line hook used on the card + case-study hero. */
  tagline: string;
  /** Card paragraph. */
  summary: string;
  /** Two-stop gradient (hex) used for the generated mockup + accents. */
  gradient: [string, string];
  role: string[];
  stack: string[];
  metrics: ProjectMetric[];
  // ---- Case-study deep content ----
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  challenges: Challenge[];
  results: string[];
  links?: { live?: string; github?: string; docs?: string };
  /** Surface on the home grid. */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "hipaa-compliance-saas",
    title: "Enterprise HIPAA Compliance SaaS",
    category: "Healthcare SaaS",
    year: "2024",
    tagline: "Audit-ready compliance automation for healthcare providers.",
    summary:
      "A multi-tenant platform that continuously monitors, documents and proves HIPAA compliance — turning a months-long audit scramble into a live dashboard.",
    gradient: ["#3b6fff", "#7b5bff"],
    role: ["System Architecture", "Full-Stack", "Security", "DevOps"],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS", "Terraform"],
    metrics: [
      { label: "Audit prep time", value: "−86%" },
      { label: "Tenants onboarded", value: "40+" },
      { label: "Uptime", value: "99.98%" },
    ],
    problem:
      "Healthcare providers were managing HIPAA compliance through scattered spreadsheets and email threads. Audits took months, evidence was impossible to trace, and a single missed control could mean six-figure fines.",
    solution:
      "I designed a multi-tenant SaaS that maps every regulatory control to live evidence collected from connected systems. Automated policy workflows, role-scoped access and an immutable audit log mean providers can produce a complete, defensible compliance picture on demand.",
    architecture: [
      "Multi-tenant PostgreSQL with row-level security for hard data isolation between providers.",
      "Event-driven evidence pipeline (queue + workers) that ingests system signals and timestamps them into an append-only audit ledger.",
      "Stateless Node API behind an application load balancer; Redis for sessions, rate limiting and caching.",
      "Infrastructure as code with Terraform; isolated staging/prod accounts and least-privilege IAM.",
    ],
    features: [
      "Control-to-evidence mapping with real-time status",
      "Granular role-based access (RBAC) per tenant",
      "Immutable, exportable audit trail",
      "Automated policy review & attestation workflows",
      "Encrypted document vault",
    ],
    challenges: [
      {
        title: "Strict data isolation",
        body: "Tenant data could never leak across boundaries. I enforced isolation at the database layer with row-level security plus tenant-scoped query guards in the API, verified by an automated test suite.",
      },
      {
        title: "Provable audit integrity",
        body: "Auditors must trust the log. I used an append-only ledger with hash-chained entries so any tampering is detectable.",
      },
    ],
    results: [
      "Cut audit preparation time by ~86% across pilot providers.",
      "Onboarded 40+ tenants on shared infrastructure with zero isolation incidents.",
      "Sustained 99.98% uptime over the first year.",
    ],
    links: { live: "#", github: "#", docs: "#" },
    featured: true,
  },
  {
    slug: "restaurant-pos-saas",
    title: "Restaurant POS SaaS",
    category: "Point of Sale",
    year: "2024",
    tagline: "Offline-first point of sale that never drops a ticket.",
    summary:
      "A cloud POS for multi-location restaurants with real-time orders, kitchen displays and analytics — built offline-first so service continues even when the internet doesn't.",
    gradient: ["#ff7a59", "#ff4f9a"],
    role: ["Product Engineering", "Full-Stack", "Realtime"],
    stack: ["React", "TypeScript", "Node.js", "WebSockets", "SQLite", "PostgreSQL", "Docker"],
    metrics: [
      { label: "Order latency", value: "<120ms" },
      { label: "Offline uptime", value: "100%" },
      { label: "Locations", value: "60+" },
    ],
    problem:
      "Restaurants were losing orders and revenue whenever their connection dropped, and head office had no real-time view across locations.",
    solution:
      "I built an offline-first POS that writes locally and syncs in the background, with a realtime channel pushing orders to kitchen displays and a central dashboard aggregating every location live.",
    architecture: [
      "Local-first data layer (SQLite) with a conflict-aware sync engine to the cloud.",
      "WebSocket gateway broadcasting order events to terminals and kitchen displays.",
      "PostgreSQL analytics store fed by an aggregation pipeline for cross-location reporting.",
      "Containerised services orchestrated with Docker for repeatable deploys.",
    ],
    features: [
      "Offline-first ordering with background sync",
      "Realtime kitchen display system",
      "Multi-location analytics dashboard",
      "Split bills, modifiers & discounts",
      "Role-based staff permissions",
    ],
    challenges: [
      {
        title: "Conflict-free sync",
        body: "Two terminals could edit the same ticket offline. I implemented a deterministic merge strategy keyed on operation order so the synced result is always consistent.",
      },
      {
        title: "Sub-frame realtime",
        body: "Kitchens need instant tickets. A lightweight event protocol over WebSockets keeps end-to-end latency under 120ms.",
      },
    ],
    results: [
      "Zero lost orders during connectivity outages across pilot sites.",
      "Rolled out to 60+ locations on a single multi-tenant backend.",
      "Order-to-kitchen latency held under 120ms at peak.",
    ],
    links: { live: "#", github: "#" },
    featured: true,
  },
  {
    slug: "aircraft-inspection-system",
    title: "Aircraft Inspection System",
    category: "Aviation / Enterprise",
    year: "2023",
    tagline: "Digitising safety-critical aircraft inspections end to end.",
    summary:
      "A field-ready inspection platform that replaced paper checklists with structured, photo-backed digital records — fully traceable and signed off at every step.",
    gradient: ["#1f9d8f", "#3b6fff"],
    role: ["System Design", "Full-Stack", "Offline / Mobile"],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "S3", "PWA"],
    metrics: [
      { label: "Inspection time", value: "−40%" },
      { label: "Traceability", value: "100%" },
      { label: "Paper forms", value: "0" },
    ],
    problem:
      "Inspections relied on paper forms that were slow to complete, easy to lose and impossible to audit — a serious risk in a safety-critical industry.",
    solution:
      "I delivered a structured digital inspection system with templated checklists, mandatory photo evidence, digital sign-off and a complete, queryable history per aircraft and component.",
    architecture: [
      "Installable PWA with offline capture for hangars with poor connectivity.",
      "Versioned inspection templates so historical records stay accurate as procedures evolve.",
      "Object storage (S3) for photo evidence with signed, expiring URLs.",
      "Relational model linking aircraft → components → inspections → findings.",
    ],
    features: [
      "Templated, versioned checklists",
      "Mandatory photo evidence per step",
      "Digital sign-off & approval chain",
      "Full per-aircraft inspection history",
      "Offline capture with sync",
    ],
    challenges: [
      {
        title: "Offline in the hangar",
        body: "Connectivity is unreliable around aircraft. The PWA captures everything locally — including photos — and syncs reliably once back online.",
      },
      {
        title: "Records that never drift",
        body: "Templates change over time but old records must remain valid. Versioning every template preserves the exact form used for each historical inspection.",
      },
    ],
    results: [
      "Reduced average inspection time by ~40%.",
      "Eliminated paper forms entirely while reaching full traceability.",
      "Every finding now linked to evidence and an accountable signature.",
    ],
    links: { live: "#", docs: "#" },
    featured: true,
  },
  {
    slug: "tailor-management-erp",
    title: "Tailor Management ERP",
    category: "ERP",
    year: "2023",
    tagline: "An ERP that runs a bespoke tailoring business end to end.",
    summary:
      "Orders, measurements, inventory, production stages and billing — one system replacing five disconnected tools for a growing custom-tailoring operation.",
    gradient: ["#8b5bff", "#c44fff"],
    role: ["Full-Stack", "Domain Modelling", "UX"],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    metrics: [
      { label: "Tools replaced", value: "5 → 1" },
      { label: "Order errors", value: "−70%" },
      { label: "Throughput", value: "+35%" },
    ],
    problem:
      "The business juggled separate tools for orders, customer measurements, inventory and invoicing — data was duplicated, error-prone and never in sync.",
    solution:
      "I modelled the entire domain into one ERP: each order carries its measurements, moves through clearly defined production stages, draws down inventory and generates billing automatically.",
    architecture: [
      "Normalised relational schema (Prisma + PostgreSQL) modelling customers, orders, measurements, stock and invoices.",
      "Stage-based order workflow with status transitions and assignment.",
      "Inventory reservations tied to order lifecycle to prevent overselling fabric.",
    ],
    features: [
      "Customer measurement profiles",
      "Stage-based production tracking",
      "Inventory & fabric management",
      "Automated invoicing",
      "Role-based staff access",
    ],
    challenges: [
      {
        title: "Messy real-world domain",
        body: "Tailoring has countless edge cases. Close collaboration with the owner let me model the workflow accurately instead of forcing a generic template.",
      },
    ],
    results: [
      "Consolidated five tools into one source of truth.",
      "Reduced order errors by ~70% through structured data entry.",
      "Increased production throughput by ~35%.",
    ],
    links: { live: "#", github: "#" },
    featured: true,
  },
  {
    slug: "custom-stitching-ecommerce",
    title: "Custom Stitching Ecommerce Platform",
    category: "E-commerce",
    year: "2023",
    tagline: "Made-to-measure commerce with a configurator at its core.",
    summary:
      "A storefront where customers design and order custom-stitched garments — live pricing, a measurement configurator and a production pipeline behind it.",
    gradient: ["#ff9f43", "#ff5f7e"],
    role: ["Full-Stack", "Payments", "UX"],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    metrics: [
      { label: "Conversion", value: "+28%" },
      { label: "Checkout time", value: "−45%" },
      { label: "AOV", value: "+22%" },
    ],
    problem:
      "Selling made-to-measure online is hard: customers need to configure garments and measurements, and pricing has to reflect every option in real time.",
    solution:
      "I built a guided configurator that prices instantly as customers choose fabrics and options, captures measurements, and hands clean specs to a production pipeline after a secure Stripe checkout.",
    architecture: [
      "Rules-based pricing engine evaluating fabric, options and measurements server-side.",
      "Stripe payment integration with idempotent order creation.",
      "Redis-cached catalogue for fast configurator interactions.",
      "Order specs forwarded to the production/fulfilment workflow.",
    ],
    features: [
      "Step-by-step garment configurator",
      "Real-time dynamic pricing",
      "Measurement capture & saved profiles",
      "Secure Stripe checkout",
      "Order tracking",
    ],
    challenges: [
      {
        title: "Trustworthy live pricing",
        body: "Prices had to be instant yet authoritative. The client previews pricing optimistically while the server remains the source of truth at checkout.",
      },
    ],
    results: [
      "Lifted conversion by ~28% with a clearer configurator flow.",
      "Cut checkout time by ~45%.",
      "Raised average order value by ~22%.",
    ],
    links: { live: "#" },
    featured: true,
  },
  {
    slug: "automation-platform",
    title: "Automation Platform",
    category: "Automation / Workflows",
    year: "2024",
    tagline: "A visual engine that runs business workflows on autopilot.",
    summary:
      "A no-code automation platform where teams connect triggers, conditions and actions into reliable workflows — with retries, logging and observability built in.",
    gradient: ["#3b6fff", "#1f9d8f"],
    role: ["Architecture", "Backend", "Distributed Systems"],
    stack: ["Node.js", "TypeScript", "BullMQ", "Redis", "PostgreSQL", "Docker"],
    metrics: [
      { label: "Tasks/day", value: "250k+" },
      { label: "Success rate", value: "99.9%" },
      { label: "Manual hours saved", value: "1.2k/mo" },
    ],
    problem:
      "Teams were stitching together brittle scripts and manual steps to move data between tools — work that broke silently and ate hours every week.",
    solution:
      "I built a workflow engine where steps are composed visually and executed by a durable, queue-backed runner with automatic retries, dead-letter handling and full execution logs.",
    architecture: [
      "Queue-based execution (BullMQ + Redis) with concurrency control and backoff retries.",
      "Workflow definitions stored as versioned graphs in PostgreSQL.",
      "Idempotent step execution and a dead-letter queue for poison jobs.",
      "Per-run structured logs and metrics for observability.",
    ],
    features: [
      "Visual trigger → condition → action builder",
      "Durable execution with retries & backoff",
      "Dead-letter queue & replay",
      "Execution logs & metrics",
      "Webhook & API connectors",
    ],
    challenges: [
      {
        title: "Reliability at volume",
        body: "Workflows must survive failures and never double-execute side effects. Idempotency keys plus durable queues guarantee exactly-once outcomes where it matters.",
      },
      {
        title: "Observability",
        body: "When automation breaks, teams need to know why. Every run emits structured logs and metrics so failures are diagnosable in seconds.",
      },
    ],
    results: [
      "Processes 250k+ tasks per day at 99.9% success.",
      "Saves an estimated 1,200 manual hours per month.",
      "Failed runs are now self-healing via automatic retries.",
    ],
    links: { live: "#", github: "#", docs: "#" },
    featured: true,
  },
  {
    slug: "discord-automation",
    title: "Discord Automation Suite",
    category: "Bots / Automation",
    year: "2022",
    tagline: "Community automation that scales to large servers.",
    summary:
      "A modular Discord bot suite for moderation, onboarding, role automation and analytics — engineered to stay responsive across high-traffic servers.",
    gradient: ["#5865f2", "#7b5bff"],
    role: ["Backend", "Bot Engineering"],
    stack: ["Node.js", "TypeScript", "Discord.js", "Redis", "PostgreSQL"],
    metrics: [
      { label: "Members served", value: "120k+" },
      { label: "Commands/day", value: "80k+" },
      { label: "Response", value: "<200ms" },
    ],
    problem:
      "Large communities needed consistent moderation and onboarding, but off-the-shelf bots were rigid and buckled under load.",
    solution:
      "I built a modular bot suite with sharded gateway connections, cached state and a clean command framework, so features can be added without sacrificing responsiveness.",
    architecture: [
      "Sharded gateway connections to scale across large servers.",
      "Redis-cached guild/member state to keep command handling fast.",
      "PostgreSQL for persistent config, cases and analytics.",
      "Modular command/event framework for maintainability.",
    ],
    features: [
      "Automated moderation & filters",
      "Member onboarding & verification",
      "Role automation",
      "Server analytics",
      "Configurable per-guild settings",
    ],
    challenges: [
      {
        title: "Staying responsive under load",
        body: "Bursts of activity can overwhelm naive bots. Sharding and aggressive caching keep response times under 200ms even on the busiest servers.",
      },
    ],
    results: [
      "Serves 120k+ members across communities.",
      "Handles 80k+ commands/day with sub-200ms responses.",
      "Modular design lets new features ship without regressions.",
    ],
    links: { github: "#" },
  },
  {
    slug: "realtime-chat-application",
    title: "Realtime Chat Application",
    category: "Realtime / Messaging",
    year: "2022",
    tagline: "Fast, reliable messaging with presence and delivery guarantees.",
    summary:
      "A realtime chat platform with channels, typing indicators, presence and read receipts — built on a horizontally scalable WebSocket backbone.",
    gradient: ["#00b4d8", "#3b6fff"],
    role: ["Full-Stack", "Realtime", "Scaling"],
    stack: ["React", "TypeScript", "Node.js", "WebSockets", "Redis", "PostgreSQL"],
    metrics: [
      { label: "Concurrent users", value: "10k+" },
      { label: "Msg delivery", value: "<80ms" },
      { label: "Delivery", value: "Guaranteed" },
    ],
    problem:
      "Building chat that stays fast and consistent across many connections — with presence, typing and read state — is deceptively hard to scale.",
    solution:
      "I implemented a WebSocket backbone with a Redis pub/sub fan-out so messages, presence and receipts broadcast instantly across horizontally scaled nodes, with persistence and delivery guarantees.",
    architecture: [
      "WebSocket nodes coordinated through Redis pub/sub for horizontal scale.",
      "Message persistence in PostgreSQL with delivery/read state tracking.",
      "Presence and typing indicators via lightweight ephemeral events.",
      "Reconnect + backfill so clients never miss messages.",
    ],
    features: [
      "Channels & direct messages",
      "Presence & typing indicators",
      "Read receipts",
      "Message history & search",
      "Reconnect with backfill",
    ],
    challenges: [
      {
        title: "Fan-out across nodes",
        body: "A message sent to one node must reach clients on every other node. Redis pub/sub fans events out so any node can deliver to any subscriber.",
      },
    ],
    results: [
      "Sustains 10k+ concurrent connections.",
      "Median message delivery under 80ms.",
      "No dropped messages thanks to persistence + reconnect backfill.",
    ],
    links: { live: "#", github: "#" },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Next project in the list (wraps) — for case-study footer navigation. */
export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
