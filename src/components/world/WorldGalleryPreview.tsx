import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { Camera, PlayCircle, Image as ImageIcon } from 'lucide-react';

// Example media items simulating a fetch from public/media/world
// For Season I launch, these are empty or placeholders
const galleryMedia: { id: string, type: 'video' | 'image', url: string, title: string }[] = [];

export const WorldGalleryPreview = () => {
  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent-gold/10 via-transparent to-transparent blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black tracking-widest text-white mb-4">
            FIRST <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-gold">LOOK</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="w-16 h-1 bg-accent-gold rounded-full shadow-[0_0_10px_rgba(255,183,3,0.5)] mb-6"></motion.div>
        </motion.div>

        {galleryMedia.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center"
          >
            <div className="max-w-2xl w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-16 flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-accent-purple/5 to-transparent"></div>

              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:border-accent-gold/30 transition-all duration-500 relative z-10">
                <Camera className="w-8 h-8 text-gray-400 group-hover:text-accent-gold transition-colors duration-500" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-heading font-black text-white tracking-widest mb-3 relative z-10">
                SCREENSHOTS COMING SOON
              </h3>
              
              <p className="text-gray-400 text-lg relative z-10">
                Photos and cinematic videos will appear here once players begin building the world.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {galleryMedia.map((media) => (
              <motion.div
                key={media.id}
                variants={fadeUp}
                className="relative group rounded-2xl overflow-hidden aspect-video border border-white/10 bg-[#0a0a0a] cursor-pointer"
              >
                {media.type === 'video' ? (
                  <video 
                    src={media.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <img 
                    src={media.url} 
                    alt={media.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute inset-0 border-2 border-accent-gold/0 group-hover:border-accent-gold/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="p-2 bg-black/50 backdrop-blur-md rounded-full text-accent-gold">
                    {media.type === 'video' ? <PlayCircle className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                  </div>
                  <span className="text-white font-bold tracking-wide text-sm truncate shadow-black drop-shadow-md">
                    {media.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
};
