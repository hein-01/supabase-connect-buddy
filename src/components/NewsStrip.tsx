import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { articles } from "@/data/mock";

export function NewsStrip() {
  const [feature, ...rest] = articles.slice(0, 4);
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-eco">— EV News</div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">What's happening in EV Myanmar</h2>
          </div>
          <Link to="/news" className="hidden items-center gap-1 text-sm font-semibold text-electric hover:underline md:inline-flex">
            All articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          {/* Featured article */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div
              className="aspect-[16/10] w-full"
              style={{ background: `linear-gradient(135deg, oklch(0.72 0.16 ${feature.hue}) 0%, oklch(0.55 0.20 ${feature.hue + 30}) 100%)` }}
            >
              <div className="flex h-full items-end p-8">
                <span className="rounded-full bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
                  {feature.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-bold leading-tight transition group-hover:text-electric">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{feature.excerpt}</p>
              <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{feature.author}</span>
                <span>·</span>
                <span>{feature.date}</span>
                <span className="ml-auto inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {feature.readMin} min read</span>
              </div>
            </div>
          </motion.article>

          {/* Side list */}
          <div className="space-y-4">
            {rest.map((a, i) => (
              <motion.article
                key={a.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-electric/40"
              >
                <div
                  className="h-20 w-20 shrink-0 rounded-xl"
                  style={{ background: `linear-gradient(135deg, oklch(0.75 0.15 ${a.hue}) 0%, oklch(0.55 0.18 ${a.hue + 30}) 100%)` }}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{a.category}</div>
                  <h4 className="mt-1 line-clamp-2 font-semibold leading-snug transition group-hover:text-electric">
                    {a.title}
                  </h4>
                  <div className="mt-2 text-xs text-muted-foreground">{a.date} · {a.readMin} min</div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
