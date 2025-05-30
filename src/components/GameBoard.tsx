
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { GameState } from '@/types/tetris';
import { BOARD_WIDTH, BOARD_HEIGHT } from '@/constants/tetris';

interface GameBoardProps {
  gameState: GameState;
  onStartGame: () => void;
  onTogglePause: () => void;
}

const GameBoard = ({ gameState, onStartGame, onTogglePause }: GameBoardProps) => {
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

  return (
    <Card className="p-6 bg-black/50 backdrop-blur-sm border-purple-500/30 flex-shrink-0">
      <div className="relative">
        {gameState.gameOver && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 rounded-lg">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-red-400 mb-4">Game Over!</h2>
              <p className="text-white mb-4">Final Score: {gameState.score}</p>
              <Button onClick={onStartGame} className="bg-purple-600 hover:bg-purple-700">
                Play Again
              </Button>
            </div>
          </div>
        )}
        
        {gameState.paused && !gameState.gameOver && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 rounded-lg">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-yellow-400 mb-4">Paused</h2>
              <Button onClick={onTogglePause} className="bg-purple-600 hover:bg-purple-700">
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
  );
};

export default GameBoard;
