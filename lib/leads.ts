/**
 * Shared lead-submission helper used by ConsultationForm and ContactForm.
 * Posts directly to the CRM backend (static export has no server-side
 * API routes). The CRM-side must set CORS headers for our origin and
 * handle rate-limiting + honeypot checks.
 */

const CRM_LEADS_URL =
    process.env.NEXT_PUBLIC_CRM_LEADS_URL ||
    'https://api.partsunion.de/api/leads';

export interface LeadInput {
    firma: string;
    ansprechpartner: string;
    telefon: string;
    email: string;
    nachricht: string;
    source: string;
    consent: boolean;
    /** Honeypot — bots fill this, humans don't. */
    website?: string;
}

export async function submitLead(input: LeadInput): Promise<void> {
    if (input.website) {
        // Honeypot hit — pretend success so bots don't learn the signal.
        return;
    }

    const payload = {
        company: input.firma.trim(),
        contactPerson: input.ansprechpartner.trim(),
        phone: input.telefon.trim(),
        email: input.email.trim().toLowerCase(),
        notes: input.nachricht.trim(),
        source:
            input.source === 'contact-page'
                ? 'Website (Kontakt)'
                : 'Website',
        status: 'Neu',
        tags: ['Website-Lead'],
        consentGivenAt: new Date().toISOString(),
    };

    const response = await fetch(CRM_LEADS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        let message = 'Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.';
        try {
            const data = await response.json();
            if (data?.error) message = data.error;
        } catch {
            // ignore parse failure
        }
        throw new Error(message);
    }
}
