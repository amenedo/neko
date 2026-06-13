import { useEffect, useRef, useState } from "react";
import { NekoLogo } from "./NekoLogo";
import { Cpu, HardDrive, Shield, Zap } from "lucide-react";

/**
 * Scroll-driven high-fidelity exploded 3D view of the neko mini PC.
 * Uses CSS 3D transforms (preserve-3d) to build a multi-layered computer that rotates 360deg
 * and splits into distinct high-fidelity pieces (outer aluminum lid, copper-finned heatsink,
 * black logic board with glowing green NVIDIA GB10 SoC, dual Gen5 SSDs, and base with ports).
 */
export function ExplodedDevice() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // Scroll progress: 0 to 1

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setP(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Soft easing (ease-out-quad or cubic-bezier feel) for ultra-fluid movement
  const easeProgress = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

  // Rotations driven by scroll
  const rotY = -35 + easeProgress * 360; // 360 deg spin
  const rotX = -20 - easeProgress * 10;  // slight pitch change
  const spread = easeProgress * 150;      // massive layer split on scroll

  // Determine active stage for copy (0 to 4)
  // Stage 0: 0% - 15% (Sealed chassis)
  // Stage 1: 15% - 40% (Aluminium unibody top lid lifts)
  // Stage 2: 40% - 65% (Copper heatsink floats)
  // Stage 3: 65% - 85% (NVIDIA GB10 Blackwell PCB board rises)
  // Stage 4: 85% - 100% (Dual NVMe Storage & Base ports revealed)
  const stage = p < 0.15 ? 0 : p < 0.40 ? 1 : p < 0.65 ? 2 : p < 0.88 ? 3 : 4;

  const steps = [
    {
      t: "Unibody Design",
      d: "A single piece of bead-blasted aluminum, machined to a tolerance of 0.1 mm. Sealed, silent, and incredibly small at just 120 × 120 × 35 mm.",
      icon: <Shield className="w-5 h-5 text-blue-600" />,
    },
    {
      t: "Aluminium Lid",
      d: "Bead-blasted satin unibody casing slides up to reveal the ultra-dense interior architecture, allowing effortless component visibility.",
      icon: <Zap className="w-5 h-5 text-blue-600" />,
    },
    {
      t: "Passive Heatsink",
      d: "CNC-milled pure-copper fin stack, distributing thermal energy outwards without fans. Absolutely 0 dB noise, even at maximum workload.",
      icon: <Zap className="w-5 h-5 text-amber-500" />,
    },
    {
      t: "NVIDIA GB10 SoC",
      d: "The engine. Grace Blackwell Architecture on a custom matte black PCB. Packs 1 PFLOP FP4 AI sparse performance, with 128GB high-bandwidth unified memory.",
      icon: <Cpu className="w-5 h-5 text-emerald-500" />,
    },
    {
      t: "Gen5 Storage & Base",
      d: "Dual M.2 NVMe Gen5 slots serving up to 8TB of raid-capable storage, resting on an integrated 10GbE network module and Wi-Fi 7 base plate.",
      icon: <HardDrive className="w-5 h-5 text-blue-500" />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{ height: "450vh" }}
      aria-label="Interactive 3D Exploded View of Neko"
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Animated ambient background glow (neon blue and subtle green) */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="mx-auto max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* 3D Render Stage (Takes 7 columns on Desktop) */}
          <div
            className="col-span-1 lg:col-span-7 relative h-[50vh] lg:h-[75vh] flex items-center justify-center select-none"
            style={{ perspective: "1500px" }}
          >
            <div
              className="relative transition-all duration-75"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                width: 320,
                height: 320,
              }}
            >
              {/* ==================== LAYER 1: ALUMINIUM TOP LID ==================== */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-75"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate3d(0, ${-spread * 2.2}px, 0) translateZ(0)`,
                }}
              >
                <div 
                  className="relative w-72 h-72 rounded-3xl bg-gradient-to-tr from-zinc-700 via-zinc-800 to-zinc-600 border border-zinc-600/50 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.15)] flex flex-col items-center justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Embossed neko brand logo on top of the unibody lid */}
                  <div className="transform translate-z-10 bg-black/10 backdrop-blur-sm p-4 rounded-2xl border border-white/5 shadow-inner">
                    <NekoLogo size={42} showText={false} iconColor="#0022FF" />
                  </div>
                  {/* Subtle aluminum chamfered edge lines */}
                  <div className="absolute inset-2 rounded-[22px] border border-white/5 pointer-events-none" />
                  
                  {/* 3D Lid Label */}
                  <div className="absolute left-[110%] top-1/2 -translate-y-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-zinc-300 font-medium whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
                    Unibody Casing
                  </div>
                </div>
              </div>

              {/* ==================== LAYER 2: PASSIVE COPPER HEATSINK ==================== */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-75"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate3d(0, ${-spread * 1.1}px, 0) translateZ(0)`,
                }}
              >
                <div 
                  className="relative w-64 h-64 rounded-2xl bg-zinc-900 border border-amber-900/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between p-4 overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Copper fin structures */}
                  <div className="flex-1 flex flex-col justify-between gap-1 w-full relative z-10">
                    {Array.from({ length: 12 }).map((_, r) => (
                      <div key={r} className="h-2 flex gap-1 w-full">
                        {Array.from({ length: 14 }).map((_, c) => (
                          <div
                            key={c}
                            className="flex-1 rounded-sm bg-gradient-to-b from-amber-600 to-amber-800 border-r border-amber-950/20 shadow-inner"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* Heatsink core core-plate */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/25 via-zinc-950/90 to-amber-950/10 pointer-events-none" />
                  
                  {/* 3D Heatsink Label */}
                  <div className="absolute right-[110%] top-1/2 -translate-y-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-amber-500 font-medium whitespace-nowrap opacity-80">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    Copper Fin Stack (0 dB)
                  </div>
                </div>
              </div>

              {/* ==================== LAYER 3: NVIDIA GB10 PCB ==================== */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-75"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate3d(0, ${spread * 0.05}px, 0) translateZ(0)`,
                }}
              >
                <div 
                  className="relative w-64 h-64 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950/40 border border-emerald-500/20 shadow-[0_20px_50px_rgba(0,245,120,0.15)] flex flex-col items-center justify-center p-4"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* PCB Circuit Tracks (Visual SVG Grid Overlay) */}
                  <svg className="absolute inset-0 w-full h-full opacity-30 stroke-emerald-500/40" viewBox="0 0 100 100">
                    <path d="M10,20 L30,20 L40,40 L60,40 L70,20 L90,20" fill="none" strokeWidth="0.5" />
                    <path d="M20,80 L40,80 L50,50 L80,50" fill="none" strokeWidth="0.5" />
                    <path d="M50,10 L50,90" fill="none" strokeWidth="0.5" strokeDasharray="2,2" />
                    <circle cx="40" cy="40" r="1.5" fill="#10b981" />
                    <circle cx="60" cy="40" r="1.5" fill="#10b981" />
                    <circle cx="50" cy="50" r="1.5" fill="#10b981" />
                  </svg>

                  {/* NVIDIA GB10 SoC black-silver Chip */}
                  <div 
                    className="w-24 h-24 bg-gradient-to-br from-zinc-800 to-zinc-950 border-2 border-emerald-500/80 rounded-lg flex flex-col items-center justify-center relative shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    style={{ transform: "translateZ(15px)" }}
                  >
                    <div className="absolute inset-1 rounded border border-emerald-500/20 pointer-events-none" />
                    <span className="text-[7px] text-emerald-400 font-bold tracking-widest uppercase">NVIDIA</span>
                    <span className="text-xs text-white font-extrabold tracking-tight mt-0.5">GB10</span>
                    <span className="text-[6px] text-zinc-500 font-mono mt-1">BLACKWELL</span>
                    <div className="absolute -bottom-1 w-2 h-2 bg-emerald-500 rounded-full blur-[4px] animate-ping" />
                  </div>

                  {/* LPDDR5X Unified Memory Chips surrounding the chip */}
                  <div className="absolute inset-6 pointer-events-none flex items-center justify-between" style={{ transform: "translateZ(8px)" }}>
                    <div className="flex flex-col gap-8">
                      <div className="w-5 h-8 bg-zinc-900 border border-zinc-800 rounded shadow-md text-[5px] text-zinc-600 flex items-center justify-center font-mono">RAM</div>
                      <div className="w-5 h-8 bg-zinc-900 border border-zinc-800 rounded shadow-md text-[5px] text-zinc-600 flex items-center justify-center font-mono">RAM</div>
                    </div>
                    <div className="flex flex-col gap-8">
                      <div className="w-5 h-8 bg-zinc-900 border border-zinc-800 rounded shadow-md text-[5px] text-zinc-600 flex items-center justify-center font-mono">RAM</div>
                      <div className="w-5 h-8 bg-zinc-900 border border-zinc-800 rounded shadow-md text-[5px] text-zinc-600 flex items-center justify-center font-mono">RAM</div>
                    </div>
                  </div>

                  {/* 3D PCB Label */}
                  <div className="absolute left-[110%] top-1/2 -translate-y-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-emerald-500 font-medium whitespace-nowrap opacity-80">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    GB10 Grace Blackwell Board
                  </div>
                </div>
              </div>

              {/* ==================== LAYER 4: NVME GEN5 SSD MODULES ==================== */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-75"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate3d(0, ${spread * 1.15}px, 0) translateZ(0)`,
                }}
              >
                <div 
                  className="relative w-60 h-60 rounded-xl bg-zinc-950/40 backdrop-blur-sm border border-zinc-800/60 shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex items-center justify-center gap-8 p-4"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Two side-by-side NVMe Gen5 PCIe M.2 SSD modules */}
                  <div 
                    className="w-16 h-36 bg-gradient-to-b from-blue-950 to-zinc-900 border border-blue-500/20 rounded-md relative flex flex-col justify-between p-2 shadow-inner"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    <div className="w-full h-8 bg-zinc-800/80 rounded border border-zinc-700/50 text-[6px] font-mono text-zinc-400 flex items-center justify-center uppercase tracking-wide">
                      M.2 NVMe
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-1.5 py-4">
                      <div className="w-full h-1 bg-zinc-800 rounded-sm" />
                      <div className="w-full h-1 bg-zinc-800 rounded-sm" />
                      <div className="w-full h-3 bg-blue-500/40 rounded border border-blue-400/20 text-[5px] text-blue-200 font-mono flex items-center justify-center">4TB</div>
                    </div>
                    <div className="h-2 w-full bg-gradient-to-t from-amber-600/40 to-transparent border-t border-amber-500/20" />
                  </div>

                  <div 
                    className="w-16 h-36 bg-gradient-to-b from-blue-950 to-zinc-900 border border-blue-500/20 rounded-md relative flex flex-col justify-between p-2 shadow-inner"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    <div className="w-full h-8 bg-zinc-800/80 rounded border border-zinc-700/50 text-[6px] font-mono text-zinc-400 flex items-center justify-center uppercase tracking-wide">
                      M.2 NVMe
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-1.5 py-4">
                      <div className="w-full h-1 bg-zinc-800 rounded-sm" />
                      <div className="w-full h-1 bg-zinc-800 rounded-sm" />
                      <div className="w-full h-3 bg-blue-500/40 rounded border border-blue-400/20 text-[5px] text-blue-200 font-mono flex items-center justify-center">4TB</div>
                    </div>
                    <div className="h-2 w-full bg-gradient-to-t from-amber-600/40 to-transparent border-t border-amber-500/20" />
                  </div>

                  {/* 3D SSD Module Label */}
                  <div className="absolute right-[110%] top-1/2 -translate-y-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-blue-400 font-medium whitespace-nowrap opacity-80">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    2× NVMe PCIe Gen5 (8TB)
                  </div>
                </div>
              </div>

              {/* ==================== LAYER 5: BASE & REAR PORTS ==================== */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-75"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate3d(0, ${spread * 2.25}px, 0) translateZ(0)`,
                }}
              >
                <div 
                  className="relative w-72 h-72 rounded-3xl bg-gradient-to-b from-zinc-800 via-zinc-900 to-black border border-zinc-800/80 shadow-[0_5px_30px_rgba(0,0,0,0.8),inset_0_1px_3px_rgba(255,255,255,0.05)] flex flex-col justify-between p-4"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Circular rubber thermal intake venting ring on bottom */}
                  <div 
                    className="w-44 h-44 rounded-full border-4 border-zinc-800 bg-zinc-950/90 shadow-2xl flex items-center justify-center relative self-center"
                    style={{ transform: "translateZ(8px)" }}
                  >
                    <div className="absolute inset-2 rounded-full border border-zinc-800/40 border-dashed" />
                    <div className="text-[7px] text-zinc-600 font-mono uppercase tracking-widest">Air Intake Grid</div>
                  </div>

                  {/* Port representation on the back side of the base */}
                  <div className="w-full flex items-center justify-center gap-1.5 py-1 px-4 bg-zinc-950/60 rounded-md border border-zinc-800/50 mt-1">
                    <div className="w-4 h-2 bg-zinc-800 rounded-sm text-[4px] text-zinc-500 flex items-center justify-center font-mono">10G</div>
                    <div className="w-3 h-1.5 bg-zinc-800 rounded-sm" />
                    <div className="w-3 h-1.5 bg-zinc-800 rounded-sm" />
                    <div className="w-3 h-1.5 bg-zinc-800 rounded-sm" />
                    <div className="w-3 h-1.5 bg-zinc-800 rounded-sm" />
                    <div className="w-4 h-2 bg-zinc-800 rounded-sm text-[4px] text-zinc-500 flex items-center justify-center font-mono">HDMI</div>
                  </div>

                  {/* 3D Base Label */}
                  <div className="absolute left-[110%] top-1/2 -translate-y-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-zinc-400 font-medium whitespace-nowrap opacity-80">
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
                    Antenna & 10G Base Plate
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Scrolling Copy & Highlighting (Takes 5 columns on Desktop) */}
          <div className="col-span-1 lg:col-span-5 space-y-8 py-10">
            <div className="space-y-3">
              <p className="text-xs font-bold text-blue-500 tracking-[0.2em] uppercase">
                Hardware dissection
              </p>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-none text-white">
                {steps[stage].t}
              </h2>
            </div>
            
            <p className="text-zinc-400 leading-relaxed text-base sm:text-lg">
              {steps[stage].d}
            </p>

            <div className="flex gap-2.5 pt-4">
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => {
                    // Quick scroll jump to section progress index
                    const el = sectionRef.current;
                    if (!el) return;
                    const vh = window.innerHeight;
                    const elTop = el.getBoundingClientRect().top + window.scrollY;
                    const stepPercentage = (i / (steps.length - 1)) * 0.95; // safe offset
                    const heightRange = el.scrollHeight - vh;
                    window.scrollTo({
                      top: elTop + heightRange * stepPercentage,
                      behavior: "smooth",
                    });
                  }}
                  className={`group relative h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    i <= stage ? "bg-blue-600" : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                  title={step.t}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 text-[9px] text-zinc-400 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {step.t}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs text-zinc-500 pt-6 border-t border-zinc-900">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-800 bg-zinc-950/40">
                {steps[stage].icon}
              </div>
              <div>
                <p className="font-semibold text-zinc-300">Apple Mac Mini-inspired Architecture</p>
                <p className="text-zinc-600">Scroll to rotate & explode layers</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
