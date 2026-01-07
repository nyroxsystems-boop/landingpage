'use client';

import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const tiers = [
    {
        name: 'Starter',
        price: '0€',
        description: 'Für kleine Werkstätten und Einsteiger.',
        features: ['Bis zu 500 Artikel', 'Basis Bot-Funktionen', '1 Benutzer', 'Community Support'],
        cta: 'Kostenlos starten',
        variant: 'outline',
    },
    {
        name: 'Professional',
        price: '49€',
        description: 'Für wachsende Teilehändler.',
        features: ['Unbegrenzte Artikel', 'Erweiterte Bot-AI', 'Bis zu 5 Benutzer', 'Priorisierter Support', 'Marktplatz-Anbindung'],
        cta: 'Jetzt upgraden',
        popular: true,
        variant: 'primary',
    },
    {
        name: 'Enterprise',
        price: 'Individuell',
        description: 'Für Großhändler und Filialisten.',
        features: ['Alles in Professional', 'Custom AI-Training', 'API-Zugriff', 'Deydicated Success Manager', 'SLA'],
        cta: 'Kontakt aufnehmen',
        variant: 'outline',
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Einfaches Pricing</h2>
                    <p className="text-muted-foreground text-lg">
                        Starten Sie kostenlos und wachsen Sie mit uns.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={cn(
                                'relative p-8 rounded-2xl border bg-background flex flex-col',
                                tier.popular ? 'border-primary shadow-lg ring-1 ring-primary' : 'border-border'
                            )}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                                    Beliebt
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                <div className="text-3xl font-bold mb-2">
                                    {tier.price} <span className="text-base font-normal text-muted-foreground">/ Monat</span>
                                </div>
                                <p className="text-muted-foreground text-sm">{tier.description}</p>
                            </div>

                            <ul className="flex-1 space-y-4 mb-8">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start text-sm">
                                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button variant={tier.variant === 'primary' ? 'primary' : 'outline'} className="w-full">
                                {tier.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
