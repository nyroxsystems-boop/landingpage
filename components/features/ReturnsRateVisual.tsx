'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, CheckCircle2, Camera, ScanLine } from 'lucide-react';

const comparisons = [
    { label: 'Manuelle Bestellung', errorRate: 12, color: 'bg-rose-500', barColor: 'from-rose-500 to-rose-600' },
    { label: 'Mit KI-Unterstützung', errorRate: 1.2, color: 'bg-emerald-500', barColor: 'from-emerald-500 to-emerald-600' },
];

const checks = [
    { icon: Camera, label: 'Fahrzeugschein-Scan', status: '✓ HSN/TSN erkannt' },
    { icon: ScanLine, label: 'OEM Cross-Reference', status: '✓ Kompatibel' },
    { icon: ShieldCheck, label: 'Teile-Validierung', status: '✓ Bestätigt' },
];

export function ReturnsRateVisual() {
    return (
        <div className="relative w-full flex items-center justify-center py-4">
            <div className="w-full max-w-sm space-y-3 md:space-y-4">
                {/* Error Rate Comparison */}
                <motion.div
                    className="glass border border-border/50 rounded-xl p-3 md:p-4"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-4 w-4 text-amber-400" />
                        <span className="text-xs font-medium text-white">Retourenquote</span>
                    </div>
                    <div className="space-y-3">
                        {comparisons.map((item, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between text-[10px] md:text-xs mb-1.5">
                                    <span className="text-muted-foreground">{item.label}</span>
                                    <span className={`font-mono font-bold ${i === 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                        {item.errorRate}%
                                    </span>
                                </div>
                                <div className="h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full bg-gradient-to-r ${item.barColor} rounded-full`}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${(item.errorRate / 15) * 100}%` }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.4 + 0.5, duration: 0.8 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Validation Pipeline */}
                <div className="space-y-2">
                    {checks.map((check, i) => (
                        <motion.div
                            key={i}
                            className="glass border border-border/50 rounded-lg p-2.5 md:p-3 flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.25 + 1.0, duration: 0.4 }}
                        >
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center shrink-0">
                                <check.icon className="h-4 w-4 text-emerald-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-[10px] md:text-xs font-medium text-white block">{check.label}</span>
                                <motion.span
                                    className="text-[9px] md:text-[10px] text-emerald-400"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.25 + 1.4 }}
                                >
                                    {check.status}
                                </motion.span>
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.25 + 1.6, type: 'spring' }}
                            >
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Result Badge */}
                <motion.div
                    className="flex items-center justify-center gap-2 pt-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.2 }}
                >
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-400 font-medium">90% weniger Retouren durch KI-Validierung</span>
                </motion.div>
            </div>
        </div>
    );
}
