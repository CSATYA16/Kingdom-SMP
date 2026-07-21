import type { Role } from './roles';

export type ApplicationStatus = 'NOT_SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED';

export interface User {
  id: string;
  username: string;
  email: string;
  minecraftUsername: string;
  uuid: string;
  avatar: string; // Placeholder for Minecraft Head API later
  role: Role;
  kingdom: string | null;
  joinedAt: string;
  applicationStatus: ApplicationStatus;
  minecraftWhitelisted: boolean;
  password?: string;
  discordUsername?: string;
  status?: string;
}

// FUTURE BACKEND: This mock array will be replaced by a MongoDB/Firebase Database query.
export const MOCK_USERS: User[] = [
  {
    id: "u-owner-1",
    username: "satya",
    email: "satya@kingdomsmp.net",
    minecraftUsername: "SatyaTheFounder",
    uuid: "b6f8f7c0-1234-4567-8901-abcdef123456",
    avatar: "/media/founder/founder.jpg", 
    role: "OWNER",
    kingdom: "Aether Kingdom",
    joinedAt: new Date().toISOString(),
    applicationStatus: 'APPROVED',
    minecraftWhitelisted: true
  },
  {
    id: "u-player-1",
    username: "steve",
    email: "steve@example.com",
    minecraftUsername: "SteveTheMiner",
    uuid: "a1b2c3d4-1234-4567-8901-abcdef123456",
    avatar: "https://minotar.net/helm/SteveTheMiner/100.png", // FUTURE BACKEND: Use Minecraft API
    role: "PLAYER",
    kingdom: null,
    joinedAt: new Date().toISOString(),
    applicationStatus: 'NOT_SUBMITTED',
    minecraftWhitelisted: false
  }
];
