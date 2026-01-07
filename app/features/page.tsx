import { Metadata } from 'next';
import { featureData } from '@/lib/feature-data';
import Link from 'next/link';
import { Bot, Zap, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Features - Partsunion',
    description: 'Entdecken Sie die leistungsstarken Funktionen von Partsunion: Autoteile-Bot, OCR-Scanner und Warenwirtschaft.',
};

export default function FeaturesPage() {
    return (
        <div className="pt-20">
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Mächtige Werkzeuge für Ihren Erfolg</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Von der KI-gesteuerten Teileidentifikation bis zur vollautomatischen Lagerverwaltung.
                    </p>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featureData.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <Link
                                    key={feature.slug}
                                    href={`/features/${feature.slug}`}
                                    className="group p-6 border rounded-xl bg-background shadow-sm hover:shadow-md transition-all hover:border-primary/50 block"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                                    <p className="text-muted-foreground mb-4 line-clamp-2">{feature.description}</p>
                                    <span className="text-sm font-medium text-primary flex items-center">
                                        Details ansehen
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-background border-t border-border">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Fehlt Ihnen noch etwas?</h2>
                    <p className="text-muted-foreground mb-8">
                        Wir entwickeln Partsunion ständig weiter. Sprechen Sie mit uns über Ihre Anforderungen.
                    </p>
                </div>
            </section>
        </div>
    );
}
