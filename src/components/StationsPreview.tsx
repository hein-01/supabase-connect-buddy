import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Zap, ArrowRight } from "lucide-react";
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
              className="group rounded-2xl border border-border bg-card p-5 transition hover:border-electric/40 hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-electric/10">
                  <MapPin className="h-5 w-5 text-electric" />
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${s.available > 0 ? "bg-eco/15 text-eco" : "bg-ruby/15 text-ruby"}`}>
                  {s.available > 0 ? `${s.available} free` : "Busy"}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{s.name}</h3>
              <div className="mt-1 text-sm text-muted-foreground">{s.city} · {s.operator}</div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.connectors.map((c) => (
                  <span key={c} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium">{c}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
                <span className="flex items-center gap-1 font-semibold"><Zap className="h-3.5 w-3.5 text-electric" /> {s.maxKw} kW</span>
                <span className="text-muted-foreground">{s.pricePerKwh} <span className="text-xs">MMK/kWh</span></span>
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
