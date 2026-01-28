'use client';

import { motion } from 'framer-motion';
import {
    MessageSquare, Clock, Euro, CheckCircle2, Bell, Search,
    LayoutGrid, Users, FileText, ClipboardList, DollarSign,
    Receipt, Package, Truck, TrendingUp, ChevronDown
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const chartData = [
    { name: '2025-01-01', value: 550 },
    { name: '2025-01-02', value: 1100 },
    { name: '2025-01-03', value: 2200 },
];

const sidebarItems = [
    { icon: LayoutGrid, label: 'Heute', active: true },
    { icon: Users, label: 'Kunden', active: false },
    { icon: ClipboardList, label: 'Aufträge', active: false },
    { icon: FileText, label: 'Angebote', active: false },
    { icon: DollarSign, label: 'Preise', active: false },
    { icon: Receipt, label: 'Belege', active: false },
    { icon: Package, label: 'WAWI', active: false },
    { icon: Truck, label: 'Lieferanten', active: false },
];

export function DashboardPreview() {
    return (
        <div className="w-full max-w-6xl mx-auto h-[280px] sm:h-[420px] lg:h-auto overflow-hidden lg:overflow-visible rounded-xl shadow-2xl border border-slate-200 bg-white">
            <div className="w-[1100px] lg:w-full origin-top-left transform scale-[0.28] sm:scale-[0.45] lg:scale-100">
                <div className="flex">
                    {/* Sidebar */}
                    <div className="w-20 bg-slate-50 border-r border-slate-200 min-h-[700px] flex flex-col items-center py-4">
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
                                        <span className="text-[10px] font-medium">{item.label}</span>
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
                                <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
                                    <kbd className="font-mono text-xs text-slate-400">⌘K</kbd> <span>für Suche</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <span className="text-slate-300">|</span>
                                    <kbd className="font-mono text-xs">?</kbd> <span>für Shortcuts</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-slate-400">
                                <Bell className="h-5 w-5 hover:text-slate-600 transition-colors cursor-pointer" />
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

                        {/* Dashboard Content */}
                        <div className="bg-slate-50 p-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-900 mb-1">Heute</h2>
                                <p className="text-slate-500 text-sm">Dein aktueller Arbeitsstand aus WhatsApp, Angeboten und Aufträgen</p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                {/* Card 1: WhatsApp */}
                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                            <MessageSquare className="h-4 w-4" />
                                        </div>
                                        <span className="text-sm text-slate-600">WhatsApp Nachrichten</span>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div className="text-3xl font-bold text-slate-900">3</div>
                                        <div className="flex items-center gap-1 text-xs text-emerald-600">
                                            <TrendingUp className="h-3 w-3" />
                                            <span>+12% vs. gestern</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2: In Bearbeitung */}
                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                            <CheckCircle2 className="h-4 w-4" />
                                        </div>
                                        <span className="text-sm text-slate-600">In Bearbeitung</span>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div className="text-3xl font-bold text-slate-900">6</div>
                                        <div className="flex items-center gap-1 text-xs text-emerald-600">
                                            <TrendingUp className="h-3 w-3" />
                                            <span>+2.3% vs. letzte Woche</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3: Offene Belege */}
                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                                            <Clock className="h-4 w-4" />
                                        </div>
                                        <span className="text-sm text-slate-600">Offene Belege</span>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900">0</div>
                                </div>

                                {/* Card 4: Umsatz */}
                                <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm border-l-4 border-l-blue-500">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-sm text-slate-600">Umsatz (heute)</span>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div className="text-3xl font-bold text-slate-900">€1.250,50</div>
                                        <div className="flex items-center gap-1 text-xs text-emerald-600">
                                            <TrendingUp className="h-3 w-3" />
                                            <span>+18% vs. gestern</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {/* Chart Section */}
                                <div className="col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Umsatz & Bestellungen</h3>
                                            <p className="text-sm text-slate-500">Letzte 30 Tage</p>
                                        </div>
                                        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
                                            <button className="text-xs font-medium px-2 py-1 rounded text-slate-500">7T</button>
                                            <button className="text-xs font-medium bg-white px-2 py-1 rounded text-slate-900 shadow-sm">30T</button>
                                            <button className="text-xs font-medium px-2 py-1 rounded text-slate-500">90T</button>
                                            <button className="text-xs font-medium px-2 py-1 rounded text-slate-500">Jahr</button>
                                        </div>
                                    </div>
                                    <div className="h-[200px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={chartData}>
                                                <defs>
                                                    <linearGradient id="colorUmsatzLight" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(value) => `€${value}`} dx={-10} />
                                                <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorUmsatzLight)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Top Kunden */}
                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Top Kunden</h3>
                                            <p className="text-sm text-slate-500">Diese Woche</p>
                                        </div>
                                        <TrendingUp className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <div className="text-center py-8 text-slate-400">
                                        <div className="text-sm">Lade Kundendaten...</div>
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
