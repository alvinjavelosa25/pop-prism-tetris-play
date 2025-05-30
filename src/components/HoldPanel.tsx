
import { Card } from '@/components/ui/card';
import { GamePiece } from '@/types/tetris';

interface HoldPanelProps {
  heldPiece: GamePiece | null;
}

const HoldPanel = ({ heldPiece }: HoldPanelProps) => {
  const renderPiece = (piece: GamePiece | null) => {
    if (!piece) return <div className="text-gray-500 text-center">Empty</div>;

    return piece.shape.map((row, y) => (
      <div key={y} className="flex justify-center">
        {row.map((cell, x) => (
          <div
            key={x}
            className={`w-6 h-6 border ${
              cell 
                ? `${piece.color} border-white/30 shadow-md` 
                : 'border-transparent'
            }`}
          />
        ))}
      </div>
    ));
  };

  return (
    <Card className="p-4 bg-black/50 backdrop-blur-sm border-purple-500/30 text-white">
      <h2 className="text-lg font-bold mb-3 text-purple-300">Hold (C)</h2>
      <div className="flex justify-center min-h-[80px] items-center">
        <div className="grid gap-1">
          {renderPiece(heldPiece)}
        </div>
      </div>
    </Card>
  );
};

export default HoldPanel;
