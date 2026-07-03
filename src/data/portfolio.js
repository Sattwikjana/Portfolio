// ─── Sattwik Jana — single source of truth for all portfolio content ───
// Compiled from CV (2026) + GitHub profile README (github.com/Sattwikjana)

export const profile = {
  name: 'Sattwik Jana',
  firstName: 'Sattwik',
  roles: [
    'Full-Stack Developer',
    'Product Builder',
    'AI / LLM Engineer',
    'Data Analyst',
    'GTM Strategist',
  ],
  tagline: 'I build and launch e-commerce ventures end-to-end.',
  summary:
    'From supplier APIs and payment gateways to AI assistants, SEO, and the go-to-market plan — I take a product from an empty repo to a live, selling storefront. Full-stack developer and PGDM candidate at IMT Hyderabad with a B.Tech in Computer Science from NIT Allahabad.',
  location: 'Hyderabad, India',
  phone: '+91 79087 73477',
  email: 'sattwikjana77@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sattwik-jana/',
  github: 'https://github.com/Sattwikjana',
  liveWork: 'https://www.globalshopper.in',
  currently:
    'Currently building & launching cross-border commerce and AI-powered storefronts at Befach 4X Pvt Ltd.',
}

export const stats = [
  { value: 5, suffix: '+', label: 'Production sites launched' },
  { value: 2, suffix: 'M+', label: 'Products brought to India' },
  { value: 95.8, suffix: '%', label: 'CNN model accuracy', decimals: 1 },
  { value: 1, suffix: '', label: 'Repo → revenue, solo' },
]

export const skillGroups = [
  {
    title: 'Languages',
    icon: 'code',
    skills: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'SQL'],
  },
  {
    title: 'Web & Full-Stack',
    icon: 'globe',
    skills: [
      'Node.js', 'Express.js', 'REST APIs', 'Next.js',
      'React Native (Expo)', 'HTML5', 'CSS3', 'Shopify (Liquid)',
    ],
  },
  {
    title: 'AI / Machine Learning',
    icon: 'brain',
    skills: [
      'Deep Learning (CNN)', 'TensorFlow', 'LLM Tool-Calling',
      'Prompt Engineering', 'NumPy', 'Matplotlib',
    ],
  },
  {
    title: 'Data & Databases',
    icon: 'database',
    skills: ['Power BI', 'MySQL', 'MS SQL Server', 'SQLite', 'DBMS'],
  },
  {
    title: 'Integrations & Tools',
    icon: 'plug',
    skills: [
      'Razorpay', 'Meta Pixel + CAPI', 'Google OAuth',
      'SMTP (SPF/DKIM)', 'Git & GitHub', 'Render', 'EAS', 'Xcode',
    ],
  },
  {
    title: 'Business & Design',
    icon: 'rocket',
    skills: [
      'Go-to-Market Strategy', 'Digital Marketing',
      'Logistics & Fulfillment', 'Canva', 'Adobe Illustrator',
    ],
  },
]

export const marqueeItems = [
  'Node.js', 'Express', 'JavaScript', 'Python', 'Next.js', 'React Native',
  'TensorFlow', 'LLM Tool-Calling', 'Razorpay', 'Meta CAPI', 'Power BI',
  'SQL', 'Shopify', 'SQLite', 'Google OAuth', 'Render', 'Git',
]

export const experience = [
  {
    company: 'Befach 4X Pvt Ltd',
    role: 'Research & Strategy Intern',
    period: '2026 — Present',
    location: 'Hyderabad',
    highlights: [
      'Built & deployed Global Shopper (globalshopper.in) — a cross-border B2C marketplace bringing 2M+ products to India — solo, end-to-end: Node.js/Express backend + vanilla-JS SPA with rate-limit-aware API queues and 3-layer caching (memory / SQLite / disk).',
      'Integrated Razorpay payments end-to-end — HMAC signature verification, authorize→capture, idempotency, automatic refunds — plus a tamper-proof server-side pricing engine (FX, margins, per-unit freight).',
      'Engineered marketing & AI: Meta Pixel + Conversions API with browser↔server event de-duplication, a dynamic-ads product feed, and "Maya" — an LLM tool-calling AI shopping assistant.',
      'Shipped a companion Android app (Expo / React Native, EAS) and operated the platform on Render with zero-downtime releases.',
      'Built & launched four more brand websites: Befach B2B, 91GI, D\'Cal (Shopify/Liquid), and Befach Foods.',
      'Owned go-to-market for these ventures — marketing strategy, logistics & fulfillment, product launches — and built an HR WhatsApp interview bot to automate candidate screening.',
    ],
  },
]

