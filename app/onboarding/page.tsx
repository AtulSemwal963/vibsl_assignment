"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token?: string; error?: string }) => void;
          }) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
  }
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Login UI, 3: Welcome Fullscreen
  const [gsiLoaded, setGsiLoaded] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const bgTimer = setTimeout(() => setShowBackground(true), 100);
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setGsiLoaded(true);
    document.body.appendChild(script);
    
    return () => {
      clearTimeout(bgTimer);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleGoogleLogin = () => {
    if (!window.google) return;
    setAuthError(null);

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      scope: 'email profile openid',
      callback: async (response) => {
        if (response.error) {
          setAuthError(`Authorization failed: ${response.error}`);
          return;
        }

        if (response.access_token) {
          try {
            // 1. Fetch user identification traits from Google authorization API points
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${response.access_token}` },
            });

            if (!res.ok) throw new Error('Failed to fetch user metadata layers from provider.');
            const userInfo = await res.json();

            // 2. Transport data vectors to internal system router mapping interface
            const backendSyncResponse = await fetch('/api/auth/callback/google', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                oauthId: userInfo.sub,
                email: userInfo.email,
                name: userInfo.name,
                profilePicture: userInfo.picture
              })
            });

            if (!backendSyncResponse.ok) {
              const errPayload = await backendSyncResponse.json();
              throw new Error(errPayload.error || 'System pipeline synchronisation failure.');
            }

            // 3. Jump past occupation matrix directly to transition phase
            setStep(3);
            setShowWelcome(true);
            setTimeout(() => {
              router.push('/dashboard');
            }, 2500);

          } catch (err: any) {
            setAuthError(err.message || 'Authentication lifecycle exception.');
          }
        }
      },
    });
    client.requestAccessToken();
  };

  if (step === 3) {
    return (
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
          showWelcome ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundColor: '#252526' }}
      >
        <div className="flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
          <h1 className="text-[32px] font-normal tracking-tight text-zinc-100">
            Welcome to
          </h1>
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/icon.svg"
              alt="VIBSL"
              width={44}
              height={44}
              className="h-11 w-11"
              priority
            />
            <span className="text-[36px] tracking-tight text-zinc-100 font-bold font-sans">
              VIBSL
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center font-sans antialiased overflow-x-hidden">
      {/* Background Layer */}
      <div className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-500 ${showBackground ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundColor: '#252526' }}>
        {showBackground && (
          <img
            src="/backgrounds/bg_3.png"
            alt="VIBSL background illustration"
            className="w-full h-full object-cover"
            style={{ opacity: 0.3 }}
          />
        )}
      </div>

      {/* Primary Container */}
      <div className="relative z-10 w-full min-h-screen flex lg:justify-start justify-center items-center">

        {/* Core Control Panel Container */}
        <div
          className="w-full max-w-xl mx-4 my-6 p-6 sm:p-10 lg:m-0 lg:p-12 md:p-20 lg:w-[50%] lg:max-w-none lg:min-h-screen lg:rounded-none rounded-3xl shadow-2xl lg:shadow-none flex flex-col justify-between space-y-8 overflow-y-auto max-h-[92vh] lg:max-h-none"
          style={{ backgroundColor: '#252526' }}
        >
          {/* Logo Header */}
          <div className="flex items-center gap-2">
            <div className="flex items-center transition-colors duration-200">
              <Image
                src="/logo.svg"
                alt="VIBSL Logo"
                height={48}
                width={200}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>

          {/* Authentication View */}
          <div className="w-full space-y-6 py-4">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">Log in to your Account</h1>
              <p className="text-sm text-zinc-400">Welcome back! Select method to log in:</p>
            </div>
            
            {authError && (
              <div className="p-3 rounded-lg border border-red-900/50 bg-red-950/20 text-xs text-red-400">
                {authError}
              </div>
            )}

            <button
              onClick={handleGoogleLogin}
              disabled={!gsiLoaded}
              className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-4 py-3 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 w-full disabled:opacity-50"
              style={{ backgroundColor: '#1e1e1e' }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>{gsiLoaded ? 'Continue with Google' : 'Loading...'}</span>
            </button>
          </div>

          {/* Copyright Row */}
          <div className="text-center text-[11px] text-zinc-500 pt-2">
            &copy; {new Date().getFullYear()} VIBSL. All rights reserved.
          </div>
        </div>

        {/* Desktop Spacer Column */}
        <div className="hidden lg:block lg:w-[50%] min-h-screen pointer-events-none" />

      </div>
    </div>
  );
}