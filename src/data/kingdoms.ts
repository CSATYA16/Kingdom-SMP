export type KingdomRole = "KINGDOM_OWNER" | "OFFICER" | "MEMBER";

export interface KingdomMember {
  username: string;
  role: KingdomRole;
  joinedAt: string;
}

export interface Kingdom {
  id: string;
  name: string;
  description: string;
  owner: string;
  members: KingdomMember[];
  banner: string; // Base64 or URL
  createdDate: string;
  status: "Recruiting" | "Invite Only" | "Full";
  level: number;
}

export const MOCK_KINGDOMS: Kingdom[] = [];
