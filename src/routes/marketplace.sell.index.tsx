import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Upload, ArrowRight, Eye, MessageCircle, Heart, Sparkles, Car } from "lucide-react";
import { useState } from "react";
import { sellerListings } from "@/data/sellerListings";
import { carListings } from "@/data/cars";

export const Route = createFileRoute("/marketplace/sell/")({
  head: () => ({
    meta: [
      { title: "Sell your EV — EVCharge Marketplace Myanmar" },
      { name: "description", content: "List your electric car in minutes. Reach verified buyers across Myanmar with transparent MMK pricing and zero listing fees during beta." },
      { property: "og:title", content: "Sell your EV in Myanmar" },
      { property: "og:description", content: "List your EV with verified buyers in Myanmar." },
    ],
  }),
  component: SellPage,
});

const benefits = [
  { title: "Free listings during beta", desc: "No upfront cost — list as many EVs as you'd like." },
  { title: "Verified buyer network", desc: "We screen serious buyers so you get fewer time-wasters." },
  { title: "MMK pricing tools", desc: "Auto-suggested fair price based on market data." },
  { title: "Built-in messaging", desc: "Chat with buyers without sharing your phone number." },
];

function SellPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ model: "", year: "", price: "", city: "", contact: "" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/marketplace" className="text-xs text-muted-foreground hover:text-foreground">← Marketplace</Link>

          <div className="mt-2 grid gap-12 pb-20 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h1 className="font-display text-4xl font-bold md:text-5xl">Sell your EV</h1>
              <p className="mt-3 max-w-lg text-muted-foreground">
                Reach thousands of verified EV buyers across Myanmar. Create a listing in under 5 minutes.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {benefits.map((b) => (
                  <div key={b.title} className="rounded-2xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
                    <CheckCircle2 className="h-5 w-5 text-eco" />
                    <div className="mt-2 font-semibold">{b.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{b.desc}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-3xl border border-dashed border-border p-6 md:p-8">
                <div className="font-display text-xl font-semibold">How it works</div>
                <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li><span className="font-semibold text-foreground">1.</span> Submit your EV details below.</li>
                  <li><span className="font-semibold text-foreground">2.</span> We verify your listing within 24 hours.</li>
                  <li><span className="font-semibold text-foreground">3.</span> Buyers contact you directly through our platform.</li>
                </ol>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 md:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-eco/15 px-3 py-1 text-xs font-medium text-eco">
                <Upload className="h-3.5 w-3.5" /> Quick listing
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold">Tell us about your EV</h2>

              {submitted ? (
                <div className="mt-6 rounded-2xl border border-eco/40 bg-eco/10 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-eco" />
                  <div className="mt-3 font-display text-lg font-semibold">Thanks — we got it!</div>
                  <p className="mt-1 text-sm text-muted-foreground">Our team will review and reach out within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-5 inline-flex h-10 items-center rounded-full border border-border bg-background px-5 text-xs font-semibold transition hover:border-electric/40"
                  >
                    Submit another
                  </button>
                </div>
              ) : (
                <form
                  className="mt-5 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <FormField label="Model" value={form.model} onChange={(v) => setForm({ ...form, model: v })} placeholder="e.g. BYD Atto 3" required />
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Year" value={form.year} onChange={(v) => setForm({ ...form, year: v })} placeholder="2024" required />
                    <FormField label="Price (MMK)" value={form.price} onChange={(v) => setForm({ ...form, price: v })} placeholder="139,000,000" required />
                  </div>
                  <FormField label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} placeholder="Yangon" required />
                  <FormField label="Contact (phone or email)" value={form.contact} onChange={(v) => setForm({ ...form, contact: v })} placeholder="09xxxxxxxxx" required />
                  <button
                    type="submit"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-electric px-5 text-sm font-semibold text-electric-foreground transition hover:opacity-90"
                  >
                    Submit listing <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Currently listed by sellers */}
          <section className="pb-20">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <div className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-electric">— Seller hub</div>
                <h2 className="font-display text-3xl font-bold md:text-4xl">Currently listed by sellers</h2>
                <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                  Manage your active listings — track views, inquiries and promote to the top of search results.
                </p>
              </div>
              <Link to="/marketplace/buy" className="hidden text-sm font-semibold text-electric hover:underline md:inline">
                Browse buyer view →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sellerListings.map((l) => {
                const car = carListings.find((c) => c.id === l.carId);
                if (!car) return null;
                const statusCls =
                  l.status === "active"
                    ? "bg-eco/15 text-eco"
                    : l.status === "paused"
                      ? "bg-secondary text-muted-foreground"
                      : l.status === "pending_review"
                        ? "bg-electric/15 text-electric"
                        : "bg-foreground text-background";
                const statusLabel =
                  l.status === "active" ? "Active" : l.status === "paused" ? "Paused" : l.status === "pending_review" ? "Pending review" : "Sold";
                return (
                  <Link
                    key={l.carId}
                    to="/marketplace/sell/$carId"
                    params={{ carId: l.carId }}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-electric/40"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <div
                      className="relative aspect-[16/10]"
                      style={{ background: `linear-gradient(135deg, oklch(0.78 0.13 ${car.hue}) 0%, oklch(0.55 0.18 ${car.hue + 30}) 100%)` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Car className="h-16 w-16 text-background/30" strokeWidth={1.2} />
                      </div>
                      <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${statusCls}`}>
                        {statusLabel}
                      </span>
                      {l.promoted && (
                        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-electric px-2.5 py-1 text-[10px] font-semibold text-electric-foreground">
                          <Sparkles className="h-3 w-3" /> Promoted
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="font-semibold leading-tight">{car.name}</div>
                        <div className="text-[11px] text-muted-foreground">{l.listedDaysAgo}d ago</div>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{car.year} · {car.city}</div>
                      <div className="mt-3 font-display text-base font-bold">
                        {car.price.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">MMK</span>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-[11px]">
                        <div className="flex flex-col items-center gap-0.5">
                          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="font-semibold">{l.views.toLocaleString()}</span>
                          <span className="text-[10px] text-muted-foreground">views</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="font-semibold">{l.inquiries}</span>
                          <span className="text-[10px] text-muted-foreground">inquiries</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <Heart className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="font-semibold">{l.saves}</span>
                          <span className="text-[10px] text-muted-foreground">saves</span>
                        </div>
                      </div>
                      <div className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-3 py-2 text-xs font-semibold text-background transition group-hover:opacity-90">
                        Manage listing <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}


function FormField({ label, value, onChange, placeholder, required }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type="text"
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-electric"
      />
    </label>
  );
}
