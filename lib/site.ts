export const site = {
  name: "Pooja Sahu",
  headline: "I build intelligent products with data + AI.",
  roles: ["Data Scientist", "AI Builder", "Technical Product Thinker"],
  currentStudy: "MS Information Management @ UIUC",
  currentRole: "Data Science @ COUNTRY Financial",
  graduation: "Graduating May 2027",
  location: "Champaign, IL",
  email: "Poojads2@illinois.edu",
  linkedin: "https://www.linkedin.com/in/sahu-pooja/",
  github: "https://github.com/Pseudopooja",
  resume:
    "https://drive.google.com/file/d/1zOKHKuoapfC_vn4oN6RNyCcysRF3U7Rf/view?usp=sharing",
} as const;

export const navigationLinks = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  { label: "LinkedIn", href: site.linkedin },
  { label: "GitHub", href: site.github },
  { label: "Email", href: `mailto:${site.email}` },
] as const;

export const currentlyCards = [
  {
    label: "Building",
    value: "AI + data products",
    description:
      "Agentic workflows, decision support, and interfaces that make complex systems feel calm.",
  },
  {
    label: "Learning",
    value: "Production AI systems",
    description:
      "Evaluation, retrieval, deployment patterns, and the tradeoffs behind robust ML delivery.",
  },
  {
    label: "Exploring",
    value: "AI Engineer / Applied AI / Data Scientist roles for 2027",
    description: "Teams where product judgment and technical depth both matter.",
  },
] as const;

export const projects = [
  {
    number: "01",
    title: "Policy Pro",
    category: "Agentic AI / MCP / LLM routing",
    summary:
      "Built a hybrid semantic router that blends cosine similarity, a golden dataset, cached memory, and LLM fallback to keep responses accurate and efficient.",
    highlights: [
      "LLM-as-a-judge evaluation across a curated golden dataset",
      "Caching and fallback logic to keep routing fast and resilient",
      "MCP-aware design for tool selection and response orchestration",
    ],
    tags: ["MCP", "Cosine Similarity", "LLM Routing", "Memory Cache", "Evaluation"],
  },
  {
    number: "02",
    title: "Machine Learning at Scale",
    category: "Predictive modeling / enterprise ML",
    summary:
      "Modeled 14.5M records with XGBoost and GLM, benchmarking against a legacy Poisson model while keeping compute constrained and explainability high.",
    highlights: [
      "SHAP-driven interpretability for model review and trust",
      "Performance comparison against a production baseline",
      "Compute-aware training strategy on a large enterprise dataset",
    ],
    tags: ["XGBoost", "GLM", "Poisson Baseline", "SHAP", "14.5M Records"],
  },
  {
    number: "03",
    title: "Spark Data / DEA Initiative",
    category: "Data engineering / technical product delivery",
    summary:
      "Shaped analytics-ready data flows in PySpark on Cloudera, coordinating ingestion, curation, stakeholder alignment, and UAT for a cleaner delivery path.",
    highlights: [
      "Ingestion and curation workstreams for analytics-ready datasets",
      "Stakeholder coordination across technical and business partners",
      "UAT and release support with product-minded communication",
    ],
    tags: ["PySpark", "Cloudera", "Ingestion", "Curation", "UAT"],
  },
  {
    number: "04",
    title: "ClaimSense",
    category: "Django / insurance / healthcare billing",
    summary:
      "Designed a full-stack product with Django, structured data models, and workflow-oriented logic for a billing-heavy domain that rewards clarity.",
    highlights: [
      "Data modeling tuned to real operational workflow needs",
      "Full-stack build decisions grounded in product usability",
      "Domain-aware structure for insurance and billing flows",
    ],
    tags: ["Django", "Data Modeling", "Full Stack", "Healthcare Billing", "Product Design"],
  },
  {
    number: "05",
    title: "Generative AI Systems Evaluation",
    category: "Responsible AI / experimentation",
    summary:
      "Compared Gemini CLI, GitHub Copilot, and ChatGPT on a small game build to understand code quality, interpretability, and the role of human oversight.",
    highlights: [
      "Transparent comparison of development speed and code quality",
      "Responsible AI framing around review and supervision",
      "Useful evidence for how different assistants shape the build process",
    ],
    tags: ["Gemini CLI", "GitHub Copilot", "ChatGPT", "Responsible AI"],
  },
] as const;

export const experience = [
  {
    company: "COUNTRY Financial",
    title: "Data Science Intern + Technical Product Manager",
    period: "2026 – Present",
    location: "Remote / Bloomington, IL",
    category: "Current role",
    summary:
      "Working across agentic AI, machine learning, and enterprise data delivery to turn technical systems into usable product outcomes.",
    highlights: [
      "Shaping AI and data workflows that connect product intent to implementation",
      "Balancing technical depth, stakeholder clarity, and delivery constraints",
      "Focusing on enterprise-ready decisions that improve usability and trust",
    ],
  },
  {
    company: "Accenture",
    title: "Security / Technology Analyst",
    period: "2023 – 2025",
    location: "Mumbai, India",
    category: "Enterprise technology",
    summary:
      "Translated enterprise requirements into data, automation, and workflow improvements for large-scale systems.",
    highlights: [
      "Supported data validation, reporting quality, and process automation across integrated systems",
      "Worked closely with stakeholders to clarify requirements and resolve delivery gaps",
      "Kept the emphasis on analytics, operations, and dependable execution",
    ],
  },
  {
    company: "Sunteck Realty",
    title: "Management Intern",
    period: "2022",
    location: "Mumbai, India",
    category: "Business analysis",
    summary:
      "Applied data analysis and reporting to sales and marketing questions that needed fast, practical decisions.",
    highlights: [
      "Built dashboards and presentations for decision support",
      "Synthesized market and customer patterns into concise recommendations",
      "Strengthened the link between analysis and business action",
    ],
  },
  {
    company: "Capgemini",
    title: "Data & Analytics Intern",
    period: "2021",
    location: "Mumbai, India",
    category: "Analytics foundations",
    summary:
      "Worked on data quality, validation, and analysis to support more reliable business reporting.",
    highlights: [
      "Validated datasets and documented analysis rules",
      "Collaborated with engineering and analytics partners on data issues",
      "Built a strong base in repeatable, structured analysis",
    ],
  },
] as const;

export const skills = [
  {
    category: "AI Systems",
    items: ["Agentic AI", "RAG", "MCP", "LangChain", "LangGraph", "LlamaIndex", "NeMo Guardrails"],
  },
  {
    category: "Machine Learning",
    items: ["scikit-learn", "XGBoost", "SHAP", "Regression", "Classification", "NLP"],
  },
  {
    category: "Engineering",
    items: ["Python", "SQL", "PySpark", "FastAPI", "Django", "JavaScript"],
  },
  {
    category: "Data & Platforms",
    items: ["Cloudera", "Supabase", "GCP", "MySQL", "Power BI", "Tableau"],
  },
  {
    category: "Product",
    items: ["Product Discovery", "Requirements", "Stakeholder Management", "UAT", "Agile"],
  },
] as const;

export const education = [
  {
    school: "University of Illinois Urbana-Champaign",
    degree: "MS Information Management",
    period: "2025 – 2027",
    detail: "School of Information Sciences",
  },
  {
    school: "NMIMS",
    degree: "B.Tech Electronics & Telecommunications + MBA Technology Management",
    period: "Completed 2023",
    detail: "Dual-degree background in engineering and management",
  },
] as const;
