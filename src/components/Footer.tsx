import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-eco">
                <Zap className="h-4.5 w-4.5 text-electric-foreground" fill="currentColor" />
              </div>
              <span className="font-display text-base font-bold">EVCharge Myanmar</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Myanmar's independent hub for everything electric — chargers, cars, accessories, repair, insurance and the latest EV news.
            </p>
            <p className="mt-2 font-burmese text-xs text-muted-foreground">
              မြန်မာနိုင်ငံ၏ အီလက်ထရစ်ယာဉ် ဗဟိုစင်တာ
            </p>
          </div>
          <FooterCol title="Discover" items={[
            { to: "/stations", label: "Charging stations" },
            { to: "/news", label: "EV News" },
            { to: "/marketplace", label: "Marketplace" },
            { to: "/services", label: "Services & workshops" },
          ]} />
          <FooterCol title="For business" items={[
            { to: "/services", label: "List a workshop" },
            { to: "/marketplace", label: "Sell on EVCharge" },
            { to: "/stations", label: "Add a station" },
            { to: "/", label: "Advertise" },
          ]} />
          <FooterCol title="About" items={[
            { to: "/", label: "Our mission" },
            { to: "/", label: "Contact" },
            { to: "/", label: "Privacy" },
            { to: "/", label: "Terms" },
          ]} />
        </div>
        <div className="mt-12 border-t border-border pt-8 text-xs text-muted-foreground">
          © 2026 EVCharge Myanmar. Independent EV hub. Yangon · Mandalay · Naypyidaw.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { to: string; label: string }[] }) {
  return (
    <div>
      <div className="mb-4 text-xs font-semibold uppercase tracking-wider">{title}</div>
      <ul className="space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            <Link to={i.to as "/"} className="text-muted-foreground transition hover:text-electric">{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
