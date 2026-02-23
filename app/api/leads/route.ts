import { NextRequest, NextResponse } from 'next/server';

const CRM_API_URL =
    process.env.CRM_API_URL ||
    'https://whatsapp-bot-oem-ermittlung.onrender.com';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // --- Validate required fields ---
        const { firma, ansprechpartner, telefon, email, nachricht } = body;

        if (!firma || !ansprechpartner || !telefon || !email) {
            return NextResponse.json(
                { error: 'Bitte füllen Sie alle Pflichtfelder aus.' },
                { status: 400 }
            );
        }

        // Basic email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
                { status: 400 }
            );
        }

        // --- Map form fields → CRM Lead schema ---
        const leadPayload = {
            company: firma,
            contactPerson: ansprechpartner,
            phone: telefon,
            email: email,
            notes: nachricht || '',
            source: 'Website',
            status: 'Neu',
            tags: ['Website-Lead'],
        };

        // --- Forward to CRM backend ---
        const response = await fetch(`${CRM_API_URL}/api/crm/leads`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadPayload),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('[Lead API] CRM backend error:', response.status, errorData);
            return NextResponse.json(
                { error: 'Lead konnte nicht gespeichert werden. Bitte versuchen Sie es später erneut.' },
                { status: 502 }
            );
        }

        const created = await response.json();
        return NextResponse.json({ success: true, id: created.pk || created.id }, { status: 201 });
    } catch (error) {
        console.error('[Lead API] Unexpected error:', error);
        return NextResponse.json(
            { error: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' },
            { status: 500 }
        );
    }
}
