
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
          className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-300 hover:text-cyan-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMove('right')}
          className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-300 hover:text-cyan-100 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMove('down')}
          className="border-yellow-400/50 text-yellow-300 hover:bg-yellow-500/20 hover:border-yellow-300 hover:text-yellow-100 transition-colors"
        >
          <ArrowDown className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMove('rotate')}
          className="border-green-400/50 text-green-300 hover:bg-green-500/20 hover:border-green-300 hover:text-green-100 transition-colors"
        >
          <RotateCw className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onHold}
          className="w-full border-orange-400/50 text-orange-300 hover:bg-orange-500/20 hover:border-orange-300 hover:text-orange-100 transition-colors"
          disabled={!canHold || gameOver}
        >
          Hold (C)
        </Button>
        
        {!currentPiece ? (
          <Button onClick={onStartGame} className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20">
            Start Game
          </Button>
        ) : (
          <Button 
            onClick={onTogglePause} 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20"
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
