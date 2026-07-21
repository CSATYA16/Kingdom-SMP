import { GalleryHero } from "../components/gallery/GalleryHero";
import { FeaturedMemory } from "../components/gallery/FeaturedMemory";
import { GalleryContainer } from "../components/gallery/GalleryContainer";
import { UploadReady } from "../components/gallery/UploadReady";
import { GalleryCTA } from "../components/gallery/GalleryCTA";

export const Gallery = () => {
  return (
    <main className="bg-[#030303] min-h-screen">
      <GalleryHero />
      <FeaturedMemory />
      <GalleryContainer />
      <UploadReady />
      <GalleryCTA />
    </main>
  );
};
