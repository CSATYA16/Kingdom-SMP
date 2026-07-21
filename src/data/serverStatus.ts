export interface ServerStatus {
  online: boolean;
  playersOnline: number;
  maxPlayers: number;
  latency: number | null;
}

export const serverStatus: ServerStatus = {
  online: false, // Set to true when server launches
  playersOnline: 0,
  maxPlayers: 200,
  latency: null
};
