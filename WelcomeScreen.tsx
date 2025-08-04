import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in">
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-yellow-400 tracking-wider">
        KITA Muaythai Stations
      </h1>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl mt-4 text-red-500 font-semibold">
        สถานีฝึกมวยไทย
      </h2>
      <p className="mt-8 text-lg md:text-xl max-w-lg text-gray-300">
        เตรียมตัวให้พร้อม! แสดงท่าอาวุธมวยไทยตามคำสั่งให้ถูกต้องเพื่อทำคะแนน
        (Get ready! Perform the correct Muay Thai stance on command to score points.)
      </p>
      <button
        onClick={onStart}
        className="mt-12 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-lg text-xl sm:text-2xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-red-500/50"
      >
        เริ่มฝึกซ้อม (Start)
      </button>
    </div>
  );
};

export default WelcomeScreen;
