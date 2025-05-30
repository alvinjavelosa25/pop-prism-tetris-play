
import { Card } from '@/components/ui/card';
import { GamePiece } from '@/types/tetris';
import { useIsMobile } from '@/hooks/use-mobile';

interface HoldPanelProps {
  heldPiece: GamePiece | null;
}

const HoldPanel = ({ heldPiece }: HoldPanelProps) => {
  const isMobile = useIsMobile();
  
  const renderPiece = () => {
    if (!heldPiece) {
      return (
        <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} border-2 border-dashed border-gray-600 rounded flex items-center justify-center`}>
          <span className="text-gray-500 text-xs">Empty</span>
        </div>
      );
    }

    const cellSize = isMobile ? 'w-3 h-3' : 'w-4 h-4';
    
    return (
      <div className="grid gap-0">
        {heldPiece.shape.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <div
                key={x}
                className={`${cellSize} ${
                  cell ? `${heldPiece.color} border border-white/20` : ''
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className={`${isMobile ? 'p-2' : 'p-4'} bg-black/50 backdrop-blur-sm border-purple-500/30 text-white`}>
      <h2 className={`${isMobile ? 'text-sm' : 'text-lg'} font-bold ${isMobile ? 'mb-1' : 'mb-3'} text-purple-300`}>Hold</h2>
      <div className="flex justify-center">
        {renderPiece()}
      </div>
    </Card>
  );
};

export default HoldPanel;
