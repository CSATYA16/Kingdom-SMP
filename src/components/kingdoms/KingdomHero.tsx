import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';

export const KingdomHero = () => {
  return (
    <section className="relative pt-40 pb-32 flex items-center justify-center overflow-hidden bg-[#030303] min-h-[60vh]">
      
      {/* Cinematic Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-gold/20 via-accent-purple/5 to-transparent blur-[120px] pointer-events-none" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-accent-gold/40 w-2 h-2 rounded-sm backdrop-blur-sm"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 0.6, 0],
              rotate: [null, Math.random() * 360 + 180]
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(255,183,3,0.1)]">
            <span className="text-sm">👑</span>
            <span className="text-xs font-bold tracking-[0.2em] text-accent-gold uppercase">SEASON I KINGDOMS</span>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-[5rem] font-heading font-black mb-6 leading-[1.1] tracking-widest">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-md">BUILD YOUR</span> <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400 drop-shadow-[0_0_20px_rgba(255,183,3,0.3)]">KINGDOM</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="w-16 h-1 bg-accent-gold/50 rounded-full mb-8 shadow-[0_0_10px_rgba(255,183,3,0.5)]"></motion.div>

          {/* Subtitle */}
          <motion.p variants={fadeUp} className="text-lg md:text-2xl text-gray-300 max-w-2xl leading-relaxed font-medium tracking-wide">
            Create communities, build projects, trade resources, and shape the future of the world together.
          </motion.p>

        </motion.div>
      </div>
    </section>
  );
};
