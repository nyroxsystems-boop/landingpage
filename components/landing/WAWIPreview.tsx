'use client';

import { motion } from 'framer-motion';
import {
    LayoutGrid, Package, Archive, Truck, ShoppingCart,
    ArrowDownToLine, FileText, Settings, AlertTriangle,
    History, ArrowLeft, Bell, ChevronDown, TrendingUp
} from 'lucide-react';

const sidebarItems = [
    { icon: LayoutGrid, label: 'Dashboard', active: true },
    { icon: Package, label: 'Artikel', active: false },
    { icon: Archive, label: 'Lager', active: false },
    { icon: Truck, label: 'Lieferanten', active: false },
    { icon: ShoppingCart, label: 'Nachbestellung', active: false },
    { icon: ArrowDownToLine, label: 'Wareneingang', active: false },
    { icon: FileText, label: 'Berichte', active: false },
    { icon: Settings, label: 'Setup', active: false },
];

export function WAWIPreview() {
    return (
        <div className="w-full max-w-6xl mx-auto h-[280px] sm:h-[420px] lg:h-auto overflow-hidden lg:overflow-visible rounded-xl shadow-2xl border border-slate-200 bg-white">
            <div className="w-[1100px] lg:w-full origin-top-left transform scale-[0.28] sm:scale-[0.45] lg:scale-100">
                <div className="flex">
                    {/* Sidebar */}
                    <div className="w-20 bg-slate-50 border-r border-slate-200 min-h-[600px] flex flex-col items-center py-4">
                        {/* Logo */}
                        <div className="bg-blue-600 text-white font-bold rounded-xl p-2 px-3 mb-6">AT</div>

                        {/* Nav Items */}
                        <div className="flex flex-col items-center gap-1 w-full px-2">
                            {sidebarItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className={`flex flex-col items-center justify-center w-full py-3 rounded-lg cursor-pointer transition-colors ${item.active
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5 mb-1" />
                                        <span className="text-[9px] font-medium text-center leading-tight">{item.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Top Header */}
                        <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                                    <ArrowLeft className="h-4 w-4" />
                                    Zurück zum Dashboard
                                </button>
                                <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
                                    <kbd className="font-mono text-xs text-slate-400">⌘K</kbd> <span>für Suche</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-slate-400">
                                <Bell className="h-5 w-5" />
                                <div className="flex items-center gap-2 text-sm">
                                    <span>🌐</span> <span>DE</span> <ChevronDown className="h-3 w-3" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-right">
                                        <div className="text-xs font-bold text-slate-900">AutoTeile Müller GmbH</div>
                                        <div className="text-[10px] text-slate-500">Administrator</div>
                                    </div>
                                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">AM</div>
                                </div>
                            </div>
                        </div>

                        {/* WAWI Content */}
                        <div className="bg-slate-50 p-8">
                            {/* Header */}
                            <div className="mb-2">
                                <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">WAWI WORKSPACE</span>
                            </div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-900 mb-1">Bestandsübersicht</h2>
                                <p className="text-slate-500 text-sm">Alle Lagerprozesse und Artikelkennzahlen auf einen Blick.</p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                {/* Card 1: Artikel-Stamm */}
                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                                            <Package className="h-4 w-4" />
                                        </div>
                                        <span className="text-sm text-slate-600">Artikel-Stamm</span>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900">22</div>
                                </div>

                                {/* Card 2: Kritischer Bestand */}
                                <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-sm border-l-4 border-l-amber-500">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                            <AlertTriangle className="h-4 w-4" />
                                        </div>
                                        <span className="text-sm text-slate-600">Kritischer Bestand</span>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900">2</div>
                                </div>

                                {/* Card 3: Offene Bestellungen */}
                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                            <ShoppingCart className="h-4 w-4" />
                                        </div>
                                        <span className="text-sm text-slate-600">Offene Bestellungen</span>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900">0</div>
                                </div>

                                {/* Card 4: Lagerwert */}
                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                            <TrendingUp className="h-4 w-4" />
                                        </div>
                                        <span className="text-sm text-slate-600">Lagerwert (EK)</span>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900">0 €</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Kritische Bestände */}
                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                                            <h3 className="font-bold text-slate-900">Kritische Bestände</h3>
                                        </div>
                                        <button className="text-sm text-blue-600 flex items-center gap-1">
                                            Alle ansehen →
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                            <div>
                                                <div className="font-medium text-slate-900 text-sm">Bremssattel vorne links</div>
                                                <div className="text-xs text-slate-400">8K0615123F</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-rose-500 text-sm">4 Stück</div>
                                                <div className="text-xs text-slate-400">Min: 5</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between py-2">
                                            <div>
                                                <div className="font-medium text-slate-900 text-sm">Turbolader Garrett</div>
                                                <div className="text-xs text-slate-400">03L2538161X</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-rose-500 text-sm">2 Stück</div>
                                                <div className="text-xs text-slate-400">Min: 5</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Letzte Bewegungen */}
                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <History className="h-4 w-4 text-slate-400" />
                                        <h3 className="font-bold text-slate-900">Letzte Bewegungen</h3>
                                    </div>
                                    <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                                        <History className="h-10 w-10 mb-3 text-slate-200" />
                                        <div className="text-sm text-center">
                                            Hier erscheinen bald deine<br />
                                            letzten Lagerbuchungen.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
