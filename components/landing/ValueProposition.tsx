'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    TrendingUp,
    Clock,
    Zap,
    ShieldCheck,
    Globe,
    Users,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const valueProps = [
    {
        slug: 'skalierbarkeit',
        icon: TrendingUp,
        title: 'Skalierbarkeit ohne Kostenexplosion',
        headline: 'Wachsen Sie ohne Grenzen',
        description: 'Zuverlässig auch bei hohen Anfragen. Gleichbleibende Performance 365 Tage im Jahr.',
        highlights: [
            'Keine Krankheits- oder Urlaubsausfälle',
            'Keine neuen Mitarbeiter oder Bürokosten',
            'Konstante Qualität bei jeder Anfrage'
        ],
        color: 'from-emerald-500 to-teal-500',
        bgColor: 'bg-emerald-500/10',
        iconColor: 'text-emerald-500'
    },
    {
        slug: '24-7-einsatzbereit',
        icon: Clock,
        title: '24/7 Einsatzbereit',
        headline: 'Immer für Ihre Kunden da',
        description: 'Umsatz und Einsatz auch außerhalb der Öffnungszeiten. Verpassen Sie keinen Lead mehr.',
        highlights: [
            'Angebote um 3 Uhr nachts',
            'Wochenend-Anfragen automatisch bearbeitet',
            'Internationaler Kundenservice'
        ],
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-500/10',
        iconColor: 'text-blue-500'
    },
    {
        slug: 'geschwindigkeit',
        icon: Zap,
        title: 'Sekunden statt Minuten',
        headline: 'Blitzschnelle Angebotserstellung',
        description: 'Erstellt pro Anfrage 3 Angebote aus verschiedenen Preisgruppen. Parallele Verarbeitung beliebig vieler Anfragen.',
        highlights: [
            'Kürzere Antwortzeiten = Höhere Abschlussquote',
            'Keine Nacharbeit wegen Fehlangeboten',
            'Mehr Umsatz durch mehr Kapazität'
        ],
        color: 'from-amber-500 to-orange-500',
        bgColor: 'bg-amber-500/10',
        iconColor: 'text-amber-500'
    },
    {
        slug: 'sinkende-retouren',
        icon: ShieldCheck,
        title: 'Sinkende Retourenquote',
        headline: 'Das richtige Teil beim ersten Mal',
        description: 'Automatische Angebotserstellung mit präziser Fahrzeugerkennung. Kein menschliches Versagen mehr.',
        highlights: [
            'KI-gestützte OEM-Ermittlung',
            'Drastische Reduzierung der Retouren',
            'Weniger Reklamationen, mehr Marge'
        ],
        color: 'from-violet-500 to-purple-500',
        bgColor: 'bg-violet-500/10',
        iconColor: 'text-violet-500'
    },
    {
        slug: 'sprachuebergreifend',
        icon: Globe,
        title: 'Sprachübergreifend nutzbar',
        headline: 'Versteht jeden Kunden',
        description: 'Automatische Spracherkennung. Versteht Sprachnachrichten und Mechaniker-Slang.',
        highlights: [
            'Multilingual ohne Zusatzkosten',
            '"Bremsklötze" = "Bremsbelagsatz"',
            'Audio-Nachrichten werden transkribiert'
        ],
        color: 'from-pink-500 to-rose-500',
        bgColor: 'bg-pink-500/10',
        iconColor: 'text-pink-500'
    },
    {
        slug: 'team-entlastung',
        icon: Users,
        title: 'Entlastung des Teams',
        headline: 'Fokus auf das Wesentliche',
        description: 'Wegfall gleichbleibender Routine. Fokus auf Beratung, Vertrieb und Kundenbindung.',
        highlights: [
            'Kein Stress bei hohen Anfragen',
            'Einfache Einarbeitung neuer Mitarbeiter',
            'Mehr Zeit für persönliche Beratung'
        ],
        color: 'from-cyan-500 to-blue-500',
        bgColor: 'bg-cyan-500/10',
        iconColor: 'text-cyan-500'
    }
];

export function ValueProposition() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block py-1.5 px-4 rounded-full glass text-sm font-medium text-primary mb-4">
                            Warum Partsunion?
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                            Die Vorteile auf <span className="text-gradient">einen Blick</span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Überzeugen Sie sich selbst, warum führende Autoteilehändler auf unsere KI-Lösung setzen.
                        </p>
                    </motion.div>
                </div>

                {/* Value Props Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {valueProps.map((prop, index) => (
                        <motion.div
                            key={prop.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href={`/features/${prop.slug}`}
                                className="group block h-full"
                            >
                                <div className="h-full p-6 lg:p-8 rounded-2xl glass card-hover border border-border/50 hover:border-primary/30">
                                    {/* Icon */}
                                    <div className={cn(
                                        "h-14 w-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                                        prop.bgColor
                                    )}>
                                        <prop.icon className={cn("h-7 w-7", prop.iconColor)} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {prop.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-6 line-clamp-2">
                                        {prop.description}
                                    </p>

                                    {/* Highlights */}
                                    <ul className="space-y-2 mb-6">
                                        {prop.highlights.slice(0, 2).map((highlight, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm">
                                                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                                                <span className="text-muted-foreground">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <div className="flex items-center text-sm font-medium text-primary">
                                        <span>Mehr erfahren</span>
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export { valueProps };
