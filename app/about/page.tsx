import { Metadata } from 'next';
import { Target, Users, History, Brain, Cpu, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Über Uns - Partsunion',
    description: 'Unsere Mission: Den Autoteilehandel mit KI-Technologie revolutionieren.',
};

export default function AboutPage() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 blur-[150px] rounded-full -z-10" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="inline-block py-1.5 px-4 rounded-full glass text-sm font-medium text-primary mb-4">
                        Über Partsunion
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                        Unsere <span className="text-gradient">Mission</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Wir bauen das intelligente Betriebssystem für den modernen Autoteilehandel.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="prose prose-lg dark:prose-invert mx-auto text-muted-foreground">
                        <p className="text-lg leading-relaxed">
                            Partsunion entstand aus der Praxis. Wir haben gesehen, wie Autoteilehändler in einer Flut
                            von manueller Arbeit, fehlerhaften Bestellungen und veralteter Software ertrinken.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Unsere Antwort darauf ist eine radikale Automatisierung der Kernprozesse. Wir glauben,
                            dass künstliche Intelligenz nicht nur ein Buzzword ist, sondern das Werkzeug, das den
                            Teilehandel transformiert.
                        </p>
                        <p className="text-lg leading-relaxed">
                            <strong className="text-foreground">Unsere Kunden sind Autoteilehändler</strong> - vom inhabergeführten
                            Betrieb bis zum Großhändler mit mehreren Standorten. Wir verstehen die Branche, weil wir
                            aus ihr kommen.
                        </p>
                    </div>
                </div>
            </section>

            {/* KI Intelligence Section */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
                            KI-Intelligenz
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                            Technologie, die den <span className="text-gradient">Unterschied</span> macht
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Unsere KI wurde speziell für den Automotive Aftermarket entwickelt und trainiert.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="p-8 rounded-2xl glass border border-border/50 card-hover">
                            <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-primary">
                                <Brain size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-center">Natural Language Understanding</h3>
                            <p className="text-muted-foreground text-center text-sm">
                                Unsere NLU-Engine versteht Mechaniker-Slang, Sprachnachrichten und informelle Anfragen.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl glass border border-border/50 card-hover">
                            <div className="h-14 w-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-accent">
                                <Cpu size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-center">Computer Vision</h3>
                            <p className="text-muted-foreground text-center text-sm">
                                OCR-Technologie für Fahrzeugscheine mit präziser Extraktion von HSN, TSN und VIN.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl glass border border-border/50 card-hover">
                            <div className="h-14 w-14 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-success">
                                <Sparkles size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-center">OEM-Matching Engine</h3>
                            <p className="text-muted-foreground text-center text-sm">
                                Proprietärer Algorithmus für präzises Teile-Matching gegen Millionen von Datensätzen.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                            Was uns antreibt
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                                <Target size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Fokus</h3>
                            <p className="text-muted-foreground">
                                100% Konzentration auf den Automotive Aftermarket. Wir verstehen Ihre Teile und Ihre Kunden.
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="h-16 w-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-success">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Team</h3>
                            <p className="text-muted-foreground">
                                Ein Mix aus erfahrenen KFZ-Experten und Senior Software Engineers.
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="h-16 w-16 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-warning">
                                <History size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Zukunft</h3>
                            <p className="text-muted-foreground">
                                Kontinuierliche Weiterentwicklung. Nächster Stop: Predictive Ordering und erweiterte KI.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 gradient-primary opacity-90" />
                <div className="absolute inset-0 grid-pattern opacity-10" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                        Bereit für die Transformation?
                    </h2>
                    <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
                        Lassen Sie uns in einem unverbindlichen Gespräch herausfinden, wie Partsunion Ihren Teilehandel automatisieren kann.
                    </p>
                    <Link
                        href="/#beratung"
                        className="inline-flex items-center gap-2 h-14 px-8 text-lg font-bold bg-white text-primary rounded-xl shadow-xl hover:bg-white/90 transition-colors"
                    >
                        Beratungstermin buchen
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
