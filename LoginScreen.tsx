import React, { useState, useMemo } from 'react';
import type { UserInfo } from '../types';

interface LoginScreenProps {
  onLogin: (info: UserInfo) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userClass, setUserClass] = useState('');
  const [userNumber, setUserNumber] = useState('');

  const isFormValid = useMemo(() => {
    return firstName.trim() !== '' && lastName.trim() !== '' && userClass.trim() !== '' && userNumber.trim() !== '';
  }, [firstName, lastName, userClass, userNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onLogin({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        userClass: userClass.trim(),
        userNumber: userNumber.trim(),
      });
    }
  };

  const inputStyles = "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors";
  const labelStyles = "block text-left text-gray-300 text-sm font-bold mb-2";

  return (
    <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">ลงทะเบียนผู้ใช้งาน</h1>
      <p className="mt-2 mb-8 text-lg text-gray-400">(User Registration)</p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div>
          <label htmlFor="firstName" className={labelStyles}>ชื่อ (First Name)</label>
          <input id="firstName" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className={inputStyles} placeholder="เช่น สมชาย" required />
        </div>
        <div>
          <label htmlFor="lastName" className={labelStyles}>นามสกุล (Last Name)</label>
          <input id="lastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)} className={inputStyles} placeholder="เช่น ใจดี" required />
        </div>
        <div>
          <label htmlFor="userClass" className={labelStyles}>ชั้น (Class)</label>
          <input id="userClass" type="text" value={userClass} onChange={e => setUserClass(e.target.value)} className={inputStyles} placeholder="เช่น ม.6/1" required />
        </div>
        <div>
          <label htmlFor="userNumber" className={labelStyles}>เลขที่ (Number)</label>
          <input id="userNumber" type="text" value={userNumber} onChange={e => setUserNumber(e.target.value)} className={inputStyles} placeholder="เช่น 25" required />
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-lg text-2xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-red-500/50 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          บันทึกและเริ่ม (Save & Start)
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
