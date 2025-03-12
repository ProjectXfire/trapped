export type BlockStatus = "empty" | "removed" | "occupied";

export interface Block {
  position: [number, number];
  status: BlockStatus;
}
