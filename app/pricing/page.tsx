import { Metadata } from 'next';
import { Pricing } from '@/components/landing/Pricing'; // Reusing the visual component
import { Check, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Preise - Partsunion',
    description: 'Transparentes Pricing für jede Unternehmensgröße. Starten Sie kostenlos.',
};

const faqs = [
    {
        q: "Kann ich jederzeit kündigen?",
        a: "Ja, Sie können Ihr Abonnement monatlich kündigen. Es gibt keine versteckten Langzeitverträge im Standard-Tarif."
    },
    {
        q: "Brauche ich technisches Vorwissen?",
        a: "Nein. Partsunion ist so konzipiert, dass Sie ohne IT-Kenntnisse sofort starten können. Unser Onboarding-Team hilft Ihnen bei der Einrichtung."
    },
    {
        q: "Wie funktioniert die Credits-Abrechnung?",
        a: "Für Bot-Anfragen nutzen wir ein Credit-System. Jede erfolgreiche Teile-Identifikation kostet einen Credit. Im 'Professional'-Tarif haben Sie eine Flatrate."
    },
    {
        q: "Kann ich InvenTree weiter nutzen?",
        a: "Absolut. Partsunion baut auf InvenTree auf. Wir migrieren Ihre bestehenden Daten nahtlos."
    }
];

export default function PricingPage() {
    return (
        <div className="pt-20">
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Investieren Sie in Wachstum</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Wählen Sie den Plan, der zu Ihren Zielen passt.
                    </p>
                </div>
            </section>

            {/* Main Pricing Tables */}
            <Pricing />

            {/* Feature Comparison Table */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-bold mb-12 text-center">Feature Vergleich</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="py-4 px-6 font-medium text-muted-foreground w-1/3">Feature</th>
                                    <th className="py-4 px-6 font-bold text-center w-1/5">Starter</th>
                                    <th className="py-4 px-6 font-bold text-center w-1/5 text-primary">Professional</th>
                                    <th className="py-4 px-6 font-bold text-center w-1/5">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <td className="py-4 px-6 font-medium">Artikelanzahl</td>
                                    <td className="py-4 px-6 text-center">Bis 500</td>
                                    <td className="py-4 px-6 text-center font-bold">Unbegrenzt</td>
                                    <td className="py-4 px-6 text-center">Unbegrenzt</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-6 font-medium">Benutzer</td>
                                    <td className="py-4 px-6 text-center">1</td>
                                    <td className="py-4 px-6 text-center">5</td>
                                    <td className="py-4 px-6 text-center">Unbegrenzt</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-6 font-medium">OCR Fahrzeugschein-Scan</td>
                                    <td className="py-4 px-6 text-center">50 / Monat</td>
                                    <td className="py-4 px-6 text-center font-bold">Flatrate</td>
                                    <td className="py-4 px-6 text-center">Flatrate</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-6 font-medium">WhatsApp Bot Integration</td>
                                    <td className="py-4 px-6 text-center"><Check className="mx-auto h-5 w-5 text-muted-foreground" /></td>
                                    <td className="py-4 px-6 text-center"><Check className="mx-auto h-5 w-5 text-primary" /></td>
                                    <td className="py-4 px-6 text-center"><Check className="mx-auto h-5 w-5 text-primary" /></td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-6 font-medium">API Zugriff</td>
                                    <td className="py-4 px-6 text-center">-</td>
                                    <td className="py-4 px-6 text-center">-</td>
                                    <td className="py-4 px-6 text-center"><Check className="mx-auto h-5 w-5 text-primary" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-muted/50">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-12 text-center">Häufig gestellte Fragen</h2>
                    <div className="grid gap-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-background p-6 rounded-xl border border-border">
                                <h3 className="text-lg font-bold mb-2 flex items-start gap-2">
                                    <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
                                    {faq.q}
                                </h3>
                                <p className="text-muted-foreground pl-7">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
