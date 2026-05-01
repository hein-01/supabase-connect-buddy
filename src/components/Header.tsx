import { Link } from "@tanstack/react-router";
import { Zap, Menu } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/stations" as const, label: "Stations" },
  { to: "/news" as const, label: "News" },
  { to: "/marketplace" as const, label: "Marketplace" },
  { to: "/services" as const, label: "Services" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-electric to-eco opacity-30 blur-md" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-eco">
              <Zap className="h-4.5 w-4.5 text-electric-foreground" strokeWidth={2.6} fill="currentColor" />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-base font-bold tracking-tight">EVCharge</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Myanmar Hub</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-full px-4 py-2 text-sm bg-secondary text-foreground font-medium" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground">
            Sign in
          </button>
          <button className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90">
            List your business
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden rounded-lg p-2 hover:bg-secondary">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col p-4 gap-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-secondary">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
