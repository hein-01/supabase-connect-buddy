import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { stations } from "@/data/mock";
import { MapPin, Zap, Filter, Search, Clock, Map as MapIcon, List, Phone, Navigation, Route as RouteIcon } from "lucide-react";
import { useMemo, useState, lazy, Suspense } from "react";

const StationsMap = lazy(() =>
  import("@/components/StationsMap").then((m) => ({ default: m.StationsMap }))
);

export const Route = createFileRoute("/stations")({
  head: () => ({
    meta: [
      { title: "Charging stations across Myanmar — EVCharge" },
      { name: "description", content: "Browse 127+ EV charging stations across Yangon, Mandalay, Naypyidaw and beyond. Filter by city, connector and speed." },
      { property: "og:title", content: "Charging stations across Myanmar" },
      { property: "og:description", content: "Browse EV charging stations across Myanmar." },
    ],
  }),
  component: StationsPage,
});

function StationsPage() {
  const [city, setCity] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"list" | "map">("list");

  const cities = ["All", ...Array.from(new Set(stations.map((s) => s.city)))];

  const filtered = useMemo(() => {
    return stations.filter((s) => {
      if (city !== "All" && s.city !== city) return false;
      if (query && !`${s.name} ${s.operator}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [city, query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Home</Link>
              <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Charging stations</h1>
              <p className="mt-2 text-muted-foreground">{stations.length} stations across Myanmar · updated live</p>
            </div>
            <div className="hidden rounded-full border border-border bg-card p-1 md:inline-flex">
              <button
                onClick={() => setView("list")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${view === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                <List className="h-3.5 w-3.5" /> List
              </button>
              <button
                onClick={() => setView("map")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${view === "map" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                <MapIcon className="h-3.5 w-3.5" /> Map
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="sticky top-16 z-30 -mx-6 mb-8 border-y border-border bg-background/90 px-6 py-4 backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name or operator…"
                  className="h-7 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto">
                <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
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
          </div>

          <div className="mb-4 flex justify-end gap-2 md:hidden">
            <button
              onClick={() => setView(view === "list" ? "map" : "list")}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold"
            >
              {view === "list" ? <><MapIcon className="h-3.5 w-3.5" /> Map view</> : <><List className="h-3.5 w-3.5" /> List view</>}
            </button>
          </div>

          {view === "map" ? (
            <div className="pb-20">
              <Suspense fallback={<div className="flex h-[600px] items-center justify-center rounded-2xl border border-border bg-card text-sm text-muted-foreground">Loading map…</div>}>
                <StationsMap stations={filtered} />
              </Suspense>
              <p className="mt-3 text-xs text-muted-foreground">
                Showing {filtered.length} of {stations.length} stations
              </p>
            </div>
          ) : (
          <div className="grid gap-4 pb-20 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s, i) => (
              <div
                key={s.id}
                className="group rounded-2xl border border-border bg-card p-5 transition hover:border-electric/40"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/10">
                    <MapPin className="h-5 w-5 text-electric" />
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${s.available > 0 ? "bg-eco/15 text-eco" : "bg-ruby/15 text-ruby"}`}>
                    {s.available > 0 ? `${s.available}/${s.total} free` : "All busy"}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{s.name}</h3>
                <div className="mt-1 text-sm text-muted-foreground">{s.city} · {s.operator}</div>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 font-medium text-foreground">
                    <RouteIcon className="h-3.5 w-3.5 text-electric" />
                    {(0.3 + i * 0.4).toFixed(1)} miles
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {s.hours}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.connectors.map((c) => (
                    <span key={c} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium">{c}</span>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-xs">
                  <div>
                    <div className="text-muted-foreground">Speed</div>
                    <div className="font-semibold flex items-center gap-1"><Zap className="h-3 w-3 text-electric" />{s.maxKw} kW</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Price</div>
                    <div className="font-semibold">{s.pricePerKwh} <span className="text-muted-foreground">MMK</span></div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Location</div>
                    <div className="font-semibold flex items-center gap-1"><MapPin className="h-3 w-3" />Kamayut</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href="tel:+959000000000"
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-border bg-secondary text-xs font-semibold transition hover:border-electric/40 hover:text-electric"
                  >
                    <Phone className="h-3.5 w-3.5" /> Call
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-foreground text-xs font-semibold text-background transition hover:opacity-90"
                  >
                    <Navigation className="h-3.5 w-3.5" /> Directions
                  </a>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
                No stations match your filters.
              </div>
            )}
          </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
