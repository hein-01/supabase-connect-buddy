import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { articles } from "@/data/mock";
import { Clock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "EV News & Guides — EVCharge Myanmar" },
      { name: "description", content: "The latest news, reviews, policy updates and guides about electric vehicles in Myanmar." },
      { property: "og:title", content: "EV News & Guides — EVCharge Myanmar" },
      { property: "og:description", content: "The latest news about electric vehicles in Myanmar." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? articles : articles.filter((a) => a.category === cat);
  const [feature, ...rest] = list;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Home</Link>
          <div className="mt-2 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="font-display text-4xl font-bold md:text-5xl">EV News & Guides</h1>
              <p className="mt-2 text-muted-foreground">News, reviews and explainers from Myanmar's EV community.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    cat === c ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {feature && (
            <Link
              to="/news/$articleId"
              params={{ articleId: feature.id }}
              className="mt-10 grid gap-8 overflow-hidden rounded-3xl border border-border bg-card transition hover:border-electric/40 md:grid-cols-2"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="aspect-[16/12] md:aspect-auto"
                style={{ background: `linear-gradient(135deg, oklch(0.72 0.16 ${feature.hue}) 0%, oklch(0.55 0.20 ${feature.hue + 30}) 100%)` }}
              />
              <div className="flex flex-col justify-center p-8">
                <span className="self-start rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                  {feature.category}
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">{feature.title}</h2>
                <p className="mt-4 text-muted-foreground">{feature.excerpt}</p>
                <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{feature.author}</span>
                  <span>·</span>
                  <span>{feature.date}</span>
                  <span className="ml-auto inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {feature.readMin} min</span>
                </div>
              </div>
            </Link>
          )}

          <div className="mt-12 grid gap-6 pb-20 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <Link
                key={a.id}
                to="/news/$articleId"
                params={{ articleId: a.id }}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-electric/40"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div
                  className="aspect-[16/9]"
                  style={{ background: `linear-gradient(135deg, oklch(0.75 0.15 ${a.hue}) 0%, oklch(0.55 0.18 ${a.hue + 30}) 100%)` }}
                />
                <div className="p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{a.category}</span>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug transition group-hover:text-electric">{a.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{a.date}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {a.readMin} min</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
