export const site = {
  name: "Pooja Sahu",
  headline: "I build intelligent products with data + AI.",
  roles: [
    "AI Engineer",
    "Data Scientist",
    "Forward Deployed Engineer",
    "Solutions Analyst",
    "Machine Learning Engineer",
    "Technical Product Manager",
  ],
  currentStudy: "MS Information Management @ UIUC",
  currentRole: "Data Science @ COUNTRY Financial",
  graduation: "Graduating May 2027",
  location: "Illinois, USA",
  email: "Poojads2@illinois.edu",
  linkedin: "https://www.linkedin.com/in/sahu-pooja/",
  github: "https://github.com/Pseudopooja",
  // Served from public/; replace the PDF there to update the resume everywhere
  resume: "/Pooja-Sahu-Resume.pdf",
} as const;

// Ordered to match the page so the active-section highlight moves left to right.
export const navigationLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Life", href: "#life" },
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
    title: "PolicyPro LLM Evaluation Framework",
    category: "LLM evaluation / enterprise AI",
    summary:
      "A multi-layer evaluation framework that systematically flags response-quality issues in an enterprise AI assistant and cuts manual review effort.",
    highlights: [
      "Layers deterministic validation, semantic similarity, and evidence-based assessment",
      "Risk classification to prioritize the responses that need human attention",
      "Automated testing of LLM response quality and reliability at scale",
    ],
    tags: ["LLM Evaluation", "Semantic Similarity", "Risk Classification", "Python"],
  },
  {
    number: "02",
    title: "sust-AI-naible",
    category: "Multi-agent systems / generative AI",
    summary:
      "A multi-agent, carbon-aware compute scheduler where specialized agents collaborate to recommend when and where workloads should run.",
    highlights: [
      "Grid Forecast, Scheduler, Workload, and Policy agents with distinct responsibilities",
      "Orchestration logic for agents to exchange context and reach a joint recommendation",
      "Scheduling decisions shaped by carbon intensity, not just capacity",
    ],
    tags: ["Python", "Multi-Agent Systems", "Generative AI", "Orchestration"],
  },
  {
    number: "03",
    title: "SRB RAG-Powered WhatsApp Assistant",
    category: "RAG / conversational AI",
    summary:
      "A retrieval-augmented chatbot that answers on WhatsApp with grounded responses drawn from an indexed knowledge base.",
    highlights: [
      "FastAPI backend with FAISS vector search over embedded knowledge",
      "WhatsApp messaging through Twilio for a zero-install user experience",
      "Retrieval and conversational workflow connecting user queries to relevant context",
    ],
    tags: ["Python", "FastAPI", "FAISS", "Twilio", "Embeddings"],
  },
  {
    number: "04",
    title: "Large-Scale Insurance Data Processing & Risk Modeling",
    category: "Machine learning / data pipelines",
    summary:
      "Memory-efficient pipelines that turn 14.5M+ insurance records and 180+ variables into model-ready data on local compute.",
    highlights: [
      "Chunk-based preprocessing and feature engineering for datasets that don't fit in memory",
      "Automated data-quality checks, special-value handling, and variable selection",
      "A reusable pipeline for downstream actuarial modeling and analytics",
    ],
    tags: ["Python", "Machine Learning", "Data Pipelines", "14.5M+ Records"],
  },
  {
    number: "05",
    title: "Real-Time Weapon Detection",
    category: "Computer vision / deep learning",
    summary:
      "A YOLOv5 object-detection model for security surveillance, fine-tuned on custom-labeled images to 98.48% classification accuracy.",
    highlights: [
      "Trained and fine-tuned on 3,000+ custom-labeled images",
      "Real-time detection pipeline built for surveillance use cases",
      "98.48% classification accuracy",
    ],
    tags: ["YOLOv5", "Computer Vision", "Python", "Object Detection"],
  },
] as const;

export const experience = [
  {
    company: "COUNTRY Financial",
    title: "Data Science Intern",
    period: "May 2026 – Present",
    location: "Illinois, USA",
    category: "Current role",
    summary:
      "Building LLM evaluation, document intelligence, and large-scale data pipelines for enterprise insurance AI.",
    highlights: [
      "Developed the PolicyPro multi-layer LLM evaluation framework, combining deterministic validation, semantic similarity, evidence-based assessment, and risk classification to reduce manual review of AI-assistant outputs",
      "Built an AI-powered document validation system using OCR, PDF layout analysis, and template comparison to automate insurance billing QA checks",
      "Developed memory-efficient preprocessing and feature-engineering pipelines for 14.5M+ insurance records supporting actuarial modeling",
    ],
  },
  {
    company: "Accenture",
    title: "Security Delivery Analyst",
    period: "Jun 2023 – Jul 2025",
    location: "Mumbai, India",
    category: "Enterprise technology",
    summary:
      "Automated enterprise security and risk workflows and built the data validation behind them.",
    highlights: [
      "Configured ServiceNow IRM/SecOps workflows that cut manual review effort by 20% (~200 hours/month)",
      "Built Python data validation and anomaly-detection workflows across 50K+ enterprise records, improving accuracy and SLA adherence",
      "Engineered integrations, scheduled data feeds, and testing across ServiceNow and RSA Archer",
      "Collaborated across 3 engineering squads on requirements, testing, and release planning in an Agile environment",
    ],
  },
  {
    company: "Capgemini",
    title: "Data Science Intern",
    period: "May 2021 – Jun 2021",
    location: "Mumbai, India",
    category: "Computer vision",
    summary:
      "Built a real-time weapon detection model and automated reporting validation.",
    highlights: [
      "Developed a YOLOv5 weapon detection model trained on 3,000+ custom-labeled images, reaching 98.48% classification accuracy",
      "Automated data-validation and reconciliation workflows in Python, reducing recurring reporting errors by 15–20%",
    ],
  },
] as const;

