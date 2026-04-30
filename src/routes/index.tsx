import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { StationsPreview } from "@/components/StationsPreview";
import { Pillars } from "@/components/Pillars";
import { ArticlesGrid } from "@/components/ArticlesGrid";
import { JoinCTA } from "@/components/JoinCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EVCharge Myanmar — The independent EV hub" },
      { name: "description", content: "Find charging stations, browse EVs, discover workshops and stay informed about Myanmar's electric vehicle ecosystem." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Pillars />
        <StationsPreview />
        <ArticlesGrid />
        <JoinCTA />
      </main>
      <Footer />
    </div>
  );
}
