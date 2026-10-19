"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { preloadImages } from "@/lib/mediaCache";
import {
  Code2,
  Terminal,
  Workflow,
  Cpu,
  Monitor,
  Sparkles,
  Layers,
  Search,
  Database,
  Network,
  Globe,
  BrainCircuit,
  Server,
} from "lucide-react";

export interface SkillItem {
  id: string;
  name: string;
  category: "languages" | "web" | "aiml" | "devops" | "cs";
  slug?: string;
  customLogoUrl?: string;
  description: string;
  proficiency: "Expert" | "Advanced" | "Proficient";
  customIcon?: React.ReactNode;
  highlighted?: boolean;
}

const MONO_SLUGS = new Set([
  "nextdotjs",
  "github",
  "vercel",
  "express",
  "prisma",
]);

const SKILL_DATABASE: SkillItem[] = [
  // Languages & Core
  {
    id: "cpp",
    name: "C++",
    category: "languages",
    slug: "cplusplus",
    proficiency: "Expert",
    description:
      "STL, competitive programming, low-level optimization, memory efficiency.",
  },
  {
    id: "ts",
    name: "TypeScript",
    category: "languages",
    slug: "typescript",
    proficiency: "Expert",
    description:
      "Strict typing, generics, interfaces, scalable full-stack web applications.",
  },
  {
    id: "js",
    name: "JavaScript",
    category: "languages",
    slug: "javascript",
    proficiency: "Expert",
    description:
      "ES6+, async/await queues, event loop optimization, DOM execution contexts.",
  },
  {
    id: "c",
    name: "C",
    category: "languages",
    slug: "c",
    proficiency: "Advanced",
    description:
      "Pointers, manual memory management, systems programming fundamentals.",
  },
  {
    id: "sql",
    name: "SQL",
    category: "languages",
    slug: "sqlite",
    proficiency: "Advanced",
    description:
      "Relational queries, joins, indexing, transaction management, constraints.",
  },

  // Web & Full-Stack
  {
    id: "react",
    name: "React.js",
    category: "web",
    slug: "react",
    proficiency: "Expert",
    description:
      "Custom hooks, state management, component architecture, client-side rendering.",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "web",
    slug: "nextdotjs",
    proficiency: "Expert",
    description:
      "App Router, SSR, Server Actions, API routes, performance optimization.",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "web",
    slug: "nodejs",
    proficiency: "Advanced",
    description:
      "Event-driven runtime, streams, REST APIs, asynchronous server architecture.",
  },
  {
    id: "express",
    name: "Express.js",
    category: "web",
    slug: "express",
    proficiency: "Advanced",
    description:
      "RESTful API design, authentication pipelines, routing, middleware orchestration.",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "web",
    slug: "mongodb",
    proficiency: "Advanced",
    description:
      "Document storage, schema design, aggregation pipelines, Mongoose ODM.",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "web",
    slug: "postgresql",
    proficiency: "Advanced",
    description:
      "ACID compliance, relational schema design, complex joins, indexing.",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "web",
    slug: "tailwindcss",
    proficiency: "Expert",
    description:
      "Modern utility design systems, dark mode palettes, responsive layouts.",
  },
  {
    id: "html",
    name: "HTML5",
    category: "web",
    slug: "html5",
    proficiency: "Expert",
    description:
      "Semantic markup, accessibility, modern DOM structure, Web APIs.",
  },
  {
    id: "css",
    name: "CSS3",
    category: "web",
    slug: "css3",
    proficiency: "Expert",
    description:
      "Flexbox, CSS Grid, custom properties, animations, responsive design.",
  },

  // DevOps, Cloud & Tools
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    slug: "docker",
    proficiency: "Advanced",
    description:
      "Containerization, multi-stage builds, isolated environments, deployment.",
  },
  {
    id: "aws",
    name: "AWS EC2",
    category: "devops",
    slug: "amazonwebservices",
    proficiency: "Advanced",
    description:
      "EC2 instance configuration, cloud server deployment, security groups.",
  },
  {
    id: "git",
    name: "Git",
    category: "devops",
    slug: "git",
    proficiency: "Expert",
    description:
      "Version control, branching strategies, merge conflicts, interactive rebasing.",
  },
  {
    id: "github",
    name: "GitHub",
    category: "devops",
    slug: "github",
    proficiency: "Expert",
    description:
      "CI/CD workflows, pull request reviews, repository management.",
  },
  {
    id: "postman",
    name: "Postman",
    category: "devops",
    slug: "postman",
    proficiency: "Advanced",
    description:
      "API testing, request collections, environment variables, endpoint debugging.",
  },
  {
    id: "linux",
    name: "Linux",
    category: "devops",
    slug: "linux",
    proficiency: "Advanced",
    description:
      "Shell navigation, Bash scripting, system utilities, process management.",
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "devops",
    slug: "visualstudiocode",
    proficiency: "Expert",
    description:
      "Custom development workflow, debugging, extension ecosystem.",
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "devops",
    slug: "vercel",
    proficiency: "Expert",
    description:
      "Continuous deployment, preview branch builds, edge serverless hosting.",
  },

  // CS Core & Algorithms
  {
    id: "dsa",
    name: "Data Structures",
    category: "cs",
    customIcon: <Workflow className="w-5 h-5" />,
    proficiency: "Expert",
    description:
      "Arrays, Trees, Graphs, Hash Maps, Tries, Disjoint Sets, Segment Trees.",
  },
  {
    id: "dp",
    name: "Dynamic Prog.",
    category: "cs",
    customIcon: <Workflow className="w-5 h-5" />,
    proficiency: "Expert",
    description:
      "Memoization, tabulation, state transitions, combinatorial optimization.",
  },
  {
    id: "graphs",
    name: "Graph Algorithms",
    category: "cs",
    customIcon: <Network className="w-5 h-5" />,
    proficiency: "Expert",
    description:
      "Dijkstra, BFS/DFS, Bellman-Ford, Kruskal, topological sorting, flow networks.",
  },
  {
    id: "oop",
    name: "OOP Principles",
    category: "cs",
    customIcon: <Layers className="w-5 h-5" />,
    proficiency: "Expert",
    description:
      "Encapsulation, inheritance, polymorphism, abstraction, design patterns.",
  },
  {
    id: "os",
    name: "Operating Systems",
    category: "cs",
    customIcon: <Cpu className="w-5 h-5" />,
    proficiency: "Advanced",
    description:
      "Concurrency, process synchronization, paging, virtual memory, deadlocks.",
  },
  {
    id: "dbms",
    name: "DBMS Core",
    category: "cs",
    customIcon: <Database className="w-5 h-5" />,
    proficiency: "Advanced",
    description:
      "Relational algebra, normalization (1NF-BCNF), ACID properties, indexing.",
  },
  {
    id: "cn",
    name: "Computer Networks",
    category: "cs",
    customIcon: <Globe className="w-5 h-5" />,
    proficiency: "Advanced",
    description:
      "OSI & TCP/IP stack, HTTP/HTTPS, WebSockets, DNS, TCP handshakes.",
  },
];

