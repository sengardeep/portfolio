"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, FileText, Globe } from "lucide-react";

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  bullets: string[];
  badge?: string;
  logo?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  buttonText?: string;
  buttonLink?: string;
  logo?: string;
}

const EDUCATION_DATA: EducationItem[] = [
  {
    id: "knit",
    institution: "Kamla Nehru Institute of Technology (KNIT), Sultanpur",
    degree: "B.Tech in Information Technology",
    period: "Sep 2023 – May 2027",
    location: "Sultanpur, India",
    logo: "/images/knit.png",
    bullets: [
      "CGPA: 8.5",
      "Core Coursework: Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, OOP",
    ],
    badge: "Current Degree",
  },
  {
    id: "sgic",
    institution: "Shri Gopal Inter College",
    degree: "Intermediate (Class XII)",
    period: "2021 – 2022",
    location: "Auraiya, India",
    bullets: [
      "Completed Class XII Intermediate examination with 84.5% aggregate score",
    ],
  },
];

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "ptsc",
    company: "Programming and TechSkill Club (PTSC), KNIT",
    role: "Competitive Programming Head",
    period: "Nov 2024 – Present",
    location: "Sultanpur, India",
    logo: "/images/ptsc.png",
    bullets: [
      "Organized and conducted 20+ competitive programming contests at the college level, growing student participation and building a stronger problem-solving culture.",
      "Mentored junior students under PTSC – Ignite Summers 2025 with daily curated resources, self-prepared topic-wise problem sheets, and end-of-day editorials.",
      "Applied advanced CP algorithms (graph theory, dynamic programming, core data structures) through consistent practice and national-level contests.",
    ],
    buttonText: "Club Website",
    buttonLink: "https://ptsc.app",
  },
];

function ItemLogo({
  src,
  alt,
  fallbackIcon,
}: {
  src?: string;
  alt: string;
  fallbackIcon: React.ReactNode;
}) {
  const [hasError, setHasError] = React.useState(false);

  if (src && !hasError) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        className="w-11 h-11 rounded-xl object-contain bg-muted/60 border border-border/60 p-1 shrink-0"
        loading="lazy"
      />
    );
  }

  return (
    <div className="w-11 h-11 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-center text-primary shrink-0">
      {fallbackIcon}
    </div>
  );
}

export function EducationExperience() {
  const [activeTab, setActiveTab] = React.useState<"education" | "experience">("experience");

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto w-full relative" id="education">
      {/* Top Toggle Bar */}
      <div className="flex justify-start mb-8">
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-card/80 border border-border/80 shadow-md backdrop-blur-md">
          <button
            onClick={() => setActiveTab("experience")}
            className={`px-8 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "experience"
                ? "bg-primary text-primary-foreground shadow-md font-bold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`px-8 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "education"
                ? "bg-primary text-primary-foreground shadow-md font-bold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            Education
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "education" ? (
          <motion.div
            key="education"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {EDUCATION_DATA.map((edu) => (
              <div
                key={edu.id}
                className="bg-card/80 backdrop-blur-md border border-border/80 hover:border-primary/40 rounded-2xl p-6 sm:p-7 relative overflow-hidden group shadow-lg transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <ItemLogo
                      src={edu.logo}
                      alt={edu.institution}
                      fallbackIcon={<GraduationCap className="w-6 h-6" />}
                    />
                    <div>
                      <h3 className="text-lg font-bold font-sans text-foreground">
                        {edu.institution}
                      </h3>
                      <p className="text-sm text-primary font-sans font-semibold mt-0.5">
                        {edu.degree}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-muted-foreground text-left sm:text-right shrink-0">
                    <p>{edu.period}</p>
                    <p className="text-muted-foreground/80">{edu.location}</p>
                  </div>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm font-sans text-foreground/90 leading-relaxed mb-5 pl-1">
                  {edu.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {edu.badge && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary text-secondary-foreground font-mono text-xs font-semibold shadow-sm border border-border/40">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{edu.badge}</span>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {EXPERIENCE_DATA.map((exp) => (
              <div
                key={exp.id}
                className="bg-card/80 backdrop-blur-md border border-border/80 hover:border-primary/40 rounded-2xl p-6 sm:p-7 relative overflow-hidden group shadow-lg transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <ItemLogo
                      src={exp.logo}
                      alt={exp.company}
                      fallbackIcon={<Briefcase className="w-6 h-6" />}
                    />
                    <div>
                      <h3 className="text-lg font-bold font-sans text-foreground">
                        {exp.company}
                      </h3>
                      <p className="text-sm text-primary font-sans font-semibold mt-0.5">
                        {exp.role}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-muted-foreground text-left sm:text-right shrink-0">
                    <p>{exp.period}</p>
                    <p className="text-muted-foreground/80">{exp.location}</p>
                  </div>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm font-sans text-foreground/90 leading-relaxed mb-5 pl-1">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {exp.buttonText && (
                  <a
                    href={exp.buttonLink || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary text-secondary-foreground font-mono text-xs font-semibold shadow-sm hover:bg-secondary/80 transition-colors cursor-pointer border border-border/40"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{exp.buttonText}</span>
                  </a>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
