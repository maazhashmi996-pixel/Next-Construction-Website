// src/components/Footer.tsx
'use client';

import React from 'react';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="w-full bg-[#f8f9fa] text-slate-800 border-t-4 border-[#8b1e24] relative font-sans">
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                    {/* Company Info & Contact Column */}
                    <div className="lg:col-span-1 space-y-5">
                        {/* Brand Logo & Name */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#e9a803] flex items-center justify-center rounded-sm font-bold text-white text-xs tracking-wider text-center leading-tight">
                                APEX
                            </div>
                            <div className="leading-tight">
                                <h3 className="font-bold text-slate-900 text-sm">
                                    Apex Build
                                </h3>
                                <p className="text-xs text-slate-700 font-semibold">
                                    (Pvt.) Limited
                                </p>
                            </div>
                        </div>

                        {/* Address & Contact Details */}
                        <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                            <p>1-C, Block-N, Model Town Extension</p>
                            <p>Lahore 54700, Pakistan</p>
                            <p>+92-42-99090000</p>
                            <p>Fax: +92-42-99231950</p>
                            <p>
                                <a href="mailto:info@apexbuild.com" className="hover:underline text-slate-700">
                                    info@apexbuild.com
                                </a>
                            </p>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex items-center gap-2 pt-2">
                            {/* X / Twitter */}
                            <a href="#" aria-label="X" className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors">
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            {/* Facebook */}
                            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors">
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" /></svg>
                            </a>
                            {/* YouTube */}
                            <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors">
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Columns (4 Grid Columns) */}
                    <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                        {/* Column 1: ABOUT US & PROJECTS */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-xs font-bold text-[#8b1e24] tracking-wider uppercase mb-3">ABOUT US</h4>
                                <ul className="space-y-2 text-xs text-slate-700">
                                    <li><a href="#" className="hover:text-[#8b1e24]">Who We Are</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Board of Directors</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Board of Management</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Managing Director</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Key Personnel</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Organizational Structure</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-[#8b1e24] tracking-wider uppercase mb-3">PROJECTS</h4>
                                <ul className="space-y-2 text-xs text-slate-700">
                                    <li><a href="#" className="hover:text-[#8b1e24]">Our Flagship Projects</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Major Ongoing Projects</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Major Completed Projects</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Column 2: SERVICES & CAREERS */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-xs font-bold text-[#8b1e24] tracking-wider uppercase mb-3">SERVICES</h4>
                                <ul className="space-y-2 text-xs text-slate-700">
                                    <li><a href="#" className="hover:text-[#8b1e24]">Appraisals, Pre-feasibility and Feasibility Studies</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Construction Supervision and Contract Management</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Design</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Post-construction Services</a></li>
                                </ul>
                                <a href="#" className="text-xs text-[#e0717a] hover:underline font-semibold mt-3 inline-block">
                                    View All Services &rarr;
                                </a>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-[#8b1e24] tracking-wider uppercase mb-3">CAREERS</h4>
                                <ul className="space-y-2 text-xs text-slate-700">
                                    <li><a href="#" className="hover:text-[#8b1e24]">Employment Opportunities</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Column 3: BUSINESS UNITS & INSIGHTS */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-xs font-bold text-[#8b1e24] tracking-wider uppercase mb-3">BUSINESS UNITS</h4>
                                <ul className="space-y-2 text-xs text-slate-700">
                                    <li><a href="#" className="hover:text-[#8b1e24]">Architecture & Planning</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Contracts</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Construction Management</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Environmental & Public Health Engineering</a></li>
                                </ul>
                                <a href="#" className="text-xs text-[#e0717a] hover:underline font-semibold mt-3 inline-block">
                                    View All Business Units &rarr;
                                </a>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-[#8b1e24] tracking-wider uppercase mb-3">INSIGHTS</h4>
                                <ul className="space-y-2 text-xs text-slate-700">
                                    <li><a href="#" className="hover:text-[#8b1e24]">Media & Publication</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Resources</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Links</a></li>
                                </ul>
                                <a href="#" className="text-xs text-[#e0717a] hover:underline font-semibold mt-3 inline-block">
                                    View All Insights &rarr;
                                </a>
                            </div>
                        </div>

                        {/* Column 4: GLOBAL PRESENCE & LINKS */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-xs font-bold text-[#8b1e24] tracking-wider uppercase mb-3">GLOBAL PRESENCE</h4>
                                <ul className="space-y-2 text-xs text-slate-700">
                                    <li><a href="#" className="hover:text-[#8b1e24]">Apex Build in Saudi Arabia</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Apex Build in Oman</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Apex Build in Qatar</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Islamabad Office</a></li>
                                </ul>
                                <a href="#" className="text-xs text-[#e0717a] hover:underline font-semibold mt-3 inline-block">
                                    View Global Presence &rarr;
                                </a>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-[#8b1e24] tracking-wider uppercase mb-3">LINKS</h4>
                                <ul className="space-y-2 text-xs text-slate-700">
                                    <li><a href="#" className="hover:text-[#8b1e24]">Apex-MIS</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Web Mail</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">Apex E-Portal</a></li>
                                    <li><a href="#" className="hover:text-[#8b1e24]">ApexPRO</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-600 relative">
                <p>&copy; 2026 Apex Build (Pvt.) Limited. All rights reserved.</p>

                {/* Scroll-to-Top Floating Button */}
                <button
                    onClick={scrollToTop}
                    aria-label="Scroll to Top"
                    className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[#e9a803] text-white flex items-center justify-center shadow-lg hover:bg-[#6e171c] transition-colors z-50 focus:outline-none"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>
        </footer>
    );
}