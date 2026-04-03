'use client';

import {
    LayoutDashboard, MessageSquare, Package, FileText, DollarSign,
    Receipt, Warehouse, Bell, Globe, Moon, ChevronDown,
    Plus, ArrowRight, Check
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts';

/* ---------- mock data ---------- */
const chartData = [
    { name: '01', rev: 3200, orders: 8 },
    { name: '04', rev: 4100, orders: 11 },
    { name: '07', rev: 3800, orders: 9 },
    { name: '10', rev: 5600, orders: 14 },
    { name: '13', rev: 4900, orders: 12 },
    { name: '16', rev: 6200, orders: 15 },
    { name: '19', rev: 5500, orders: 13 },
    { name: '22', rev: 7800, orders: 18 },
    { name: '25', rev: 7100, orders: 16 },
    { name: '28', rev: 8900, orders: 21 },
    { name: '31', rev: 9450, orders: 24 },
];

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Heute', active: true, group: 'main' },
    { icon: MessageSquare, label: 'Kunden', active: false, group: 'ops' },
    { icon: Package, label: 'Aufträge', active: false, group: 'ops' },
    { icon: FileText, label: 'Angebote', active: false, group: 'ops' },
    { icon: DollarSign, label: 'Preise', active: false, group: 'ops' },
    { icon: Receipt, label: 'Belege', active: false, group: 'ops' },
    { icon: Warehouse, label: 'WAWI', active: false, group: 'partners' },
];

const pipeline = [
    { label: 'Neu', count: 3, color: 'hsl(221 83% 53%)' },
    { label: 'In Bearbeitung', count: 5, color: 'hsl(38 92% 50%)' },
    { label: 'Angebote', count: 4, color: 'hsl(220 13% 48%)' },
    { label: 'Bestätigt', count: 6, color: 'hsl(142 76% 36%)' },
    { label: 'Fakturiert', count: 2, color: 'hsl(142 76% 36%)' },
    { label: 'Erledigt', count: 8, color: 'hsl(142 76% 36%)' },
];

const orders = [
    { customer: 'KFZ Meier', vehicle: 'VW Golf VII', oem: '8K0615123F', status: 'Neu', statusColor: 'hsl(221 83% 53%)' },
    { customer: 'AutoFit GmbH', vehicle: 'Audi A4 B9', oem: '03L253016TX', status: 'In Arbeit', statusColor: 'hsl(38 92% 50%)' },
    { customer: 'Werkstatt Schmidt', vehicle: 'BMW 320d F30', oem: '34116792219', status: 'Angebot', statusColor: 'hsl(220 13% 48%)' },
    { customer: 'Parts Express', vehicle: 'Mercedes C220', oem: '2712000301', status: 'Bestätigt', statusColor: 'hsl(142 76% 36%)' },
];

const pipelineTotal = pipeline.reduce((a, b) => a + b.count, 0);

