import { AboutHero } from "../components/about/AboutHero";
import { AboutStory } from "../components/about/AboutStory";
import { AboutValues } from "../components/about/AboutValues";
import { AboutSeason } from "../components/about/AboutSeason";
import { AboutCTA } from "../components/about/AboutCTA";

export const About = () => {
  return (
    <main className="bg-[#030303] min-h-screen">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutSeason />
      <AboutCTA />
    </main>
  );
};
