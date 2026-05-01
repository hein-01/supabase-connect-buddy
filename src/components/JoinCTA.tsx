import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function JoinCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-12 md:p-16"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-electric/15 blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-eco/15 blur-[100px]" />

          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-eco/10 px-3 py-1 text-xs font-medium text-eco">
                For businesses
              </div>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
                Run an EV business?<br />
                <span className="text-gradient-electric">List it on EVCharge.</span>
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Charging operators, dealerships, accessory shops, workshops, insurers — reach Myanmar's growing EV community in one place. Free during beta.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { label: "Charging operators", desc: "Add stations & manage availability" },
                { label: "Dealers & sellers", desc: "List new and used EVs" },
                { label: "Workshops", desc: "Get discovered by EV owners" },
                { label: "Insurers & finance", desc: "Showcase EV-specific plans" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded-2xl border border-border bg-background p-4 transition hover:border-electric/40">
                  <div>
                    <div className="font-semibold text-sm">{row.label}</div>
                    <div className="text-xs text-muted-foreground">{row.desc}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-electric" />
                </div>
              ))}
              <button className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background transition hover:opacity-90">
                List your business <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
