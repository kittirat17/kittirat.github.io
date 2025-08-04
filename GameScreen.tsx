import React, { useState, useEffect, useRef, useCallback } from 'react';
import { analyzeImageForPose } from '../services/geminiService';
import type { UserInfo, WeaponInfo } from '../types';
import { WEAPONS, ROUND_DURATION, CAPTURE_TIME, TOTAL_ROUNDS, FEEDBACK_DURATION } from '../constants';
import { CheckCircleIcon, XCircleIcon, CameraIcon } from './icons/FeedbackIcons';

interface GameScreenProps {
  onEndGame: (finalScore: number) => void;
  userInfo: UserInfo | null;
}

type RoundState = 'PROMPTING' | 'CHECKING' | 'FEEDBACK' | 'WAITING';
type Feedback = 'CORRECT' | 'INCORRECT' | null;

const GameScreen: React.FC<GameScreenProps> = ({ onEndGame, userInfo }) => {
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(0); // Start at 0, indicates pre-game
  const [roundState, setRoundState] = useState<RoundState>('WAITING');
  const [currentWeapon, setCurrentWeapon] = useState<WeaponInfo | null>(null);
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanupTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
  };

  const setupCamera = useCallback(async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraReady(true);
          setCameraError(null);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setCameraError("ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการเข้าถึง (Cannot access camera. Please grant permission.)");
        setIsCameraReady(false);
      }
    } else {
      setCameraError("บราวเซอร์ไม่รองรับการใช้งานกล้อง (Camera not supported by this browser.)");
    }
  }, []);

  const startNewRound = useCallback(() => {
    setFeedback(null);
    let newWeapon = currentWeapon;
    // Ensure the new weapon is different from the current one
    while (WEAPONS.length > 1 && newWeapon?.id === currentWeapon?.id) {
      newWeapon = WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
    }
    setCurrentWeapon(newWeapon);
    setTimeLeft(ROUND_DURATION);
    setRoundState('PROMPTING');
  }, [currentWeapon]);

  const captureAndAnalyze = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !currentWeapon) return;

    setRoundState('CHECKING');

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    
    const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];
    
    const isCorrect = await analyzeImageForPose(base64Image, currentWeapon.prompt);
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      setFeedback('CORRECT');
    } else {
      setFeedback('INCORRECT');
    }
    setRoundState('FEEDBACK');
  }, [currentWeapon]);

  // Setup camera on mount
  useEffect(() => {
    setupCamera();
    return () => {
      // Cleanup camera stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      cleanupTimers();
    };
  }, [setupCamera]);
  
  // Start the game once the camera is ready
  useEffect(() => {
    if (isCameraReady && currentRound === 0) {
      setCurrentRound(1);
    }
  }, [isCameraReady, currentRound]);

  // Main game loop driver, triggered by round changes
  useEffect(() => {
    if (currentRound > 0 && currentRound <= TOTAL_ROUNDS) {
      startNewRound();
    } else if (currentRound > TOTAL_ROUNDS) {
      onEndGame(score);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound]);


  // Effect for managing round states (timer, checking, feedback)
  useEffect(() => {
    cleanupTimers();

    if (roundState === 'PROMPTING') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime < CAPTURE_TIME) {
             if (timerRef.current) clearInterval(timerRef.current);
             captureAndAnalyze();
          }
          return newTime > 0 ? newTime : 0;
        });
      }, 1000);
    } else if (roundState === 'FEEDBACK') {
      feedbackTimerRef.current = setTimeout(() => {
        setCurrentRound(prev => prev + 1);
      }, FEEDBACK_DURATION * 1000);
    }
    
    return cleanupTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundState, captureAndAnalyze]);


  const renderOverlay = () => {
    if (roundState === 'CHECKING') {
      return (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-20 text-white">
          <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-b-4 border-yellow-400"></div>
          <p className="text-2xl sm:text-3xl font-bold mt-4">กำลังตรวจสอบ...</p>
        </div>
      );
    }
    if (roundState === 'FEEDBACK' && feedback) {
      const isCorrect = feedback === 'CORRECT';
      return (
        <div className={`absolute inset-0 flex flex-col items-center justify-center z-20 text-white transition-opacity duration-300 ${isCorrect ? 'bg-green-600 bg-opacity-80' : 'bg-red-600 bg-opacity-80'}`}>
          {isCorrect ? <CheckCircleIcon className="w-24 h-24 sm:w-32 sm:h-32" /> : <XCircleIcon className="w-24 h-24 sm:w-32 sm:h-32" />}
          <p className="text-4xl sm:text-5xl font-bold mt-4">{isCorrect ? 'ถูกต้อง!' : 'ยังไม่ถูก!'}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex justify-between items-start mb-4 px-2">
        <div className="text-left">
          <p className="text-base sm:text-lg text-gray-400">รอบที่</p>
          <p className="text-2xl sm:text-3xl font-bold">{Math.min(currentRound, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}</p>
        </div>
        <div className="text-center">
            <p className="text-base sm:text-lg text-gray-400">เวลา</p>
            <p className="text-4xl sm:text-5xl font-bold text-yellow-400">{timeLeft}</p>
        </div>
        <div className="text-right">
          <p className="text-base sm:text-lg text-gray-400">คะแนน</p>
          <p className="text-2xl sm:text-3xl font-bold">{score}</p>
        </div>
      </div>

      {userInfo && (
        <div className="w-full max-w-lg text-center mb-4 -mt-2">
            <p className="text-md text-gray-300">
                <span className="font-semibold text-yellow-400">{userInfo.firstName} {userInfo.lastName}</span>
                <span className="mx-2">|</span>
                ชั้น {userInfo.userClass} เลขที่ {userInfo.userNumber}
            </p>
        </div>
      )}

      <div className="w-full max-w-lg text-center my-4 min-h-[150px] flex items-center justify-center">
        {currentWeapon && roundState !== 'WAITING' && (
          <div className="animate-fade-in bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-full">
            <p className="text-3xl sm:text-4xl font-bold text-yellow-400">
              {currentWeapon.thaiName}
            </p>
            <p className="text-base sm:text-lg text-gray-400 mb-2">({currentWeapon.name})</p>
            {currentWeapon.thaiDescription && (
                <p className="text-base sm:text-lg text-gray-200 mt-2">
                  {currentWeapon.thaiDescription}
                </p>
            )}
          </div>
        )}
      </div>

      <div className="relative w-full max-w-lg aspect-square bg-gray-800 rounded-lg overflow-hidden shadow-2xl border-4 border-gray-700">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]"></video>
        <canvas ref={canvasRef} className="hidden"></canvas>
        {!isCameraReady && (
          <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center z-10 p-4">
            <CameraIcon className="w-24 h-24 text-gray-600 mb-4" />
            <p className="text-xl text-center text-gray-400">{cameraError || 'กำลังรอการอนุญาตให้ใช้กล้อง...'}</p>
          </div>
        )}
        {renderOverlay()}
      </div>
    </div>
  );
};

export default GameScreen;
