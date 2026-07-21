import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown } from 'lucide-react';

interface LoadingScreenProps {
  onFinish: () => void;
}

const loadingMessages = [
  "Preparing the world...",
  "Generating terrain...",
  "Building kingdoms...",
  "Loading memories...",
  "Starting adventure..."
];

export const LoadingScreen = ({ onFinish }: LoadingScreenProps) => {
  const [messageIndex, setMessageIndex] = useState(0);

  // Rotating messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 800); // Change message every 0.8 seconds
    return () => clearInterval(interval);
  }, []);

  // Fallback timer: automatically enter website after 5.5 seconds.
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] w-[100vw] h-[100vh] bg-[#030303] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Soft Purple/Gold Radial Glow behind center (breathing animation) */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/20 via-accent-gold/10 to-transparent blur-[80px] rounded-full pointer-events-none z-0"
      />

      {/* Subtle Minecraft-style Particles */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`block-particle-${i}`}
            className="absolute bg-white/20 w-3 h-3 md:w-4 md:h-4 backdrop-blur-sm"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
              opacity: 0,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: [null, Math.random() * -400 - 100],
              opacity: [0, 0.6, 0],
              rotate: [null, Math.random() * 360 + 180]
            }}
            transition={{
              duration: 8 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Tiny Floating Golden Sparks */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute bg-accent-gold w-1 h-1 md:w-1.5 md:h-1.5 rounded-full shadow-[0_0_8px_rgba(255,183,3,0.9)]"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
              opacity: 0
            }}
            animate={{ 
              y: [null, Math.random() * -300 - 100],
              x: [null, (Math.random() - 0.5) * 150],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4
            }}
          />
        ))}
      </div>

      {/* Center Content Group (Slow scale in and final zoom forward) */}
      <motion.div 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 1.05, transition: { duration: 0.8, ease: "easeIn" } }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl"
      >
        
        {/* Crown Icon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: [-5, 5, -5] }}
          transition={{ 
            opacity: { delay: 0.3, duration: 1, ease: "easeOut" },
            y: { delay: 0.3, duration: 4, repeat: Infinity, ease: "easeInOut" } 
          }}
          className="mb-4 text-accent-gold relative z-20"
        >
          {/* Crown Glow Animation */}
          <motion.div
            animate={{ filter: ["drop-shadow(0px 0px 5px rgba(255,183,3,0.4))", "drop-shadow(0px 0px 20px rgba(255,183,3,0.9))", "drop-shadow(0px 0px 5px rgba(255,183,3,0.4))"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Crown size={50} strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Title Container with Mascot */}
        <div className="relative flex flex-col md:flex-row items-center justify-center mb-8">
          
          {/* Very Subtle Purple/Gold Text Backglow */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 via-accent-gold/10 to-accent-purple/10 blur-[30px] rounded-full z-0 pointer-events-none"></div>

          {/* KINGDOM SMP */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-[4.5rem] font-heading font-black tracking-[0.15em] md:tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white to-accent-gold drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] relative z-10"
          >
            KINGDOM SMP
          </motion.h1>



        </div>

        {/* ENTERING YOUR KINGDOM */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl font-medium tracking-[0.4em] text-gray-200 uppercase mb-3 drop-shadow-md relative z-10"
        >
          Entering Your Kingdom
        </motion.h2>

        {/* Rotating Loading Messages */}
        <div className="relative h-6 mb-10 w-full flex justify-center z-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.5 }}
              className="absolute text-sm text-gray-400 tracking-wider"
            >
              {loadingMessages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Animated Minecraft Style Loading Blocks */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex gap-2 relative z-10"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={`loader-block-${i}`}
              animate={{ 
                backgroundColor: ["rgba(255,183,3,0.2)", "rgba(255,183,3,1)", "rgba(168,85,247,0.8)", "rgba(255,183,3,0.2)"],
                boxShadow: [
                  "0 0 0px rgba(255,183,3,0)",
                  "0 0 15px rgba(255,183,3,0.8)",
                  "0 0 15px rgba(168,85,247,0.8)",
                  "0 0 0px rgba(255,183,3,0)"
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "linear"
              }}
              className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm bg-accent-gold/20"
            />
          ))}
        </motion.div>

      </motion.div>
    </motion.div>
  );
};
