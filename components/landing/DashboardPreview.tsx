'use client';

import {
    MessageSquare, Clock, CheckCircle2, Bell,
    LayoutGrid, Users, FileText, ClipboardList, DollarSign,
    Receipt, Package, Truck, TrendingUp
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const chartData = [
    { name: '01.01', value: 550 },
    { name: '01.02', value: 1100 },
    { name: '01.03', value: 2200 },
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
        <div className="w-full rounded-xl shadow-2xl border border-slate-700/50 bg-slate-900 overflow-hidden">
            <div className="flex">
                {/* Sidebar - Dark Theme */}
                <div className="hidden md:flex w-16 lg:w-20 bg-slate-800/50 border-r border-slate-700/50 min-h-[400px] lg:min-h-[500px] flex-col items-center py-3 lg:py-4 shrink-0">
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
                                        ? 'bg-blue-600/20 text-blue-400'
                                        : 'text-slate-500 hover:bg-slate-700/50 hover:text-slate-300'
                                        }`}
                                >
                                    <Icon className="h-4 w-4 lg:h-5 lg:w-5 mb-0.5 lg:mb-1" />
                                    <span className="text-[8px] lg:text-[10px] font-medium">{item.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {/* Top Header - Dark */}
                    <div className="bg-slate-800/80 border-b border-slate-700/50 px-3 py-2 md:px-4 md:py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded border border-slate-600/50">
                            <span className="font-mono text-[10px] text-slate-500">⌘K</span>
                            <span className="hidden sm:inline">für Suche</span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4 text-slate-500">
                            <Bell className="h-4 w-4" />
                            <div className="hidden sm:flex items-center gap-1 text-xs">
                                <span>🌐</span> <span>DE</span>
                            </div>
                            <div className="flex items-center gap-1 md:gap-2">
                                <div className="text-right hidden sm:block">
                                    <div className="text-[10px] md:text-xs font-bold text-slate-200">AutoTeile Müller GmbH</div>
                                    <div className="text-[8px] md:text-[10px] text-slate-500">Administrator</div>
                                </div>
                                <div className="h-6 w-6 md:h-8 md:w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] md:text-xs font-bold">AM</div>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Content - Dark */}
                    <div className="bg-slate-800/30 p-3 md:p-4 lg:p-6">
                        <div className="mb-3 md:mb-4">
                            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-0.5">Heute</h2>
                            <p className="text-slate-400 text-xs md:text-sm hidden sm:block">Dein aktueller Arbeitsstand aus WhatsApp, Angeboten und Aufträgen</p>
                        </div>

                        {/* Stats Grid - Dark Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-3 md:mb-4">
                            {/* Card 1: WhatsApp */}
                            <div className="bg-slate-800/60 p-2 md:p-3 lg:p-4 rounded-lg border border-slate-700/50 shadow-lg backdrop-blur-sm">
                                <div className="flex items-center gap-2 mb-1 md:mb-2">
                                    <div className="p-1 md:p-1.5 bg-blue-500/20 text-blue-400 rounded">
                                        <MessageSquare className="h-3 w-3 md:h-4 md:w-4" />
                                    </div>
                                    <span className="text-[10px] md:text-xs text-slate-400 truncate">WhatsApp</span>
                                </div>
                                <div className="text-lg md:text-2xl font-bold text-white">3</div>
                                <div className="text-[8px] md:text-[10px] text-emerald-400 hidden sm:block">+12% vs. gestern</div>
                            </div>

                            {/* Card 2: In Bearbeitung */}
                            <div className="bg-slate-800/60 p-2 md:p-3 lg:p-4 rounded-lg border border-slate-700/50 shadow-lg backdrop-blur-sm">
                                <div className="flex items-center gap-2 mb-1 md:mb-2">
                                    <div className="p-1 md:p-1.5 bg-amber-500/20 text-amber-400 rounded">
                                        <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4" />
                                    </div>
                                    <span className="text-[10px] md:text-xs text-slate-400 truncate">Bearbeitung</span>
                                </div>
                                <div className="text-lg md:text-2xl font-bold text-white">6</div>
                                <div className="text-[8px] md:text-[10px] text-emerald-400 hidden sm:block">+2.3% vs. Woche</div>
                            </div>

                            {/* Card 3: Offene Belege */}
                            <div className="bg-slate-800/60 p-2 md:p-3 lg:p-4 rounded-lg border border-slate-700/50 shadow-lg backdrop-blur-sm">
                                <div className="flex items-center gap-2 mb-1 md:mb-2">
                                    <div className="p-1 md:p-1.5 bg-rose-500/20 text-rose-400 rounded">
                                        <Clock className="h-3 w-3 md:h-4 md:w-4" />
                                    </div>
                                    <span className="text-[10px] md:text-xs text-slate-400 truncate">Offen</span>
                                </div>
                                <div className="text-lg md:text-2xl font-bold text-white">0</div>
                            </div>

                            {/* Card 4: Umsatz */}
                            <div className="bg-slate-800/60 p-2 md:p-3 lg:p-4 rounded-lg border border-slate-700/50 border-l-2 border-l-blue-500 shadow-lg backdrop-blur-sm">
                                <div className="mb-1 md:mb-2">
                                    <span className="text-[10px] md:text-xs text-slate-400">Umsatz</span>
                                </div>
                                <div className="text-sm md:text-xl lg:text-2xl font-bold text-white">€1.250</div>
                                <div className="text-[8px] md:text-[10px] text-emerald-400 hidden sm:block">+18% vs. gestern</div>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-3">
                            {/* Chart Section */}
                            <div className="lg:col-span-2 bg-slate-800/60 p-2 md:p-3 lg:p-4 rounded-lg border border-slate-700/50 shadow-lg backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-2 md:mb-3">
                                    <div>
                                        <h3 className="text-sm md:text-base font-bold text-white">Umsatz</h3>
                                        <p className="text-[10px] md:text-xs text-slate-500">Letzte 30 Tage</p>
                                    </div>
                                    <div className="hidden md:flex gap-0.5 bg-slate-700/50 rounded p-0.5">
                                        <button className="text-[10px] font-medium px-1.5 py-0.5 rounded text-slate-500">7T</button>
                                        <button className="text-[10px] font-medium bg-slate-600 px-1.5 py-0.5 rounded text-white shadow-sm">30T</button>
                                        <button className="text-[10px] font-medium px-1.5 py-0.5 rounded text-slate-500">90T</button>
                                    </div>
                                </div>
                                <div className="h-[80px] md:h-[100px] lg:h-[120px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="colorUmsatzDark" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} dy={5} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} tickFormatter={(value) => `€${value}`} dx={-5} width={35} />
                                            <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorUmsatzDark)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Top Kunden */}
                            <div className="bg-slate-800/60 p-2 md:p-3 lg:p-4 rounded-lg border border-slate-700/50 shadow-lg backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h3 className="text-sm md:text-base font-bold text-white">Top Kunden</h3>
                                        <p className="text-[10px] md:text-xs text-slate-500">Diese Woche</p>
                                    </div>
                                    <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-slate-500" />
                                </div>
                                <div className="text-center py-4 md:py-6 text-slate-500">
                                    <div className="text-[10px] md:text-sm">Lade Kundendaten...</div>
                                </div>

                                {/* System Status Badge */}
                                <div className="mt-2 bg-slate-700/50 rounded-lg p-2 md:p-3">
                                    <div className="text-xs font-medium text-white">System Status</div>
                                    <div className="text-[10px] text-emerald-400">365 Tage operativ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
