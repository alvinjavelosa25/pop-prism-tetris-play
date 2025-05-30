import React, { useState, useEffect, useCallback } from 'react';
import { GameState, MoveDirection } from '@/types/tetris';
import { BOARD_WIDTH, BOARD_HEIGHT } from '@/constants/tetris';
import { 
  createRandomPiece, 
  rotatePiece, 
  isValidPosition, 
  placePiece, 
  clearLines 
} from '@/utils/tetrisUtils';
import HoldPanel from '@/components/HoldPanel';
import StatisticsPanel from '@/components/StatisticsPanel';
import ScorePanel from '@/components/ScorePanel';
import NextPiecesPanel from '@/components/NextPiecesPanel';
import ControlsPanel from '@/components/ControlsPanel';
import GameBoard from '@/components/GameBoard';
import MobileControls from '@/components/MobileControls';
import { useIsMobile } from '@/hooks/use-mobile';

const TetrisGame = () => {
  const isMobile = useIsMobile();
  
  const [gameState, setGameState] = useState<GameState>({
    board: Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)),
    currentPiece: null,
    nextPieces: [],
    heldPiece: null,
    canHold: true,
    score: 0,
    level: 1,
    lines: 0,
    gameOver: false,
    paused: false,
    piecesDropped: 0,
    gameTime: 0,
    startTime: null
  });

  const holdPiece = useCallback(() => {
    if (!gameState.canHold || !gameState.currentPiece || gameState.gameOver || gameState.paused) return;

    setGameState(prev => {
      const currentPiece = prev.currentPiece!;
      const heldPiece = prev.heldPiece;
      
      if (heldPiece) {
        // Swap current and held piece
        return {
          ...prev,
          currentPiece: { ...heldPiece, x: Math.floor(BOARD_WIDTH / 2) - Math.floor(heldPiece.shape[0].length / 2), y: 0 },
          heldPiece: { ...currentPiece, x: 0, y: 0 },
          canHold: false
        };
      } else {
        // Move current piece to hold and get next piece
        const newCurrent = prev.nextPieces[0];
        const newNextPieces = [...prev.nextPieces.slice(1), createRandomPiece()];
        
        return {
          ...prev,
          currentPiece: { ...newCurrent, x: Math.floor(BOARD_WIDTH / 2) - Math.floor(newCurrent.shape[0].length / 2), y: 0 },
          nextPieces: newNextPieces,
          heldPiece: { ...currentPiece, x: 0, y: 0 },
          canHold: false
        };
      }
    });
  }, [gameState.canHold, gameState.currentPiece, gameState.gameOver, gameState.paused]);

  const movePiece = useCallback((direction: MoveDirection) => {
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
        
        const nextPiece = prev.nextPieces[0];
        const newNextPieces = [...prev.nextPieces.slice(1), createRandomPiece()];
        const gameOver = !isValidPosition(nextPiece, clearedBoard);
        
        return {
          ...prev,
          board: clearedBoard,
          currentPiece: gameOver ? prev.currentPiece : nextPiece,
          nextPieces: newNextPieces,
          score: newScore,
          level: newLevel,
          lines: newLines,
          gameOver,
          piecesDropped: prev.piecesDropped + 1,
          canHold: true
        };
      }
      
      return prev;
    });
  }, [gameState.gameOver, gameState.paused, gameState.currentPiece]);

  const startGame = useCallback(() => {
    const initialPieces = Array(5).fill(null).map(() => createRandomPiece());
    
    setGameState({
      board: Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)),
      currentPiece: initialPieces[0],
      nextPieces: initialPieces.slice(1),
      heldPiece: null,
      canHold: true,
      score: 0,
      level: 1,
      lines: 0,
      gameOver: false,
      paused: false,
      piecesDropped: 0,
      gameTime: 0,
      startTime: Date.now()
    });
  }, []);

  const togglePause = () => {
    setGameState(prev => ({ ...prev, paused: !prev.paused }));
  };

  // Game timer
  useEffect(() => {
    if (gameState.gameOver || gameState.paused || !gameState.startTime) return;

    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        gameTime: Math.floor((Date.now() - prev.startTime!) / 1000)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.gameOver, gameState.paused, gameState.startTime]);

  // Game loop
  useEffect(() => {
    if (gameState.gameOver || gameState.paused || !gameState.currentPiece) return;

    const dropInterval = Math.max(50, 1000 - (gameState.level - 1) * 100);
    const timer = setInterval(() => {
      movePiece('down');
    }, dropInterval);

    return () => clearInterval(timer);
  }, [gameState.level, gameState.gameOver, gameState.paused, gameState.currentPiece, movePiece]);

  // Enhanced keyboard controls
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
        case 'c':
        case 'C':
          event.preventDefault();
          holdPiece();
          break;
        case 'p':
        case 'P':
          togglePause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePiece, holdPiece]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen">
      {/* Mobile Top Info Bar */}
      {isMobile && (
        <div className="flex gap-2 justify-between">
          <div className="flex-1">
            <ScorePanel 
              score={gameState.score}
              level={gameState.level}
              lines={gameState.lines}
            />
          </div>
          <div className="w-24">
            <HoldPanel heldPiece={gameState.heldPiece} />
          </div>
        </div>
      )}

      {/* Main Game Area */}
      <div className="flex flex-col lg:flex-row gap-4 justify-center items-start">
        {/* Desktop Left Panel */}
        {!isMobile && (
          <div className="flex flex-col gap-4 w-64">
            <HoldPanel heldPiece={gameState.heldPiece} />
            <StatisticsPanel 
              gameTime={gameState.gameTime}
              piecesDropped={gameState.piecesDropped}
              lines={gameState.lines}
            />
          </div>
        )}

        {/* Game Board - Centered */}
        <div className="flex flex-col items-center gap-4">
          <GameBoard 
            gameState={gameState}
            onStartGame={startGame}
            onTogglePause={togglePause}
          />
          
          {/* Mobile Controls Below Board */}
          {isMobile && (
            <MobileControls
              gameOver={gameState.gameOver}
              paused={gameState.paused}
              canHold={gameState.canHold}
              currentPiece={gameState.currentPiece}
              onMove={movePiece}
              onHold={holdPiece}
              onTogglePause={togglePause}
              onStartGame={startGame}
            />
          )}
        </div>

        {/* Desktop Right Panel */}
        {!isMobile && (
          <div className="flex flex-col gap-4 w-64">
            <ScorePanel 
              score={gameState.score}
              level={gameState.level}
              lines={gameState.lines}
            />
            <NextPiecesPanel nextPieces={gameState.nextPieces} />
            <ControlsPanel 
              gameOver={gameState.gameOver}
              paused={gameState.paused}
              canHold={gameState.canHold}
              currentPiece={gameState.currentPiece}
              onMove={movePiece}
              onHold={holdPiece}
              onTogglePause={togglePause}
              onStartGame={startGame}
            />
          </div>
        )}
      </div>

      {/* Mobile Bottom Panel */}
      {isMobile && (
        <div className="flex gap-2">
          <div className="flex-1">
            <NextPiecesPanel nextPieces={gameState.nextPieces} />
          </div>
          <div className="flex-1">
            <StatisticsPanel 
              gameTime={gameState.gameTime}
              piecesDropped={gameState.piecesDropped}
              lines={gameState.lines}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TetrisGame;
