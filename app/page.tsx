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
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
      <style jsx global>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .delay-200 { animation-delay: 200ms; }
                .delay-400 { animation-delay: 400ms; }
            `}</style>

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
      >
        <source src="/Video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] -z-10" />

      {!authMode && (
        <div className="text-center z-10 text-white px-4 max-w-3xl">
          <h1 className="text-6xl font-extrabold tracking-tight opacity-0 animate-fade-in-up">
            HMIS
          </h1>
          <p className="mt-6 text-xl text-slate-200 opacity-0 animate-fade-in-up delay-200">
            Hospital Management Information System <br />
            <span className="inline-block mt-2 font-medium text-amber-400">
              You will get everything you need right here
            </span>
          </p>
          <div className="mt-10 flex items-center justify-center gap-5 opacity-0 animate-fade-in-up delay-400">
            <button
              onClick={() => setAuthMode('signin')}
              className="rounded-xl bg-blue-600 px-8 py-3.5 text-white font-semibold hover:bg-blue-500 transition-all shadow-lg"
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className="rounded-xl bg-white/10 backdrop-blur-md border border-white/25 px-8 py-3.5 text-white font-semibold hover:bg-white/20 transition-all shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {authMode === 'signin' && (
        <div className="z-10 w-full max-w-md p-8 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/15 shadow-2xl text-white mx-4 animate-scale-in">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Sign In to HMIS</h2>
              <p className="text-xs text-slate-400 mt-1">Enter credentials to proceed to portal</p>
            </div>
            <button onClick={() => setAuthMode(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Email / Username</label>
              <input
                type="email"
                placeholder="doctor@hospital.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 font-semibold hover:bg-blue-500 transition-all mt-4"
            >
              Login to System
            </button>
          </form>
        </div>
      )}

      {authMode === 'signup' && (
        <div className="z-10 w-full max-w-md p-8 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/15 shadow-2xl text-white mx-4 animate-scale-in">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Create HMIS Account</h2>
              <p className="text-xs text-slate-400 mt-1">Create account to access system</p>
            </div>
            <button onClick={() => setAuthMode(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Full Name</label>
              <input
                type="text"
                placeholder="Dr. John Doe"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Email Address</label>
              <input
                type="email"
                placeholder="doctor@hospital.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 font-semibold hover:bg-blue-500 transition-all mt-4"
            >
              Register & Enter
            </button>
          </form>
        </div>
      )}
    </main>
  );
}