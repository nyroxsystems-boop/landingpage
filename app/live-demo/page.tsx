import type { Metadata } from 'next';
import { LiveDemoChat } from './LiveDemoChat';

export const metadata: Metadata = {
    title: 'Live Demo – KI-OEM-Ermittlung in Sekunden',
    description:
        'Kostenlose Live-Demo: Partsunion ermittelt die passende OEM-Nummer für jedes Autoteil aus VIN, HSN/TSN oder Fahrzeugbrief – in unter 8 Sekunden.',
    keywords: [
        'OEM Nummer finden',
        'OEM Ermittlung kostenlos',
        'KI Teileermittlung',
        'VIN Teile finden',
        'HSN TSN Autoteile',
        'Ersatzteil finden',
        'Partsunion Demo',
    ],
    alternates: {
        canonical: 'https://www.partsunion.de/live-demo',
    },
    openGraph: {
        title: 'Live Demo – KI-OEM-Ermittlung in Sekunden | Partsunion',
        description:
            'Kostenlos testen: KI-gestützte OEM-Ermittlung aus VIN, HSN/TSN oder Fahrzeugbrief-Foto. Unter 8 Sekunden pro Teil.',
        url: 'https://www.partsunion.de/live-demo',
        type: 'website',
        locale: 'de_DE',
        siteName: 'Partsunion',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Partsunion Live Demo – KI-OEM-Ermittlung',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Partsunion Live Demo – KI-OEM-Ermittlung',
        description: 'Ermitteln Sie OEM-Nummern in Sekunden – kostenlose KI-Demo.',
        images: ['/og-image.png'],
    },
};

export default function LiveDemoPage() {
    return (
        <div className="fixed inset-0 top-0 z-20 bg-[var(--background)]">
            <LiveDemoChat />
        </div>
    );
}
