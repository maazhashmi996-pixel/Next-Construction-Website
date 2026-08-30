'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
    Pill,
    Search,
    Plus,
    Filter,
    ArrowLeft,
    CheckCircle2,
    AlertTriangle,
    Clock,
    TrendingDown,
    PackagePlus,
    X,
    AlertCircle,
    Download,
    ShoppingBag,
    Layers,
    DollarSign,
} from 'lucide-react';

interface MedicineItem {
    id: string;
    tradeName: string;
    genericName: string;
    category: string;
    batchNo: string;
    stockQty: number;
    reorderLevel: number;
    unitPrice: string;
    expiryDate: string;
    supplier: string;
    status: 'In Stock' | 'Low Stock' | 'Critical' | 'Expired';
}

export default function PharmacyStockPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [activeToast, setActiveToast] = useState<string | null>(null);

    const categories = ['All', 'Antibiotics', 'Analgesics', 'Cardiovascular', 'IV Fluids', 'Respiratory', 'Oncology'];

    const inventory: MedicineItem[] = [
        {
            id: 'MED-1001',
            tradeName: 'Amoxil 500mg',
            genericName: 'Amoxicillin Trihydrate',
            category: 'Antibiotics',
            batchNo: 'B-88392',
            stockQty: 1420,
            reorderLevel: 300,
            unitPrice: '$12.50',
            expiryDate: '2027-11-15',
            supplier: 'GSK Pharma',
            status: 'In Stock',
        },
        {
            id: 'MED-1002',
            tradeName: 'Lipitor 20mg',
            genericName: 'Atorvastatin Calcium',
            category: 'Cardiovascular',
            batchNo: 'B-77401',
            stockQty: 85,
            reorderLevel: 150,
            unitPrice: '$28.00',
            expiryDate: '2026-12-10',
            supplier: 'Pfizer Bio',
            status: 'Low Stock',
        },
        {
            id: 'MED-1003',
            tradeName: 'Normal Saline 0.9%',
            genericName: 'Sodium Chloride 500ml',
            category: 'IV Fluids',
            batchNo: 'B-99120',
            stockQty: 18,
            reorderLevel: 200,
            unitPrice: '$4.20',
            expiryDate: '2028-04-20',
            supplier: 'Baxter Health',
            status: 'Critical',
        },
        {
            id: 'MED-1004',
            tradeName: 'Panadol Extra',
            genericName: 'Paracetamol + Caffeine',
            category: 'Analgesics',
            batchNo: 'B-44102',
            stockQty: 3100,
            reorderLevel: 500,
            unitPrice: '$3.15',
            expiryDate: '2027-08-30',
            supplier: 'Haleon Care',
            status: 'In Stock',
        },
        {
            id: 'MED-1005',
            tradeName: 'Ventolin Inhaler',
            genericName: 'Salbutamol Sulfate 100mcg',
            category: 'Respiratory',
            batchNo: 'B-33291',
            stockQty: 42,
            reorderLevel: 100,
            unitPrice: '$18.90',
            expiryDate: '2026-10-05',
            supplier: 'GSK Pharma',
            status: 'Low Stock',
        },
        {
            id: 'MED-1006',
            tradeName: 'Cefixime 400mg',
            genericName: 'Cefixime Trihydrate',
            category: 'Antibiotics',
            batchNo: 'B-11029',
            stockQty: 0,
            reorderLevel: 100,
            unitPrice: '$22.40',
            expiryDate: '2026-08-15',
            supplier: 'Novartis Ltd',
            status: 'Expired',
        },
    ];

    const filteredInventory = useMemo(() => {
        return inventory.filter((item) => {
            const matchesSearch =
                item.tradeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.batchNo.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
            const matchesStat = selectedStatus === 'All' || item.status === selectedStatus;

            return matchesSearch && matchesCat && matchesStat;
        });
    }, [searchTerm, selectedCategory, selectedStatus]);

    const showNotification = (msg: string) => {
        setActiveToast(msg);
        setTimeout(() => setActiveToast(null), 3500);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
            {/* Toast Alerts */}
            {activeToast && (
                <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-400 shadow-2xl animate-in fade-in slide-in-from-bottom-5">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-semibold text-slate-200">{activeToast}</span>
                    <button onClick={() => setActiveToast(null)} className="ml-2 text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Top Navigation Header */}
            <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                            <Pill className="w-5 h-5 text-emerald-400" />
                            Pharmacy Inventory & Stock Control
                        </h1>
                        <p className="text-xs text-slate-400">Monitor pharmaceutical stock levels, batch expiries, and purchase orders.</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => showNotification('Generating Stock Audit Report PDF...')}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                    >
                        <Download className="w-4 h-4 text-slate-400" />
                        Export Audit
                    </button>
                    <button
                        onClick={() => showNotification('Opening Stock Entry Form...')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Stock
                    </button>
                </div>
            </header>

            {/* Main Content Body */}
            <main className="p-8 space-y-8 max-w-7xl w-full mx-auto flex-1">
                {/* Metrics Summary Bar */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                            <Layers className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total SKUs</p>
                            <h3 className="text-2xl font-bold text-white">1,240 Items</h3>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Low Stock Warnings</p>
                            <h3 className="text-2xl font-bold text-amber-400">14 Reorders Needed</h3>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Expiring within 60 Days</p>
                            <h3 className="text-2xl font-bold text-rose-400">8 Batches</h3>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Today's Dispensed</p>
                            <h3 className="text-2xl font-bold text-white">342 Prescriptions</h3>
                        </div>
                    </div>
                </div>

                {/* Filter & Toolbar */}
                <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search drug name, formula, batch no, or SKU..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
                            />
                        </div>

                        {/* Status Filters */}
                        <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 p-1 rounded-xl">
                            {['All', 'In Stock', 'Low Stock', 'Critical', 'Expired'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setSelectedStatus(status)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${selectedStatus === status
                                            ? 'bg-emerald-600 text-white shadow'
                                            : 'text-slate-400 hover:text-slate-200'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60 overflow-x-auto">
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-2 shrink-0">
                            <Filter className="w-3.5 h-3.5" /> Category:
                        </span>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${selectedCategory === cat
                                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                                        : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stock Table */}
                <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800/80 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6">Medicine & Active Formula</th>
                                    <th className="py-4 px-4">Category</th>
                                    <th className="py-4 px-4">Batch No.</th>
                                    <th className="py-4 px-4">Available Qty</th>
                                    <th className="py-4 px-4">Unit Price</th>
                                    <th className="py-4 px-4">Expiry Date</th>
                                    <th className="py-4 px-4">Status</th>
                                    <th className="py-4 px-6 text-right">Quick Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                                {filteredInventory.length > 0 ? (
                                    filteredInventory.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-800/30 transition-all">
                                            <td className="py-4 px-6">
                                                <div>
                                                    <p className="font-bold text-white text-sm">{item.tradeName}</p>
                                                    <p className="text-[11px] text-slate-400">{item.genericName}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 font-medium">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 font-mono text-slate-400">{item.batchNo}</td>
                                            <td className="py-4 px-4">
                                                <div>
                                                    <span className={`font-bold ${item.stockQty <= item.reorderLevel ? 'text-amber-400' : 'text-white'
                                                        }`}>
                                                        {item.stockQty} Units
                                                    </span>
                                                    <p className="text-[10px] text-slate-500">Min: {item.reorderLevel}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 font-semibold text-slate-200">{item.unitPrice}</td>
                                            <td className="py-4 px-4 font-mono text-slate-400">{item.expiryDate}</td>
                                            <td className="py-4 px-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${item.status === 'In Stock'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                        : item.status === 'Low Stock'
                                                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                            : item.status === 'Critical'
                                                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse'
                                                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                                                    }`}>
                                                    ● {item.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => showNotification(`Initiated Dispense for ${item.tradeName}`)}
                                                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                                                    >
                                                        Dispense
                                                    </button>
                                                    <button
                                                        onClick={() => showNotification(`Reorder Purchase Order issued for ${item.tradeName} to ${item.supplier}`)}
                                                        className="p-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 transition-all cursor-pointer"
                                                        title="Create Purchase Order"
                                                    >
                                                        <PackagePlus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="py-12 text-center text-slate-500">
                                            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                                            No stock items match your search criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}