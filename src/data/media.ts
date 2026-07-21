

export type MediaType = 'image' | 'video';
export type MediaCategory = 'All' | 'Screenshots' | 'Videos' | 'Memories' | 'Season I' | 'Builds' | 'Friends' | 'Adventures' | 'Events';

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: MediaType;
  category: MediaCategory;
  path: string;
  date: string;
  size?: 'normal' | 'large'; // Used for bento grid layouts
}

// Prepare Old SMP Memory System ("Before Kingdom SMP")
// and standard Gallery data
export const mediaRegistry: MediaItem[] = [
  // Future memories can be added here using MEDIA_PATHS constants.
  // Example:
  // {
  //   id: 'legacy-1',
  //   title: 'The First Capital',
  //   description: 'Our old spawn area before Kingdom SMP was formed.',
  //   type: 'image',
  //   category: 'Builds',
  //   path: `${MEDIA_PATHS.DIRS.MEMORIES}/first-capital.jpg`,
  //   date: '2023-05-12',
  //   size: 'large'
  // }
];
