'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Calendar as CalendarIcon,
    Clock,
    User,
    Stethoscope,
    ArrowLeft,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    FileText,
    Building2,
    ShieldCheck,
    X,
} from 'lucide-react';

interface MockDoctor {
    id: string;
    name: string;
    role: string;
    dept: string;
    opdRoom: string;
    avatarBg: string;
}

const mockDoctors: Record<string, MockDoctor> = {
    'DOC-401': {
        id: 'DOC-401',
        name: 'Dr. Sarah Jenkins',
        role: 'Head of Cardiology',
        dept: 'Cardiology',
        opdRoom: 'OPD-302',
        avatarBg: 'bg-blue-600',
    },
    'DOC-402': {
        id: 'DOC-402',
        name: 'Dr. Marcus Vance',
        role: 'Senior Neurologist',
        dept: 'Neurology',
        opdRoom: 'ICU-B',
        avatarBg: 'bg-indigo-600',
    },
    'DOC-403': {
        id: 'DOC-403',
        name: 'Dr. Elena Rostova',
        role: 'Orthopedic Surgeon',
        dept: 'Orthopedics',
        opdRoom: 'OPD-104',
        avatarBg: 'bg-violet-600',
    },
    'DOC-404': {
        id: 'DOC-404',
        name: 'Dr. Julian Thorne',
        role: 'Emergency Lead Specialist',
        dept: 'Emergency',
        opdRoom: 'ER-01',
        avatarBg: 'bg-rose-600',
    },
};

function AppointmentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const doctorId = searchParams.get('doctorId') || 'DOC-401';

    const doctor = mockDoctors[doctorId] || mockDoctors['DOC-401'];

    const [selectedDate, setSelectedDate] = useState('2026-09-01');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00 AM');
    const [appointmentType, setAppointmentType] = useState('OPD Consultation');
    const [patientName, setPatientName] = useState('');
    const [patientMRN, setPatientMRN] = useState('');
    const [notes, setNotes] = useState('');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const availableTimeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:30 AM', '02:00 PM', '02:30 PM', '03:15 PM'
    ];

    const upcomingAppointments = [
        {
            id: 'APT-8921',
            patient: 'Robert Chen',
            mrn: 'MRN-9021',
            time: '09:00 AM',
            date: '2026-09-01',
            type: 'Follow-up',
            status: 'Confirmed',
        },
        {
            id: 'APT-8922',
            patient: 'Aisha Malik',
            mrn: 'MRN-4410',
            time: '09:30 AM',
            date: '2026-09-01',
            type: 'OPD Consultation',
            status: 'In Progress',
        },
        {
            id: 'APT-8923',
            patient: 'David Miller',
            mrn: 'MRN-3319',
            time: '11:00 AM',
            date: '2026-09-01',
            type: 'Routine Checkup',
            status: 'Pending',
        },
    ];

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        if (!patientName) {
            setToastMessage('Please enter patient name to proceed');
            return;
        }
        setToastMessage(`Appointment scheduled successfully for ${patientName} with ${doctor.name}!`);
        setTimeout(() => {
            setToastMessage(null);
        }, 4000);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-400 shadow-2xl animate-in fade-in slide-in-from-bottom-5">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-semibold text-slate-200">{toastMessage}</span>
                    <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Header */}
            <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/dashboard/doctors')}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-blue-500" />
                            Schedule New Appointment
                        </h1>
                        <p className="text-xs text-slate-400">Book clinical slots and manage doctor consultation schedules.</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <span>Doctors Directory</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-blue-400">Appointment Scheduling</span>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-8 space-y-8 max-w-7xl w-full mx-auto flex-1">
                {/* Physician Summary Card */}
                <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl ${doctor.avatarBg} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                            {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-bold text-white">{doctor.name}</h2>
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    {doctor.id}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{doctor.role} • {doctor.dept}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-xs text-slate-400 border-t md:border-t-0 border-slate-800/80 pt-4 md:pt-0">
                        <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-slate-500" />
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase font-semibold">Assigned Room</p>
                                <p className="font-semibold text-slate-200">{doctor.opdRoom}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase font-semibold">Duty Status</p>
                                <p className="font-semibold text-emerald-400">Available for OPD</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Form Setup */}
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={handleBooking} className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
                                <FileText className="w-4 h-4 text-blue-400" />
                                Appointment & Patient Info
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-300">Patient Full Name</label>
                                    <div className="relative">
                                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input
                                            type="text"
                                            placeholder="Enter patient full name"
                                            value={patientName}
                                            onChange={(e) => setPatientName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-300">Patient Medical Record No. (MRN)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. MRN-8842"
                                        value={patientMRN}
                                        onChange={(e) => setPatientMRN(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Consultation Type */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-300">Consultation Category</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['OPD Consultation', 'Follow-up', 'Emergency Assessment'].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setAppointmentType(type)}
                                            className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${appointmentType === type
                                                    ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                                                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Date & Time Slot Selection */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-semibold text-slate-300">Select Date & Available Time Slot</label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="bg-slate-950 border border-slate-800 text-xs text-slate-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-4 gap-2.5">
                                    {availableTimeSlots.map((slot) => (
                                        <button
                                            key={slot}
                                            type="button"
                                            onClick={() => setSelectedTimeSlot(slot)}
                                            className={`py-2.5 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${selectedTimeSlot === slot
                                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                                                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                                                }`}
                                        >
                                            <Clock className="w-3.5 h-3.5" />
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Clinical Notes */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-300">Clinical Notes / Reason for Visit</label>
                                <textarea
                                    rows={3}
                                    placeholder="Enter initial complaints or referral details..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-600/20 cursor-pointer flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Confirm & Book Appointment
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Existing Doctor Roster */}
                    <div className="space-y-6">
                        <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-4">
                            <h3 className="text-sm font-bold text-white tracking-wider flex items-center justify-between border-b border-slate-800/80 pb-3">
                                <span className="flex items-center gap-2">
                                    <Stethoscope className="w-4 h-4 text-blue-400" />
                                    Today's Doctor Queue
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    3 Booked
                                </span>
                            </h3>

                            <div className="space-y-3">
                                {upcomingAppointments.map((apt) => (
                                    <div
                                        key={apt.id}
                                        className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-all"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-xs font-bold text-white">{apt.patient}</p>
                                                <p className="text-[10px] text-slate-500">{apt.mrn}</p>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${apt.status === 'Confirmed'
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                    : apt.status === 'In Progress'
                                                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                        : 'bg-slate-800 text-slate-400'
                                                }`}>
                                                {apt.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/50">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3 text-blue-400" />
                                                {apt.time}
                                            </span>
                                            <span className="text-slate-500">{apt.type}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function AppointmentsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center text-xs">Loading appointments page...</div>}>
            <AppointmentContent />
        </Suspense>
    );
}