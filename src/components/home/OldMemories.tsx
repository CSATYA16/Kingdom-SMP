
import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { TiltCard } from '../ui/TiltCard';
import { fadeUp, staggerContainer } from "../../utils/animations";

const memories = [
  {
    title: "Old Builds",
    url: "/media/memories/builds.png", // Image or mp4
  },
  {
    title: "Funny Moments",
    url: "/media/memories/funny.mp4",
  },
  {
    title: "Friends",
    url: "/media/memories/friends.png",
  },
  {
    title: "Experiments",
    url: "/media/memories/experiments.png",
  }
];

export const OldMemories = () => {
  return (
    <section className="py-24 relative z-10 bg-black/50 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeader
          eyebrow="Before Kingdom SMP"
          title="THE JOURNEY"
          gradientTitle="THAT STARTED IT ALL."
          description="A look back at the memories, builds, and friendships from previous worlds that led us here."
        />

        <motion.div 
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {memories.map((mem, index) => (
            <motion.div key={index} variants={fadeUp} className="h-64 sm:h-80 relative">
              <TiltCard 
                src={mem.url} 
                title={mem.title}
                className="w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center -z-10 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-gray-500 font-bold tracking-widest uppercase text-xs text-center px-4">Memory Placeholder<br/>{mem.url.split('/').pop()}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
