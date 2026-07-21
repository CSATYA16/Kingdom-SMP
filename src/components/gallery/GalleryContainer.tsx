import { useState, useEffect } from 'react';
import { GalleryFilter } from './GalleryFilter';
import { MemoriesGrid } from './MemoriesGrid';
import { MemoryViewer } from './MemoryViewer';
import type { CategoryType, GalleryItem } from '../../data/gallery';
import { getData } from '../../utils/storage';

export const GalleryContainer = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [viewerItem, setViewerItem] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const rawMedia = getData<any[]>('media', []);

    const safeMedia = rawMedia
      .filter(Boolean)
      .map(item => ({
        id: item.id || crypto.randomUUID(),
        title: item.title || "Untitled Memory",
        description: item.description || "",
        uploaderId: item.uploaderId || "",
        uploaderName: item.uploaderName || "Unknown",
        type: ((item.type || "image").toLowerCase() === 'video' ? 'video' : 'image') as 'image' | 'video',
        category: item.category || "memories",
        url:
          item.url ||
          item.base64Preview ||
          item.preview ||
          item.path ||
          "",
        status: item.status || "Pending",
        createdAt: item.createdAt || new Date().toISOString(),
        size: 'normal' as 'normal' | 'large'
      }))
      .filter(item => item.url);

    console.log("Gallery Media:", safeMedia);

    const visibleMedia = safeMedia.filter(
      item => item.status.toLowerCase() === "approved"
    );

    setGalleryItems(visibleMedia);
  }, []);

  const filteredItems = galleryItems.filter(
    item => activeCategory.toLowerCase() === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase()
  );

  const handleOpenViewer = (item: GalleryItem) => {
    setViewerItem(item);
  };

  const handleCloseViewer = () => {
    setViewerItem(null);
  };

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (!viewerItem) return;
    const currentIndex = filteredItems.findIndex(item => item.id === viewerItem.id);
    if (currentIndex === -1) return;

    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % filteredItems.length;
      setViewerItem(filteredItems[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
      setViewerItem(filteredItems[prevIndex]);
    }
  };

  return (
    <div className="relative py-20 bg-[#030303] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/10 to-transparent blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <GalleryFilter 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />
        
        <MemoriesGrid 
          items={filteredItems} 
          onOpenViewer={handleOpenViewer} 
        />

      </div>

      {viewerItem && (
        <MemoryViewer 
          item={viewerItem} 
          onClose={handleCloseViewer} 
          onNavigate={handleNavigate} 
        />
      )}
    </div>
  );
};
