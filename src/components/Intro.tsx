'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Intro() {
    return (
        <section className="w-full bg-white py-16 px-4 md:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Side: Text Content with Slide-In Animation */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <span className="text-sm font-bold tracking-wider text-[#800000] uppercase block mb-2">
                        INTRODUCTION
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                        ApexBuild is Pakistan's premier Engineering Consultancy Organization
                    </h2>

                    {/* Animated Underline */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "3rem" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="h-1 bg-[#800000] mb-6"
                    />

                    <p className="text-slate-700 leading-relaxed text-base md:text-lg">
                        ApexBuild was established in 1973 as a private limited company by the
                        Government of Pakistan. The objective of its creation was to create a pool of
                        talented engineers, attain self-reliance in engineering consultancy and replace
                        foreign consultants. Currently ApexBuild has total strength of over 2000
                        employees. The total estimated turnover for the year 2025-2026 was Rs.
                        21.2 billion whereas the total cumulative cost of the projects undertaken by
                        ApexBuild is US $ 352 billion.
                    </p>
                </motion.div>

                {/* Right Side: Building Image with Animation & Hover Zoom Effect */}
                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative w-full h-[350px] md:h-[420px] rounded-xl overflow-hidden shadow-xl border border-slate-200 group"
                >
                    <Image
                        src="/img8.jpg"
                        alt="ApexBuild Building"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        priority
                    />
                </motion.div>

            </div>
        </section>
    );
}