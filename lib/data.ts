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
    period: "2025–present",
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
    period: "2025–present",
    status: "in-progress",
    description:
      "A connected, intelligent course knowledge graph that's queryable, visualisable, interoperable, and reusable. Built on Schema.org and RDF to link academic data with external educational ontologies and Linked Data sources, with downstream applications in recommendation systems and AI tutoring.",
    tags: ["RDF", "Schema.org", "Ontology", "Python"],
    repo: "https://github.com/Aarav-2006/Knowledge-map",
  },
  {
    slug: "enterprise-ai-data-intelligence-platform",
    title: "Enterprise AI Data Intelligence Platform (MCP)",
    role: "Builder",
    period: "Jun 2026–Jul 2026",
    status: "archived",
    description:
      "A secure Model Context Protocol (MCP) platform that lets LLMs like Claude interact with enterprise datasets through authenticated AI tools. Combines OAuth 2.1 (PKCE), JWT, MFA, and RBAC for enterprise-grade access control with an AI-driven pipeline that understands, transforms, and publishes sanitized datasets into PostgreSQL, exposed as a secure remote HTTP MCP server for Claude Desktop.",
    tags: ["Python", "MCP", "OAuth 2.1", "PostgreSQL"],
  },
  {
    slug: "early-failure-prediction",
    title: "Early Failure Prediction System",
    role: "Builder",
    period: "Jan 2025–May 2025",
    status: "archived",
    description:
      "A probabilistic sequence model trained on the HDFS log dataset to predict system failures before they happen. Built end-to-end (preprocessing, modelling, evaluation) with a focus on early-window precision.",
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
    body: "Conducted a VC-style investment analysis on a deep-tech defence startup, covering PMF, KPIs, market size, and financial performance. Synthesised a final recommendation for a panel of VC professionals.",
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
  overview: string;
  highlights?: string[];
  learned: string;
  mattered: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "AI Engineer Intern",
    org: "Home First Finance",
    period: "May 2026–Jul 2026",
    overview:
      "Sole developer across five engineering workstreams spanning enterprise AI infrastructure, protocol-level security, real-time systems, retrieval-augmented generation, and applied data taxonomy. Reported into three different mentors on parallel tracks.",
    highlights: [
      "Designed and built an enterprise MCP (Model Context Protocol) platform in Python, FastMCP, Starlette, and Uvicorn over PostgreSQL, exposing authenticated MCP tools that let Claude Desktop run a dataset's full lifecycle end to end: ingestion, profiling, business-rule generation, transformation planning, approval, and publishing.",
      "Implemented a protocol-level authentication layer from the OAuth 2.1 specification, not a vendor SDK. It uses the Authorization Code Flow with PKCE, JWT access tokens, Google Authenticator TOTP-based MFA, and role-based access control to secure every MCP tool and OAuth endpoint.",
      "Designed the relational schema and service-repository architecture (psycopg2 over PostgreSQL) covering users, roles, permissions, sessions, uploads, dataset understanding, and business rules, keeping planning, execution, approval, and publishing as independently auditable services.",
      "Shipped a production-ready WebRTC video-conferencing platform (Django, React, Stream Video SDK) with invite-based meeting workflows, browser-native recording, responsive multi-participant layouts, and a Puppeteer suite for automated end-to-end testing.",
      "Built an enterprise RAG platform (LangChain, FAISS, HuggingFace Sentence-Transformers, Gemini 2.5 Flash) that chunks and embeds uploaded PDFs into a semantic vector index and answers natural-language questions grounded strictly in retrieved context to minimize hallucination.",
      "Architected a five-agent autonomous software-engineering system (FastAPI, Qdrant, Sentence-Transformers) made up of Requirements, Retrieval, Architecture, Validation, and Sandbox agents. It indexes a codebase, proposes implementation plans from retrieved context, and verifies generated code via automated sandbox compilation before it reaches a developer; validated against real-world repositories including Chatwoot.",
      "Ran a production taxonomy and schema gap analysis for DocIQ, HomeFirst's document-processing platform, mapping document variants to reusable parent schemas, quantifying coverage against the production inventory, and prioritizing new-schema recommendations by document frequency.",
    ],
    learned:
      "How to design and secure a system end-to-end rather than just make it work. Building OAuth 2.1 with PKCE and MFA from the specification, not a library, exposed exactly where code that runs differs from code that's safe to hand to an LLM client. Running five workstreams in parallel across three mentors also forced me to scope ruthlessly and keep interfaces clean between systems I couldn't hold in my head all at once.",
    mattered:
      "My first time owning production infrastructure alone, across multiple concurrent systems, with security and auditability treated as first-class requirements rather than afterthoughts. It reframed how I approach every system I've built since: the security boundary gets designed first, not bolted on last.",
  },
  {
    role: "Student Intern",
    org: "Nippon India Mutual Fund",
    period: "Jun 2023–Jul 2023",
    overview:
      "Conducted exploratory data analysis on real fund-house datasets and authored a research report on the impact of robo-advisory on young investors in India.",
    learned:
      "How institutional data pipelines work in practice, and what it actually takes to translate raw financial data into insights that decision-makers act on.",
    mattered:
      "My first exposure to production-grade financial data. It sharpened my instinct for what 'clean enough' means in the real world, which no classroom dataset ever does.",
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
