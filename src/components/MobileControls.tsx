
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pause, Play, RotateCw, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { MoveDirection } from '@/types/tetris';
import { useRef, useCallback } from 'react';

interface MobileControlsProps {
  gameOver: boolean;
  paused: boolean;
  canHold: boolean;
  currentPiece: any;
  onMove: (direction: MoveDirection) => void;
  onHold: () => void;
  onTogglePause: () => void;
  onStartGame: () => void;
}

const MobileControls = ({ 
  gameOver, 
  paused, 
  canHold, 
  currentPiece, 
  onMove, 
  onHold, 
  onTogglePause, 
  onStartGame 
}: MobileControlsProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = useCallback((direction: MoveDirection) => {
    if (gameOver || paused) return;
    
    // Immediate move
    onMove(direction);
    
    // Start continuous movement for left, right, and down
    if (direction === 'left' || direction === 'right' || direction === 'down') {
      intervalRef.current = setInterval(() => {
        onMove(direction);
      }, 120); // Slightly faster for mobile
    }
  }, [onMove, gameOver, paused]);

  const handleTouchEnd = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleMouseDown = useCallback((direction: MoveDirection) => {
    handleTouchStart(direction);
  }, [handleTouchStart]);

  const handleMouseUp = useCallback(() => {
    handleTouchEnd();
  }, [handleTouchEnd]);

  return (
    <Card className="p-4 bg-black/50 backdrop-blur-sm border-purple-500/30 text-white w-full max-w-md">
      {/* Game Control Buttons */}
      <div className="flex gap-2 mb-4">
        {!currentPiece ? (
          <Button 
            onClick={onStartGame} 
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white shadow-lg shadow-cyan-600/20 h-12 text-lg transition-all duration-150"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Game
          </Button>
        ) : (
          <>
            <Button 
              onClick={onTogglePause} 
              className="flex-1 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white shadow-lg shadow-cyan-600/20 h-12 transition-all duration-150"
              disabled={gameOver}
            >
              {paused ? (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              )}
            </Button>
            <Button
              onClick={onHold}
              className="flex-1 border-orange-400 bg-orange-600 text-white hover:bg-orange-500 hover:border-orange-300 active:bg-orange-700 transition-all duration-150 h-12 shadow-lg shadow-orange-600/20"
              variant="outline"
              disabled={!canHold || gameOver}
            >
              Hold
            </Button>
          </>
        )}
      </div>

      {/* Movement Controls */}
      <div className="grid grid-cols-3 gap-3">
        {/* Top Row - Rotate */}
        <div></div>
        <Button
          variant="outline"
          size="lg"
          onClick={() => onMove('rotate')}
          className="border-purple-400 bg-purple-600 text-white hover:bg-purple-500 hover:border-purple-300 active:bg-purple-700 transition-all duration-150 h-16 w-full shadow-lg shadow-purple-600/20"
          disabled={gameOver || paused}
        >
          <RotateCw className="w-6 h-6" />
        </Button>
        <div></div>

        {/* Middle Row - Left, Down, Right */}
        <Button
          variant="outline"
          size="lg"
          onTouchStart={() => handleTouchStart('left')}
          onTouchEnd={handleTouchEnd}
          onMouseDown={() => handleMouseDown('left')}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="border-blue-400 bg-blue-600 text-white hover:bg-blue-500 hover:border-blue-300 active:bg-blue-700 transition-all duration-150 h-16 w-full shadow-lg shadow-blue-600/20"
          disabled={gameOver || paused}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onTouchStart={() => handleTouchStart('down')}
          onTouchEnd={handleTouchEnd}
          onMouseDown={() => handleMouseDown('down')}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="border-green-400 bg-green-600 text-white hover:bg-green-500 hover:border-green-300 active:bg-green-700 transition-all duration-150 h-16 w-full shadow-lg shadow-green-600/20"
          disabled={gameOver || paused}
        >
          <ArrowDown className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onTouchStart={() => handleTouchStart('right')}
          onTouchEnd={handleTouchEnd}
          onMouseDown={() => handleMouseDown('right')}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="border-blue-400 bg-blue-600 text-white hover:bg-blue-500 hover:border-blue-300 active:bg-blue-700 transition-all duration-150 h-16 w-full shadow-lg shadow-blue-600/20"
          disabled={gameOver || paused}
        >
          <ArrowRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Instruction Text */}
      <div className="mt-3 text-xs text-gray-400 text-center">
        <p>Hold buttons for continuous movement</p>
      </div>
    </Card>
  );
};

export default MobileControls;
