import { Metadata } from 'next';
import { Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
    title: 'Kontakt - Partsunion',
    description:
        'Sprechen Sie mit uns. Wir beraten Sie gerne zur Digitalisierung Ihres Teilehandels.',
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
                                    <p className="text-muted-foreground">anfrage@partsunion.de</p>
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
                                <Button variant="outline" size="sm">
                                    Zum Support-Center
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
