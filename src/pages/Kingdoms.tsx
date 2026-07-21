import { KingdomHero } from "../components/kingdoms/KingdomHero";
import { KingdomShowcase } from "../components/kingdoms/KingdomShowcase";
import { KingdomCreation } from "../components/kingdoms/KingdomCreation";
import { KingdomCTA } from "../components/kingdoms/KingdomCTA";
import { HallOfKingdoms } from "../components/kingdoms/HallOfKingdoms";

export const Kingdoms = () => {
  return (
    <main className="bg-[#030303] min-h-screen">
      <KingdomHero />
      <KingdomCreation />
      <KingdomShowcase />
      <HallOfKingdoms />
      <KingdomCTA />
    </main>
  );
};
