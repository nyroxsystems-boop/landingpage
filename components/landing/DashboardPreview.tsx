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
        <div className="w-full max-w-6xl mx-auto p-4 bg-muted/20 rounded-xl overflow-hidden shadow-2xl border border-border/50">
            {/* Fake Browser/App Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-600 text-white font-bold rounded-lg p-1.5 px-3">AT</div>
                    <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md">
                        <kbd className="font-mono text-xs">⌘K</kbd> <span>für Suche</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-gray-500">
                    <Bell className="h-5 w-5" />
                    <div className="flex items-center gap-2">
                        <div className="text-right hidden sm:block">
                            <div className="text-xs font-bold text-gray-900 dark:text-gray-100">Admin</div>
                            <div className="text-[10px]">Gast</div>
                        </div>
                        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">A</div>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="bg-gray-50 dark:bg-slate-950 p-6 md:p-8 min-h-[600px]">
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Heute</h2>
                    <p className="text-gray-500 text-sm">Dein aktueller Arbeitsstand aus WhatsApp, Angeboten und Aufträgen</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Card 1: WhatsApp */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden group hover:border-blue-500/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <MessageSquare className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">+12%</span>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">WhatsApp Nachrichten</div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">3</div>
                        </div>
                    </div>

                    {/* Card 2: In Bearbeitung */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden hover:border-blue-500/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <CheckCircle2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">+2.3%</span>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">In Bearbeitung</div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">5</div>
                        </div>
                    </div>

                    {/* Card 3: Offene Belege */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden hover:border-blue-500/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <Clock className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Offene Belege</div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">0</div>
                        </div>
                    </div>

                    {/* Card 4: Umsatz */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden hover:border-blue-500/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <Euro className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">+18%</span>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Umsatz (heute)</div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">€1.250,50</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Chart Section */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Umsatz & Bestellungen</h3>
                                <p className="text-sm text-gray-500">Letzte 30 Tage</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="text-xs font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-gray-600">30T</button>
                                <button className="text-xs font-medium hover:bg-gray-50 px-3 py-1 rounded-md text-gray-500">90T</button>
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
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={(value) => `€${value}`} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorUmsatz)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top Kunden / Sidebar Placeholder */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Top Kunden</h3>
                            <UtcIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                        M{i}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Max Mustermann</div>
                                        <div className="text-xs text-gray-500">3 Bestellungen</div>
                                    </div>
                                    <div className="ml-auto text-sm font-medium text-gray-900">€450</div>
                                </div>
                            ))}
                        </div>
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
