'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UserPlus, Save, ShieldAlert, HeartPulse, UserCheck, PhoneCall } from 'lucide-react';

export default function RegisterPatient() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        department: 'Cardiology',
        admissionType: 'Outpatient',
        triageLevel: 'Stable',
        allergies: '',
        medicalHistory: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registering Patient:', formData);
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 md:p-8 flex flex-col items-center">
            <div className="max-w-4xl w-full space-y-4 sm:space-y-6">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 sm:pb-5 gap-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="p-2 sm:p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-all shrink-0"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                                <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 shrink-0" />
                                Patient Admission & Registration
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                                Enter complete personal and clinical details to assign an MRN.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

                    {/* Personal Information */}
                    <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
                        <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                            <HeartPulse className="w-4 h-4" /> Personal Information
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="e.g. John"
                                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="e.g. Doe"
                                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Date of Birth *</label>
                                <input
                                    type="date"
                                    name="dob"
                                    required
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Gender *</label>
                                <select
                                    name="gender"
                                    required
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+92 300 0000000"
                                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="patient@example.com"
                                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-slate-400 mb-1">Residential Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Street, Area, City"
                                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Emergency Contact Section */}
                    <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
                        <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-2">
                            <PhoneCall className="w-4 h-4" /> Emergency Contact
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Contact Person Name</label>
                                <input
                                    type="text"
                                    name="emergencyContactName"
                                    value={formData.emergencyContactName}
                                    onChange={handleChange}
                                    placeholder="Next of Kin / Guardian"
                                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Emergency Contact Phone</label>
                                <input
                                    type="tel"
                                    name="emergencyContactPhone"
                                    value={formData.emergencyContactPhone}
                                    onChange={handleChange}
                                    placeholder="+92 300 0000000"
                                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Clinical Triage & Department Assignment */}
                    <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
                        <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4" /> Triage & Admission Unit
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Department</label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Neurology">Neurology</option>
                                    <option value="Orthopedics">Orthopedics</option>
                                    <option value="Emergency">Emergency & Trauma</option>
                                    <option value="Pediatrics">Pediatrics</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Admission Type</label>
                                <select
                                    name="admissionType"
                                    value={formData.admissionType}
                                    onChange={handleChange}
                                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Outpatient">Outpatient (OPD)</option>
                                    <option value="Inpatient">Inpatient (IPD)</option>
                                    <option value="ICU">ICU Admission</option>
                                    <option value="Emergency">Emergency Triage</option>
                                </select>
                            </div>
                            <div className="sm:col-span-2 lg:col-span-1">
                                <label className="block text-xs font-medium text-slate-400 mb-1">Initial Status</label>
                                <select
                                    name="triageLevel"
                                    value={formData.triageLevel}
                                    onChange={handleChange}
                                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Stable">Stable</option>
                                    <option value="Under Observation">Under Observation</option>
                                    <option value="Critical">Critical</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Known Allergies / Medical Notes</label>
                            <textarea
                                name="allergies"
                                rows={3}
                                value={formData.allergies}
                                onChange={handleChange}
                                placeholder="List known drug allergies, pre-existing conditions..."
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 sm:gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-all text-center min-h-[42px]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all min-h-[42px]"
                        >
                            <Save className="w-4 h-4 shrink-0" />
                            Complete Registration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}