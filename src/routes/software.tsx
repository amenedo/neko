import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteNav, SiteFooter } from "../components/SiteNav";
import { Cpu, Terminal, Database, Server, Settings, Check, Copy, ChevronRight, Activity, TerminalSquare } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/software")({
  head: () => ({
    meta: [
      { title: "nekoOS — Open system for local compute and NAS" },
      { name: "description", content: "nekoOS is preinstalled on neko. Run models with one click, manage NAS shares with ZFS, and SSH directly into full CUDA." },
      { property: "og:title", content: "nekoOS — Complete local stack" },
      { property: "og:description", content: "A clean dashboard for models, ZFS storage volumes, and network speeds." },
    ],
  }),
  component: SoftwarePage,
});

function SoftwarePage() {
  const [activeTab, setActiveTab] = useState<"dash" | "models" | "nas">("dash");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedLanguage, setSelectedCodeLang] = useState<"curl" | "python" | "js">("python");

  // Typewriter prompt simulation for AI dashboard tab
  const [promptText, setPromptText] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tokensPerSec, setTokensPerSec] = useState(0);

  const mockPrompts = [
    {
      q: "Explain quantum computing in one sentence.",
      a: "Quantum computing is a type of computation that harnesses the collective properties of quantum mechanics, such as superposition and entanglement, to solve complex problems exponentially faster than classical computers.",
    },
    {
      q: "Write a quick Rust API route to fetch system metrics.",
      a: `use axum::{routing::get, Json, Router};\nuse serde::Serialize;\n\n#[derive(Serialize)]\nstruct Metrics {\n    cpu_load: f32,\n    vram_usage_gb: f32,\n}\n\nasync fn get_metrics() -> Json<Metrics> {\n    Json(Metrics { cpu_load: 12.4, vram_usage_gb: 42.1 })\n}`,
    },
    {
      q: "Formulate a ZFS pool snapshot command.",
      a: "zfs snapshot neko-pool/nas-volume@backup-$(date +%Y-%m-%d)",
    },
  ];

  const handleRunPrompt = (promptObj: typeof mockPrompts[0]) => {
    if (isGenerating) return;
    setIsGenerating(true);
    setPromptText(promptObj.q);
    setAiOutput("");
    setTokensPerSec(0);

    let index = 0;
    const interval = setInterval(() => {
      if (index < promptObj.a.length) {
        setAiOutput((prev) => prev + promptObj.a.charAt(index));
        setTokensPerSec(Math.floor(135 + Math.random() * 15));
        index += 2; // print two characters per tick for ultra-fast local inference speed
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 15);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    toast.success("Copied code snippet to clipboard");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeSnippets = {
    curl: `curl http://neko.local:8000/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "llama3.3-70b",
    "messages": [{"role": "user", "content": "Explain ZFS mirroring"}]
  }'`,
    python: `from openai import OpenAI

# neko exposes a local OpenAI-compatible endpoint out of the box
client = OpenAI(
    base_url="http://neko.local:8000/v1",
    api_key="local-neko-key"
)

response = client.chat.completions.create(
    model="llama3.3-70b",
    messages=[{"role": "user", "content": "Write Rust metrics server"}]
)
print(response.choices[0].message.content)`,
    js: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "http://neko.local:8000/v1",
  apiKey: "local-neko-key"
});

const response = await client.chat.completions.create({
  model: "qwen2.5-coder-32b",
  messages: [{ role: "user", content: "Implement Axum route" }]
});
console.log(response.choices[0].message.content);`,
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/20 selection:text-blue-500">
      <SiteNav />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="mx-auto max-w-5xl text-center space-y-6">
          <p className="text-xs font-bold text-blue-600 tracking-[0.2em] uppercase">nekoOS 1.0</p>
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.05] max-w-3xl mx-auto">
            A beautiful console for private power.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            neko ships with nekoOS — a polished, web-based dashboard and CLI toolchain built
            on Linux. Pull and run open models with one click, configure ZFS volumes,
            and monitor performance at wirespeed.
          </p>
        </div>
      </section>

      {/* Interactive OS Dashboard Simulator */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="bg-zinc-950 text-zinc-100 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col md:grid md:grid-cols-12 min-h-[550px]">
            
            {/* Simulator Sidebar (3 Cols) */}
            <div className="p-4 bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-800 md:col-span-3 flex flex-row md:flex-col justify-between md:justify-start gap-1">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2 px-3 py-2 mb-4 hidden md:flex">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono ml-2">nekoOS</span>
                </div>
                
                <button
                  onClick={() => setActiveTab("dash")}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium flex items-center gap-3 transition-colors ${
                    activeTab === "dash" ? "bg-blue-600 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("models")}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium flex items-center gap-3 transition-colors ${
                    activeTab === "models" ? "bg-blue-600 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  Local AI Models
                </button>
                <button
                  onClick={() => setActiveTab("nas")}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium flex items-center gap-3 transition-colors ${
                    activeTab === "nas" ? "bg-blue-600 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                  }`}
                >
                  <Database className="w-4 h-4" />
                  ZFS NAS Shares
                </button>
              </div>

              {/* Server indicator in sidebar */}
              <div className="mt-auto pt-4 border-t border-zinc-800 hidden md:block">
                <div className="px-3 py-2 flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">neko-node-01</span>
                </div>
              </div>
            </div>

            {/* Simulator Screen (9 Cols) */}
            <div className="p-6 md:col-span-9 flex flex-col justify-between bg-zinc-950 text-zinc-100">
              
              {/* Header Status Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Server className="w-3.5 h-3.5" />
                    <span>Host:</span>
                    <span className="font-semibold text-zinc-100 font-mono">neko.local</span>
                  </div>
                  <span className="text-zinc-700">|</span>
                  <span className="text-zinc-400">Uptime: <strong className="text-zinc-100 font-mono">24d 12h</strong></span>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] uppercase font-mono px-2 py-0.5 rounded flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  API Active
                </div>
              </div>

              {/* TAB 1: SYSTEM OVERVIEW */}
              {activeTab === "dash" && (
                <div className="flex-1 py-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">CPU Load</p>
                      <h3 className="text-2xl font-bold font-mono mt-1 text-white">4.2%</h3>
                      <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: "4.2%" }} />
                      </div>
                    </div>
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">CUDA Memory</p>
                      <h3 className="text-2xl font-bold font-mono mt-1 text-white">41.8 GB <span className="text-xs text-zinc-500">/ 128GB</span></h3>
                      <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: "32.6%" }} />
                      </div>
                    </div>
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">NAS Bandwidth</p>
                      <h3 className="text-2xl font-bold font-mono mt-1 text-white">10.1 Gbps</h3>
                      <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: "95%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/60">
                    <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-widest font-mono mb-3">Active Services</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded bg-zinc-900/50">
                        <span className="font-mono text-zinc-300">vLLM OpenAI Server (@8000)</span>
                        <span className="text-emerald-500 font-bold font-mono flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />UP</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-zinc-900/50">
                        <span className="font-mono text-zinc-300">ZFS Storage Daemon</span>
                        <span className="text-emerald-500 font-bold font-mono flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />HEALTHY</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-zinc-900/50">
                        <span className="font-mono text-zinc-300">Samba File Share (@445)</span>
                        <span className="text-emerald-500 font-bold font-mono flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />UP</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: LOCAL AI MODELS (WITH INTERACTIVE PROMPT RUNNER) */}
              {activeTab === "models" && (
                <div className="flex-1 py-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-widest font-mono">Available LLMs</h4>
                      <span className="text-[10px] text-zinc-500">Run completely local under CUDA FP4</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-emerald-400">llama3.3-70b</span>
                          <p className="text-[10px] text-zinc-500 mt-0.5">Meta, FP4 Quantized</p>
                        </div>
                        <span className="text-[9px] text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded self-start mt-2">Active VRAM</span>
                      </div>
                      <div className="bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-850 flex flex-col justify-between hover:bg-zinc-900/60 transition-colors">
                        <div>
                          <span className="text-[10px] font-mono text-zinc-300">qwen2.5-coder-32b</span>
                          <p className="text-[10px] text-zinc-500 mt-0.5">Alibaba, Code assistant</p>
                        </div>
                        <span className="text-[9px] text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded self-start mt-2">CUDA Ready</span>
                      </div>
                      <div className="bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-850 flex flex-col justify-between hover:bg-zinc-900/60 transition-colors">
                        <div>
                          <span className="text-[10px] font-mono text-zinc-300">deepseek-r1-70b</span>
                          <p className="text-[10px] text-zinc-500 mt-0.5">DeepSeek, Reasoning</p>
                        </div>
                        <span className="text-[9px] text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded self-start mt-2">CUDA Ready</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive LLM Prompt Runner */}
                  <div className="border border-zinc-800 bg-zinc-950 rounded-xl p-3.5 mt-4 flex flex-col justify-between h-56 relative">
                    {/* Console HUD */}
                    <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono pb-2 border-b border-zinc-850">
                      <span>CONSOLE COMMAND</span>
                      {tokensPerSec > 0 && (
                        <span className="text-emerald-400 font-bold tracking-wider animate-pulse">
                          ⚡ GENERATING: {tokensPerSec} TOKENS/S
                        </span>
                      )}
                    </div>

                    {/* Output area */}
                    <div className="flex-1 overflow-y-auto text-xs font-mono py-2 text-zinc-300 leading-relaxed scrollbar-thin">
                      {promptText && (
                        <p className="text-blue-400 font-bold mb-1">neko@local:~$ <span className="text-white">{promptText}</span></p>
                      )}
                      <p className="whitespace-pre-wrap">{aiOutput || "Select a model command below to begin local inference..."}</p>
                    </div>

                    {/* Quick run buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-850">
                      {mockPrompts.map((pObj, i) => (
                        <button
                          key={i}
                          disabled={isGenerating}
                          onClick={() => handleRunPrompt(pObj)}
                          className="bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-[10px] text-zinc-300 px-2.5 py-1 rounded border border-zinc-800 flex items-center gap-1 transition-all"
                        >
                          <TerminalSquare className="w-3 h-3 text-emerald-500" />
                          {pObj.q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ZFS STORAGE */}
              {activeTab === "nas" && (
                <div className="flex-1 py-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-widest font-mono">ZFS Volumes</h4>
                    <span className="text-[10px] text-zinc-500 font-mono">STATUS: HEALTHY</span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold font-mono text-white">/volumes/neko-nas</span>
                        <p className="text-[10px] text-zinc-500 mt-1">Samba storage pool (RAID-1 Mirrored)</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-semibold">3.8 TB Used / 8.0 TB</span>
                        <div className="w-32 bg-zinc-800 h-2 rounded-full overflow-hidden mt-1.5 ml-auto">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: "47.5%" }} />
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold font-mono text-white">/volumes/backups-timemachine</span>
                        <p className="text-[10px] text-zinc-500 mt-1">Apple Time Machine Shared Network target</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-semibold">1.2 TB Used / 8.0 TB</span>
                        <div className="w-32 bg-zinc-800 h-2 rounded-full overflow-hidden mt-1.5 ml-auto">
                          <div className="bg-zinc-500 h-full rounded-full" style={{ width: "15%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-900/20 p-4 rounded-xl border border-zinc-800/80">
                    <h5 className="text-[11px] font-bold text-zinc-400 font-mono uppercase tracking-wider mb-2">Pool Snapshots</h5>
                    <div className="flex items-center justify-between text-xs p-1">
                      <span className="text-zinc-500 font-mono">daily-backup-2026-06-12</span>
                      <span className="text-zinc-400 font-mono text-[11px]">Completed (0.01 sec)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-1">
                      <span className="text-zinc-500 font-mono">daily-backup-2026-06-13</span>
                      <span className="text-emerald-500 font-mono text-[11px] font-bold">Auto-Scheduled</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Developer API Dock */}
      <section className="py-24 px-6 border-t border-border/40 bg-zinc-50 dark:bg-zinc-950/40">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-xs font-bold text-blue-600 tracking-[0.2em] uppercase">Built for builders</p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-none text-foreground">
              CUDA and OpenAI API endpoint pre-built.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              neko exposes an OpenAI-compatible web API port 8000 out of the box. Simply swap your
              API base URL in your existing scripts, use local model names, and run your software
              absolutely free of cloud costs, rate limits, and data leaks.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/pre-order"
                className="bg-foreground text-background text-sm font-medium px-6 py-2.5 rounded-full hover:bg-foreground/90 transition-colors"
              >
                Get your neko
              </Link>
              <Link
                to="/specs"
                className="text-sm text-foreground hover:text-muted-foreground font-medium flex items-center gap-1"
              >
                View full hardware specs <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Code snippets */}
          <div className="bg-zinc-950 text-zinc-100 rounded-2xl border border-zinc-800 shadow-xl overflow-hidden flex flex-col justify-between">
            <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCodeLang("python")}
                  className={`text-xs font-mono px-3 py-1 rounded transition-colors ${
                    selectedLanguage === "python" ? "bg-zinc-800 text-white border border-zinc-750" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  python
                </button>
                <button
                  onClick={() => setSelectedCodeLang("js")}
                  className={`text-xs font-mono px-3 py-1 rounded transition-colors ${
                    selectedLanguage === "js" ? "bg-zinc-800 text-white border border-zinc-750" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  javascript
                </button>
                <button
                  onClick={() => setSelectedCodeLang("curl")}
                  className={`text-xs font-mono px-3 py-1 rounded transition-colors ${
                    selectedLanguage === "curl" ? "bg-zinc-800 text-white border border-zinc-750" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  curl
                </button>
              </div>
              <button
                onClick={() => copyToClipboard(codeSnippets[selectedLanguage], selectedLanguage)}
                className="text-zinc-400 hover:text-zinc-200 transition-colors"
                title="Copy code"
              >
                {copiedCode === selectedLanguage ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            
            <pre className="p-6 text-xs font-mono text-zinc-300 leading-relaxed overflow-x-auto h-64 bg-zinc-950 scrollbar-thin">
              <code>{codeSnippets[selectedLanguage]}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-foreground text-background text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">A fully open box. No cloud keys needed.</h2>
        <Link to="/pre-order" className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium bg-background text-foreground rounded-full">
          Pre-order — $1,999
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
