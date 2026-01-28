'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import {
    Send,
    Phone,
    Mail,
    Building2,
    User,
    MessageSquare,
    CheckCircle2,
    ArrowRight,
    Calendar
} from 'lucide-react';

export function ConsultationForm() {
    const [formState, setFormState] = useState({
        firma: '',
        ansprechpartner: '',
        telefon: '',
        email: '',
        nachricht: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section id="beratung" className="py-24 md:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left Column - Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block py-1.5 px-4 rounded-full glass text-sm font-medium text-primary mb-4">
                                Unverbindliche Beratung
                            </span>

                            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                                Preis auf <span className="text-gradient">Anfrage</span>
                            </h2>

                            <p className="text-lg text-muted-foreground mb-8">
                                Jeder Teilehandel ist anders. Deshalb erstellen wir Ihnen ein individuelles Angebot,
                                das genau auf Ihre Anforderungen und Ihr Volumen zugeschnitten ist.
                            </p>

                            {/* Benefits List */}
                            <div className="space-y-4 mb-8">
                                {[
                                    'Kostenlose Erstberatung ohne Verpflichtung',
                                    'Individuelle Lösung für Ihren Betrieb',
                                    'Transparente Preisgestaltung',
                                    'Demo mit Ihren echten Daten möglich'
                                ].map((benefit, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="h-4 w-4 text-success" />
                                        </div>
                                        <span className="text-foreground">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Contact Info */}
                            <div className="p-6 rounded-xl glass border border-border/50">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    So geht's weiter
                                </h4>
                                <div className="space-y-3 text-sm text-muted-foreground">
                                    <div className="flex items-start gap-3">
                                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">1</div>
                                        <span>Sie füllen das Formular aus</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">2</div>
                                        <span>Wir melden uns innerhalb von 24 Stunden</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">3</div>
                                        <span>Gemeinsamer Termin für Live-Demo</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="p-8 md:p-10 rounded-2xl glass border border-border/50 shadow-xl">
                                {isSubmitted ? (
                                    <div className="text-center py-12">
                                        <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="h-8 w-8 text-success" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">Vielen Dank!</h3>
                                        <p className="text-muted-foreground mb-6">
                                            Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
                                        </p>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setIsSubmitted(false);
                                                setFormState({
                                                    firma: '',
                                                    ansprechpartner: '',
                                                    telefon: '',
                                                    email: '',
                                                    nachricht: ''
                                                });
                                            }}
                                        >
                                            Neue Anfrage
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-xl font-bold mb-6">
                                            Beratungstermin vereinbaren
                                        </h3>

                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            {/* Firma */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium flex items-center gap-2">
                                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                                    Firma *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firma"
                                                    value={formState.firma}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Autoteile Müller GmbH"
                                                    className="flex h-12 w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                />
                                            </div>

                                            {/* Ansprechpartner */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    Ansprechpartner *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="ansprechpartner"
                                                    value={formState.ansprechpartner}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Max Mustermann"
                                                    className="flex h-12 w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                />
                                            </div>

                                            {/* Telefon & Email Grid */}
                                            <div className="grid sm:grid-cols-2 gap-5">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium flex items-center gap-2">
                                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                                        Telefon *
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="telefon"
                                                        value={formState.telefon}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="+49 123 456789"
                                                        className="flex h-12 w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium flex items-center gap-2">
                                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                                        E-Mail *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formState.email}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="max@firma.de"
                                                        className="flex h-12 w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                    />
                                                </div>
                                            </div>

                                            {/* Nachricht */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium flex items-center gap-2">
                                                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                                    Nachricht (optional)
                                                </label>
                                                <textarea
                                                    name="nachricht"
                                                    value={formState.nachricht}
                                                    onChange={handleChange}
                                                    rows={4}
                                                    placeholder="Erzählen Sie uns kurz über Ihren Betrieb und Ihre Anforderungen..."
                                                    className="flex w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                                />
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                size="lg"
                                                className="w-full h-14 text-lg gradient-primary shadow-lg shadow-primary/25 group"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                                        Wird gesendet...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="mr-2 h-5 w-5" />
                                                        Beratung anfragen
                                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </Button>

                                            <p className="text-xs text-center text-muted-foreground">
                                                Mit dem Absenden erklären Sie sich mit unserer{' '}
                                                <a href="/legal/datenschutz" className="text-primary hover:underline">
                                                    Datenschutzerklärung
                                                </a>{' '}
                                                einverstanden.
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
