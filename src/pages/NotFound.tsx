import { motion } from 'framer-motion';
import { fadeUp } from '../utils/animations';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/20 via-accent-gold/5 to-transparent blur-[100px] rounded-full pointer-events-none" />
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative z-10 text-center flex flex-col items-center max-w-md"
      >
        <span className="text-8xl mb-6 opacity-80">🗺️</span>
        <h1 className="text-4xl md:text-5xl font-heading font-black tracking-widest text-white mb-4 uppercase">
          LOST IN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400">WILDERNESS</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          "This path does not exist in Kingdom SMP."
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-white text-black font-bold tracking-widest px-8 py-3"
        >
          Return Home
        </Button>
      </motion.div>
    </div>
  );
};
