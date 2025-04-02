'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [uid, setUid] = useState('');
  const [pwd, setPwd] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');

  const handleLogin = () => {
    if (uid === 'rahul' && pwd === '1234') {
      setSentOtp('6789');
      setStep('otp');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleOtpValidate = () => {
    if (otp === sentOtp) {
      login();
      onClose(); // 
      router.push('/membership'); // 
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="w-full">
      {step === 'login' ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Username"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-red-600 text-white py-2 rounded-md"
            >
              Login
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Enter OTP</h2>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleOtpValidate}
            className="w-full bg-red-600 text-white py-2 rounded-md mt-4"
          >
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
}
