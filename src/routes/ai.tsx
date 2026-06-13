import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "../components/SiteNav";
import { Cpu, Brain, Lock, Network, Play, Terminal, Zap, Check, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "neko AI — Local intelligence on NVIDIA GB10" },
      { name: "description", content: "Run large language models locally on neko. Powered by NVIDIA GB10 Grace Blackwell." },
      { property: "og:title", content: "neko AI — Local intelligence" },
      { property: "og:description", content: "NVIDIA GB10. 1 PFLOP FP4. 128GB unified memory. On your desk." },
    ],
  }),
  component: AIPage,
});

function AIPage() {
  const [selectedModelSize, setSelectedModelSize] = useState<"8b" | "70b" | "200b">("70b");
  
  // Interactive Prompt Simulator state
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [isTyping, setIsGenerating] = useState(false);
  const [perfStats, setPerfStats] = useState({ speed: 0, vram: "0 GB", p: "0B" });

  const aiPrompts = {
    code: {
      q: "Write a lightning-fast parallel prime sieve in Go.",
      a: `package main\n\nimport "fmt"\n\n// Generates primes using parallel channels\nfunc Generate(ch chan<- int) {\n\tfor i := 2; ; i++ {\n\t\tch <- i\n\t}\n}\n\nfunc Filter(in <-chan int, out chan<- int, prime int) {\n\tfor {\n\t\ti := <-in\n\t\tif i%prime != 0 {\n\t\t\tout <- i\n\t\t}\n\t}\n}\n\nfunc main() {\n\tch := make(chan int)\n\tgo Generate(ch)\n\tfor i := 0; i < 10; i++ {\n\t\tprime := <-ch\n\t\tfmt.Println(prime)\n\t\tch1 := make(chan int)\n\t\tgo Filter(ch, ch1, prime)\n\t\tch = ch1\n\t}\n}`,
    },
    reason: {
      q: "Alice has 3 brothers. Each brother has 2 sisters. How many sisters does Alice have?",
      a: "Alice has 1 sister. \n\nReasoning:\n1. Alice's brothers all share the same siblings.\n2. Each brother has 2 sisters. These sisters must be Alice and one other female sibling.\n3. Therefore, there are exactly 2 sisters in the family: Alice and her 1 sister.\n4. Alice has exactly 1 sister.",
    },
    summarize: {
      q: "Analyze this raw text payload for security anomalies.",
      a: "ANALYSIS COMPLETED: 0 SECURITY ANOMALIES FOUND.\n\nPayload matches standard schema for TLS v1.3 handshake. All cryptography signatures validated against local trust anchor. System integrity intact.",
    }
  };

  const handleRunSimulation = (key: keyof typeof aiPrompts) => {
    if (isTyping) return;
    setIsGenerating(true);
    const item = aiPrompts[key];
    setCurrentPrompt(item.q);
    setAiOutput("");
    
    // Adjust stats based on chosen size
    let baselineSpeed = 145;
    let vramUse = "42.8 GB";
    let pSize = "70B";
    if (selectedModelSize === "8b") {
      baselineSpeed = 210;
      vramUse = "14.2 GB";
      pSize = "8B";
    } else if (selectedModelSize === "200b") {
      baselineSpeed = 68;
      vramUse = "112.5 GB";
      pSize = "200B";
    }

    setPerfStats({ speed: baselineSpeed, vram: vramUse, p: pSize });

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < item.a.length) {
        setAiOutput((prev) => prev + item.a.charAt(charIndex));
        charIndex += 2; // dual-stream output
      } else {
        clearInterval(typingInterval);
        setIsGenerating(false);
      }
    }, 12);
  };

  const modelSpecs = {
    "8b": {
      name: "Llama 3.3 (8B Parameters)",
      speed: "210 tokens/sec",
      precision: "FP16 (Unquantized)",
      vram: "16 GB VRAM",
      useCase: "Coding assistance, local scripts, ultra-low latency response.",
      command: "neko run llama3.3:8b",
    },
    "70b": {
      name: "Llama 3.3 (70B Parameters)",
      speed: "145 tokens/sec",
      precision: "FP4 (Quantized)",
      vram: "45 GB VRAM",
      useCase: "Deep agentic workflows, long-context writing, business analytics.",
      command: "neko run llama3.3:70b",
    },
    "200b": {
      name: "Qwen 2.5 (200B Parameters)",
      speed: "68 tokens/sec",
      precision: "Sparse FP4 (MoE)",
      vram: "115 GB VRAM",
      useCase: "Complex scientific reasoning, full codebase audits, heavy mathematics.",
      command: "neko run qwen2.5:200b",
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <p className="text-xs font-bold text-blue-600 tracking-[0.2em] uppercase">Private Intelligence</p>
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.05]">
            A datacenter on your desk.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            neko packs the NVIDIA GB10 Grace Blackwell SoC into a 120 mm fanless
            chassis. With 1 PFLOP of FP4 AI performance and 128GB of unified memory,
            it runs massive models locally that others pay subscriptions to stream from the cloud.
          </p>
        </div>
      </section>

      {/* Stats Board */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/40">
          <Stat k="1 PFLOP" v="FP4 AI compute" />
          <Stat k="128 GB" v="LPDDR5X unified VRAM" />
          <Stat k="200B" v="Params, entirely on-device" />
        </div>
      </section>

      {/* Interactive LLM Terminal Sandbox */}
      <section className="py-16 px-6 bg-zinc-950 text-white border-y border-zinc-900">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-bold text-blue-500 tracking-[0.2em] uppercase">Interactive simulator</p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-none text-white">
              Type, compile, run. Locally.
            </h2>
            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
              Test local inference speeds. Select an AI task to run on the simulated hardware. Toggle between model parameter sizes to see how performance scales on the Blackwell Tensor Cores.
            </p>

            {/* Model Size Switcher */}
            <div className="bg-zinc-900 p-1.5 rounded-xl border border-zinc-800 flex items-center gap-1.5">
              <button
                onClick={() => setSelectedModelSize("8b")}
                className={`flex-1 py-2 text-xs font-mono font-semibold rounded-lg transition-all ${
                  selectedModelSize === "8b" ? "bg-blue-600 text-white shadow" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                8B Size
              </button>
              <button
                onClick={() => setSelectedModelSize("70b")}
                className={`flex-1 py-2 text-xs font-mono font-semibold rounded-lg transition-all ${
                  selectedModelSize === "70b" ? "bg-blue-600 text-white shadow" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                70B Size
              </button>
              <button
                onClick={() => setSelectedModelSize("200b")}
                className={`flex-1 py-2 text-xs font-mono font-semibold rounded-lg transition-all ${
                  selectedModelSize === "200b" ? "bg-blue-600 text-white shadow" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                200B Size
              </button>
            </div>

            {/* Simulated Live Specs HUD */}
            <div className="grid grid-cols-3 gap-2.5 pt-4">
              <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono">Inference</span>
                <p className="text-xs font-mono font-bold text-emerald-400 mt-1">
                  {perfStats.speed > 0 ? `${perfStats.speed} tok/s` : "Idle"}
                </p>
              </div>
              <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono">CUDA VRAM</span>
                <p className="text-xs font-mono font-bold text-white mt-1">
                  {perfStats.vram !== "0 GB" ? perfStats.vram : "0.0 GB"}
                </p>
              </div>
              <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono">MoE Sparsity</span>
                <p className="text-xs font-mono font-bold text-blue-400 mt-1">
                  {perfStats.p !== "0B" ? `${perfStats.p} model` : "Sealed"}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Shell Screen */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-4 flex flex-col justify-between h-[380px] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_bottom_left,#10b981,transparent_50%)]" />
            
            {/* Command Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-500" />
                <span className="text-xs text-zinc-400 font-mono">neko@local:~/inference</span>
              </div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-500 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                Active GPU
              </span>
            </div>

            {/* Code Output Screen */}
            <pre className="flex-1 py-4 text-xs font-mono text-zinc-300 leading-relaxed overflow-y-auto scrollbar-thin">
              {currentPrompt && (
                <p className="text-emerald-400 font-semibold mb-2">neko@local:~$ <span className="text-zinc-100">{currentPrompt}</span></p>
              )}
              <code>{aiOutput || "Select an operation from the triggers below to initiate on-chip FP4 tensor execution..."}</code>
            </pre>

            {/* Code triggers */}
            <div className="pt-3 border-t border-zinc-900 flex flex-wrap items-center gap-2">
              <button
                disabled={isTyping}
                onClick={() => handleRunSimulation("code")}
                className="bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-[10px] text-zinc-300 px-3 py-1.5 rounded border border-zinc-800 flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3 h-3 text-blue-500" /> Run Code Sieve
              </button>
              <button
                disabled={isTyping}
                onClick={() => handleRunSimulation("reason")}
                className="bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-[10px] text-zinc-300 px-3 py-1.5 rounded border border-zinc-800 flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3 h-3 text-emerald-500" /> Settle Siblings Puzzle
              </button>
              <button
                disabled={isTyping}
                onClick={() => handleRunSimulation("summarize")}
                className="bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-[10px] text-zinc-300 px-3 py-1.5 rounded border border-zinc-800 flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3 h-3 text-blue-500" /> Verify Security Log
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Model Capacity Matrix Panel */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="text-center space-y-3">
            <p className="text-xs font-bold text-blue-600 tracking-[0.2em] uppercase">On-chip sizing</p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">The Model Capacity Matrix.</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Select a size option to examine technical requirements, speeds, and execution commands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["8b", "70b", "200b"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedModelSize(size)}
                className={`text-left p-6 rounded-2xl border transition-all ${
                  selectedModelSize === size
                    ? "bg-foreground text-background shadow-lg border-foreground"
                    : "bg-background text-foreground border-border hover:bg-secondary/40"
                }`}
              >
                <span className={`text-xs uppercase font-mono tracking-widest font-bold ${selectedModelSize === size ? "text-blue-400" : "text-blue-600"}`}>
                  {size.toUpperCase()} PARAMETERS
                </span>
                <h3 className="text-xl font-bold tracking-tight mt-2">{modelSpecs[size].name}</h3>
                
                <div className="h-px bg-current opacity-10 my-4" />
                
                <div className="space-y-2 text-xs opacity-80">
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <strong className="font-semibold">{modelSpecs[size].speed}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>VRAM Used:</span>
                    <strong className="font-semibold">{modelSpecs[size].vram}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Precision:</span>
                    <strong className="font-semibold">{modelSpecs[size].precision}</strong>
                  </div>
                </div>

                <div className="mt-6 text-[10px] font-mono p-2 rounded bg-current/5 border border-current/10">
                  {modelSpecs[size].command}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Core Technical Highlights */}
      <section className="px-6 py-24 border-t border-border/40 bg-secondary/10">
        <div className="mx-auto max-w-4xl space-y-16">
          <Row icon={<Network className="w-6 h-6 text-blue-600" />} title="Run anything open-source" body="Llama 3.3, Qwen 2.5, Mistral, DeepSeek, Mixtral. Pull, quantize, and serve weights instantly. neko ships with a unified, single-line CLI and an OpenAI-compliant server endpoint." />
          <Row icon={<Lock className="w-6 h-6 text-blue-600" />} title="Private by design" body="Inference never leaves the device. Zero tracking, zero usage metrics sent, zero subscriptions required. Your confidential keys, custom scripts, and weights stay entirely within your local walls." />
          <Row icon={<Cpu className="w-6 h-6 text-blue-600" />} title="Built for builders" body="A full CUDA toolchain, vLLM, llama.cpp, and Ollama come preinstalled out of the box. Simply SSH into neko's Linux kernel and execute your code directly on the Blackwell metal." />
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-24 px-6 bg-foreground text-background text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">Own your AI. Run it silent.</h2>
        <Link to="/pre-order" className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium bg-background text-foreground rounded-full">
          Pre-order — $1,999
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-background p-8 text-center">
      <div className="text-4xl font-semibold tracking-tight text-foreground">{k}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider mt-2.5">{v}</div>
    </div>
  );
}

function Row({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      <div className="md:col-span-4 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-background shadow-sm">
          {icon}
        </div>
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      </div>
      <p className="md:col-span-8 text-muted-foreground leading-relaxed text-sm sm:text-base">{body}</p>
    </div>
  );
}
