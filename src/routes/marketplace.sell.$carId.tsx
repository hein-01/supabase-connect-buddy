import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  Car,
  Edit3,
  Eye,
  Heart,
  MessageCircle,
  Pause,
  Play,
  Rocket,
  Share2,
  Sparkles,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { carListings, type CarListing } from "@/data/cars";
import { sellerListings, type SellerListing, type SellerListingStatus } from "@/data/sellerListings";

export const Route = createFileRoute("/marketplace/sell/$carId")({
  loader: ({ params }): { car: CarListing; listing: SellerListing } => {
    const car = carListings.find((c) => c.id === params.carId);
    const listing = sellerListings.find((l) => l.carId === params.carId);
    if (!car || !listing) throw notFound();
    return { car, listing };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Manage listing — ${loaderData.car.name} | EVCharge Seller` },
          { name: "description", content: `Seller dashboard for your ${loaderData.car.name} listing. Views, inquiries, performance & promotion tools.` },
        ]
      : [{ title: "Seller listing" }],
  }),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center text-center p-8">
      <div>
        <p className="font-display text-2xl">Something went wrong</p>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <Link to="/marketplace/sell" className="mt-6 inline-block underline">Back to seller hub</Link>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-center p-8">
      <div>
        <p className="font-display text-3xl">Listing not found</p>
        <p className="mt-2 text-sm text-muted-foreground">This listing may have been removed.</p>
        <Link to="/marketplace/sell" className="mt-6 inline-block rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background">
          Back to seller hub
        </Link>
      </div>
    </div>
  ),
  component: SellerDetailPage,
});

const STATUS_META: Record<SellerListingStatus, { label: string; cls: string }> = {
  active: { label: "Active", cls: "bg-eco/15 text-eco" },
  paused: { label: "Paused", cls: "bg-secondary text-muted-foreground" },
  pending_review: { label: "Pending review", cls: "bg-electric/15 text-electric" },
  sold: { label: "Sold", cls: "bg-foreground text-background" },
};

function SellerDetailPage() {
  const data = Route.useLoaderData() as { car: CarListing; listing: SellerListing };
  const { car, listing } = data;
  const status = STATUS_META[listing.status];

  const priceDelta = car.price - listing.marketAvgPrice;
  const pricePct = (priceDelta / listing.marketAvgPrice) * 100;
  const priceVerdict =
    Math.abs(pricePct) < 3
      ? { label: "On market", tone: "text-eco" }
      : pricePct > 0
        ? { label: `${pricePct.toFixed(1)}% above market`, tone: "text-ruby" }
        : { label: `${Math.abs(pricePct).toFixed(1)}% below market`, tone: "text-eco" };

  const conversionRate = listing.views > 0 ? ((listing.inquiries / listing.views) * 100).toFixed(1) : "0";
  const trendMax = Math.max(...listing.viewsTrend, 1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/marketplace" className="hover:text-foreground">Marketplace</Link>
            <span>/</span>
            <Link to="/marketplace/sell" className="hover:text-foreground">Sell</Link>
            <span>/</span>
            <span className="text-foreground">{car.name}</span>
          </nav>

          {/* Header */}
          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className="hidden h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border md:flex"
                style={{ background: `linear-gradient(135deg, oklch(0.78 0.13 ${car.hue}) 0%, oklch(0.55 0.18 ${car.hue + 30}) 100%)` }}
              >
                <Car className="h-8 w-8 text-background/40" strokeWidth={1.2} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${status.cls}`}>{status.label}</span>
                  {listing.promoted && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-electric/15 px-2.5 py-1 text-[10px] font-semibold uppercase text-electric">
                      <Sparkles className="h-3 w-3" /> Promoted
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">Listed {listing.listedDaysAgo} day{listing.listedDaysAgo !== 1 ? "s" : ""} ago</span>
                </div>
                <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">{car.name}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {car.year} · {car.city} · {car.price.toLocaleString()} MMK
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to="/marketplace/buy/$carId"
                params={{ carId: car.id }}
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card px-4 text-xs font-semibold transition hover:border-electric/40"
              >
                <Eye className="h-3.5 w-3.5" /> View public page
              </Link>
              <button className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card px-4 text-xs font-semibold transition hover:border-electric/40">
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
              <button className="inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-4 text-xs font-semibold text-background transition hover:opacity-90">
                <Edit3 className="h-3.5 w-3.5" /> Edit listing
              </button>
            </div>
          </div>

          {/* Stat tiles */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard icon={Eye} label="Total views" value={listing.views.toLocaleString()} delta="+12% wk" up />
            <StatCard icon={Heart} label="Saves" value={listing.saves.toLocaleString()} delta="+5% wk" up />
            <StatCard icon={MessageCircle} label="Inquiries" value={listing.inquiries.toLocaleString()} delta={`${conversionRate}% conv.`} />
            <StatCard icon={Calendar} label="Test drives" value={String(listing.testDrives)} delta="booked" />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* Left column */}
            <div className="space-y-6">
              {/* Views chart */}
              <section className="rounded-3xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="font-display text-lg font-bold">Views — last 7 days</h2>
                    <p className="text-xs text-muted-foreground">Daily unique visitors to your listing</p>
                  </div>
                  <div className="inline-flex items-center gap-1 rounded-full bg-eco/10 px-2.5 py-1 text-[11px] font-semibold text-eco">
                    <TrendingUp className="h-3 w-3" /> Trending up
                  </div>
                </div>
                <div className="mt-6 flex h-40 items-end gap-2">
                  {listing.viewsTrend.map((v, i) => {
                    const h = (v / trendMax) * 100;
                    return (
                      <div key={i} className="group flex flex-1 flex-col items-center gap-1.5">
                        <div className="text-[10px] font-semibold opacity-0 transition group-hover:opacity-100">{v}</div>
                        <div
                          className="w-full rounded-t-md bg-gradient-to-t from-electric/40 to-electric transition group-hover:from-electric/60"
                          style={{ height: `${Math.max(h, 4)}%` }}
                        />
                        <div className="text-[10px] text-muted-foreground">D{i + 1}</div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Pricing insight */}
              <section className="rounded-3xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                <h2 className="font-display text-lg font-bold">Pricing insight</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border p-4">
                    <div className="text-xs text-muted-foreground">Your price</div>
                    <div className="mt-1 font-display text-xl font-bold">{(car.price / 1_000_000).toFixed(1)}M</div>
                    <div className="text-[10px] text-muted-foreground">MMK</div>
                  </div>
                  <div className="rounded-2xl border border-border p-4">
                    <div className="text-xs text-muted-foreground">Market average</div>
                    <div className="mt-1 font-display text-xl font-bold">{(listing.marketAvgPrice / 1_000_000).toFixed(1)}M</div>
                    <div className="text-[10px] text-muted-foreground">based on similar listings</div>
                  </div>
                  <div className="rounded-2xl border border-border p-4">
                    <div className="text-xs text-muted-foreground">Verdict</div>
                    <div className={`mt-1 inline-flex items-center gap-1 font-semibold ${priceVerdict.tone}`}>
                      {pricePct > 0 ? <ArrowUpRight className="h-4 w-4" /> : pricePct < 0 ? <ArrowDownRight className="h-4 w-4" /> : null}
                      {priceVerdict.label}
                    </div>
                    <div className="mt-1 text-[10px] text-muted-foreground">
                      {Math.abs(priceDelta).toLocaleString()} MMK {priceDelta >= 0 ? "above" : "below"}
                    </div>
                  </div>
                </div>
              </section>

              {/* Inquiries */}
              <section className="rounded-3xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-end justify-between">
                  <h2 className="font-display text-lg font-bold">Recent inquiries</h2>
                  <span className="text-xs text-muted-foreground">{listing.recentInquiries.length} unread</span>
                </div>
                <div className="mt-4 divide-y divide-border">
                  {listing.recentInquiries.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                      No inquiries yet — try promoting your listing to get more visibility.
                    </div>
                  ) : (
                    listing.recentInquiries.map((q, i) => (
                      <div key={i} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-background"
                          style={{ background: `linear-gradient(135deg, oklch(0.65 0.15 ${(i * 60) + 120}) 0%, oklch(0.5 0.18 ${(i * 60) + 160}) 100%)` }}
                        >
                          {q.name.split(" ").pop()?.charAt(0) ?? "?"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 text-sm">
                            <span className="font-semibold">{q.name}</span>
                            {q.verified && <BadgeCheck className="h-3.5 w-3.5 text-electric" />}
                            <span className="ml-auto text-[11px] text-muted-foreground">{q.hoursAgo}h ago</span>
                          </div>
                          <p className="mt-0.5 text-sm text-muted-foreground">{q.message}</p>
                          <div className="mt-2 flex gap-2">
                            <button className="rounded-full bg-foreground px-3 py-1 text-[11px] font-semibold text-background">Reply</button>
                            <button className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold">Mark as spam</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>

            {/* Right sidebar: actions */}
            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-electric/30 bg-gradient-to-br from-electric/10 via-card to-eco/10 p-6">
                <Sparkles className="h-5 w-5 text-electric" />
                <div className="mt-2 font-display text-lg font-bold">
                  {listing.promoted ? "Currently promoted" : "Boost this listing"}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {listing.promoted
                    ? "Your listing appears at the top of search results and gets up to 5× more views."
                    : "Get up to 5× more views by promoting to the top of search results. From 25,000 MMK / week."}
                </p>
                <button className="mt-4 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-4 text-xs font-semibold text-background transition hover:opacity-90">
                  <Rocket className="h-3.5 w-3.5" /> {listing.promoted ? "Manage promotion" : "Promote listing"}
                </button>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="font-display text-base font-bold">Listing actions</h3>
                <div className="mt-4 grid gap-2">
                  {listing.status === "paused" ? (
                    <ActionBtn icon={Play}>Reactivate listing</ActionBtn>
                  ) : (
                    <ActionBtn icon={Pause}>Pause listing</ActionBtn>
                  )}
                  <ActionBtn icon={BadgeCheck}>Mark as sold</ActionBtn>
                  <ActionBtn icon={Edit3}>Edit details</ActionBtn>
                  <ActionBtn icon={Trash2} danger>Delete listing</ActionBtn>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-border p-4 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Tip:</span> listings with 8+ photos and a video get 3× more inquiries on average.
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  up,
}: {
  icon: typeof Eye;
  label: string;
  value: string;
  delta?: string;
  up?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-electric" />
        {delta && (
          <span className={`text-[10px] font-semibold ${up ? "text-eco" : "text-muted-foreground"}`}>{delta}</span>
        )}
      </div>
      <div className="mt-3 font-display text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function ActionBtn({
  icon: Icon,
  children,
  danger,
}: {
  icon: typeof Pause;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      className={`inline-flex h-10 w-full items-center gap-2 rounded-xl border px-3 text-xs font-semibold transition ${
        danger
          ? "border-ruby/30 text-ruby hover:bg-ruby/10"
          : "border-border bg-background hover:border-electric/40"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </button>
  );
}
