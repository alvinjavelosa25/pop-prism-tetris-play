
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

interface StatisticsPanelProps {
  gameTime: number;
  piecesDropped: number;
  lines: number;
}

const StatisticsPanel = ({ gameTime, piecesDropped, lines }: StatisticsPanelProps) => {
  const isMobile = useIsMobile();
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={`${isMobile ? 'p-3' : 'p-4'} bg-black/50 backdrop-blur-sm border-purple-500/30 text-white`}>
      <h2 className={`${isMobile ? 'text-base' : 'text-lg'} font-bold ${isMobile ? 'mb-2' : 'mb-3'} text-purple-300`}>Stats</h2>
      <div className={`${isMobile ? 'space-y-1' : 'space-y-2'}`}>
        <div className="flex justify-between">
          <span className={isMobile ? 'text-sm' : ''}>Time:</span>
          <span className={`font-bold text-cyan-400 ${isMobile ? 'text-sm' : ''}`}>{formatTime(gameTime)}</span>
        </div>
        <div className="flex justify-between">
          <span className={isMobile ? 'text-sm' : ''}>Pieces:</span>
          <span className={`font-bold text-green-400 ${isMobile ? 'text-sm' : ''}`}>{piecesDropped}</span>
        </div>
        {!isMobile && (
          <div className="flex justify-between">
            <span>Lines:</span>
            <span className="font-bold text-blue-400">{lines}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatisticsPanel;
