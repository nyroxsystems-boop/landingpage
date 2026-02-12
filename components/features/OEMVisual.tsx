'use client';

import { motion } from 'framer-motion';
import { Search, Database, CheckCircle2, ArrowRight, Cpu } from 'lucide-react';

const sources = [
    { name: 'TecDoc', confidence: 98, color: 'from-blue-500 to-blue-600' },
    { name: 'Autodoc', confidence: 95, color: 'from-emerald-500 to-emerald-600' },
    { name: 'Daparto', confidence: 92, color: 'from-amber-500 to-amber-600' },
    { name: 'eBay', confidence: 88, color: 'from-violet-500 to-violet-600' },
];

export function OEMVisual() {
    return (
        <div className="relative w-full h-[280px] md:h-[320px] flex items-center justify-center">
            <div className="w-full max-w-sm space-y-3 md:space-y-4">
                {/* Input Card */}
                <motion.div
                    className="glass border border-border/50 rounded-xl p-3 md:p-4"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Search className="h-4 w-4 text-violet-400" />
                        <span className="text-xs font-medium text-white">OEM-Suche</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-700/40 rounded-lg px-3 py-2 text-xs text-white font-mono">
                            Bremssattel · Audi A4 · 2019
                        </div>
                        <motion.div
                            className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 2, repeat: 1, ease: 'linear' }}
                        >
                            <Cpu className="h-4 w-4 text-white" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Multi-Source Scan */}
                <div className="space-y-2">
                    {sources.map((source, i) => (
                        <motion.div
                            key={i}
                            className="glass border border-border/50 rounded-lg p-2.5 md:p-3 flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 + 0.5, duration: 0.4 }}
                        >
                            <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${source.color} flex items-center justify-center shrink-0`}>
                                <Database className="h-3.5 w-3.5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] md:text-xs font-medium text-white">{source.name}</span>
                                    <span className="text-[10px] md:text-xs text-emerald-400 font-mono">{source.confidence}%</span>
                                </div>
                                <div className="h-1.5 bg-slate-700/50 rounded-full mt-1 overflow-hidden">
                                    <motion.div
                                        className={`h-full bg-gradient-to-r ${source.color} rounded-full`}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${source.confidence}%` }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2 + 0.8, duration: 0.6 }}
                                    />
                                </div>
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 + 1.2, type: 'spring' }}
                            >
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Result */}
                <motion.div
                    className="glass border border-emerald-500/30 rounded-xl p-3 md:p-4 bg-gradient-to-r from-emerald-500/10 to-transparent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.8, duration: 0.4 }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-[10px] text-emerald-400 font-medium mb-1">✓ OEM verifiziert (4/4 Quellen)</div>
                            <div className="text-sm md:text-base font-bold text-white font-mono">8K0615123F</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] text-muted-foreground">Konfidenz</div>
                            <div className="text-lg font-bold text-emerald-400">98%</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
