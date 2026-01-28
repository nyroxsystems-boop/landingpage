'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, Zap, Clock } from 'lucide-react';
import { DashboardPreview } from '@/components/landing/DashboardPreview';

export function Hero() {
    return (
        <section className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
            {/* Premium Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />

            {/* Animated glow orbs */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full -z-10 animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 blur-[120px] rounded-full -z-10 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 grid-pattern opacity-50 -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full glass mb-8 border border-primary/20">
                            <Sparkles className="h-4 w-4 text-accent" />
                            <span className="text-sm font-medium text-foreground/90">
                                KI-Automatisierung für den Teilehandel
                            </span>
                        </div>

                        {/* Hero Headline */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]" style={{ fontFamily: 'var(--font-display)' }}>
                            Ihr Teilehandel auf{' '}
                            <span className="text-gradient">
                                Autopilot
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                            Der erste KI-Mitarbeiter, der Fahrzeugscheine liest, OEM-Nummern in Sekunden findet und Angebote automatisch erstellt.
                            <span className="text-foreground font-medium"> 24/7 verfügbar. Ohne Krankheit. Ohne Urlaub.</span>
                        </p>

                        {/* Stats Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10"
                        >
                            <div className="flex items-center gap-2 text-sm">
                                <div className="h-8 w-8 rounded-lg bg-success/20 flex items-center justify-center">
                                    <Zap className="h-4 w-4 text-success" />
                                </div>
                                <span className="text-muted-foreground">
                                    <strong className="text-foreground">3 Angebote</strong> pro Anfrage
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
                                    <Clock className="h-4 w-4 text-accent" />
                                </div>
                                <span className="text-muted-foreground">
                                    In <strong className="text-foreground">Sekunden</strong> statt Minuten
                                </span>
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Button
                                size="lg"
                                className="w-full sm:w-auto h-14 text-lg px-8 gradient-primary shadow-lg shadow-primary/25 group"
                            >
                                Beratungstermin buchen
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto h-14 text-lg px-8 glass border-border/50 hover:border-primary/50"
                            >
                                Live Demo ansehen
                            </Button>
                        </motion.div>

                        {/* Trust Indicator */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-8 text-sm text-muted-foreground"
                        >
                            Preis auf Anfrage • Unverbindliche Beratung • Für Autoteilehändler
                        </motion.p>
                    </motion.div>
                </div>

                {/* Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 sm:mt-24 relative mx-auto max-w-6xl"
                >
                    {/* Glow behind preview */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent blur-3xl -z-10" />

                    <div className="relative glass rounded-2xl p-2 shadow-2xl">
                        <DashboardPreview />
                    </div>

                    {/* Floating status badge */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="absolute -bottom-4 -right-4 md:bottom-8 md:right-8 glass p-4 rounded-xl shadow-xl hidden md:flex items-center gap-3"
                    >
                        <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                        <div>
                            <div className="font-semibold text-sm">System Status</div>
                            <div className="text-xs text-muted-foreground">365 Tage operativ</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
