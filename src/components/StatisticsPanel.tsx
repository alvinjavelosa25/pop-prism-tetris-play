
import { Card } from '@/components/ui/card';
import { formatTime } from '@/utils/tetrisUtils';

interface StatisticsPanelProps {
  gameTime: number;
  piecesDropped: number;
  lines: number;
}

const StatisticsPanel = ({ gameTime, piecesDropped, lines }: StatisticsPanelProps) => {
  return (
    <Card className="p-4 bg-black/50 backdrop-blur-sm border-purple-500/30 text-white">
      <h2 className="text-lg font-bold mb-3 text-purple-300">Statistics</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Time:</span>
          <span className="font-bold text-cyan-400">{formatTime(gameTime)}</span>
        </div>
        <div className="flex justify-between">
          <span>Pieces:</span>
          <span className="font-bold text-green-400">{piecesDropped}</span>
        </div>
        <div className="flex justify-between">
          <span>PPS:</span>
          <span className="font-bold text-orange-400">
            {gameTime > 0 ? (piecesDropped / gameTime).toFixed(1) : '0.0'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>LPM:</span>
          <span className="font-bold text-pink-400">
            {gameTime > 0 ? Math.round((lines * 60) / gameTime) : 0}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default StatisticsPanel;
