import React, { useState, useCallback } from 'react';
import { GameState, type UserInfo } from './types';
import LoginScreen from './components/LoginScreen';
import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import ApiKeySetupScreen from './components/ApiKeySetupScreen';
import { isApiKeySet } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Login);
  const [score, setScore] = useState(0);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleLogin = useCallback((info: UserInfo) => {
    setUserInfo(info);
    console.log("User logged in:", info);
    setGameState(GameState.Welcome);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setGameState(GameState.Playing);
  }, []);

  const restartFromGameOver = useCallback(() => {
    setScore(0);
    setGameState(GameState.Welcome);
  }, []);


  const endGame = useCallback((finalScore: number) => {
    setScore(finalScore);
    setGameState(GameState.GameOver);
  }, []);

  if (!isApiKeySet) {
    return (
      <main className="min-h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto">
          <ApiKeySetupScreen />
        </div>
      </main>
    );
  }

  const renderContent = () => {
    switch (gameState) {
      case GameState.Login:
        return <LoginScreen onLogin={handleLogin} />;
      case GameState.Playing:
        return <GameScreen onEndGame={endGame} userInfo={userInfo} />;
      case GameState.GameOver:
        return <GameOverScreen score={score} onRestart={restartFromGameOver} userInfo={userInfo} />;
      case GameState.Welcome:
      default:
        return <WelcomeScreen onStart={startGame} />;
    }
  };

  return (
    <main className="min-h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {renderContent()}
      </div>
    </main>
  );
};

export default App;
