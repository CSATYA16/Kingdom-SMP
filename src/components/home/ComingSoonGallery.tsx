
import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { fadeUp } from "../../utils/animations";
import { TiltCard } from '../ui/TiltCard';

const areas = [
  {
    title: "Spawn Development",
    url: "/media/world/spawn.png", // User will add these files
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
  },
  {
    title: "First Community Builds",
    url: "/media/world/community.png",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    title: "Kingdom Formation",
    url: "/media/world/kingdom.png",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    title: "Player Projects",
    url: "/media/world/projects.png",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
  }
];

export const ComingSoonGallery = () => {
  return (
    <section className="py-24 relative z-10 bg-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeader
          eyebrow="The World Awaits"
          title="THE JOURNEY"
          gradientTitle="BEGINS."
          description="A fresh world waiting to be shaped by its players. Coming soon areas as we build."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          {areas.map((area, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              transition={{ delay: index * 0.1 }}
              className={`relative group h-full ${area.colSpan} ${area.rowSpan}`}
            >
              <TiltCard 
                src={area.url}
                title={area.title}
                className="w-full h-full"
              />
              {/* Fallback Coming Soon text if image fails to load/is missing - using CSS peer or just layered */}
              <div className="absolute inset-0 flex items-center justify-center -z-10 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-gray-500 font-bold tracking-widest uppercase text-sm">Coming Soon</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
