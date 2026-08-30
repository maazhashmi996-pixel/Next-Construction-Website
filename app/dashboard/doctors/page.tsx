'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
    Stethoscope,
    Search,
    Plus,
    CheckCircle2,
    ArrowLeft,
    Phone,
    Mail,
    Calendar,
    Clock,
    Filter,
    Award,
    MoreVertical,
    UserCheck,
    AlertCircle,
    X,
} from 'lucide-react';

interface Doctor {
    id: string;
    name: string;
    role: string;
    dept: string;
    status: 'On Duty' | 'On Call' | 'Off Duty';
    opdRoom: string;
    phone: string;
    email: string;
    experience: string;
    rating: number;
    avatarBg: string;
}

export default function DoctorsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [activeNotification, setActiveNotification] = useState<string | null>(null);

    const departments = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Emergency', 'Pediatrics'];

    const doctorsList: Doctor[] = [
        {
            id: 'DOC-401',
            name: 'Dr. Sarah Jenkins',
            role: 'Head of Cardiology',
            dept: 'Cardiology',
            status: 'On Duty',
            opdRoom: 'OPD-302',
            phone: '+1 (555) 234-5678',
            email: 's.jenkins@hmis.med',
            experience: '14 Yrs',
            rating: 4.9,
            avatarBg: 'bg-blue-600',
        },
        {
            id: 'DOC-402',
            name: 'Dr. Marcus Vance',
            role: 'Senior Neurologist',
            dept: 'Neurology',
            status: 'On Duty',
            opdRoom: 'ICU-B',
            phone: '+1 (555) 345-6789',
            email: 'm.vance@hmis.med',
            experience: '11 Yrs',
            rating: 4.8,
            avatarBg: 'bg-indigo-600',
        },
        {
            id: 'DOC-403',
            name: 'Dr. Elena Rostova',
            role: 'Orthopedic Surgeon',
            dept: 'Orthopedics',
            status: 'On Call',
            opdRoom: 'OPD-104',
            phone: '+1 (555) 456-7890',
            email: 'e.rostova@hmis.med',
            experience: '9 Yrs',
            rating: 4.7,
            avatarBg: 'bg-violet-600',
        },
        {
            id: 'DOC-404',
            name: 'Dr. Julian Thorne',
            role: 'Emergency Lead Specialist',
            dept: 'Emergency',
            status: 'On Duty',
            opdRoom: 'ER-01',
            phone: '+1 (555) 567-8901',
            email: 'j.thorne@hmis.med',
            experience: '16 Yrs',
            rating: 4.95,
            avatarBg: 'bg-rose-600',
        },
        {
            id: 'DOC-405',
            name: 'Dr. Amara Chen',
            role: 'Pediatric Consultant',
            dept: 'Pediatrics',
            status: 'Off Duty',
            opdRoom: 'OPD-210',
            phone: '+1 (555) 678-9012',
            email: 'a.chen@hmis.med',
            experience: '7 Yrs',
            rating: 4.85,
            avatarBg: 'bg-amber-600',
        },
        {
            id: 'DOC-406',
            name: 'Dr. David Miller',
            role: 'Interventional Cardiologist',
            dept: 'Cardiology',
            status: 'On Call',
            opdRoom: 'OPD-305',
            phone: '+1 (555) 789-0123',
            email: 'd.miller@hmis.med',
            experience: '12 Yrs',
            rating: 4.75,
            avatarBg: 'bg-cyan-600',
        },
    ];

    const filteredDoctors = useMemo(() => {
        return doctorsList.filter((doc) => {
            const matchesSearch =
                doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.id.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesDept = selectedDept === 'All' || doc.dept === selectedDept;
            const matchesStatus = selectedStatus === 'All' || doc.status === selectedStatus;

            return matchesSearch && matchesDept && matchesStatus;
        });
    }, [searchTerm, selectedDept, selectedStatus]);

    const notify = (msg: string) => {
        setActiveNotification(msg);
        setTimeout(() => setActiveNotification(null), 3500);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
            {/* Notification Toast */}
            {activeNotification && (
                <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:w-auto z-50 flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-blue-500/40 text-blue-400 shadow-2xl animate-in fade-in slide-in-from-bottom-5">
                    <div className="flex items-center gap-3 min-w-0">
                        <AlertCircle className="w-5 h-5 text-blue-400 shrink-0" />
                        <span className="text-xs font-semibold text-slate-200 truncate">{activeNotification}</span>
                    </div>
                    <button onClick={() => setActiveNotification(null)} className="text-slate-400 hover:text-white shrink-0 ml-2">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Top Navigation Header */}
            <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all shrink-0"
                        aria-label="Back to dashboard"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div className="min-w-0">
                        <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2 truncate">
                            <Stethoscope className="w-5 h-5 text-blue-500 shrink-0" />
                            <span className="truncate">Doctors & Medical Staff Directory</span>
                        </h1>
                        <p className="text-xs text-slate-400 truncate hidden sm:block">Manage duty rosters, availability, and physician profiles.</p>
                    </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t border-slate-800/50 sm:border-0">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] sm:text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        Roster Updated
                    </span>
                    <button
                        onClick={() => notify('Add Specialist Form Modal Triggered')}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all cursor-pointer shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Specialist</span>
                    </button>
                </div>
            </header>

            {/* Main Content Body */}
            <main className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl w-full mx-auto flex-1">
                {/* Metric Summary Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                            <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider truncate">Total Consultants</p>
                            <h3 className="text-xl sm:text-2xl font-bold text-white">48 Doctors</h3>
                        </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                            <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider truncate">Currently On Duty</p>
                            <h3 className="text-xl sm:text-2xl font-bold text-emerald-400">28 Active</h3>
                        </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider truncate">On Call / Standby</p>
                            <h3 className="text-xl sm:text-2xl font-bold text-amber-400">12 Available</h3>
                        </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                            <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider truncate">Avg Patient Rating</p>
                            <h3 className="text-xl sm:text-2xl font-bold text-white">4.88 / 5.0</h3>
                        </div>
                    </div>
                </div>

                {/* Filter & Search Bar Toolbar */}
                <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4 sm:p-5 space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
                        {/* Search Bar */}
                        <div className="relative flex-1 w-full lg:max-w-md">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search by name, specialist title, or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        {/* Status Tabs */}
                        <div className="flex items-center gap-1 sm:gap-2 bg-slate-950/80 border border-slate-800 p-1 rounded-xl overflow-x-auto no-scrollbar scroll-smooth">
                            {['All', 'On Duty', 'On Call', 'Off Duty'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setSelectedStatus(status)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex-1 sm:flex-none text-center ${selectedStatus === status
                                        ? 'bg-blue-600 text-white shadow'
                                        : 'text-slate-400 hover:text-slate-200'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Department Quick Filter Pills */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-800/60 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-1 shrink-0">
                            <Filter className="w-3.5 h-3.5 text-blue-500" /> Department:
                        </span>
                        {departments.map((dept) => (
                            <button
                                key={dept}
                                onClick={() => setSelectedDept(dept)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${selectedDept === dept
                                    ? 'bg-slate-800 text-blue-400 border border-blue-500/30'
                                    : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                                    }`}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Doctors Directory Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doc) => (
                            <div
                                key={doc.id}
                                className="rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 p-4 sm:p-6 flex flex-col justify-between space-y-4 sm:space-y-5 transition-all group"
                            >
                                {/* Top Info & Status */}
                                <div className="space-y-3.5 sm:space-y-4">
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                                            <div
                                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${doc.avatarBg} flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-md shrink-0`}
                                            >
                                                {doc.name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')
                                                    .slice(0, 2)}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-blue-400 transition-colors truncate">
                                                    {doc.name}
                                                </h3>
                                                <p className="text-xs text-slate-400 truncate">{doc.role}</p>
                                            </div>
                                        </div>

                                        <button className="text-slate-500 hover:text-slate-300 p-1 shrink-0">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Badges Bar */}
                                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${doc.status === 'On Duty'
                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                : doc.status === 'On Call'
                                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                    : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                                                }`}
                                        >
                                            ● {doc.status}
                                        </span>
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700/50">
                                            {doc.dept}
                                        </span>
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                            {doc.opdRoom}
                                        </span>
                                    </div>

                                    {/* Detailed Stats */}
                                    <div className="space-y-2 pt-1 sm:pt-2 text-xs text-slate-400">
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-2 min-w-0 truncate">
                                                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                                <span className="truncate">{doc.email}</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-2 min-w-0 truncate">
                                                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                                <span className="truncate">{doc.phone}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer & Action Buttons */}
                                <div className="pt-3 sm:pt-4 border-t border-slate-800/80 flex items-center gap-2">
                                    <button
                                        onClick={() => router.push(`/dashboard/appointments?doctorId=${doc.id}`)}
                                        className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                        <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                        <span>Schedule</span>
                                    </button>
                                    <button
                                        onClick={() => notify(`Direct page request sent to ${doc.name}`)}
                                        className="py-2 px-3 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-xs font-semibold text-blue-400 transition-all shrink-0"
                                    >
                                        Page Doctor
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 px-4 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80">
                            <Stethoscope className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                            <p className="text-sm font-semibold text-slate-300">No medical personnel match your query</p>
                            <p className="text-xs text-slate-500 mt-1">Try clearing filters or searching for another term.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}