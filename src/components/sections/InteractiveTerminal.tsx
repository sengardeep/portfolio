"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Maximize2, Minimize2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface CommandHistory {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

const COMMAND_LIST = [
  { cmd: "/whoami", desc: "Identity & engineering bio" },
  { cmd: "/projects", desc: "Showcase of key builds & live apps" },
  { cmd: "/leetcode", desc: "Guardian rating & metrics (2125 / peak 2134)" },
  { cmd: "/codeforces", desc: "Expert rating & metrics (1661)" },
  { cmd: "/codechef", desc: "4-Star rating & metrics (1868)" },
  { cmd: "/atcoder", desc: "Cyan 4-Kyu rating & metrics (1246)" },
  { cmd: "/skills", desc: "Full tech stack & CS core competencies" },
  { cmd: "/contact", desc: "Email, LinkedIn & GitHub handles" },
  { cmd: "/resume", desc: "Direct link to resume document" },
  { cmd: "/clear", desc: "Clear terminal stdout screen" },
  { cmd: "/help", desc: "List all executable commands" },
];

export function InteractiveTerminal({
  showHeader = true,
  isStandalonePage = false,
}: {
  showHeader?: boolean;
  isStandalonePage?: boolean;
} = {}) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [cmdStack, setCmdStack] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(isStandalonePage);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome greeting
  useEffect(() => {
    const welcomeEntry: CommandHistory = {
      id: "welcome",
      command: "sys --welcome",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400 font-bold">
            Deepraj Singh // Shell v2.0 [x86_64-pc-portfolio]
          </p>
          <p className="text-muted-foreground">
            Type <span className="text-emerald-400 font-bold">/help</span> or click command chips below to inspect system details.
          </p>
        </div>
      ),
    };
    setHistory([welcomeEntry]);
  }, []);

  useEffect(() => {
    // Avoid scrolling parent page on initial mount; keep scrolling localized inside the container
    if (history.length > 1) {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [history]);

  const handleCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    // Normalize command (handle both /cmd and cmd)
    const normalized = trimmed.startsWith("/") ? trimmed.toLowerCase() : `/${trimmed.toLowerCase()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    // Update command stack for up/down history
    setCmdStack((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    if (normalized === "/clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let outputNode: React.ReactNode;

    switch (normalized) {
      case "/whoami":
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-foreground font-bold flex items-center gap-2">
              <span className="text-emerald-400">NAME:</span> Deepraj Singh
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Full-Stack Developer (MERN) and Competitive Programmer at <span className="text-emerald-400">Kamla Nehru Institute of Technology (KNIT), Sultanpur</span>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-[11.5px]">
              <div><span className="text-emerald-400 font-bold">Role:</span> CP Head @ PTSC KNIT</div>
              <div><span className="text-emerald-400 font-bold">Degree:</span> B.Tech Information Technology (CGPA 8.5)</div>
              <div><span className="text-emerald-400 font-bold">LeetCode:</span> Guardian (Peak 2134, Top 1%)</div>
              <div><span className="text-emerald-400 font-bold">Codeforces:</span> Expert (Rating 1661)</div>
            </div>
          </div>
        );
        break;

      case "/projects":
        outputNode = (
          <div className="space-y-3 text-xs">
            <p className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              &gt; Featured Engineering Builds:
            </p>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-muted/40 border border-border/40">
                <div className="flex items-center justify-between font-bold text-foreground">
                  <span>1. Rank AI (Full-Stack AI Platform)</span>
                  <a
                    href="https://rank-ai-phi.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 underline hover:text-emerald-300"
                  >
                    [Live App]
                  </a>
                </div>
                <p className="text-muted-foreground text-[11px] mt-0.5">
                  Next.js, TypeScript, Tailwind CSS, Gemini API. Real-time ATS resume parser and mock interview engine.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-muted/40 border border-border/40">
                <div className="flex items-center justify-between font-bold text-foreground">
                  <span>2. Effulgence 2026 Backend (Fest Architecture)</span>
                  <a
                    href="https://github.com/programming-club-knit/Effulgence26-backend"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 underline hover:text-emerald-300"
                  >
                    [GitHub Repo]
                  </a>
                </div>
                <p className="text-muted-foreground text-[11px] mt-0.5">
                  Node.js, Express, MongoDB. Production backend serving 2,000+ collegiate participants with zero downtime.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-muted/40 border border-border/40">
                <div className="flex items-center justify-between font-bold text-foreground">
                  <span>3. Auth-Capsule (NPM Security Package)</span>
                  <a
                    href="https://www.npmjs.com/package/auth-capsule"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 underline hover:text-emerald-300"
                  >
                    [NPM Registry]
                  </a>
                </div>
                <p className="text-muted-foreground text-[11px] mt-0.5">
                  Published Node/TypeScript security utility for rate-limiting, JWT hashing, and session management.
                </p>
              </div>
            </div>
          </div>
        );
        break;

      case "/leetcode":
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold">
              <span className="text-amber-400 flex items-center gap-1.5">
                ● LeetCode Guardian
              </span>
              <a
                href="https://leetcode.com/u/sengardeepraj/"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 underline hover:text-emerald-300"
              >
                @sengardeepraj ↗
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center p-2 rounded-lg bg-muted/40 border border-border/30">
              <div>
                <span className="text-[10px] text-muted-foreground block">Rating</span>
                <span className="text-base font-bold text-amber-400">2125</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">Peak</span>
                <span className="text-base font-bold text-foreground">2134</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">Solved</span>
                <span className="text-base font-bold text-emerald-400">1097+</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">Global</span>
                <span className="text-base font-bold text-foreground">Top 1%</span>
              </div>
            </div>
          </div>
        );
        break;

      case "/codeforces":
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold">
              <span className="text-emerald-400 flex items-center gap-1.5">
                ● Codeforces Expert
              </span>
              <a
                href="https://codeforces.com/profile/sengardeep"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 underline hover:text-emerald-300"
              >
                @sengardeep ↗
              </a>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center p-2 rounded-lg bg-muted/40 border border-border/30">
              <div>
                <span className="text-[10px] text-muted-foreground block">Rating</span>
                <span className="text-base font-bold text-emerald-400">1661</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">Rank</span>
                <span className="text-base font-bold text-foreground">Expert</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">Problems</span>
                <span className="text-base font-bold text-emerald-400">800+</span>
              </div>
            </div>
          </div>
        );
        break;

      case "/codechef":
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold">
              <span className="text-orange-400 flex items-center gap-1.5">
                ● CodeChef 4-Star
              </span>
              <a
                href="https://www.codechef.com/users/syntax_slayer"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 underline hover:text-emerald-300"
              >
                @syntax_slayer ↗
              </a>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center p-2 rounded-lg bg-muted/40 border border-border/30">
              <div>
                <span className="text-[10px] text-muted-foreground block">Starters Rating</span>
                <span className="text-base font-bold text-orange-400">1868</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">Rank</span>
                <span className="text-base font-bold text-foreground">4★ Div 2</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">Solved</span>
                <span className="text-base font-bold text-orange-400">200+</span>
              </div>
            </div>
          </div>
        );
        break;

      case "/atcoder":
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold">
              <span className="text-teal-400 flex items-center gap-1.5">
                ● AtCoder Cyan (4 Kyu)
              </span>
              <a
                href="https://atcoder.jp/users/sengardeep19"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 underline hover:text-emerald-300"
              >
                @sengardeep19 ↗
              </a>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center p-2 rounded-lg bg-muted/40 border border-border/30">
              <div>
                <span className="text-[10px] text-muted-foreground block">Rating</span>
                <span className="text-base font-bold text-teal-400">1246</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">Kyu Rank</span>
                <span className="text-base font-bold text-foreground">Cyan 4-Kyu</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">Rated Contests</span>
                <span className="text-base font-bold text-teal-400">21</span>
              </div>
            </div>
          </div>
        );
        break;

      case "/skills":
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-emerald-400 font-bold">&gt; Technical Arsenal:</p>
            <div className="space-y-1.5 text-muted-foreground">
              <p><span className="text-foreground font-semibold">Languages:</span> C++, TypeScript, JavaScript, C, SQL</p>
              <p><span className="text-foreground font-semibold">Full-Stack:</span> React.js, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, Tailwind CSS</p>
              <p><span className="text-foreground font-semibold">DevOps &amp; Cloud:</span> Docker, AWS EC2, Postman, Git, GitHub, Linux, Vercel</p>
              <p><span className="text-foreground font-semibold">CS Fundamentals:</span> Data Structures &amp; Algorithms, Low Level Design, OOP, OS, DBMS, Computer Networks</p>
            </div>
          </div>
        );
        break;

      case "/contact":
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-emerald-400 font-bold">&gt; Communication Channels:</p>
            <p className="text-muted-foreground">
              Email: <a href="mailto:sengardeep2006@gmail.com" className="text-foreground underline">sengardeep2006@gmail.com</a>
            </p>
            <p className="text-muted-foreground">
              LinkedIn: <a href="https://www.linkedin.com/in/deepraj-singh-sengar-9b7658280/" target="_blank" rel="noreferrer" className="text-foreground underline">Deepraj Singh Sengar ↗</a>
            </p>
            <p className="text-muted-foreground">
              GitHub: <a href="https://github.com/sengardeep" target="_blank" rel="noreferrer" className="text-foreground underline">@sengardeep ↗</a>
            </p>
          </div>
        );
        break;

      case "/resume":
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-emerald-400 font-bold">&gt; Official Resume Document:</p>
            <p className="text-muted-foreground">
              Google Drive:{" "}
              <a
                href="https://drive.google.com/file/d/15KZvJEWOAG4FFaHaSe6L2a5R2njcIojo/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 font-bold underline hover:text-emerald-300"
              >
                Open Deepraj Singh Resume (PDF) ↗
              </a>
            </p>
          </div>
        );
        break;

      case "/help":
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-emerald-400 font-bold">&gt; Available Command Palette:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
              {COMMAND_LIST.map((item) => (
                <div key={item.cmd} className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold">{item.cmd}</span>
                  <span className="text-[11px] truncate max-w-[200px] text-muted-foreground/80">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      default:
        outputNode = (
          <div className="text-xs text-rose-400">
            command not found: <code className="text-foreground">{trimmed}</code>. Type <span className="text-emerald-400 font-bold">/help</span> for available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        command: trimmed,
        output: outputNode,
        timestamp,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdStack.length === 0) return;
      const nextIdx = historyIndex === -1 ? cmdStack.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(cmdStack[nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdStack.length === 0 || historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= cmdStack.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(cmdStack[nextIdx]);
      }
    }
  };

  return (
    <section className={showHeader ? "py-16 px-4 max-w-3xl mx-auto w-full relative" : "w-full relative"} id="terminal">
      {/* Section Header */}
      {showHeader && (
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-foreground flex items-center gap-2 mb-1">
            <TerminalIcon className="w-5 h-5 text-primary" /> Shell
          </h2>
          <p className="text-sm text-muted-foreground font-mono">
            CLI developer playground to inspect portfolio modules, stats, and repositories.
          </p>
        </div>
      )}

      {/* Clickable Quick Command Chips */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {["/whoami", "/projects", "/leetcode", "/codeforces", "/codechef", "/atcoder", "/skills", "/resume", "/help"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2.5 py-1 rounded-lg bg-card/70 border border-border/70 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-400 font-mono text-[11px] font-bold transition-all cursor-pointer shadow-sm active:scale-95"
          >
            {cmd}
          </button>
        ))}
        <button
          onClick={() => handleCommand("/clear")}
          className="px-2.5 py-1 rounded-lg bg-muted/40 border border-border/50 hover:bg-muted text-muted-foreground font-mono text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ml-auto"
        >
          <Trash2 className="w-3 h-3" /> clear
        </button>
      </div>

      {/* Terminal Shell Window */}
      <div
        className={`bg-[#070d0a] border border-border/90 rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden flex flex-col font-mono text-xs ${
          isExpanded ? "h-[36rem]" : "h-96"
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Title Bar */}
        <div className="bg-[#0b1410] px-4 py-2.5 border-b border-border/50 flex items-center justify-between select-none shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="text-[11px] text-muted-foreground ml-2 font-bold tracking-wider">
              deepraj@terminal: ~ (bash)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-wider hidden sm:inline">
              LIVE_CLI
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded((prev) => !prev);
              }}
              title={isExpanded ? "Minimize" : "Maximize"}
              className="text-muted-foreground hover:text-foreground p-1 rounded transition-colors"
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Output Screen */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-emerald-500/20">
          {history.map((entry) => (
            <div key={entry.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
                <span className="text-emerald-400 font-bold">deepraj@portfolio:~$</span>
                <span className="text-foreground font-bold">{entry.command}</span>
                <span className="text-[9.5px] text-muted-foreground/60 ml-auto">{entry.timestamp}</span>
              </div>
              <div className="pl-4 border-l border-emerald-500/20 text-foreground">
                {entry.output}
              </div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Active Input Line */}
        <div className="bg-[#09110d] px-4 py-3 border-t border-border/40 flex items-center gap-2 shrink-0">
          <span className="text-emerald-400 font-bold shrink-0">deepraj@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type /help, /whoami, /projects, /leetcode..."
            autoFocus={false}
            className="flex-1 bg-transparent text-emerald-300 font-mono text-xs focus:outline-none placeholder:text-muted-foreground/40 caret-emerald-400"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="text-muted-foreground hover:text-emerald-400 p-1 transition-colors cursor-pointer"
            title="Execute Command"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
