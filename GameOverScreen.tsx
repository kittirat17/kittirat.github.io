import React from 'react';
import type { UserInfo } from '../types';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  userInfo: UserInfo | null;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart, userInfo }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-400">สิ้นสุดการฝึกซ้อม</h1>
      {userInfo ? (
        <p className="text-2xl md:text-3xl mt-4 text-white">
          ผลคะแนนของ {userInfo.firstName} {userInfo.lastName}
        </p>
      ) : (
        <h2 className="text-2xl md:text-3xl mt-2 text-gray-300">(Training Ended)</h2>
      )}
      
      <div className="mt-12 bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm">
        {userInfo && (
            <p className="text-lg text-gray-400 mb-4">
                ชั้น {userInfo.userClass} | เลขที่ {userInfo.userNumber}
            </p>
        )}
        <p className="text-2xl text-gray-400">คะแนนรวมของคุณ</p>
        <p className="text-7xl sm:text-8xl font-bold text-white my-4">{score}</p>
        <p className="text-2xl text-gray-400">Total Score</p>
      </div>

      <button
        onClick={onRestart}
        className="mt-12 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-lg text-2xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-red-500/50"
      >
        ฝึกซ้อมอีกครั้ง (Train Again)
      </button>
    </div>
  );
};

export default GameOverScreen;
