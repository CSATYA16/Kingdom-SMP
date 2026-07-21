import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { ShieldAlert, Map, Server, RefreshCw } from 'lucide-react';

const settingsData = [
  {
    label: 'Difficulty',
    value: 'Hard',
    icon: <ShieldAlert className="w-5 h-5 text-accent-gold" />
  },
  {
    label: 'World Type',
    value: 'Survival',
    icon: <Map className="w-5 h-5 text-accent-purple" />
  },
  {
    label: 'Version',
    value: 'Java 1.21+',
    icon: <Server className="w-5 h-5 text-accent-gold" />
  },
  {
    label: 'Reset Style',
    value: 'Long-Term World',
    icon: <RefreshCw className="w-5 h-5 text-accent-purple" />
  }
];

export const WorldSettings = () => {
  return (
    <section className="relative py-20 bg-[#0a0a0a] border-y border-white/5">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center mb-12 text-center"
        >
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-heading font-black tracking-widest text-white uppercase mb-2">
            World <span className="text-accent-gold">Settings</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="w-12 h-1 bg-accent-gold/30 rounded-full"></motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {settingsData.map((setting, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="bg-black/50 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center group hover:border-accent-gold/30 transition-colors duration-300"
            >
              <div className="mb-4 p-3 rounded-full bg-white/5 group-hover:bg-accent-gold/10 transition-colors duration-300">
                {setting.icon}
              </div>
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">
                {setting.label}
              </span>
              <span className="text-sm md:text-base font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
                {setting.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
