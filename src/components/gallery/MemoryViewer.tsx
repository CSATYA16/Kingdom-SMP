import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from '../../data/gallery';

interface MemoryViewerProps {
  item: GalleryItem;
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
}

export const MemoryViewer = ({ item, onClose, onNavigate }: MemoryViewerProps) => {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate('next');
      if (e.key === 'ArrowLeft') onNavigate('prev');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-[#030303]/90 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Content Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-6xl max-h-full flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Media */}
          <div className="relative w-full max-h-[80vh] flex items-center justify-center pointer-events-auto shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden">
            {item.type === 'video' && item.url ? (
              <video 
                src={item.url}
                controls
                autoPlay
                className="max-w-full max-h-[80vh] object-contain bg-black"
              />
            ) : (
              <img 
                src={item.url} 
                alt={item.title}
                className="max-w-full max-h-[80vh] object-contain bg-black"
                loading="lazy"
              />
            )}
          </div>

          {/* Details */}
          <div className="w-full mt-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4 pointer-events-auto px-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-black text-white">{item.title}</h3>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                <span className="text-accent-gold text-sm font-bold tracking-widest uppercase">{item.category}</span>
                <span className="text-gray-500">—</span>
                <span className="text-gray-400 text-sm font-medium">{item.createdAt}</span>
              </div>
            </div>
            
            {/* Controls (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => onNavigate('prev')} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={() => onNavigate('next')} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

        </motion.div>

        {/* Floating Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/50 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Mobile Navigation overlay areas */}
        <div 
          className="md:hidden absolute left-0 top-1/4 bottom-1/4 w-1/3 z-40" 
          onClick={() => onNavigate('prev')} 
        />
        <div 
          className="md:hidden absolute right-0 top-1/4 bottom-1/4 w-1/3 z-40" 
          onClick={() => onNavigate('next')} 
        />

      </div>
    </AnimatePresence>
  );
};
