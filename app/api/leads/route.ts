import { NextRequest, NextResponse } from 'next/server';

const CRM_API_URL =
    process.env.CRM_API_URL ||
    'https://whatsapp-bot-oem-ermittlung.onrender.com';

// ── Simple in-memory rate limiting (per IP) ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 leads per minute per IP

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || entry.resetAt < now) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
        return false;
    }

    entry.count++;
    return entry.count > RATE_LIMIT_MAX;
}

// Cleanup expired entries periodically
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of rateLimitMap.entries()) {
            if (entry.resetAt < now) rateLimitMap.delete(key);
        }
    }, 60000);
}

export async function POST(request: NextRequest) {
    try {
        // ── Rate Limiting ──
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || request.headers.get('x-real-ip')
            || 'unknown';

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut.' },
                { status: 429 }
            );
        }

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

        // ── Honeypot / Bot Detection ──
        // If a hidden "website" field is filled, it's likely a bot
        if (body.website || body.url || body.homepage) {
            console.log('[Lead API] Honeypot triggered, blocking spam submission');
            // Return success to not reveal detection
            return NextResponse.json({ success: true, id: 'blocked' }, { status: 201 });
        }

        // ── Basic content checks ──
        const allText = `${firma} ${ansprechpartner} ${nachricht || ''}`.toLowerCase();
        const spamPatterns = [/\bviagra\b/, /\bcasino\b/, /\bcrypto\b/, /\bsex\b/, /\bpharmacy\b/, /http[s]?:\/\//i];
        if (spamPatterns.some(p => p.test(allText))) {
            console.log('[Lead API] Spam content detected, blocking');
            return NextResponse.json({ success: true, id: 'blocked' }, { status: 201 });
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
