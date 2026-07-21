import { motion, useScroll } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { useRef } from 'react';

const timelineData = [
  { day: "Day 0", title: "The Beginning", desc: "A fresh, untouched world waiting for its first footsteps." },
  { day: "Day 1", title: "First Survivors Arrive", desc: "Foundations are laid, alliances form, and the survival journey begins." },
  { day: "Next", title: "Kingdoms Rise", desc: "Villages grow into castles, trade routes open, and factions emerge." },
  { day: "Future", title: "Legends Are Written", desc: "Wars, peace, massive builds, and stories that will be told for seasons." },
];

export const KingdomTimeline = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-accent-gold/10 to-transparent blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-20"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-4 text-center">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400">JOURNEY</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="w-16 h-1 bg-accent-gold/50 rounded-full shadow-[0_0_10px_rgba(255,183,3,0.5)]"></motion.div>
        </motion.div>

        {/* Timeline container */}
        <div className="relative" ref={containerRef}>
          
          {/* Vertical Background Line (Inactive) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/5 -translate-x-1/2"></div>
          
          {/* Animated Golden Line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-gold to-accent-purple -translate-x-1/2"
            style={{ 
              scaleY: scrollYProgress,
              transformOrigin: "top"
            }}
          ></motion.div>
          
          <div className="flex flex-col gap-12 md:gap-24 relative py-10">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  
                  {/* Timeline Dot (Static Glow for Performance) */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent-gold shadow-[0_0_15px_rgba(255,183,3,0.8)] border-4 border-[#030303] -translate-x-1/2 z-10"></div>
                  
                  {/* Content Box */}
                  <motion.div 
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`ml-12 md:ml-0 w-full md:w-1/2 will-change-transform ${isEven ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}
                  >
                    <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                      <span className="text-accent-gold font-bold tracking-widest text-sm uppercase mb-2 block">{item.day}</span>
                      <h3 className="text-2xl font-heading font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
