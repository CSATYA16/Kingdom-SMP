export type MediaType = 'image' | 'video';
export type CategoryType = string;

export interface GalleryItem {
  id: string;
  title: string;
  type: MediaType;
  category: CategoryType;
  url: string;
  createdAt: string;
  size?: 'normal' | 'large'; // Used for bento grid
}

// Media architecture for the Gallery page.
// Currently empty to represent the launch of Season I.
export const galleryData: GalleryItem[] = [
  // Example for future use:
  // {
  //   id: "1",
  //   title: "First Sunrise",
  //   type: "image",
  //   category: "Season I",
  //   url: "/media/world/sunrise.webp",
  //   createdAt: "2026-07-01",
  //   size: "large"
  // },
  // {
  //   id: "2",
  //   title: "Spawn Build Timelapse",
  //   type: "video",
  //   category: "Videos",
  //   url: "/media/videos/spawn-timelapse.mp4",
  //   createdAt: "2026-07-02"
  // }
];
