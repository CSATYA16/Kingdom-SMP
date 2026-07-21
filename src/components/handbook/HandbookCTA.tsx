import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HandbookCTA = () => {
  return (
    <section className="relative py-24 bg-[#030303] overflow-hidden border-t border-white/5">
      
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/10 via-accent-gold/5 to-transparent blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          
          <motion.div variants={fadeUp} className="w-16 h-1 bg-gradient-to-r from-transparent via-accent-purple to-transparent mb-8"></motion.div>

          <motion.h2 
            variants={fadeUp} 
            className="text-4xl md:text-6xl font-heading font-black tracking-widest text-white mb-10 uppercase drop-shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          >
            READY TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-gold">ENTER?</span>
          </motion.h2>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            {/* Join Button */}
            <button
              onClick={() => (document.getElementById('join-modal') as HTMLDialogElement)?.showModal()}
              className="relative group overflow-hidden bg-white text-black px-8 py-4 rounded-full font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,183,3,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">Join SMP</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
            </button>

            {/* Explore World Button */}
            <Link
              to="/world"
              className="px-8 py-4 rounded-full font-bold tracking-widest uppercase border border-white/20 text-white hover:bg-white/5 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              <Globe className="w-5 h-5" />
              <span>Explore World</span>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
