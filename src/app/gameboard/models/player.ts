export type PlayerStatus = "move" | "add-hole" | "remove-hole";

export interface Player {
  position: string;
  posibleMovements: string[];
  movements: number;
  blocksRemoved: number;
  playerTurn: number;
  name: string;
  avatar: string;
  status: PlayerStatus;
  maxMovements: number;
  removeHolePerTurn: number;
}