export const education = [
  {
    school: 'IMT Hyderabad',
    fullName: 'Institute of Management Technology',
    degree: 'PGDM',
    period: '2025 — 2027',
  },
  {
    school: 'MNNIT Allahabad',
    fullName: 'Motilal Nehru National Institute of Technology',
    degree: 'B.Tech, Computer Science & Engineering',
    period: '2021 — 2025',
  },
  {
    school: 'Bishnupur High School',
    fullName: 'Class XII (CBSE/WBBSE)',
    degree: 'Higher Secondary',
    period: '2021',
  },
]

export const flagship = {
  name: 'Global Shopper',
  url: 'https://www.globalshopper.in',
  label: 'Flagship · Live & selling',
  pitch:
    'A cross-border B2C e-commerce marketplace bringing 2M+ products to India with all-inclusive INR pricing and 10–15 day delivery. Built and maintained end-to-end, solo — not Shopify, not a framework.',
  features: [
    {
      title: 'Rate-limit-aware backend',
      desc: 'Single Node.js/Express service with priority queues and 3-layer caching (memory → SQLite → disk) so a supplier API powers the whole store without tripping limits.',
      icon: 'server',
    },
    {
      title: 'Tamper-proof pricing engine',
      desc: 'Server-side FX, margin, and per-unit freight quoting with deterministic synthetic discounts. Prices are never trusted from the client.',
      icon: 'shield',
    },
    {
      title: 'Money-safe payments',
      desc: 'Razorpay with HMAC signature verification, authorize→capture, idempotency, and auto-refunds on failure; a gated Cash-on-Delivery flow.',
      icon: 'card',
    },
    {
      title: '"Maya" — AI shopping assistant',
      desc: 'LLM tool-calling agent that searches the live catalog and recommends complementary products, plus a multilingual (Hindi/Hinglish) AI search parser.',
      icon: 'bot',
    },
    {
      title: 'Marketing infrastructure',
      desc: 'Meta Pixel + server-side Conversions API with event de-duplication, dynamic-ads product feed, GTM/GA4, and ZeptoMail SMTP with SPF/DKIM.',
      icon: 'chart',
    },
    {
      title: 'Performance, SEO & mobile',
      desc: 'SSR meta/OG tags, sitemaps, structured data, stale-while-revalidate caching → sub-second cold loads. Companion Android app shipped via EAS.',
      icon: 'zap',
    },
  ],
  stack: [
    'Node.js', 'Express', 'Vanilla JS SPA', 'SQLite', 'Razorpay',
    'Meta CAPI', 'ZeptoMail', 'LLM', 'Expo', 'Render',
  ],
}

export const ventures = [
  {
    name: 'Befach B2B',
    url: 'https://befach.com',
    desc: 'B2B sourcing platform — search Alibaba instantly and get a landed-cost calculator: product + freight + duties → doorstep price.',
    tags: ['Alibaba API', 'Landed-cost engine', 'B2B'],
    accent: '#38bdf8',
  },
  {
    name: '91GI',
    url: 'https://github.com/Sattwikjana/91GI',
    desc: "Premium storefront for India's Geographical-Indication products — 62 heritage products from 22 states, each with its origin story.",
    tags: ['Vanilla JS', 'Heritage commerce', 'Storytelling'],
    accent: '#f59e0b',
  },
  {
    name: "D'Cal",
    url: 'https://github.com/Sattwikjana/dcal-theme',
    desc: 'D2C site for a zero-electricity hard-water softener — custom Shopify theme (Liquid, Dawn-based + premium layer).',
    tags: ['Shopify', 'Liquid', 'D2C'],
    accent: '#34d399',
  },
  {
    name: 'Befach Foods',
    url: 'https://befach.com',
    desc: 'Befach Diet & Diabetic Rice — a premium GI-50 low-glycemic rice D2C brand site, launched with full GTM ownership.',
    tags: ['D2C brand', 'GTM', 'Launch'],
    accent: '#fb7185',
  },
]

