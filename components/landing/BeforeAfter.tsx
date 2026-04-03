'use client';

import { motion } from 'framer-motion';
import { X, Check, ArrowRight, Clock, AlertTriangle, TrendingDown, Zap, ShieldCheck, TrendingUp } from 'lucide-react';

const comparisons = [
    {
        category: 'Anfragebearbeitung',
        before: { value: '15 Min', detail: 'Manuelles Abtippen pro Anfrage' },
        after: { value: '8 Sek', detail: 'Automatische KI-Verarbeitung' },
    },
    {
        category: 'Retourenquote',
        before: { value: '20%', detail: 'Falsche Teile durch Tippfehler' },
        after: { value: '3,2%', detail: 'KI-validierte OEM-Zuordnung' },
    },
    {
        category: 'Verfügbarkeit',
        before: { value: '8h/Tag', detail: 'Nur während Öffnungszeiten' },
        after: { value: '24/7', detail: 'WhatsApp-Bot antwortet immer' },
    },
    {
        category: 'Angebote pro Tag',
        before: { value: '~30', detail: 'Begrenzt durch Mitarbeiterkapazität' },
        after: { value: '500+', detail: 'Unbegrenzt skalierbar' },
    },
    {
        category: 'Bestandssync',
        before: { value: 'Manuell', detail: 'Fehleranfällig, zeitversetzt' },
        after: { value: 'Echtzeit', detail: 'Automatisch über alle Kanäle' },
    },
];

export function BeforeAfter() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
                            Der Unterschied
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                            Vorher vs. <span className="text-gradient">mit Partsunion</span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            So verändert sich Ihr Arbeitsalltag mit KI-Automatisierung.
                        </p>
                    </motion.div>
                </div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header Row */}
                    <div className="grid grid-cols-3 gap-4 mb-4 px-4">
                        <div />
                        <div className="text-center">
                            <div className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-error/10 border border-error/20">
                                <AlertTriangle className="h-3.5 w-3.5 text-error" />
                                <span className="text-sm font-semibold text-error">Ohne Partsunion</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-success/10 border border-success/20">
                                <Zap className="h-3.5 w-3.5 text-success" />
                                <span className="text-sm font-semibold text-success">Mit Partsunion</span>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Rows */}
                    <div className="space-y-3">
                        {comparisons.map((comp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="grid grid-cols-3 gap-3 md:gap-4 items-center p-4 md:p-5 rounded-xl glass border border-border/50 hover:border-primary/20 transition-all"
                            >
                                {/* Category */}
                                <div>
                                    <span className="text-sm md:text-base font-semibold text-foreground">{comp.category}</span>
                                </div>

                                {/* Before */}
                                <div className="text-center">
                                    <div className="text-lg md:text-2xl font-bold text-error/80 mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                                        {comp.before.value}
                                    </div>
                                    <div className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">
                                        {comp.before.detail}
                                    </div>
                                </div>

                                {/* After */}
                                <div className="text-center">
                                    <div className="text-lg md:text-2xl font-bold text-success mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                                        {comp.after.value}
                                    </div>
                                    <div className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">
                                        {comp.after.detail}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <p className="text-muted-foreground text-sm mb-6">
                            Berechnen Sie Ihr persönliches Einsparpotenzial in einem kostenlosen Beratungsgespräch.
                        </p>
                        <a
                            href="#beratung"
                            className="inline-flex items-center gap-2 py-3 px-8 rounded-full gradient-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group"
                        >
                            Einsparpotenzial berechnen
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
