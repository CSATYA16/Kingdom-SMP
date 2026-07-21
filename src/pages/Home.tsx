import { Hero } from "../components/home/Hero";
import { CommunityStatus } from "../components/home/CommunityStatus";
import { CreatorSection } from "../components/home/CreatorSection";
import { StorySection } from "../components/home/StorySection";
import { GuardianSection } from "../components/home/GuardianSection";
import { LegacyMemories } from "../components/home/LegacyMemories";
import { KingdomTimeline } from "../components/home/KingdomTimeline";
import { Stats } from "../components/home/Stats";
import { CTA } from "../components/home/CTA";

export const Home = () => {
  return (
    <main>
      <Hero />
      <CommunityStatus />
      <CreatorSection />
      <StorySection />
      <GuardianSection />
      <LegacyMemories />
      <KingdomTimeline />
      <Stats />
      <CTA />
    </main>
  );
};
