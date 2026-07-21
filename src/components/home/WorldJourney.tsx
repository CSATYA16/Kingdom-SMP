
import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { fadeUp, staggerContainer } from "../../utils/animations";

const timeline = [
  {
    era: "Day 1",
    title: "World Created",
    description: "The very first blocks are placed as the community enters a brand new survival world."
  },
  {
    era: "First Base",
    title: "Survival Begins",
    description: "Players scatter across the map to establish their initial camps and secure basic resources."
  },
  {
    era: "Kingdom Era",
    title: "Players Build Together",
    description: "Factions form, massive collaborative builds emerge, and economies begin to take shape."
  },
  {
    era: "Future",
    title: "Community Expansion",
    description: "The world continues to evolve with server-wide events, new territories, and unforgettable memories."
  }
];

export const WorldJourney = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeader
          eyebrow="The Timeline"
          title="FROM FIRST BLOCK"
          gradientTitle="TO A LIVING WORLD."
        />

        <div className="mt-20 relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent-pink to-transparent md:-translate-x-1/2 opacity-30 rounded-full" />

          <motion.div 
            className="space-y-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index} 
                  variants={fadeUp}
                  className={`relative flex items-center justify-between md:justify-normal ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary md:-translate-x-1/2 shadow-[0_0_15px_rgba(157,78,221,0.8)] z-10 -translate-x-[6px]" />
                  
                  {/* Content Box */}
                  <div className={`w-[85%] md:w-[45%] ${isEven ? 'md:pl-12' : 'md:pr-12 md:text-right'} pl-8 md:pl-0`}>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors duration-300 group">
                      <div className="text-primary-light font-mono text-sm tracking-wider mb-2">{item.era}</div>
                      <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors">{item.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
