import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "../components/SiteNav";
import { Info, Cpu, HardDrive, Wifi, Cable, Zap } from "lucide-react";

export const Route = createFileRoute("/specs")({
  head: () => ({
    meta: [
      { title: "neko Specs — Full technical specifications" },
      { name: "description", content: "Full specs of the neko mini PC: NVIDIA GB10, 128GB unified memory, 8TB NVMe Gen5, 10GbE, Wi-Fi 7." },
      { property: "og:title", content: "neko Specs" },
      { property: "og:description", content: "Every number, every port, every millimeter." },
    ],
  }),
  component: SpecsPage,
});

type PortId = "10g" | "usb4_1" | "usb4_2" | "usb4_3" | "usb4_4" | "usba" | "hdmi" | "dp" | "power";

function SpecsPage() {
  const [activePort, setActivePort] = useState<PortId>("usb4_1");

  const portDetails = {
    power: {
      name: "USB-C Power Input",
      desc: "Supports USB-PD 3.1 power delivery standard up to 140W. High-efficiency power converter with surge suppression.",
      speed: "140W peak input",
      bestFor: "Connecting the included minimalist braided power adapter.",
    },
    "10g": {
      name: "10 Gigabit Ethernet (RJ-45)",
      desc: "High-performance Aquantia controllers supporting full multi-gig (10G/5G/2.5G/1G/100M) hardware auto-negotiation.",
      speed: "10 Gbps (1,250 MB/s file speeds)",
      bestFor: "Local NAS networks, fiber internet, direct connections to storage arrays.",
    },
    usb4_1: {
      name: "USB4 / USB Type-C (Port 1)",
      desc: "Full-speed USB4 interface supporting host power output and alternate-mode video projection.",
      speed: "40 Gbps",
      bestFor: "External GPUs, ultra-fast NVMe expansion enclosures.",
    },
    usb4_2: {
      name: "USB4 / USB Type-C (Port 2)",
      desc: "Full-speed USB4 interface with backward-compatibility down to USB 2.0.",
      speed: "40 Gbps",
      bestFor: "Connecting daisy-chained high-speed developer monitors.",
    },
    usb4_3: {
      name: "USB4 / USB Type-C (Port 3)",
      desc: "VRAM-expansion ready. Connects directly to memory controller bus for minimum latency swaps.",
      speed: "40 Gbps",
      bestFor: "Workstation docks and hub systems.",
    },
    usb4_4: {
      name: "USB4 / USB Type-C (Port 4)",
      desc: "Dedicated power-delivery capable port supporting host accessories output.",
      speed: "40 Gbps",
      bestFor: "Powering auxiliary developer hardware.",
    },
    usba: {
      name: "Dual USB-A 3.2 Gen2",
      desc: "High speed legacy interfaces for classic host connection systems.",
      speed: "10 Gbps per port",
      bestFor: "Wired mechanical keyboards, developer debugging hardware, USB thumbdrives.",
    },
    hdmi: {
      name: "HDMI 2.1 Output",
      desc: "Direct-to-SoC HDMI interface supporting uncompressed video and multi-channel audio.",
      speed: "Ultra HD 8K at 60Hz / 4K at 120Hz",
      bestFor: "OLED displays, home cinema, high-resolution workstation monitors.",
    },
    dp: {
      name: "DisplayPort 2.1",
      desc: "Direct multi-stream transport (MST) digital audio/video interface.",
      speed: "Ultra HD 8K at 120Hz / 16K sparse",
      bestFor: "High refresh-rate pro displays and multi-screen visual setups.",
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/20 selection:text-blue-500">
      <SiteNav />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <p className="text-xs font-bold text-blue-600 tracking-[0.2em] uppercase">Specifications</p>
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.05]">
            Small body. Big numbers.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Every millimeter is optimized. Tap on the rear ports layout guide below to examine and inspecteko's hardware connectivity speeds.
          </p>
        </div>
      </section>

      {/* Interactive Port Guide HUD */}
      <section className="py-12 px-6 bg-zinc-50 dark:bg-zinc-950 border-y border-border/40">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Interactive Vector Schematic (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono text-zinc-500 font-bold uppercase tracking-widest">REAR CONNECTOR PANEL</span>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xl flex flex-col items-center justify-center">
                
                {/* SVG rear panel schema */}
                <div className="w-full max-w-lg aspect-[5/1.5] bg-zinc-950 rounded-xl border border-zinc-800 p-4 flex items-center justify-between relative shadow-inner">
                  
                  {/* Power port */}
                  <button
                    onClick={() => setActivePort("power")}
                    className={`h-8 w-8 rounded-full flex items-center justify-center border transition-all ${
                      activePort === "power" ? "bg-blue-600 border-blue-500 shadow-[0_0_15px_#0022FF]" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                    }`}
                    title="USB-C PD Power Input"
                  >
                    <div className="w-4 h-1.5 bg-zinc-700 rounded-sm" />
                  </button>

                  {/* 10G RJ45 Port */}
                  <button
                    onClick={() => setActivePort("10g")}
                    className={`h-10 w-10 rounded border transition-all flex flex-col justify-between p-1 ${
                      activePort === "10g" ? "bg-blue-600 border-blue-500 shadow-[0_0_15px_#0022FF]" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                    }`}
                    title="10GbE RJ45 Port"
                  >
                    <div className="w-full h-1 bg-zinc-700 rounded-sm" />
                    <div className="w-6 h-5 bg-zinc-950 rounded-sm mx-auto shadow-inner border border-zinc-800" />
                  </button>

                  {/* USB-A Double stack */}
                  <button
                    onClick={() => setActivePort("usba")}
                    className={`h-10 w-8 rounded border transition-all flex flex-col justify-between p-1.5 ${
                      activePort === "usba" ? "bg-blue-600 border-blue-500 shadow-[0_0_15px_#0022FF]" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                    }`}
                    title="Dual USB-A Ports"
                  >
                    <div className="w-full h-2 bg-zinc-950 border border-zinc-800 rounded-sm flex items-center justify-center font-mono text-[5px] text-zinc-500">USB</div>
                    <div className="w-full h-2 bg-zinc-950 border border-zinc-800 rounded-sm flex items-center justify-center font-mono text-[5px] text-zinc-500">USB</div>
                  </button>

                  {/* Quad USB-C array */}
                  <div className="flex items-center gap-2">
                    {(["usb4_1", "usb4_2", "usb4_3", "usb4_4"] as const).map((id, index) => (
                      <button
                        key={id}
                        onClick={() => setActivePort(id)}
                        className={`h-8 w-4 rounded-full flex flex-col items-center justify-center border transition-all ${
                          activePort === id ? "bg-blue-600 border-blue-500 shadow-[0_0_15px_#0022FF]" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                        }`}
                        title={`USB4 Type-C Port ${index + 1}`}
                      >
                        <div className="w-1 h-3 bg-zinc-700 rounded-sm" />
                      </button>
                    ))}
                  </div>

                  {/* HDMI port */}
                  <button
                    onClick={() => setActivePort("hdmi")}
                    className={`h-8 w-10 rounded transition-all flex items-center justify-center border ${
                      activePort === "hdmi" ? "bg-blue-600 border-blue-500 shadow-[0_0_15px_#0022FF]" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                    }`}
                    title="HDMI 2.1 Port"
                  >
                    <div className="w-6 h-4 bg-zinc-950 rounded-sm border border-zinc-850 flex items-center justify-center font-mono text-[5px] text-zinc-600">HDMI</div>
                  </button>

                  {/* DP Port */}
                  <button
                    onClick={() => setActivePort("dp")}
                    className={`h-8 w-8 rounded transition-all flex items-center justify-center border ${
                      activePort === "dp" ? "bg-blue-600 border-blue-500 shadow-[0_0_15px_#0022FF]" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                    }`}
                    title="DisplayPort 2.1"
                  >
                    <div className="w-5 h-4 bg-zinc-950 rounded-sm border border-zinc-850 flex items-center justify-center font-mono text-[5px] text-zinc-600">DP</div>
                  </button>

                </div>

                <p className="text-[10px] text-zinc-500 font-mono mt-4">TAP OR HOVER TO HIGHLIGHT SPEED SPECS</p>
              </div>
            </div>

            {/* Side HUD info Display (5 cols) */}
            <div className="lg:col-span-5 bg-background border border-border p-6 rounded-2xl shadow-lg h-72 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-blue-600 font-bold font-mono">PORT SPECIFICATIONS</span>
                <h3 className="text-xl font-bold tracking-tight text-foreground mt-2">{portDetails[activePort].name}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{portDetails[activePort].desc}</p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-border/40 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rated Throughput:</span>
                  <strong className="text-foreground font-mono">{portDetails[activePort].speed}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Best Used For:</span>
                  <strong className="text-foreground text-right">{portDetails[activePort].bestFor}</strong>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Structured Detailed Spec Grid */}
      <section className="px-6 py-24 bg-background">
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-16">
          <Group icon={<Cpu className="w-4 h-4 text-blue-600" />} title="Compute Board">
            <Row l="SoC Processor" v="NVIDIA GB10 Grace Blackwell SoC" />
            <Row l="CPU Architecture" v="20-core ARM v9 (10x X925 + 10x A725)" />
            <Row l="GPU Tensor Cores" v="5th-generation Tensor Cores sparse compute" />
            <Row l="AI performance" v="1 PFLOP FP4 Sparse on-chip matrix" />
            <Row l="Memory architecture" v="128 GB LPDDR5X unified, 512 GB/s bandwidth" />
          </Group>

          <Group icon={<HardDrive className="w-4 h-4 text-blue-600" />} title="Storage Modules">
            <Row l="Expansion Slots" v="2x M.2 NVMe Gen5 interface ports" />
            <Row l="Maximum capacity" v="8 TB total storage (Configurable)" />
            <Row l="Transfer reads" v="14,000 MB/s sequential speeds" />
            <Row l="System Filesystem" v="ZFS pool snapshots, mirroring arrays" />
          </Group>

          <Group icon={<Wifi className="w-4 h-4 text-blue-600" />} title="Wireless & Network">
            <Row l="Wired link" v="10 Gigabit Ethernet (RJ-45)" />
            <Row l="Wireless link" v="Wi-Fi 7 (802.11be), Bluetooth 5.4" />
            <Row l="Security framework" v="Fully open private IP, Tailscale toggle" />
          </Group>

          <Group icon={<Cable className="w-4 h-4 text-blue-600" />} title="Physical Ports">
            <Row l="USB-C ports" v="4x USB4 (40 Gbps, DP-alt video output)" />
            <Row l="USB-A ports" v="2x USB 3.2 Gen2 (10 Gbps output)" />
            <Row l="Video Display" v="HDMI 2.1, DisplayPort 2.1 uncompressed" />
          </Group>

          <Group icon={<Zap className="w-4 h-4 text-blue-600" />} title="Physical chassis">
            <Row l="Dimensions" v="120 × 120 × 35 mm" />
            <Row l="Weight metrics" v="650 grams" />
            <Row l="Shell finish" v="CNC-machined aluminum unibody, fanless" />
            <Row l="Noise metrics" v="0 dB absolute silence" />
          </Group>

          <Group icon={<Zap className="w-4 h-4 text-blue-600" />} title="Power limits">
            <Row l="Input connector" v="USB-C PD 3.1, 140 Watts" />
            <Row l="Idle draw" v="8 Watts" />
            <Row l="Peak draw" v="120 Watts maximum on-load" />
          </Group>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Group({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <div className="border border-border/40 rounded-2xl bg-secondary/10 px-6 py-2 shadow-sm">{children}</div>
    </div>
  );
}

function Row({ l, v }: { l: string; v: string }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-border/30 last:border-0">
      <span className="text-xs sm:text-sm text-muted-foreground">{l}</span>
      <span className="text-xs sm:text-sm font-semibold text-right">{v}</span>
    </div>
  );
}
