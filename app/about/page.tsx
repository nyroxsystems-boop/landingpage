import { Metadata } from 'next';
import { Target, Users, History, Brain, Cpu, Sparkles, ArrowRight, Quote } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Über Uns - Partsunion',
    description: 'Unsere Mission: Den Autoteilehandel mit KI-Technologie revolutionieren. Ein Team aus Branchenexperten und Software-Entwicklern.',
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
                        Von Teilehändlern.<br />
                        <span className="text-gradient">Für Teilehändler.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Wir kennen die Branche aus erster Hand – und bauen die Software, die wir selbst gebraucht hätten.
                    </p>
                </div>
            </section>

            {/* Founder Story Section */}
            <section className="py-16 md:py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

                <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Story */}
                        <div>
                            <span className="inline-block py-1.5 px-4 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                                Die Gründungsgeschichte
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                                Entstanden aus der <span className="text-gradient">Praxis</span>
                            </h2>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    Die Idee zu Partsunion entstand aus echter Frustration. <strong className="text-foreground">Mitgründer Elias</strong> führte
                                    selbst einen erfolgreichen Teilehandel mit über <strong className="text-foreground">6.000 verkauften Teilen pro Monat</strong>.
                                </p>
                                <p>
                                    Er wusste aus täglicher Erfahrung: Die OEM-Suche ist komplex und fehleranfällig.
                                    Das richtige Teil zu identifizieren kostet Zeit – und falsch identifizierte Teile führen
                                    zu frustrierenden Retouren, die Marge und Kundenzufriedenheit kosten.
                                </p>
                                <p>
                                    Elias suchte nach einer Lösung, die er selbst nutzen würde. Als er keine fand,
                                    beschloss er, sie selbst zu bauen.
                                </p>
                            </div>
                        </div>

                        {/* Quote Card */}
                        <div className="relative">
                            <div className="glass p-8 rounded-2xl border border-border/50">
                                <Quote className="h-10 w-10 text-primary/30 mb-4" />
                                <blockquote className="text-xl font-medium text-foreground mb-6 leading-relaxed">
                                    „Ich habe jeden Tag gesehen, wie viel Zeit mein Team mit manueller OEM-Suche verschwendet
                                    und wie viele Retouren auf Identifikationsfehler zurückgehen. Das musste aufhören."
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        E
                                    </div>
                                    <div>
                                        <div className="font-bold text-foreground">Elias</div>
                                        <div className="text-sm text-muted-foreground">Mitgründer & Branchenexperte</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                            Unser Team
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Vier Leute. Eine Mission. Den Teilehandel revolutionieren.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Software Entwickler */}
                        <div className="glass p-8 rounded-2xl border border-border/50 card-hover">
                            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                                <Cpu size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-center">2 Software-Entwickler</h3>
                            <p className="text-muted-foreground text-center">
                                Bauen die KI-Engine, die Fahrzeugscheine liest, OEM-Nummern findet und
                                Angebote in Sekunden erstellt.
                            </p>
                        </div>

                        {/* Sales */}
                        <div className="glass p-8 rounded-2xl border border-border/50 card-hover">
                            <div className="h-16 w-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-center">2 Sales-Experten</h3>
                            <p className="text-muted-foreground text-center">
                                Verstehen die Branche, sprechen die Sprache der Händler und sorgen dafür,
                                dass Partsunion echte Probleme löst.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 p-6 glass rounded-xl border border-success/20 text-center">
                        <p className="text-lg font-medium text-foreground">
                            <span className="text-success">✓</span> Elias vertraut auf Partsunion – jeden Tag in seinem eigenen Teilehandel.
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
                            <h3 className="text-xl font-bold mb-3 text-center">Natural Language</h3>
                            <p className="text-muted-foreground text-center text-sm">
                                Versteht "Mechaniker-Slang", Sprachnachrichten und informelle Anfragen wie ein echter Kollege.
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
                            <h3 className="text-xl font-bold mb-3 text-center">OEM-Matching</h3>
                            <p className="text-muted-foreground text-center text-sm">
                                Proprietärer Algorithmus für präzises Teile-Matching gegen Millionen von Datensätzen.
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
                        Lassen Sie uns sprechen
                    </h2>
                    <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
                        Wir zeigen Ihnen in 15 Minuten, wie Partsunion Ihren Teilehandel transformieren kann.
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
