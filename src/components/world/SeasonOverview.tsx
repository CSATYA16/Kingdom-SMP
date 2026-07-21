import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Globe, Gamepad2, Pickaxe, Users } from 'lucide-react';

const overviewCards = [
  {
    id: 'status',
    title: 'WORLD STATUS',
    value: 'Opening Soon',
    icon: <Globe className="w-5 h-5 text-accent-gold" />
  },
  {
    id: 'version',
    title: 'VERSION',
    value: 'Minecraft Java 1.21+',
    icon: <Gamepad2 className="w-5 h-5 text-accent-purple" />
  },
  {
    id: 'style',
    title: 'STYLE',
    value: 'Survival Multiplayer',
    icon: <Pickaxe className="w-5 h-5 text-accent-gold" />
  },
  {
    id: 'focus',
    title: 'FOCUS',
    value: 'Community Projects',
    icon: <Users className="w-5 h-5 text-accent-purple" />
  }
];

export const SeasonOverview = () => {
  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-accent-purple/10 to-transparent blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-stretch">
          
          {/* Narrative Text Side */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1 flex flex-col justify-center text-center lg:text-left"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black tracking-widest text-white mb-8">
              THE BEGINNING OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400">SEASON I</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="w-16 h-1 bg-accent-gold/50 rounded-full shadow-[0_0_10px_rgba(255,183,3,0.5)] mb-8 mx-auto lg:mx-0"></motion.div>

            <motion.div variants={fadeUp} className="text-gray-400 text-lg md:text-xl leading-relaxed space-y-4">
              <p>No cities.</p>
              <p>No kingdoms.</p>
              <p>No history written yet.</p>
              <p className="pt-4 text-white font-medium">
                Only an untouched world waiting for players to create something unforgettable.
              </p>
            </motion.div>
          </motion.div>

          {/* Info Cards Side */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
          >
            {overviewCards.map((card) => (
              <motion.div
                key={card.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="relative group bg-white/[0.02] border border-white/10 rounded-2xl p-6 overflow-hidden hover:border-accent-gold/40 transition-colors duration-500 hover:shadow-[0_0_40px_rgba(255,183,3,0.1)] flex flex-col justify-between"
              >
                {/* Hover Inner Glow */}
                <div className="absolute inset-0 bg-accent-gold/0 group-hover:bg-accent-gold/[0.05] transition-colors duration-500 pointer-events-none"></div>
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                    {card.icon}
                  </div>
                  <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                    {card.title}
                  </h3>
                </div>

                <div className="relative z-10">
                  <span className="text-lg md:text-xl font-heading font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-gold transition-all duration-300">
                    {card.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
