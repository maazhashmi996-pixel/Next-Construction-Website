'use client';

import { useState } from 'react';
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
} from 'lucide-react';

export default function Dashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Overview');
    const [searchTerm, setSearchTerm] = useState('');

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
        <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased">
            {/* Sidebar Navigation */}
            <aside className="w-72 bg-slate-900/90 border-r border-slate-800/80 p-6 flex flex-col justify-between backdrop-blur-xl">
                <div>
                    {/* Brand Logo */}
                    <div className="flex items-center gap-3.5 mb-10 px-2">
                        <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
                            H
                        </div>
                        <div>
                            <h2 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                                HMIS<span className="text-blue-500">.</span>
                            </h2>
                            <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-widest block -mt-0.5">
                                Enterprise v2.4
                            </span>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="space-y-1.5">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.name;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        setActiveTab(item.name);
                                        router.push(item.href);
                                    }}
                                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold'
                                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.name}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* User Profile & Logout */}
                <div className="pt-6 border-t border-slate-800/80 space-y-3">
                    <div className="flex items-center gap-3 px-2">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center font-semibold text-slate-200">
                                DR
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold truncate text-slate-200">Dr. Alexander</p>
                            <p className="text-xs text-slate-400 truncate">Chief Medical Officer</p>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push('/')}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-400 text-slate-400 transition-all text-xs font-semibold"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Workspace */}
            <main className="flex-1 flex flex-col overflow-y-auto">
                {/* Top Sticky Header */}
                <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-8 py-4 flex justify-between items-center">
                    {/* Search Bar */}
                    <div className="relative w-96">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search patients, doctors, medical record #..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    {/* Quick Controls & Status */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/dashboard/register')}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            Register New Patient
                        </button>
                        <div className="h-6 w-px bg-slate-800" />
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Live Network Active
                        </span>
                    </div>
                </header>

                {/* Dashboard Body */}
                <div className="p-8 space-y-8 max-w-7xl w-full mx-auto">
                    {/* Title Section */}
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight">Clinical Overview</h1>
                            <p className="text-xs text-slate-400 mt-1">Real-time hospital operations and patient metrics.</p>
                        </div>
                        <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                            Shift: <span className="text-slate-200 font-semibold">Morning (08:00 - 16:00)</span>
                        </div>
                    </div>

                    {/* Metric Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
                            <div className="flex justify-between items-start">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Patients</p>
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                    <Activity className="w-4 h-4" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white mt-3 tracking-tight">1,248</h3>
                            <p className="text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1">
                                ↑ +12.5% <span className="text-slate-500 font-normal">from last week</span>
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
                            <div className="flex justify-between items-start">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Appointments</p>
                                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                                    <Calendar className="w-4 h-4" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white mt-3 tracking-tight">42</h3>
                            <p className="text-xs text-blue-400 font-medium mt-2 flex items-center gap-1">
                                ● 8 Consultations Scheduled Today
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
                            <div className="flex justify-between items-start">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ICU Bed Occupancy</p>
                                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                                    <Bed className="w-4 h-4" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white mt-3 tracking-tight">36 / 50</h3>
                            <p className="text-xs text-amber-400 font-medium mt-2 flex items-center gap-1">
                                ⚠️ 72% Occupied <span className="text-slate-500 font-normal">(14 Available)</span>
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
                            <div className="flex justify-between items-start">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Emergency Triage</p>
                                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                                    <Siren className="w-4 h-4" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white mt-3 tracking-tight">09</h3>
                            <p className="text-xs text-rose-400 font-medium mt-2 flex items-center gap-1">
                                ⚡ 3 Critical Admissions
                            </p>
                        </div>
                    </div>

                    {/* Main Grid: Patient Queue & Operational Panels */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Patients Table (2 Cols) */}
                        <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-base font-bold text-white">Recent Active Admissions</h2>
                                <button className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                                    View All Directory <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                            <th className="pb-3">Patient ID</th>
                                            <th className="pb-3">Name</th>
                                            <th className="pb-3">Department</th>
                                            <th className="pb-3">Condition</th>
                                            <th className="pb-3 text-right">Room</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/50 text-xs">
                                        {recentPatients.map((patient) => (
                                            <tr key={patient.id} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="py-3.5 font-mono text-slate-400">{patient.id}</td>
                                                <td className="py-3.5 font-semibold text-slate-200">{patient.name}</td>
                                                <td className="py-3.5 text-slate-400">{patient.dept}</td>
                                                <td className="py-3.5">
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

                        {/* Quick Actions & On-Duty Panel (1 Col) */}
                        <div className="space-y-6">
                            {/* Emergency Action Panel */}
                            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800/80 p-6 space-y-4">
                                <h2 className="text-base font-bold text-white">Emergency Quick Actions</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-left transition-all group">
                                        <Ambulance className="w-5 h-5 text-rose-400 mb-2" />
                                        <p className="text-xs font-bold text-slate-200 group-hover:text-blue-400">Call ER Unit</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">Dispatch Code Red</p>
                                    </button>
                                    <button className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-left transition-all group">
                                        <Pill className="w-5 h-5 text-indigo-400 mb-2" />
                                        <p className="text-xs font-bold text-slate-200 group-hover:text-blue-400">Order Pharma</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">Stat Dispense</p>
                                    </button>
                                    <button className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-left transition-all group">
                                        <FlaskConical className="w-5 h-5 text-amber-400 mb-2" />
                                        <p className="text-xs font-bold text-slate-200 group-hover:text-blue-400">Lab Requisition</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">STAT Pathology</p>
                                    </button>
                                    <button className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-left transition-all group">
                                        <ClipboardList className="w-5 h-5 text-emerald-400 mb-2" />
                                        <p className="text-xs font-bold text-slate-200 group-hover:text-blue-400">Shift Log</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">Handover Report</p>
                                    </button>
                                </div>
                            </div>

                            {/* Department Status */}
                            <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-3">
                                <h2 className="text-base font-bold text-white">Department Workload</h2>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-slate-400">Cardiology</span>
                                            <span className="text-slate-200 font-semibold">88% Capacity</span>
                                        </div>
                                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-blue-500 h-full w-[88%]" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-slate-400">Emergency & Trauma</span>
                                            <span className="text-slate-200 font-semibold">94% Capacity</span>
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