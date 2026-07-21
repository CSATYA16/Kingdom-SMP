import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { TiltCard } from '../ui/TiltCard';
import { fadeUp, slideInRight, staggerContainer } from '../../utils/animations';
import { socialsConfig } from '../../config/socials';
import { creatorConfig } from '../../config/creator';
import { MessageSquare as Discord, Camera as InstagramIcon, Video as YoutubeIcon } from "lucide-react";

export const CreatorSection = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeader
          title="THE CREATOR"
          gradientTitle="BEHIND KINGDOM SMP"
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Left */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <h3 className="text-4xl md:text-5xl font-heading font-black text-white">
                {creatorConfig.founder.name}
              </h3>
              <p className="text-xl text-primary-light font-medium mt-2">
                {creatorConfig.founder.role}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed">
                {creatorConfig.founder.description}
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mt-4">
                This is not just a server launch — it's the beginning of a new story created by its players.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-1">Started</div>
                <div className="text-white font-bold">2026</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-1">World</div>
                <div className="text-white font-bold">Season 1</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-1">Focus</div>
                <div className="text-white font-bold text-sm">Community Survival</div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-4 mt-6">
              <a href={socialsConfig.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                <YoutubeIcon size={20} />
              </a>
              <a href={socialsConfig.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                <InstagramIcon size={20} />
              </a>
              <a href={socialsConfig.discord} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                <Discord size={20} />
              </a>
            </motion.div>
          </motion.div>

          {/* Image Right */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="relative"
          >
            {/* Glow backdrop */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            
            <TiltCard 
              src={creatorConfig.founder.imagePath} 
              className="h-[500px] md:h-[600px] rounded-3xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
