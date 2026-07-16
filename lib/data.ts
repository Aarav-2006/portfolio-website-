export type Project = {
  slug: string;
  title: string;
  role: string;
  period: string;
  status: "live" | "in-progress" | "archived";
  description: string; // the "so what"
  tags: string[];
  repo?: string;
  isVenture?: boolean;
};

export const projects: Project[] = [
  {
    slug: "universal-compression",
    title: "AI-Based Universal Compression Platform",
    role: "Founder / Solo Builder",
    period: "2025 — present",
    status: "live",
    description:
      "An AI-driven data compression platform focused on reducing storage and transmission costs while preserving task-level information fidelity. Targeting AI workloads and large-scale data systems where the trade-off between ratio, quality, and compute actually matters.",
    tags: ["AI", "Compression", "Python", "PyTorch"],
    repo: "https://github.com/Aarav-2006",
    isVenture: true,
  },
  {
    slug: "knowledge-map",
    title: "Knowledge Map",
    role: "Student Researcher · Prof. Raghav Awasthy",
    period: "2025 — present",
    status: "in-progress",
    description:
      "A connected, intelligent course knowledge graph — queryable, visualisable, interoperable, and reusable. Built on Schema.org and RDF to link academic data with external educational ontologies and Linked Data sources, with downstream applications in recommendation systems and AI tutoring.",
    tags: ["RDF", "Schema.org", "Ontology", "Python"],
    repo: "https://github.com/Aarav-2006/Knowledge-map",
  },
  {
    slug: "enterprise-ai-data-intelligence-platform",
    title: "Enterprise AI Data Intelligence Platform (MCP)",
    role: "Builder",
    period: "Jun 2026 — Jul 2026",
    status: "archived",
    description:
      "A secure Model Context Protocol (MCP) platform that lets LLMs like Claude interact with enterprise datasets through authenticated AI tools. Combines OAuth 2.1 (PKCE), JWT, MFA, and RBAC for enterprise-grade access control with an AI-driven pipeline that understands, transforms, and publishes sanitized datasets into PostgreSQL — exposed as a secure remote HTTP MCP server for Claude Desktop.",
    tags: ["Python", "MCP", "OAuth 2.1", "PostgreSQL"],
  },
  {
    slug: "early-failure-prediction",
    title: "Early Failure Prediction System",
    role: "Builder",
    period: "Jan 2025 — May 2025",
    status: "archived",
    description:
      "A probabilistic sequence model trained on the HDFS log dataset to predict system failures before they happen. Built end-to-end — preprocessing, modelling, evaluation — with a focus on early-window precision.",
    tags: ["Jupyter", "ML", "HDFS", "Probabilistic Models"],
    repo: "https://github.com/Aarav-2006/Early-Failure-Prediction-system",
  },
  {
    slug: "email-contact-intelligence",
    title: "Enterprise Email Contact Intelligence",
    role: "Builder",
    period: "2024",
    status: "archived",
    description:
      "A scalable Gmail contact intelligence pipeline processing 100,000+ business emails. Includes OAuth auth, resumable checkpointing, contact deduplication, and structured output for downstream applications.",
    tags: ["Python", "Gmail API", "OAuth", "Pipelines"],
    repo: "https://github.com/Aarav-2006/Enterprise-Email-Contact-Intelligence-System",
  },
];

export const awards = [
  {
    title: "Impact Lab (PCC × GWIST)",
    place: "1st place",
    body: "Designed a data-driven, financially viable strategy for gender-inclusive urban mobility, advising a public-sector task force on large-scale transport reform.",
  },
  {
    title: "VC Capstone · Bhavish Sood",
    place: "2nd place",
    body: "Conducted a VC-style investment analysis on a deep-tech defence startup — PMF, KPIs, market size, financial performance. Synthesised a final recommendation for a panel of VC professionals.",
  },
  {
    title: "Casecade (PCC)",
    place: "3rd place",
    body: "Built an AI agent trained to evaluate companies based on investor-focused factors. Shipped a working evaluation pipeline in a competitive cohort.",
  },
  {
    title: "Startup Sprint (E-Cell, Plaksha)",
    place: "2nd place",
    body: "Built an MVP for a cross-platform profile viewing experience for seminars and events.",
  },
];

export type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  did: string;
  learned: string;
  mattered: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Student Intern",
    org: "Nippon India Mutual Fund",
    period: "Aug 2025 — present",
    did: "Conducted exploratory data analysis on real fund-house datasets and authored a research report on the impact of robo-advisory on young investors in India.",
    learned: "How institutional data pipelines work in practice — and what it actually takes to translate raw financial data into insights that decision-makers act on.",
    mattered: "My first exposure to production-grade financial data. It sharpened my instinct for what 'clean enough' means in the real world, which no classroom dataset ever does.",
  },
  {
    role: "Student Researcher",
    org: "Knowledge Map · Prof. Raghav Awasthy",
    period: "May 2025 — present",
    did: "Building a queryable, visualisable course knowledge graph using Schema.org and RDF, with downstream applications in recommendation systems and AI tutoring.",
    learned: "How to model knowledge structurally — moving from flat data to connected, semantically rich graphs that machines can actually reason over.",
    mattered: "It forced me to think about information architecture at a level most ML work skips entirely. Structure isn't just formatting — it's intelligence.",
  },
  {
    role: "Member",
    org: "Plaksha Consulting Club (PCC)",
    period: "2024 — present",
    did: "Competed in case competitions including the Ashoka Case Competition and represented PCC across cross-institutional events.",
    learned: "How to structure ambiguous problems under time pressure — a skill that transfers directly into research, product thinking, and pitching ideas.",
    mattered: "Pushed me to communicate technical thinking to non-technical audiences. Most engineers undervalue this. I'm trying not to.",
  },
  {
    role: "Member",
    org: "Kartavya Club",
    period: "Dec 2024 — May 2025",
    did: "Supported neurodivergent children in a tote-bag painting initiative and contributed to fundraising on Founders Day.",
    learned: "That good work doesn't always look like code. Showing up consistently for people outside your usual context is its own form of building.",
    mattered: "A reminder that the most important systems aren't always technical — sometimes they're human.",
  },
];

export const skills = {
  languages: [
    { name: "Python", size: "lg" as const },
    { name: "C / C++", size: "sm" as const },
    { name: "HTML / CSS", size: "sm" as const },
  ],
  technologies: [
    { name: "Machine Learning", size: "md" as const },
    { name: "RDF", size: "md" as const },
    { name: "Exploratory Data Analysis", size: "md" as const },
    { name: "Ontology Mapping", size: "sm" as const },
  ],
};
