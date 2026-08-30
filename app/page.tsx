'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);
  const router = useRouter();

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 py-12 overflow-y-auto font-sans">
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-200 { animation-delay: 200ms; }
        .delay-400 { animation-delay: 400ms; }
      `}</style>

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-20"
      >
        <source src="/Video.mp4" type="video/mp4" />
      </video>

      {/* Gradient & Blur Overlay */}
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-[3px] -z-10" />

      {/* Hero Content */}
      {!authMode && (
        <div className="text-center z-10 text-white px-2 max-w-4xl my-auto">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight opacity-0 animate-fade-in-up drop-shadow-md">
            HMIS
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-2xl text-slate-200 font-light opacity-0 animate-fade-in-up delay-200 max-w-2xl mx-auto leading-relaxed">
            Hospital Management Information System <br className="hidden sm:block" />
            <span className="inline-block mt-3 text-base sm:text-lg font-semibold text-amber-400 bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-400/20 backdrop-blur-md">
              Streamlined Healthcare Infrastructure Solutions
            </span>
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 opacity-0 animate-fade-in-up delay-400 w-full max-w-xs sm:max-w-none mx-auto">
            <button
              onClick={() => setAuthMode('signin')}
              className="w-full sm:w-auto min-w-[160px] rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-500 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-600/30"
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className="w-full sm:w-auto min-w-[160px] rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 text-white font-semibold hover:bg-white/20 active:scale-95 transition-all duration-200 shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {authMode === 'signin' && (
        <div className="z-10 w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900/85 backdrop-blur-2xl border border-white/10 shadow-2xl text-white my-auto animate-scale-in">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome Back</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Sign in to access your HMIS dashboard</p>
            </div>
            <button
              onClick={() => setAuthMode(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close form"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Work Email / Username
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="doctor@hospital.com"
                  className="w-full px-4 py-3.5 pl-11 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs text-blue-400 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 pl-11 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center pt-1">
              <input type="checkbox" id="remember" className="rounded bg-white/10 border-white/20 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="remember" className="ml-2 text-xs text-slate-300">Remember this device</label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-500 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-600/30 mt-2"
            >
              Sign In to Portal
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">
              Don't have an account?{' '}
              <button onClick={() => setAuthMode('signup')} className="text-blue-400 hover:underline font-semibold">
                Register here
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {authMode === 'signup' && (
        <div className="z-10 w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900/85 backdrop-blur-2xl border border-white/10 shadow-2xl text-white my-auto animate-scale-in">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Create Account</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Register for staff or administrative access</p>
            </div>
            <button
              onClick={() => setAuthMode(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close form"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Dr. John Doe"
                  className="w-full px-4 py-3.5 pl-11 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="doctor@hospital.com"
                  className="w-full px-4 py-3.5 pl-11 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 pl-11 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-500 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-600/30 mt-2"
            >
              Register Account
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <button onClick={() => setAuthMode('signin')} className="text-blue-400 hover:underline font-semibold">
                Sign In
              </button>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}