"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Trophy,
  Activity,
  FolderKanban,
  Star,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface SnapshotMetric {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  accentBorder: string;
  badgeText: string;
}

const solvedPieData = [
  { name: "LeetCode", value: 1097, color: "#22c55e" },
  { name: "Codeforces", value: 800, color: "#10b981" },
  { name: "CodeChef", value: 200, color: "#f97316" },
  { name: "AtCoder", value: 100, color: "#a3e635" },
  { name: "Contests & Practice", value: 303, color: "#34d399" },
];

export function EngineeringSnapshot() {
  const [activeModal, setActiveModal] = React.useState<string | null>(null);

  const metrics: SnapshotMetric[] = [
    {
      id: "solved",
      label: "Problems Solved",
      value: "2,500+",
      icon: <Code2 className="w-4 h-4" />,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      glowColor: "from-emerald-500/15 via-emerald-500/5 to-transparent",
      accentBorder: "hover:border-emerald-500/40",
      badgeText: "4 Platforms",
    },
    {
      id: "hackathon",
      label: "Hackathon & Honors",
      value: "2nd Place",
      icon: <Trophy className="w-4 h-4" />,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/25",
      glowColor: "from-amber-500/15 via-amber-500/5 to-transparent",
      accentBorder: "hover:border-amber-500/40",
      badgeText: "Hack The Web",
    },
    {
      id: "github",
      label: "GitHub Commits",
      value: "Active",
      icon: <GithubIcon className="w-4 h-4" />,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      glowColor: "from-emerald-500/15 via-emerald-500/5 to-transparent",
      accentBorder: "hover:border-emerald-500/40",
      badgeText: "@sengardeep",
    },
    {
      id: "contests",
      label: "Contests Attended",
      value: "200+",
      icon: <Activity className="w-4 h-4" />,
      color: "text-lime-400 bg-lime-500/10 border-lime-500/25",
      glowColor: "from-lime-500/15 via-lime-500/5 to-transparent",
      accentBorder: "hover:border-lime-500/40",
      badgeText: "200+ Contests",
    },
    {
      id: "projects",
      label: "Projects Built",
      value: "10+",
      icon: <FolderKanban className="w-4 h-4" />,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      glowColor: "from-emerald-500/15 via-emerald-500/5 to-transparent",
      accentBorder: "hover:border-emerald-500/40",
      badgeText: "Full-Stack",
    },
    {
      id: "rating",
      label: "Peak Rating",
      value: "2134",
      icon: <Star className="w-4 h-4" />,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      glowColor: "from-emerald-500/15 via-emerald-500/5 to-transparent",
      accentBorder: "hover:border-emerald-500/40",
      badgeText: "Guardian Peak",
    },
  ];

  const handleCardClick = (id: string) => {
    if (id === "projects") {
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      setActiveModal(id);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveModal(null);
    setTimeout(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto w-full relative">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-foreground flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-primary" /> Engineering Snapshot
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-mono">
            Key metrics and computational benchmarks. Tap any metric for deep
            breakdown.
          </p>
        </div>
      </div>

      {/* Modern Grid Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.35, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            className="h-full"
          >
            <Card
              onClick={() => handleCardClick(metric.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(metric.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${metric.label}`}
              className={`relative bg-card/60 backdrop-blur-md border border-border/60 ${metric.accentBorder} transition-all duration-300 group overflow-hidden h-full cursor-pointer shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl`}
            >
              {/* Subtle Ambient Radial Hover Glow */}
              <div
                className={`absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br ${metric.glowColor} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Top Subtle Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardContent className="p-3.5 sm:p-4 flex flex-col justify-between h-full min-h-[115px]">
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className={`p-2 rounded-lg border ${metric.color} shrink-0 transition-transform group-hover:scale-105 duration-300`}
                  >
                    {metric.icon}
                  </div>

                  <span className="text-[9px] sm:text-[9.5px] font-mono font-bold text-muted-foreground/70 group-hover:text-primary transition-colors flex items-center gap-0.5 bg-muted/40 px-2 py-0.5 rounded-full border border-border/30">
                    {metric.badgeText}
                  </span>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>{metric.value}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] text-muted-foreground font-mono uppercase tracking-wider mt-1 font-extrabold truncate">
                    {metric.label}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Breakdown Dialog Modals */}
      <Dialog
        open={activeModal !== null}
        onOpenChange={(open) => !open && setActiveModal(null)}
      >
        <DialogContent className="w-[calc(100%-1.25rem)] sm:w-[calc(100%-2rem)] max-w-md md:max-w-2xl lg:max-w-3xl max-h-[85vh] sm:max-h-[88vh] bg-card/95 backdrop-blur-2xl border-border/50 shadow-2xl p-4 sm:p-6 md:p-7 rounded-2xl border-t-2 border-t-primary/60 transition-all duration-300 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {activeModal === "solved" && (
              <motion.div
                key="modal-solved"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 overflow-y-auto max-h-[calc(85vh-2.5rem)] sm:max-h-[calc(88vh-3.5rem)] pr-1 sm:pr-1.5 scrollbar-thin scrollbar-thumb-muted-foreground/20 touch-pan-y"
              >
                <DialogHeader className="pb-3 border-b border-border/30">
                  <DialogTitle className="text-base md:text-lg font-mono flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-foreground font-bold">
                    <span className="flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-emerald-400 shrink-0" />{" "}
                      Problems Solved Breakdown
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full shrink-0">
                      2,500+ Total Solved
                    </span>
                  </DialogTitle>
                  <DialogDescription className="text-xs font-mono text-muted-foreground mt-1">
                    Structured distribution of solved algorithmic problems
                    across competitive programming platforms.
                  </DialogDescription>
                </DialogHeader>

                {/* Summary Stat Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center">
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      Total Solved
                    </span>
                    <span className="text-base font-black text-emerald-400">
                      2,500+
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      LeetCode
                    </span>
                    <span className="text-base font-black text-emerald-400">
                      1,097+
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      Codeforces
                    </span>
                    <span className="text-base font-black text-emerald-500">
                      800+
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      CodeChef + AtCoder
                    </span>
                    <span className="text-base font-black text-lime-400">
                      300+
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 py-1 items-center">
                  {/* Left Column: Donut Pie Chart Visual */}
                  <div className="md:col-span-5 relative w-full h-44 sm:h-48 flex items-center justify-center p-3 rounded-2xl bg-muted/10 border border-border/20 shadow-inner">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={solvedPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={44}
                          outerRadius={64}
                          paddingAngle={4}
                          dataKey="value"
                          stroke="none"
                          cornerRadius={5}
                        >
                          {solvedPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-xl font-black font-mono text-foreground tracking-tight">
                        2,500+
                      </span>
                      <span className="text-[8.5px] text-muted-foreground uppercase font-mono font-bold tracking-widest -mt-0.5">
                        Problems
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Platform Breakdown Cards */}
                  <div className="md:col-span-7 space-y-2.5 font-mono text-xs max-h-[46vh] overflow-y-auto pr-1 scrollbar-thin">
                    {/* LeetCode Card */}
                    <div className="p-3 rounded-xl bg-muted/20 border border-border/30 hover:border-emerald-500/40 transition-all space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 shadow-sm" />
                          <span className="font-bold text-foreground">
                            LeetCode
                          </span>
                        </div>
                        <span className="font-black text-emerald-400 text-sm">
                          1,097+
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full w-[44%]" />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/20 font-bold">
                            290 Easy
                          </span>
                          <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.2 rounded border border-amber-500/20 font-bold">
                            635 Med
                          </span>
                          <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.2 rounded border border-rose-500/20 font-bold">
                            172 Hard
                          </span>
                        </div>
                        <span className="font-bold">Guardian Rank</span>
                      </div>
                    </div>

                    {/* Codeforces Card */}
                    <div className="p-3 rounded-xl bg-muted/20 border border-border/30 hover:border-emerald-500/40 transition-all space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 shadow-sm" />
                          <span className="font-bold text-foreground">
                            Codeforces
                          </span>
                        </div>
                        <span className="font-black text-emerald-400 text-sm">
                          800+
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[32%]" />
                      </div>
                      <div className="text-[10px] text-muted-foreground flex justify-between">
                        <span>Div. 2 & Div. 3 Contest Rounds</span>
                        <span className="font-bold">Expert (1661)</span>
                      </div>
                    </div>

                    {/* CodeChef Card */}
                    <div className="p-3 rounded-xl bg-muted/20 border border-border/30 hover:border-orange-500/40 transition-all space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shrink-0 shadow-sm" />
                          <span className="font-bold text-foreground">
                            CodeChef
                          </span>
                        </div>
                        <span className="font-black text-orange-400 text-sm">
                          200+
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden">
                        <div className="h-full bg-orange-400 rounded-full w-[12%]" />
                      </div>
                      <div className="text-[10px] text-muted-foreground flex justify-between">
                        <span>Starters Contests & Ranked Rounds</span>
                        <span className="font-bold">4-Star (1868)</span>
                      </div>
                    </div>

                    {/* AtCoder Card */}
                    <div className="p-3 rounded-xl bg-muted/20 border border-border/30 hover:border-lime-500/40 transition-all space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-lime-400 shrink-0 shadow-sm" />
                          <span className="font-bold text-foreground">
                            AtCoder
                          </span>
                        </div>
                        <span className="font-black text-lime-400 text-sm">
                          100+
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden">
                        <div className="h-full bg-lime-400 rounded-full w-[8%]" />
                      </div>
                      <div className="text-[10px] text-muted-foreground flex justify-between">
                        <span>AtCoder Beginner & Regular Rounds</span>
                        <span className="font-bold">Cyan / 4 Kyu (1246)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Topic Badges */}
                <div className="pt-2 border-t border-border/30">
                  <div className="text-[10.5px] font-mono text-muted-foreground mb-1.5 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-primary shrink-0" /> Key
                    Algorithms & Data Structure Domains
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded-md bg-muted/30 border border-border/40 text-foreground font-semibold">
                      Dynamic Programming
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-muted/30 border border-border/40 text-foreground font-semibold">
                      Graph Optimization
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-muted/30 border border-border/40 text-foreground font-semibold">
                      Trees & Binary Search
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-muted/30 border border-border/40 text-foreground font-semibold">
                      Segment Trees
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-muted/30 border border-border/40 text-foreground font-semibold">
                      Bit Manipulation
                    </span>
                  </div>
                </div>

                {/* Mobile Friendly Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-1 border-t border-border/20">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full py-2.5 px-4 bg-muted/60 text-foreground font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-muted transition-all border border-border/40 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Snapshot</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      scrollToSection("achievements");
                    }}
                    className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md cursor-pointer"
                  >
                    <span>View Full CP Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {activeModal === "hackathon" && (
              <motion.div
                key="modal-hackathon"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 overflow-y-auto max-h-[calc(85vh-2.5rem)] sm:max-h-[calc(88vh-3.5rem)] pr-1 sm:pr-1.5 scrollbar-thin scrollbar-thumb-muted-foreground/20 touch-pan-y"
              >
                <DialogHeader className="pb-3 border-b border-border/30">
                  <DialogTitle className="text-base md:text-lg font-mono flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-foreground font-bold">
                    <span className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-400 shrink-0" />{" "}
                      Hack The Web 2025
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full shrink-0">
                      2nd Place Winner
                    </span>
                  </DialogTitle>
                  <DialogDescription className="text-xs font-mono text-muted-foreground mt-1">
                    Competitive hackathon victory details, global contest ranks, and engineering honors.
                  </DialogDescription>
                </DialogHeader>

                {/* Summary Stat Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
                    <span className="text-[10px] text-amber-400/80 block font-bold uppercase tracking-wider">
                      Placement
                    </span>
                    <span className="text-base font-black text-amber-400">
                      2nd Place
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      Event
                    </span>
                    <span className="text-base font-black text-foreground">
                      Hack The Web
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      Category
                    </span>
                    <span className="text-base font-black text-emerald-400">
                      Open Source
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      Host
                    </span>
                    <span className="text-base font-black text-emerald-400">
                      KNIT
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-1 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2 flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      Hack The Web 2025 (2nd Place)
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed font-sans">
                      Secured 2nd position in the Open Source Hackathon organized at KNIT Sultanpur, architecting high-performance web solutions and collaborative tooling.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/20 border border-border/30 space-y-2 flex flex-col justify-between">
                    <span className="text-[11px] font-bold text-foreground uppercase tracking-wider block">
                      Global Competitive Honors
                    </span>
                    <ul className="text-muted-foreground text-xs font-sans space-y-1.5 list-disc list-inside">
                      <li>Meta Hacker Cup 2025 Round 2: Global Rank 1,451</li>
                      <li>TCS CodeVita Season 12: Global Rank 3,073</li>
                      <li>Short Int Aug&apos;25: 3rd Place out of 200+ participants</li>
                    </ul>
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="pt-2 border-t border-border/30">
                  <div className="text-[10.5px] font-mono text-muted-foreground mb-1.5 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />{" "}
                    Technologies & Architecture
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-400 font-bold">
                      Next.js
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-muted/30 border border-border/40 text-foreground font-semibold">
                      TypeScript
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-muted/30 border border-border/40 text-foreground font-semibold">
                      Node.js
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-muted/30 border border-border/40 text-foreground font-semibold">
                      Express.js
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-muted/30 border border-border/40 text-foreground font-semibold">
                      MongoDB
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-muted/30 border border-border/40 text-foreground font-semibold">
                      Tailwind CSS
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-1 border-t border-border/20">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full py-2.5 px-4 bg-muted/60 text-foreground font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-muted transition-all border border-border/40 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Snapshot</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      scrollToSection("projects");
                    }}
                    className="w-full py-2.5 px-4 bg-emerald-500 text-black font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all shadow-md cursor-pointer"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {activeModal === "github" && (
              <motion.div
                key="modal-github"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 overflow-y-auto max-h-[calc(85vh-2.5rem)] sm:max-h-[calc(88vh-3.5rem)] pr-1 sm:pr-1.5 scrollbar-thin scrollbar-thumb-muted-foreground/20 touch-pan-y"
              >
                <DialogHeader className="pb-3 border-b border-border/30">
                  <DialogTitle className="text-base md:text-lg font-mono flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-foreground font-bold">
                    <span className="flex items-center gap-2">
                      <GithubIcon className="w-5 h-5 text-emerald-400 shrink-0" />{" "}
                      GitHub Open Source Activity
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full shrink-0">
                      Active Contributor
                    </span>
                  </DialogTitle>
                  <DialogDescription className="text-xs font-mono text-muted-foreground mt-1">
                    Open-source repositories, developer tools, npm packages, and production backend services.
                  </DialogDescription>
                </DialogHeader>

                {/* Summary Stat Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                    <span className="text-[10px] text-emerald-400/80 block font-bold uppercase tracking-wider">
                      Username
                    </span>
                    <span className="text-base font-black text-emerald-400">
                      @sengardeep
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      Cadence
                    </span>
                    <span className="text-base font-black text-foreground">
                      Daily Streaks
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      Core Languages
                    </span>
                    <span className="text-base font-black text-emerald-400">
                      C++ &amp; TS
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      Open Source
                    </span>
                    <span className="text-base font-black text-emerald-400">
                      Active
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-1 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 flex flex-col justify-between">
                    <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      Engineering &amp; Packages
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed font-sans">
                      Building full-stack platforms like Rank AI, college fest backend systems (Effulgence), and published npm security packages like auth-capsule.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/20 border border-border/30 space-y-2 flex flex-col justify-between">
                    <span className="text-[11px] font-bold text-foreground uppercase tracking-wider block">
                      Activity Highlights
                    </span>
                    <ul className="text-muted-foreground text-xs font-sans space-y-1.5 list-disc list-inside">
                      <li>Authored &amp; published npm package: auth-capsule</li>
                      <li>Architected backend for annual college tech fest (Effulgence)</li>
                      <li>AI-powered resume &amp; interview preparation engine (Rank AI)</li>
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-1 border-t border-border/20">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="py-2.5 px-3 bg-muted/60 text-foreground font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 hover:bg-muted transition-all border border-border/40 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      scrollToSection("github");
                    }}
                    className="py-2.5 px-3 bg-muted text-foreground font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 hover:bg-muted/80 transition-all border border-border/40 cursor-pointer"
                  >
                    <span>Heatmap Section</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://github.com/sengardeep"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-emerald-500 text-black font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 hover:bg-emerald-400 transition-all cursor-pointer font-bold"
                  >
                    <span>@sengardeep</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )}

            {activeModal === "contests" && (
              <motion.div
                key="modal-contests"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 overflow-y-auto max-h-[calc(85vh-2.5rem)] sm:max-h-[calc(88vh-3.5rem)] pr-1 sm:pr-1.5 scrollbar-thin scrollbar-thumb-muted-foreground/20 touch-pan-y"
              >
                <DialogHeader className="pb-3 border-b border-border/30">
                  <DialogTitle className="text-base md:text-lg font-mono flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-foreground font-bold">
                    <span className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-400 shrink-0" />{" "}
                      Rated Contest Attendance
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full shrink-0">
                      200+ Contests Attended
                    </span>
                  </DialogTitle>
                  <DialogDescription className="text-xs font-mono text-muted-foreground mt-1">
                    Attendance breakdown across competitive programming rounds and timed algorithmic contests.
                  </DialogDescription>
                </DialogHeader>

                {/* Summary Stat Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                    <span className="text-[10px] text-emerald-400/80 block font-bold uppercase tracking-wider">
                      Total Contests
                    </span>
                    <span className="text-base font-black text-emerald-400">
                      200+
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      LeetCode
                    </span>
                    <span className="text-base font-black text-amber-400">
                      70+
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      Codeforces
                    </span>
                    <span className="text-base font-black text-emerald-400">
                      50+
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      CodeChef &amp; AtCoder
                    </span>
                    <span className="text-base font-black text-orange-400">
                      80+
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 py-1 font-mono text-xs">
                  {/* LeetCode Card */}
                  <div className="p-3.5 rounded-xl bg-muted/20 border border-border/30 hover:border-amber-500/40 transition-all space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-foreground block">
                          LeetCode
                        </span>
                        <span className="font-black text-amber-400 text-base">
                          70+
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden mb-1.5">
                        <div className="h-full bg-amber-400 rounded-full w-[35%]" />
                      </div>
                      <span className="text-[10px] text-muted-foreground leading-snug block">
                        Guardian (Top 1% globally)
                      </span>
                    </div>
                  </div>

                  {/* Codeforces Card */}
                  <div className="p-3.5 rounded-xl bg-muted/20 border border-border/30 hover:border-emerald-500/40 transition-all space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-foreground block">
                          Codeforces
                        </span>
                        <span className="font-black text-emerald-400 text-base">
                          50+
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden mb-1.5">
                        <div className="h-full bg-emerald-400 rounded-full w-[25%]" />
                      </div>
                      <span className="text-[10px] text-muted-foreground leading-snug block">
                        Expert (Rating 1661)
                      </span>
                    </div>
                  </div>

                  {/* CodeChef Card */}
                  <div className="p-3.5 rounded-xl bg-muted/20 border border-border/30 hover:border-orange-500/40 transition-all space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-foreground block">
                          CodeChef
                        </span>
                        <span className="font-black text-orange-400 text-base">
                          60+
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden mb-1.5">
                        <div className="h-full bg-orange-400 rounded-full w-[30%]" />
                      </div>
                      <span className="text-[10px] text-muted-foreground leading-snug block">
                        4-Star (Rating 1868)
                      </span>
                    </div>
                  </div>

                  {/* AtCoder Card */}
                  <div className="p-3.5 rounded-xl bg-muted/20 border border-border/30 hover:border-teal-500/40 transition-all space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-foreground block">
                          AtCoder
                        </span>
                        <span className="font-black text-teal-400 text-base">
                          21+
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden mb-1.5">
                        <div className="h-full bg-teal-400 rounded-full w-[10%]" />
                      </div>
                      <span className="text-[10px] text-muted-foreground leading-snug block">
                        Cyan 4-Kyu (Rating 1246)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-1 border-t border-border/20">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full py-2.5 px-4 bg-muted/60 text-foreground font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-muted transition-all border border-border/40 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Snapshot</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      scrollToSection("achievements");
                    }}
                    className="w-full py-2.5 px-4 bg-emerald-500 text-black font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all shadow-md cursor-pointer font-bold"
                  >
                    <span>View CP Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {activeModal === "rating" && (
              <motion.div
                key="modal-rating"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 overflow-y-auto max-h-[calc(85vh-2.5rem)] sm:max-h-[calc(88vh-3.5rem)] pr-1 sm:pr-1.5 scrollbar-thin scrollbar-thumb-muted-foreground/20 touch-pan-y"
              >
                <DialogHeader className="pb-3 border-b border-border/30">
                  <DialogTitle className="text-base md:text-lg font-mono flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-foreground font-bold">
                    <span className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-emerald-400 shrink-0" /> Peak
                      Rating Benchmarks
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full shrink-0">
                      2134 Guardian Peak
                    </span>
                  </DialogTitle>
                  <DialogDescription className="text-xs font-mono text-muted-foreground mt-1">
                    Highest competitive ratings and elite percentile benchmarks achieved across coding platforms.
                  </DialogDescription>
                </DialogHeader>

                {/* Summary Stat Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                    <span className="text-[10px] text-emerald-400/80 block font-bold uppercase tracking-wider">
                      LeetCode Guardian
                    </span>
                    <span className="text-base font-black text-emerald-400">
                      2134
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      CodeChef 4★
                    </span>
                    <span className="text-base font-black text-orange-400">
                      1868
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      Codeforces Expert
                    </span>
                    <span className="text-base font-black text-emerald-400">
                      1661
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                      AtCoder Cyan
                    </span>
                    <span className="text-base font-black text-teal-400">
                      1246
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 py-1 font-mono text-xs">
                  {/* LeetCode Card */}
                  <div className="p-3.5 rounded-xl bg-muted/20 border border-border/30 hover:border-amber-500/40 transition-all space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-foreground block">
                          LeetCode Guardian
                        </span>
                        <span className="font-black text-amber-400 text-base">
                          2134
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden mb-1.5">
                        <div className="h-full bg-amber-400 rounded-full w-[95%]" />
                      </div>
                      <span className="text-[10px] text-muted-foreground leading-snug block">
                        Top 1% Globally (1,097+ Solved)
                      </span>
                    </div>
                  </div>

                  {/* Codeforces Card */}
                  <div className="p-3.5 rounded-xl bg-muted/20 border border-border/30 hover:border-emerald-500/40 transition-all space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-foreground block">
                          Codeforces Expert
                        </span>
                        <span className="font-black text-emerald-400 text-base">
                          1661
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden mb-1.5">
                        <div className="h-full bg-emerald-400 rounded-full w-[80%]" />
                      </div>
                      <span className="text-[10px] text-muted-foreground leading-snug block">
                        Expert Rank (800+ Solved)
                      </span>
                    </div>
                  </div>

                  {/* CodeChef Card */}
                  <div className="p-3.5 rounded-xl bg-muted/20 border border-border/30 hover:border-orange-500/40 transition-all space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-foreground block">
                          CodeChef 4★
                        </span>
                        <span className="font-black text-orange-400 text-base">
                          1868
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden mb-1.5">
                        <div className="h-full bg-orange-400 rounded-full w-[85%]" />
                      </div>
                      <span className="text-[10px] text-muted-foreground leading-snug block">
                        Div 2 Competitor (200+ Solved)
                      </span>
                    </div>
                  </div>

                  {/* AtCoder Card */}
                  <div className="p-3.5 rounded-xl bg-muted/20 border border-border/30 hover:border-teal-500/40 transition-all space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-foreground block">
                          AtCoder Cyan
                        </span>
                        <span className="font-black text-teal-400 text-base">
                          1246
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden mb-1.5">
                        <div className="h-full bg-teal-400 rounded-full w-[70%]" />
                      </div>
                      <span className="text-[10px] text-muted-foreground leading-snug block">
                        Cyan 4-Kyu (100+ Solved)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-1 border-t border-border/20">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full py-2.5 px-4 bg-muted/60 text-foreground font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-muted transition-all border border-border/40 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Snapshot</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      scrollToSection("achievements");
                    }}
                    className="w-full py-2.5 px-4 bg-emerald-500 text-black font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all shadow-md cursor-pointer font-bold"
                  >
                    <span>View Full CP Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
