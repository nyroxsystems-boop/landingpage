'use client';

/**
 * DashboardPreview — Live-Replik des 3-Pane-Sales-Workspace aus dem
 * Partsunion-Produkt (User-Dashboard/src/app/views/sales/HomeView.tsx).
 *
 * Drei-Pane-Layout: InboxPane (links) · Workbench (Mitte) · ContextPane (rechts).
 * Visuell identisch zu den ui-v2-Komponenten, aber als leichtgewichtige
 * Repliken ohne React-Router/Hooks (Landing ist Next/App-Router, Produkt Vite).
 *
 * Tokens: JetBrains Mono für Zahlen/Preise/OEM, blaue Akzentfarbe #3b82f6,
 * Corner-Marks statt Vollrahmen, LED-Dots für Status, Bloomberg-Terminal-Header.
 */

import { MessageSquare, Package, Search, Clock, Command, Bell, ChevronRight, Phone, Globe2, ArrowUp } from 'lucide-react';

// ─── Mock-Daten ─────────────────────────────────────────────────────────────

const inboxItems = [
    { id: 1, channel: 'WA', customer: 'KFZ Meier GmbH', preview: 'Bremssattel VA für Golf VII', minutesAgo: 2, status: 'new' as const },
    { id: 2, channel: 'WEB', customer: 'AutoFit GmbH', preview: 'Turbo 2.0 TDI Passat B8', minutesAgo: 14, status: 'assigned' as const },
    { id: 3, channel: 'WA', customer: 'Werkstatt Schmidt', preview: 'Lichtmaschine BMW F30', minutesAgo: 27, status: 'assigned' as const },
    { id: 4, channel: 'EMAIL', customer: 'Parts Express UG', preview: 'Stoßdämpfer Mercedes W205', minutesAgo: 42, status: 'assigned' as const },
    { id: 5, channel: 'WA', customer: 'Müller Automotive', preview: 'Kupplung Audi A4 B9 3.0 TDI', minutesAgo: 58, status: 'assigned' as const },
];

const kanbanColumns = [
    { key: 'neu', label: 'Neu', count: 4, total: '€2.840' },
    { key: 'bearb', label: 'In Arbeit', count: 7, total: '€8.420' },
    { key: 'ang', label: 'Angebot', count: 5, total: '€12.180' },
    { key: 'best', label: 'Bestätigt', count: 6, total: '€18.540' },
    { key: 'fakt', label: 'Fakturiert', count: 3, total: '€6.920' },
];

const metrics = [
    { label: 'UMSATZ HEUTE', value: '€9.450', delta: '+18%', trend: 'up' as const },
    { label: 'NEUE ANFRAGEN', value: '12', delta: '+3', trend: 'up' as const },
    { label: 'KONVERSION 30T', value: '68%', delta: '+4%', trend: 'up' as const },
    { label: 'OP OFFEN', value: '€4.230', delta: '−€890', trend: 'down' as const },
];

const activity = [
    { time: '08:42', kind: 'ORDER', text: 'Auftrag #24871 fakturiert · KFZ Meier GmbH' },
    { time: '08:31', kind: 'INBOX', text: 'WhatsApp-Anfrage · Werkstatt Schmidt' },
    { time: '08:14', kind: 'INVOICE', text: 'Rechnung #R-1284 · €1.240,00 versendet' },
    { time: '07:58', kind: 'PAYMENT', text: 'Zahlungseingang · €890,00 · AutoFit GmbH' },
    { time: '07:42', kind: 'SYSTEM', text: 'Lieferantenpreise synchronisiert · WM SE' },
];

// ─── Atoms ──────────────────────────────────────────────────────────────────

function CornerMarks({ color = 'rgba(148,163,184,0.35)' }: { color?: string }) {
    return (
        <>
            <span aria-hidden className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2" style={{ borderColor: color }} />
            <span aria-hidden className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2" style={{ borderColor: color }} />
            <span aria-hidden className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2" style={{ borderColor: color }} />
            <span aria-hidden className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2" style={{ borderColor: color }} />
        </>
    );
}

function Led({ color }: { color: string }) {
    return (
        <span className="inline-block w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 4px ${color}` }} />
    );
}

// ─── Component ──────────────────────────────────────────────────────────────

