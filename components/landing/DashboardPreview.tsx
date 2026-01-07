'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Clock, Euro, ShoppingBag, Bell, Search, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const chartData = [
    { name: 'Jan 01', value: 550 },
    { name: 'Jan 05', value: 800 },
    { name: 'Jan 10', value: 600 },
    { name: 'Jan 15', value: 950 },
    { name: 'Jan 20', value: 1200 },
    { name: 'Jan 25', value: 1500 },
    { name: 'Jan 30', value: 2200 },
];

export function DashboardPreview() {
    return (
        <div className="w-full max-w-6xl mx-auto p-4 bg-slate-100 rounded-xl overflow-hidden shadow-2xl border border-slate-200">
            {/* Fake Browser/App Header */}
            <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-600 text-white font-bold rounded-lg p-1.5 px-3">AT</div>
                    <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
                        <kbd className="font-mono text-xs text-slate-400">⌘K</kbd> <span>für Suche</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                    <Bell className="h-5 w-5 hover:text-slate-600 transition-colors cursor-pointer" />
                    <div className="flex items-center gap-2">
                        <div className="text-right hidden sm:block">
                            <div className="text-xs font-bold text-slate-900">Admin</div>
                            <div className="text-[10px] text-slate-500">Gast</div>
                        </div>
                        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">A</div>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="bg-slate-50 p-6 md:p-8 min-h-[600px]">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-1">Heute</h2>
                        <p className="text-slate-500 text-sm">Dein aktueller Arbeitsstand aus WhatsApp, Angeboten und Aufträgen</p>
                    </div>
                    <div className="text-sm text-slate-400 font-medium bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                        Live Daten
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Card 1: WhatsApp */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-500/50 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <MessageSquare className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">+12%</span>
                        </div>
                        <div>
                            <div className="text-sm text-slate-500 mb-1 font-medium">WhatsApp Nachrichten</div>
                            <div className="text-3xl font-bold text-slate-900">3</div>
                        </div>
                    </div>

                    {/* Card 2: In Bearbeitung */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden hover:border-blue-500/50 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">+2.3%</span>
                        </div>
                        <div>
                            <div className="text-sm text-slate-500 mb-1 font-medium">In Bearbeitung</div>
                            <div className="text-3xl font-bold text-slate-900">5</div>
                        </div>
                    </div>

                    {/* Card 3: Offene Belege */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden hover:border-blue-500/50 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                                <Clock className="h-5 w-5" />
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-slate-500 mb-1 font-medium">Offene Belege</div>
                            <div className="text-3xl font-bold text-slate-900">0</div>
                        </div>
                    </div>

                    {/* Card 4: Umsatz */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden hover:border-blue-500/50 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                <Euro className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">+18%</span>
                        </div>
                        <div>
                            <div className="text-sm text-slate-500 mb-1 font-medium">Umsatz (heute)</div>
                            <div className="text-3xl font-bold text-slate-900">€1.250,50</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Chart Section */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Umsatz & Bestellungen</h3>
                                <p className="text-sm text-slate-500">Übersicht der letzten 30 Tage</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="text-xs font-medium bg-slate-100 px-3 py-1 rounded-md text-slate-900 shadow-sm">30T</button>
                                <button className="text-xs font-medium hover:bg-slate-50 px-3 py-1 rounded-md text-slate-500 transition-colors">90T</button>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorUmsatz" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={(value) => `€${value}`} dx={-10} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: '#1e293b' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorUmsatz)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top Kunden / Sidebar Placeholder */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Top Kunden</h3>
                            <UtcIcon className="h-4 w-4 text-slate-400" />
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        M{i}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">Max Mustermann</div>
                                        <div className="text-xs text-slate-500">3 Bestellungen</div>
                                    </div>
                                    <div className="ml-auto text-sm font-bold text-slate-900">€450</div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-dashed border-blue-200">
                            Alle Kunden anzeigen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UtcIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="7" x2="17" y1="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
        </svg>
    )
}
