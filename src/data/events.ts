export type EventType = 'BUILD' | 'COMMUNITY' | 'KINGDOM' | 'COMPETITION' | 'ANNOUNCEMENT';
export type EventStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED' | 'CANCELLED';

export interface EventParticipant {
  userId: string;
  username: string;
  joinedAt: string;
}

export interface SMPEvent {
  id: string;
  title: string;
  description: string;
  type: EventType;
  date: string;
  status: EventStatus;
  createdBy: string;
  participants: EventParticipant[];
  banner: string;
  discordEventId: string | null;
  minecraftEventId: string | null;
}
