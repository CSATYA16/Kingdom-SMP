import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { PlayCircle, Camera } from 'lucide-react';
import type { GalleryItem } from '../../data/gallery';

interface MemoriesGridProps {
  items: GalleryItem[];
  onOpenViewer: (item: GalleryItem) => void;
}

export const MemoriesGrid = ({ items, onOpenViewer }: MemoriesGridProps) => {
  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full flex justify-center py-12"
      >
        <div className="max-w-2xl w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-16 flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-accent-gold/5 to-transparent"></div>

          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:border-accent-gold/30 transition-all duration-500 relative z-10">
            <Camera className="w-8 h-8 text-gray-400 group-hover:text-accent-gold transition-colors duration-500" />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-heading font-black text-white tracking-widest mb-4 relative z-10 uppercase drop-shadow-md">
            The First Memory is Waiting
          </h3>
          
          <p className="text-gray-400 text-lg relative z-10 max-w-lg">
            Every screenshot, every build, every adventure will appear here. The archive is ready for Season I.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]"
    >
      {items.map((item, i) => {
        if (!item.url) return null;
        
        const isLarge = item.size === 'large' || (i % 7 === 0);
        return (
          <motion.div
            key={item.id}
            variants={fadeUp}
            className={`relative group rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] cursor-pointer shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:-translate-y-1 transition-all duration-500 ${
              isLarge ? 'md:col-span-2 md:row-span-2' : 'col-span-1 row-span-1'
            }`}
            onClick={() => onOpenViewer(item)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {item.type === 'video' && item.url && (
              <video 
                src={item.url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            )}
            {item.type === 'image' && item.url && (
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            )}
            
            {/* Dark overlay appears on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
            
            {/* Gold border on hover */}
            <div className="absolute inset-0 border-2 border-accent-gold/0 group-hover:border-accent-gold/40 rounded-2xl transition-all duration-500 pointer-events-none"></div>

            {/* Video Indicator */}
            {item.type === 'video' && (
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-accent-gold/50 transition-colors duration-500">
                <PlayCircle className="w-4 h-4 text-white group-hover:text-accent-gold transition-colors duration-500" />
              </div>
            )}

            {/* Content (Fades in on hover) */}
            <div className="absolute bottom-6 left-6 right-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-accent-gold">
                  {item.category}
                </span>
                <span className="text-gray-500 text-xs">—</span>
                <span className="text-gray-400 text-xs font-medium">{item.createdAt}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-heading font-black text-white drop-shadow-lg line-clamp-2">
                {item.title}
              </h3>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
