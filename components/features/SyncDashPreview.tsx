'use client';

import { motion } from 'framer-motion';
import { RefreshCw, ShoppingCart, Globe, Store, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const channels = [
    { name: 'eBay Motors', icon: Globe, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Onlineshop', icon: Store, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Theke / Lokal', icon: ShoppingCart, color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

export function SyncDashPreview() {
    const [counts, setCounts] = useState([12, 12, 12]);
    const [syncing, setSyncing] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setSyncing(true);
            setTimeout(() => {
                const newBase = Math.floor(Math.random() * 50) + 10;
                setCounts([newBase, newBase, newBase]);
                setSyncing(false);
            }, 800);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full bg-slate-950 p-6 flex flex-col gap-6 rounded-2xl border border-white/5 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

            {/* Status Header */}
            <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-white font-bold text-sm">Bestands-Sync Aktiv</span>
                </div>
                <div className="bg-white/5 px-3 py-1 rounded-full text-[10px] text-white/50 font-mono">
                    LAST SYNC: JUST NOW
                </div>
            </div>

            {/* Channels Grid */}
            <div className="grid grid-cols-1 gap-4 z-10 flex-1">
                {channels.map((ch, i) => (
                    <motion.div
                        key={ch.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 ${ch.bg} ${ch.color} rounded-lg flex items-center justify-center`}>
                                <ch.icon size={20} />
                            </div>
                            <div>
                                <div className="text-white font-bold text-xs">{ch.name}</div>
                                <div className="text-white/40 text-[10px]">Verbundene API</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <motion.div
                                key={counts[i]}
                                initial={{ scale: 1.2, color: '#3b82f6' }}
                                animate={{ scale: 1, color: '#ffffff' }}
                                className="text-xl font-bold"
                            >
                                {counts[i]}
                            </motion.div>
                            <div className="text-[10px] text-white/40">Auf Lager</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Sync Animation Overlay */}
            <div className="flex justify-center items-center gap-8 py-4 z-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <motion.div
                    animate={{ rotate: syncing ? 360 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`h-12 w-12 rounded-full flex items-center justify-center border-2 ${syncing ? 'border-primary' : 'border-white/10'} text-primary`}
                >
                    <RefreshCw size={24} />
                </motion.div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg z-10">
                <div className="flex gap-2 items-center text-blue-400 font-bold text-[10px] mb-1">
                    <CheckCircle2 size={12} /> KEINE ÜBERVERKÄUFE
                </div>
                <p className="text-[10px] text-white/60">Automatischer Bestandsabgleich verhindert Sperrungen auf Marktplätzen.</p>
            </div>
        </div>
    );
}
