import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WorldCTA = () => {
  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden">
      
      {/* Cinematic Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/20 via-accent-gold/5 to-transparent blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          
          <motion.div variants={fadeUp} className="w-20 h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent mb-8"></motion.div>

          <motion.h2 
            variants={fadeUp} 
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-widest text-white mb-6 uppercase drop-shadow-[0_0_20px_rgba(255,183,3,0.2)]"
          >
            THE WORLD IS <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400">WAITING.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            The first chapter begins with the players who join.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            {/* Join Button */}
            <button
              onClick={() => (document.getElementById('join-modal') as HTMLDialogElement)?.showModal()}
              className="relative group overflow-hidden bg-white text-black px-8 py-4 rounded-full font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,183,3,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">Join Season I</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
            </button>

            {/* Handbook Button */}
            <Link
              to="/handbook"
              className="px-8 py-4 rounded-full font-bold tracking-widest uppercase border border-white/20 text-white hover:bg-white/5 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              <BookOpen className="w-5 h-5" />
              <span>View Handbook</span>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
