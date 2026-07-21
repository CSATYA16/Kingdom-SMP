import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { useState } from 'react';
import { Box } from 'lucide-react';

export const StorySection = () => {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/10 via-transparent to-transparent blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          
          {/* Left Text */}
          <motion.div variants={fadeUp} className="flex flex-col gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-widest text-white drop-shadow-md mb-4 leading-tight">
                THE STORY <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400">BEGINS</span>
              </h2>
              <div className="w-16 h-1 bg-accent-gold rounded-full shadow-[0_0_15px_rgba(255,183,3,0.5)]"></div>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-medium italic">
                "In an untouched world, the first block is placed. <br />
                Kingdoms will rise. <br />
                Friendships will form. <br />
                Stories will become legends."
              </p>
            </div>

            {/* Small Timeline */}
            <div className="flex flex-col gap-4 mt-4 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-gold/20 border border-accent-gold/50 shadow-[0_0_10px_rgba(255,183,3,0.2)]">
                  <span className="text-sm">🌱</span>
                </div>
                <span className="text-white font-bold tracking-widest uppercase text-sm">New World</span>
              </div>
              <div className="w-0.5 h-6 bg-accent-purple/50 ml-4 shadow-[0_0_5px_rgba(168,85,247,0.5)]"></div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-purple/20 border border-accent-purple/50 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                  <span className="text-sm">👑</span>
                </div>
                <span className="text-white font-bold tracking-widest uppercase text-sm">Kingdom Era</span>
              </div>
              <div className="w-0.5 h-6 bg-white/10 ml-4"></div>
              <div className="flex items-center gap-4 opacity-50">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/20">
                  <span className="text-sm">⚔️</span>
                </div>
                <span className="text-gray-400 font-bold tracking-widest uppercase text-sm">Future Wars</span>
              </div>
            </div>
          </motion.div>

          {/* Right Media Card */}
          <motion.div variants={fadeUp} className="relative group perspective-1000">
            <motion.div 
              whileHover={{ rotateY: -5, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden border border-accent-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#0a0a0a]"
            >
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-accent-gold/0 group-hover:bg-accent-gold/10 transition-all duration-700 blur-[20px] pointer-events-none z-20"></div>

              {!videoError ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  onError={() => setVideoError(true)}
                  poster="/media/world/world_placeholder.jpg"
                >
                  <source src="/media/world/story.mp4" type="video/mp4" />
                </video>
              ) : (
                /* Animated Premium Placeholder */
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#111] to-[#050505] flex flex-col items-center justify-center overflow-hidden">
                  
                  {/* Placeholder Particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-accent-gold/20 w-8 h-8 border border-accent-gold/10 rounded-sm"
                      initial={{ 
                        x: Math.random() * 400 - 200, 
                        y: Math.random() * 400 - 200,
                        rotate: Math.random() * 360,
                        opacity: 0
                      }}
                      animate={{ 
                        y: [null, Math.random() * -100 - 50],
                        opacity: [0, 0.5, 0],
                        rotate: [null, Math.random() * 360 + 180]
                      }}
                      transition={{
                        duration: 6 + Math.random() * 5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 3
                      }}
                    />
                  ))}

                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Box className="w-16 h-16 text-accent-gold/40 mb-6 drop-shadow-[0_0_15px_rgba(255,183,3,0.3)]" />
                    </motion.div>
                    <span className="text-accent-gold/60 font-bold tracking-[0.3em] text-xs uppercase mb-2">Generating Terrain</span>
                    <div className="flex gap-1">
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-accent-purple/50 rounded-full" />
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-accent-purple/50 rounded-full" />
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-accent-purple/50 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Inner Shadow / Cinematic Vignette */}
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] pointer-events-none z-10"></div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
