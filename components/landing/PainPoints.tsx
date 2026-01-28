'use client';

import { motion } from 'framer-motion';
import { XCircle, AlertTriangle, Clock, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const pains = [
    {
        icon: XCircle,
        title: 'Hohe Retourenquote',
        description: 'Jedes 5. Teil kommt zurück, weil Fahrzeugdaten manuell falsch übertragen wurden. Das kostet Marge und Nerven.',
        stat: '20%',
        statLabel: 'durchschn. Retouren'
    },
    {
        icon: Clock,
        title: 'Manuelles Abtippen',
        description: 'Ihre Mitarbeiter vertippen sich bei HSN/TSN und VIN. Wertvolle Arbeitszeit geht für stupide Dateneingabe drauf.',
        stat: '15 Min',
        statLabel: 'pro Anfrage'
    },
    {
        icon: AlertTriangle,
        title: 'Fehlende Synchronisation',
        description: 'Bestand auf eBay stimmt nicht mit dem Lager überein? Überverkäufe führen zu schlechten Bewertungen.',
        stat: '8%',
        statLabel: 'Überverkäufe'
    },
];

export function PainPoints() {
    return (
        <section className="py-20 md:py-28 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />

            {/* Subtle red glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-error/5 blur-[120px] rounded-full -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block py-1.5 px-4 rounded-full bg-error/10 border border-error/20 text-error text-sm font-medium mb-4">
                            Das Problem
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                            Warum der Teilehandel so <span className="text-error">stressig</span> ist
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Kennen Sie diese Probleme aus Ihrem täglichen Geschäft?
                        </p>
                    </motion.div>
                </div>

                {/* Pain Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {pains.map((pain, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="h-full p-6 lg:p-8 rounded-2xl glass border border-error/10 hover:border-error/30 transition-all card-hover">
                                {/* Icon */}
                                <div className="h-14 w-14 bg-error/10 rounded-xl flex items-center justify-center mb-6 text-error group-hover:scale-110 transition-transform">
                                    <pain.icon size={28} />
                                </div>

                                {/* Stat */}
                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-error">{pain.stat}</span>
                                    <span className="text-sm text-muted-foreground ml-2">{pain.statLabel}</span>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-3 text-foreground">{pain.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {pain.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Arrow down indicator */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-16"
                >
                    <div className="flex flex-col items-center text-muted-foreground">
                        <span className="text-sm mb-2">Die Lösung</span>
                        <ArrowDown className="h-5 w-5 animate-bounce" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
