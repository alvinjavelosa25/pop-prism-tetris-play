
import { Card } from '@/components/ui/card';

interface ScorePanelProps {
  score: number;
  level: number;
  lines: number;
}

const ScorePanel = ({ score, level, lines }: ScorePanelProps) => {
  return (
    <Card className="p-4 bg-black/50 backdrop-blur-sm border-purple-500/30 text-white">
      <h2 className="text-lg font-bold mb-3 text-purple-300">Score</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Score:</span>
          <span className="font-bold text-yellow-400">{score.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Level:</span>
          <span className="font-bold text-green-400">{level}</span>
        </div>
        <div className="flex justify-between">
          <span>Lines:</span>
          <span className="font-bold text-blue-400">{lines}</span>
        </div>
      </div>
    </Card>
  );
};

export default ScorePanel;
