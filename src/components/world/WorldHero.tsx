import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Globe2 } from 'lucide-react';

export const WorldHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#030303] overflow-hidden pt-20">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/20 via-accent-gold/5 to-transparent blur-[120px] pointer-events-none" />
      </div>

      {/* Floating Particles Placeholder (Can use full particle component if needed) */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          
          <motion.div variants={fadeUp} className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,183,3,0.15)]">
            <Globe2 className="w-4 h-4 text-accent-gold animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-300">SEASON I WORLD</span>
          </motion.div>

          <motion.h1 
            variants={fadeUp} 
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-widest text-white mb-6 leading-[1.1] drop-shadow-2xl uppercase"
          >
            A NEW WORLD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-white to-accent-gold drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              AWAITS.
            </span>
          </motion.h1>
          
          <motion.div variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400 mb-8 drop-shadow-[0_0_15px_rgba(255,183,3,0.3)]">
            READY TO BE SHAPED.
          </motion.div>

          <motion.p variants={fadeUp} className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed tracking-wide font-medium">
            A fresh survival world where every build, journey, 
            and community project begins from the first block.
          </motion.p>
          
          <motion.div variants={fadeUp} className="mt-12 w-24 h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent rounded-full shadow-[0_0_15px_rgba(255,183,3,0.5)]"></motion.div>

        </motion.div>
      </div>
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/50 pointer-events-none z-20"></div>
    </section>
  );
};
