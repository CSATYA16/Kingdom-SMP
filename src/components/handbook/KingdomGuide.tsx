import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Users, Map, Castle, TrendingUp, Shield, Crown } from 'lucide-react';

const steps = [
  { icon: <Users className="w-5 h-5" />, title: 'Find Members', desc: 'Gather a dedicated group of players.' },
  { icon: <Map className="w-5 h-5" />, title: 'Choose Land', desc: 'Find a suitable location for your kingdom.' },
  { icon: <Castle className="w-5 h-5" />, title: 'Build Together', desc: 'Create your capital and infrastructure.' },
  { icon: <TrendingUp className="w-5 h-5" />, title: 'Grow Over Time', desc: 'Expand your influence and economy.' },
];

export const KingdomGuide = () => {
  return (
    <section id="kingdoms" className="scroll-mt-32 mb-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mb-12">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-widest mb-4">
            Creating a <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-gold">Kingdom</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-2xl">
            Kingdoms are the heart of the SMP. They represent communities working together to achieve massive goals.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 group hover:border-accent-gold/30 hover:bg-white/5 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-accent-gold mb-4 group-hover:scale-110 group-hover:bg-accent-gold/10 transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="text-white font-bold tracking-wider mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Requirements */}
        <motion.div variants={fadeUp} className="bg-gradient-to-br from-[#030303] to-[#0a0a0a] border border-white/10 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
          
          <h3 className="text-2xl font-heading font-black text-white uppercase tracking-widest mb-6 relative z-10 flex items-center gap-3">
            <Crown className="w-6 h-6 text-accent-gold" />
            Kingdom Requirements
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="bg-[#030303] border border-white/10 rounded-xl p-5 flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-lg text-gray-400">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Minimum Members</div>
                <div className="text-accent-gold font-bold">Coming Soon</div>
              </div>
            </div>
            
            <div className="bg-[#030303] border border-white/10 rounded-xl p-5 flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-lg text-gray-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Claim System</div>
                <div className="text-accent-gold font-bold">Coming Soon</div>
              </div>
            </div>
          </div>
          
        </motion.div>

      </motion.div>
    </section>
  );
};
