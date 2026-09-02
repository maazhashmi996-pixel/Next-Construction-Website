'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, HardHat, Phone, ArrowUpRight, ChevronDown } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<'services' | 'projects' | 'about' | 'insights' | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = (name: 'services' | 'projects' | 'about' | 'insights') => {
        setActiveDropdown((prev) => (prev === name ? null : name));
    };

    const servicesList = [
        { name: "APPRAISALS, PRE-FEASIBILITY & FEASIBILITY STUDIES", slug: "appraisals-pre-feasibility-feasibility-studies" },
        { name: "CONSTRUCTION SUPERVISION & CONTRACT MANAGEMENT", slug: "construction-supervision-contract-management" },
        { name: "DESIGN", slug: "design" },
        { name: "POST-CONSTRUCTION SERVICES", slug: "post-construction-services" },
        { name: "SPECIALIZED SERVICES", slug: "specialized-services" },
        { name: "SURVEYS & INVESTIGATIONS", slug: "surveys-investigations" },
        { name: "TENDER & CONTRACT DOCUMENTS", slug: "tender-contract-documents" },
    ];

    const projectsList = [
        { name: "OUR FLAGSHIP PROJECTS", href: "/projects" },
        { name: "MAJOR ONGOING PROJECTS", href: "/projects" },
        { name: "MAJOR COMPLETED PROJECTS", href: "/projects" },
    ];

    const aboutList = [
        "WHO WE ARE",
        "MANAGING DIRECTOR",
        "BOARD OF DIRECTORS",
        "KEY PERSONNEL",
        "BOARD OF MANAGEMENT",
        "ORGANIZATIONAL STRUCTURE",
    ];

    const mediaPublicationsList = [
        "PROFILE: 1973 - 2026",
        "OVERSEAS PROFILE",
        "MANAGING DIRECTOR REPORT",
        "NEWS REPORT",
        "RESEARCH & PUBLICATIONS",
        "NESPAK DOCUMENTARY",
    ];

    const resourcesList = [
        "ADVERTISEMENTS",
        "FINANCIAL STATEMENTS",
        "STATEMENT OF CORPORATE INTENT",
        "BIDDING DOCUMENTS",
        "COMPANY RULES AND POLICIES",
        "AFFILIATION & REGISTRATIONS",
        "PAKISTAN OFFICIAL MAP (POLITICAL)",
    ];

    const linksList = [
        "NESPAK-MIS",
        "WEB MAIL",
        "NESPAK E-PORTAL",
        "NESPRO",
    ];

    return (
        <nav
            ref={dropdownRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || activeDropdown
                    ? 'bg-slate-950/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
                    : 'bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent backdrop-blur-sm py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center gap-3 font-extrabold text-xl tracking-wider group">
                        <div className="p-2 rounded-xl bg-brand-yellow/10 border border-brand-yellow/30 group-hover:bg-brand-yellow/20 transition-all">
                            <HardHat className="w-6 h-6 text-brand-yellow" />
                        </div>
                        <span className="text-white">
                            APEX<span className="text-brand-yellow">BUILD</span>
                        </span>
                    </Link>

                    {/* Floating Glassmorphism Center Links */}
                    <div className="hidden md:flex items-center gap-1 bg-slate-300/10 p-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-inner">

                        <button
                            onClick={() => toggleDropdown('services')}
                            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition ${activeDropdown === 'services'
                                    ? 'bg-[#e9a803] text-white shadow-md'
                                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <span>Services</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                        </button>

                        <button
                            onClick={() => toggleDropdown('projects')}
                            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition ${activeDropdown === 'projects'
                                    ? 'bg-[#e9a803] text-white shadow-md'
                                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <span>Projects</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'projects' ? 'rotate-180' : ''}`} />
                        </button>

                        <button
                            onClick={() => toggleDropdown('about')}
                            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition ${activeDropdown === 'about'
                                    ? 'bg-[#e9a803] text-white shadow-md'
                                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <span>About Us</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                        </button>

                        <button
                            onClick={() => toggleDropdown('insights')}
                            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition ${activeDropdown === 'insights'
                                    ? 'bg-[#e9a803] text-white shadow-md'
                                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <span>Insights</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'insights' ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <a href="tel:+123456789" className="flex items-center gap-2 text-sm text-slate-300 hover:text-brand-yellow transition font-medium">
                            <Phone className="w-4 h-4 text-brand-yellow" />
                            <span>+1 (555) 019-2834</span>
                        </a>
                        <Link href="#quote" className="group bg-brand-yellow hover:bg-brand-accent text-slate-950 px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-brand-yellow/20 flex items-center gap-1.5">
                            <span>Get Quote</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-white/5 border border-white/10 backdrop-blur-md"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* SERVICES MEGA DROPDOWN */}
            {activeDropdown === 'services' && (
                <div className="hidden md:block absolute top-full left-0 w-full bg-white text-slate-900 border-b-4 border-[#8b1e24] shadow-2xl transition-all duration-300 animate-fadeIn">
                    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8 items-stretch">
                        <div className="col-span-4 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                            <div className="relative w-full h-48 bg-slate-900">
                                <Image src="/services.jpg" alt="Services" fill className="object-cover opacity-90" />
                            </div>
                            <div className="p-6 bg-white flex-1 flex flex-col justify-center">
                                <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                                    Engineering Excellence Across the Project Lifecycle
                                </p>
                            </div>
                        </div>

                        <div className="col-span-8 py-2 pl-4 flex flex-col justify-center">
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-[#8b1e24] tracking-widest uppercase mb-1">WHAT WE PROVIDE</h4>
                                <div className="w-24 h-0.5 bg-[#8b1e24]" />
                            </div>
                            <ul className="space-y-3.5">
                                {servicesList.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 group/item cursor-pointer">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900 group-hover/item:bg-[#8b1e24] transition-colors shrink-0" />
                                        <Link
                                            href={`/?service=${item.slug}#services`}
                                            onClick={() => setActiveDropdown(null)}
                                            className="text-xs font-bold text-slate-800 tracking-wider group-hover/item:text-[#8b1e24] transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* PROJECTS MEGA DROPDOWN */}
            {activeDropdown === 'projects' && (
                <div className="hidden md:block absolute top-full left-0 w-full bg-white text-slate-900 border-b-4 border-[#8b1e24] shadow-2xl transition-all duration-300 animate-fadeIn">
                    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8 items-stretch">
                        <div className="col-span-4 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                            <div className="relative w-full h-48 bg-slate-900">
                                <Image src="/Project.jpeg" alt="Projects" fill className="object-cover opacity-90" />
                            </div>
                            <div className="p-6 bg-white flex-1 flex flex-col justify-center">
                                <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                                    Landmark Projects Shaping Progress Worldwide
                                </p>
                            </div>
                        </div>

                        <div className="col-span-8 py-2 pl-4 flex flex-col justify-center">
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-[#8b1e24] tracking-widest uppercase mb-1">PROJECTS PORTFOLIO</h4>
                                <div className="w-24 h-0.5 bg-[#8b1e24]" />
                            </div>
                            <ul className="space-y-4">
                                {projectsList.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 group/item cursor-pointer">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900 group-hover/item:bg-[#8b1e24] transition-colors shrink-0" />
                                        <Link
                                            href={item.href}
                                            onClick={() => setActiveDropdown(null)}
                                            className="text-xs font-bold text-slate-800 tracking-wider group-hover/item:text-[#8b1e24] transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* ABOUT US MEGA DROPDOWN */}
            {activeDropdown === 'about' && (
                <div className="hidden md:block absolute top-full left-0 w-full bg-white text-slate-900 border-b-4 border-[#8b1e24] shadow-2xl transition-all duration-300 animate-fadeIn">
                    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8 items-stretch">
                        <div className="col-span-4 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                            <div className="relative w-full h-48 bg-slate-900">
                                <Image src="/about.jpg" alt="About Us" fill className="object-cover opacity-90" />
                            </div>
                            <div className="p-6 bg-white flex-1 flex flex-col justify-center">
                                <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                                    Delivering Trusted Engineering Consultancy Since 1973
                                </p>
                            </div>
                        </div>

                        <div className="col-span-8 py-2 pl-4 flex flex-col justify-center">
                            <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
                                {aboutList.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 group/item cursor-pointer">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900 group-hover/item:bg-[#8b1e24] transition-colors shrink-0" />
                                        <Link
                                            href="#about"
                                            onClick={() => setActiveDropdown(null)}
                                            className="text-xs font-bold text-slate-800 tracking-wider group-hover/item:text-[#8b1e24] transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* INSIGHTS MEGA DROPDOWN */}
            {activeDropdown === 'insights' && (
                <div className="hidden md:block absolute top-full left-0 w-full bg-white text-slate-900 border-b-4 border-[#e9a803] shadow-2xl transition-all duration-300 animate-fadeIn">
                    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8 items-stretch">
                        <div className="col-span-4 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                            <div className="relative w-full h-48 bg-slate-900">
                                <Image src="/Insight.jpeg" alt="Insights" fill className="object-cover opacity-90" />
                            </div>
                            <div className="p-6 bg-white flex-1 flex flex-col justify-center">
                                <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                                    Explore the Insights, Knowledge, and Resources Behind Our Work
                                </p>
                            </div>
                        </div>

                        <div className="col-span-8 py-2 pl-2 grid grid-cols-3 gap-6 items-start">
                            <div>
                                <div className="mb-4">
                                    <h4 className="text-xs font-bold text-[#8b1e24] tracking-widest uppercase mb-1">MEDIA & PUBLICATIONS</h4>
                                    <div className="w-20 h-0.5 bg-[#8b1e24]" />
                                </div>
                                <ul className="space-y-3">
                                    {mediaPublicationsList.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2.5 group/item cursor-pointer">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 group-hover/item:bg-[#8b1e24] transition-colors shrink-0" />
                                            <Link
                                                href="#insights"
                                                onClick={() => setActiveDropdown(null)}
                                                className="text-[11px] font-bold text-slate-800 tracking-wider group-hover/item:text-[#8b1e24] transition-colors"
                                            >
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <div className="mb-4">
                                    <h4 className="text-xs font-bold text-[#8b1e24] tracking-widest uppercase mb-1">RESOURCES</h4>
                                    <div className="w-20 h-0.5 bg-[#8b1e24]" />
                                </div>
                                <ul className="space-y-3">
                                    {resourcesList.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2.5 group/item cursor-pointer">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 group-hover/item:bg-[#8b1e24] transition-colors shrink-0" />
                                            <Link
                                                href="#insights"
                                                onClick={() => setActiveDropdown(null)}
                                                className="text-[11px] font-bold text-slate-800 tracking-wider group-hover/item:text-[#8b1e24] transition-colors"
                                            >
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <div className="mb-4">
                                    <h4 className="text-xs font-bold text-[#8b1e24] tracking-widest uppercase mb-1">LINKS</h4>
                                    <div className="w-20 h-0.5 bg-[#8b1e24]" />
                                </div>
                                <ul className="space-y-3">
                                    {linksList.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2.5 group/item cursor-pointer">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 group-hover/item:bg-[#8b1e24] transition-colors shrink-0" />
                                            <Link
                                                href="#insights"
                                                onClick={() => setActiveDropdown(null)}
                                                className="text-[11px] font-bold text-slate-800 tracking-wider group-hover/item:text-[#8b1e24] transition-colors"
                                            >
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-white/10 px-6 pt-4 pb-6 space-y-4 mt-3">
                    <div>
                        <button
                            onClick={() => toggleDropdown('services')}
                            className="flex items-center justify-between w-full text-slate-200 hover:text-brand-yellow text-base font-medium py-1"
                        >
                            <span>Services</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                        </button>
                        {activeDropdown === 'services' && (
                            <div className="pl-4 mt-2 space-y-2 border-l border-slate-800">
                                {servicesList.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={`/?service=${item.slug}#services`}
                                        onClick={() => { setActiveDropdown(null); setIsOpen(false); }}
                                        className="block text-xs font-medium text-slate-400 hover:text-brand-yellow py-1"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            onClick={() => toggleDropdown('projects')}
                            className="flex items-center justify-between w-full text-slate-200 hover:text-brand-yellow text-base font-medium py-1"
                        >
                            <span>Projects</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'projects' ? 'rotate-180' : ''}`} />
                        </button>
                        {activeDropdown === 'projects' && (
                            <div className="pl-4 mt-2 space-y-2 border-l border-slate-800">
                                {projectsList.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.href}
                                        onClick={() => { setActiveDropdown(null); setIsOpen(false); }}
                                        className="block text-xs font-medium text-slate-400 hover:text-brand-yellow py-1"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}