import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { PlayCircle, Image as ImageIcon, Sparkles } from 'lucide-react';
import type { GalleryItem } from '../../data/gallery';

interface FeaturedMemoryProps {
  featuredItem?: GalleryItem;
  onOpenViewer?: (item: GalleryItem) => void;
}

export const FeaturedMemory = ({ featuredItem, onOpenViewer }: FeaturedMemoryProps) => {
  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-gold/20 to-transparent blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <motion.div variants={fadeUp} className="w-16 h-1 bg-accent-gold rounded-full shadow-[0_0_10px_rgba(255,183,3,0.5)] mb-6"></motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black tracking-widest text-white uppercase">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400">Memory</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] group bg-[#0a0a0a] cursor-pointer"
          onClick={() => featuredItem && onOpenViewer && onOpenViewer(featuredItem)}
        >
          {featuredItem ? (
            <>
              {featuredItem.type === 'video' ? (
                <video 
                  src={featuredItem.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <img 
                  src={featuredItem.url}
                  alt={featuredItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
              
              <div className="absolute inset-0 border-2 border-accent-gold/0 group-hover:border-accent-gold/30 rounded-3xl transition-all duration-500 pointer-events-none"></div>

              <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 flex flex-col md:flex-row md:items-end justify-between gap-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-accent-gold/20 text-accent-gold border border-accent-gold/30 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                      {featuredItem.category}
                    </span>
                    <span className="text-gray-400 text-xs font-bold tracking-wider">{featuredItem.createdAt}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white drop-shadow-2xl">
                    {featuredItem.title}
                  </h3>
                </div>
                
                <div className="w-16 h-16 shrink-0 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-accent-gold/20 group-hover:border-accent-gold/50 transition-all duration-500">
                  {featuredItem.type === 'video' ? <PlayCircle className="w-8 h-8 text-white group-hover:text-accent-gold transition-colors duration-500" /> : <ImageIcon className="w-8 h-8 text-white group-hover:text-accent-gold transition-colors duration-500" />}
                </div>
              </div>
            </>
          ) : (
            /* Empty State Placeholder */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#030303] to-[#0a0a0a]">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-gold/10 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="relative z-10 w-24 h-24 rounded-full bg-black/50 border border-white/10 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:border-accent-gold/30 transition-all duration-700">
                <Sparkles className="w-10 h-10 text-accent-gold opacity-80" />
              </div>
              
              <h3 className="relative z-10 text-3xl md:text-5xl font-heading font-black text-white tracking-widest mb-4">
                THE JOURNEY BEGINS
              </h3>
              
              <p className="relative z-10 text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                The first memories of Kingdom SMP will appear here as players create them.
              </p>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
};
