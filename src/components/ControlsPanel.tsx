
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
          className="border-purple-500/50 text-white hover:bg-purple-600/20"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMove('right')}
          className="border-purple-500/50 text-white hover:bg-purple-600/20"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMove('down')}
          className="border-purple-500/50 text-white hover:bg-purple-600/20"
        >
          <ArrowDown className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMove('rotate')}
          className="border-purple-500/50 text-white hover:bg-purple-600/20"
        >
          <RotateCw className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onHold}
          className="w-full border-purple-500/50 text-white hover:bg-purple-600/20"
          disabled={!canHold || gameOver}
        >
          Hold (C)
        </Button>
        
        {!currentPiece ? (
          <Button onClick={onStartGame} className="w-full bg-green-600 hover:bg-green-700">
            Start Game
          </Button>
        ) : (
          <Button 
            onClick={onTogglePause} 
            className="w-full bg-purple-600 hover:bg-purple-700"
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
