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
        <div className="w-full max-w-6xl mx-auto h-[260px] sm:h-[500px] lg:h-auto overflow-hidden lg:overflow-visible rounded-xl shadow-2xl border border-border/50 bg-muted">
            <div className="w-[1100px] lg:w-full origin-top-left transform scale-[0.32] sm:scale-[0.6] lg:scale-100">
                {/* Fake Browser/App Header */}
                <div className="bg-background border-b border-border p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary text-white font-bold rounded-lg p-1.5 px-3">AT</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-md border border-border">
                            <kbd className="font-mono text-xs text-muted-foreground">⌘K</kbd> <span>für Suche</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <Bell className="h-5 w-5 hover:text-foreground transition-colors cursor-pointer" />
                        <div className="flex items-center gap-2">
                            <div className="text-right block">
                                <div className="text-xs font-bold text-foreground">Admin</div>
                                <div className="text-[10px] text-muted-foreground">Gast</div>
                            </div>
                            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">A</div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="bg-muted/50 p-8 min-h-[800px]">
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-1">Heute</h2>
                            <p className="text-muted-foreground text-sm">Dein aktueller Arbeitsstand aus WhatsApp, Angeboten und Aufträgen</p>
                        </div>
                        <div className="text-sm text-muted-foreground font-medium glass px-3 py-1 rounded-full border border-border shadow-sm">
                            Live Daten
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        {/* Card 1: WhatsApp */}
                        <div className="glass p-6 rounded-xl border border-border/50 shadow-sm relative overflow-hidden group hover:border-primary/50 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-primary/20 text-primary rounded-lg">
                                    <MessageSquare className="h-5 w-5" />
                                </div>
                                <span className="text-xs font-medium text-success bg-success/20 px-2 py-0.5 rounded-full border border-success/30">+12%</span>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground mb-1 font-medium">WhatsApp Nachrichten</div>
                                <div className="text-3xl font-bold text-foreground">3</div>
                            </div>
                        </div>

                        {/* Card 2: In Bearbeitung */}
                        <div className="glass p-6 rounded-xl border border-border/50 shadow-sm relative overflow-hidden hover:border-primary/50 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-warning/20 text-warning rounded-lg">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <span className="text-xs font-medium text-success bg-success/20 px-2 py-0.5 rounded-full border border-success/30">+2.3%</span>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground mb-1 font-medium">In Bearbeitung</div>
                                <div className="text-3xl font-bold text-foreground">5</div>
                            </div>
                        </div>

                        {/* Card 3: Offene Belege */}
                        <div className="glass p-6 rounded-xl border border-border/50 shadow-sm relative overflow-hidden hover:border-primary/50 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-error/20 text-error rounded-lg">
                                    <Clock className="h-5 w-5" />
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground mb-1 font-medium">Offene Belege</div>
                                <div className="text-3xl font-bold text-foreground">0</div>
                            </div>
                        </div>

                        {/* Card 4: Umsatz */}
                        <div className="glass p-6 rounded-xl border border-border/50 shadow-sm relative overflow-hidden hover:border-primary/50 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-success/20 text-success rounded-lg">
                                    <Euro className="h-5 w-5" />
                                </div>
                                <span className="text-xs font-medium text-success bg-success/20 px-2 py-0.5 rounded-full border border-success/30">+18%</span>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground mb-1 font-medium">Umsatz (heute)</div>
                                <div className="text-3xl font-bold text-foreground">€1.250,50</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        {/* Chart Section */}
                        <div className="col-span-2 glass p-6 rounded-xl border border-border/50 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">Umsatz & Bestellungen</h3>
                                    <p className="text-sm text-muted-foreground">Übersicht der letzten 30 Tage</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="text-xs font-medium bg-primary/20 px-3 py-1 rounded-md text-primary shadow-sm">30T</button>
                                    <button className="text-xs font-medium hover:bg-muted px-3 py-1 rounded-md text-muted-foreground transition-colors">90T</button>
                                </div>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorUmsatz" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(value) => `€${value}`} dx={-10} />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: '8px',
                                                border: '1px solid rgba(148, 163, 184, 0.1)',
                                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
                                                backgroundColor: '#0f172a',
                                                color: '#f8fafc'
                                            }}
                                        />
                                        <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorUmsatz)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Top Kunden */}
                        <div className="glass p-6 rounded-xl border border-border/50 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-foreground">Top Kunden</h3>
                                <UtcIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer group">
                                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                            M{i}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-foreground">Max Mustermann</div>
                                            <div className="text-xs text-muted-foreground">3 Bestellungen</div>
                                        </div>
                                        <div className="ml-auto text-sm font-bold text-foreground">€450</div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors border border-dashed border-primary/30">
                                Alle Kunden anzeigen
                            </button>
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
