"use client";

import Link from "next/link";
import { Terminal, ArrowLeft, Home, FolderKanban, Trophy, Mail, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/Spotlight";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between font-mono relative overflow-hidden transition-colors duration-300">
      <Spotlight />

      <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-20 sm:py-28 relative z-10 flex-grow flex flex-col items-center justify-center text-center">
        {/* Glowing Terminal Alert Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-6 shadow-sm"
        >
          <ShieldAlert className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>STATUS: 404 // RESOURCE_UNAVAILABLE</span>
        </motion.div>

        {/* Terminal Header */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="text-4xl sm:text-6xl font-black tracking-tight text-foreground mb-3 font-mono"
        >
          NOT_AVAILABLE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          className="text-sm sm:text-base text-muted-foreground max-w-lg mb-8 font-sans leading-relaxed"
        >
          The page, credential verification document, or API route you requested is currently unavailable or does not exist on this server.
        </motion.p>

        {/* Terminal Console Log Box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-full text-left bg-card/90 backdrop-blur-md border border-border/80 rounded-2xl p-5 mb-8 shadow-xl font-mono text-xs relative overflow-hidden"
        >
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-border/40 text-muted-foreground text-[11px]">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span>deepraj@portfolio: ~/sys/diagnostics</span>
          </div>

          <div className="space-y-1.5 text-muted-foreground">
            <p className="text-foreground/90 font-bold">
              <span className="text-emerald-400">$</span> probe --target requested_resource
            </p>
            <p className="text-amber-400">
              [!] WARNING: HTTP 404 Resource Not Found
            </p>
            <p>
              [i] Reason: Route unregistered or document is pending official verification.
            </p>
            <p className="text-emerald-400/90 font-semibold">
              [&gt;] Suggestion: Re-route via navigation links below.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 w-full"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-bold shadow-md hover:bg-primary/90 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>~/return-home</span>
          </Link>

          <Link
            href="/projects"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border/80 text-foreground font-mono text-xs font-bold hover:bg-muted transition-all cursor-pointer"
          >
            <FolderKanban className="w-4 h-4 text-emerald-400" />
            <span>~/projects</span>
          </Link>

          <Link
            href="/#achievements"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border/80 text-foreground font-mono text-xs font-bold hover:bg-muted transition-all cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>~/cp-dashboard</span>
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border/80 text-foreground font-mono text-xs font-bold hover:bg-muted transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-primary" />
            <span>~/contact</span>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