export function DashboardPreview() {
    return (
        <div
            className="w-full rounded-xl overflow-hidden font-[var(--font-sans)]"
            style={{ background: 'hsl(222 47% 5%)', border: '1px solid rgba(59,130,246,0.1)', minHeight: 540 }}
        >
            {/* ─── Bloomberg-Terminal-Header ─── */}
            <div
                className="flex items-center justify-between h-9 px-3 lg:px-4"
                style={{ background: 'hsl(222 47% 7%)', borderBottom: '1px solid rgba(148,163,184,0.08)' }}
            >
                <div className="flex items-center gap-3 lg:gap-5 text-[10px] lg:text-[11px] font-mono" style={{ color: 'rgba(148,163,184,0.7)' }}>
                    <span className="flex items-center gap-1.5">
                        <Led color="#10b981" />
                        <span className="font-semibold tracking-widest" style={{ color: '#10b981' }}>LIVE</span>
                    </span>
                    <span className="hidden sm:inline">09:14:22 MEZ</span>
                    <span className="hidden md:flex items-center gap-1.5"><Led color="#3b82f6" />WM SE</span>
                    <span className="hidden md:flex items-center gap-1.5"><Led color="#3b82f6" />TecDoc</span>
                    <span className="hidden lg:flex items-center gap-1.5"><Led color="#10b981" />WhatsApp</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] lg:text-[11px] font-mono" style={{ color: 'rgba(148,163,184,0.55)' }}>
                    <span className="hidden sm:inline">SALES · HEUTE</span>
                    <span className="flex items-center gap-1"><Command className="w-3 h-3" /> K</span>
                </div>
            </div>

            <div className="flex" style={{ minHeight: 500 }}>
                {/* ─── Inbox-Pane ─── */}
                <aside
                    className="hidden md:flex w-48 lg:w-56 flex-col shrink-0"
                    style={{ background: 'hsl(222 47% 6%)', borderRight: '1px solid rgba(148,163,184,0.08)' }}
                >
                    <div
                        className="flex items-center justify-between h-9 px-3 text-[10px] font-mono tracking-widest"
                        style={{ color: 'rgba(148,163,184,0.7)', borderBottom: '1px solid rgba(148,163,184,0.06)' }}
                    >
                        <span>INBOX</span>
                        <span className="px-1.5 py-0.5 rounded" style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                            {inboxItems.filter(i => i.status === 'new').length} NEU
                        </span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        {inboxItems.map((item, i) => (
                            <div
                                key={item.id}
                                className="px-3 py-2.5 cursor-default"
                                style={{
                                    background: i === 0 ? 'rgba(59,130,246,0.08)' : 'transparent',
                                    borderBottom: '1px solid rgba(148,163,184,0.05)',
                                    borderLeft: i === 0 ? '2px solid #3b82f6' : '2px solid transparent',
                                }}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-1.5">
                                        <Led color={item.status === 'new' ? '#3b82f6' : 'rgba(148,163,184,0.4)'} />
                                        <span className="font-mono text-[9px] font-semibold tracking-widest" style={{ color: 'rgba(148,163,184,0.8)' }}>
                                            {item.channel}
                                        </span>
                                    </div>
                                    <span className="font-mono text-[9px]" style={{ color: 'rgba(148,163,184,0.5)' }}>
                                        {item.minutesAgo}m
                                    </span>
                                </div>
                                <div className="text-[11px] font-semibold mb-0.5 truncate" style={{ color: 'rgba(241,245,249,0.92)' }}>
                                    {item.customer}
                                </div>
                                <div className="text-[10px] truncate" style={{ color: 'rgba(148,163,184,0.65)' }}>
                                    {item.preview}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* ─── Workbench ─── */}
                <main className="flex-1 min-w-0 flex flex-col">
                    {/* Workbench-Tabs (Chrome-ähnlich) */}
                    <div className="flex items-center h-9 px-2 lg:px-3 gap-0.5" style={{ background: 'hsl(222 47% 6%)', borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
                        {['Heute', 'Angebote', 'Rechnungen', 'Kunden'].map((tab, i) => (
                            <div
                                key={tab}
                                className="px-3 lg:px-4 py-1.5 text-[11px] font-medium font-mono"
                                style={{
                                    background: i === 0 ? 'hsl(222 47% 5%)' : 'transparent',
                                    color: i === 0 ? '#60a5fa' : 'rgba(148,163,184,0.6)',
                                    borderTop: i === 0 ? '2px solid #3b82f6' : '2px solid transparent',
                                }}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 p-3 lg:p-5 space-y-3 lg:space-y-4">
                        {/* Header */}
                        <div className="flex items-end justify-between gap-2">
                            <div>
                                <div className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(148,163,184,0.55)' }}>
                                    SALES · HEUTE · 21. APRIL 2026
                                </div>
                                <h2 className="text-base lg:text-lg font-semibold mt-0.5" style={{ color: 'rgba(241,245,249,0.95)', fontFamily: 'var(--font-display)' }}>
                                    Guten Morgen
                                </h2>
                            </div>
                            <div className="hidden sm:flex items-center gap-1 font-mono text-[10px]" style={{ color: 'rgba(148,163,184,0.5)' }}>
                                <Search className="w-3 h-3" />
                                <span>⌘K</span>
                            </div>
                        </div>

                        {/* MonoMetric-Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
                            {metrics.map(m => (
                                <div key={m.label} className="relative p-3 lg:p-4" style={{ background: 'hsl(222 47% 6%)' }}>
                                    <CornerMarks />
                                    <div className="font-mono text-[9px] tracking-widest mb-1" style={{ color: 'rgba(148,163,184,0.55)' }}>
                                        {m.label}
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-mono tabular-nums text-xl lg:text-2xl font-semibold" style={{ color: 'rgba(241,245,249,0.95)' }}>
                                            {m.value}
                                        </span>
                                        <span
                                            className="font-mono text-[10px] inline-flex items-center gap-0.5"
                                            style={{ color: m.trend === 'up' ? '#10b981' : '#f43f5e' }}
                                        >
                                            <ArrowUp className="w-2.5 h-2.5" style={{ transform: m.trend === 'down' ? 'rotate(180deg)' : undefined }} />
                                            {m.delta}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pipeline-Kanban */}
                        <div className="relative p-3 lg:p-4" style={{ background: 'hsl(222 47% 6%)' }}>
                            <CornerMarks />
                            <div className="flex items-center justify-between mb-3">
                                <div className="font-mono text-[9px] tracking-widest" style={{ color: 'rgba(148,163,184,0.55)' }}>
                                    PIPELINE · 25 AUFTRÄGE
                                </div>
                                <div className="font-mono text-[9px]" style={{ color: 'rgba(148,163,184,0.45)' }}>
                                    Σ €48.900
                                </div>
                            </div>
                            <div className="grid grid-cols-5 gap-1.5 lg:gap-2">
                                {kanbanColumns.map((col, i) => (
                                    <div key={col.key} className="relative px-2 py-2 lg:py-3" style={{ background: 'hsl(222 47% 5%)', borderTop: `2px solid ${i === 0 ? '#3b82f6' : i < 3 ? 'rgba(59,130,246,0.4)' : '#10b981'}` }}>
                                        <div className="font-mono text-[9px] tracking-wider mb-1" style={{ color: 'rgba(148,163,184,0.6)' }}>
                                            {col.label.toUpperCase()}
                                        </div>
                                        <div className="font-mono tabular-nums text-lg lg:text-xl font-semibold leading-none" style={{ color: 'rgba(241,245,249,0.95)' }}>
                                            {col.count}
                                        </div>
                                        <div className="font-mono text-[9px] mt-1 truncate" style={{ color: 'rgba(148,163,184,0.55)' }}>
                                            {col.total}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Activity-Feed */}
                        <div className="relative p-3 lg:p-4" style={{ background: 'hsl(222 47% 6%)' }}>
                            <CornerMarks />
                            <div className="flex items-center justify-between mb-2">
                                <div className="font-mono text-[9px] tracking-widest" style={{ color: 'rgba(148,163,184,0.55)' }}>
                                    AKTIVITÄT · LIVE
                                </div>
                                <Led color="#10b981" />
                            </div>
                            <div className="space-y-1.5">
                                {activity.map((a, i) => (
                                    <div key={i} className="grid grid-cols-[52px_58px_1fr] items-center gap-2 text-[11px]">
                                        <span className="font-mono tabular-nums" style={{ color: 'rgba(148,163,184,0.5)' }}>{a.time}</span>
                                        <span className="font-mono text-[9px] tracking-widest px-1.5 py-0.5 rounded-sm text-center" style={{
                                            background: a.kind === 'ORDER' ? 'rgba(59,130,246,0.15)' :
                                                a.kind === 'INVOICE' ? 'rgba(168,85,247,0.15)' :
                                                    a.kind === 'PAYMENT' ? 'rgba(16,185,129,0.15)' :
                                                        a.kind === 'INBOX' ? 'rgba(245,158,11,0.15)' :
                                                            'rgba(148,163,184,0.12)',
                                            color: a.kind === 'ORDER' ? '#60a5fa' :
                                                a.kind === 'INVOICE' ? '#c084fc' :
                                                    a.kind === 'PAYMENT' ? '#34d399' :
                                                        a.kind === 'INBOX' ? '#fbbf24' :
                                                            'rgba(148,163,184,0.7)',
                                        }}>
                                            {a.kind}
                                        </span>
                                        <span className="truncate" style={{ color: 'rgba(203,213,225,0.9)' }}>{a.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                {/* ─── Context-Pane ─── */}
                <aside
                    className="hidden lg:flex w-56 xl:w-64 flex-col shrink-0"
                    style={{ background: 'hsl(222 47% 6%)', borderLeft: '1px solid rgba(148,163,184,0.08)' }}
                >
                    <div
                        className="flex items-center h-9 px-3 text-[10px] font-mono tracking-widest"
                        style={{ color: 'rgba(148,163,184,0.7)', borderBottom: '1px solid rgba(148,163,184,0.06)' }}
                    >
                        KONTEXT · KFZ MEIER
                    </div>
                    <div className="p-3 space-y-3 overflow-hidden">
                        <div className="relative p-2.5" style={{ background: 'hsl(222 47% 5%)' }}>
                            <CornerMarks />
                            <div className="font-mono text-[9px] tracking-widest mb-2" style={{ color: 'rgba(148,163,184,0.5)' }}>KUNDE</div>
                            <div className="text-[12px] font-semibold mb-1" style={{ color: 'rgba(241,245,249,0.92)' }}>KFZ Meier GmbH</div>
                            <div className="flex items-center gap-1.5 text-[10px] font-mono" style={{ color: 'rgba(148,163,184,0.7)' }}>
                                <Phone className="w-2.5 h-2.5" /> +49 221 44 28 11
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-mono mt-0.5" style={{ color: 'rgba(148,163,184,0.7)' }}>
                                <Globe2 className="w-2.5 h-2.5" /> Köln
                            </div>
                        </div>

                        <div className="relative p-2.5" style={{ background: 'hsl(222 47% 5%)' }}>
                            <CornerMarks />
                            <div className="font-mono text-[9px] tracking-widest mb-2" style={{ color: 'rgba(148,163,184,0.5)' }}>LIFETIME</div>
                            <div className="grid grid-cols-2 gap-1.5">
                                <div>
                                    <div className="font-mono tabular-nums text-base font-semibold" style={{ color: 'rgba(241,245,249,0.95)' }}>47</div>
                                    <div className="text-[9px] font-mono" style={{ color: 'rgba(148,163,184,0.5)' }}>AUFTRÄGE</div>
                                </div>
                                <div>
                                    <div className="font-mono tabular-nums text-base font-semibold" style={{ color: '#10b981' }}>€18.4k</div>
                                    <div className="text-[9px] font-mono" style={{ color: 'rgba(148,163,184,0.5)' }}>UMSATZ</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative p-2.5" style={{ background: 'hsl(222 47% 5%)' }}>
                            <CornerMarks />
                            <div className="font-mono text-[9px] tracking-widest mb-2" style={{ color: 'rgba(148,163,184,0.5)' }}>LETZTE OEM</div>
                            <div className="space-y-1">
                                {['8K0 615 123 F', '03L 253 016 TX', '7L0 498 099'].map(oem => (
                                    <div key={oem} className="font-mono tabular-nums text-[10px] flex items-center gap-1.5" style={{ color: 'rgba(148,163,184,0.8)' }}>
                                        <span className="w-1 h-1 rounded-full" style={{ background: '#3b82f6' }} />
                                        {oem}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
