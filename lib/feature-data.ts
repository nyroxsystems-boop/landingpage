import { LucideIcon, FileText, Settings, Smartphone, ShoppingCart, RefreshCw, BarChart, Search, Truck } from 'lucide-react';

export interface FeatureDetail {
    slug: string;
    title: string;
    description: string;
    icon: LucideIcon;
    heroImage?: string; // Placeholder for now
    features: string[]; // List of bullet points
    technicalDetails: string; // Deeper technical explanation
    benefit: string; // The "Why" for the customer
}

export const featureData: FeatureDetail[] = [
    {
        slug: 'automatische-rechnungserstellung',
        title: 'Automatische Rechnungserstellung',
        description: 'Vom Auftrag zur Rechnung in Sekunden. Fehlerfrei und Finanzamt-konform.',
        icon: FileText,
        features: [
            'Automatische Generierung als PDF',
            'Direkter Email-Versand an Kunden',
            'DATEV-Schnittstelle für den Steuerberater',
            'Autonome Stornorechnungen bei Retouren'
        ],
        technicalDetails: 'Unser System nutzt Templates, die Sie einmalig anpassen. Bei jeder Bestellung triggert der Status "Versendet" die PDF-Generierung. Die Dokumente werden revisionssicher archiviert.',
        benefit: 'Sparen Sie sich die Buchhaltung am Wochenende. Partsunion erledigt den Papierkram, während Sie schrauben oder verkaufen.'
    },
    {
        slug: 'oem-ermittlung',
        title: 'KI-gestützte OEM Ermittlung',
        description: 'Nie wieder das falsche Teil bestellen. Unsere AI matcht Fahrzeugschein mit Herstellerdaten.',
        icon: Search,
        features: [
            'Scan von Fahrzeugscheinen (OCR)',
            'Abgleich mit TecDoc und Hersteller-Datenbanken',
            'Erkennung von Baujahr-spezifischen Änderungen',
            'Cross-Reference auf Alternativ-Hersteller'
        ],
        technicalDetails: 'Wir nutzen Computer Vision, um HSN/TSN und FIN zu extrahieren. Ein proprietärer Algorithmus prüft dann Kompatibilitäten über Millionen von Datensätzen in Millisekunden.',
        benefit: 'Reduzieren Sie Ihre Retourenquote auf unter 1%. Vertrauen Sie auf Daten statt Bauchgefühl.'
    },
    {
        slug: 'whatsapp-bot',
        title: '24/7 WhatsApp Autoteile-Bot',
        description: 'Ihr neuer Mitarbeiter, der nie schläft. Nimmt Anfragen entgegen und qualifiziert Leads.',
        icon: Smartphone,
        features: [
            'Versteht Sprachnachrichten und Fotos',
            'Identifiziert Fahrzeug und gesuchtes Teil',
            'Sendet vollautomatisch Angebote',
            'Übergibt komplexe Fälle an Menschen'
        ],
        technicalDetails: 'Basierend auf LLMs (Large Language Models), die speziell auf KFZ-Teile trainiert wurden. Der Bot versteht Slang wie "Bremse vorne" genau so gut wie "Bremsbelagsatz Vorderachse".',
        benefit: 'Seien Sie für Ihre Kunden erreichbar, wenn die Konkurrenz schon geschlossen hat. Fangen Sie jeden Lead ab.'
    },
    {
        slug: 'bestellprozess',
        title: 'Automatisierter Bestellprozess',
        description: 'Von der Lagerlücke zur Nachbestellung ohne einen Mausklick.',
        icon: ShoppingCart,
        features: [
            'Automatische Bestellvorschläge bei Mindestbestand',
            'Preisvergleich bei angebundenen Lieferanten',
            'Direkte API-Bestellung bei Großhändlern',
            'Tracking-Updates für Ihre Kunden'
        ],
        technicalDetails: 'Unser Algorithmus analysiert Ihre Abverkaufsgeschwindigkeit und Lieferzeiten, um den optimalen Bestellzeitpunkt zu berechnen (Predictive Ordering).',
        benefit: 'Optimieren Sie Ihren Cashflow und vermeiden Sie "Out-of-Stock"-Situationen bei Schnelldrehern.'
    },
    {
        slug: 'bestandssynchronisation',
        title: 'Multi-Channel Warenbestand',
        description: 'Ein Lager, viele Verkaufskanäle. Synchronisation in Echtzeit.',
        icon: RefreshCw,
        features: [
            'Sync mit eBay, autoteile-markt.de, Daparto',
            'Vermeidung von Überverkäufen',
            'Zentrales Dashboard für alle Kanäle',
            'Priorisierung von Verkaufskanälen'
        ],
        technicalDetails: 'Wir nutzen Webhooks und APIs für Real-Time-Updates. Sobald ein Teil auf eBay verkauft wird, wird es im Shop gesperrt - und umgekehrt.',
        benefit: 'Verkaufen Sie überall, ohne den Überblick zu verlieren. Skalieren Sie Ihren Umsatz ohne Chaos.'
    },
    {
        slug: 'retourenmanagement',
        title: 'Smartes Retourenmanagement',
        description: 'Machen Sie aus Rücksendungen einen geordneten Prozess.',
        icon: Truck,
        features: [
            'QR-Code Retourenschein für Kunden',
            'Automatische Wiedereinlagerung im System',
            'Gutschrift-Erstellung auf Knopfdruck',
            'Analyse von Retourengrunden'
        ],
        technicalDetails: 'Der Retourenprozess ist voll in die Warenwirtschaft integriert. Eingehende Retouren werden gescannt und sofort wieder dem verfügbaren Bestand zugebucht.',
        benefit: 'Verwandeln Sie den Frustfaktor Retoure in ein professionelles Kundenerlebnis.'
    }
];
