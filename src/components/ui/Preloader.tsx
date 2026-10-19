"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldCheck, Cpu } from "lucide-react";

const BOOT_LOGS = [
  "BIOS_INIT: Hardware check passed (CPU x86_64)",
  "BOOT: Loading DeeprajOS v2.4 kernel...",
  "IDENTITY: Deepraj Singh (Full-Stack & CP Engine)",
  "MOUNT_CP: LeetCode Guardian (2125/2134) loaded",
  "MOUNT_CF: Codeforces Expert (1661) mounted",
  "VFS_INIT: /projects, /skills, /achievements mapped",
  "UI_SHELL: Terminal graphics server online",
  "SYSTEM_READY: Launching visual workspace...",
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSkip = () => {
    setIsFinished(true);
    setTimeout(() => {
      onComplete();
    }, 150);
  };

  useEffect(() => {
    try {
      if (sessionStorage.getItem("deepraj_portfolio_booted") === "true") {
        setIsFinished(true);
        onComplete();
        return;
      }
    } catch (e) {}

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    let p = 0;
    const interval = setInterval(() => {
      // Deliberately pace the boot loader (~2.5 seconds total)
      p += Math.floor(Math.random() * 3) + 1;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            onComplete();
          }, 350);
        }, 300);
      }
      setProgress(p);

      const currentLog = Math.min(
        BOOT_LOGS.length - 1,
        Math.floor((p / 100) * BOOT_LOGS.length)
      );
      setLogIndex(currentLog);
    }, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  // Generate ASCII progress bar
  const totalBlocks = 22;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  const progressBar = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="cyber-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex w-full h-full bg-[#070d0a] font-mono items-center justify-center p-4 select-none"
        >
          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent pointer-events-none" />

          {/* Terminal Window Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-lg bg-[#0b1410] border border-emerald-500/40 rounded-2xl p-6 shadow-2xl shadow-emerald-500/15 relative overflow-hidden"
          >
            {/* Title Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-500/20 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="text-emerald-400 font-bold ml-2">BOOT_SEQUENCE // v2.4</span>
              </div>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold">
                <Cpu className="w-3 h-3 text-emerald-400" /> SYSTEM_INIT
              </span>
            </div>

            {/* Terminal Diagnostics Stream */}
            <div className="space-y-1.5 text-xs text-muted-foreground mb-6 min-h-[5.5rem]">
              {BOOT_LOGS.slice(0, logIndex + 1).slice(-3).map((log, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">&gt;</span>
                  <span className={i === 2 ? "text-emerald-300 font-semibold" : "text-muted-foreground/80"}>
                    {log}
                  </span>
                </div>
              ))}
            </div>

            {/* ASCII Progress Bar & Percentage */}
            <div className="space-y-2 pt-3 border-t border-emerald-500/20">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400/80 text-[11px] font-bold">
                  LOADING SYSTEM MODULES
                </span>
                <span className="text-emerald-400 font-black text-sm">
                  {progress}%
                </span>
              </div>

              <div className="w-full text-emerald-400 text-xs tracking-wider font-mono select-none overflow-hidden">
                [{progressBar}]
              </div>
            </div>

            {/* Status Badge & Skip Action */}
            <div className="mt-4 pt-3 border-t border-emerald-500/10 flex items-center justify-between text-[10.5px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Kernel
              </span>
              <button
                type="button"
                onClick={handleSkip}
                className="text-emerald-400/80 hover:text-emerald-300 font-bold transition-colors cursor-pointer px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] active:scale-95"
                title="Skip Boot Sequence"
              >
                SKIP [ESC] &gt;&gt;
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
