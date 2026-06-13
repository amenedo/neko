import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "../components/SiteNav";
import { Check, Info, ShieldCheck, Truck, ShoppingBag, Receipt, ArrowRight } from "lucide-react";
import { NekoLogo } from "../components/NekoLogo";

export const Route = createFileRoute("/pre-order")({
  head: () => ({
    meta: [
      { title: "Configure & Pre-order neko — $1,999" },
      { name: "description", content: "Customize your neko mini PC. Choose unified memory, storage options, and color finish. Shipping Q3 2026." },
      { property: "og:title", content: "Configure neko" },
      { property: "og:description", content: "Reserve your custom build. Limited batch slots." },
    ],
  }),
  component: PreOrderPage,
});

function PreOrderPage() {
  const [submitted, setSubmitted] = useState(false);

  // Configuration options
  const [vram, setVram] = useState<"64g" | "128g" | "256g">("128g");
  const [storage, setStorage] = useState<"2tb" | "4tb" | "8tb">("2tb");
  const [color, setColor] = useState<"silver" | "black" | "blue">("silver");

  // Customer forms
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Spain");

  const vramPrices = { "64g": 0, "128g": 400, "256g": 1000 };
  const storagePrices = { "2tb": 0, "4tb": 200, "8tb": 500 };
  const colorPrices = { silver: 0, black: 0, blue: 100 };

  const vramNames = { "64g": "64GB LPDDR5X Unified", "128g": "128GB LPDDR5X Unified", "256g": "256GB LPDDR5X Unified" };
  const storageNames = { "2tb": "2TB NVMe PCIe Gen5 SSD", "4tb": "4TB NVMe PCIe Gen5 SSD", "8tb": "8TB NVMe PCIe Gen5 SSD" };
  const colorNames = { silver: "Silver Satin", black: "Obsidian Black", blue: "Neko Blue" };

  const basePrice = 1999;
  const totalPrice = basePrice + vramPrices[vram] + storagePrices[storage] + colorPrices[color];
  const installmentPrice = Math.round(totalPrice / 24);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/20 selection:text-blue-500">
      <SiteNav />

      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          
          {/* Header titles */}
          <div className="mb-12 space-y-3">
            <p className="text-xs font-bold text-blue-600 tracking-[0.2em] uppercase">Apple-style Configurator</p>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-none">
              Customize your neko.
            </h1>
          </div>

          {!submitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Left Column: Configuration options selector (7 cols) */}
              <div className="lg:col-span-7 space-y-10">
                
                {/* 1. CHOOSE COLOR */}
                <div className="space-y-4">
                  <span className="text-xs font-mono text-zinc-500 font-bold uppercase tracking-wider">1. CHOOSE FINISH SHADE</span>
                  <div className="grid grid-cols-3 gap-3">
                    {(["silver", "black", "blue"] as const).map((colId) => (
                      <button
                        key={colId}
                        onClick={() => setColor(colId)}
                        className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all ${
                          color === colId ? "border-blue-600 ring-1 ring-blue-500 bg-secondary/10" : "border-border hover:bg-secondary/40"
                        }`}
                      >
                        <div className="flex gap-1.5 items-center">
                          <div className={`w-4 h-4 rounded-full border shadow-inner ${
                            colId === "silver" ? "bg-zinc-200 border-zinc-300" : colId === "black" ? "bg-zinc-800 border-zinc-900" : "bg-blue-600 border-blue-700"
                          }`} />
                          {color === colId && <Check className="w-3.5 h-3.5 text-blue-600" />}
                        </div>
                        <div>
                          <span className="text-xs font-semibold block text-zinc-500">Finish</span>
                          <span className="text-sm font-bold text-foreground mt-0.5">{colorNames[colId]}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. CHOOSE UNIFIED MEMORY (VRAM) */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-zinc-500 font-bold uppercase tracking-wider">2. CHOOSE UNIFIED MEMORY</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Grace Blackwell memory bus</span>
                  </div>
                  <div className="space-y-3">
                    {(["64g", "128g", "256g"] as const).map((vrId) => (
                      <button
                        key={vrId}
                        onClick={() => setVram(vrId)}
                        className={`w-full p-5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          vram === vrId ? "border-blue-600 ring-1 ring-blue-500 bg-secondary/10" : "border-border hover:bg-secondary/40"
                        }`}
                      >
                        <div>
                          <span className="text-base font-bold text-foreground block">{vramNames[vrId]}</span>
                          <span className="text-xs text-muted-foreground mt-0.5">
                            {vrId === "64g" ? "Base specification" : vrId === "128g" ? "Highly recommended for 70B parameter models" : "Ideal for MoE and heavy 200B parameters"}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold font-mono text-foreground">
                            {vramPrices[vrId] === 0 ? "Included" : `+$${vramPrices[vrId]}`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. CHOOSE STORAGE CAPACITY */}
                <div className="space-y-4">
                  <span className="text-xs font-mono text-zinc-500 font-bold uppercase tracking-wider">3. CHOOSE SSD STORAGE</span>
                  <div className="space-y-3">
                    {(["2tb", "4tb", "8tb"] as const).map((stId) => (
                      <button
                        key={stId}
                        onClick={() => setStorage(stId)}
                        className={`w-full p-5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          storage === stId ? "border-blue-600 ring-1 ring-blue-500 bg-secondary/10" : "border-border hover:bg-secondary/40"
                        }`}
                      >
                        <div>
                          <span className="text-base font-bold text-foreground block">{storageNames[stId]}</span>
                          <span className="text-xs text-muted-foreground mt-0.5">
                            {stId === "2tb" ? "Single NVMe Gen5" : stId === "4tb" ? "Dual 2TB NVMe Gen5 (Raid capable)" : "Dual 4TB NVMe Gen5 (Raid capable)"}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold font-mono text-foreground">
                            {storagePrices[stId] === 0 ? "Included" : `+$${storagePrices[stId]}`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Checkout summaries (5 cols) */}
              <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-6">
                
                {/* Dynamically updating price card */}
                <div className="border border-border rounded-2xl p-6 sm:p-8 space-y-6 bg-secondary/10 shadow-sm">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-zinc-500 font-bold uppercase tracking-wider">PRE-ORDER SUMMARY</span>
                    <h2 className="text-4xl font-bold font-mono tracking-tight text-foreground">${totalPrice.toLocaleString()}</h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Or finance from <strong className="text-foreground">${installmentPrice}/mo</strong> for 24 months at 0% APR.
                    </p>
                  </div>

                  <div className="h-px bg-border/40" />

                  {/* Summary of choices */}
                  <ul className="space-y-2.5 text-xs text-muted-foreground font-mono">
                    <li className="flex justify-between"><span className="truncate">neko Mini PC Case ({colorNames[color]})</span><span className="text-foreground shrink-0">${(basePrice + colorPrices[color]).toLocaleString()}</span></li>
                    <li className="flex justify-between"><span className="truncate">VRAM: {vramNames[vram]}</span><span className="text-foreground shrink-0">+{vramPrices[vram] === 0 ? "Included" : `$${vramPrices[vram]}`}</span></li>
                    <li className="flex justify-between"><span className="truncate">Storage: {storageNames[storage]}</span><span className="text-foreground shrink-0">+{storagePrices[storage] === 0 ? "Included" : `$${storagePrices[storage]}`}</span></li>
                  </ul>

                  <div className="h-px bg-border/40" />

                  {/* Reservation Deposit details */}
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="text-xs font-semibold text-foreground">Refundable Deposit:</span>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Billed only prior to shipping.</p>
                    </div>
                    <span className="text-2xl font-bold font-mono text-emerald-500">$99</span>
                  </div>
                </div>

                {/* Reservation form inputs */}
                <div className="border border-border rounded-2xl p-6 sm:p-8 bg-background shadow-md">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                  >
                    <span className="text-xs font-mono text-zinc-500 font-bold uppercase tracking-wider">CUSTOMER INFORMATION</span>
                    
                    <label className="block">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Full Name</span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Grace Hopper"
                        className="mt-1 w-full bg-transparent border-b border-border focus:border-blue-500 outline-none py-2 text-sm transition-colors font-sans"
                      />
                    </label>

                    <label className="block">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Email address</span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="grace@hopper.org"
                        className="mt-1 w-full bg-transparent border-b border-border focus:border-blue-500 outline-none py-2 text-sm transition-colors font-sans"
                      />
                    </label>

                    <label className="block">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Shipping country</span>
                      <input
                        type="text"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Spain"
                        className="mt-1 w-full bg-transparent border-b border-border focus:border-blue-500 outline-none py-2 text-sm transition-colors font-sans"
                      />
                    </label>

                    <button
                      type="submit"
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm py-3.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <ShoppingBag className="w-4 h-4" /> Secure Reservation — $99
                    </button>
                    
                    <p className="text-[10px] text-zinc-500 text-center leading-relaxed">
                      Zero card charge today. We will contact you to confirm and verify shipping prior to billing.
                    </p>
                  </form>
                </div>

              </div>

            </div>
          ) : (
            /* Reservation Receipt Sequence */
            <div className="mx-auto max-w-2xl bg-zinc-950 text-white rounded-3xl border border-zinc-800 shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_top_right,#0022FF,transparent_60%)]" />
              
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 mb-2">
                  <Receipt className="w-6 h-6 animate-bounce" />
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight">Queue slot locked.</h2>
                <p className="text-zinc-400 text-sm">Thank you, {name || "Developer"}. Your reservation for neko has been registered.</p>
              </div>

              <div className="h-px bg-zinc-850" />

              {/* Styled Receipt Paper block */}
              <div className="bg-zinc-900/60 border border-zinc-850 rounded-2xl p-5 sm:p-6 space-y-4 font-mono text-xs text-zinc-300">
                <div className="flex justify-between items-center text-white pb-3 border-b border-zinc-850">
                  <NekoLogo size={24} textColor="#ffffff" />
                  <span className="text-[10px] text-zinc-500">TXN_ID: #NEKO-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>

                <ul className="space-y-3 pt-2">
                  <li className="flex justify-between"><span>neko Mini PC - {colorNames[color]}</span><span className="text-white">${basePrice.toLocaleString()}</span></li>
                  <li className="flex justify-between"><span>+ VRAM: {vramNames[vram]}</span><span className="text-white">+${vramPrices[vram].toLocaleString()}</span></li>
                  <li className="flex justify-between"><span>+ SSD: {storageNames[storage]}</span><span className="text-white">+${storagePrices[storage].toLocaleString()}</span></li>
                  {colorPrices[color] > 0 && (
                    <li className="flex justify-between"><span>+ Custom Finish Charge</span><span className="text-white">+$100</span></li>
                  )}
                </ul>

                <div className="h-px bg-zinc-850 my-2" />

                <div className="flex justify-between font-bold text-white text-sm">
                  <span>TOTAL ESTIMATED BUNDLE:</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>

                <div className="flex justify-between font-bold text-emerald-400 text-sm mt-1">
                  <span>RESERVATION DEPOSIT CHARGE:</span>
                  <span>$99.00</span>
                </div>

                <div className="text-[10px] text-zinc-500 leading-relaxed pt-2">
                  A receipt confirmation has been transmitted to <strong className="text-zinc-300">{email || "your-email"}</strong>. Shipping to <strong className="text-zinc-300">{country}</strong> scheduled for late Q3 2026.
                </div>
              </div>

              {/* Animated Progress Tracker */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-widest">DELIVERY PIPELINE STEPS</span>
                <div className="grid grid-cols-4 gap-2 relative">
                  
                  <div className="space-y-1">
                    <div className="h-2 bg-emerald-500 rounded-full" />
                    <span className="text-[9px] font-mono text-emerald-400 font-bold block">Reserved</span>
                  </div>

                  <div className="space-y-1">
                    <div className="h-2 bg-blue-600 rounded-full animate-pulse" />
                    <span className="text-[9px] font-mono text-blue-500 font-bold block">Queue Slot</span>
                  </div>

                  <div className="space-y-1">
                    <div className="h-2 bg-zinc-800 rounded-full" />
                    <span className="text-[9px] font-mono text-zinc-500 block">Assembly Q3</span>
                  </div>

                  <div className="space-y-1">
                    <div className="h-2 bg-zinc-800 rounded-full" />
                    <span className="text-[9px] font-mono text-zinc-500 block">Deliver</span>
                  </div>

                </div>
              </div>

              <div className="h-px bg-zinc-850" />

              <div className="flex justify-center">
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors text-xs font-semibold flex items-center gap-1.5"
                >
                  Configure another build <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* Trust assurances block */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-xs text-muted-foreground border-t border-border/40 pt-10">
            <div className="space-y-2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-secondary/20">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-bold text-foreground">Fully refundable deposit</h3>
              <p className="max-w-[200px] leading-relaxed mx-auto">Cancel your reservation slot at any single moment for a full refund.</p>
            </div>
            <div className="space-y-2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-secondary/20">
                <Truck className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-bold text-foreground">Free worldwide delivery</h3>
              <p className="max-w-[200px] leading-relaxed mx-auto">Ships via priority express courier safely direct to your doorstep.</p>
            </div>
            <div className="space-y-2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-secondary/20">
                <ShoppingBag className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-bold text-foreground">Two-year full warranty</h3>
              <p className="max-w-[200px] leading-relaxed mx-auto">Complete motherboard, memory, and SoC protection and support.</p>
            </div>
          </div>

        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
