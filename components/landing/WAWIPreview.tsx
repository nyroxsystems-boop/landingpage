'use client';

import {
    LayoutGrid, Package, Archive, Truck, ShoppingCart,
    ArrowDownToLine, FileText, Settings, AlertTriangle,
    History, ArrowLeft, Bell, TrendingUp
} from 'lucide-react';

const sidebarItems = [
    { icon: LayoutGrid, label: 'Dashboard', active: true },
    { icon: Package, label: 'Artikel', active: false },
    { icon: Archive, label: 'Lager', active: false },
    { icon: Truck, label: 'Lieferanten', active: false },
    { icon: ShoppingCart, label: 'Nachbest.', active: false },
    { icon: ArrowDownToLine, label: 'Eingang', active: false },
    { icon: FileText, label: 'Berichte', active: false },
    { icon: Settings, label: 'Setup', active: false },
];

export function WAWIPreview() {
    return (
        <div className="w-full rounded-xl shadow-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="flex">
                {/* Sidebar - Hidden on mobile, visible on md+ */}
                <div className="hidden md:flex w-16 lg:w-20 bg-slate-50 border-r border-slate-200 min-h-[400px] lg:min-h-[500px] flex-col items-center py-3 lg:py-4 shrink-0">
                    {/* Logo */}
                    <div className="bg-blue-600 text-white font-bold rounded-lg p-1.5 lg:p-2 text-xs lg:text-sm mb-4 lg:mb-6">AT</div>

                    {/* Nav Items */}
                    <div className="flex flex-col items-center gap-0.5 lg:gap-1 w-full px-1 lg:px-2">
                        {sidebarItems.slice(0, 6).map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className={`flex flex-col items-center justify-center w-full py-2 lg:py-3 rounded-lg cursor-pointer transition-colors ${item.active
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                                        }`}
                                >
                                    <Icon className="h-4 w-4 lg:h-5 lg:w-5 mb-0.5 lg:mb-1" />
                                    <span className="text-[7px] lg:text-[9px] font-medium text-center leading-tight">{item.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {/* Top Header */}
                    <div className="bg-white border-b border-slate-200 px-3 py-2 md:px-4 md:py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-[10px] md:text-xs font-medium">
                                <ArrowLeft className="h-3 w-3" />
                                <span className="hidden sm:inline">Zurück</span>
                            </button>
                            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                                <span className="font-mono text-[10px] text-slate-400">⌘K</span>
                                <span>für Suche</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4 text-slate-400">
                            <Bell className="h-4 w-4" />
                            <div className="hidden sm:flex items-center gap-1 text-xs">
                                <span>🌐</span> <span>DE</span>
                            </div>
                            <div className="flex items-center gap-1 md:gap-2">
                                <div className="text-right hidden sm:block">
                                    <div className="text-[10px] md:text-xs font-bold text-slate-900">AutoTeile Müller</div>
                                    <div className="text-[8px] md:text-[10px] text-slate-500">Admin</div>
                                </div>
                                <div className="h-6 w-6 md:h-8 md:w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] md:text-xs font-bold">AM</div>
                            </div>
                        </div>
                    </div>

                    {/* WAWI Content */}
                    <div className="bg-slate-50 p-3 md:p-4 lg:p-6">
                        {/* Header */}
                        <div className="mb-1">
                            <span className="text-[10px] md:text-xs font-medium text-blue-600 uppercase tracking-wider">WAWI WORKSPACE</span>
                        </div>
                        <div className="mb-3 md:mb-4">
                            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 mb-0.5">Bestandsübersicht</h2>
                            <p className="text-slate-500 text-xs md:text-sm hidden sm:block">Alle Lagerprozesse und Artikelkennzahlen auf einen Blick.</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-3 md:mb-4">
                            {/* Card 1: Artikel-Stamm */}
                            <div className="bg-white p-2 md:p-3 lg:p-4 rounded-lg border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-1 md:mb-2">
                                    <div className="p-1 md:p-1.5 bg-slate-100 text-slate-600 rounded">
                                        <Package className="h-3 w-3 md:h-4 md:w-4" />
                                    </div>
                                    <span className="text-[10px] md:text-xs text-slate-600 truncate">Artikel</span>
                                </div>
                                <div className="text-lg md:text-2xl font-bold text-slate-900">22</div>
                            </div>

                            {/* Card 2: Kritischer Bestand */}
                            <div className="bg-white p-2 md:p-3 lg:p-4 rounded-lg border border-amber-200 border-l-2 border-l-amber-500 shadow-sm">
                                <div className="flex items-center gap-2 mb-1 md:mb-2">
                                    <div className="p-1 md:p-1.5 bg-amber-50 text-amber-600 rounded">
                                        <AlertTriangle className="h-3 w-3 md:h-4 md:w-4" />
                                    </div>
                                    <span className="text-[10px] md:text-xs text-slate-600 truncate">Kritisch</span>
                                </div>
                                <div className="text-lg md:text-2xl font-bold text-slate-900">2</div>
                            </div>

                            {/* Card 3: Offene Bestellungen */}
                            <div className="bg-white p-2 md:p-3 lg:p-4 rounded-lg border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-1 md:mb-2">
                                    <div className="p-1 md:p-1.5 bg-blue-50 text-blue-600 rounded">
                                        <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
                                    </div>
                                    <span className="text-[10px] md:text-xs text-slate-600 truncate">Offen</span>
                                </div>
                                <div className="text-lg md:text-2xl font-bold text-slate-900">0</div>
                            </div>

                            {/* Card 4: Lagerwert */}
                            <div className="bg-white p-2 md:p-3 lg:p-4 rounded-lg border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-1 md:mb-2">
                                    <div className="p-1 md:p-1.5 bg-emerald-50 text-emerald-600 rounded">
                                        <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
                                    </div>
                                    <span className="text-[10px] md:text-xs text-slate-600 truncate">Lagerwert</span>
                                </div>
                                <div className="text-lg md:text-2xl font-bold text-slate-900">0 €</div>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-3">
                            {/* Kritische Bestände */}
                            <div className="bg-white p-2 md:p-3 lg:p-4 rounded-lg border border-slate-200 shadow-sm">
                                <div className="flex items-center justify-between mb-2 md:mb-3">
                                    <div className="flex items-center gap-1 md:gap-2">
                                        <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 text-amber-500" />
                                        <h3 className="text-sm md:text-base font-bold text-slate-900">Kritische Bestände</h3>
                                    </div>
                                    <button className="text-[10px] md:text-xs text-blue-600">
                                        <span className="hidden sm:inline">Alle ansehen</span> →
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between py-1 md:py-2 border-b border-slate-100">
                                        <div>
                                            <div className="font-medium text-slate-900 text-xs md:text-sm">Bremssattel vorne</div>
                                            <div className="text-[10px] text-slate-400">8K0615123F</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-rose-500 text-xs md:text-sm">4 Stk</div>
                                            <div className="text-[10px] text-slate-400">Min: 5</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-1 md:py-2">
                                        <div>
                                            <div className="font-medium text-slate-900 text-xs md:text-sm">Turbolader Garrett</div>
                                            <div className="text-[10px] text-slate-400">03L2538161X</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-rose-500 text-xs md:text-sm">2 Stk</div>
                                            <div className="text-[10px] text-slate-400">Min: 5</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Letzte Bewegungen */}
                            <div className="bg-white p-2 md:p-3 lg:p-4 rounded-lg border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                                    <History className="h-3 w-3 md:h-4 md:w-4 text-slate-400" />
                                    <h3 className="text-sm md:text-base font-bold text-slate-900">Letzte Bewegungen</h3>
                                </div>
                                <div className="flex flex-col items-center justify-center py-4 md:py-6 text-slate-400">
                                    <History className="h-6 w-6 md:h-8 md:w-8 mb-2 text-slate-200" />
                                    <div className="text-[10px] md:text-xs text-center">
                                        Hier erscheinen bald deine<br className="hidden sm:block" />
                                        letzten Lagerbuchungen.
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
