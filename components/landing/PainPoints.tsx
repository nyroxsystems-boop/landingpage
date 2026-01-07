'use client';

import { motion } from 'framer-motion';
import { XCircle, AlertTriangle, Clock } from 'lucide-react';

const pains = [
    {
        icon: XCircle,
        title: 'Hohe Retourenquote',
        description: 'Jedes 5. Teil kommt zurück, weil Fahrzeugdaten manuell falsch übertragen wurden. Das kostet Marge und Nerven.',
    },
    {
        icon: Clock,
        title: 'Manuelles Abtippen',
        description: 'Ihre Mitarbeiter vertippen sich bei HSN/TSN und VIN. Wertvolle Arbeitszeit geht für stupide Dateneingabe drauf.',
    },
    {
        icon: AlertTriangle,
        title: 'Fehlende Synchronisation',
        description: 'Bestand auf eBay stimmt nicht mit dem Lager überein? Überverkäufe führen zu schlechten Bewertungen und Sperrungen.',
    },
];

export function PainPoints() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                        Warum der Teilehandel so <span className="text-red-500">stressig</span> ist
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Kennen Sie diese Probleme aus Ihrem täglichen Geschäft?
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {pains.map((pain, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10"
                        >
                            <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-6 text-red-600 dark:text-red-400">
                                <pain.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-foreground">{pain.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {pain.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
