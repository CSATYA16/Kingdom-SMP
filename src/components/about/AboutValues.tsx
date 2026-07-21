import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Hammer, Users, Compass, BookOpen } from 'lucide-react';

const values = [
  { 
    id: 1, 
    title: 'Creativity', 
    desc: 'Build without limits.', 
    icon: <Hammer className="w-8 h-8" />,
    color: 'gold'
  },
  { 
    id: 2, 
    title: 'Community', 
    desc: 'Grow together with players.', 
    icon: <Users className="w-8 h-8" />,
    color: 'purple'
  },
  { 
    id: 3, 
    title: 'Exploration', 
    desc: 'Discover the unknown.', 
    icon: <Compass className="w-8 h-8" />,
    color: 'gold'
  },
  { 
    id: 4, 
    title: 'Stories', 
    desc: 'Every player creates history.', 
    icon: <BookOpen className="w-8 h-8" />,
    color: 'purple'
  }
];

export const AboutValues = () => {
  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/20 via-accent-gold/10 to-transparent blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-20"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black tracking-widest text-white text-center mb-4">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-accent-purple drop-shadow-[0_0_15px_rgba(255,183,3,0.3)]">FOUNDATION</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="w-16 h-1 bg-accent-gold rounded-full shadow-[0_0_10px_rgba(255,183,3,0.5)]"></motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {values.map((val) => (
            <motion.div 
              key={val.id}
              variants={fadeUp}
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group perspective-1000 h-full"
            >
              {/* Premium Glass Card */}
              <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                
                {/* Hover Glow & Border Animation */}
                <div className={`absolute inset-0 border-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  val.color === 'gold' ? 'border-accent-gold/30 shadow-[inset_0_0_30px_rgba(255,183,3,0.1)]' : 'border-accent-purple/30 shadow-[inset_0_0_30px_rgba(168,85,247,0.1)]'
                }`}></div>

                {/* Background Shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-full group-hover:translate-x-0"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Floating Icon */}
                  <motion.div 
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: val.id * 0.2 }}
                    className={`p-4 rounded-2xl bg-black/50 border shadow-lg ${
                      val.color === 'gold' ? 'text-accent-gold border-accent-gold/20 shadow-accent-gold/10' : 'text-accent-purple border-accent-purple/20 shadow-accent-purple/10'
                    }`}
                  >
                    {val.icon}
                  </motion.div>

                  <div>
                    <h3 className="text-2xl font-heading font-bold text-white tracking-widest mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                      {val.title}
                    </h3>
                    <p className="text-gray-400 font-medium tracking-wide">
                      {val.desc}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
