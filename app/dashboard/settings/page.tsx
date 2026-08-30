'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Settings,
    Sun,
    Moon,
    ArrowLeft,
    CheckCircle2,
    Hospital,
    Bell,
    Shield,
    Database,
    Globe,
    Save,
    Lock,
    X,
    Laptop,
    Mail,
    Building2,
    Clock,
    BadgeCheck,
    Key,
    Server,
    Volume2,
} from 'lucide-react';

type TabType = 'theme' | 'general' | 'notifications' | 'security';
type ThemeMode = 'dark' | 'light' | 'system';

interface TabConfig {
    id: TabType;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabConfig[] = [
    { id: 'theme', label: 'Theme & Appearance', description: 'Visual preferences and display mode', icon: Sun },
    { id: 'general', label: 'Hospital Profile', description: 'Facility information and system localization', icon: Hospital },
    { id: 'notifications', label: 'Alerts & Notifications', description: 'Triggers, email digests, and SMS alerts', icon: Bell },
    { id: 'security', label: 'Security & Access', description: 'Authentication, backups, and network rules', icon: Shield },
];

export default function SettingsPage() {
    const router = useRouter();
    const [theme, setTheme] = useState<ThemeMode>('dark');
    const [activeTab, setActiveTab] = useState<TabType>('theme');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Hospital Profile Form State
    const [facilityName, setFacilityName] = useState('Central City Medical Center');
    const [facilityId, setFacilityId] = useState('HMIS-PK-9042');
    const [contactEmail, setContactEmail] = useState('admin@centralcity.med');
    const [timezone, setTimezone] = useState('UTC +05:00 (Asia/Karachi)');

    // Notification Preferences
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [stockSmsAlerts, setStockSmsAlerts] = useState(true);
    const [rosterDutyAlerts, setRosterDutyAlerts] = useState(false);

    // Security Settings State
    const [twoFactorAuth, setTwoFactorAuth] = useState(true);
    const [autoBackups, setAutoBackups] = useState(true);
    const [ipWhitelisting, setIpWhitelisting] = useState(false);

    // Synchronize Theme Changes
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            root.classList.remove('light');
        } else if (theme === 'light') {
            root.classList.remove('dark');
            root.classList.add('light');
        } else {
            // System preference logic
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (systemPrefersDark) {
                root.classList.add('dark');
                root.classList.remove('light');
            } else {
                root.classList.remove('dark');
                root.classList.add('light');
            }
        }
    }, [theme]);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const handleThemeChange = (selectedTheme: ThemeMode) => {
        setTheme(selectedTheme);
        showToast(`Theme switched to ${selectedTheme.toUpperCase()} mode.`);
    };

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        showToast('System configuration saved successfully!');
    };

    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    return (
        <div className={`min-h-screen transition-colors duration-300 flex flex-col font-sans antialiased ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
            }`}>
            {/* Notification Toast */}
            {toastMessage && (
                <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 ${isDark ? 'bg-slate-900/90 border-blue-500/40 text-blue-400' : 'bg-white/90 border-blue-600/30 text-blue-600'
                    }`}>
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                    <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{toastMessage}</span>
                    <button
                        onClick={() => setToastMessage(null)}
                        className="ml-3 text-slate-400 hover:text-slate-600 transition-colors"
                        aria-label="Close notification"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Top Navigation Header */}
            <header className={`sticky top-0 z-30 backdrop-blur-xl border-b px-6 lg:px-10 py-4 flex justify-between items-center transition-colors ${isDark ? 'bg-slate-950/80 border-slate-800/80' : 'bg-white/80 border-slate-200 shadow-sm'
                }`}>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${isDark
                            ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                            }`}
                        aria-label="Back to dashboard"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
                            <Settings className="w-5 h-5 text-blue-500" />
                            System Settings & Preferences
                        </h1>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Configure facility parameters, security parameters, and interface visual themes.
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleSaveSettings}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/25 transition-all cursor-pointer active:scale-95"
                >
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </header>

            {/* Main Content Area: Sidebar + Active Tab Content */}
            <main className="p-6 lg:p-10 max-w-7xl w-full mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Navigation Sidebar */}
                <aside className="lg:col-span-3 space-y-1.5">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const active = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full text-left flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all cursor-pointer ${active
                                    ? isDark
                                        ? 'bg-blue-600/10 border-blue-500/40 text-blue-400 shadow-sm'
                                        : 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                                    : isDark
                                        ? 'border-transparent text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                                        : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                            >
                                <div className={`p-2 rounded-xl mt-0.5 ${active
                                    ? 'bg-blue-600 text-white'
                                    : isDark ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                    <h2 className="text-xs font-bold leading-tight">{tab.label}</h2>
                                    <p className={`text-[11px] mt-0.5 line-clamp-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                        {tab.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </aside>

                {/* Right Tab Content Viewport */}
                <section className="lg:col-span-9">
                    {/* TAB 1: Theme & Appearance */}
                    {activeTab === 'theme' && (
                        <div className={`p-6 lg:p-8 rounded-3xl border space-y-6 ${isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
                            }`}>
                            <div>
                                <h3 className="text-base font-bold flex items-center gap-2">
                                    <Sun className="w-5 h-5 text-amber-500" />
                                    Interface Appearance Mode
                                </h3>
                                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Select your preferred visual theme for low-glare night shifts or daylight clinical settings.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {/* Dark Mode Card */}
                                <button
                                    type="button"
                                    onClick={() => handleThemeChange('dark')}
                                    className={`p-5 rounded-2xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between space-y-4 ${theme === 'dark'
                                        ? 'border-blue-500 bg-slate-900 ring-2 ring-blue-500/20'
                                        : isDark
                                            ? 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                                            : 'border-slate-200 bg-slate-900 text-white hover:border-slate-400'
                                        }`}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400">
                                                <Moon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xs text-white">Dark Slate</h4>
                                                <p className="text-[11px] text-slate-400">Night clinical shifts</p>
                                            </div>
                                        </div>
                                        {theme === 'dark' && <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />}
                                    </div>
                                    <div className="h-20 w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 space-y-2">
                                        <div className="h-2.5 w-1/3 bg-blue-600 rounded-md"></div>
                                        <div className="h-2 w-2/3 bg-slate-800 rounded-md"></div>
                                        <div className="h-2 w-1/2 bg-slate-800 rounded-md"></div>
                                    </div>
                                </button>

                                {/* Light Mode Card */}
                                <button
                                    type="button"
                                    onClick={() => handleThemeChange('light')}
                                    className={`p-5 rounded-2xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between space-y-4 ${theme === 'light'
                                        ? 'border-blue-600 bg-slate-50 ring-2 ring-blue-600/20 text-slate-900'
                                        : isDark
                                            ? 'border-slate-800 bg-slate-900 text-slate-200 hover:border-slate-700'
                                            : 'border-slate-200 bg-white hover:border-slate-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                                                <Sun className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className={`font-bold text-xs ${isDark && (theme as string) === 'light' ? 'text-white' : 'text-slate-900'}`}>Light Professional</h4>
                                                <p className="text-[11px] text-slate-500">Daytime operations</p>
                                            </div>
                                        </div>
                                        {theme === 'light' && <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />}
                                    </div>
                                    <div className="h-20 w-full rounded-xl bg-slate-100 border border-slate-200 p-2.5 space-y-2">
                                        <div className="h-2.5 w-1/3 bg-blue-600 rounded-md"></div>
                                        <div className="h-2 w-2/3 bg-slate-300 rounded-md"></div>
                                        <div className="h-2 w-1/2 bg-slate-300 rounded-md"></div>
                                    </div>
                                </button>

                                {/* System Default Card */}
                                <button
                                    type="button"
                                    onClick={() => handleThemeChange('system')}
                                    className={`p-5 rounded-2xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between space-y-4 ${theme === 'system'
                                        ? 'border-blue-500 bg-slate-900/80 ring-2 ring-blue-500/20 text-white'
                                        : isDark
                                            ? 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                                            : 'border-slate-200 bg-white hover:border-slate-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                                                <Laptop className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>System Default</h4>
                                                <p className="text-[11px] text-slate-400">Sync with OS theme</p>
                                            </div>
                                        </div>
                                        {theme === 'system' && <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />}
                                    </div>
                                    <div className="h-20 w-full rounded-xl bg-gradient-to-r from-slate-900 to-slate-100 border border-slate-700/50 p-2.5 space-y-2 flex flex-col justify-center items-center">
                                        <span className="text-[10px] font-mono px-2 py-1 rounded bg-black/50 text-white backdrop-blur">System Auto</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: Hospital Profile */}
                    {activeTab === 'general' && (
                        <form onSubmit={handleSaveSettings} className={`p-6 lg:p-8 rounded-3xl border space-y-6 ${isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
                            }`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base font-bold flex items-center gap-2">
                                        <Hospital className="w-5 h-5 text-blue-500" />
                                        Facility Credentials & Localization
                                    </h3>
                                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        Update official hospital information displayed on prescriptions, discharge summaries, and receipts.
                                    </p>
                                </div>
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium ${isDark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    }`}>
                                    <BadgeCheck className="w-3.5 h-3.5" /> Licensed Facility
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className={`text-xs font-semibold flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                        Hospital / Facility Name
                                    </label>
                                    <input
                                        type="text"
                                        value={facilityName}
                                        onChange={(e) => setFacilityName(e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border text-xs transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${isDark ? 'bg-slate-950/80 border-slate-800 text-slate-100 focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                                            }`}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className={`text-xs font-semibold flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                        <Shield className="w-3.5 h-3.5 text-slate-400" />
                                        License Registration ID
                                    </label>
                                    <input
                                        type="text"
                                        value={facilityId}
                                        onChange={(e) => setFacilityId(e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border text-xs transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${isDark ? 'bg-slate-950/80 border-slate-800 text-slate-100 focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                                            }`}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className={`text-xs font-semibold flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                                        Administrator Contact Email
                                    </label>
                                    <input
                                        type="email"
                                        value={contactEmail}
                                        onChange={(e) => setContactEmail(e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border text-xs transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${isDark ? 'bg-slate-950/80 border-slate-800 text-slate-100 focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                                            }`}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className={`text-xs font-semibold flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                        System Timezone
                                    </label>
                                    <input
                                        type="text"
                                        value={timezone}
                                        onChange={(e) => setTimezone(e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border text-xs transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${isDark ? 'bg-slate-950/80 border-slate-800 text-slate-100 focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                                            }`}
                                    />
                                </div>
                            </div>

                            <div className="pt-2 flex justify-end">
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                                >
                                    Save Facility Profile
                                </button>
                            </div>
                        </form>
                    )}

                    {/* TAB 3: Notifications */}
                    {activeTab === 'notifications' && (
                        <div className={`p-6 lg:p-8 rounded-3xl border space-y-6 ${isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
                            }`}>
                            <div>
                                <h3 className="text-base font-bold flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-emerald-400" />
                                    Automated Alert System
                                </h3>
                                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Configure operational triggers for stock minimums, pharmacy logs, and clinical shift duties.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {/* Option 1 */}
                                <div className={`flex items-center justify-between p-4 lg:p-5 rounded-2xl border transition-all ${isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                                    }`}>
                                    <div className="space-y-0.5">
                                        <p className="font-bold text-xs flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-blue-500" /> Email Summary Reports
                                        </p>
                                        <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                            Receive daily OPD patient count and pharmacy inventory audit logs via email.
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={emailAlerts}
                                            onChange={(e) => setEmailAlerts(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                {/* Option 2 */}
                                <div className={`flex items-center justify-between p-4 lg:p-5 rounded-2xl border transition-all ${isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                                    }`}>
                                    <div className="space-y-0.5">
                                        <p className="font-bold text-xs flex items-center gap-2">
                                            <Volume2 className="w-4 h-4 text-amber-500" /> Low Stock SMS Alerts
                                        </p>
                                        <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                            Instantly notify head of pharmacy when medication stock falls below reorder thresholds.
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={stockSmsAlerts}
                                            onChange={(e) => setStockSmsAlerts(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                {/* Option 3 */}
                                <div className={`flex items-center justify-between p-4 lg:p-5 rounded-2xl border transition-all ${isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                                    }`}>
                                    <div className="space-y-0.5">
                                        <p className="font-bold text-xs flex items-center gap-2">
                                            <Bell className="w-4 h-4 text-emerald-400" /> Roster & Shift Reminders
                                        </p>
                                        <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                            Send push notifications to staff 2 hours prior to scheduled duty rosters.
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={rosterDutyAlerts}
                                            onChange={(e) => setRosterDutyAlerts(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 4: Security */}
                    {activeTab === 'security' && (
                        <div className={`p-6 lg:p-8 rounded-3xl border space-y-6 ${isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
                            }`}>
                            <div>
                                <h3 className="text-base font-bold flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-rose-500" />
                                    Security Controls & System Auditing
                                </h3>
                                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Manage multi-factor authentication policies, database backups, and IP network restrictions.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {/* Card 1 */}
                                <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                                    }`}>
                                    <div className="space-y-2">
                                        <div className="p-2.5 w-fit rounded-xl bg-blue-500/10 text-blue-500">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-bold text-xs">Two-Factor Authentication</h4>
                                        <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                            Mandatory 2FA verification for administrator & doctor accounts.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setTwoFactorAuth(!twoFactorAuth);
                                            showToast(`2FA status updated.`);
                                        }}
                                        className={`w-full py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${twoFactorAuth
                                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                            : 'bg-slate-800/50 border-slate-700 text-slate-400'
                                            }`}
                                    >
                                        {twoFactorAuth ? 'Enforced' : 'Disabled'}
                                    </button>
                                </div>

                                {/* Card 2 */}
                                <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                                    }`}>
                                    <div className="space-y-2">
                                        <div className="p-2.5 w-fit rounded-xl bg-emerald-500/10 text-emerald-400">
                                            <Database className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-bold text-xs">Database Backups</h4>
                                        <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                            Automated daily snapshots stored with AES-256 cloud encryption.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAutoBackups(!autoBackups);
                                            showToast(`Automated backup policy updated.`);
                                        }}
                                        className={`w-full py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${autoBackups
                                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                            : 'bg-slate-800/50 border-slate-700 text-slate-400'
                                            }`}
                                    >
                                        {autoBackups ? 'Active (02:00 UTC)' : 'Paused'}
                                    </button>
                                </div>

                                {/* Card 3 */}
                                <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                                    }`}>
                                    <div className="space-y-2">
                                        <div className="p-2.5 w-fit rounded-xl bg-indigo-500/10 text-indigo-400">
                                            <Globe className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-bold text-xs">IP Whitelisting</h4>
                                        <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                            Restrict HMIS dashboard access to verified hospital network IPs.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIpWhitelisting(!ipWhitelisting);
                                            showToast(`IP Whitelisting status updated.`);
                                        }}
                                        className={`w-full py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${ipWhitelisting
                                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                            : 'bg-slate-800/50 border-slate-700 text-slate-400'
                                            }`}
                                    >
                                        {ipWhitelisting ? 'Enabled' : 'Disabled'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}