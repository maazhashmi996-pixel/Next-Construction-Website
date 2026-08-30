'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Stethoscope,
    Calendar,
    Pill,
    Settings,
    LogOut,
    Search,
    Plus,
    Activity,
    Bed,
    Siren,
    Ambulance,
    FlaskConical,
    ClipboardList,
    ChevronRight,
    CheckCircle2,
    Menu,
    X,
} from 'lucide-react';

export default function FullyResponsiveDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Lock body scroll when mobile drawer is active
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    // Auto-close drawer when resizing to desktop screen sizes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
        { name: 'Patients', icon: Users, href: '/dashboard/patients' },
        { name: 'Doctors & Staff', icon: Stethoscope, href: '/dashboard/doctors' },
        { name: 'Appointments', icon: Calendar, href: '/dashboard/appointments' },
        { name: 'Pharmacy & Stock', icon: Pill, href: '/dashboard/pharmacy' },
        { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
    ];

    const recentPatients = [
        { id: 'P-1092', name: 'Eleanor Pena', age: 45, dept: 'Cardiology', status: 'Admitted', condition: 'Stable', room: '302-A' },
        { id: 'P-1093', name: 'Cameron Williamson', age: 29, dept: 'Neurology', status: 'ICU', condition: 'Critical', room: 'ICU-04' },
        { id: 'P-1094', name: 'Esther Howard', age: 62, dept: 'Orthopedics', status: 'Outpatient', condition: 'Recovered', room: 'OPD-12' },
        { id: 'P-1095', name: 'Robert Fox', age: 38, dept: 'Emergency', status: 'Triage', condition: 'Under Observation', room: 'ER-02' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased selection:bg-blue-500 selection:text-white">
            {/* Mobile Off-Canvas Backdrop Overlay */}
            <div
                aria-hidden="true"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            />

            {/* Sidebar Navigation */}
            <aside
                className={`fixed md:static inset-y-0 left-0 z-50 w-72 sm:w-80 md:w-64 lg:w-72 bg-slate-900/95 md:bg-slate-900/90 border-r border-slate-800/80 p-4 sm:p-6 flex flex-col justify-between backdrop-blur-xl transition-transform duration-300 ease-in-out flex-shrink-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
            >
                <div className="space-y-6">
                    {/* Brand Header */}
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-xl sm:text-2xl shadow-lg shadow-blue-500/20 ring-1 ring-white/20 flex-shrink-0">
                                H
                            </div>
                            <div className="min-w-0">
                                <h2 className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent truncate">
                                    HMIS<span className="text-blue-500">.</span>
                                </h2>
                                <span className="text-[10px] sm:text-[11px] font-semibold text-blue-400 uppercase tracking-widest block -mt-0.5 truncate">
                                    Enterprise v2.4
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="md:hidden text-slate-400 hover:text-white p-2 rounded-xl border border-slate-800 bg-slate-800/50 active:scale-95 transition-transform"
                            aria-label="Close menu"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="space-y-1.5" aria-label="Main Navigation">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.name;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        setActiveTab(item.name);
                                        setIsMobileMenuOpen(false);
                                        router.push(item.href);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 min-h-[44px] ${isActive
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold'
                                            : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 active:bg-slate-800'
                                        }`}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    <span className="truncate">{item.name}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* User Profile & Footer Controls */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3 mt-6">
                    <div className="flex items-center gap-3 px-1">
                        <div className="relative flex-shrink-0">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-semibold text-xs sm:text-sm text-slate-200">
                                DR
                            </div>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-semibold truncate text-slate-200">Dr. Alexander</p>
                            <p className="text-[11px] text-slate-400 truncate">Chief Medical Officer</p>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push('/')}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-400 text-slate-400 transition-all text-xs font-semibold min-h-[44px]"
                    >
                        <LogOut className="w-4 h-4 flex-shrink-0" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Application Area */}
            <main className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">
                {/* Sticky Header */}
                <header className="sticky top-0 z-20 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                        {/* Mobile Drawer Trigger */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 flex-shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center"
                            aria-label="Open sidebar navigation"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Adaptive Search Bar */}
                        <div className="relative w-full max-w-xs sm:max-w-md">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search patients, doctors..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Header Controls */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        <button
                            onClick={() => router.push('/dashboard/register')}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all min-h-[40px]"
                        >
                            <Plus className="w-4 h-4 flex-shrink-0" />
                            <span className="hidden sm:inline">Register Patient</span>
                            <span className="sm:hidden">New</span>
                        </button>

                        <div className="hidden sm:block h-5 w-px bg-slate-800" />

                        <span className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Live Network
                        </span>
                    </div>
                </header>

                {/* Dashboard Body Container */}
                <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-[1600px] w-full mx-auto">
                    {/* Page Title & Context */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Clinical Overview</h1>
                            <p className="text-xs text-slate-400 mt-1">Real-time hospital operations and patient metrics.</p>
                        </div>
                        <div className="self-start sm:self-auto text-[11px] sm:text-xs text-slate-400 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
                            Shift: <span className="text-slate-200 font-semibold">Morning (08:00 - 16:00)</span>
                        </div>
                    </div>

                    {/* Responsive Metric Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all">
                            <div className="flex justify-between items-start gap-2">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Patients</p>
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 flex-shrink-0">
                                    <Activity className="w-4 h-4" />
                                </div>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 sm:mt-3 tracking-tight">1,248</h3>
                            <p className="text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1">
                                ↑ +12.5% <span className="text-slate-500 font-normal truncate">vs last week</span>
                            </p>
                        </div>

                        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all">
                            <div className="flex justify-between items-start gap-2">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Appointments</p>
                                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 flex-shrink-0">
                                    <Calendar className="w-4 h-4" />
                                </div>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 sm:mt-3 tracking-tight">42</h3>
                            <p className="text-xs text-blue-400 font-medium mt-2 truncate">
                                ● 8 Scheduled Today
                            </p>
                        </div>

                        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all">
                            <div className="flex justify-between items-start gap-2">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ICU Occupancy</p>
                                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 flex-shrink-0">
                                    <Bed className="w-4 h-4" />
                                </div>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 sm:mt-3 tracking-tight">36 / 50</h3>
                            <p className="text-xs text-amber-400 font-medium mt-2 truncate">
                                ⚠️ 72% Occupied <span className="text-slate-500 font-normal">(14 Available)</span>
                            </p>
                        </div>

                        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all">
                            <div className="flex justify-between items-start gap-2">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Emergency Triage</p>
                                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 flex-shrink-0">
                                    <Siren className="w-4 h-4" />
                                </div>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 sm:mt-3 tracking-tight">09</h3>
                            <p className="text-xs text-rose-400 font-medium mt-2 truncate">
                                ⚡ 3 Critical Admissions
                            </p>
                        </div>
                    </div>

                    {/* Operational Workspace Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Table View (Takes 2 columns on large screens) */}
                        <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4 sm:p-6 space-y-4 min-w-0">
                            <div className="flex justify-between items-center gap-2">
                                <h2 className="text-sm sm:text-base font-bold text-white truncate">Recent Active Admissions</h2>
                                <button className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0">
                                    View All <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {/* Horizontally Scrollable Table Container */}
                            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                                <table className="w-full text-left border-collapse min-w-[550px]">
                                    <thead>
                                        <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                            <th className="pb-3 pr-4">Patient ID</th>
                                            <th className="pb-3 pr-4">Name</th>
                                            <th className="pb-3 pr-4">Department</th>
                                            <th className="pb-3 pr-4">Condition</th>
                                            <th className="pb-3 text-right">Room</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/50 text-xs">
                                        {recentPatients.map((patient) => (
                                            <tr key={patient.id} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="py-3.5 pr-4 font-mono text-slate-400">{patient.id}</td>
                                                <td className="py-3.5 pr-4 font-semibold text-slate-200">{patient.name}</td>
                                                <td className="py-3.5 pr-4 text-slate-400">{patient.dept}</td>
                                                <td className="py-3.5 pr-4">
                                                    <span
                                                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${patient.condition === 'Critical'
                                                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                                                : patient.condition === 'Stable'
                                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                            }`}
                                                    >
                                                        {patient.condition}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 text-right font-mono text-slate-300">{patient.room}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Quick Actions & Workload Panel */}
                        <div className="space-y-6">
                            {/* Actions Panel */}
                            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800/80 p-4 sm:p-6 space-y-4">
                                <h2 className="text-sm sm:text-base font-bold text-white">Emergency Actions</h2>
                                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                                    <button className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-left transition-all active:scale-95 group">
                                        <Ambulance className="w-5 h-5 text-rose-400 mb-2" />
                                        <p className="text-xs font-bold text-slate-200 group-hover:text-blue-400 truncate">Call ER Unit</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5 truncate">Dispatch Code Red</p>
                                    </button>
                                    <button className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-left transition-all active:scale-95 group">
                                        <Pill className="w-5 h-5 text-indigo-400 mb-2" />
                                        <p className="text-xs font-bold text-slate-200 group-hover:text-blue-400 truncate">Order Pharma</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5 truncate">Stat Dispense</p>
                                    </button>
                                    <button className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-left transition-all active:scale-95 group">
                                        <FlaskConical className="w-5 h-5 text-amber-400 mb-2" />
                                        <p className="text-xs font-bold text-slate-200 group-hover:text-blue-400 truncate">Lab Requisition</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5 truncate">STAT Pathology</p>
                                    </button>
                                    <button className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-left transition-all active:scale-95 group">
                                        <ClipboardList className="w-5 h-5 text-emerald-400 mb-2" />
                                        <p className="text-xs font-bold text-slate-200 group-hover:text-blue-400 truncate">Shift Log</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5 truncate">Handover Report</p>
                                    </button>
                                </div>
                            </div>

                            {/* Department Capacity Gauges */}
                            <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4 sm:p-6 space-y-3">
                                <h2 className="text-sm sm:text-base font-bold text-white">Department Capacity</h2>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-slate-400">Cardiology</span>
                                            <span className="text-slate-200 font-semibold">88%</span>
                                        </div>
                                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-blue-500 h-full w-[88%]" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-slate-400">Emergency Unit</span>
                                            <span className="text-slate-200 font-semibold">94%</span>
                                        </div>
                                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-rose-500 h-full w-[94%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}