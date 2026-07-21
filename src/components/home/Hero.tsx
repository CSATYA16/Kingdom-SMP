import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeUp, staggerContainer } from "../../utils/animations";
import { Button } from "../ui/Button";
import { ChevronDown, Sparkles } from "lucide-react";
import { useJoinModal } from "../../context/JoinModalContext";
import { creatorConfig } from "../../config/creator";

export const Hero = () => {
  const navigate = useNavigate();
  const { openJoinModal } = useJoinModal();
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303]">
      
      {/* Background Media */}
      {!videoError && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-40 mix-blend-screen"
            onError={() => setVideoError(true)}
            poster="/media/hero/hero.jpg"
          >
            <source src="/media/hero/hero.mp4" type="video/mp4" />
          </video>
          {/* Vignette Overlay for video */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#030303_100%)]"></div>
        </div>
      )}

      {/* Animated Background Elements (Gradient Fallback / Glow) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-gold/10 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[150px] animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Particles (Subtle square blocks) */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/20 w-3 h-3 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: [null, Math.random() * -200],
              rotate: [null, Math.random() * 360 + 180]
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center mt-20 pb-32 md:pb-40">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Season Tag */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(255,183,3,0.1)]">
            <Sparkles className="w-4 h-4 text-accent-gold" />
            <span className="text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">Season I • Fresh World • Community SMP</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-black mb-4 leading-[1.1] tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">KINGDOM SMP</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-accent-purple drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">A NEW ERA BEGINS</span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed font-medium">
            A survival world built on creativity, kingdoms, friendships, memories, and stories created by players.
          </motion.p>

          {/* Founder Touch */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full py-2 px-4 pr-6 mb-12 backdrop-blur-md">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-accent-gold/30">
                <img src={creatorConfig.founder.imagePath} alt={creatorConfig.founder.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Created by</span>
                <span className="text-sm font-bold text-white tracking-wide">{creatorConfig.founder.name}</span>
              </div>
            </motion.div>

          {/* Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-accent-gold to-yellow-400 text-black font-black tracking-widest hover:shadow-[0_0_30px_rgba(255,183,3,0.5)] transition-all duration-300 border-none"
              onClick={openJoinModal}
            >
              JOIN KINGDOM
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="tracking-widest font-bold border-white/20 hover:bg-white/10"
              onClick={() => navigate('/world')}
            >
              Explore World
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-accent-gold uppercase tracking-[0.3em] font-bold drop-shadow-md">Begin Journey</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-accent-gold w-6 h-6 drop-shadow-md" />
        </motion.div>
      </motion.div>
    </section>
  );
};
