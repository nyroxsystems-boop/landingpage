import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AGB - Partsunion',
};

export default function AGBPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl prose dark:prose-invert">
            <h1>Allgemeine Geschäftsbedingungen</h1>
            <p className="text-sm text-muted-foreground">Stand: Januar 2026</p>

            <h2>1. Geltungsbereich</h2>
            <p>
                Für die Geschäftsbeziehung zwischen der Partsunion GmbH (nachfolgend „Anbieter“) und dem Kunden (nachfolgend „Kunde“) gelten ausschließlich die nachfolgenden Allgemeinen Geschäftsbedingungen in ihrer zum Zeitpunkt der Bestellung gültigen Fassung. Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
            </p>

            <h2>2. Vertragsschluss</h2>
            <p>
                Die Präsentation der Leistungen auf der Website stellt kein verbindliches Angebot dar. Der Vertrag kommt erst durch eine schriftliche Bestätigung oder durch Bereitstellung des Zugangs zur Software zustande.
            </p>

            <h2>3. Leistungen und Verfügbarkeit</h2>
            <p>
                Der Anbieter stellt dem Kunden die Softwarelösung "Partsunion" als SaaS zur Verfügung. Die Verfügbarkeit beträgt im Jahresmittel 99,5%, ausgenommen geplante Wartungsfenster.
            </p>

            <h2>4. Preise und Zahlungsbedingungen</h2>
            <p>
                Die Preise richten sich nach der aktuellen Preisliste zum Zeitpunkt des Vertragsschlusses. Alle Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer. Rechnungen sind sofort nach Erhalt ohne Abzug zahlbar.
            </p>

            <h2>5. Laufzeit und Kündigung</h2>
            <p>
                Sofern nicht anders vereinbart, betragen die Vertragslaufzeiten 12 Monate und verlängern sich automatisch um den gleichen Zeitraum, wenn nicht mit einer Frist von 3 Monaten zum Ende der Laufzeit gekündigt wird. Monatlich kündbare Abonnements bleiben hiervon unberührt.
            </p>

            <h2>6. Haftung</h2>
            <p>
                Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit. Für leichte Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten.
            </p>
        </div>
    );
}
