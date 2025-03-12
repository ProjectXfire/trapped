import type { Block } from "../models/block";
import type { Player, PlayerStatus } from "../models/player";
import { create } from "zustand";
import { initPlayers } from "@/shared/data";

type TableStatus = "finish" | "playing" | "starting";
type PlayerPlay = { movements?: number; blocksRemoved?: number };
type Position = { column: number; row: number };
export type ModifierKeys = "random-hole" | "two-movements" | "two-holes";
export type Modifier = { [key in ModifierKeys]: { description: string; isActive: boolean } };

const tableSize = 15;

interface TableBoardState {
  tableboard: Block[][];
  emptyBlocksIndexes: string[];
  columns: number;
  players: Player[];
  status: TableStatus;
  playerTurn: number;
  maxHoleToRemove: number;
  maxMovements: number;
  winner: null | Player;
  modifiers: Modifier;
  setStatus: (status: TableStatus) => void;
  setMaxHolesToPlayer: (playerName: string, maxHoles: number) => void;
  setMaxMovementsToPlayer: (playerName: string, maxMovements: number) => void;
  setAWinner: () => void;
  setPosition: (playerName: string, nextPosition: Position) => void;
  setStarterPlayer: (initialTurn: number) => void;
  setStatusPlayer: (playerName: string, status: PlayerStatus) => void;
  setPlayerInfo: (playerName: string, playerPlay: PlayerPlay) => void;
  setPlayerTurn: (currentPlayerTurn: number) => void;
  setHoleInBlock: (column: number, row: number) => void;
  setModifiers: (modifiers: string[]) => void;
  startGame: () => void;
  resetGame: () => void;
}

export const useTableBoard = create<TableBoardState>((set, get) => ({
  tableboard: newBoard(tableSize, tableSize),
  emptyBlocksIndexes: createEmptyBlocksIndexes(tableSize),
  columns: 15,
  maxHoleToRemove: 1,
  maxMovements: 1,
  winner: null,
  players: resetPlayers(initPlayers),
  status: "starting",
  playerTurn: 0,
  modifiers: {
    "random-hole": { description: "A new random hole will appear each turn.", isActive: false },
    "two-holes": { description: "Each player have a chance to do 2 holes.", isActive: false },
    "two-movements": {
      description: "Each player have a chance to do 2 movements.",
      isActive: false,
    },
  },
  setStatus: (status) => set({ status }),
  setMaxHolesToPlayer: (playerName, maxHoles) =>
    set({
      players: get().players.map((player) =>
        player.name === playerName ? { ...player, removeHolePerTurn: maxHoles } : player
      ),
    }),
  setMaxMovementsToPlayer: (playerName, maxMovements) =>
    set({
      players: get().players.map((player) =>
        player.name === playerName ? { ...player, maxMovements } : player
      ),
    }),
  setPosition: (playerName, nextPosition) =>
    set((state) => {
      const { column, row } = nextPosition;
      const currentPlayer = state.players.find((player) => player.name === playerName);
      if (!currentPlayer) return state;
      const movements = posibleMovements(state.tableboard, [column, row]);
      const table = structuredClone(state.tableboard);
      currentPlayer.posibleMovements = movements;
      const [columnPlayer, rowPlayer] = currentPlayer.position.split(":").map((v) => Number(v));
      currentPlayer.position = `${column}:${row}`;
      table[columnPlayer][rowPlayer].status = "empty";
      table[column][row].status = "occupied";
      const players = state.players.map((player) =>
        player.name === playerName ? { ...currentPlayer } : player
      );
      const emptyBlocksIndexes = updatedEmptyBlocksIndexes(state.emptyBlocksIndexes, {
        removePosition: [column, row],
        addPosition: [columnPlayer, rowPlayer],
      });
      return { ...state, players, tableboard: table, emptyBlocksIndexes };
    }),
  setStarterPlayer: (initialTurn) => set({ playerTurn: initialTurn }),
  setStatusPlayer: (playerName, status) =>
    set({
      players: get().players.map((player) =>
        player.name === playerName ? { ...player, status } : player
      ),
    }),
  setPlayerInfo: (playerName, { movements, blocksRemoved }) =>
    set({
      players: get().players.map((player) =>
        player.name === playerName
          ? {
              ...player,
              movements: movements ? movements : player.movements,
              blocksRemoved: blocksRemoved ? blocksRemoved : player.blocksRemoved,
            }
          : player
      ),
    }),
  setPlayerTurn: (currentPlayerTurn) =>
    set((state) => {
      const playerTurn = currentPlayerTurn === 0 ? 1 : 0;
      return { ...state, playerTurn };
    }),
  setAWinner: () =>
    set((state) => {
      const players = structuredClone(state.players);
      const table = structuredClone(state.tableboard);
      let trappedPlayer: null | Player = null;
      let winner: null | Player = null;
      players.forEach((player) => {
        const playerMovements = player.posibleMovements.map((mov) =>
          mov.split(":").map((v) => Number(v))
        );
        if (!playerHasValidMovements(table, playerMovements)) trappedPlayer = player;
      });
      if (trappedPlayer) {
        winner = players.filter((player) => player.name !== trappedPlayer!.name)[0];
      }
      return { ...state, winner };
    }),
  setHoleInBlock: (column, row) =>
    set((state) => {
      const table = structuredClone(state.tableboard);
      table[column][row].status = "removed";
      const emptyBlocksIndexes = updatedEmptyBlocksIndexes(state.emptyBlocksIndexes, {
        removePosition: [column, row],
      });
      return {
        ...state,
        tableboard: table,
        emptyBlocksIndexes,
      };
    }),
  setModifiers: (modifiers) =>
    set((state) => {
      const modifiersClone = structuredClone(state.modifiers);
      Object.keys(modifiersClone).forEach((key) => {
        if (modifiers.includes(key)) {
          modifiersClone[key as ModifierKeys].isActive = true;
        } else {
          modifiersClone[key as ModifierKeys].isActive = false;
        }
      });
      return { ...state, modifiers: modifiersClone };
    }),
  startGame: () =>
    set((state) => {
      let players = structuredClone(state.players);
      let maxHoleToRemove = 1;
      let maxMovements = 1;
      if (state.modifiers["two-holes"].isActive) {
        players = players.map((player) => ({ ...player, removeHolePerTurn: 2 }));
        maxHoleToRemove = 2;
      }
      if (state.modifiers["two-movements"].isActive) {
        players = players.map((player) => ({ ...player, maxMovements: 2 }));
        maxMovements = 2;
      }
      return { ...state, status: "playing", maxHoleToRemove, players, maxMovements };
    }),
  resetGame: () =>
    set({
      players: resetPlayers(initPlayers),
      status: "starting",
      tableboard: newBoard(tableSize, tableSize),
      winner: null,
      playerTurn: 0,
      maxHoleToRemove: 1,
      emptyBlocksIndexes: createEmptyBlocksIndexes(tableSize),
    }),
}));

