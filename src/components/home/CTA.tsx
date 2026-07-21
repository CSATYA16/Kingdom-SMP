import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useJoinModal } from "../../context/JoinModalContext";

export const CTA = () => {
  const navigate = useNavigate();
  const { openJoinModal } = useJoinModal();

  return (
    <section className="relative py-40 overflow-hidden bg-[#030303] flex items-center justify-center">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/20 via-accent-gold/10 to-transparent blur-[100px] rounded-full pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center max-w-3xl mx-auto"
        >
          
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-6 drop-shadow-md">
            YOUR KINGDOM <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400">AWAITS</span>
          </motion.h2>

          <motion.div variants={fadeUp} className="w-20 h-1 bg-accent-gold/50 rounded-full mb-10 shadow-[0_0_15px_rgba(255,183,3,0.5)]"></motion.div>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
            The world is freshly generated. The history books are empty. Join the community and write the first chapter of Kingdom SMP.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-accent-gold to-yellow-400 text-black font-black tracking-widest hover:shadow-[0_0_40px_rgba(255,183,3,0.6)] transition-all duration-300 border-none px-12"
              onClick={openJoinModal}
            >
              JOIN SMP
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full sm:w-auto tracking-widest font-bold border-white/20 hover:bg-white/10 px-10"
              onClick={() => navigate('/handbook')}
            >
              Read Handbook
            </Button>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
};
