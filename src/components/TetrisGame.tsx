
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pause, Play, RotateCw, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

// Tetris piece shapes
const TETROMINOES = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: 'bg-cyan-400'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 'bg-yellow-400'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: 'bg-purple-400'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: 'bg-green-400'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: 'bg-red-400'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: 'bg-blue-400'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: 'bg-orange-400'
  }
};

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

interface GamePiece {
  shape: number[][];
  color: string;
  x: number;
  y: number;
}

interface GameState {
  board: (string | null)[][];
  currentPiece: GamePiece | null;
  nextPiece: GamePiece | null;
  score: number;
  level: number;
  lines: number;
  gameOver: boolean;
  paused: boolean;
}

const TetrisGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)),
    currentPiece: null,
    nextPiece: null,
    score: 0,
    level: 1,
    lines: 0,
    gameOver: false,
    paused: false
  });

  const createRandomPiece = useCallback((): GamePiece => {
    const pieces = Object.keys(TETROMINOES);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)] as keyof typeof TETROMINOES;
    const tetromino = TETROMINOES[randomPiece];
    
    return {
      shape: tetromino.shape,
      color: tetromino.color,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(tetromino.shape[0].length / 2),
      y: 0
    };
  }, []);

  const rotatePiece = (piece: GamePiece): GamePiece => {
    const rotated = piece.shape[0].map((_, index) =>
      piece.shape.map(row => row[index]).reverse()
    );
    return { ...piece, shape: rotated };
  };

  const isValidPosition = useCallback((piece: GamePiece, board: (string | null)[][]): boolean => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = piece.x + x;
          const newY = piece.y + y;
          
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return false;
          }
          
          if (newY >= 0 && board[newY][newX]) {
            return false;
          }
        }
      }
    }
    return true;
  }, []);

  const placePiece = useCallback((piece: GamePiece, board: (string | null)[][]): (string | null)[][] => {
    const newBoard = board.map(row => [...row]);
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardY = piece.y + y;
          const boardX = piece.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = piece.color;
          }
        }
      }
    }
    
    return newBoard;
  }, []);

  const clearLines = useCallback((board: (string | null)[][]): { newBoard: (string | null)[][]; linesCleared: number } => {
    const newBoard = board.filter(row => row.some(cell => cell === null));
    const linesCleared = BOARD_HEIGHT - newBoard.length;
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(null));
    }
    
    return { newBoard, linesCleared };
  }, []);

  const movePiece = useCallback((direction: 'left' | 'right' | 'down' | 'rotate') => {
    if (gameState.gameOver || gameState.paused || !gameState.currentPiece) return;

    setGameState(prev => {
      let newPiece = { ...prev.currentPiece! };
      
      switch (direction) {
        case 'left':
          newPiece.x--;
          break;
        case 'right':
          newPiece.x++;
          break;
        case 'down':
          newPiece.y++;
          break;
        case 'rotate':
          newPiece = rotatePiece(newPiece);
          break;
      }

      if (isValidPosition(newPiece, prev.board)) {
        return { ...prev, currentPiece: newPiece };
      } else if (direction === 'down') {
        // Piece can't move down, place it
        const newBoard = placePiece(prev.currentPiece!, prev.board);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        
        const newScore = prev.score + (linesCleared * 100 * prev.level);
        const newLines = prev.lines + linesCleared;
        const newLevel = Math.floor(newLines / 10) + 1;
        
        const nextPiece = createRandomPiece();
        const gameOver = !isValidPosition(nextPiece, clearedBoard);
        
        return {
          ...prev,
          board: clearedBoard,
          currentPiece: prev.nextPiece,
          nextPiece: gameOver ? prev.nextPiece : createRandomPiece(),
          score: newScore,
          level: newLevel,
          lines: newLines,
          gameOver
        };
      }
      
      return prev;
    });
  }, [gameState.gameOver, gameState.paused, gameState.currentPiece, isValidPosition, placePiece, clearLines, createRandomPiece]);

  const startGame = useCallback(() => {
    const firstPiece = createRandomPiece();
    const secondPiece = createRandomPiece();
    
    setGameState({
      board: Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)),
      currentPiece: firstPiece,
      nextPiece: secondPiece,
      score: 0,
      level: 1,
      lines: 0,
      gameOver: false,
      paused: false
    });
  }, [createRandomPiece]);

  const togglePause = () => {
    setGameState(prev => ({ ...prev, paused: !prev.paused }));
  };

  // Game loop
  useEffect(() => {
    if (gameState.gameOver || gameState.paused || !gameState.currentPiece) return;

    const dropInterval = Math.max(50, 1000 - (gameState.level - 1) * 100);
    const timer = setInterval(() => {
      movePiece('down');
    }, dropInterval);

    return () => clearInterval(timer);
  }, [gameState.level, gameState.gameOver, gameState.paused, gameState.currentPiece, movePiece]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          movePiece('left');
          break;
        case 'ArrowRight':
          event.preventDefault();
          movePiece('right');
          break;
        case 'ArrowDown':
          event.preventDefault();
          movePiece('down');
          break;
        case 'ArrowUp':
        case ' ':
          event.preventDefault();
          movePiece('rotate');
          break;
        case 'p':
        case 'P':
          togglePause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePiece]);

  const renderBoard = () => {
    const displayBoard = gameState.board.map(row => [...row]);
    
    // Add current piece to display board
    if (gameState.currentPiece) {
      for (let y = 0; y < gameState.currentPiece.shape.length; y++) {
        for (let x = 0; x < gameState.currentPiece.shape[y].length; x++) {
          if (gameState.currentPiece.shape[y][x]) {
            const boardY = gameState.currentPiece.y + y;
            const boardX = gameState.currentPiece.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = gameState.currentPiece.color;
            }
          }
        }
      }
    }

    return displayBoard.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={x}
            className={`w-8 h-8 border border-gray-700 transition-all duration-200 ${
              cell 
                ? `${cell} shadow-lg border-white/30 animate-pulse` 
                : 'bg-gray-900'
            }`}
            style={{
              boxShadow: cell ? '0 0 10px rgba(255,255,255,0.3), inset 0 0 10px rgba(255,255,255,0.1)' : 'none'
            }}
          />
        ))}
      </div>
    ));
  };

  const renderNextPiece = () => {
    if (!gameState.nextPiece) return null;

    return gameState.nextPiece.shape.map((row, y) => (
      <div key={y} className="flex justify-center">
        {row.map((cell, x) => (
          <div
            key={x}
            className={`w-6 h-6 border ${
              cell 
                ? `${gameState.nextPiece!.color} border-white/30 shadow-md` 
                : 'border-transparent'
            }`}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen">
      {/* Game Board */}
      <Card className="p-6 bg-black/50 backdrop-blur-sm border-purple-500/30">
        <div className="relative">
          {gameState.gameOver && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 rounded-lg">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-red-400 mb-4">Game Over!</h2>
                <p className="text-white mb-4">Final Score: {gameState.score}</p>
                <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700">
                  Play Again
                </Button>
              </div>
            </div>
          )}
          
          {gameState.paused && !gameState.gameOver && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 rounded-lg">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-yellow-400 mb-4">Paused</h2>
                <Button onClick={togglePause} className="bg-purple-600 hover:bg-purple-700">
                  <Play className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </div>
            </div>
          )}
          
          <div className="grid grid-rows-20 gap-0 border-2 border-purple-500/50 rounded-lg overflow-hidden">
            {renderBoard()}
          </div>
        </div>
      </Card>

      {/* Side Panel */}
      <div className="flex flex-col gap-4">
        {/* Score Panel */}
        <Card className="p-6 bg-black/50 backdrop-blur-sm border-purple-500/30 text-white">
          <h2 className="text-xl font-bold mb-4 text-purple-300">Stats</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Score:</span>
              <span className="font-bold text-yellow-400">{gameState.score.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Level:</span>
              <span className="font-bold text-green-400">{gameState.level}</span>
            </div>
            <div className="flex justify-between">
              <span>Lines:</span>
              <span className="font-bold text-blue-400">{gameState.lines}</span>
            </div>
          </div>
        </Card>

        {/* Next Piece */}
        <Card className="p-6 bg-black/50 backdrop-blur-sm border-purple-500/30 text-white">
          <h2 className="text-xl font-bold mb-4 text-purple-300">Next</h2>
          <div className="flex justify-center">
            <div className="grid gap-1">
              {renderNextPiece()}
            </div>
          </div>
        </Card>

        {/* Controls */}
        <Card className="p-6 bg-black/50 backdrop-blur-sm border-purple-500/30 text-white">
          <h2 className="text-xl font-bold mb-4 text-purple-300">Controls</h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => movePiece('left')}
              className="border-purple-500/50 text-white hover:bg-purple-600/20"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => movePiece('right')}
              className="border-purple-500/50 text-white hover:bg-purple-600/20"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => movePiece('down')}
              className="border-purple-500/50 text-white hover:bg-purple-600/20"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => movePiece('rotate')}
              className="border-purple-500/50 text-white hover:bg-purple-600/20"
            >
              <RotateCw className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {!gameState.currentPiece ? (
              <Button onClick={startGame} className="w-full bg-green-600 hover:bg-green-700">
                Start Game
              </Button>
            ) : (
              <Button 
                onClick={togglePause} 
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={gameState.gameOver}
              >
                {gameState.paused ? (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                )}
              </Button>
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-400">
            <p>Use arrow keys to move</p>
            <p>Up arrow or Space to rotate</p>
            <p>P to pause</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TetrisGame;
