import { Metadata } from 'next';
import { Mail, MapPin } from 'lucide-react';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
    title: 'Kontakt - Partsunion',
    description:
        'Sprechen Sie mit uns. Wir beraten Sie gerne zur Digitalisierung Ihres Teilehandels.',
    alternates: {
        canonical: 'https://www.partsunion.de/contact',
    },
    openGraph: {
        title: 'Kontakt | Partsunion',
        description:
            'Sprechen Sie mit uns. Wir beraten Sie gerne zur Digitalisierung Ihres Teilehandels.',
        url: 'https://www.partsunion.de/contact',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Partsunion Kontakt' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kontakt | Partsunion',
        description: 'Sprechen Sie mit uns zur Digitalisierung Ihres Teilehandels.',
        images: ['/og-image.png'],
    },
};

export default function ContactPage() {
    return (
        <div className="pt-20">
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Kontakt aufnehmen</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Egal ob Frage zum Produkt oder Support-Anfrage - wir sind für Sie da.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Schreiben Sie uns</h2>
                            <ContactForm />
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-2xl font-bold mb-6">Direkter Kontakt</h2>

                            <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-bold">E-Mail</h3>
                                    <p className="text-muted-foreground">info@partsunion.de</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-bold">Sitz</h3>
                                    <p className="text-muted-foreground">
                                        Partsunion UG (haftungsbeschränkt)<br />
                                        Zum Sommersberg 27<br />
                                        50321 Brühl
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                                <h4 className="font-bold mb-2 text-primary">Support benötigt?</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Als Kunde finden Sie schnelle Hilfe in unserem Support-Center oder
                                    direkt im Dashboard.
                                </p>
                                <a
                                    href="https://app.partsunion.de"
                                    className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-lg border border-input bg-transparent hover:bg-accent hover:text-accent-foreground transition-colors"
                                >
                                    Zum Support-Center
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