export function DashboardPreview() {
    return (
        <div className="w-full rounded-xl shadow-2xl overflow-hidden" style={{ background: 'hsl(224 71% 4%)' }}>
            <div className="flex">
                {/* ── Sidebar ── exact replica: gradient, w-20, pills */}
                <div
                    className="hidden md:flex w-16 lg:w-20 flex-col items-center py-4 lg:py-6 shrink-0"
                    style={{
                        background: 'linear-gradient(180deg, #0c1425 0%, #0a101e 100%)',
                        borderRight: '1px solid rgba(255,255,255,0.06)',
                        minHeight: 520,
                    }}
                >
                    {/* Logo */}
                    <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center mb-6 lg:mb-8" style={{ background: 'rgba(255,255,255,0.10)' }}>
                        <span className="text-white font-bold text-[10px] lg:text-xs">PU</span>
                    </div>

                    {/* Nav */}
                    <nav className="flex flex-col gap-0.5 w-full px-2 lg:px-3">
                        {sidebarItems.map((item, i) => {
                            const Icon = item.icon;
                            const prev = i > 0 ? sidebarItems[i - 1] : null;
                            const showDiv = prev && prev.group !== item.group;
                            return (
                                <div key={i}>
                                    {showDiv && <div className="h-px my-1.5" style={{ background: 'rgba(255,255,255,0.06)' }} />}
                                    <div
                                        className="relative flex flex-col items-center gap-0.5 py-2 lg:py-2.5 rounded-lg cursor-default"
                                        style={{
                                            background: item.active ? 'rgba(255,255,255,0.08)' : 'transparent',
                                            color: item.active ? '#fff' : 'rgba(255,255,255,0.4)',
                                        }}
                                    >
                                        <Icon className="h-4 w-4 lg:h-[18px] lg:w-[18px]" strokeWidth={1.5} />
                                        <span
                                            className="leading-tight"
                                            style={{
                                                fontSize: '0.6rem',
                                                fontFamily: 'var(--font-display)',
                                                fontWeight: item.active ? 600 : 500,
                                            }}
                                        >
                                            {item.label}
                                        </span>
                                        {item.active && (
                                            <div className="absolute -left-2 lg:-left-3 top-1/2 -translate-y-1/2 w-1 h-7 lg:h-8 rounded-r-full" style={{ background: '#60a5fa' }} />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </nav>
                </div>

                {/* ── Main Area ── */}
                <div className="flex-1 min-w-0">
                    {/* ── Header ── h-16, border-b, keyboard hints + controls */}
                    <div
                        className="h-12 lg:h-14 flex items-center justify-between px-3 md:px-4 lg:px-8"
                        style={{
                            background: 'hsl(224 71% 4%)',
                            borderBottom: '1px solid hsl(216 34% 17%)',
                        }}
                    >
                        {/* Left: keyboard hints */}
                        <div className="hidden md:flex items-center gap-2 text-[10px] lg:text-xs" style={{ color: 'hsl(215 20% 65%)' }}>
                            <kbd className="px-1.5 py-0.5 rounded font-mono text-[9px] lg:text-[10px]" style={{ background: 'hsl(223 47% 11%)', border: '1px solid hsl(216 34% 17%)' }}>⌘K</kbd>
                            <span>Suche</span>
                            <span className="mx-1">·</span>
                            <kbd className="px-1.5 py-0.5 rounded font-mono text-[9px] lg:text-[10px]" style={{ background: 'hsl(223 47% 11%)', border: '1px solid hsl(216 34% 17%)' }}>?</kbd>
                            <span>Shortcuts</span>
                        </div>

                        {/* Right: controls */}
                        <div className="flex items-center gap-2 lg:gap-3 ml-auto">
                            {/* Bell */}
                            <div className="relative">
                                <Bell className="h-4 w-4 lg:h-[18px] lg:w-[18px]" style={{ color: 'hsl(215 20% 65%)' }} strokeWidth={1.5} />
                                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-[7px] text-white font-bold">3</span>
                            </div>
                            <div className="w-px h-5 lg:h-6" style={{ background: 'hsl(216 34% 17%)' }} />
                            {/* Language */}
                            <div className="hidden sm:flex items-center gap-1 text-[10px] lg:text-xs" style={{ color: 'hsl(213 31% 91%)' }}>
                                <Globe className="h-3.5 w-3.5" style={{ color: 'hsl(215 20% 65%)' }} strokeWidth={1.5} />
                                <span className="font-medium uppercase">DE</span>
                            </div>
                            {/* Theme */}
                            <Moon className="hidden sm:block h-4 w-4 lg:h-[18px] lg:w-[18px]" style={{ color: 'hsl(215 20% 65%)' }} strokeWidth={1.5} />
                            <div className="w-px h-5 lg:h-6" style={{ background: 'hsl(216 34% 17%)' }} />
                            {/* User */}
                            <div className="flex items-center gap-1.5 lg:gap-2">
                                <div className="text-right hidden sm:block">
                                    <div className="text-[10px] lg:text-xs font-medium" style={{ color: 'hsl(213 31% 91%)', fontFamily: 'var(--font-display)' }}>AutoTeile Müller</div>
                                    <div className="text-[8px] lg:text-[10px]" style={{ color: 'hsl(215 20% 65%)' }}>Inhaber</div>
                                </div>
                                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-white text-[9px] lg:text-xs font-semibold" style={{ background: 'hsl(221 83% 53%)' }}>AM</div>
                                <ChevronDown className="h-3 w-3 hidden sm:block" style={{ color: 'hsl(215 20% 65%)' }} strokeWidth={2} />
                            </div>
                        </div>
                    </div>

                    {/* ── Dashboard Content (HeuteView) ── */}
                    <div className="p-3 md:p-4 lg:p-6 space-y-3 lg:space-y-4" style={{ color: 'hsl(213 31% 91%)' }}>
                        {/* Header row */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                            <div>
                                <p className="uppercase font-medium" style={{ fontSize: 10, letterSpacing: '0.15em', color: 'hsl(215 20% 65%)' }}>
                                    Mittwoch, 2. April 2026
                                </p>
                                <h2 className="text-base lg:text-lg font-semibold mt-0.5" style={{ fontFamily: 'var(--font-display)', color: 'hsl(213 31% 91%)' }}>
                                    Guten Morgen
                                </h2>
                            </div>
                            <div className="flex gap-1.5">
                                {[{ icon: Plus, label: 'Neuer Auftrag' }, { icon: FileText, label: 'Rechnung' }, { icon: Warehouse, label: 'Bestand' }].map((a, i) => (
                                    <div key={i} className="flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] lg:text-[10px] font-medium" style={{ border: '1px solid hsl(216 34% 17%)', color: 'hsl(213 31% 91%)' }}>
                                        <a.icon className="h-3 w-3" strokeWidth={1.5} /> <span className="hidden lg:inline">{a.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bento KPI Grid — exact 3-col with 2-row revenue hero */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-3">
                            {/* Revenue Hero — row-span-2 */}
                            <div
                                className="col-span-2 md:col-span-1 md:row-span-2 rounded-xl p-4 lg:p-5 relative overflow-hidden flex flex-col justify-between"
                                style={{ border: '1px solid hsl(216 34% 17%)', background: 'hsl(224 71% 4%)' }}
                            >
                                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, hsl(221 83% 53%), hsl(221 83% 53% / 0.5), transparent)' }} />
                                <div>
                                    <p className="uppercase font-medium" style={{ fontSize: 10, letterSpacing: '0.15em', color: 'hsl(215 20% 65%)' }}>
                                        Umsatz heute
                                    </p>
                                    <div className="text-2xl lg:text-3xl font-bold mt-2 lg:mt-3" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', color: 'hsl(213 31% 91%)' }}>
                                        €9.450,00
                                    </div>
                                </div>
                                <p className="text-[10px] lg:text-xs mt-3" style={{ color: 'hsl(215 20% 65%)' }}>Umsatz aus Aufträgen & Rechnungen</p>
                            </div>

                            {/* 4 KPI cards */}
                            {[
                                { label: 'Neue Aufträge', value: '12' },
                                { label: 'In Bearbeitung', value: '8' },
                                { label: 'Rechnungsentwürfe', value: '3' },
                                { label: 'Konversionsrate', value: '68%', color: 'hsl(142 76% 36%)' },
                            ].map((kpi, i) => (
                                <div
                                    key={i}
                                    className="rounded-xl p-3 lg:p-4"
                                    style={{ border: '1px solid hsl(216 34% 17%)', background: 'hsl(224 71% 4%)' }}
                                >
                                    <p className="uppercase font-medium" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'hsl(215 20% 65%)' }}>{kpi.label}</p>
                                    <div
                                        className="text-xl lg:text-2xl font-bold mt-1.5 lg:mt-2"
                                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', color: kpi.color || 'hsl(213 31% 91%)' }}
                                    >
                                        {kpi.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pipeline Bar */}
                        <div className="rounded-xl p-3 lg:p-4" style={{ border: '1px solid hsl(216 34% 17%)', background: 'hsl(224 71% 4%)' }}>
                            <div className="flex items-center justify-between mb-2 lg:mb-3">
                                <h3 className="text-xs lg:text-sm font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'hsl(213 31% 91%)' }}>Auftragspipeline</h3>
                                <span className="text-[10px] lg:text-xs" style={{ color: 'hsl(215 20% 65%)' }}>{pipelineTotal} Aufträge</span>
                            </div>
                            {/* Stacked bar */}
                            <div className="flex rounded-lg overflow-hidden h-6 lg:h-8 mb-2 lg:mb-3">
                                {pipeline.map((stage, i) => {
                                    const w = (stage.count / pipelineTotal) * 100;
                                    return (
                                        <div
                                            key={i}
                                            className="flex items-center justify-center"
                                            style={{ width: `${w}%`, minWidth: 28, backgroundColor: stage.color }}
                                        >
                                            <span className="text-[10px] lg:text-xs font-semibold text-white">{stage.count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Legend */}
                            <div className="flex flex-wrap gap-x-3 lg:gap-x-4 gap-y-1">
                                {pipeline.map((stage, i) => (
                                    <div key={i} className="flex items-center gap-1 text-[9px] lg:text-xs" style={{ color: 'hsl(215 20% 65%)' }}>
                                        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full shrink-0" style={{ backgroundColor: stage.color }} />
                                        <span>{stage.label}</span>
                                        <span className="font-semibold" style={{ color: 'hsl(213 31% 91%)' }}>{stage.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Revenue Chart */}
                        <div className="rounded-xl p-3 lg:p-5" style={{ border: '1px solid hsl(216 34% 17%)', background: 'hsl(224 71% 4%)' }}>
                            <div className="flex items-center justify-between mb-2 lg:mb-3">
                                <div>
                                    <h3 className="text-xs lg:text-sm font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'hsl(213 31% 91%)' }}>Umsatz</h3>
                                    <p className="text-[9px] lg:text-[10px] mt-0.5" style={{ color: 'hsl(215 20% 65%)' }}>Letzte 30 Tage</p>
                                </div>
                                <div className="flex items-center gap-2 lg:gap-3">
                                    {/* Time selector */}
                                    <div className="inline-flex items-center rounded-lg p-0.5" style={{ border: '1px solid hsl(216 34% 17%)', background: 'hsl(224 71% 4%)' }}>
                                        {['7T', '30T', '90T', '1J'].map((r, i) => (
                                            <div
                                                key={r}
                                                className="px-1.5 lg:px-2.5 py-0.5 lg:py-1 text-[9px] lg:text-xs rounded-md"
                                                style={r === '30T' ? {
                                                    background: 'hsl(224 71% 4%)',
                                                    color: 'hsl(213 31% 91%)',
                                                    fontWeight: 500,
                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                                    border: '1px solid hsl(216 34% 17%)',
                                                } : { color: 'hsl(215 20% 65%)' }}
                                            >{r}</div>
                                        ))}
                                    </div>
                                    {/* Legend dots */}
                                    <div className="hidden lg:flex items-center gap-3">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(221 83% 53%)' }} />
                                            <span className="text-[10px]" style={{ color: 'hsl(215 20% 65%)' }}>Umsatz</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(142 76% 36%)' }} />
                                            <span className="text-[10px]" style={{ color: 'hsl(215 20% 65%)' }}>Aufträge</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[80px] md:h-[100px] lg:h-[130px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(221 83% 53%)" stopOpacity={0.35} />
                                                <stop offset="95%" stopColor="hsl(221 83% 53%)" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: 'hsl(215 20% 65%)' }} dy={4} />
                                        <YAxis yAxisId="rev" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: 'hsl(215 20% 65%)' }} tickFormatter={v => `€${(v / 1000).toFixed(0)}k`} width={30} />
                                        <YAxis yAxisId="ord" orientation="right" axisLine={false} tickLine={false} tick={false} width={0} />
                                        <Area yAxisId="rev" type="monotone" dataKey="rev" stroke="hsl(221 83% 53%)" strokeWidth={2} fill="url(#revGrad)" />
                                        <Area yAxisId="ord" type="monotone" dataKey="orders" stroke="hsl(142 76% 36%)" strokeWidth={1.5} fill="url(#ordGrad)" strokeDasharray="4 2" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Bottom: Orders (2/3) + Right Column (1/3) */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-3">
                            {/* Orders Table */}
                            <div className="lg:col-span-2 rounded-xl p-3 lg:p-5" style={{ border: '1px solid hsl(216 34% 17%)', background: 'hsl(224 71% 4%)' }}>
                                <div className="flex items-center justify-between mb-2 lg:mb-3">
                                    <h3 className="text-xs lg:text-sm font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'hsl(213 31% 91%)' }}>Letzte Aufträge</h3>
                                    <div className="flex items-center gap-1 text-[10px] lg:text-xs" style={{ color: 'hsl(221 83% 53%)' }}>
                                        Alle ansehen <ArrowRight className="h-3 w-3" />
                                    </div>
                                </div>
                                {/* Table header */}
                                <div className="grid grid-cols-5 gap-2 pb-2 mb-1" style={{ borderBottom: '1px solid hsl(216 34% 17%)' }}>
                                    {['Kunde', 'Fahrzeug', 'OEM-Nr.', 'Status', ''].map((h, i) => (
                                        <div key={i} className="uppercase font-semibold" style={{ fontSize: 9, letterSpacing: '0.1em', color: 'hsl(215 20% 65%)', fontFamily: 'var(--font-display)' }}>{h}</div>
                                    ))}
                                </div>
                                {/* Rows */}
                                {orders.map((o, i) => (
                                    <div
                                        key={i}
                                        className="grid grid-cols-5 gap-2 py-1.5 lg:py-2 items-center"
                                        style={{ borderBottom: i < orders.length - 1 ? '1px solid hsl(216 34% 17% / 0.5)' : 'none' }}
                                    >
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <MessageSquare className="h-3 w-3 shrink-0" style={{ color: 'hsl(142 76% 36%)' }} strokeWidth={1.5} />
                                            <span className="text-[10px] lg:text-xs font-medium truncate" style={{ color: 'hsl(213 31% 91%)' }}>{o.customer}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <Package className="h-3 w-3 shrink-0" style={{ color: 'hsl(215 20% 65%)' }} strokeWidth={1.5} />
                                            <span className="text-[10px] lg:text-xs truncate" style={{ color: 'hsl(213 31% 91%)' }}>{o.vehicle}</span>
                                        </div>
                                        <code className="text-[9px] lg:text-[10px] px-1.5 py-0.5 rounded truncate" style={{ background: 'hsl(223 47% 11%)', color: 'hsl(215 20% 65%)' }}>{o.oem}</code>
                                        <div className="flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: o.statusColor }} />
                                            <span className="text-[9px] lg:text-[10px] font-medium px-1.5 py-0.5 rounded-md" style={{
                                                background: `${o.statusColor.replace(')', ' / 0.1)')}`,
                                                color: o.statusColor,
                                            }}>{o.status}</span>
                                        </div>
                                        <div className="flex items-center gap-1 justify-end text-[10px]" style={{ color: 'hsl(221 83% 53%)' }}>
                                            <span className="hidden lg:inline">Details</span> <ArrowRight className="h-3 w-3" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-2 lg:gap-3">
                                {/* Pending Actions */}
                                <div className="rounded-xl p-3 lg:p-4" style={{ border: '1px solid hsl(216 34% 17%)', background: 'hsl(224 71% 4%)' }}>
                                    <h3 className="text-[10px] lg:text-xs font-semibold mb-2 lg:mb-3" style={{ fontFamily: 'var(--font-display)', color: 'hsl(213 31% 91%)' }}>Auftragsfälligkeiten</h3>
                                    {[
                                        { icon: FileText, value: '3', label: 'Entwürfe' },
                                        { icon: Package, value: '5', label: 'In Bearbeitung' },
                                        { icon: MessageSquare, value: '7', label: 'Ungelesene Nachrichten' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 lg:gap-3 px-2 py-1.5 lg:py-2 rounded-lg" style={{ cursor: 'default' }}>
                                            <div className="w-6 h-6 lg:w-7 lg:h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(223 47% 11%)' }}>
                                                <item.icon className="h-3 w-3 lg:h-3.5 lg:w-3.5" style={{ color: 'hsl(215 20% 65%)' }} strokeWidth={1.5} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[10px] lg:text-xs font-medium" style={{ color: 'hsl(213 31% 91%)' }}>{item.value}</div>
                                                <div className="text-[9px] lg:text-[10px]" style={{ color: 'hsl(215 20% 65%)' }}>{item.label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Top Customers */}
                                <div className="rounded-xl p-3 lg:p-4" style={{ border: '1px solid hsl(216 34% 17%)', background: 'hsl(224 71% 4%)' }}>
                                    <h3 className="text-[10px] lg:text-xs font-semibold mb-2 lg:mb-3" style={{ fontFamily: 'var(--font-display)', color: 'hsl(213 31% 91%)' }}>Top Kunden</h3>
                                    {[
                                        { name: 'KFZ Meier', rev: '€4.230', orders: 14 },
                                        { name: 'AutoFit GmbH', rev: '€3.890', orders: 11 },
                                        { name: 'Parts Express', rev: '€2.150', orders: 8 },
                                    ].map((c, i) => (
                                        <div key={i} className="flex items-center gap-2 py-1.5">
                                            <div
                                                className="w-6 h-6 lg:w-7 lg:h-7 rounded-full flex items-center justify-center text-[8px] lg:text-[9px] font-semibold shrink-0"
                                                style={{ background: 'hsl(221 83% 53%)', color: '#fff' }}
                                            >
                                                {c.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[10px] lg:text-xs font-medium truncate" style={{ color: 'hsl(213 31% 91%)' }}>{c.name}</div>
                                                <div className="text-[9px]" style={{ color: 'hsl(215 20% 65%)' }}>{c.orders} Aufträge</div>
                                            </div>
                                            <div className="text-[10px] lg:text-xs font-semibold" style={{ color: 'hsl(213 31% 91%)' }}>{c.rev}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
