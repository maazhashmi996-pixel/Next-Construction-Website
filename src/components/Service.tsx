// src/components/Services.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface ServiceSlide {
    id: number;
    category: string;
    title: string;
    leftItems: string[];
    rightItems: string[];
    bgImage: string;
}

const servicesData: ServiceSlide[] = [
    {
        id: 1,
        category: "SERVICES",
        title: "Post Construction Services",
        leftItems: [
            "Third-party Validation and Monitoring",
            "Operation and Maintenance Manuals",
            "Retrofitting and Rehabilitation",
            "Performance Monitoring",
        ],
        rightItems: [
            "Completion Reports",
            "Routine Maintenance and Safety Inspections",
            "Conservation of Structures",
        ],
        bgImage: "/img1.jpg",
    },
    {
        id: 2,
        category: "SERVICES",
        title: "Pre-Construction Services",
        leftItems: [
            "Feasibility & Environmental Studies",
            "Architectural & Structural Design",
            "Cost Estimation & Bidding Support",
        ],
        rightItems: [
            "Site Investigation & Topo Surveys",
            "Regulatory Approvals & Permitting",
            "Geotechnical Testing",
        ],
        bgImage: "/img2.jpg",
    },
    {
        id: 3,
        category: "SERVICES",
        title: "Engineering & Architecture",
        leftItems: [
            "3D Modeling & Building Information (BIM)",
            "Structural Engineering & Analysis",
            "Electrical & Plumbing Planning",
        ],
        rightItems: [
            "Interior & Exterior Concept Design",
            "Urban & Master Planning Solutions",
            "Sustainable Green Building Design",
        ],
        bgImage: "/img3.jpeg",
    },
    {
        id: 4,
        category: "SERVICES",
        title: "Project Management & Supervision",
        leftItems: [
            "Quality Assurance & Quality Control",
            "Construction Timeline Optimization",
            "Resource & Material Allocation",
        ],
        rightItems: [
            "Vendor & Subcontractor Oversight",
            "Site Safety & Risk Management",
            "Budget Tracking & Auditing",
        ],
        bgImage: "/img4.jpg",
    },
    {
        id: 5,
        category: "SERVICES",
        title: "Environmental & Safety Audits",
        leftItems: [
            "Environmental Impact Assessment (EIA)",
            "Occupational Health & Safety (OHS)",
            "Waste Management Strategy",
        ],
        rightItems: [
            "Energy Efficiency Audits",
            "Carbon Footprint Reduction Planning",
            "Safety Training Programs",
        ],
        bgImage: "/img5.jpg",
    },
    {
        id: 6,
        category: "SERVICES",
        title: "Asset & Infrastructure Management",
        leftItems: [
            "Structural Health Monitoring (SHM)",
            "Bridge & Highway Renovation",
            "Commercial Building Upgrades",
        ],
        rightItems: [
            "Preventive Maintenance Schedules",
            "Disaster Recovery & Risk Resilience",
            "Long-term Facility Lifecycle Planning",
        ],
        bgImage: "/img6.jpg",
    },
];

export default function Services() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % servicesData.length);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + servicesData.length) % servicesData.length);
    };

    // Automatic slide transition every 1 second (1000ms)
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    const activeSlide = servicesData[currentSlide];

    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div
                className="relative rounded-2xl overflow-hidden min-h-[540px] flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-white shadow-2xl group border border-slate-800"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Background Image with Fast Fade Transition */}
                {servicesData.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                            }`}
                        style={{ backgroundImage: `url(${slide.bgImage})` }}
                    />
                ))}

                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/35 z-0" />

                {/* Content Container */}
                <div
                    key={activeSlide.id}
                    className="relative z-10 max-w-4xl transition-all duration-300"
                >
                    {/* Category Tag */}
                    <span className="text-[#e0717a] font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">
                        {activeSlide.category}
                    </span>

                    {/* Title */}
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 sm:mb-12 text-white drop-shadow-md">
                        {activeSlide.title}
                    </h2>

                    {/* Bullet Points Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        {/* Left Column */}
                        <ul className="space-y-4">
                            {activeSlide.leftItems.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e0717a] shrink-0 shadow-sm shadow-[#e0717a]" />
                                    <span className="text-white/95 font-medium text-base sm:text-lg">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Right Column */}
                        <ul className="space-y-4">
                            {activeSlide.rightItems.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e0717a] shrink-0 shadow-sm shadow-[#e0717a]" />
                                    <span className="text-white/95 font-medium text-base sm:text-lg">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Carousel Controls */}
                <div className="relative z-10 mt-12 flex items-center justify-between">
                    {/* Pagination Indicators (6 Dots) */}
                    <div className="flex items-center gap-2">
                        {servicesData.map((_, idx) => {
                            const isActive = currentSlide === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${isActive
                                            ? "w-8 bg-white"
                                            : "w-2 bg-white/40 hover:bg-white/70"
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            );
                        })}
                    </div>

                    {/* Manual Arrow Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={prevSlide}
                            aria-label="Previous Slide"
                            className="w-10 h-10 rounded-full border border-white/30 bg-black/30 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            aria-label="Next Slide"
                            className="w-10 h-10 rounded-full border border-white/30 bg-black/30 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}