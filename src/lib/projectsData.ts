export type ProjectCategory = "ALL" | "AI/ML/DL" | "WebDev";

export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  challenges: string;
  metrics: string;
  tech: string[];
  github: string;
  live: string;
  linkedin?: string;
  category: "AI/ML/DL" | "WebDev";
  thumbnail: string;
  featured?: boolean;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "rank-ai",
    title: "Rank AI: Full-Stack SEO Analytics SaaS",
    category: "AI/ML/DL",
    featured: true,
    thumbnail: "/images/projects/rank-ai.png",
    shortDesc:
      "Full-stack SEO analytics SaaS on the MERN stack with user authentication, protected dashboards, and Google Gemini AI audit reports.",
    description:
      "Rank AI is a comprehensive full-stack SEO analytics platform engineered with MongoDB, Express.js, React.js, Node.js, and Google Gemini AI. It provides authenticated analytical dashboards, automated website audits, and keyword tracking.",
    challenges:
      "Integrating Google Gemini AI to auto-generate deep SEO audit reports (accessibility, link analysis, image optimization) with actionable recommendations while maintaining responsive sub-second API performance.",
    metrics:
      "Automated complete SEO audit reports, keyword rank tracker with competitor comparison, and persistent historical trend storage.",
    tech: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Gemini AI",
      "Tailwind CSS",
      "REST APIs",
    ],
    github: "https://github.com/sengardeep/RankAI",
    live: "https://rank-ai-phi.vercel.app/",
  },
  {
    id: "effulgence",
    title: "Effulgence: College Fest Event Management Platform",
    category: "WebDev",
    featured: true,
    thumbnail: "/images/projects/effulgence.png",
    shortDesc:
      "Event management module for college fest: event administration, participant registration, role-based access control, and conditional payment logic.",
    description:
      "Built the core event management module for KNIT's annual fest platform. Features full administrator event controls, comprehensive student registration workflows, and role-based access control.",
    challenges:
      "Architecting JWT + Google OAuth authentication with conditional payment logic: registration fees waived for verified college email domains while charging external participants via domain verification.",
    metrics:
      "Seamless multi-developer collaboration using Git/GitHub with code review and continuous integration across multiple backend modules.",
    tech: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Google OAuth",
      "JWT",
      "REST APIs",
    ],
    github: "https://github.com/programming-club-knit/Effulgence26-backend",
    live: "",
  },
  {
    id: "auth-capsule",
    title: "Auth Capsule: Pluggable OTP & Token Management NPM Package",
    category: "WebDev",
    featured: true,
    thumbnail: "/images/projects/auth-capsule.png",
    shortDesc:
      "Published reusable npm package for OTP-based authentication and access/refresh token management with automatic refresh token rotation.",
    description:
      "Auth Capsule is a published, open-source npm library providing secure OTP-based authentication and access/refresh token management with automated refresh token rotation.",
    challenges:
      "Engineering a configuration-driven architecture with pluggable custom DB adapters and OTP providers without locking downstream developers into specific database engines.",
    metrics:
      "Published on the public npm registry with zero external runtime dependencies and full modular adapter compatibility.",
    tech: ["Node.js", "JavaScript", "JWT", "npm"],
    github: "https://github.com/sengardeep/auth-capsule",
    live: "https://www.npmjs.com/package/auth-capsule",
  },
];