const CATEGORIES = [
  { id: "all", label: "All", icon: <Sparkles className="w-3.5 h-3.5" /> },
  {
    id: "languages",
    label: "Languages",
    icon: <Code2 className="w-3.5 h-3.5" />,
  },
  { id: "web", label: "Web & DB", icon: <Monitor className="w-3.5 h-3.5" /> },
  {
    id: "devops",
    label: "DevOps & Tools",
    icon: <Server className="w-3.5 h-3.5" />,
  },
  { id: "cs", label: "CS & Systems", icon: <Cpu className="w-3.5 h-3.5" /> },
];

function SkillIconBadge({
  skill,
  isSelected,
  onSelect,
  isDark,
}: {
  skill: SkillItem;
  isSelected: boolean;
  onSelect: () => void;
  isDark: boolean;
}) {
  const [imgError, setImgError] = React.useState(false);

  const iconUrl = skill.customLogoUrl
    ? skill.customLogoUrl
    : skill.slug
      ? MONO_SLUGS.has(skill.slug)
        ? `https://cdn.simpleicons.org/${skill.slug}/${isDark ? "ffffff" : "000000"}`
        : `https://cdn.simpleicons.org/${skill.slug}`
      : null;

  // Highlight only when user clicks specific skill tile
  const isHighlighted = isSelected;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      tabIndex={0}
      role="button"
      aria-label={`Skill: ${skill.name}`}
      className={`relative group flex flex-col items-center justify-center rounded-2xl transition-all duration-300 select-none cursor-pointer p-2.5 sm:p-3 aspect-square ${
        isHighlighted
          ? "bg-primary/10 border border-primary shadow-[0_0_12px_rgba(0,255,156,0.25)] z-10"
          : "bg-card/60 border border-border/70 hover:border-border hover:bg-card/90"
      }`}
    >
      {/* Skill Logo */}
      <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center relative my-auto">
        {iconUrl && !imgError ? (
          <img
            src={iconUrl}
            alt={skill.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-md"
            loading="lazy"
          />
        ) : skill.customIcon ? (
          <div
            className={`transition-colors ${
              isHighlighted
                ? "text-primary"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          >
            {skill.customIcon}
          </div>
        ) : (
          <div className="w-full h-full rounded-lg bg-muted flex items-center justify-center text-xs font-mono font-bold text-muted-foreground">
            {skill.name.slice(0, 3).toUpperCase()}
          </div>
        )}
      </div>

      {/* Skill Title */}
      <span
        className={`text-[10px] sm:text-[11px] font-mono mt-1 font-medium truncate max-w-full text-center px-1 ${
          isHighlighted
            ? "text-primary font-semibold"
            : "text-muted-foreground group-hover:text-foreground"
        }`}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

export function CoreSkills() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [selectedSkill, setSelectedSkill] = React.useState<SkillItem | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  React.useEffect(() => {
    // Preload all SVG icons into memory cache for zero latency
    const urls = SKILL_DATABASE.map((s) => {
      if (s.customLogoUrl) return s.customLogoUrl;
      if (!s.slug) return null;
      return MONO_SLUGS.has(s.slug)
        ? `https://cdn.simpleicons.org/${s.slug}/${isDark ? "ffffff" : "000000"}`
        : `https://cdn.simpleicons.org/${s.slug}`;
    }).filter(Boolean) as string[];
    preloadImages(urls);
  }, [isDark]);

  const filteredSkills = React.useMemo(() => {
    return SKILL_DATABASE.filter((skill) => {
      const matchesCategory =
        activeCategory === "all" || skill.category === activeCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section
      className="py-16 px-4 max-w-3xl mx-auto w-full relative"
      id="skills"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-foreground flex items-center gap-2 mb-1">
            <Code2 className="w-5 h-5 text-primary" /> Skills & Tech Stack
          </h2>
          <p className="text-sm text-muted-foreground font-mono mt-1">
            Languages, frameworks, tools, and systems engineering benchmarks.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-56">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-card/60 border border-border/60 rounded-xl font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-mono text-xs transition-all duration-300 border cursor-pointer ${
                isActive
                  ? "bg-primary/10 border-primary/40 text-primary font-semibold shadow-sm"
                  : "bg-card/40 border-border/30 text-muted-foreground hover:bg-card/80 hover:text-foreground"
              }`}
            >
              <span
                className={isActive ? "text-primary" : "text-muted-foreground"}
              >
                {cat.icon}
              </span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tech Skill Logo Grid Container */}
      <div className="bg-card/80 backdrop-blur-md border border-border/80 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
        {/* Skill Badges Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2.5 sm:gap-3 relative z-10">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkill?.id === skill.id;

            return (
              <SkillIconBadge
                key={skill.id}
                skill={skill}
                isSelected={isSelected}
                onSelect={() => setSelectedSkill(skill)}
                isDark={isDark}
              />
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="py-12 text-center text-muted-foreground font-mono text-xs">
            No technical skills found matching &quot;{searchQuery}&quot;
          </div>
        )}
      </div>
    </section>
  );
}
