export type AnnouncementType = 'update' | 'event' | 'maintenance' | 'news';

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: AnnouncementType;
  active: boolean; // Only display if active
}

export const announcements: Announcement[] = [
  {
    id: 'a1',
    title: 'Season I Launch',
    description: 'Kingdom SMP Season I is officially launching soon. Prepare your guilds and resources!',
    date: 'Coming Soon',
    type: 'news',
    active: false // Do not display unless needed
  }
];
