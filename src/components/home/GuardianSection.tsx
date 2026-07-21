import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { useState } from 'react';
import { Shield } from 'lucide-react';

export const GuardianSection = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-gold/20 via-accent-purple/10 to-transparent blur-[100px] rounded-full" 
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute bg-white/20 w-3 h-3 backdrop-blur-sm"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: [null, Math.random() * -150 - 50],
              opacity: [0, 0.6, 0],
              rotate: [null, Math.random() * 360 + 180]
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          
          {/* Titles */}
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-heading font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-2">
            MEET THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400 drop-shadow-[0_0_15px_rgba(255,183,3,0.3)]">GUARDIAN</span>
          </motion.h2>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 tracking-[0.2em] uppercase font-semibold mb-16 drop-shadow-md">
            The first protector of Kingdom SMP
          </motion.p>

          {/* 3D Floating Mascot Container */}
          <motion.div 
            variants={fadeUp} 
            className="relative w-full max-w-lg mx-auto mb-16"
          >
            {/* Core Aura Glow */}
            <motion.div 
              animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-accent-gold/20 blur-[60px] rounded-full pointer-events-none"
            ></motion.div>
            
            <div className="relative z-10 w-full h-[350px] md:h-[500px] flex items-center justify-center pointer-events-none">
              {!imageError ? (
                <motion.img 
                  animate={{ 
                    y: [-15, 15, -15],
                    rotate: [-2, 2, -2]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  src="/media/mascot/mascot.png" 
                  alt="The Guardian" 
                  className="w-full h-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.9)]"
                  onError={() => setImageError(true)}
                />
              ) : (
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-48 h-48 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-accent-gold/20 shadow-[0_0_30px_rgba(255,183,3,0.1)]"
                >
                  <Shield className="w-16 h-16 text-accent-gold/40 mb-4" />
                  <span className="text-accent-gold/60 font-medium tracking-widest text-xs uppercase">Awaiting Guardian</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Premium Glass Card */}
          <motion.div 
            variants={fadeUp}
            className="w-full max-w-2xl mx-auto bg-[#0a0a0a]/80 backdrop-blur-md border border-accent-gold/10 p-8 md:p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-accent-gold font-bold tracking-[0.3em] uppercase text-xs mb-2">Guardian</span>
              <h3 className="text-2xl md:text-3xl font-heading font-black text-white tracking-widest mb-6">Satya</h3>
              
              <div className="w-12 h-1 bg-accent-purple/50 rounded-full mb-6 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
              
              <p className="text-gray-300 md:text-lg italic tracking-wide leading-relaxed">
                "The journey begins with one player, <br className="hidden md:block" />
                but legends are written together."
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
