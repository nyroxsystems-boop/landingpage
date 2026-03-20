'use client';

import { motion } from 'framer-motion';
import { Mic, MessageSquare, CheckCircle2, Globe, Languages } from 'lucide-react';

const messages = [
    { input: '🎤 "Ich brauch Bremsklötze für nen Golf"', lang: 'DE · Slang', parsed: 'Bremsbelagsatz VA · VW Golf VII', icon: Mic, delay: 0.3, accent: 'from-blue-500/20 to-blue-600/10' },
    { input: '💬 "brake pads audi a4 2019"', lang: 'EN', parsed: 'Bremsbelagsatz · Audi A4 B9', icon: MessageSquare, delay: 0.7, accent: 'from-violet-500/20 to-violet-600/10' },
    { input: '🎤 "Fren balatası Mercedes C serisi"', lang: 'TR', parsed: 'Bremsbelagsatz · Mercedes C-Klasse', icon: Mic, delay: 1.1, accent: 'from-amber-500/20 to-amber-600/10' },
    { input: '💬 "тормозные колодки бмв 3"', lang: 'RU', parsed: 'Bremsbelagsatz · BMW 3er', icon: MessageSquare, delay: 1.5, accent: 'from-emerald-500/20 to-emerald-600/10' },
];

export function MultiLanguageVisual() {
    return (
        <div className="relative w-full h-[280px] md:h-[320px] flex items-center justify-center">
            <div className="w-full max-w-sm space-y-2 md:space-y-3">
                {/* Header */}
                <motion.div
                    className="flex items-center justify-center gap-2 mb-2"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <Languages className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-bold text-white">Sprach-KI aktiv</span>
                </motion.div>

                {/* Message Cards */}
                {messages.map((msg, i) => (
                    <motion.div
                        key={i}
                        className={`glass border border-border/50 rounded-xl p-2.5 md:p-3 bg-gradient-to-r ${msg.accent}`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: msg.delay, duration: 0.4 }}
                    >
                        <div className="flex items-start gap-2">
                            <div className="h-6 w-6 rounded-md bg-slate-700/50 flex items-center justify-center shrink-0 mt-0.5">
                                <msg.icon className="h-3 w-3 text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-[9px] md:text-[10px] text-muted-foreground truncate">{msg.input}</span>
                                    <span className="text-[8px] bg-slate-700/60 text-muted-foreground px-1.5 py-0.5 rounded font-mono shrink-0">{msg.lang}</span>
                                </div>
                                <motion.div
                                    className="flex items-center gap-1.5"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: msg.delay + 0.5 }}
                                >
                                    <span className="text-[9px] md:text-[10px] text-emerald-400 font-medium">→ {msg.parsed}</span>
                                </motion.div>
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: msg.delay + 0.7, type: 'spring' }}
                            >
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            </motion.div>
                        </div>
                    </motion.div>
                ))}

                {/* Bottom Badge */}
                <motion.div
                    className="flex items-center justify-center gap-2 pt-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.5 }}
                >
                    <Globe className="h-3 w-3 text-violet-400" />
                    <span className="text-xs text-violet-400 font-medium">6+ Sprachen • Slang • Sprachnachrichten</span>
                </motion.div>
            </div>
        </div>
    );
}
