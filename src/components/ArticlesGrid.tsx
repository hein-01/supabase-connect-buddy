import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { articles } from "@/data/mock";

export function ArticlesGrid() {
  // Show articles after the first 4 already featured in NewsStrip
  const items = articles.slice(4);
  if (items.length === 0) return null;

  return (
    <section className="border-t border-border bg-muted/20 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-eco">
              — More Articles
            </div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              In-depth reads from the EV community
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Reviews, guides, road trips and policy explainers — written for Myanmar drivers.
            </p>
          </div>
          <Link
            to="/news"
            className="hidden items-center gap-1 text-sm font-semibold text-electric hover:underline md:inline-flex"
          >
            Browse all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to="/news/$articleId"
                params={{ articleId: a.id }}
                className="group block overflow-hidden rounded-2xl border border-border bg-card transition hover:border-electric/40"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
              <div
                className="aspect-[16/9] w-full"
                style={{
                  background: `linear-gradient(135deg, oklch(0.72 0.16 ${a.hue}) 0%, oklch(0.55 0.20 ${a.hue + 30}) 100%)`,
                }}
              >
                <div className="flex h-full items-end p-5">
                  <span className="rounded-full bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
                    {a.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold leading-tight transition group-hover:text-electric">
                  {a.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {a.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{a.author}</span>
                  <span>·</span>
                  <span>{a.date}</span>
                  <span className="ml-auto inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {a.readMin} min
                  </span>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link
            to="/news"
            className="inline-flex items-center gap-1 text-sm font-semibold text-electric hover:underline"
          >
            Browse all articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
