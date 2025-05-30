
export interface GamePiece {
  shape: number[][];
  color: string;
  x: number;
  y: number;
}

export interface GameState {
  board: (string | null)[][];
  currentPiece: GamePiece | null;
  nextPieces: GamePiece[];
  heldPiece: GamePiece | null;
  canHold: boolean;
  score: number;
  level: number;
  lines: number;
  gameOver: boolean;
  paused: boolean;
  piecesDropped: number;
  gameTime: number;
  startTime: number | null;
}

export type MoveDirection = 'left' | 'right' | 'down' | 'rotate';
