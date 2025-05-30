
import { Card } from '@/components/ui/card';
import { GamePiece } from '@/types/tetris';

interface NextPiecesPanelProps {
  nextPieces: GamePiece[];
}

const NextPiecesPanel = ({ nextPieces }: NextPiecesPanelProps) => {
  const renderPiece = (piece: GamePiece, size: string = 'w-4 h-4') => {
    return piece.shape.map((row, y) => (
      <div key={y} className="flex justify-center">
        {row.map((cell, x) => (
          <div
            key={x}
            className={`${size} border ${
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
      <h2 className="text-lg font-bold mb-3 text-purple-300">Next</h2>
      <div className="space-y-3">
        {nextPieces.slice(0, 4).map((piece, index) => (
          <div key={index} className="flex justify-center">
            <div className="grid gap-1">
              {renderPiece(piece, index === 0 ? 'w-5 h-5' : 'w-4 h-4')}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NextPiecesPanel;
