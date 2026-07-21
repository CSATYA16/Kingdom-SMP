import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Server, Zap, Globe, Clock } from 'lucide-react';

const stats = [
  { label: 'World Status', value: 'Opening Soon', icon: <Globe className="w-5 h-5" /> },
  { label: 'Version', value: 'Java 1.21.x', icon: <Server className="w-5 h-5" /> },
  { label: 'Style', value: 'Community Survival', icon: <Zap className="w-5 h-5" /> },
  { label: 'Era', value: 'Season I', icon: <Clock className="w-5 h-5" /> },
];

export const AboutSeason = () => {
  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden flex justify-center">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-gold/20 via-transparent to-transparent blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative group perspective-1000"
        >
          {/* Main Cinematic Wide Card */}
          <div className="relative bg-[#0a0a0a]/90 backdrop-blur-2xl border border-accent-gold/20 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-8 md:p-16">
            
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"></div>
            <div className="absolute inset-0 border-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-accent-gold/30 shadow-[inset_0_0_40px_rgba(255,183,3,0.15)]"></div>

            <div className="flex flex-col items-center text-center relative z-10">
              
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400 mb-6 drop-shadow-lg">
                SEASON I — THE BEGINNING
              </motion.h2>

              <motion.p variants={fadeUp} className="text-xl md:text-2xl text-gray-300 font-medium tracking-wide italic leading-relaxed mb-16">
                A fresh world. <br className="md:hidden" />
                Empty lands. <br className="md:hidden" />
                New kingdoms waiting to rise.
              </motion.p>

              {/* Information Grid */}
              <motion.div 
                variants={fadeUp}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
              >
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="flex flex-col items-center p-6 rounded-2xl bg-black/50 border border-white/5 shadow-inner hover:bg-white/5 transition-colors duration-300"
                  >
                    <div className="text-accent-gold mb-3 opacity-80">
                      {stat.icon}
                    </div>
                    <span className="text-gray-500 font-bold tracking-[0.2em] uppercase text-[10px] mb-2">
                      {stat.label}
                    </span>
                    <span className="text-white font-heading font-bold tracking-widest text-lg">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
