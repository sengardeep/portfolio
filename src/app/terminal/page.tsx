"use client";

import React from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { InteractiveTerminal } from "@/components/sections/InteractiveTerminal";
import { Footer } from "@/components/layout/Footer";
import { Terminal, Shield } from "lucide-react";

export default function TerminalPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col justify-between font-sans transition-colors duration-300">
      <Spotlight />

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-20 sm:py-24 relative z-10 flex-grow">
        {/* Terminal Page Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold mb-3 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>SHELL_SESSION: ACTIVE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-foreground mb-2 flex items-center gap-3">
            <Terminal className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            <span>Shell</span>
          </h1>
          <p className="text-sm font-mono text-muted-foreground">
            Interactive command-line developer environment. Execute commands or click pills to explore projects, competitive metrics, and systems.
          </p>
        </div>

        {/* Embedded Terminal Component */}
        <InteractiveTerminal showHeader={false} isStandalonePage={true} />
      </main>

      <Footer />
    </div>
  );
}
