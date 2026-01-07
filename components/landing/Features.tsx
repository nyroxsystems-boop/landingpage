'use client';

import { motion } from 'framer-motion';
import { Bot, Package, Cloud } from 'lucide-react';

const features = [
    {
        icon: Bot,
        title: 'Autoteile Bot',
        description: 'Automatische Identifikation von Ersatzteilen, Preisvergleich und Bestellvorschläge basierend auf KI-Analyse.',
    },
    {
        icon: Package,
        title: 'Warenwirtschaft',
        description: 'Vollständige Kontrolle über Lagerbestände, Bestellungen und Lieferantenmanagement in einem zentralen System.',
    },
    {
        icon: Cloud,
        title: 'SaaS Cloud',
        description: 'Greifen Sie von überall auf Ihre Unternehmensdaten zu. Sicher, skalierbar und immer verfügbar.',
    },
];

export function Features() {
    return (
        <section id="features" className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Alles was Sie brauchen</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Partsunion vereint modernste Technologie mit jahrelanger Branchenerfahrung.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors shadow-sm"
                        >
                            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
