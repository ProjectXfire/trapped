import type { Player } from "@/app/gameboard/models/player";

export const initPlayers: Player[] = [
  {
    name: "Player 1",
    position: "0:0",
    posibleMovements: [],
    movements: 0,
    blocksRemoved: 0,
    avatar: "/player_1.png",
    status: "move",
    playerTurn: 0,
    removeHolePerTurn: 1,
    maxMovements: 1,
  },
  {
    name: "Player 2",
    position: "14:14",
    posibleMovements: [],
    movements: 0,
    blocksRemoved: 0,
    avatar: "/player_2.png",
    status: "move",
    playerTurn: 1,
    removeHolePerTurn: 1,
    maxMovements: 1,
  },
];
