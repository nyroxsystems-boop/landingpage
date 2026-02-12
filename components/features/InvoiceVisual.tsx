'use client';

import { motion } from 'framer-motion';
import { FileText, Package, CreditCard, Send, CheckCircle2, ArrowDown } from 'lucide-react';

const steps = [
    { icon: Package, label: 'Bestellung', desc: 'Kunde bestellt via WhatsApp', color: 'from-blue-500 to-blue-600' },
    { icon: FileText, label: 'Rechnung', desc: 'Auto-generiert mit Steuern', color: 'from-violet-500 to-purple-600' },
    { icon: CreditCard, label: 'Bezahlung', desc: 'Zahlungslink versendet', color: 'from-amber-500 to-orange-600' },
    { icon: Send, label: 'Versand', desc: 'Lieferschein erstellt', color: 'from-emerald-500 to-green-600' },
];

export function InvoiceVisual() {
    return (
        <div className="relative w-full h-[280px] md:h-[320px] flex items-center justify-center">
            <div className="w-full max-w-sm">
                {/* Document Preview */}
                <motion.div
                    className="glass border border-border/50 rounded-xl p-3 md:p-4 mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <FileText className="h-4 w-4 text-violet-400" />
                        <span className="text-xs font-bold text-white">Rechnung #2024-0847</span>
                        <motion.span
                            className="ml-auto text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.5 }}
                        >
                            Auto-generiert
                        </motion.span>
                    </div>
                    <div className="space-y-1.5 text-[10px] md:text-xs">
                        <div className="flex justify-between text-muted-foreground">
                            <span>1x Bremssattel vorne</span>
                            <span className="text-white">89,90 €</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                            <span>1x Bremsbelagsatz</span>
                            <span className="text-white">45,50 €</span>
                        </div>
                        <div className="border-t border-slate-700/50 pt-1.5 mt-1.5 flex justify-between">
                            <span className="text-muted-foreground">MwSt. 19%</span>
                            <span className="text-white">25,73 €</span>
                        </div>
                        <div className="flex justify-between font-bold text-white">
                            <span>Gesamt</span>
                            <span className="text-emerald-400">161,13 €</span>
                        </div>
                    </div>
                </motion.div>

                {/* Process Steps */}
                <div className="flex items-center justify-between relative">
                    {/* Connection Line */}
                    <div className="absolute top-5 left-6 right-6 h-0.5 bg-slate-700/50 z-0" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-col items-center relative z-10"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.3 + 0.3 }}
                        >
                            <motion.div
                                className={`h-10 w-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                                whileInView={{ scale: [0.8, 1.1, 1] }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.3 + 0.5, duration: 0.4 }}
                            >
                                <step.icon className="h-4 w-4 text-white" />
                            </motion.div>
                            <span className="text-[8px] md:text-[9px] text-white font-medium mt-1.5">{step.label}</span>
                            <span className="text-[7px] md:text-[8px] text-muted-foreground mt-0.5 text-center max-w-[70px] leading-tight">{step.desc}</span>

                            {/* Checkmark */}
                            <motion.div
                                className="absolute -top-1 -right-1"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.3 + 0.9, type: 'spring' }}
                            >
                                <div className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                    <CheckCircle2 className="h-3 w-3 text-white" />
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Badge */}
                <motion.div
                    className="flex items-center justify-center gap-2 mt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2 }}
                >
                    <span className="text-[10px] text-muted-foreground">Vollautomatisch</span>
                    <span className="text-[10px] text-emerald-400 font-medium">• Kein manueller Schritt</span>
                </motion.div>
            </div>
        </div>
    );
}