export const projects = [
  {
    name: 'Brain Tumor Classification — CNN',
    url: 'https://github.com/Sattwikjana/BRAIN-TUMOR-CLASSIFICATION-USING-CONVOLUTIONAL-NEURAL-NETWORK',
    desc: 'A 4-layer convolutional neural network classifying brain MRI scans into 4 tumor types at 95.8% accuracy, with a full preprocessing → segmentation → training → evaluation pipeline.',
    stack: ['Python', 'TensorFlow', 'NumPy', 'Matplotlib'],
    emoji: '🧠',
    metric: '95.8% accuracy',
  },
  {
    name: 'Research Submission Processor',
    url: 'https://github.com/Sattwikjana/research-submission-processor',
    desc: 'Multi-agent AI system (C# + Microsoft Semantic Kernel) that ingests, translates, validates, summarizes, and answers questions about multilingual research-paper submissions — with human-in-the-loop review.',
    stack: ['C#', 'Semantic Kernel', 'Multi-agent AI'],
    emoji: '🤖',
    metric: 'Multi-agent',
  },
  {
    name: 'Census 2011 Analysis',
    url: 'https://github.com/Sattwikjana/Census_2011_Analysis',
    desc: "Relational database built from India's 2011 Census — SQL insights on literacy, sex ratio, and top districts, wired into an interactive Power BI dashboard.",
    stack: ['MySQL', 'SQL', 'Power BI'],
    emoji: '📊',
    metric: '640 districts',
  },
  {
    name: 'Hotel Chain Analysis',
    url: 'https://github.com/Sattwikjana/Hotel_Chain',
    desc: 'Performance & revenue analysis for a hotel chain — turning raw booking data into business insights with SQL modeling and Power BI reports.',
    stack: ['MS SQL Server', 'Power BI'],
    emoji: '🏨',
    metric: 'Revenue insights',
  },
  {
    name: 'HR WhatsApp Interview Bot',
    url: 'https://github.com/Sattwikjana',
    desc: 'An automation bot that screens and interviews candidates over WhatsApp — conversational hiring on autopilot.',
    stack: ['Node.js', 'WhatsApp API'],
    emoji: '💬',
    metric: 'Hiring on autopilot',
  },
  {
    name: 'Maya — AI Shopping Assistant',
    url: 'https://www.globalshopper.in',
    desc: "LLM tool-calling assistant inside Global Shopper: understands a shopper's need, searches the live catalog, and recommends complementary products.",
    stack: ['Node.js', 'LLM tool-calling'],
    emoji: '🛍️',
    metric: 'Live in production',
  },
]

export const leadership = [
  {
    role: 'Secretary',
    org: 'SPIC MACAY, MNNIT',
    period: '2023 — 2025',
    desc: 'Organized cultural events, workshops, and lectures promoting Indian classical arts on campus.',
  },
  {
    role: 'President',
    org: 'Kalagni (Arts Committee), MNNIT',
    period: '2022 — 2025',
    desc: "Led cultural initiatives and managed large-scale art events, strengthening the institute's cultural identity.",
  },
  {
    role: 'Field Officer',
    org: 'Enactus',
    period: '2022 — 2025',
    desc: 'Promoted and sold handcrafted goods, supporting underprivileged artisans fairly.',
  },
  {
    role: 'Coordinator',
    org: 'Badminton Club, MNNIT',
    period: '2022 — 2025',
    desc: 'Organized tournaments and practice sessions, growing participation and a culture of fitness.',
  },
  {
    role: 'Sunday Activity Incharge',
    org: 'Rotaract Club, MNNIT',
    period: '2022 — 2025',
    desc: 'Led weekly community-service initiatives, driving social impact and student engagement.',
  },
]

export const achievements = [
  { title: "Founder's Award — Outstanding Performance", detail: 'Received during internship at Befach International', icon: '🏆' },
  { title: '2nd Rank — SOLO-LOBO', detail: 'Case Study Event, Avishkar 2023 (MNNIT Technical Fest)', icon: '🥈' },
  { title: '1st Rank — Cluequest', detail: 'Puzzle-Solving Event, Avishkar 2023', icon: '🥇' },
  { title: '1st Rank — Momento Vinci', detail: 'Sketching Competition, Culrav 2k24', icon: '🎨' },
]

export const certifications = [
  { title: 'Databases and SQL for Data Science with Python', org: 'IBM' },
  { title: 'Optimization for Decision Making', org: 'University of Minnesota' },
  { title: 'Sharpening Your Business Acumen', org: 'Harvard Business Publishing' },
]

export const interests = [
  'Painting & Sketching', 'Photography', 'Data Visualization',
  'Artificial Intelligence', 'Designing', 'Data Analysis',
]
