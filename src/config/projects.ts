/**
 * Real projects — single source of truth for the Work grid and case-study pages.
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
  /** Optional video path (relative to /public) shown instead of the generated mockup. */
  video?: string;
  /** Surface on the home grid. */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "complied-nyc",
    title: "Complied NYC",
    category: "SaaS / Backend Platform",
    year: "2024",
    tagline: "Enterprise-grade backend infrastructure that lets product teams ship features — not boilerplate.",
    summary:
      "Built the complete backend backbone for a production SaaS product — authentication, role-based access control, multi-tenant data isolation, workflow orchestration and third-party integrations — so the product team could focus entirely on features, not foundational plumbing.",
    gradient: ["#3b6fff", "#7b5bff"],
    role: ["System Architecture", "Full-Stack", "Backend", "DevOps"],
    stack: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    metrics: [
      { label: "Architecture", value: "Multi-tenant" },
      { label: "Access control", value: "RBAC" },
      { label: "Uptime", value: "99.9%" },
    ],
    problem:
      "Every new SaaS product faces the same six-month detour: build auth from scratch, design a tenancy model, wire up a job queue, harden security, document it for the team. That foundational work blocks every feature that actually generates revenue — and doing it poorly compounds risk across every release.",
    solution:
      "I architected and delivered a production-ready backend platform covering authentication, granular RBAC, strict multi-tenant data isolation, durable workflow execution with retry handling, and an integration layer for external APIs. Every layer is tested, hardened and documented — so the product team shipped their first feature on day one instead of month six.",
    architecture: [
      "Multi-tenant architecture with data isolation enforced at the database layer — no tenant can ever touch another's records.",
      "Authentication and authorisation system with granular role-based access control and session management.",
      "Workflow engine backed by a durable job queue with retries, dead-letter handling and restart safety.",
      "Integration layer for connecting third-party services and external APIs without coupling to core business logic.",
      "Comprehensive automated test suite and security hardening across all layers.",
    ],
    features: [
      "Multi-tenant data isolation",
      "Authentication & RBAC",
      "Workflow orchestration",
      "Background job queues",
      "Third-party integrations",
      "Security hardening & deployment guides",
    ],
    challenges: [
      {
        title: "Tenant isolation at scale",
        body: "Strict data boundaries between tenants require query guards at every database access point — not just the API layer. An automated test suite continuously validates that no cross-tenant data can leak, even under concurrent load.",
      },
      {
        title: "Workflows that survive failure",
        body: "A workflow engine that fails silently is worse than no engine at all. The queue-backed runner uses idempotency keys, per-job retries and dead-letter queues to guarantee at-least-once delivery without double-execution.",
      },
    ],
    results: [
      "Delivered a fully tested, production-ready multi-tenant backend platform on schedule.",
      "Zero tenant data leakage incidents across all production deployments.",
      "Product team onboarded and shipped their first feature in week one — not month six.",
    ],
    links: { live: "https://compliednyc.com" },
    featured: true,
  },
  {
    slug: "riskflow",
    title: "RiskFlow",
    category: "Compliance SaaS",
    year: "2024",
    tagline: "Three compliance domains unified into one platform — so audits become a report, not a scramble.",
    summary:
      "Designed and built a multi-tenant compliance operating platform that consolidates compliance tracking, employee training management and vendor risk assessment into a single command interface — replacing scattered spreadsheets with a structured, audit-ready system.",
    gradient: ["#1f9d8f", "#3b6fff"],
    role: ["System Architecture", "Full-Stack", "Security"],
    stack: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    metrics: [
      { label: "Modules", value: "3-in-1" },
      { label: "Architecture", value: "Multi-tenant" },
      { label: "Doc coverage", value: "Full ADRs" },
    ],
    problem:
      "Compliance teams were juggling regulatory obligations, staff training records and vendor risk assessments across disconnected spreadsheets and tools. When auditors arrived, teams had no single source of truth — just a frantic hunt through emails and folders for evidence that may or may not exist.",
    solution:
      "I architected RiskFlow as a unified multi-tenant platform where operators manage compliance workflows, training completions and vendor risk assessments from one dashboard. Every action is timestamped, traceable and exportable — so the audit pack is always ready, not assembled under pressure.",
    architecture: [
      "Multi-tenant SaaS with strict per-organisation data isolation, supporting multiple clients on shared infrastructure.",
      "Three integrated modules — compliance management, training, and vendor risk — sharing core infrastructure without coupling domain logic.",
      "Structured evidence collection and audit-trail logging across all three modules.",
      "Architecture decisions documented as ADRs so every technical choice is explained and reversible.",
      "Separate operator and developer-facing interfaces for operational clarity.",
    ],
    features: [
      "Compliance management & tracking",
      "Training module management",
      "Vendor risk assessment",
      "Multi-tenant data isolation",
      "Audit-ready evidence collection",
      "Architecture decision records (ADRs)",
    ],
    challenges: [
      {
        title: "Three domains, one coherent system",
        body: "Compliance, training and vendor risk each have distinct data models and workflows. Careful domain boundaries let them share infrastructure and cross-reference data without entangling logic — keeping each module independently evolvable.",
      },
      {
        title: "Audit readiness by design",
        body: "Evidence can't be retrofitted at audit time. Every module was designed from the start to capture timestamped records and structured proof — so operators can export a complete audit pack in minutes, not days.",
      },
    ],
    results: [
      "Delivered a unified three-module compliance platform from a single, cost-efficient deployment.",
      "Organisations replaced three disconnected tools with one structured system and a always-ready audit trail.",
      "ADR-driven documentation gives the team full confidence to extend and maintain the platform independently.",
    ],
    links: { live: "https://vodazok.com" },
    featured: true,
  },
  {
    slug: "ecabin-ledger",
    title: "eCabin Ledger",
    category: "Aviation / Enterprise",
    year: "2024",
    tagline: "Centralised aircraft cabin defect tracking and audit compliance.",
    summary:
      "A web platform for aviation teams to report, track and resolve aircraft cabin defects across cabins, galleys and lavatories — with a full audit trail and secure OTP-based authentication.",
    gradient: ["#00b4d8", "#3b6fff"],
    role: ["System Design", "Full-Stack"],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    metrics: [
      { label: "Traceability", value: "100%" },
      { label: "Auth", value: "OTP-secured" },
      { label: "Paper forms", value: "0" },
    ],
    problem:
      "Aviation maintenance teams were tracking cabin defects through paper forms and disconnected tools — creating traceability gaps and putting audit compliance at risk.",
    solution:
      "I built eCabin Ledger as a structured web platform where teams report cabin defects, track resolution through a defined workflow, and produce a complete, audit-ready history for every aircraft.",
    architecture: [
      "Structured defect reporting model linked to cabin zones (cabin, galley, lavatory, attendant seating).",
      "Workflow engine covering the full inspection → repair → case closure lifecycle.",
      "Secure authentication with OTP verification delivered to registered email addresses.",
      "Audit-compliant documentation and reporting for regulatory requirements.",
    ],
    features: [
      "Structured cabin defect reporting",
      "Zone-based tracking (cabin, galley, lavatory)",
      "Inspection-to-closure workflow",
      "OTP-secured authentication",
      "Audit-compliant documentation",
      "Full case history & traceability",
    ],
    challenges: [
      {
        title: "Audit-grade traceability",
        body: "Every defect must carry a complete, tamper-evident history from report to resolution. The data model links each finding to a responsible user and a timestamped action chain.",
      },
    ],
    results: [
      "Eliminated paper-based defect tracking entirely.",
      "Full traceability across all cabin zones and maintenance actions.",
      "OTP-backed secure access meets aviation compliance requirements.",
    ],
    links: { live: "https://ecabinledger.com" },
    featured: true,
  },
  {
    slug: "plaiss",
    title: "Plaiss",
    category: "E-commerce / Affiliate",
    year: "2024",
    tagline: "An affiliate-powered furniture marketplace earning commission through AWIN.",
    summary:
      "A furniture and home décor marketplace that aggregates products from multiple retailers via AWIN, lets users save wishlists and discover curated collections — earning commission on every booking.",
    gradient: ["#ff9f43", "#ff5f7e"],
    role: ["Full-Stack", "Integrations", "UX"],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWIN API"],
    metrics: [
      { label: "Network", value: "AWIN" },
      { label: "Categories", value: "5+" },
      { label: "Model", value: "Affiliate" },
    ],
    problem:
      "Shoppers looking for furniture and décor visit dozens of retailer sites to compare products. There was no curated, commission-backed aggregator focused on the interior design space.",
    solution:
      "I built Plaiss as an affiliate marketplace that ingests products from AWIN-connected retailers, presents them in a curated interface with wishlists and a Plaiss Engine discovery tool, and earns commission on every referral.",
    architecture: [
      "AWIN API integration for product data ingestion from multiple partner retailers.",
      "Product catalogue with category filtering across Furniture, Lighting, Plants, Decor and Rugs.",
      "Wishlist and user session management for repeat visitors.",
      "Referral tracking for accurate affiliate commission attribution per booking.",
    ],
    features: [
      "AWIN affiliate product aggregation",
      "Multi-retailer product catalogue",
      "Wishlist & saved items",
      "Plaiss Engine discovery tool",
      "Affiliate commission tracking",
      "Email newsletter",
    ],
    challenges: [
      {
        title: "Accurate affiliate attribution",
        body: "Commission depends on correctly attributing referrals to Plaiss across multiple retailer checkout flows. Clean referral tracking ensures no revenue slips through the cracks.",
      },
    ],
    results: [
      "Live marketplace aggregating products from multiple AWIN partner retailers.",
      "Earning affiliate commission across Furniture, Lighting, Decor, Plants and Rugs.",
      "Curated discovery experience differentiating from direct retailer browsing.",
    ],
    links: { live: "https://www.plaiss.com" },
    video: "/videos/engine22.mp4",
    featured: true,
  },
  {
    slug: "restaurant-pos",
    title: "Restaurant Management POS",
    category: "Enterprise / SaaS",
    year: "2025",
    tagline: "An enterprise-grade cloud POS that runs every corner of a restaurant.",
    summary:
      "A full-suite cloud-based restaurant management platform covering billing, inventory, kitchen operations, online ordering, staff management, finance, analytics and multi-location management — built for restaurants of all sizes.",
    gradient: ["#ff7a59", "#ff4f9a"],
    role: ["System Architecture", "Full-Stack", "Product Engineering"],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "WebSockets", "Docker"],
    metrics: [
      { label: "Modules", value: "9-in-1" },
      { label: "Architecture", value: "Multi-location" },
      { label: "Status", value: "In development" },
    ],
    problem:
      "Restaurant operators juggle billing software, separate inventory tools, manual kitchen boards, spreadsheet-based finance and disconnected loyalty programmes — losing time, revenue and visibility across every shift.",
    solution:
      "I'm building a single cloud-based platform that unifies billing, inventory, kitchen display, online ordering, staff scheduling, customer engagement, finance, analytics and multi-location management — so operators run their entire business from one dashboard.",
    architecture: [
      "Multi-tenant, multi-location architecture with per-branch data isolation and cross-location rollup reporting.",
      "Real-time kitchen display system powered by WebSockets for instant order routing.",
      "Inventory engine with live stock deduction on every sale and low-stock alerts.",
      "Online ordering module with direct integration into the kitchen workflow.",
      "Finance and analytics pipeline aggregating sales, costs and margins across locations.",
    ],
    features: [
      "Billing & POS",
      "Inventory management",
      "Kitchen display system",
      "Online ordering",
      "Customer engagement & loyalty",
      "Staff management & scheduling",
      "Finance & expense tracking",
      "Analytics & reporting",
      "Multi-location management",
    ],
    challenges: [
      {
        title: "Nine modules, one coherent system",
        body: "Each module (billing, inventory, kitchen, staff, finance) has its own data model and real-time requirements. The architecture keeps them loosely coupled so each can evolve independently without breaking the others.",
      },
      {
        title: "Real-time across the restaurant floor",
        body: "An order placed at the counter must hit the kitchen display in under a second. WebSocket-based event propagation keeps every terminal and screen in sync without polling.",
      },
    ],
    results: [
      "Currently in active development — architecture and core billing, inventory and kitchen modules complete.",
      "Designed to scale from single-outlet cafés to multi-location restaurant chains on shared infrastructure.",
    ],
    links: {},
    featured: true,
  },
  {
    slug: "silver-storey",
    title: "Silver Storey",
    category: "Interior Design / CMS",
    year: "2024",
    tagline: "A dynamic, client-editable brochure website for India's fastest-growing interior design brand.",
    summary:
      "A content-managed brochure website for a full-service interior design firm — showcasing services, pricing, 3D visualisations and client testimonials, with the client able to update all content independently.",
    gradient: ["#8b5bff", "#c44fff"],
    role: ["Web Development", "CMS Integration", "UX"],
    stack: ["CMS", "Responsive Design", "3D Visualisation", "SEO"],
    metrics: [
      { label: "Customers", value: "60+" },
      { label: "Sq ft designed", value: "50k+" },
      { label: "Delivery", value: "45-day guarantee" },
    ],
    problem:
      "An interior design firm with 15+ years of experience and a team of 30+ experts had no professional online presence to reach new clients, showcase their portfolio or communicate pricing.",
    solution:
      "I designed and built a dynamic brochure website where the client independently manages services, pricing, portfolio images and testimonials — without needing a developer for every update.",
    architecture: [
      "CMS-backed content so the client controls all copy, images and pricing independently.",
      "Service and pricing pages structured for easy updates without code changes.",
      "3D visualisation showcase integrated into the portfolio section.",
      "Mobile-first responsive design optimised for the Indian market.",
    ],
    features: [
      "Dynamic, client-editable content",
      "Services & pricing showcase",
      "3D visualisation portfolio",
      "Customer testimonials",
      "Free consultation booking",
      "Mobile-first responsive design",
    ],
    challenges: [
      {
        title: "Non-technical client ownership",
        body: "The client needed to update pricing, services and photos without any developer help. The CMS setup abstracts all complexity so content updates are as simple as editing a document.",
      },
    ],
    results: [
      "Silver Storey launched a professional online presence showcasing 60+ satisfied customers.",
      "Client independently manages all content — zero developer dependency for updates.",
      "10-year warranty and 45-day delivery guarantees prominently communicated to prospects.",
    ],
    links: { live: "https://www.silverstorey.com" },
    featured: true,
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
