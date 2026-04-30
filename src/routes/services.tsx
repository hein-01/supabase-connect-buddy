import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Wrench, Shield, Star, MapPin, ArrowRight, Phone, Navigation } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "EV Workshops & Insurance — EVCharge Myanmar" },
      { name: "description", content: "Find certified EV repair workshops, insurance providers and financing options across Myanmar." },
      { property: "og:title", content: "EV Workshops & Insurance — EVCharge Myanmar" },
      { property: "og:description", content: "Verified EV workshops and insurance partners across Myanmar." },
    ],
  }),
  component: ServicesPage,
});

const workshops = [
  { name: "EVTech Yangon", city: "Yangon", rating: 4.9, reviews: 124, services: ["Battery", "Drivetrain", "Diagnostics"], hue: 295 },
  { name: "Mandalay EV Garage", city: "Mandalay", rating: 4.8, reviews: 86, services: ["General service", "Bodywork"], hue: 155 },
  { name: "Green Auto Care", city: "Yangon", rating: 4.7, reviews: 210, services: ["Battery", "Charger install"], hue: 240 },
  { name: "Capital EV Service", city: "Naypyidaw", rating: 4.6, reviews: 54, services: ["Diagnostics", "Tires"], hue: 25 },
  { name: "BYD Authorized — Yangon", city: "Yangon", rating: 5.0, reviews: 312, services: ["Warranty", "Software updates"], hue: 305 },
  { name: "Eastern Auto Hub", city: "Mandalay", rating: 4.5, reviews: 41, services: ["General service"], hue: 195 },
];

const insurers = [
  { name: "AYA SOMPO EV Plus", desc: "Comprehensive cover with battery protection and roadside assistance.", from: "180,000", hue: 295 },
  { name: "GGI Electric Care", desc: "EV-specific policy covering charging accidents and third-party.", from: "150,000", hue: 155 },
  { name: "IKBZ EV Shield", desc: "Tiered plans from basic third-party to full battery cover.", from: "120,000", hue: 25 },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Home</Link>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Workshops & Services</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Verified EV repair shops, insurance providers and financing partners across Myanmar.
          </p>

          {/* Workshops */}
          <section className="mt-12">
            <div className="mb-6 flex items-end justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric/10">
                  <Wrench className="h-5 w-5 text-electric" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold">Repair workshops</h2>
                  <p className="text-sm text-muted-foreground">{workshops.length} verified · more added weekly</p>
                </div>
              </div>
              <button className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-electric hover:underline">
                List your workshop <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {workshops.map((w) => (
                <div key={w.name} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-electric/40" style={{ boxShadow: "var(--shadow-card)" }}>
                  <div className="h-24" style={{ background: `linear-gradient(135deg, oklch(0.78 0.13 ${w.hue}) 0%, oklch(0.60 0.18 ${w.hue + 30}) 100%)` }} />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg font-bold leading-snug">{w.name}</h3>
                      <div className="flex shrink-0 items-center gap-1 rounded-full bg-eco/10 px-2 py-0.5 text-xs font-semibold text-eco">
                        <Star className="h-3 w-3 fill-current" /> {w.rating}
                      </div>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {w.city} · {w.reviews} reviews
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {w.services.map((s) => (
                        <span key={s} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium">{s}</span>
                      ))}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <a
                        href="tel:+959000000000"
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-border bg-secondary text-xs font-semibold transition hover:border-electric/40 hover:text-electric"
                      >
                        <Phone className="h-3.5 w-3.5" /> Call
                      </a>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${w.name}, ${w.city}, Myanmar`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-foreground text-xs font-semibold text-background transition hover:opacity-90"
                      >
                        <Navigation className="h-3.5 w-3.5" /> Directions
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Insurance */}
          <section className="mt-16">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-eco/10">
                <Shield className="h-5 w-5 text-eco" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">EV insurance</h2>
                <p className="text-sm text-muted-foreground">Compare plans from Myanmar's leading insurers</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {insurers.map((i) => (
                <div key={i.name} className="rounded-2xl border border-border bg-card p-6 transition hover:border-eco/50" style={{ boxShadow: "var(--shadow-card)" }}>
                  <div className="h-1.5 w-12 rounded-full" style={{ background: `linear-gradient(135deg, oklch(0.65 0.17 ${i.hue}), oklch(0.55 0.18 ${i.hue + 30}))` }} />
                  <h3 className="mt-4 font-display text-lg font-bold">{i.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
                  <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                    <div>
                      <div className="text-xs text-muted-foreground">From</div>
                      <div className="font-display text-xl font-bold">{i.from} <span className="text-xs font-normal text-muted-foreground">MMK/yr</span></div>
                    </div>
                    <button className="inline-flex h-9 items-center gap-1 rounded-full bg-foreground px-4 text-xs font-semibold text-background transition hover:opacity-90">
                      Compare <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="my-20 grid gap-4 md:grid-cols-2">
            <CTACard title="Run a workshop?" desc="Reach Myanmar's growing EV community. Get listed free during beta." cta="List your workshop" />
            <CTACard title="Insurance partner?" desc="Showcase your EV plans next to the country's top providers." cta="Become a partner" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CTACard({ title, desc, cta }: { title: string; desc: string; cta: string }) {
  return (
    <div className="rounded-3xl border border-border bg-gradient-to-br from-electric/5 to-eco/5 p-8">
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      <button className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90">
        {cta} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
