import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, Key, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/marketplace/rent")({
  head: () => ({
    meta: [
      { title: "Rent EVs in Myanmar — Daily & weekly EV rentals" },
      { name: "description", content: "Rent electric cars by the day or week from verified providers in Yangon, Mandalay and beyond. Try before you buy." },
      { property: "og:title", content: "Rent EVs in Myanmar" },
      { property: "og:description", content: "Daily and weekly EV rentals from verified providers." },
    ],
  }),
  component: RentPage,
});

const rentals = [
  { name: "BYD Atto 3", perDay: 95_000, perWeek: 580_000, city: "Yangon", available: true, hue: 295 },
  { name: "Wuling Air EV", perDay: 55_000, perWeek: 320_000, city: "Yangon", available: true, hue: 155 },
  { name: "BYD Dolphin", perDay: 75_000, perWeek: 460_000, city: "Mandalay", available: false, hue: 240 },
  { name: "Tesla Model 3", perDay: 180_000, perWeek: 1_100_000, city: "Yangon", available: true, hue: 25 },
  { name: "MG ZS EV", perDay: 70_000, perWeek: 420_000, city: "Mandalay", available: true, hue: 195 },
  { name: "Neta V", perDay: 48_000, perWeek: 280_000, city: "Yangon", available: true, hue: 130 },
];

function RentPage() {
  const [period, setPeriod] = useState<"day" | "week">("day");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/marketplace" className="text-xs text-muted-foreground hover:text-foreground">← Marketplace</Link>

          <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold md:text-5xl">Rent EVs</h1>
              <p className="mt-2 max-w-lg text-muted-foreground">
                Try an EV before you buy, or grab one for a road trip. Verified rental partners across Myanmar.
              </p>
            </div>
            <div className="inline-flex rounded-full border border-border bg-card p-1">
              <button
                onClick={() => setPeriod("day")}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  period === "day" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Calendar className="h-3.5 w-3.5" /> Per day
              </button>
              <button
                onClick={() => setPeriod("week")}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  period === "week" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Calendar className="h-3.5 w-3.5" /> Per week
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-4 pb-20 sm:grid-cols-2 lg:grid-cols-3">
            {rentals.map((r) => {
              const price = period === "day" ? r.perDay : r.perWeek;
              return (
                <div
                  key={r.name}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-electric/40"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div
                    className="relative aspect-[4/3]"
                    style={{ background: `linear-gradient(135deg, oklch(0.78 0.13 ${r.hue}) 0%, oklch(0.55 0.18 ${r.hue + 30}) 100%)` }}
                  >
                    <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold backdrop-blur">{r.city}</span>
                    <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase backdrop-blur ${r.available ? "bg-eco/80 text-background" : "bg-ruby/80 text-background"}`}>
                      {r.available ? "Available" : "Booked"}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Key className="h-3.5 w-3.5" /> EV rental
                    </div>
                    <div className="mt-1 font-semibold">{r.name}</div>
                    <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
                      <div className="font-display text-lg font-bold">
                        {price.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">MMK / {period}</span>
                      </div>
                    </div>
                    <button
                      disabled={!r.available}
                      className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-3 py-2 text-xs font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {r.available ? "Reserve" : "Unavailable"} <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