function newBoard(columns: number, rows: number): Block[][] {
  return new Array(columns).fill(null).map((_, i) =>
    new Array(rows).fill(null).map((_, k) => {
      const block: Block = {
        status: "empty",
        position: [i, k],
      };
      return block;
    })
  );
}

function createEmptyBlocksIndexes(tableSize: number): string[] {
  const emptyBlocksIndexes: string[] = [];
  for (let i = 0; i < tableSize; i++) {
    for (let k = 0; k < tableSize; k++) {
      emptyBlocksIndexes.push(`${i}:${k}`);
    }
  }
  return emptyBlocksIndexes.slice(1, -1);
}

function updatedEmptyBlocksIndexes(
  tablePositions: string[],
  positions: { addPosition?: [number, number]; removePosition?: [number, number] }
): string[] {
  const { addPosition, removePosition } = positions;
  let updatePositions: string[] = [];
  if (removePosition) {
    const removePositionString = `${removePosition[0]}:${removePosition[1]}`;
    updatePositions = tablePositions.filter((position) => position !== removePositionString);
  }
  if (addPosition) {
    const addPositionString = `${addPosition[0]}:${addPosition[1]}`;
    updatePositions.push(addPositionString);
  }
  return updatePositions;
}

function playerHasValidMovements(table: Block[][], playerMovements: number[][]): boolean {
  const validateMovement: boolean[] = [];
  playerMovements.forEach((pos) => {
    const [column, row] = pos;
    if (table[column][row].status === "empty") {
      validateMovement.push(true);
    } else {
      validateMovement.push(false);
    }
  });
  return !validateMovement.every((v) => v === false);
}

function resetPlayers(players: Player[]): Player[] {
  return players.map((player) => ({
    ...player,
    posibleMovements: posibleMovements(
      newBoard(15, 15),
      player.position.split(":").map((value) => Number(value))
    ),
  }));
}

function posibleMovements(table: Block[][], currentPos: number[]): string[] {
  const movements: string[] = [];
  const c = currentPos[0];
  const r = currentPos[1];
  if (table[c + 1]?.[r]) movements.push(`${c + 1}:${r}`);
  if (table[c + 1]?.[r + 1]) movements.push(`${c + 1}:${r + 1}`);
  if (table[c + 1]?.[r - 1]) movements.push(`${c + 1}:${r - 1}`);
  if (table[c - 1]?.[r]) movements.push(`${c - 1}:${r}`);
  if (table[c - 1]?.[r + 1]) movements.push(`${c - 1}:${r + 1}`);
  if (table[c - 1]?.[r - 1]) movements.push(`${c - 1}:${r - 1}`);
  if (table[c]?.[r + 1]) movements.push(`${c}:${r + 1}`);
  if (table[c]?.[r - 1]) movements.push(`${c}:${r - 1}`);
  return movements;
}
