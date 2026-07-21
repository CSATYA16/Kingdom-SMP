import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Coins, Store, Gem, Briefcase, AlertCircle } from 'lucide-react';

const economyFeatures = [
  { icon: <Store className="w-5 h-5" />, title: 'Player Shops', desc: 'Set up your own stores in the Market District to sell items.' },
  { icon: <Coins className="w-5 h-5" />, title: 'Direct Trading', desc: 'Securely trade items and currency with other players.' },
  { icon: <Gem className="w-5 h-5" />, title: 'Resource Value', desc: 'Economy driven entirely by player supply and demand.' },
  { icon: <Briefcase className="w-5 h-5" />, title: 'Services', desc: 'Hire players for building, resource gathering, or defense.' },
];

export const EconomyGuide = () => {
  return (
    <section id="economy" className="scroll-mt-32 mb-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mb-12">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-widest mb-4">
            Player <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400">Economy</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-2xl">
            Kingdom SMP features a fully player-driven economy. Everything from diamond trades to massive shop districts is built and managed by the community.
          </motion.p>
        </div>

        {/* Economy Alert */}
        <motion.div variants={fadeUp} className="mb-12 bg-accent-gold/10 border border-accent-gold/30 rounded-2xl p-6 flex items-start gap-4 backdrop-blur-sm">
          <AlertCircle className="w-6 h-6 text-accent-gold shrink-0 mt-0.5" />
          <div>
            <h4 className="text-white font-bold tracking-wider mb-1 uppercase">Economy Status</h4>
            <p className="text-accent-gold/80 text-sm">The full economy system, including secure trading and shop plugins, officially launches with Season I.</p>
          </div>
        </motion.div>

        {/* Economy Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {economyFeatures.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col items-start gap-4 group hover:border-accent-gold/30 hover:bg-white/5 transition-all duration-300"
            >
              <div className="p-3 bg-white/5 rounded-xl text-accent-gold group-hover:scale-110 group-hover:bg-accent-gold/10 transition-all duration-300">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-white font-bold tracking-wider mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
};
