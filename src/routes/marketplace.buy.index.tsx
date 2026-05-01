import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Car, Filter, Search, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { carListings } from "@/data/cars";

export const Route = createFileRoute("/marketplace/buy/")({
  head: () => ({
    meta: [
      { title: "Buy EVs in Myanmar — EVCharge Marketplace" },
      { name: "description", content: "Browse electric cars for sale across Myanmar. Verified sellers, transparent MMK pricing, no hidden fees." },
      { property: "og:title", content: "Buy EVs in Myanmar" },
      { property: "og:description", content: "Browse electric cars for sale across Myanmar." },
    ],
  }),
  component: BuyPage,
});

function BuyPage() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<string>("All");
  const [brand, setBrand] = useState<string>("All");
  const [model, setModel] = useState<string>("All");
  const [bodyType, setBodyType] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("All");

  const cities = ["All", ...Array.from(new Set(carListings.map((l) => l.city)))];
  const brands = ["All", ...Array.from(new Set(carListings.map((l) => l.brand)))];
  const models = ["All", ...Array.from(new Set(carListings.filter((l) => brand === "All" || l.brand === brand).map((l) => l.name)))];
  const bodyTypes = ["All", ...Array.from(new Set(carListings.map((l) => l.bodyType)))];
  const priceRanges = [
    { label: "All", min: 0, max: Infinity },
    { label: "< 50M", min: 0, max: 50_000_000 },
    { label: "50M – 100M", min: 50_000_000, max: 100_000_000 },
    { label: "100M – 200M", min: 100_000_000, max: 200_000_000 },
    { label: "> 200M", min: 200_000_000, max: Infinity },
  ];

  const filtered = useMemo(
    () =>
      carListings.filter((l) => {
        if (city !== "All" && l.city !== city) return false;
        if (brand !== "All" && l.brand !== brand) return false;
        if (model !== "All" && l.name !== model) return false;
        if (bodyType !== "All" && l.bodyType !== bodyType) return false;
        const range = priceRanges.find((r) => r.label === priceRange);
        if (range && (l.price < range.min || l.price > range.max)) return false;
        if (query && !l.name.toLowerCase().includes(query.toLowerCase())) return false;
        return true;
      }),
    [query, city, brand, model, bodyType, priceRange]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/marketplace" className="text-xs text-muted-foreground hover:text-foreground">← Marketplace</Link>
          <div className="mt-2 flex items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl font-bold md:text-5xl">Buy EVs</h1>
              <p className="mt-2 text-muted-foreground">{carListings.length} electric cars listed by verified sellers</p>
            </div>
            <div className="hidden h-10 items-center gap-2 rounded-full bg-eco/15 px-4 text-xs font-semibold text-eco md:inline-flex">
              <Car className="h-3.5 w-3.5" /> Buyer fees: 0%
            </div>
          </div>

          <div className="sticky top-16 z-30 -mx-6 mb-8 mt-8 border-y border-border bg-background/90 px-6 py-4 backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by model…"
                  className="h-7 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto">
                <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
                {cities.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCity(c)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      city === c ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
              <FilterSelect label="Brand" value={brand} options={brands} onChange={(v) => { setBrand(v); setModel("All"); }} />
              <FilterSelect label="Model" value={model} options={models} onChange={setModel} />
              <FilterSelect label="Body type" value={bodyType} options={bodyTypes} onChange={setBodyType} />
              <FilterSelect label="Price (MMK)" value={priceRange} options={priceRanges.map((r) => r.label)} onChange={setPriceRange} />
            </div>
          </div>

          <div className="grid gap-4 pb-20 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((c) => (
              <Link
                key={c.id}
                to="/marketplace/buy/$carId"
                params={{ carId: c.id }}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-electric/40 hover:-translate-y-0.5"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div
                  className="relative aspect-[4/3]"
                  style={{ background: `linear-gradient(135deg, oklch(0.78 0.13 ${c.hue}) 0%, oklch(0.55 0.18 ${c.hue + 30}) 100%)` }}
                >
                  <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold backdrop-blur">{c.year}</span>
                  <span className="absolute right-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold backdrop-blur">{c.city}</span>
                </div>
                <div className="p-4">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.rangeKm} km range</div>
                  <div className="mt-3 font-display text-base font-bold">
                    {c.price.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">MMK</span>
                  </div>
                  <div className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-3 py-2 text-xs font-semibold text-background transition group-hover:opacity-90">
                    View details <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
                No EVs match your filters.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-full border border-border bg-card px-3 text-xs font-medium outline-none transition focus:border-electric/50"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
