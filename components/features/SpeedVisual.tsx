'use client';

import { motion } from 'framer-motion';
import { Zap, Clock, FileText, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export function SpeedVisual() {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Auto-start animation when in view
    useEffect(() => {
        if (!isRunning) return;
        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev >= 2.8) {
                    clearInterval(interval);
                    return 2.8;
                }
                return prev + 0.1;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [isRunning]);

    const stages = [
        { label: 'Anfrage', icon: '💬', done: timer > 0.3 },
        { label: 'OEM-Suche', icon: '🔍', done: timer > 1.0 },
        { label: '3 Angebote', icon: '📋', done: timer > 2.0 },
        { label: 'Versendet', icon: '✅', done: timer > 2.5 },
    ];

    return (
        <div className="relative w-full h-[280px] md:h-[320px] flex items-center justify-center">
            <div className="w-full max-w-sm space-y-4 md:space-y-5">
                {/* Speed Timer */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onViewportEnter={() => setIsRunning(true)}
                    transition={{ duration: 0.4 }}
                >
                    <div className="inline-flex items-center gap-3 glass border border-amber-500/30 rounded-2xl px-5 py-3 md:px-6 md:py-4">
                        <Zap className="h-5 w-5 md:h-6 md:w-6 text-amber-400" />
                        <div className="font-mono text-2xl md:text-3xl font-bold text-white">
                            {timer.toFixed(1)}<span className="text-base md:text-lg text-muted-foreground ml-1">Sek</span>
                        </div>
                    </div>
                </motion.div>

                {/* Progress Pipeline */}
                <div className="relative">
                    {/* Connection Line */}
                    <div className="absolute top-5 left-6 right-6 h-0.5 bg-slate-700/50 z-0" />
                    <motion.div
                        className="absolute top-5 left-6 h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500 z-10"
                        style={{ width: `${Math.min((timer / 2.8) * 100, 100)}%`, maxWidth: 'calc(100% - 48px)' }}
                    />

                    {/* Stage Nodes */}
                    <div className="relative flex justify-between z-20">
                        {stages.map((stage, i) => (
                            <motion.div
                                key={i}
                                className="flex flex-col items-center"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 + 0.2 }}
                            >
                                <motion.div
                                    className={`h-10 w-10 rounded-xl flex items-center justify-center text-base transition-all duration-300 ${stage.done
                                            ? 'bg-gradient-to-br from-amber-500/30 to-emerald-500/30 border border-emerald-500/50 shadow-lg shadow-emerald-500/20'
                                            : 'glass border border-border/50'
                                        }`}
                                    animate={stage.done ? { scale: [1, 1.15, 1] } : {}}
                                    transition={{ duration: 0.3 }}
                                >
                                    {stage.icon}
                                </motion.div>
                                <span className={`text-[9px] md:text-[10px] mt-2 font-medium transition-colors duration-300 ${stage.done ? 'text-emerald-400' : 'text-muted-foreground'
                                    }`}>
                                    {stage.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Comparison Bar */}
                <motion.div
                    className="glass border border-border/50 rounded-xl p-3 md:p-4 mt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5 }}
                >
                    <div className="flex items-center justify-between text-[10px] md:text-xs mb-2">
                        <span className="text-muted-foreground">Manuell</span>
                        <span className="text-muted-foreground">~15 Min</span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full mb-3 overflow-hidden">
                        <div className="h-full w-full bg-rose-500/40 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] md:text-xs mb-2">
                        <span className="text-amber-400 font-medium">Partsunion KI</span>
                        <span className="text-amber-400 font-medium">~3 Sek</span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: '3%' }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.8, duration: 0.5 }}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
