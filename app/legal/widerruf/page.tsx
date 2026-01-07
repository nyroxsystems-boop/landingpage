import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Widerrufsrecht - Partsunion',
};

export default function WiderrufPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl prose dark:prose-invert">
            <h1>Widerrufsbelehrung</h1>

            <p>
                Verbraucher haben ein vierzehntägiges Widerrufsrecht.
            </p>

            <h2>Widerrufsrecht</h2>
            <p>
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
                Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
            </p>
            <p>
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Partsunion GmbH, Musterstraße 123, 10115 Berlin, E-Mail: widerruf@partsunion.de) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
            </p>

            <h2>Widerrufsfolgen</h2>
            <p>
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart.
            </p>

            <p>
                Das Widerrufsrecht erlischt bei einem Vertrag über die Lieferung von nicht auf einem körperlichen Datenträger befindlichen digitalen Inhalten auch dann, wenn wir mit der Ausführung des Vertrags begonnen haben, nachdem Sie ausdrücklich zugestimmt haben, dass wir mit der Ausführung des Vertrags vor Ablauf der Widerrufsfrist beginnen, und Sie Ihre Kenntnis davon bestätigt haben, dass Sie durch Ihre Zustimmung mit Beginn der Ausführung des Vertrags Ihr Widerrufsrecht verlieren.
            </p>
        </div>
    );
}
