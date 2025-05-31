
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
          className="border-blue-400 bg-blue-600 text-white hover:bg-blue-500 hover:border-blue-300 active:bg-blue-700 transition-all duration-150 shadow-lg shadow-blue-600/20"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMove('right')}
          className="border-blue-400 bg-blue-600 text-white hover:bg-blue-500 hover:border-blue-300 active:bg-blue-700 transition-all duration-150 shadow-lg shadow-blue-600/20"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMove('down')}
          className="border-green-400 bg-green-600 text-white hover:bg-green-500 hover:border-green-300 active:bg-green-700 transition-all duration-150 shadow-lg shadow-green-600/20"
        >
          <ArrowDown className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMove('rotate')}
          className="border-purple-400 bg-purple-600 text-white hover:bg-purple-500 hover:border-purple-300 active:bg-purple-700 transition-all duration-150 shadow-lg shadow-purple-600/20"
        >
          <RotateCw className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onHold}
          className="w-full border-orange-400 bg-orange-600 text-white hover:bg-orange-500 hover:border-orange-300 active:bg-orange-700 transition-all duration-150 shadow-lg shadow-orange-600/20"
          disabled={!canHold || gameOver}
        >
          Hold (C)
        </Button>
        
        {!currentPiece ? (
          <Button onClick={onStartGame} className="w-full bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white shadow-lg shadow-cyan-600/20 transition-all duration-150">
            Start Game
          </Button>
        ) : (
          <Button 
            onClick={onTogglePause} 
            className="w-full bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white shadow-lg shadow-cyan-600/20 transition-all duration-150"
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
