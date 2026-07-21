import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const launchStats = [
  { label: "Players Joined", value: "Coming Soon", highlight: "purple" },
  { label: "Kingdoms Created", value: "0", highlight: "gold" },
  { label: "World Age", value: "Season 1", highlight: "purple" },
  { label: "Memories Made", value: "Loading...", highlight: "gold" }
];

export const Stats = () => {
  return (
    <section className="py-32 bg-[#030303] relative z-10 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-gold/20 via-transparent to-transparent blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {launchStats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={fadeUp}
              className={`relative group bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md overflow-hidden hover:bg-white/10 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
            >
              {/* Glowing Border effect */}
              <div className={`absolute inset-0 border-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                stat.highlight === 'gold' ? 'border-accent-gold shadow-[inset_0_0_20px_rgba(255,183,3,0.3)]' : 'border-accent-purple shadow-[inset_0_0_20px_rgba(168,85,247,0.3)]'
              }`}></div>
              
              <div className="flex flex-col items-center text-center relative z-10">
                <h3 className={`text-3xl lg:text-4xl font-heading font-black mb-3 ${
                  stat.highlight === 'gold' ? 'text-accent-gold drop-shadow-[0_0_10px_rgba(255,183,3,0.5)]' : 'text-accent-purple drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                }`}>
                  {stat.value}
                </h3>
                <p className="text-gray-300 font-medium uppercase tracking-[0.2em] text-xs">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
