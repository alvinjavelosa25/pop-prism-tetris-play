
import { Card } from '@/components/ui/card';
import { GamePiece } from '@/types/tetris';
import { useIsMobile } from '@/hooks/use-mobile';

interface NextPiecesPanelProps {
  nextPieces: GamePiece[];
}

const NextPiecesPanel = ({ nextPieces }: NextPiecesPanelProps) => {
  const isMobile = useIsMobile();
  
  const renderPiece = (piece: GamePiece, index: number) => {
    const cellSize = isMobile ? 'w-2 h-2' : 'w-3 h-3';
    const isFirst = index === 0;
    
    return (
      <div key={index} className={`${isMobile && !isFirst ? 'opacity-60' : ''}`}>
        <div className="grid gap-0">
          {piece.shape.map((row, y) => (
            <div key={y} className="flex">
              {row.map((cell, x) => (
                <div
                  key={x}
                  className={`${cellSize} ${
                    cell ? `${piece.color} border border-white/20` : ''
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const piecesToShow = isMobile ? nextPieces.slice(0, 3) : nextPieces;

  return (
    <Card className={`${isMobile ? 'p-2' : 'p-4'} bg-black/50 backdrop-blur-sm border-purple-500/30 text-white`}>
      <h2 className={`${isMobile ? 'text-sm' : 'text-lg'} font-bold ${isMobile ? 'mb-1' : 'mb-3'} text-purple-300`}>Next</h2>
      <div className={`${isMobile ? 'flex gap-2 justify-center' : 'space-y-3'}`}>
        {piecesToShow.map((piece, index) => (
          <div key={index} className={isMobile ? '' : 'flex justify-center'}>
            {renderPiece(piece, index)}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NextPiecesPanel;
