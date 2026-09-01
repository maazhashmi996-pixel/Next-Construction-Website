// src/components/progress.tsx
'use client';

import React, { useState } from 'react';

interface MetricItem {
    id: number;
    value: string;
    title: string;
    subtitle: string;
}

const metrics: MetricItem[] = [
    {
        id: 1,
        value: "568",
        title: "Ongoing Projects",
        subtitle: "543 Local and 25 Overseas projects",
    },
    {
        id: 2,
        value: "4,513",
        title: "Completed Projects",
        subtitle: "3,928 Local and 585 Overseas projects",
    },
    {
        id: 3,
        value: "5,081",
        title: "Total Projects",
        subtitle: "Total Ongoing and Completed",
    },
];

export default function Progress() {
    const [isPaused, setIsPaused] = useState(false);

    // Repeat metrics to create an endless continuous loop
    const displayMetrics = [...metrics, ...metrics, ...metrics, ...metrics];

    return (
        <section className="w-full bg-white py-16 overflow-hidden">
            <style jsx>{`
        @keyframes slideTrack {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-sliding-track {
          animation: slideTrack 25s linear infinite;
        }
        .animate-sliding-track.paused {
          animation-play-state: paused;
        }
      `}</style>

            <div
                className="relative w-full"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Soft edge blur overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Continuous Horizontal Sliding Track */}
                <div className={`flex gap-10 w-max animate-sliding-track ${isPaused ? 'paused' : ''}`}>
                    {displayMetrics.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="w-[340px] sm:w-[400px] shrink-0 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
                        >
                            {/* Top Accent Gradient Line */}
                            <div className="w-full h-[3px] bg-gradient-to-r from-[#be2f3a] via-[#5b4081] to-[#4581a6] rounded-full mb-8 transition-transform duration-300 group-hover:scale-x-105" />

                            {/* Counter Value */}
                            <span className="text-5xl sm:text-6xl font-normal text-[#1a202c] tracking-tight mb-4 font-sans group-hover:scale-105 transition-transform duration-300">
                                {item.value}
                            </span>

                            {/* Title */}
                            <h3 className="text-xl sm:text-2xl font-normal text-[#2d3748] mb-2">
                                {item.title}
                            </h3>

                            {/* Subtitle */}
                            <p className="text-sm sm:text-base text-[#718096] font-normal">
                                {item.subtitle}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}