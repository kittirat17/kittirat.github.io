import React from 'react';
import { KeyIcon } from './icons/KeyIcon';

const ApiKeySetupScreen: React.FC = () => {

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in bg-gray-800 p-8 rounded-xl shadow-2xl border border-yellow-500/50">
      <KeyIcon className="w-20 h-20 text-yellow-400 mb-6" />
      <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400">ต้องตั้งค่า API Key ก่อน</h1>
      <h2 className="text-lg mt-1 text-gray-300 mb-8">(API Key Setup Required)</h2>

      <div className="text-left max-w-md space-y-4 text-gray-200 text-lg">
        <p>
          แอปนี้ต้องใช้ Google Gemini API Key เพื่อวิเคราะห์ท่าทางของคุณ
        </p>
        <p>
           ดูเหมือนว่า API Key ยังไม่ได้ถูกตั้งค่าในสภาพแวดล้อมของแอปพลิเคชันนี้
        </p>
        <p className="font-semibold text-white">
          วิธีแก้ไข:
        </p>
        <ol className="list-decimal list-inside space-y-3 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <li>
            ไปที่หน้าการตั้งค่า (Settings) ของบริการโฮสติ้งที่คุณใช้ (เช่น Netlify, Vercel)
          </li>
          <li>
            มองหาเมนูที่ชื่อว่า <strong className="text-yellow-400">Environment Variables</strong> (ตัวแปรสภาพแวดล้อม)
          </li>
          <li>
            สร้างตัวแปรใหม่ โดยใส่ค่าดังนี้:
            <div className="mt-2 p-3 bg-gray-700 rounded font-mono text-sm">
              <div><span className="text-gray-400">Key:</span> API_KEY</div>
              <div><span className="text-gray-400">Value:</span> [วาง API Key ของคุณที่นี่]</div>
            </div>
          </li>
          <li>
            บันทึกการตั้งค่าและอาจจะต้อง Deploy ใหม่อีกครั้ง
          </li>
        </ol>
      </div>

      <button
        onClick={handleRefresh}
        className="mt-12 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-red-500/50"
      >
        ฉันตั้งค่าแล้ว, รีเฟรชหน้า
      </button>
    </div>
  );
};

export default ApiKeySetupScreen;
