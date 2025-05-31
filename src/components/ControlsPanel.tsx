
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pause, Play, RotateCw, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { MoveDirection } from '@/types/tetris';

interface ControlsPanelProps {
  gameOver: boolean;
  paused: boolean;
  canHold: boolean;
  currentPiece: any;
  onMove: (direction: MoveDirection) => void;
  onHold: () => void;
  onTogglePause: () => void;
  onStartGame: () => void;
}

const ControlsPanel = ({ 
  gameOver, 
  paused, 
  canHold, 
  currentPiece, 
  onMove, 
  onHold, 
  onTogglePause, 
  onStartGame 
}: ControlsPanelProps) => {
  return (
    <Card className="p-4 bg-black/50 backdrop-blur-sm border-purple-500/30 text-white">
      <h2 className="text-lg font-bold mb-3 text-purple-300">Controls</h2>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMove('left')}
          className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMove('right')}
          className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMove('down')}
          className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-colors"
        >
          <ArrowDown className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMove('rotate')}
          className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-colors"
        >
          <RotateCw className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onHold}
          className="w-full border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white transition-colors"
          disabled={!canHold || gameOver}
        >
          Hold (C)
        </Button>
        
        {!currentPiece ? (
          <Button onClick={onStartGame} className="w-full bg-gray-700 hover:bg-gray-600 text-white shadow-lg shadow-gray-700/20">
            Start Game
          </Button>
        ) : (
          <Button 
            onClick={onTogglePause} 
            className="w-full bg-gray-700 hover:bg-gray-600 text-white shadow-lg shadow-gray-700/20"
            disabled={gameOver}
          >
            {paused ? (
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
      
      <div className="mt-4 text-xs text-gray-400">
        <p>Arrow keys: Move/Rotate</p>
        <p>C: Hold piece</p>
        <p>P: Pause</p>
      </div>
    </Card>
  );
};

export default ControlsPanel;
