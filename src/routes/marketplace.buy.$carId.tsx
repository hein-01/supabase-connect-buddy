import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  BadgeCheck,
  Battery,
  Calendar,
  Car,
  Check,
  Gauge,
  MapPin,
  Phone,
  Shield,
  Star,
  Timer,
  Zap,
  Heart,
  Share2,
  MessageCircle,
} from "lucide-react";
import { carListings } from "@/data/cars";
import { BackButton } from "@/components/BackButton";

export const Route = createFileRoute("/marketplace/buy/$carId")({
  loader: ({ params }) => {
    const car = carListings.find((c) => c.id === params.carId);
    if (!car) throw notFound();
    return car;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} (${loaderData.year}) — ${loaderData.price.toLocaleString()} MMK | EVCharge` },
          {
            name: "description",
            content: `${loaderData.condition} ${loaderData.name} in ${loaderData.city}. ${loaderData.rangeKm} km range, ${loaderData.battery}. Listed by ${loaderData.seller.name}.`,
          },
          { property: "og:title", content: `${loaderData.name} — ${loaderData.price.toLocaleString()} MMK` },
          { property: "og:description", content: loaderData.description },
        ]
      : [{ title: "EV Listing" }],
  }),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center text-center p-8">
      <div>
        <p className="font-display text-2xl">Something went wrong</p>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <Link to="/marketplace/buy" className="mt-6 inline-block underline">Back to listings</Link>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-center p-8">
      <div>
        <p className="font-display text-3xl">Listing not found</p>
        <p className="mt-2 text-sm text-muted-foreground">This vehicle may have been sold or removed.</p>
        <Link to="/marketplace/buy" className="mt-6 inline-block rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background">
          Browse all EVs
        </Link>
      </div>
    </div>
  ),
  component: CarDetailPage,
});

function CarDetailPage() {
  const car = Route.useLoaderData();
  const monthly = Math.round((car.price * 0.7) / 36 / 1000) * 1000; // 30% down, 36 months, 0% APR illustrative

  const similar = carListings.filter((c) => c.id !== car.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <BackButton to="/marketplace/buy" label="Back to listings" mobileOnly className="mb-4" />

          {/* Breadcrumb */}
          <nav className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/marketplace" className="hover:text-foreground">Marketplace</Link>
            <span>/</span>
            <Link to="/marketplace/buy" className="hover:text-foreground">Buy</Link>
            <span>/</span>
            <span className="text-foreground">{car.name}</span>
          </nav>

          {/* Header row */}
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${car.condition === "Brand new" ? "bg-eco/15 text-eco" : "bg-electric/15 text-electric"}`}>
                  {car.condition}
                </span>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase">{car.bodyType}</span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {car.city}
                </span>
              </div>
              <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{car.name}</h1>
              <p className="mt-1 text-muted-foreground">{car.year} · {car.mileageKm.toLocaleString()} km on the clock</p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition hover:border-electric/40" aria-label="Save">
                <Heart className="h-4 w-4" />
              </button>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition hover:border-electric/40" aria-label="Share">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left: gallery + content */}
            <div>
              {/* Gallery */}
              <div
                className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border"
                style={{
                  background: `linear-gradient(135deg, oklch(0.78 0.13 ${car.hue}) 0%, oklch(0.55 0.18 ${car.hue + 30}) 100%)`,
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Car className="h-32 w-32 text-background/30" strokeWidth={1} />
                </div>
                <div className="absolute bottom-4 left-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                  Photo 1 / 8
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-xl border border-border opacity-80 transition hover:opacity-100"
                    style={{
                      background: `linear-gradient(${135 + i * 30}deg, oklch(0.78 0.13 ${car.hue + i * 15}) 0%, oklch(0.55 0.18 ${car.hue + 30 + i * 10}) 100%)`,
                    }}
                  />
                ))}
              </div>

              {/* Quick stats */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat icon={Battery} label="Range" value={`${car.rangeKm} km`} />
                <Stat icon={Zap} label="DC Fast" value={`${car.charging.dcKw} kW`} />
                <Stat icon={Gauge} label="0–100" value={car.acceleration === "—" ? "—" : car.acceleration.split(" ")[0]} />
                <Stat icon={Timer} label="10–80%" value={`${car.charging.tenToEightyMin} min`} />
              </div>

              {/* Description */}
              <section className="mt-10">
                <h2 className="font-display text-2xl font-bold">About this car</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{car.description}</p>
              </section>

              {/* Specs */}
              <section className="mt-10">
                <h2 className="font-display text-2xl font-bold">Specifications</h2>
                <div className="mt-4 overflow-hidden rounded-2xl border border-border">
                  <SpecRow label="Brand" value={car.brand} />
                  <SpecRow label="Body type" value={car.bodyType} />
                  <SpecRow label="Year" value={String(car.year)} />
                  <SpecRow label="Mileage" value={`${car.mileageKm.toLocaleString()} km`} />
                  <SpecRow label="Battery" value={car.battery} />
                  <SpecRow label="Motor" value={car.motor} />
                  <SpecRow label="Drivetrain" value={car.drivetrain} />
                  <SpecRow label="Top speed" value={`${car.topSpeedKmh} km/h`} />
                  <SpecRow label="Acceleration" value={car.acceleration} />
                  <SpecRow label="Range (WLTP)" value={`${car.rangeKm} km`} />
                  <SpecRow label="AC charging" value={`${car.charging.acKw} kW`} />
                  <SpecRow label="DC fast charging" value={`${car.charging.dcKw} kW`} />
                  <SpecRow label="Seats" value={String(car.seats)} />
                  <SpecRow label="Warranty" value={car.warranty} last />
                </div>
              </section>

              {/* Features */}
              <section className="mt-10">
                <h2 className="font-display text-2xl font-bold">Features & equipment</h2>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {car.features.map((f: string) => (
                    <div key={f} className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-eco" /> {f}
                    </div>
                  ))}
                </div>
              </section>

              {/* Trust */}
              <section className="mt-10 rounded-2xl border border-border bg-gradient-to-br from-eco/5 via-card to-electric/5 p-6">
                <h2 className="font-display text-xl font-bold">Buy with confidence</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <Trust icon={BadgeCheck} title="Verified seller" body="ID and ownership documents checked by EVCharge." />
                  <Trust icon={Shield} title="Battery health report" body="Independent battery state-of-health test included." />
                  <Trust icon={Calendar} title="7-day money back" body="If something's not right, return within 7 days." />
                </div>
              </section>
            </div>

            {/* Right: sticky sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Asking price</div>
                <div className="mt-1 font-display text-3xl font-bold">
                  {car.price.toLocaleString()} <span className="text-base font-normal text-muted-foreground">MMK</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  ~ {monthly.toLocaleString()} MMK / month · 30% down · 36 mo
                </div>

                <div className="mt-5 grid gap-2">
                  <a
                    href={`tel:${car.seller.phone.replace(/\s/g, "")}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90"
                  >
                    <Phone className="h-4 w-4" /> Call seller
                  </a>
                  <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold transition hover:border-electric/40">
                    <MessageCircle className="h-4 w-4" /> Message
                  </button>
                  <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-electric/10 px-5 text-sm font-semibold text-electric transition hover:bg-electric/20">
                    Book a test drive <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-6 border-t border-border pt-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-background"
                      style={{ background: `linear-gradient(135deg, oklch(0.65 0.15 ${car.hue}) 0%, oklch(0.5 0.18 ${car.hue + 40}) 100%)` }}
                    >
                      {car.seller.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate font-semibold">{car.seller.name}</span>
                        {car.seller.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-electric" />}
                      </div>
                      <div className="text-xs text-muted-foreground">{car.seller.type} · {car.seller.listings} listing{car.seller.listings !== 1 ? "s" : ""}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-electric text-electric" />
                      <span className="font-semibold">{car.seller.rating}</span>
                      <span className="text-muted-foreground">rating</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {car.seller.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-dashed border-border p-4 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Safety tip:</span> always meet sellers at a public charging station and verify documents before payment. EVCharge offers free escrow for transactions over 50M MMK.
              </div>
            </aside>
          </div>

          {/* Similar */}
          <section className="mt-20">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="font-display text-2xl font-bold">Similar EVs you might like</h2>
              <Link to="/marketplace/buy" className="text-sm font-semibold text-electric hover:underline">View all →</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((c) => (
                <Link
                  key={c.id}
                  to="/marketplace/buy/$carId"
                  params={{ carId: c.id }}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-electric/40"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div
                    className="relative aspect-[4/3]"
                    style={{ background: `linear-gradient(135deg, oklch(0.78 0.13 ${c.hue}) 0%, oklch(0.55 0.18 ${c.hue + 30}) 100%)` }}
                  >
                    <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold backdrop-blur">{c.year}</span>
                    <span className="absolute right-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold backdrop-blur">{c.city}</span>
                  </div>
                  <div className="p-4">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.rangeKm} km range</div>
                    <div className="mt-3 font-display text-base font-bold">
                      {c.price.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">MMK</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Battery; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <Icon className="h-4 w-4 text-electric" />
      <div className="mt-2 font-display text-lg font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function SpecRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 px-4 py-3 text-sm ${last ? "" : "border-b border-border"}`}>
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function Trust({ icon: Icon, title, body }: { icon: typeof Shield; title: string; body: string }) {
  return (
    <div>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-eco/10">
        <Icon className="h-4 w-4 text-eco" />
      </div>
      <div className="mt-3 font-semibold">{title}</div>
      <div className="mt-1 text-xs text-muted-foreground">{body}</div>
    </div>
  );
}
