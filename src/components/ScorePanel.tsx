
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

interface ScorePanelProps {
  score: number;
  level: number;
  lines: number;
}

const ScorePanel = ({ score, level, lines }: ScorePanelProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className={`${isMobile ? 'p-3' : 'p-4'} bg-black/50 backdrop-blur-sm border-purple-500/30 text-white`}>
      <h2 className={`${isMobile ? 'text-base' : 'text-lg'} font-bold ${isMobile ? 'mb-2' : 'mb-3'} text-purple-300`}>Score</h2>
      <div className={`${isMobile ? 'space-y-1' : 'space-y-2'}`}>
        <div className="flex justify-between">
          <span className={isMobile ? 'text-sm' : ''}>Score:</span>
          <span className={`font-bold text-yellow-400 ${isMobile ? 'text-sm' : ''}`}>{score.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className={isMobile ? 'text-sm' : ''}>Level:</span>
          <span className={`font-bold text-green-400 ${isMobile ? 'text-sm' : ''}`}>{level}</span>
        </div>
        <div className="flex justify-between">
          <span className={isMobile ? 'text-sm' : ''}>Lines:</span>
          <span className={`font-bold text-blue-400 ${isMobile ? 'text-sm' : ''}`}>{lines}</span>
        </div>
      </div>
    </Card>
  );
};

export default ScorePanel;
