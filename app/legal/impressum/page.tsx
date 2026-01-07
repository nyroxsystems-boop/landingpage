import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Impressum - Partsunion',
};

export default function ImpressumPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl prose dark:prose-invert">
            <h1>Impressum</h1>
            <p>Angaben gemäß § 5 TMG</p>

            <h3>Kontakt</h3>
            <p>
                Partsunion GmbH<br />
                Musterstraße 123<br />
                10115 Berlin<br />
                Deutschland
            </p>

            <p>
                Telefon: +49 30 12345678<br />
                E-Mail: kontakt@partsunion.de
            </p>

            <h3>Vertretung durch</h3>
            <p>
                Geschäftsführer: Max Mustermann
            </p>

            <h3>Registereintrag</h3>
            <p>
                Eintragung im Handelsregister.<br />
                Registergericht: Amtsgericht Berlin-Charlottenburg<br />
                Registernummer: HRB 123456
            </p>

            <h3>Umsatzsteuer-ID</h3>
            <p>
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                DE 123 456 789
            </p>
        </div>
    );
}
