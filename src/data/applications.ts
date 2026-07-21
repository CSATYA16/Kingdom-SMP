import type { ApplicationStatus } from './users';

export interface ApplicationAnswers {
  minecraftUsername: string;
  age?: string;
  experience: string;
  reason: string;
  playerType: string;
  previousSMP: string;
}

export interface Application {
  id: string;
  userId: string;
  username: string;
  answers: ApplicationAnswers;
  status: ApplicationStatus;
  reviewMessage?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}
