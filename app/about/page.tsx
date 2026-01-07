import { Metadata } from 'next';
import { Target, Users, History } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Über Uns - Partsunion',
    description: 'Unsere Mission: Den Autoteilehandel digitalisieren und Werkstätten stärken.',
};

export default function AboutPage() {
    return (
        <div className="pt-20">
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Unsere Mission</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Wir bauen das Betriebssystem für den modernen Autoteilehandel.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="prose prose-lg dark:prose-invert mx-auto mb-16">
                        <p>
                            Partsunion entstand aus der Praxis. Wir haben gesehen, wie Autoteilehändler und Werkstätten in einer Flut von manueller Arbeit, fehlerhaften Bestellungen und veralteter Software ertrinken.
                        </p>
                        <p>
                            Unsere Antwort darauf ist eine radikale Digitalisierung der Kernprozesse. Wir glauben, dass künstliche Intelligenz nicht nur ein Buzzword ist, sondern das Werkzeug, das den Teilehandel rettet.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                                <Target size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Fokus</h3>
                            <p className="text-muted-foreground">100% Konzentration auf den Automotive Aftermarket. Wir verstehen Ihre Teile.</p>
                        </div>
                        <div className="p-6">
                            <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Team</h3>
                            <p className="text-muted-foreground">Ein Mix aus erfahrenen Mechatronikern und Senior Software Engineers.</p>
                        </div>
                        <div className="p-6">
                            <div className="h-16 w-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600">
                                <History size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Zukunft</h3>
                            <p className="text-muted-foreground">Wir entwickeln Partsunion ständig weiter. Nächster Stop: Predictive Maintenance.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
