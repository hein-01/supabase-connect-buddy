import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { articles, type Article } from "@/data/mock";
import { Clock, ArrowLeft } from "lucide-react";
import { BackButton } from "@/components/BackButton";

export const Route = createFileRoute("/news_/$articleId")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.id === params.articleId);
    if (!article) throw notFound();
    const related = articles.filter((a) => a.id !== article.id).slice(0, 3);
    return { article, related };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    return {
      meta: a
        ? [
            { title: `${a.title} — EVCharge Myanmar` },
            { name: "description", content: a.excerpt },
            { property: "og:title", content: a.title },
            { property: "og:description", content: a.excerpt },
            { property: "og:type", content: "article" },
          ]
        : [{ title: "Article not found — EVCharge Myanmar" }],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-20 text-center">
        <h1 className="font-display text-4xl font-bold">Article not found</h1>
        <p className="mt-3 text-muted-foreground">It may have moved or been removed.</p>
        <Link to="/news" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-electric hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to news
        </Link>
      </main>
      <Footer />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-20 text-center">
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
      </main>
      <Footer />
    </div>
  ),
  component: ArticleDetail,
});

const defaultBody = (excerpt: string): string[] => [
  excerpt,
  "Myanmar's electric vehicle landscape is evolving fast. From new showrooms in Yangon to highway charging corridors connecting Mandalay and Naypyidaw, the ecosystem is finally catching up with regional neighbors.",
  "What this means for everyday drivers is simple: more choice, lower running costs, and a charging network that — while still maturing — already supports cross-country journeys with a little planning.",
  "We'll continue tracking developments and bringing you on-the-ground reporting from across the country. Have a tip? Reach out to our newsroom.",
];

function ArticleDetail() {
  const { article, related } = Route.useLoaderData();
  const body = article.body && article.body.length > 0 ? article.body : defaultBody(article.excerpt);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28">
        <article className="mx-auto max-w-3xl px-6">
          <BackButton to="/news" label="Back to news" />

          <div className="mt-4 flex items-center gap-3 text-xs">
            <span className="rounded-full bg-secondary px-3 py-1 font-semibold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-muted-foreground">{article.date}</span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" /> {article.readMin} min read
            </span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{article.excerpt}</p>

          <div className="mt-6 flex items-center gap-3 border-y border-border py-4">
            <div
              className="h-10 w-10 rounded-full"
              style={{ background: `linear-gradient(135deg, oklch(0.72 0.16 ${article.hue}), oklch(0.55 0.20 ${article.hue + 30}))` }}
            />
            <div className="text-sm">
              <div className="font-semibold">{article.author}</div>
              <div className="text-xs text-muted-foreground">EVCharge Myanmar</div>
            </div>
          </div>

          <div
            className="mt-8 aspect-[16/9] w-full rounded-2xl"
            style={{ background: `linear-gradient(135deg, oklch(0.72 0.16 ${article.hue}) 0%, oklch(0.55 0.20 ${article.hue + 30}) 100%)` }}
          />

          <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
            {body.map((p: string, i: number) => (
              <p key={i} className="mt-5 text-base leading-relaxed text-foreground/90">{p}</p>
            ))}
          </div>
        </article>

        <section className="mx-auto mt-20 max-w-7xl border-t border-border px-6 py-16">
          <h2 className="font-display text-2xl font-bold">Keep reading</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((a: Article) => (
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
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}