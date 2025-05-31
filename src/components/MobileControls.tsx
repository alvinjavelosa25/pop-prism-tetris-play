
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pause, Play, RotateCw, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { MoveDirection } from '@/types/tetris';

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
  return (
    <Card className="p-4 bg-black/50 backdrop-blur-sm border-purple-500/30 text-white w-full max-w-md">
      {/* Game Control Buttons */}
      <div className="flex gap-2 mb-4">
        {!currentPiece ? (
          <Button 
            onClick={onStartGame} 
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white shadow-lg shadow-gray-700/20 h-12 text-lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Game
          </Button>
        ) : (
          <>
            <Button 
              onClick={onTogglePause} 
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white shadow-lg shadow-gray-700/20 h-12"
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
              className="flex-1 border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-colors h-12"
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
          className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-colors h-16 w-full"
          disabled={gameOver || paused}
        >
          <RotateCw className="w-6 h-6" />
        </Button>
        <div></div>

        {/* Middle Row - Left, Down, Right */}
        <Button
          variant="outline"
          size="lg"
          onClick={() => onMove('left')}
          className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-colors h-16 w-full"
          disabled={gameOver || paused}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => onMove('down')}
          className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-colors h-16 w-full"
          disabled={gameOver || paused}
        >
          <ArrowDown className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => onMove('right')}
          className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-colors h-16 w-full"
          disabled={gameOver || paused}
        >
          <ArrowRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Instruction Text */}
      <div className="mt-3 text-xs text-gray-400 text-center">
        <p>Tap buttons to control your piece</p>
      </div>
    </Card>
  );
};

export default MobileControls;
