import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Datenschutz - Partsunion',
};

export default function DatenschutzPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl prose dark:prose-invert">
            <h1>Datenschutzerklärung</h1>

            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
                Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h2>2. Datenerfassung auf unserer Website</h2>
            <h3>Cookies</h3>
            <p>
                Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an.
                Sie dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
            </p>

            <h3>Kontaktformular</h3>
            <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen
                Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            </p>
        </div>
    );
}
