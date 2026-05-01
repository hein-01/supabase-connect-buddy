import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Car, ShoppingBag, Wrench, Shield } from "lucide-react";

const pillars = [
  {
    to: "/marketplace",
    search: { category: "cars" as const },
    icon: Car,
    title: "Buy & sell EVs",
    desc: "Browse new and used electric cars from verified sellers across Myanmar. Filter by range, brand and price in MMK.",
    badge: "Coming soon",
    stat: "200+ listings ready at launch",
    hue: "from-electric/10 to-electric/0",
  },
  {
    to: "/marketplace",
    search: { category: "accessories" as const },
    icon: ShoppingBag,
    title: "Accessories & parts",
    desc: "Home chargers, cables, dashcams, tyres, mats — everything for your EV from local shops.",
    badge: "Beta",
    stat: "12 verified sellers",
    hue: "from-eco/10 to-eco/0",
  },
  {
    to: "/services",
    search: undefined,
    icon: Wrench,
    title: "Workshops & repair",
    desc: "Find certified EV mechanics in Yangon, Mandalay and beyond. See specialties, ratings and pricing upfront.",
    badge: "Live",
    stat: "48 verified workshops",
    hue: "from-accent/10 to-accent/0",
  },
  {
    to: "/services",
    search: undefined,
    icon: Shield,
    title: "Insurance & Loan",
    desc: "Compare EV-specific insurance plans and financing options from Myanmar's top providers.",
    badge: "Live",
    stat: "6 partners",
    hue: "from-ruby/10 to-ruby/0",
  },
];

export function Pillars() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl">
          <div className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-eco">— The EV ecosystem</div>
          <h2 className="font-display text-3xl font-bold md:text-4xl">More than just charging.</h2>
          <p className="mt-3 text-muted-foreground">From the moment you consider an EV to keeping it on the road — we connect you with the right people.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={p.to as "/marketplace"}
                search={p.search as never}
                className={`group relative block overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${p.hue} p-7 transition hover:border-electric/40 hover:-translate-y-1`}
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card border border-border">
                    <p.icon className="h-5 w-5 text-electric" strokeWidth={2.2} />
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${p.badge === "Live" ? "bg-eco/15 text-eco" : p.badge === "Beta" ? "bg-electric/15 text-electric" : "bg-secondary text-muted-foreground"}`}>
                    {p.badge}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs">
                  <span className="font-medium text-foreground">{p.stat}</span>
                  <ArrowUpRight className="h-4 w-4 text-electric transition group-hover:rotate-12" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
