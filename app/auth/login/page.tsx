'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';
import AuthCard from '@/components/ui/authcard';

export default function LoginPage() {
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [uid, setUid] = useState('');
  const [pwd, setPwd] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');

  const handleLogin = () => {
    // Pseudo credential validation
    if (uid === 'rahul' && pwd === '1234') {
      const fakeOtp = '6789';
      setSentOtp(fakeOtp);
      alert('OTP sent to your registered phone number: ****1234');
      setStep('otp');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleOtpValidate = () => {
    if (otp === sentOtp) {
      alert('Login successful. Redirecting...');
      window.location.href = '/course'; // TODO: Update with actual route
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <>
      <Header />
      <main className="py-12">
        <AuthCard>
          {step === 'login' ? (
            <>
              <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>

              <div className="space-y-4 text-left">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />

                <button
                  onClick={handleLogin}
                  className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
                >
                  Login
                </button>

                <div className="text-sm text-center text-gray-500 mt-4">
                  <Link href="/auth/signup" className="text-red-600 hover:underline mr-4">
                    Sign Up
                  </Link>
                  <Link href="/auth/forgot-password" className="text-red-600 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-6 text-center">Enter OTP</h2>

              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                onClick={handleOtpValidate}
                className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
              >
                Verify OTP
              </button>
            </>
          )}
        </AuthCard>
      </main>
      <Footer />
    </>
  );
}
