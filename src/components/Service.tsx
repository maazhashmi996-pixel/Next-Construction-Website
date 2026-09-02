// src/components/Services.tsx
'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface ServiceSlide {
    id: number;
    slug: string;
    category: string;
    title: string;
    leftItems: string[];
    rightItems: string[];
    bgImage: string;
}

const servicesData: ServiceSlide[] = [
    {
        id: 1,
        slug: "post-construction-services",
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
        slug: "pre-construction-services",
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
        slug: "engineering-architecture",
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
        slug: "project-management-supervision",
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
        slug: "environmental-safety-audits",
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
        slug: "asset-infrastructure-management",
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

const AUTOPLAY_DURATION = 5000;

function ServicesContent() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const carouselRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const serviceQuery = searchParams.get('service');

    // Automatically change active slide based on Navbar link query (?service=slug)
    useEffect(() => {
        if (serviceQuery) {
            const matchedIndex = servicesData.findIndex(
                (slide) =>
                    slide.slug === serviceQuery ||
                    slide.id.toString() === serviceQuery ||
                    slide.title.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(serviceQuery.toLowerCase())
            );
            if (matchedIndex !== -1) {
                setCurrentSlide(matchedIndex);
            }
        }
    }, [serviceQuery]);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % servicesData.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + servicesData.length) % servicesData.length);
    }, []);

    // Keyboard controls
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    };

    // Mobile Touch/Swipe controls
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance > 50) nextSlide();
        if (distance < -50) prevSlide();
    };

    // Auto Play Interval
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            nextSlide();
        }, AUTOPLAY_DURATION);

        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    const activeSlide = servicesData[currentSlide];

    return (
        <section id="services" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
            {/* Styled Header Section */}
            <div className="flex flex-col items-start mb-8 sm:mb-12">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-[2px] bg-[#e0717a]" />
                    <p className="text-[#0B2545] font-bold uppercase tracking-[0.2em] text-xs sm:text-sm">
                        What We Offer
                    </p>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0B2545]">
                    OUR <span className="text-[#0B2545]">SERVICES</span>
                </h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-[#0B2545] to-[#e0717a] mt-4 rounded-full" />
            </div>

            {/* Main Carousel Container */}
            <div
                ref={carouselRef}
                tabIndex={0}
                role="region"
                aria-label="Services Carousel"
                onKeyDown={handleKeyDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                className="relative rounded-2xl overflow-hidden min-h-[540px] flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-white shadow-2xl group border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e0717a]"
            >
                {/* Animated Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
                    <div
                        key={currentSlide + (isPaused ? '-paused' : '-active')}
                        className={`h-full bg-[#e0717a] ${!isPaused ? 'animate-[progress_5s_linear_infinite]' : 'w-0'
                            }`}
                        style={{
                            animationDuration: `${AUTOPLAY_DURATION}ms`,
                            animationPlayState: isPaused ? 'paused' : 'running',
                        }}
                    />
                </div>

                {/* Background Image with Crossfade Transition */}
                {servicesData.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out ${index === currentSlide
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-105 pointer-events-none"
                            }`}
                        style={{ backgroundImage: `url(${slide.bgImage})` }}
                    />
                ))}

                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/35 z-0" />

                {/* Content Container */}
                <div
                    key={activeSlide.id}
                    className="relative z-10 max-w-4xl transition-all duration-500"
                >
                    {/* Category Tag */}
                    <span className="text-[#e0717a] font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">
                        {activeSlide.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 sm:mb-12 text-white drop-shadow-md">
                        {activeSlide.title}
                    </h3>

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
                <div className="relative z-10 mt-12 flex flex-wrap items-center justify-between gap-4">
                    {/* Pagination Indicators (Dots) */}
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

                    {/* Manual Arrow & Play/Pause Controls */}
                    <div className="flex items-center gap-3">
                        {/* Play/Pause Toggle Button */}
                        <button
                            onClick={() => setIsPaused((prev) => !prev)}
                            aria-label={isPaused ? "Play Slideshow" : "Pause Slideshow"}
                            className="w-10 h-10 rounded-full border border-white/30 bg-black/30 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 active:scale-95"
                        >
                            {isPaused ? (
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                            )}
                        </button>

                        {/* Prev Button */}
                        <button
                            onClick={prevSlide}
                            aria-label="Previous Slide"
                            className="w-10 h-10 rounded-full border border-white/30 bg-black/30 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Next Button */}
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

export default function Services() {
    return (
        <Suspense fallback={<div className="text-center py-12 text-slate-400">Loading Services...</div>}>
            <ServicesContent />
        </Suspense>
    );
}