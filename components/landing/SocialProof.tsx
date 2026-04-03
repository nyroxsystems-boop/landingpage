'use client';

import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, Users, Clock, ShieldCheck } from 'lucide-react';

const stats = [
    {
        value: '89%',
        label: 'Automatisierungsgrad',
        description: 'aller Anfragen vollautomatisch verarbeitet',
        icon: TrendingUp,
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10',
    },
    {
        value: '8 Sek',
        label: 'Antwortzeit',
        description: 'statt 15 Minuten manueller Bearbeitung',
        icon: Clock,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
    },
    {
        value: '97,8%',
        label: 'OEM-Trefferquote',
        description: 'durch KI-gestützte Kreuzvalidierung',
        icon: ShieldCheck,
        color: 'text-violet-400',
        bgColor: 'bg-violet-500/10',
    },
    {
        value: '3,2%',
        label: 'Retourenquote',
        description: 'statt branchenüblicher 20%',
        icon: Users,
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/10',
    },
];

const testimonials = [
    {
        quote: 'Seit wir Partsunion nutzen, bearbeiten wir 3x so viele Anfragen — ohne einen einzigen neuen Mitarbeiter. Die KI erkennt Fahrzeugscheine schneller als jeder Azubi.',
        author: 'Marco F.',
        role: 'Geschäftsführer',
        company: 'AutoTeile Süd GmbH',
        highlight: '3x mehr Anfragen',
    },
    {
        quote: 'Unsere Retourenquote ist von 22% auf unter 4% gefallen. Das allein hat uns im letzten Quartal über 15.000 € gespart. Die OEM-Erkennung ist unglaublich präzise.',
        author: 'Sabine K.',
        role: 'Leiterin Einkauf',
        company: 'KFZ-Parts Express',
        highlight: 'Retouren -82%',
    },
    {
        quote: 'Der WhatsApp-Bot hat unser Wochenend-Geschäft komplett verändert. Samstags und sonntags kommen jetzt Bestellungen rein, die wir vorher einfach verloren hätten.',
        author: 'Thomas R.',
        role: 'Inhaber',
        company: 'Werkstatt & Teile Rhein-Main',
        highlight: '+40% Wochenend-Umsatz',
    },
];

export function SocialProof() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[150px] rounded-full -z-10" />

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
                            Ergebnisse, die überzeugen
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                            Was Händler mit Partsunion <span className="text-gradient">erreichen</span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Echte Ergebnisse von Autoteilehändlern, die ihren Betrieb mit Partsunion transformiert haben.
                        </p>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center p-6 md:p-8 rounded-2xl glass border border-border/50 hover:border-primary/20 transition-all card-hover"
                        >
                            <div className={`h-12 w-12 rounded-xl ${stat.bgColor} flex items-center justify-center mx-auto mb-4`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div className={`text-3xl md:text-4xl font-bold mb-1 ${stat.color}`} style={{ fontFamily: 'var(--font-display)' }}>
                                {stat.value}
                            </div>
                            <div className="text-sm font-semibold text-foreground mb-1">{stat.label}</div>
                            <div className="text-xs text-muted-foreground">{stat.description}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="h-full p-6 lg:p-8 rounded-2xl glass border border-border/50 hover:border-primary/20 transition-all card-hover flex flex-col">
                                {/* Highlight Badge */}
                                <div className="inline-flex self-start items-center gap-1.5 py-1 px-3 rounded-full bg-primary/10 border border-primary/20 mb-5">
                                    <TrendingUp className="h-3 w-3 text-primary" />
                                    <span className="text-xs font-semibold text-primary">{testimonial.highlight}</span>
                                </div>

                                {/* Quote */}
                                <div className="relative flex-1 mb-6">
                                    <Quote className="absolute -top-1 -left-1 h-8 w-8 text-primary/10" />
                                    <p className="text-muted-foreground leading-relaxed pl-4 text-sm md:text-base">
                                        {testimonial.quote}
                                    </p>
                                </div>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-5 border-t border-border/50">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-sm font-bold text-foreground">
                                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-foreground">{testimonial.author}</div>
                                        <div className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                                    </div>
                                    <div className="ml-auto flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
