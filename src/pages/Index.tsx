
import TetrisGame from '@/components/TetrisGame';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Tetris Game
          </h1>
          <p className="text-xl text-gray-300">
            Experience the classic puzzle game with vibrant popout colors!
          </p>
        </div>
        <TetrisGame />
      </div>
    </div>
  );
};

export default Index;
