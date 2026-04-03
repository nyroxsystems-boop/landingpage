'use client';

import {
    MessageSquare, Clock, CheckCircle2, Bell, Search,
    LayoutGrid, Users, FileText, ClipboardList, DollarSign,
    Receipt, Package, Truck, TrendingUp, Bot,
    ScanLine, Zap, ArrowUpRight, ArrowDownRight,
    ShoppingCart, Activity, BarChart3, Sparkles
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const chartData = [
    { name: '01', value: 4200 },
    { name: '04', value: 5800 },
    { name: '07', value: 4900 },
    { name: '10', value: 7300 },
    { name: '13', value: 6100 },
    { name: '16', value: 8500 },
    { name: '19', value: 7200 },
    { name: '22', value: 9800 },
    { name: '25', value: 8400 },
    { name: '28', value: 11200 },
    { name: '31', value: 12450 },
];

const recentOrders = [
    { id: 'ANG-2847', customer: 'KFZ Meier', part: 'Bremssattel VA', status: 'sent', amount: '245,90 €', time: 'vor 3 Min' },
    { id: 'ANG-2846', customer: 'AutoFit GmbH', part: 'Turbolader 2.0 TDI', status: 'processing', amount: '1.890,00 €', time: 'vor 8 Min' },
    { id: 'ANG-2845', customer: 'Werkstatt Schmidt', part: 'Kupplung + Schwungr.', status: 'sent', amount: '589,50 €', time: 'vor 12 Min' },
    { id: 'ANG-2844', customer: 'Parts Express', part: 'Wasserpumpe Golf VII', status: 'confirmed', amount: '134,80 €', time: 'vor 18 Min' },
];

const aiActivity = [
    { action: 'Fahrzeugschein erkannt', detail: 'Golf VII 2.0 TDI — HSN/TSN verifiziert', icon: ScanLine, color: 'text-cyan-400', bg: 'bg-cyan-500/20', time: '09:42' },
    { action: 'OEM-Nummer gefunden', detail: '8K0615123F → 3 Angebote erstellt', icon: Sparkles, color: 'text-violet-400', bg: 'bg-violet-500/20', time: '09:42' },
    { action: 'Angebot versendet', detail: 'WhatsApp an KFZ Meier — 245,90 €', icon: MessageSquare, color: 'text-emerald-400', bg: 'bg-emerald-500/20', time: '09:43' },
    { action: 'Bestand synchronisiert', detail: 'eBay + Lager abgeglichen — 0 Konflikte', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/20', time: '09:45' },
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
    { icon: BarChart3, label: 'Reports', active: false },
];

export function DashboardPreview() {
    return (
        <div className="w-full rounded-xl shadow-2xl border border-slate-700/50 bg-slate-900 overflow-hidden">
            <div className="flex">
                {/* Sidebar */}
                <div className="hidden md:flex w-16 lg:w-20 bg-slate-800/50 border-r border-slate-700/50 min-h-[500px] lg:min-h-[600px] flex-col items-center py-3 lg:py-4 shrink-0">
                    {/* Logo */}
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold rounded-lg p-1.5 lg:p-2 text-xs lg:text-sm mb-4 lg:mb-6 shadow-lg shadow-blue-500/25">PU</div>

                    {/* Nav Items */}
                    <div className="flex flex-col items-center gap-0.5 lg:gap-1 w-full px-1 lg:px-2">
                        {sidebarItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className={`flex flex-col items-center justify-center w-full py-2 lg:py-2.5 rounded-lg cursor-pointer transition-colors ${item.active
                                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                                        : 'text-slate-500 hover:bg-slate-700/50 hover:text-slate-300'
                                        }`}
                                >
                                    <Icon className="h-4 w-4 lg:h-[18px] lg:w-[18px] mb-0.5" />
                                    <span className="text-[7px] lg:text-[9px] font-medium">{item.label}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom KI Status */}
                    <div className="mt-auto pb-2">
                        <div className="flex flex-col items-center gap-1">
                            <div className="relative">
                                <Bot className="h-5 w-5 text-emerald-400" />
                                <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            </div>
                            <span className="text-[7px] text-emerald-400 font-medium">KI aktiv</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {/* Top Header */}
                    <div className="bg-slate-800/80 border-b border-slate-700/50 px-3 py-2 md:px-4 md:py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-700/50 px-2.5 py-1.5 rounded-lg border border-slate-600/50">
                                <Search className="h-3 w-3 text-slate-500" />
                                <span className="hidden sm:inline text-slate-500">Suche nach Kunden, Teilen, OEM...</span>
                                <span className="font-mono text-[10px] text-slate-600 bg-slate-700 px-1 py-0.5 rounded hidden md:inline">⌘K</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3">
                            {/* KI Processing Badge */}
                            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] text-emerald-400 font-medium">KI verarbeitet</span>
                            </div>
                            <div className="relative">
                                <Bell className="h-4 w-4 text-slate-500" />
                                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-blue-500 flex items-center justify-center">
                                    <span className="text-[7px] text-white font-bold">5</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 md:gap-2">
                                <div className="text-right hidden sm:block">
                                    <div className="text-[10px] md:text-xs font-bold text-slate-200">AutoTeile Müller GmbH</div>
                                    <div className="text-[8px] md:text-[10px] text-slate-500">Administrator</div>
                                </div>
                                <div className="h-7 w-7 md:h-8 md:w-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-lg shadow-blue-500/20">AM</div>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="bg-slate-800/30 p-3 md:p-4 lg:p-5">
                        {/* Page Title */}
                        <div className="flex items-center justify-between mb-3 md:mb-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white">Heute</h2>
                                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-medium">Live</span>
                                </div>
                                <p className="text-slate-400 text-[10px] md:text-xs hidden sm:block mt-0.5">Mittwoch, 2. April 2026 — Alle Systeme operativ</p>
                            </div>
                            <div className="hidden md:flex gap-1 bg-slate-700/50 rounded-lg p-0.5">
                                <button className="text-[10px] font-medium px-2 py-1 rounded text-slate-500">7T</button>
                                <button className="text-[10px] font-medium bg-blue-600 px-2 py-1 rounded text-white shadow-sm">30T</button>
                                <button className="text-[10px] font-medium px-2 py-1 rounded text-slate-500">90T</button>
                            </div>
                        </div>

                        {/* Stats Grid - 5 Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-2.5 mb-3 md:mb-4">
                            {/* WhatsApp Anfragen */}
                            <div className="bg-slate-800/60 p-2 md:p-3 rounded-lg border border-slate-700/50 backdrop-blur-sm">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded">
                                        <MessageSquare className="h-3 w-3 md:h-3.5 md:w-3.5" />
                                    </div>
                                    <span className="text-[9px] md:text-[10px] text-slate-400">WhatsApp</span>
                                </div>
                                <div className="text-base md:text-xl font-bold text-white">47</div>
                                <div className="flex items-center gap-0.5 mt-0.5">
                                    <ArrowUpRight className="h-2.5 w-2.5 text-emerald-400" />
                                    <span className="text-[8px] md:text-[9px] text-emerald-400">+23% vs. gestern</span>
                                </div>
                            </div>

                            {/* KI-verarbeitet */}
                            <div className="bg-slate-800/60 p-2 md:p-3 rounded-lg border border-slate-700/50 backdrop-blur-sm">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <div className="p-1 bg-violet-500/20 text-violet-400 rounded">
                                        <Bot className="h-3 w-3 md:h-3.5 md:w-3.5" />
                                    </div>
                                    <span className="text-[9px] md:text-[10px] text-slate-400">KI-verarbeitet</span>
                                </div>
                                <div className="text-base md:text-xl font-bold text-white">42</div>
                                <div className="flex items-center gap-0.5 mt-0.5">
                                    <span className="text-[8px] md:text-[9px] text-violet-400">89% Automatisierung</span>
                                </div>
                            </div>

                            {/* Angebote erstellt */}
                            <div className="bg-slate-800/60 p-2 md:p-3 rounded-lg border border-slate-700/50 backdrop-blur-sm">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <div className="p-1 bg-blue-500/20 text-blue-400 rounded">
                                        <FileText className="h-3 w-3 md:h-3.5 md:w-3.5" />
                                    </div>
                                    <span className="text-[9px] md:text-[10px] text-slate-400">Angebote</span>
                                </div>
                                <div className="text-base md:text-xl font-bold text-white">126</div>
                                <div className="flex items-center gap-0.5 mt-0.5">
                                    <span className="text-[8px] md:text-[9px] text-blue-400">3 pro Anfrage</span>
                                </div>
                            </div>

                            {/* Abschlussquote */}
                            <div className="bg-slate-800/60 p-2 md:p-3 rounded-lg border border-slate-700/50 backdrop-blur-sm">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <div className="p-1 bg-amber-500/20 text-amber-400 rounded">
                                        <CheckCircle2 className="h-3 w-3 md:h-3.5 md:w-3.5" />
                                    </div>
                                    <span className="text-[9px] md:text-[10px] text-slate-400">Abschluss</span>
                                </div>
                                <div className="text-base md:text-xl font-bold text-white">68%</div>
                                <div className="flex items-center gap-0.5 mt-0.5">
                                    <ArrowUpRight className="h-2.5 w-2.5 text-emerald-400" />
                                    <span className="text-[8px] md:text-[9px] text-emerald-400">+12% vs. Monat</span>
                                </div>
                            </div>

                            {/* Tagesumsatz */}
                            <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-blue-600/20 to-cyan-600/10 p-2 md:p-3 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <div className="p-1 bg-blue-500/30 text-blue-300 rounded">
                                        <DollarSign className="h-3 w-3 md:h-3.5 md:w-3.5" />
                                    </div>
                                    <span className="text-[9px] md:text-[10px] text-blue-300">Tagesumsatz</span>
                                </div>
                                <div className="text-base md:text-xl font-bold text-white">€12.450</div>
                                <div className="flex items-center gap-0.5 mt-0.5">
                                    <ArrowUpRight className="h-2.5 w-2.5 text-emerald-400" />
                                    <span className="text-[8px] md:text-[9px] text-emerald-400">+18% vs. gestern</span>
                                </div>
                            </div>
                        </div>

                        {/* Middle Row: Chart + KI Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 md:gap-2.5 mb-3 md:mb-4">
                            {/* Revenue Chart */}
                            <div className="lg:col-span-3 bg-slate-800/60 p-2 md:p-3 lg:p-4 rounded-lg border border-slate-700/50 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-2 md:mb-3">
                                    <div>
                                        <h3 className="text-xs md:text-sm font-bold text-white">Umsatzentwicklung</h3>
                                        <p className="text-[9px] md:text-[10px] text-slate-500">Letzte 30 Tage — +34% Wachstum</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm md:text-base font-bold text-white">€186.340</div>
                                        <div className="text-[8px] text-emerald-400">Monatsumsatz</div>
                                    </div>
                                </div>
                                <div className="h-[90px] md:h-[110px] lg:h-[130px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="colorUmsatzDark" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                                                    <stop offset="50%" stopColor="#06B6D4" stopOpacity={0.15} />
                                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#475569' }} dy={5} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#475569' }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} dx={-3} width={28} />
                                            <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorUmsatzDark)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* KI Activity Feed */}
                            <div className="lg:col-span-2 bg-slate-800/60 p-2 md:p-3 lg:p-4 rounded-lg border border-slate-700/50 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-2 md:mb-3">
                                    <div className="flex items-center gap-1.5">
                                        <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                                        <h3 className="text-xs md:text-sm font-bold text-white">KI-Aktivität</h3>
                                    </div>
                                    <div className="flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-[8px] text-emerald-400">Live</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {aiActivity.map((item, i) => (
                                        <div key={i} className="flex items-start gap-2 group">
                                            <div className={`p-1 rounded ${item.bg} shrink-0 mt-0.5`}>
                                                <item.icon className={`h-2.5 w-2.5 md:h-3 md:w-3 ${item.color}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-1">
                                                    <span className="text-[9px] md:text-[10px] font-medium text-white truncate">{item.action}</span>
                                                    <span className="text-[8px] text-slate-600 shrink-0">{item.time}</span>
                                                </div>
                                                <span className="text-[8px] md:text-[9px] text-slate-500 block truncate">{item.detail}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row: Recent Orders + Quick Stats */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 md:gap-2.5">
                            {/* Recent Orders */}
                            <div className="lg:col-span-3 bg-slate-800/60 p-2 md:p-3 lg:p-4 rounded-lg border border-slate-700/50 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-2 md:mb-3">
                                    <h3 className="text-xs md:text-sm font-bold text-white">Letzte Angebote</h3>
                                    <button className="text-[9px] md:text-[10px] text-blue-400 hover:text-blue-300">Alle ansehen →</button>
                                </div>
                                <div className="space-y-0">
                                    {recentOrders.map((order, i) => (
                                        <div key={i} className={`flex items-center justify-between py-1.5 md:py-2 ${i < recentOrders.length - 1 ? 'border-b border-slate-700/30' : ''}`}>
                                            <div className="flex items-center gap-2 min-w-0">
                                                <span className="text-[9px] md:text-[10px] font-mono text-slate-500 shrink-0">{order.id}</span>
                                                <div className="min-w-0">
                                                    <div className="text-[10px] md:text-xs font-medium text-white truncate">{order.customer}</div>
                                                    <div className="text-[8px] md:text-[9px] text-slate-500 truncate">{order.part}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className={`text-[8px] px-1.5 py-0.5 rounded font-medium ${order.status === 'sent' ? 'bg-emerald-500/20 text-emerald-400' :
                                                        order.status === 'processing' ? 'bg-amber-500/20 text-amber-400' :
                                                            'bg-blue-500/20 text-blue-400'
                                                    }`}>
                                                    {order.status === 'sent' ? 'Gesendet' : order.status === 'processing' ? 'In Arbeit' : 'Bestätigt'}
                                                </span>
                                                <span className="text-[10px] md:text-xs font-bold text-white hidden sm:inline">{order.amount}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Performance Summary */}
                            <div className="lg:col-span-2 bg-slate-800/60 p-2 md:p-3 lg:p-4 rounded-lg border border-slate-700/50 backdrop-blur-sm">
                                <h3 className="text-xs md:text-sm font-bold text-white mb-2 md:mb-3">Performance</h3>
                                <div className="space-y-2.5">
                                    {/* Retouren */}
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[9px] md:text-[10px] text-slate-400">Retourenquote</span>
                                            <div className="flex items-center gap-1">
                                                <span className="text-[10px] md:text-xs font-bold text-emerald-400">3,2%</span>
                                                <ArrowDownRight className="h-2.5 w-2.5 text-emerald-400" />
                                            </div>
                                        </div>
                                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: '32%' }} />
                                        </div>
                                        <div className="text-[8px] text-slate-600 mt-0.5">Branchenschnitt: 20%</div>
                                    </div>

                                    {/* Antwortzeit */}
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[9px] md:text-[10px] text-slate-400">Antwortzeit</span>
                                            <span className="text-[10px] md:text-xs font-bold text-blue-400">8 Sek</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: '12%' }} />
                                        </div>
                                        <div className="text-[8px] text-slate-600 mt-0.5">Branchenschnitt: 15 Min</div>
                                    </div>

                                    {/* OEM Trefferquote */}
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[9px] md:text-[10px] text-slate-400">OEM-Trefferquote</span>
                                            <span className="text-[10px] md:text-xs font-bold text-violet-400">97,8%</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full" style={{ width: '97.8%' }} />
                                        </div>
                                    </div>

                                    {/* System Uptime */}
                                    <div className="mt-2 pt-2 border-t border-slate-700/30">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                                <span className="text-[9px] md:text-[10px] text-slate-400">System Uptime</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-emerald-400">99,9%</span>
                                        </div>
                                        <div className="text-[8px] text-slate-600 mt-0.5 ml-3.5">365 Tage operativ — 0 Ausfälle</div>
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
