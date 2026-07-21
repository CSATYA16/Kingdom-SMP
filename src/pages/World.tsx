import { WorldHero } from "../components/world/WorldHero";
import { SeasonOverview } from "../components/world/SeasonOverview";
import { WorldSettings } from "../components/world/WorldSettings";
import { WorldMap } from "../components/world/WorldMap";
import { Locations } from "../components/world/Locations";
import { WorldProgress } from "../components/world/WorldProgress";
import { WorldGalleryPreview } from "../components/world/WorldGalleryPreview";
import { WorldCTA } from "../components/world/WorldCTA";

export const World = () => {
  return (
    <main className="bg-[#030303] min-h-screen">
      <WorldHero />
      <SeasonOverview />
      <WorldSettings />
      <WorldMap />
      <Locations />
      <WorldProgress />
      <WorldGalleryPreview />
      <WorldCTA />
    </main>
  );
};
