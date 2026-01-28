import { Metadata } from 'next';
import { featureData, getValuePropositions, getCoreFeatures } from '@/lib/feature-data';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Features - Partsunion',
    description: 'Entdecken Sie die leistungsstarken KI-Funktionen von Partsunion: WhatsApp-Bot, OEM-Ermittlung und intelligente Warenwirtschaft.',
};

export default function FeaturesPage() {
    const valueProps = getValuePropositions();
    const coreFeatures = getCoreFeatures();

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 blur-[150px] rounded-full -z-10" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="inline-block py-1.5 px-4 rounded-full glass text-sm font-medium text-primary mb-4">
                        Features & Vorteile
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                        Mächtige Werkzeuge für Ihren <span className="text-gradient">Erfolg</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Von der KI-gesteuerten Teileidentifikation bis zur vollautomatischen Angebotserstellung.
                    </p>
                </div>
            </section>

            {/* Value Propositions Section */}
            <section className="py-16 md:py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                            Ihre Vorteile
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {valueProps.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <Link
                                    key={feature.slug}
                                    href={`/features/${feature.slug}`}
                                    className="group p-6 border border-border/50 rounded-xl glass shadow-sm hover:shadow-lg transition-all hover:border-primary/30 block card-hover"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-accent/10 rounded-lg text-accent group-hover:scale-110 transition-transform">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm line-clamp-2">
                                        {feature.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Core Features Section */}
            <section className="py-16 md:py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background" />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Zap className="h-5 w-5" />
                        </div>
                        <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                            Core Features
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coreFeatures.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <Link
                                    key={feature.slug}
                                    href={`/features/${feature.slug}`}
                                    className="group p-6 border border-border/50 rounded-xl glass shadow-sm hover:shadow-lg transition-all hover:border-primary/30 block card-hover"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm line-clamp-2">
                                        {feature.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 border-t border-border relative">
                <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/10" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                        Fehlt Ihnen noch etwas?
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                        Wir entwickeln Partsunion ständig weiter. Sprechen Sie mit uns über Ihre individuellen Anforderungen.
                    </p>
                    <Link
                        href="/#beratung"
                        className="inline-flex items-center gap-2 h-12 px-6 text-base font-medium gradient-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
                    >
                        Beratungstermin buchen
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
