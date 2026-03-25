import type { Metadata } from 'next';
import { LiveDemoChat } from './LiveDemoChat';

export const metadata: Metadata = {
    title: 'Live Demo — KI-Teileermittlung',
    description: 'Testen Sie die KI-gestützte Teileermittlung von Partsunion. Laden Sie ein Bild Ihres Fahrzeugbriefs hoch oder geben Sie Ihre Fahrzeugdaten ein — unsere KI findet das passende Teil.',
    openGraph: {
        title: 'Live Demo — KI-Teileermittlung',
        description: 'Erleben Sie, wie unsere KI in Sekunden das richtige Autoteil für Ihr Fahrzeug findet.',
    },
};

export default function LiveDemoPage() {
    return <LiveDemoChat />;
}
