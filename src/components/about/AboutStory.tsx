import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { useState } from 'react';
import { Globe } from 'lucide-react';

export const AboutStory = () => {
  const [mediaError, setMediaError] = useState(false);

  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-accent-gold/10 via-transparent to-transparent blur-[120px]" />
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
            
            <div className="space-y-6 text-gray-300 leading-relaxed font-medium">
              <p className="text-xl text-white font-semibold tracking-wide">
                Kingdom SMP began with one simple idea:
              </p>
              
              <p className="italic border-l-2 border-accent-gold/30 pl-4 py-1">
                Create a survival world where every build has meaning, <br />
                every player leaves a mark, <br />
                and every moment becomes part of the server's history.
              </p>
              
              <p>
                From the first block placed to the largest kingdoms built, the world grows through its community.
              </p>
            </div>
          </motion.div>

          {/* Right Media Showcase Card */}
          <motion.div variants={fadeUp} className="relative group perspective-1000">
            <motion.div 
              whileHover={{ rotateY: -2, rotateX: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative aspect-video lg:aspect-[4/5] rounded-3xl overflow-hidden border border-accent-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#0a0a0a]"
            >
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-accent-gold/0 group-hover:bg-accent-gold/10 transition-all duration-700 blur-[20px] pointer-events-none z-20"></div>

              {!mediaError ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  onError={() => setMediaError(true)}
                  poster="/media/world/world_showcase.jpg"
                >
                  <source src="/media/world/world_showcase.mp4" type="video/mp4" />
                </video>
              ) : (
                /* Animated Premium Placeholder */
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#050505] flex flex-col items-center justify-center overflow-hidden">
                  
                  {/* Glowing Blocks Particles */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-accent-gold/10 w-12 h-12 border border-accent-gold/20 rounded-md backdrop-blur-md"
                      initial={{ 
                        x: Math.random() * 400 - 200, 
                        y: Math.random() * 600 - 300,
                        rotate: Math.random() * 360,
                        opacity: 0
                      }}
                      animate={{ 
                        y: [null, Math.random() * -150 - 50],
                        opacity: [0, 0.4, 0],
                        rotate: [null, Math.random() * 360 + 180]
                      }}
                      transition={{
                        duration: 8 + Math.random() * 8,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 4
                      }}
                    />
                  ))}

                  <div className="relative z-10 flex flex-col items-center p-8 bg-black/40 backdrop-blur-sm border border-white/5 rounded-2xl">
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Globe className="w-16 h-16 text-accent-gold/50 mb-6 drop-shadow-[0_0_15px_rgba(255,183,3,0.3)]" />
                    </motion.div>
                    <span className="text-accent-gold font-bold tracking-[0.2em] text-sm uppercase text-center max-w-[200px]">World Preview Coming Soon</span>
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
