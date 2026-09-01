'use client';

import React from 'react';
import { motion } from 'framer-motion';

const infoCards = [
    {
        id: 'vision',
        title: 'OUR VISION',
        text: 'To be the premier international engineering consultancy firm, recognised worldwide for technical excellence and professional integrity.',
        bgStyle: 'bg-gradient-to-b from-rose-50/70 to-rose-100/40 border-rose-100/80',
    },
    {
        id: 'mission',
        title: 'OUR MISSION',
        text: 'Aspiring for a leading global market position by delivering world-class engineering consultancy services, establishing worldwide corporate alliances and upholding the highest professional and ethical standards.',
        bgStyle: 'bg-gradient-to-b from-sky-50/70 to-sky-100/40 border-sky-100/80',
    },
    {
        id: 'values',
        title: 'OUR VALUES',
        text: 'Unwavering commitment to quality and excellence, exceeding clients\u2019 expectations, responsibility towards society, technical excellence, professional ethics, and employee dignity.',
        bgStyle: 'bg-gradient-to-b from-amber-50/70 to-amber-100/40 border-amber-100/80',
    },
];

export default function Info() {
    return (
        <section className="w-full bg-[#f8fafc] py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2545] tracking-tight">
                        Who We Are
                    </h2>
                    <div className="w-12 h-1 bg-[#800000] mt-3 rounded-full" />
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {infoCards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4 }}
                            className={`rounded-2xl p-8 border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center justify-start min-h-[260px] ${card.bgStyle}`}
                        >
                            <h3 className="text-sm md:text-base font-bold tracking-widest text-[#800000] uppercase mb-6">
                                {card.title}
                            </h3>
                            <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                                {'\u201C'}{card.text}{'\u201D'}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}