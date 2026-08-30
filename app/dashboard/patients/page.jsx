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
    Filter,
    ChevronRight,
    ArrowLeft,
    MoreVertical,
    FileText,
} from 'lucide-react';

export default function PatientsDirectory() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const navItems = [
        { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
        { name: 'Patients', icon: Users, href: '/dashboard/patients' },
        { name: 'Doctors & Staff', icon: Stethoscope, href: '/dashboard/doctors' },
        { name: 'Appointments', icon: Calendar, href: '/dashboard/appointments' },
        { name: 'Pharmacy & Stock', icon: Pill, href: '/dashboard/pharmacy' },
        { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
    ];

    const allPatients = [
        { id: 'P-1092', name: 'Eleanor Pena', age: 45, gender: 'Female', dept: 'Cardiology', status: 'Admitted', condition: 'Stable', room: '302-A', doctor: 'Dr. Sarah Jenkins', date: '2026-08-28' },
        { id: 'P-1093', name: 'Cameron Williamson', age: 29, gender: 'Male', dept: 'Neurology', status: 'ICU', condition: 'Critical', room: 'ICU-04', doctor: 'Dr. Marcus Vance', date: '2026-08-29' },
        { id: 'P-1094', name: 'Esther Howard', age: 62, gender: 'Female', dept: 'Orthopedics', status: 'Outpatient', condition: 'Recovered', room: 'OPD-12', doctor: 'Dr. Emily Chen', date: '2026-08-30' },
        { id: 'P-1095', name: 'Robert Fox', age: 38, gender: 'Male', dept: 'Emergency', status: 'Triage', condition: 'Under Observation', room: 'ER-02', doctor: 'Dr. Alan Grant', date: '2026-08-30' },
        { id: 'P-1096', name: 'Jenny Wilson', age: 54, gender: 'Female', dept: 'Pulmonology', status: 'Admitted', condition: 'Stable', room: '210-B', doctor: 'Dr. Sarah Jenkins', date: '2026-08-25' },
        { id: 'P-1097', name: 'Guy Hawkins', age: 71, gender: 'Male', dept: 'Oncology', status: 'Admitted', condition: 'Fair', room: '405-A', doctor: 'Dr. Lisa Ray', date: '2026-08-22' },
        { id: 'P-1098', name: 'Kristin Watson', age: 33, gender: 'Female', dept: 'Gynecology', status: 'Discharged', condition: 'Recovered', room: 'N/A', doctor: 'Dr. Anita Roy', date: '2026-08-20' },
    ];

    const filteredPatients = allPatients.filter((patient) => {
        const matchesSearch =
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.dept.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased">
            {/* Sidebar Navigation */}
            <aside className="w-72 bg-slate-900/90 border-r border-slate-800/80 p-6 flex flex-col justify-between backdrop-blur-xl">
                <div>
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

                    <nav className="space-y-1.5">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = item.name === 'Patients';
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => router.push(item.href)}
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

                <div className="pt-6 border-t border-slate-800/80 space-y-3">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center font-semibold text-slate-200">
                            DR
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
                <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <h1 className="text-xl font-bold text-white tracking-tight">Patient Directory</h1>
                    </div>

                    <button
                        onClick={() => router.push('/dashboard/register')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        Register New Patient
                    </button>
                </header>

                <div className="p-8 space-y-6 max-w-7xl w-full mx-auto">
                    {/* Search and Filters Bar */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
                        <div className="relative w-full sm:w-96">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search by name, ID, or department..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Filter className="w-4 h-4 text-slate-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 focus:outline-none focus:border-blue-500"
                            >
                                <option value="All">All Statuses</option>
                                <option value="Admitted">Admitted</option>
                                <option value="ICU">ICU</option>
                                <option value="Outpatient">Outpatient</option>
                                <option value="Triage">Triage</option>
                                <option value="Discharged">Discharged</option>
                            </select>
                        </div>
                    </div>

                    {/* Patient Table */}
                    <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                        <th className="pb-3">Patient ID</th>
                                        <th className="pb-3">Patient Name</th>
                                        <th className="pb-3">Age / Gender</th>
                                        <th className="pb-3">Department</th>
                                        <th className="pb-3">Attending Physician</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3">Room</th>
                                        <th className="pb-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50 text-xs">
                                    {filteredPatients.map((patient) => (
                                        <tr key={patient.id} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="py-4 font-mono text-slate-400">{patient.id}</td>
                                            <td className="py-4 font-semibold text-slate-200">{patient.name}</td>
                                            <td className="py-4 text-slate-400">{patient.age} yrs / {patient.gender}</td>
                                            <td className="py-4 text-slate-400">{patient.dept}</td>
                                            <td className="py-4 text-slate-300">{patient.doctor}</td>
                                            <td className="py-4">
                                                <span
                                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${patient.status === 'ICU'
                                                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                                            : patient.status === 'Admitted'
                                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                        }`}
                                                >
                                                    {patient.status}
                                                </span>
                                            </td>
                                            <td className="py-4 font-mono text-slate-300">{patient.room}</td>
                                            <td className="py-4 text-right">
                                                <button
                                                    onClick={() => router.push(`/dashboard/patients/${patient.id}`)}
                                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all inline-flex items-center gap-1 text-[11px] font-semibold"
                                                >
                                                    <FileText className="w-3.5 h-3.5" />
                                                    Record
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}