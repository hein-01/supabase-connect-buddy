import { motion } from "framer-motion";
import { ArrowRight, Search, Sparkles, Zap, Battery, Clock, Calculator } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export function Hero() {
  const [batteryKwh, setBatteryKwh] = useState(60);
  const [currentPct, setCurrentPct] = useState(20);
  const [targetPct, setTargetPct] = useState(80);
  const [chargerKw, setChargerKw] = useState(60);
  const [pricePerKwh, setPricePerKwh] = useState(350);

  const { kwhNeeded, minutes, cost } = useMemo(() => {
    const pctDiff = Math.max(0, targetPct - currentPct);
    const kwhNeeded = (batteryKwh * pctDiff) / 100;
    // Realistic factor: charging slows above 80%, plus efficiency loss.
    const efficiency = targetPct > 80 ? 0.78 : 0.9;
    const effectiveKw = chargerKw * efficiency;
    const minutes = effectiveKw > 0 ? (kwhNeeded / effectiveKw) * 60 : 0;
    const cost = kwhNeeded * pricePerKwh;
    return { kwhNeeded, minutes, cost };
  }, [batteryKwh, currentPct, targetPct, chargerKw, pricePerKwh]);

  const formatTime = (mins: number) => {
    if (mins < 1) return "—";
    const h = Math.floor(mins / 60);
    const m = Math.round(mins % 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-eco" />
            The independent EV hub for Myanmar
          </div>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Everything <span className="text-gradient-electric">electric</span>,<br />
            in one place.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Find chargers, browse EVs, discover workshops, compare insurance and stay on top of the news — Myanmar's growing EV ecosystem under one roof.
          </p>

          {/* Universal search */}
          <div className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-sm" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex flex-1 items-center gap-2 px-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search stations, EVs, workshops…"
                className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button className="inline-flex h-10 items-center gap-1.5 rounded-full bg-electric px-5 text-sm font-semibold text-electric-foreground transition hover:opacity-90">
              Search <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Try:</span>
            {["BYD Atto 3", "fast charger Yangon", "EV insurance", "Mandalay workshop"].map((t) => (
              <Link key={t} to="/stations" className="rounded-full bg-secondary px-3 py-1 transition hover:bg-muted">
                {t}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* EV Charge Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-14 max-w-4xl"
        >
          <div
            className="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-6 backdrop-blur md:p-8"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full" style={{ background: "var(--gradient-radial)" }} />

            <div className="relative grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
              {/* Inputs */}
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  <Calculator className="h-3.5 w-3.5 text-electric" />
                  EV Charge Calculator
                </div>
                <h3 className="font-display text-xl font-semibold">Estimate your next charge</h3>
                <p className="mt-1 text-sm text-muted-foreground">Plan time and cost in MMK before you plug in.</p>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <Field label="Battery (kWh)">
                    <input
                      type="number"
                      min={10}
                      max={200}
                      value={batteryKwh}
                      onChange={(e) => setBatteryKwh(Number(e.target.value) || 0)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-electric"
                    />
                  </Field>
                  <Field label="Charger (kW)">
                    <input
                      type="number"
                      min={3}
                      max={350}
                      value={chargerKw}
                      onChange={(e) => setChargerKw(Number(e.target.value) || 0)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-electric"
                    />
                  </Field>
                  <Field label={`From ${currentPct}%`}>
                    <input
                      type="range"
                      min={0}
                      max={99}
                      value={currentPct}
                      onChange={(e) => setCurrentPct(Math.min(Number(e.target.value), targetPct - 1))}
                      className="w-full accent-electric"
                    />
                  </Field>
                  <Field label={`To ${targetPct}%`}>
                    <input
                      type="range"
                      min={1}
                      max={100}
                      value={targetPct}
                      onChange={(e) => setTargetPct(Math.max(Number(e.target.value), currentPct + 1))}
                      className="w-full accent-eco"
                    />
                  </Field>
                  <div className="col-span-2">
                    <Field label="Price per kWh (MMK)">
                      <input
                        type="number"
                        min={0}
                        value={pricePerKwh}
                        onChange={(e) => setPricePerKwh(Number(e.target.value) || 0)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-electric"
                      />
                    </Field>
                  </div>
                </div>
              </div>

              <div className="hidden md:block w-px bg-border" />

              {/* Results */}
              <div className="flex flex-col justify-between gap-5">
                <div className="grid grid-cols-1 gap-3">
                  <ResultRow icon={<Battery className="h-4 w-4 text-electric" />} label="Energy needed" value={`${kwhNeeded.toFixed(1)} kWh`} />
                  <ResultRow icon={<Clock className="h-4 w-4 text-eco" />} label="Charging time" value={formatTime(minutes)} />
                  <ResultRow icon={<Zap className="h-4 w-4 text-accent" />} label="Estimated cost" value={`${Math.round(cost).toLocaleString()} MMK`} highlight />
                </div>
                <Link
                  to="/stations"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-electric px-5 py-2.5 text-sm font-semibold text-electric-foreground transition hover:opacity-90"
                >
                  Find a station <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pillar shortcuts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { to: "/stations", label: "Charging stations", count: "127 live", emoji: "⚡", grad: "from-electric/15 to-electric/5" },
            { to: "/marketplace", label: "Cars Accessories", count: "Coming soon", emoji: "🚗", grad: "from-eco/15 to-eco/5" },
            { to: "/services", label: "Workshops & repair", count: "48 verified", emoji: "🔧", grad: "from-accent/15 to-accent/5" },
            { to: "/news", label: "EV news & guides", count: "New daily", emoji: "📰", grad: "from-ruby/10 to-ruby/0" },
            { to: "/marketplace/buy", label: "Buy EVs", count: "Browse listings", emoji: "🛒", grad: "from-electric/15 to-electric/5" },
            { to: "/marketplace/sell", label: "Sell EVs", count: "List your car", emoji: "💸", grad: "from-eco/15 to-eco/5" },
            { to: "/marketplace/rent", label: "Rent EVs", count: "Daily & weekly", emoji: "🔑", grad: "from-accent/15 to-accent/5" },
            { to: "/services", label: "Insurance & Loan", count: "Compare plans", emoji: "🛡️", grad: "from-ruby/10 to-ruby/0" },
          ].map((p, i) => (
            <Link
              key={`${p.to}-${i}`}
              to={p.to as "/stations"}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${p.grad} p-5 transition hover:border-electric/40 hover:-translate-y-0.5`}
            >
              <div className="text-2xl">{p.emoji}</div>
              <div className="mt-3 font-semibold">{p.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{p.count}</div>
              <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-electric" />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-left">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function ResultRow({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border border-border px-4 py-3 ${
        highlight ? "bg-gradient-to-r from-electric/10 to-eco/10" : "bg-background/60"
      }`}
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className={`font-display text-lg font-semibold ${highlight ? "text-gradient-electric" : ""}`}>{value}</div>
    </div>
  );
}
