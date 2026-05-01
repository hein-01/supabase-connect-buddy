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

// Parse times like "08:00", "22:00", "11:00 AM", "11:00 PM"
function parseTimeToMinutes(s: string): number | null {
  const cleaned = s.trim().toUpperCase();
  const m = cleaned.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  const mer = m[3];
  if (mer === "AM" && h === 12) h = 0;
  else if (mer === "PM" && h !== 12) h += 12;
  return h * 60 + min;
}

function isStationOpen(hours: string, nowMinutes: number): boolean {
  if (/24\s*\/\s*7/i.test(hours)) return true;
  const parts = hours.split(/[–-]/);
  if (parts.length !== 2) return false;
  const start = parseTimeToMinutes(parts[0]);
  const end = parseTimeToMinutes(parts[1]);
  if (start == null || end == null) return false;
  if (end >= start) return nowMinutes >= start && nowMinutes <= end;
  return nowMinutes >= start || nowMinutes <= end;
}

function StationsPage() {
  const [city, setCity] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"list" | "map">("list");
  const [openNow, setOpenNow] = useState(false);
  const _now = new Date();
  const defaultTime = `${String(_now.getHours()).padStart(2, "0")}:${String(_now.getMinutes()).padStart(2, "0")}`;
  const [time, setTime] = useState<string>(defaultTime);

  const cities = ["All", ...Array.from(new Set(stations.map((s) => s.city)))];

  const [hh, mm] = time.split(":").map((n) => parseInt(n, 10));
  const nowMinutes = (hh || 0) * 60 + (mm || 0);

  const filtered = useMemo(() => {
    return stations.filter((s) => {
      if (city !== "All" && s.city !== city) return false;
      if (query && !`${s.name} ${s.operator}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (openNow && !isStationOpen(s.hours, nowMinutes)) return false;
      return true;
    });
  }, [city, query, openNow, nowMinutes]);

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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOpenNow((v) => !v)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    openNow ? "bg-eco text-background" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                  aria-pressed={openNow}
                >
                  <Clock className="h-3.5 w-3.5" /> Open now
                </button>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={!openNow}
                  className="h-8 rounded-full border border-border bg-card px-3 text-xs outline-none disabled:opacity-50"
                  aria-label="Time to check open status"
                />
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
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold">{s.name}</h3>
                    <div className="mt-1 text-sm text-muted-foreground">{s.city}</div>
                  </div>
                  {(() => {
                    const open = isStationOpen(s.hours, nowMinutes);
                    return (
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${open ? "bg-eco/15 text-eco" : "bg-ruby/15 text-ruby"}`}>
                        {open ? "Open now" : "Closed"}
                      </span>
                    );
                  })()}
                </div>
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
                    <div className="text-muted-foreground">Capacity</div>
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
