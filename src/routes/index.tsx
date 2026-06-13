import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, HardDrive, Zap, Shield, Wifi, Cpu, Layers, ChevronRight, Terminal } from "lucide-react";
import nekoDevice from "../assets/neko-device.png";
import { ExplodedDevice } from "../components/ExplodedDevice";
import { SiteNav, SiteFooter } from "../components/SiteNav";
import { NekoLogo } from "../components/NekoLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "neko — AI, local" },
      { name: "description", content: "neko is a minimal mini PC with NVIDIA GB10. Run AI locally, store everything, silent." },
      { property: "og:title", content: "neko — AI, local" },
      { property: "og:description", content: "Minimal mini PC. NVIDIA inside. Local AI, NAS and fast SSD." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/20 selection:text-blue-500">
      <SiteNav />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 relative overflow-hidden">
        {/* Ambient top glowing circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 border border-border/40 text-xs font-semibold text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                Mini PC · NVIDIA inside
              </div>
              <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.05]">
                AI, local.
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              A silent, pocket-sized computer powered by NVIDIA GB10. Run massive
              language models on your desk. No cloud. No telemetry. No subscriptions.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/pre-order"
                className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold bg-foreground text-background rounded-full hover:bg-foreground/90 hover:shadow-lg active:scale-95 transition-all shadow-md"
              >
                Pre-order — $1,999
              </Link>
              <Link
                to="/ai"
                className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold border border-border rounded-full hover:bg-secondary active:scale-95 transition-all"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Floated Image Device Showcase */}
          <div className="relative group flex items-center justify-center">
            {/* Subtle backlight glow */}
            <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <img
              src={nekoDevice}
              alt="neko mini PC"
              width={1024}
              height={1024}
              className="w-full max-w-md mx-auto rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] group-hover:scale-[1.02] group-hover:-translate-y-1 transition-all duration-700"
            />
          </div>

        </div>
      </section>

      {/* Scroll-driven exploded 3D view of the computer layers */}
      <ExplodedDevice />

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-border/40" />
      </div>

      {/* Main Features Grid */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 space-y-3">
            <p className="text-xs font-bold text-blue-600 tracking-[0.2em] uppercase">
              Core Capabilities
            </p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
              An open platform in one small box.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border/40 border border-border/40 rounded-3xl overflow-hidden shadow-sm">
            <FeatureCard
              icon={<Brain className="w-5 h-5 text-blue-600" />}
              title="Local AI"
              description="Run Llama 3.3, DeepSeek, Qwen on NVIDIA GB10 Blackwell. Up to 200B parameters in FP4. No internet connection or rate limits required."
              to="/ai"
            />
            <FeatureCard
              icon={<HardDrive className="w-5 h-5 text-blue-600" />}
              title="Mini NAS"
              description="Centralize private storage for your entire home network. Access files across rooms at full wire network transfer speeds."
              to="/storage"
            />
            <FeatureCard
              icon={<Zap className="w-5 h-5 text-blue-600" />}
              title="Fast SSD"
              description="Equipped with dual NVMe Gen5 interface ports serving up to 8TB of storage at sequential reads up to 14,000 MB/s."
              to="/storage"
            />
            <FeatureCard
              icon={<Layers className="w-5 h-5 text-blue-600" />}
              title="nekoOS"
              description="Ships with an open Linux-based kernel dashboard. Spin up local models, audit system memory, and customize Docker nodes."
              to="/software"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-border/40" />
      </div>

      {/* Tiny Features Panel */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <SmallFeature icon={<Cpu className="w-5 h-5 text-blue-600" />} title="NVIDIA GB10" description="Grace Blackwell architecture SoC. Delivering up to 1 PFLOP FP4 sparse Tensor Core compute." />
          <SmallFeature icon={<Wifi className="w-5 h-5 text-blue-600" />} title="Wi-Fi 7 + 10GbE" description="Equipped with multi-gig wired and extreme speed wireless connectivity simultaneously." />
          <SmallFeature icon={<Shield className="w-5 h-5 text-blue-600" />} title="Privacy first" description="Inference and file storage run 100% on-device. Zero telemetry ever exits your private network." />
          <SmallFeature icon={<Zap className="w-5 h-5 text-blue-600" />} title="Fanless & Silent" description="Exquisite machined unibody passive cooling system. Absoutely 0 dB noise, even at peak load." />
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-24 px-6 bg-foreground text-background text-center relative overflow-hidden">
        <div className="mx-auto max-w-3xl space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            Own your intelligence.
          </h2>
          <p className="text-background/60 mb-8 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            Reserve your neko slot today. Batch 01 shipping late Q3 2026.
          </p>
          <Link
            to="/pre-order"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold bg-background text-foreground rounded-full hover:bg-background/90 hover:shadow-lg active:scale-95 transition-all shadow-md"
          >
            Pre-order — $1,999
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}) {
  return (
    <Link to={to} className="bg-background p-8 sm:p-10 space-y-4 hover:bg-secondary/20 transition-all duration-300 flex flex-col justify-between group">
      <div className="space-y-4">
        <div className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center bg-secondary/50 group-hover:scale-105 transition-transform duration-300 shadow-inner">
          {icon}
        </div>
        <h3 className="text-xl font-bold tracking-tight text-foreground">{title}</h3>
        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{description}</p>
      </div>
      <span className="text-xs text-blue-600 font-semibold inline-flex items-center gap-1 pt-4 group-hover:translate-x-1 transition-transform duration-300">
        Learn more <ChevronRight className="w-3 h-3" />
      </span>
    </Link>
  );
}

function SmallFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-4">
      <div className="w-8 h-8 rounded-full border border-border/40 flex items-center justify-center bg-secondary/30 shadow-inner">
        {icon}
      </div>
      <div className="space-y-1.5">
        <h3 className="text-base font-bold tracking-tight text-foreground">{title}</h3>
        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
