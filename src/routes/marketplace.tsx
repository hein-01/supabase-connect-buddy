import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Car, ShoppingBag, Bell, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "EV Marketplace — Buy & sell EVs and accessories in Myanmar" },
      { name: "description", content: "Buy and sell electric vehicles, chargers and accessories from verified sellers across Myanmar. Launching soon." },
      { property: "og:title", content: "EV Marketplace — EVCharge Myanmar" },
      { property: "og:description", content: "Buy and sell EVs and accessories in Myanmar." },
    ],
  }),
  component: MarketplacePage,
});

const previewCars = [
  { name: "BYD Atto 3", price: "139,000,000", year: 2025, range: "420 km", hue: 295 },
  { name: "Wuling Air EV", price: "49,500,000", year: 2024, range: "200 km", hue: 155 },
  { name: "BYD Dolphin", price: "98,000,000", year: 2024, range: "340 km", hue: 240 },
  { name: "Tesla Model 3", price: "215,000,000", year: 2023, range: "510 km", hue: 25 },
];

const previewParts = [
  { name: "Type 2 home wallbox 7kW", price: "1,250,000", seller: "EVHome MM", hue: 195 },
  { name: "CCS2 portable charger 22kW", price: "3,800,000", seller: "PowerHub", hue: 295 },
  { name: "Premium EV tire set (4)", price: "920,000", seller: "MyanTire", hue: 130 },
  { name: "Dashcam + EV monitor", price: "320,000", seller: "AutoTech YGN", hue: 25 },
];

function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Home</Link>

          {/* Hero banner */}
          <div className="mt-2 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-electric/10 via-card to-eco/10 p-10 md:p-14" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-eco/15 px-3 py-1 text-xs font-medium text-eco">
                  <span className="h-1.5 w-1.5 rounded-full bg-eco" /> Beta launching Q3 2026
                </span>
                <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
                  Myanmar's EV<br />marketplace.
                </h1>
                <p className="mt-4 max-w-md text-muted-foreground">
                  A trusted place to buy and sell electric cars, chargers and accessories. Verified sellers, transparent pricing in MMK, no hidden fees.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90">
                    <Bell className="h-4 w-4" /> Notify me at launch
                  </button>
                  <button className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-semibold transition hover:border-electric/40">
                    Become a seller <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: "200+", l: "EV listings" },
                  { v: "12", l: "Verified sellers" },
                  { v: "MMK", l: "Local pricing" },
                  { v: "0%", l: "Buyer fees" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-border bg-background p-4">
                    <div className="font-display text-2xl font-bold text-gradient-electric">{s.v}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cars preview */}
          <PreviewSection icon={Car} title="Electric cars" subtitle="A taste of what's coming">
            {previewCars.map((c) => (
              <div key={c.name} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-electric/40" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="relative aspect-[4/3]" style={{ background: `linear-gradient(135deg, oklch(0.78 0.13 ${c.hue}) 0%, oklch(0.55 0.18 ${c.hue + 30}) 100%)` }}>
                  <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold backdrop-blur">{c.year}</span>
                </div>
                <div className="p-4">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.range} range</div>
                  <div className="mt-3 font-display text-base font-bold">{c.price} <span className="text-xs font-normal text-muted-foreground">MMK</span></div>
                </div>
              </div>
            ))}
          </PreviewSection>

          {/* Accessories preview */}
          <PreviewSection icon={ShoppingBag} title="Accessories & parts" subtitle="Chargers, tires, electronics & more">
            {previewParts.map((p) => (
              <div key={p.name} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-electric/40" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="aspect-[4/3]" style={{ background: `linear-gradient(135deg, oklch(0.85 0.10 ${p.hue}) 0%, oklch(0.65 0.15 ${p.hue + 30}) 100%)` }} />
                <div className="p-4">
                  <div className="text-xs text-muted-foreground">{p.seller}</div>
                  <div className="mt-1 font-semibold leading-snug">{p.name}</div>
                  <div className="mt-3 font-display text-base font-bold">{p.price} <span className="text-xs font-normal text-muted-foreground">MMK</span></div>
                </div>
              </div>
            ))}
          </PreviewSection>

          <div className="my-20 rounded-3xl border border-dashed border-border p-10 text-center">
            <div className="font-display text-2xl font-bold">Want to be a launch seller?</div>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              We're onboarding verified dealers, accessory shops and individual sellers. List free during beta.
            </p>
            <button className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition hover:opacity-90">
              Apply to sell <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function PreviewSection({ icon: Icon, title, subtitle, children }: { icon: typeof Car; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="mt-16">
      <div className="mb-6 flex items-end justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric/10">
            <Icon className="h-5 w-5 text-electric" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold uppercase">Preview</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </section>
  );
}
