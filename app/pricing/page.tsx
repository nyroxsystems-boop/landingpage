import { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Preise',
    description:
        'Partsunion-Preismodell: individuell auf Anfrage. Wir erstellen Ihnen ein transparentes Angebot nach Volumen und Anforderungen — mit unverbindlicher Beratung.',
    alternates: {
        canonical: 'https://www.partsunion.de/pricing',
    },
    openGraph: {
        title: 'Preise | Partsunion',
        description:
            'Individuelles Preismodell für Ihren Teilehandel. Unverbindliches Angebot nach Volumen und Anforderungen.',
        url: 'https://www.partsunion.de/pricing',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Partsunion Preise' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Preise | Partsunion',
        description: 'Individuelles Preismodell nach Anfrage.',
        images: ['/og-image.png'],
    },
};

const faqs = [
    {
        q: 'Warum gibt es keine feste Preisliste?',
        a: 'Jeder Teilehandel ist anders — Anzahl der Anfragen, Anbindung von Marktplätzen und Lieferanten, Größe des Teams. Wir kalibrieren die Lösung auf Ihr Volumen statt Sie in einen Standard-Tarif zu zwingen.',
    },
    {
        q: 'Wie läuft die Beratung ab?',
        a: 'Sie füllen das Formular aus, wir melden uns innerhalb von 24 Stunden. In einem 30-minütigen Call klären wir Ihre Anforderungen, zeigen eine Live-Demo mit Ihren echten Fahrzeugdaten und erstellen ein individuelles Angebot.',
    },
    {
        q: 'Welche Vertragslaufzeit habt ihr?',
        a: 'Monatlich kündbar nach einer Mindestvertragslaufzeit, die wir im Angebot transparent machen. Enterprise-Kunden erhalten auf Wunsch einen Jahresvertrag mit Mengenrabatt.',
    },
    {
        q: 'Brauche ich technisches Vorwissen?',
        a: 'Nein. Partsunion ist so konzipiert, dass Sie ohne IT-Kenntnisse sofort starten können. Unser Onboarding-Team übernimmt die Einrichtung und Datenmigration.',
    },
];

const inclusions = [
    'OEM-Ermittlung via VIN, HSN/TSN oder Fahrzeugbrief-Foto',
    '24/7 WhatsApp-Bot mit automatischer Angebotserstellung',
    'Integrierte Warenwirtschaft mit Multi-Channel-Sync',
    'Automatische Rechnungserstellung mit DATEV-Schnittstelle',
    'Retourenmanagement mit QR-Codes',
    'Lieferanten-Anbindung (WM SE, Stahlgruber, u.v.m.)',
    'Made-in-Germany-Hosting, DSGVO-konform',
    'Persönlicher Onboarding- und Success-Kontakt',
];

export default function PricingPage() {
    return (
        <>
            {/* FAQ-Schema für Rich-Results */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: faqs.map(f => ({
                            '@type': 'Question',
                            name: f.q,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: f.a,
                            },
                        })),
                    }),
                }}
            />

            <div className="pt-20">
                {/* Hero */}
                <section className="py-20 md:py-28 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 blur-[150px] rounded-full -z-10" />

                    <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full glass text-sm font-medium text-primary mb-6">
                            <Sparkles className="h-3.5 w-3.5" />
                            Preismodell
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                            Preis auf <span className="text-gradient">Anfrage</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-10">
                            Jeder Teilehandel ist anders. Deshalb erstellen wir Ihnen ein individuelles Angebot,
                            das zu Ihrem Volumen und Ihren Anforderungen passt — transparent und fair.
                        </p>
                        <Link
                            href="/#beratung"
                            className="inline-flex items-center gap-2 h-14 px-8 text-lg font-semibold gradient-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
                        >
                            Kostenloses Angebot anfragen
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </section>

                {/* Was immer enthalten ist */}
                <section className="py-16 md:py-24 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />
                    <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                                Im Preis immer enthalten
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                Unabhängig von Ihrem Volumen gehören diese Funktionen zum Partsunion-Setup.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {inclusions.map(item => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3 p-4 rounded-xl glass border border-border/50"
                                >
                                    <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 className="h-4 w-4 text-success" />
                                    </div>
                                    <span className="text-foreground/90">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16 md:py-24 bg-muted/30">
                    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                        <h2 className="text-3xl font-bold mb-12 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                            Häufig gestellte Fragen
                        </h2>
                        <div className="grid gap-4">
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

                        <div className="text-center mt-12">
                            <Link
                                href="/#beratung"
                                className="inline-flex items-center gap-2 h-12 px-6 text-base font-medium gradient-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
                            >
                                Beratungstermin vereinbaren
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
