import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "../components/SiteNav";
import { HardDrive, Server, ShieldCheck, Zap, ArrowRight, Database, Disc, Settings } from "lucide-react";

export const Route = createFileRoute("/storage")({
  head: () => ({
    meta: [
      { title: "neko Storage — NAS and NVMe in one" },
      { name: "description", content: "Up to 8TB NVMe Gen5. 10GbE. Your private NAS at full speed." },
      { property: "og:title", content: "neko Storage" },
      { property: "og:description", content: "Mini NAS + NVMe Gen5. Wire-speed file access on your network." },
    ],
  }),
  component: StoragePage,
});

function StoragePage() {
  // Speed Slider stats
  const [fileSizeGb, setFileSizeGb] = useState(50); // range: 5 to 500 GB
  
  // ZFS RAID Toggle stats
  const [raidMode, setRaidMode] = useState<"strip" | "mirror">("mirror");

  // Calculations for speed comparisons
  const cloudSpeedMbps = 100; // Average consumer cloud speed
  const networkSpeedMbps = 10000; // 10GbE Lan speed
  const localGen5SpeedMbps = 112000; // 14,000 MB/s to mbps is 112,000

  const calcTime = (sizeGb: number, speedMbps: number) => {
    const sizeMb = sizeGb * 8 * 1024; // Convert GB to Mb
    const seconds = sizeMb / speedMbps;
    
    if (seconds < 1) return "< 1 sec";
    if (seconds < 60) return `${seconds.toFixed(1)}s`;
    
    const minutes = Math.floor(seconds / 60);
    const remSec = Math.round(seconds % 60);
    
    if (minutes < 60) return `${minutes}m ${remSec}s`;
    
    const hours = Math.floor(minutes / 60);
    const remMin = minutes % 60;
    return `${hours}h ${remMin}m`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/20 selection:text-blue-500">
      <SiteNav />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <p className="text-xs font-bold text-blue-600 tracking-[0.2em] uppercase">Private NAS</p>
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.05]">
            All your files. One small box.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Two NVMe Gen5 slots. Up to 8TB. Mirrored or striped. Served over
            10GbE and Wi-Fi 7 to every device in your home — faster than most
            internal drives on your workstation.
          </p>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-px bg-border/45 rounded-2xl overflow-hidden border border-border/40">
          <Stat k="14,000 MB/s" v="NVMe Gen5 sequential reads" />
          <Stat k="10 Gbps" v="Wired network speeds" />
          <Stat k="8 TB" v="Maximum storage capacity" />
        </div>
      </section>

      {/* Interactive Speed Comparison Slider */}
      <section className="py-20 px-6 bg-zinc-50 dark:bg-zinc-950 border-y border-border/40">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="text-center space-y-3">
            <p className="text-xs font-bold text-blue-600 tracking-[0.2em] uppercase">Transfer simulator</p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">LAN speed vs. Cloud waiting.</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base">
              Drag the file slider to visualize how fast your files sync locally on neko compared to standard cloud sync.
            </p>
          </div>

          <div className="bg-background border border-border/50 p-6 sm:p-8 rounded-2xl shadow-md space-y-8">
            {/* File size slider bar */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-zinc-500 font-mono">CHOOSE FILE SIZE:</span>
                <span className="text-2xl font-bold tracking-tight text-foreground font-mono">{fileSizeGb} GB</span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                step="5"
                value={fileSizeGb}
                onChange={(e) => setFileSizeGb(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-blue-600 outline-none"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                <span>5 GB (Weights / Documents)</span>
                <span>500 GB (Complete System Image / LLM Dataset)</span>
              </div>
            </div>

            {/* Time comparisons bars */}
            <div className="space-y-6">
              
              {/* Cloud Sync */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-500">Cloud backup / Sync (100 Mbps broadband)</span>
                  <span className="text-red-500 font-mono font-bold">{calcTime(fileSizeGb, cloudSpeedMbps)}</span>
                </div>
                <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                  <div className="bg-red-500/80 h-full rounded-full transition-all duration-300" style={{ width: "100%" }} />
                </div>
              </div>

              {/* Local neko 10GbE network */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-foreground">neko NAS network access (10GbE LAN direct link)</span>
                  <span className="text-blue-600 font-mono font-bold">{calcTime(fileSizeGb, networkSpeedMbps)}</span>
                </div>
                <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${Math.max(2, (cloudSpeedMbps / networkSpeedMbps) * 100)}%` }} />
                </div>
              </div>

              {/* Local NVMe SSD Gen5 inside neko */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-emerald-600">On-device NVMe Gen5 internal load (14,000 MB/s)</span>
                  <span className="text-emerald-500 font-mono font-bold">{calcTime(fileSizeGb, localGen5SpeedMbps)}</span>
                </div>
                <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${Math.max(1, (cloudSpeedMbps / localGen5SpeedMbps) * 100)}%` }} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Interactive ZFS Configuration Tool */}
      <section className="py-24 px-6 bg-background">
        <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-bold text-blue-600 tracking-[0.2em] uppercase">Redundancy options</p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-none text-foreground">
              ZFS under the hood. Mirrored or Striped.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              neko's internal operating system formats storage using the enterprise ZFS filesystem. Choose your configuration style below to compare performance and resilience.
            </p>

            {/* RAID toggle triggers */}
            <div className="bg-secondary/60 p-1.5 rounded-xl border border-border/40 flex items-center gap-1.5">
              <button
                onClick={() => setRaidMode("mirror")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  raidMode === "mirror" ? "bg-foreground text-background shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                RAID-1 (Mirror)
              </button>
              <button
                onClick={() => setRaidMode("strip")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  raidMode === "strip" ? "bg-foreground text-background shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                RAID-0 (Stripe)
              </button>
            </div>
          </div>

          {/* Interactive RAID Diagram Display */}
          <div className="lg:col-span-7 bg-zinc-950 text-white rounded-2xl border border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-850 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-zinc-500" />
                <span className="text-xs text-zinc-400 font-mono">ZFS POOL PARAMETERS</span>
              </div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-500 bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-900/30 font-bold">
                {raidMode === "mirror" ? "Resilient" : "Extreme speed"}
              </span>
            </div>

            {/* Drives SVG schematic */}
            <div className="flex justify-center items-center gap-12 py-4">
              
              {/* Drive A */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-32 rounded-lg bg-gradient-to-b from-zinc-850 to-zinc-950 border border-zinc-700/80 flex flex-col justify-between p-2 relative shadow-lg">
                  <div className="w-full h-1 bg-zinc-700 rounded-sm" />
                  <div className="flex flex-col gap-1 items-center">
                    <Disc className="w-8 h-8 text-blue-500/80 animate-spin" style={{ animationDuration: "12s" }} />
                    <span className="text-[8px] font-mono text-zinc-400">SSD A</span>
                  </div>
                  <div className="w-full bg-zinc-900/60 p-1 rounded text-[7px] font-mono text-center text-blue-400">
                    {raidMode === "mirror" ? "BLOCK 01" : "BLOCK 01 (A)"}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">M.2 Slot 1</span>
              </div>

              {/* Connection symbol */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-zinc-600 font-bold text-lg font-mono">
                  {raidMode === "mirror" ? "==" : "+"}
                </span>
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                  {raidMode === "mirror" ? "Mirrored" : "Striped"}
                </span>
              </div>

              {/* Drive B */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-32 rounded-lg bg-gradient-to-b from-zinc-850 to-zinc-950 border border-zinc-700/80 flex flex-col justify-between p-2 relative shadow-lg">
                  <div className="w-full h-1 bg-zinc-700 rounded-sm" />
                  <div className="flex flex-col gap-1 items-center">
                    <Disc className="w-8 h-8 text-blue-500/80 animate-spin" style={{ animationDuration: "12s" }} />
                    <span className="text-[8px] font-mono text-zinc-400">SSD B</span>
                  </div>
                  <div className="w-full bg-zinc-900/60 p-1 rounded text-[7px] font-mono text-center text-blue-400">
                    {raidMode === "mirror" ? "BLOCK 01" : "BLOCK 02 (B)"}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">M.2 Slot 2</span>
              </div>

            </div>

            {/* Raid metrics list */}
            <div className="space-y-3 pt-3 border-t border-zinc-850 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span>Active Capacity:</span>
                <strong className="font-mono text-white font-bold">{raidMode === "mirror" ? "4.0 TB" : "8.0 TB"} <span className="text-zinc-500 font-normal">(With 2x 4TB NVMe)</span></strong>
              </div>
              <div className="flex justify-between">
                <span>Read Throughput:</span>
                <strong className="font-mono text-emerald-400">{raidMode === "mirror" ? "14,000 MB/s" : "28,000 MB/s"}</strong>
              </div>
              <div className="flex justify-between">
                <span>Redundancy tolerance:</span>
                <strong className="font-mono text-blue-400">{raidMode === "mirror" ? "1 Drive Failure permitted" : "No protection (0 parity)"}</strong>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Rows */}
      <section className="px-6 py-24 border-t border-border/40 bg-zinc-50 dark:bg-zinc-950/40">
        <div className="mx-auto max-w-4xl space-y-16">
          <Row icon={<Server className="w-5 h-5 text-blue-600" />} title="NAS, the easy way" body="SMB, AFP, and NFS share configurations come ready out of the box. Fully compatible with Apple Time Machine backups. Expose your storage securely over Tailscale with a single toggle for effortless remote file access anywhere." />
          <Row icon={<Database className="w-5 h-5 text-blue-600" />} title="Snapshots and backups" body="Harness ZFS replication capabilities. Configure daily background snapshots for instant historical rollbacks. Never worry about ransomware or accidental file deletions again." />
          <Row icon={<HardDrive className="w-5 h-5 text-blue-600" />} title="Local weights sync" body="Directly mount your model weight directories to the AI engine's cache layers. No copying, no redundancy — neko reads local model layers directly from your primary pool." />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-foreground text-background text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">Bring your data home.</h2>
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
      <div className="text-4xl font-semibold tracking-tight">{k}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider mt-2.5">{v}</div>
    </div>
  );
}

function Row({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center bg-background shadow-inner">
          {icon}
        </div>
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      </div>
      <p className="md:col-span-2 text-muted-foreground leading-relaxed text-sm sm:text-base">{body}</p>
    </div>
  );
}
