import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Zap, ArrowRight, Phone, Navigation, Clock, Route as RouteIcon } from "lucide-react";
import { stations } from "@/data/mock";

export function StationsPreview() {
  const featured = stations.slice(0, 6);
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-eco">— Charging directory</div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Find a charger near you</h2>
          </div>
          <Link to="/stations" className="hidden items-center gap-1 text-sm font-semibold text-electric hover:underline md:inline-flex">
            View all stations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-border/60 bg-gradient-to-br from-electric/5 via-surface to-eco/5 p-5 backdrop-blur-sm transition hover:border-electric/40 hover:-translate-y-0.5 hover:from-electric/10 hover:to-eco/10"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-bold">{s.name}</h3>
                  <div className="mt-1 text-sm text-muted-foreground">{s.city}</div>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${s.available > 0 ? "bg-eco/15 text-eco" : "bg-ruby/15 text-ruby"}`}>
                  {s.available > 0 ? `${s.available} free` : "Busy"}
                </span>
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
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
                <span className="flex items-center gap-1 font-semibold"><Zap className="h-3.5 w-3.5 text-electric" /> {s.maxKw} kW</span>
                <span className="text-muted-foreground">{s.pricePerKwh} <span className="text-xs">MMK/kWh</span></span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
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
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/stations" className="inline-flex items-center gap-1 text-sm font-semibold text-electric">
            View all stations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
