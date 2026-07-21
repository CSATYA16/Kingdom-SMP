import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Map as MapIcon, ExternalLink, Lock } from 'lucide-react';
import { useState } from 'react';
import { serverConfig } from '../../config/server';

export const WorldMap = () => {
  const [showToast, setShowToast] = useState(false);

  const handleOpenMap = () => {
    if (serverConfig.mapURL) {
      window.open(serverConfig.mapURL, '_blank');
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden">
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black tracking-widest text-white mb-4">
            WORLD <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-gold">MAP</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="w-16 h-1 bg-accent-purple/50 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)] mb-6"></motion.div>
          
          <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl text-center text-lg leading-relaxed">
            Track builds, territories, and discoveries as the world grows.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
          className="relative w-full aspect-video max-h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] group bg-[#0a0a0a]"
        >
          {/* Minecraft Grid Terrain Styling */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
              transformOrigin: 'top center'
            }}
          ></div>
          
          {/* Stardust Texture */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
          
          {/* Central Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-gold/20 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Map Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <div className="bg-black/60 border border-white/10 backdrop-blur-xl p-8 rounded-2xl flex flex-col items-center text-center max-w-md transform transition-transform duration-500 group-hover:scale-105 group-hover:border-accent-gold/30 shadow-2xl">
              <MapIcon className="w-12 h-12 text-accent-gold mb-4 opacity-80" />
              <h3 className="text-xl md:text-2xl font-heading font-black text-white tracking-widest mb-2">
                INTERACTIVE MAP COMING SOON
              </h3>
              <p className="text-gray-400 text-sm mb-8">
                The map will go live shortly after the world is generated to track our exploration.
              </p>
              
              <button 
                onClick={handleOpenMap}
                className="relative overflow-hidden px-8 py-3 rounded-full font-bold tracking-widest text-sm uppercase text-black bg-gradient-to-r from-accent-gold to-yellow-400 hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,183,3,0.4)] flex items-center gap-2"
              >
                <span>OPEN LIVE MAP</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-black/90 border border-accent-gold/50 backdrop-blur-xl px-6 py-4 rounded-full shadow-[0_0_30px_rgba(255,183,3,0.3)]"
            >
              <Lock className="w-5 h-5 text-accent-gold" />
              <span className="text-white font-bold tracking-wider text-sm uppercase">World map will open after Season I launch</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