// Capabilities framed the way recruiters read them: what I do, proof with its metric, then tools.
// `proof` is split around `metric` so the number can be emphasized inline.
export const skills = [
  {
    category: "LLM & agentic systems",
    proof: ["Built PolicyPro, a", "4-layer LLM evaluation framework", "for an enterprise AI assistant, plus a multi-agent scheduler and a RAG assistant on WhatsApp."],
    tools: ["LangChain", "LangGraph", "LlamaIndex", "MCP", "FAISS", "NeMo Guardrails"],
  },
  {
    category: "Machine learning",
    proof: ["Fine-tuned a YOLOv5 detection model on 3,000+ labeled images, reaching", "98.48% accuracy", "for real-time surveillance."],
    tools: ["scikit-learn", "XGBoost", "YOLOv5", "Feature engineering", "Cross-validation"],
  },
  {
    category: "Data engineering",
    proof: ["Built memory-efficient pipelines that make", "14.5M+ insurance records", "and 180+ variables model-ready on local compute."],
    tools: ["Python", "SQL", "Pandas", "PySpark", "Cloudera", "GCP"],
  },
  {
    category: "Enterprise delivery",
    proof: ["Automated ServiceNow risk workflows at Accenture, saving", "~200 hours a month", "of manual review across 3 engineering squads."],
    tools: ["ServiceNow", "RSA Archer", "Git", "Power BI", "Tableau"],
  },
] as const;

type EducationItem = {
  school: string;
  shortName: string;
  detail: string;
  period: string;
  gpa?: string;
  degrees: { name: string; focus?: string }[];
  // Newest term first; `current` marks the in-progress term
  coursework?: {
    term: string;
    current?: boolean;
    courses: { code: string; title: string }[];
  }[];
};

export const education: EducationItem[] = [
  {
    school: "University of Illinois Urbana-Champaign",
    shortName: "UIUC",
    detail: "School of Information Sciences",
    period: "Aug 2025 – May 2027",
    gpa: "4.00 / 4.00",
    degrees: [{ name: "MS in Information Management" }],
    // Titles from the UIUC course catalog (catalog.illinois.edu)
    coursework: [
      {
        term: "Fall 2026",
        current: true,
        courses: [
          { code: "IS 514", title: "Applied Business Research" },
          { code: "CS 409", title: "The Art of Web Programming" },
          { code: "INFO 490", title: "Advanced AI Web Applications" },
        ],
      },
      {
        term: "Spring 2026",
        courses: [
          { code: "IS 455", title: "Database Design and Prototyping" },
          { code: "IS 492", title: "Introduction to Generative AI" },
          { code: "IS 534", title: "Information Consulting" },
        ],
      },
      {
        term: "Fall 2025",
        courses: [
          { code: "IS 504", title: "Sociotechnical Information Systems" },
          { code: "IS 507", title: "Data, Statistical Models and Information" },
          { code: "IS 525", title: "Data Warehousing and Business Intelligence" },
        ],
      },
    ],
  },
  {
    school: "NMIMS",
    shortName: "NMIMS",
    detail: "Narsee Monjee Institute of Management Studies · Integrated dual degree",
    period: "Jul 2018 – May 2023",
    gpa: "3.53 / 4.00",
    degrees: [
      {
        name: "MBA in Technology Management",
        focus: "Major in Business Intelligence & Analytics · Minor in Marketing Analytics",
      },
      { name: "B.Tech in Electronics & Telecommunication" },
    ],
  },
];

type LifeItem = {
  label: string;
  title: string;
  // Short label printed on the polaroid
  caption: string;
  description: string;
  // Drop photos in public/life/ and list them, e.g. images: ["/life/gym-1.jpg", "/life/gym-2.jpg"].
  // More than one photo turns the card into a slow crossfading slideshow.
  images?: string[];
};

export const life: LifeItem[] = [
  {
    label: "Discipline",
    title: "Gym, Pilates & Climbing",
    caption: "Gym · Pilates · Climbing",
    images: [1, 2, 3, 4].map((n) => `/life/fitness-${n}.jpg`),
    description:
      "Lifting, reformer Pilates, and the climbing wall — where I practice consistency: small, measurable progress, repeated until it compounds.",
  },
  {
    label: "Perspective",
    title: "Travel",
    caption: "Travel",
    images: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/life/travel-${n}.jpg`),
    description:
      "Lakeshores, forest trails, and new horizons — travel keeps me curious and reminds me to look at the bigger picture.",
  },
];
