'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

import { DashboardPreview } from '@/components/landing/DashboardPreview';

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-background via-accent/5 to-background">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10" />

            <div className="container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                        Neu: KI-Fahrzeugschein-Erkennung
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
                        Ihre Werkstatt auf <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">Autopilot</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Der erste KI-Mitarbeiter, der Fahrzeugscheine liest, HSN/TSN automatisch abgleicht und Bestellungen ohne Tippfehler anlegt.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="w-full sm:w-auto h-12 text-lg shadow-lg shadow-primary/25 group">
                            Jetzt Transformieren
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 text-lg">
                            Live Demo ansehen
                        </Button>
                    </div>
                </motion.div>

                {/* Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-16 sm:mt-24 relative mx-auto"
                >
                    <DashboardPreview />
                    {/* Grid overlay for tech feel */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
                </motion.div>
            </div>
        </section>
    );
}
