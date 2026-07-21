import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Lock, MapPin, Building2, Landmark, Flame, Compass } from 'lucide-react';

const locationCards = [
  {
    id: 'spawn',
    title: 'Spawn Development',
    desc: 'The first gathering place of the community.',
    icon: <MapPin className="w-8 h-8" />
  },
  {
    id: 'kingdoms',
    title: 'Kingdom Lands',
    desc: 'Areas where players will create their communities.',
    icon: <Building2 className="w-8 h-8" />
  },
  {
    id: 'market',
    title: 'Market District',
    desc: 'A future center for trading and economy.',
    icon: <Landmark className="w-8 h-8" />
  },
  {
    id: 'nether',
    title: 'Nether Hub',
    desc: 'Connecting players across the world.',
    icon: <Flame className="w-8 h-8" />
  },
  {
    id: 'projects',
    title: 'Community Projects',
    desc: 'Large builds created together.',
    icon: <Compass className="w-8 h-8" />
  }
];

export const Locations = () => {
  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent-purple/20 to-transparent blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black tracking-widest text-white mb-4">
            FUTURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400">LOCATIONS</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="w-16 h-1 bg-accent-gold rounded-full shadow-[0_0_10px_rgba(255,183,3,0.5)] mb-6"></motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {locationCards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={fadeUp}
              className={`relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a] backdrop-blur-xl aspect-video md:aspect-[4/3] flex flex-col justify-end p-8 transform transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,183,3,0.1)] ${
                index === 3 || index === 4 ? 'lg:col-span-1' : ''
              } ${
                index === 4 && locationCards.length === 5 ? 'lg:col-start-2' : ''
              }`}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-accent-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              {/* Glowing border */}
              <div className="absolute inset-0 border-2 border-accent-gold/0 group-hover:border-accent-gold/30 rounded-2xl transition-colors duration-700 pointer-events-none shadow-[inset_0_0_20px_rgba(255,183,3,0)] group-hover:shadow-[inset_0_0_20px_rgba(255,183,3,0.15)]"></div>

              {/* Pattern Overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

              {/* Status Badge */}
              <div className="absolute top-6 right-6 z-20">
                <div className="bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                  <Lock className="w-3.5 h-3.5 text-gray-400 group-hover:text-accent-gold transition-colors duration-500" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-accent-gold transition-colors duration-500">Coming Soon</span>
                </div>
              </div>

              {/* Icon */}
              <div className="absolute top-8 left-8 text-white/20 group-hover:text-accent-gold/40 group-hover:scale-110 transition-all duration-500 transform origin-top-left">
                {card.icon}
              </div>

              {/* Content */}
              <div className="relative z-20">
                <h3 className="text-2xl font-heading font-black text-white drop-shadow-md mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-gold transition-all duration-300">
                  {card.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  {card.desc}
                </p>

                <div className="w-12 h-1 bg-accent-gold/50 mt-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-4 group-hover:translate-x-0 shadow-[0_0_10px_rgba(255,183,3,0.5)]"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
